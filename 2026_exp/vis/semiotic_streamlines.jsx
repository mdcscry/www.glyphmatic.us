import { useEffect, useRef, useState, useCallback } from "react";
import * as d3 from "d3";

const N = 10;
const TICK_MS = 600;
const VISIBLE = 80;
const HISTORY = 400;

function randomPalette(n) {
  const mode = Math.floor(Math.random() * 5);
  return Array.from({ length: n }, (_, i) => {
    if (mode === 0) return d3.hsl((i * 36 + Math.random() * 20) % 360, 1.0, 0.6 + Math.random() * 0.15).toString();
    if (mode === 1) return d3.hsl(Math.random() * 360, 0.9, 0.62 + Math.random() * 0.15).toString();
    if (mode === 2) {
      const h = Math.random() < 0.5 ? 10 + Math.random() * 30 : 185 + Math.random() * 50;
      return d3.hsl(h, 0.95, 0.55 + Math.random() * 0.2).toString();
    }
    if (mode === 3) return d3.hsl(260 + Math.random() * 80, 0.85, 0.6 + Math.random() * 0.2).toString();
    return d3.hsl(80 + Math.random() * 120, 0.85, 0.55 + Math.random() * 0.2).toString();
  });
}

export default function StreamLines() {
  const svgRef = useRef(null);
  const stateRef = useRef({
    vals: Array.from({ length: N }, () => 15 + Math.random() * 50),
    vels: Array.from({ length: N }, () => (Math.random() - 0.5) * 2),
    data: [],
    colors: randomPalette(N),
    strokeWidths: Array.from({ length: N }, () => 10 + Math.random() * 16),
    paused: false,
    paths: null,
    xScale: null,
    yScale: null,
    stack: null,
    line: null,
    keys: Array.from({ length: N }, (_, i) => i),
  });

  const [paused, setPausedState] = useState(false);
  const [, forceRender] = useState(0);

  // ── Init D3 once ──────────────────────────────────────────
  useEffect(() => {
    const W = window.innerWidth;
    const H = window.innerHeight;
    const s = stateRef.current;

    const svg = d3.select(svgRef.current).attr("width", W).attr("height", H);

    svg.append("defs").append("clipPath")
      .attr("id", "sg-clip")
      .append("rect").attr("width", W).attr("height", H);

    const g = svg.append("g").attr("clip-path", "url(#sg-clip)");

    s.xScale = d3.scaleLinear().range([0, W]);
    s.yScale = d3.scaleLinear().range([H, 0]);

    s.stack = d3.stack()
      .keys(s.keys)
      .value((d, k) => d[k])
      .offset(d3.stackOffsetWiggle)
      .order(d3.stackOrderInsideOut);

    s.line = d3.line()
      .x((d, i) => s.xScale(i))
      .y(d => s.yScale((d[0] + d[1]) / 2))
      .curve(d3.curveCatmullRom.alpha(0.5));

    s.paths = g.selectAll("path")
      .data(s.keys)
      .enter().append("path")
      .attr("fill", "none")
      .attr("stroke", (d, i) => s.colors[i])
      .attr("stroke-width", (d, i) => s.strokeWidths[i])
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round")
      .attr("opacity", 0.82);

    // Pre-fill
    for (let i = 0; i < HISTORY; i++) nextFrame();

    render();

    // Tick
    const interval = setInterval(() => {
      if (stateRef.current.paused) return;
      nextFrame();
      render();
    }, TICK_MS);

    // Resize
    const onResize = () => {
      const nw = window.innerWidth, nh = window.innerHeight;
      svg.attr("width", nw).attr("height", nh);
      svg.select("#sg-clip rect").attr("width", nw).attr("height", nh);
      s.xScale.range([0, nw]);
      s.yScale.range([nh, 0]);
      render(0);
    };
    window.addEventListener("resize", onResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  function nextFrame() {
    const s = stateRef.current;
    s.vals = s.vals.map((v, i) => {
      s.vels[i] += (Math.random() - 0.5) * 3;
      s.vels[i] *= 0.88;
      s.vels[i] += (35 - v) * 0.018;
      return Math.max(1, Math.min(100, v + s.vels[i]));
    });
    s.data.push([...s.vals]);
    if (s.data.length > HISTORY) s.data.shift();
  }

  function render(duration = TICK_MS * 0.9) {
    const s = stateRef.current;
    const slice = s.data.slice(-VISIBLE);
    if (slice.length < 2) return;

    const rows = slice.map(frame => {
      const obj = {};
      s.keys.forEach(k => { obj[k] = frame[k]; });
      return obj;
    });

    const series = s.stack(rows);
    s.xScale.domain([0, slice.length - 1]);

    const allMids = series.flatMap(sr => sr.map(d => (d[0] + d[1]) / 2));
    const yMin = d3.min(allMids), yMax = d3.max(allMids);
    const pad = (yMax - yMin) * 0.15;
    s.yScale.domain([yMin - pad, yMax + pad]);

    s.paths.data(series)
      .transition()
      .duration(duration)
      .ease(d3.easeLinear)
      .attr("d", s.line);
  }

  const togglePause = useCallback(() => {
    stateRef.current.paused = !stateRef.current.paused;
    setPausedState(p => !p);
  }, []);

  const newColors = useCallback(() => {
    const s = stateRef.current;
    s.colors = randomPalette(N);
    if (s.paths) s.paths.attr("stroke", (d, i) => s.colors[i]);
    forceRender(n => n + 1);
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, background: "#06050f", overflow: "hidden" }}>
      <svg ref={svgRef} style={{ display: "block" }} />
      <div style={{
        position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
        display: "flex", gap: 12, zIndex: 10,
      }}>
        {[
          { label: "↺ New Colors", action: newColors },
          { label: paused ? "▶ Play" : "⏸ Pause", action: togglePause },
        ].map(({ label, action }) => (
          <button key={label} onClick={action} style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.18)",
            color: "#fff", fontFamily: "monospace", fontSize: 11,
            letterSpacing: "0.15em", textTransform: "uppercase",
            padding: "8px 24px", cursor: "pointer",
          }}>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
