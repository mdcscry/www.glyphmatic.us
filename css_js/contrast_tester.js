function getContrastRatio(color1, color2) {
	const rgb1 = hexToRgb(color1);
	const rgb2 = hexToRgb(color2);
	
	const lum1 = getLuminance(rgb1);
	const lum2 = getLuminance(rgb2);
	
	const lighter = Math.max(lum1, lum2);
	const darker = Math.min(lum1, lum2);
	
	return (lighter + 0.05) / (darker + 0.05);
}

function hexToRgb(hex) {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
}

function getLuminance(rgb) {
	const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(val => {
		val = val / 255;
		return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
	});
	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
console.log('contrastWait.js is loaded');
var contrastWait = [];