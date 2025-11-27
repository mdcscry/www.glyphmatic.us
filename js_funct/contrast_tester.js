function getContrastRatio(color1, color2) {
	const rgb1 = colorToRgb(color1);
	const rgb2 = colorToRgb(color2);
	
	if (!rgb1 || !rgb2) {
		console.warn('Could not parse colors:', color1, color2);
		return 1; // Return minimum contrast as fallback
	}
	
	const lum1 = getLuminance(rgb1);
	const lum2 = getLuminance(rgb2);
	
	const lighter = Math.max(lum1, lum2);
	const darker = Math.min(lum1, lum2);
	
	return (lighter + 0.05) / (darker + 0.05);
}

// Universal color parser - handles hex, oklch, hsla, rgb
function colorToRgb(color) {
	// Handle hex
	if (color.startsWith('#')) {
		return hexToRgb(color);
	}
	
	// Handle oklch
	if (color.startsWith('oklch')) {
		return oklchToRgb(color);
	}
	
	// Handle hsla/hsl
	if (color.startsWith('hsl')) {
		return hslToRgb(color);
	}
	
	// Handle rgba/rgb
	if (color.startsWith('rgb')) {
		return rgbStringToRgb(color);
	}
	
	return null;
}

function hexToRgb(hex) {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
}

function oklchToRgb(oklchString) {
	// Parse: oklch(L C H)
	const match = oklchString.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/);
	if (!match) return null;
	
	const L = parseFloat(match[1]);
	const C = parseFloat(match[2]);
	const H = parseFloat(match[3]);
	
	// Convert OKLCH -> OKLab -> Linear RGB -> sRGB
	// Step 1: OKLCH to OKLab
	const hRad = H * Math.PI / 180;
	const a = C * Math.cos(hRad);
	const b = C * Math.sin(hRad);
	
	// Step 2: OKLab to Linear RGB
	const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
	const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
	const s_ = L - 0.0894841775 * a - 1.2914855480 * b;
	
	const l = l_ * l_ * l_;
	const m = m_ * m_ * m_;
	const s = s_ * s_ * s_;
	
	let r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
	let g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
	let bl = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;
	
	// Step 3: Linear RGB to sRGB (gamma correction)
	const toSrgb = (val) => {
		val = Math.max(0, Math.min(1, val)); // Clamp
		return val <= 0.0031308 
			? 12.92 * val 
			: 1.055 * Math.pow(val, 1/2.4) - 0.055;
	};
	
	return {
		r: Math.round(toSrgb(r) * 255),
		g: Math.round(toSrgb(g) * 255),
		b: Math.round(toSrgb(bl) * 255)
	};
}

function hslToRgb(hslString) {
	const match = hslString.match(/hsla?\((\d+),\s*(\d+)%,\s*(\d+)%/);
	if (!match) return null;
	
	let h = parseInt(match[1]) / 360;
	let s = parseInt(match[2]) / 100;
	let l = parseInt(match[3]) / 100;
	
	let r, g, b;
	if (s === 0) {
		r = g = b = l;
	} else {
		const hue2rgb = (p, q, t) => {
			if (t < 0) t += 1;
			if (t > 1) t -= 1;
			if (t < 1/6) return p + (q - p) * 6 * t;
			if (t < 1/2) return q;
			if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
			return p;
		};
		const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		const p = 2 * l - q;
		r = hue2rgb(p, q, h + 1/3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1/3);
	}
	
	return {
		r: Math.round(r * 255),
		g: Math.round(g * 255),
		b: Math.round(b * 255)
	};
}

function rgbStringToRgb(rgbString) {
	const match = rgbString.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
	if (!match) return null;
	
	return {
		r: parseInt(match[1]),
		g: parseInt(match[2]),
		b: parseInt(match[3])
	};
}

function getLuminance(rgb) {
	const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(val => {
		val = val / 255;
		return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
	});
	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Box-Muller transform for Gaussian-distributed random numbers
 * Returns a value between 0 and 1 with normal distribution
 * Creates more natural/sporadic color selection than uniform random
 */
function randn_bm() {
	let u = 0, v = 0;
	while(u === 0) u = Math.random(); // Converting [0,1) to (0,1)
	while(v === 0) v = Math.random();
	let num = Math.sqrt(-4.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
	num = num / 10.0 + 0.5; // Translate to 0 -> 1
	if (num > 1 || num < 0) return randn_bm(); // resample between 0 and 1
	return num;
}

console.log('contrastWait.js is loaded');
var contrastWait = [];