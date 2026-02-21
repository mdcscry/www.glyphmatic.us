// insert18.js
// Astronomical Symbols Orbital Animation

// ---- Embedded CSS ----
var embeddedCss = `
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background: radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a0f 100%);
    overflow: hidden;
    font-family: Arial, sans-serif;
    height: 100vh;
    width: 100vw;
    position: relative;
    margin: 0;
    padding: 0;
}

.i18-center-wrap {
    position: fixed;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
    z-index: 5;
}

.i18-center-wrap > * {
    pointer-events: auto;
}

.stars {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
}

.star {
    position: absolute;
    width: 2px;
    height: 2px;
    border-radius: 50%;
    animation: twinkle linear infinite;
}

@keyframes twinkle {
    0%, 100% { opacity: 0; }
    50% { opacity: 1; }
}

.solar-system {
    position: relative;
    width: 85vmin;
    height: 85vmin;
    max-width: 850px;
    max-height: 850px;
    z-index: 5;
}

.sun {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
    background: radial-gradient(circle, #fff9e6 0%, #ffcc00 50%, #ff9900 100%);
    border-radius: 50%;
    box-shadow: 0 0 40px #ffcc00, 0 0 80px #ff9900;
    z-index: 10;
    animation: pulse 8s ease-in-out infinite;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 70px;
    line-height: 1;
    color: rgba(255, 140, 0, 0.5);
}

.sun::before {
    content: '☉';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, calc(-50% + 2px));
}

@keyframes pulse {
    0%, 100% { transform: translate(-50%, -50%) scale(1); }
    50% { transform: translate(-50%, -50%) scale(1.1); }
}

.orbit {
    position: absolute;
    top: 50%;
    left: 50%;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    transform: translate(-50%, -50%);
}

.orbit-1 { width: 180px; height: 180px; }
.orbit-2 { width: 280px; height: 280px; }
.orbit-3 { width: 400px; height: 400px; }
.orbit-4 { width: 540px; height: 540px; }
.orbit-5 { width: 700px; height: 700px; }
.orbit-6 { width: 860px; height: 860px; }

.symbol {
    position: absolute;
    font-size: 28px;
    color: #ffffff;
    font-family: 'Noto Sans Symbols 2', 'Symbola', 'Arial Unicode MS', 'Apple Symbols', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.6));
    cursor: pointer;
    transition: all 0.3s ease;
}

.symbol:hover {
    filter: drop-shadow(0 0 15px rgba(255, 200, 100, 1));
    z-index: 100;
}

.symbol:hover .symbol-inner {
    transform: scale(1.5);
}

.tooltip {
    position: fixed;
    background: rgba(0, 0, 0, 0.9);
    color: #fff;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 14px;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s ease;
    z-index: 10000;
    white-space: nowrap;
    border: 1px solid rgba(255, 200, 100, 0.5);
}

.tooltip.show {
    opacity: 1;
}

.orbit-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform-origin: center;
}

@keyframes orbit {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to { transform: translate(-50%, -50%) rotate(360deg); }
}

.symbol-inner {
    animation: counter-rotate 6s ease-in-out infinite;
}

@keyframes counter-rotate {
    0%, 100% { transform: rotate(0deg) scale(1); }
    50% { transform: rotate(10deg) scale(1.15); }
}

.pos-0 { transform: translate(0, -90px); }
.pos-1 { transform: translate(63.6px, -63.6px); }
.pos-2 { transform: translate(90px, 0); }
.pos-3 { transform: translate(63.6px, 63.6px); }
.pos-4 { transform: translate(0, 90px); }
.pos-5 { transform: translate(-63.6px, 63.6px); }
.pos-6 { transform: translate(-90px, 0); }
.pos-7 { transform: translate(-63.6px, -63.6px); }

.moon-orbit-container {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 24px;
    height: 24px;
    transform-origin: center;
}

.moon {
    position: absolute;
    font-size: 12px;
    color: #ffffff;
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
    filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.6));
    transform: translate(0, -12px);
}

@keyframes moon-orbit {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to { transform: translate(-50%, -50%) rotate(360deg); }
}

.pos2-0 { transform: translate(0, -140px); }
.pos2-1 { transform: translate(99px, -99px); }
.pos2-2 { transform: translate(140px, 0); }
.pos2-3 { transform: translate(99px, 99px); }
.pos2-4 { transform: translate(0, 140px); }
.pos2-5 { transform: translate(-99px, 99px); }

.pos3-0 { transform: translate(0, -200px); }
.pos3-1 { transform: translate(141px, -141px); }
.pos3-2 { transform: translate(200px, 0); }
.pos3-3 { transform: translate(141px, 141px); }
.pos3-4 { transform: translate(0, 200px); }

.pos4-0 { transform: translate(0, -270px); }
.pos4-1 { transform: translate(191px, -191px); }
.pos4-2 { transform: translate(270px, 0); }
.pos4-3 { transform: translate(191px, 191px); }
.pos4-4 { transform: translate(0, 270px); }

.pos5-0 { transform: translate(0, -350px); }
.pos5-1 { transform: translate(247px, -247px); }
.pos5-2 { transform: translate(350px, 0); }
.pos5-3 { transform: translate(247px, 247px); }
.pos5-4 { transform: translate(0, 350px); }
.pos5-5 { transform: translate(-247px, 247px); }
.pos5-6 { transform: translate(-350px, 0); }
.pos5-7 { transform: translate(-247px, -247px); }

.pos6-0 { transform: translate(0, -430px); }
.pos6-1 { transform: translate(304px, -304px); }
.pos6-2 { transform: translate(430px, 0); }
.pos6-3 { transform: translate(304px, 304px); }
.pos6-4 { transform: translate(0, 430px); }
.pos6-5 { transform: translate(-304px, 304px); }
.pos6-6 { transform: translate(-430px, 0); }
.pos6-7 { transform: translate(-304px, -304px); }
`;

// ---- Inject style ----
function injectStyle(css) {
  const s = document.createElement('style');
  s.textContent = css;
  document.head.appendChild(s);
}

// ---- Create DOM structure ----
function initContent() {
  // Create stars container
  const starsContainer = document.createElement('div');
  starsContainer.className = 'stars';
  starsContainer.id = 'stars';
  document.body.appendChild(starsContainer);

  // Create star field
  const starColors = ['#ffffff', '#ffe9c4', '#d4e4ff', '#ffd4d4', '#e4d4ff', '#d4ffe9'];
  const numStars = 200;

  for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.backgroundColor = starColors[Math.floor(Math.random() * starColors.length)];
    star.style.animationDuration = (8 + Math.random() * 12) + 's';
    star.style.animationDelay = Math.random() * 10 + 's';
    starsContainer.appendChild(star);
  }

  // Create centering wrapper (avoids body flex which conflicts with watermarks)
  const centerWrap = document.createElement('div');
  centerWrap.className = 'i18-center-wrap';

  // Create solar system container
  const solarSystem = document.createElement('div');
  solarSystem.className = 'solar-system';
  centerWrap.appendChild(solarSystem);
  document.body.appendChild(centerWrap);

  // Create sun
  const sun = document.createElement('div');
  sun.className = 'sun';
  solarSystem.appendChild(sun);

  // Create orbit rings
  for (let i = 1; i <= 6; i++) {
    const orbit = document.createElement('div');
    orbit.className = `orbit orbit-${i}`;
    solarSystem.appendChild(orbit);
  }

  // Orbit 1: Classical planets with moon around Earth
  const orbit1 = document.createElement('div');
  orbit1.className = 'orbit-container orbit-1-container';
  orbit1.innerHTML = `
    <div class="symbol pos-0" data-name="Mercury"><div class="symbol-inner">☿</div></div>
    <div class="symbol pos-2" data-name="Venus"><div class="symbol-inner">♀</div></div>
    <div class="symbol pos-4" data-name="Earth" id="earth-symbol">
      <div class="symbol-inner">♁</div>
      <div class="moon-orbit-container">
        <div class="moon">☽</div>
      </div>
    </div>
    <div class="symbol pos-6" data-name="Mars"><div class="symbol-inner">♂</div></div>
  `;
  solarSystem.appendChild(orbit1);

  // Orbit 2: Gas giants
  const orbit2 = document.createElement('div');
  orbit2.className = 'orbit-container orbit-2-container';
  orbit2.innerHTML = `
    <div class="symbol pos2-0" data-name="Jupiter"><div class="symbol-inner">♃</div></div>
    <div class="symbol pos2-2" data-name="Saturn"><div class="symbol-inner">♄</div></div>
    <div class="symbol pos2-4" data-name="Uranus"><div class="symbol-inner">♅</div></div>
    <div class="symbol pos2-5" data-name="Neptune"><div class="symbol-inner">♆</div></div>
  `;
  solarSystem.appendChild(orbit2);

  // Orbit 3: Pluto
  const orbit3 = document.createElement('div');
  orbit3.className = 'orbit-container orbit-3-container';
  orbit3.innerHTML = `
    <div class="symbol pos3-0" data-name="Pluto" id="pluto-symbol"><div class="symbol-inner">♇</div></div>
  `;
  solarSystem.appendChild(orbit3);

  // Orbit 4: Trans-Neptunian objects
  const orbit4 = document.createElement('div');
  orbit4.className = 'orbit-container orbit-4-container';
  orbit4.innerHTML = `
    <div class="symbol pos4-0" data-name="Eris" id="eris-symbol"><div class="symbol-inner">⯰</div></div>
    <div class="symbol pos4-2" data-name="Sedna"><div class="symbol-inner">⯲</div></div>
    <div class="symbol pos4-3" data-name="Transpluto"><div class="symbol-inner">⯗</div></div>
    <div class="symbol pos4-4" data-name="Proserpina"><div class="symbol-inner">⯘</div></div>
  `;
  solarSystem.appendChild(orbit4);

  // Orbit 5: Uranian symbols
  const orbit5 = document.createElement('div');
  orbit5.className = 'orbit-container orbit-5-container';
  orbit5.innerHTML = `
    <div class="symbol pos5-0" data-name="Cupido"><div class="symbol-inner">⯠</div></div>
    <div class="symbol pos5-1" data-name="Hades"><div class="symbol-inner">⯡</div></div>
    <div class="symbol pos5-2" data-name="Zeus"><div class="symbol-inner">⯢</div></div>
    <div class="symbol pos5-3" data-name="Kronos"><div class="symbol-inner">⯣</div></div>
    <div class="symbol pos5-4" data-name="Apollon"><div class="symbol-inner">⯤</div></div>
    <div class="symbol pos5-5" data-name="Admetos"><div class="symbol-inner">⯥</div></div>
    <div class="symbol pos5-6" data-name="Vulcanus"><div class="symbol-inner">⯦</div></div>
    <div class="symbol pos5-7" data-name="Poseidon"><div class="symbol-inner">⯧</div></div>
  `;
  solarSystem.appendChild(orbit5);

  // Orbit 6: Asteroids and misc symbols
  const orbit6 = document.createElement('div');
  orbit6.className = 'orbit-container orbit-6-container';
  orbit6.innerHTML = `
    <div class="symbol pos6-0" data-name="Astraea"><div class="symbol-inner">⯙</div></div>
    <div class="symbol pos6-1" data-name="Hygiea"><div class="symbol-inner">⯚</div></div>
    <div class="symbol pos6-2" data-name="Pholus"><div class="symbol-inner">⯛</div></div>
    <div class="symbol pos6-3" data-name="Nessus"><div class="symbol-inner">⯜</div></div>
    <div class="symbol pos6-4" data-name="White Moon Selena"><div class="symbol-inner">⯝</div></div>
    <div class="symbol pos6-5" data-name="True Black Moon Lilith"><div class="symbol-inner">⯞</div></div>
    <div class="symbol pos6-6" data-name="True Light Moon Arta"><div class="symbol-inner">⯟</div></div>
    <div class="symbol pos6-7" data-name="Group Mark"><div class="symbol-inner">⯒</div></div>
  `;
  solarSystem.appendChild(orbit6);

  // Create tooltip
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.id = 'tooltip';
  document.body.appendChild(tooltip);
}

// ---- Initialize animations and interactions ----
function initAnimations() {
  // Randomly select a Pluto form
  const plutoForms = ['♇', '⯓', '⯔', '⯕', '⯖'];
  const randomPlutoIndex = Math.floor(Math.random() * plutoForms.length);
  const plutoSymbol = document.getElementById('pluto-symbol');
  if (plutoSymbol) {
    plutoSymbol.querySelector('.symbol-inner').textContent = plutoForms[randomPlutoIndex];
    plutoSymbol.setAttribute('data-name', 'Pluto');
  }

  // Randomly select an Eris form
  const erisForms = ['⯰', '⯱'];
  const randomErisIndex = Math.floor(Math.random() * erisForms.length);
  const erisSymbol = document.getElementById('eris-symbol');
  if (erisSymbol) {
    erisSymbol.querySelector('.symbol-inner').textContent = erisForms[randomErisIndex];
    erisSymbol.setAttribute('data-name', 'Eris');
  }

  // Randomize orbit speeds
  const orbitContainers = document.querySelectorAll('.orbit-container');
  const baseSpeeds = [25, 35, 50, 70, 95, 120];
  const directions = ['normal', 'reverse'];
  
  orbitContainers.forEach((container, index) => {
    const speedVariation = 0.8 + Math.random() * 0.4;
    const newSpeed = baseSpeeds[index] * speedVariation;
    const direction = directions[Math.floor(Math.random() * 2)];
    container.style.animation = `orbit ${newSpeed}s linear infinite ${direction}`;
  });

  // Animate the moon orbit
  const moonOrbit = document.querySelector('.moon-orbit-container');
  if (moonOrbit) {
    const moonSpeed = 8 + Math.random() * 4; // 8-12 seconds
    moonOrbit.style.animation = `moon-orbit ${moonSpeed}s linear infinite`;
  }

  // Tooltip handling
  const symbols = document.querySelectorAll('.symbol');
  const tooltip = document.getElementById('tooltip');

  symbols.forEach(symbol => {
    symbol.addEventListener('mouseenter', (e) => {
      const name = symbol.getAttribute('data-name');
      tooltip.textContent = name;
      tooltip.classList.add('show');
    });

    symbol.addEventListener('mousemove', (e) => {
      tooltip.style.left = (e.clientX + 15) + 'px';
      tooltip.style.top = (e.clientY + 15) + 'px';
    });

    symbol.addEventListener('mouseleave', () => {
      tooltip.classList.remove('show');
    });
  });
}

// ---- Initialize everything ----
function init() {
  console.log("✅ insert18.js → initializing astronomical orbital animation");
  injectStyle(embeddedCss);
  initContent();
  initAnimations();
}

console.log("insert18.js loaded → astronomical symbols orbital animation");
init();