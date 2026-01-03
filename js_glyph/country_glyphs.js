/**
 * Country Data Loader
 *
 * Loads shared block files and individual country files, then builds
 * consolidated data structures for:
 * - countryData: Full data including ISO codes, colors, languages, glyphs
 * - countryGlyphs: Glyphs by unicode block per country
 * - countryColors: Flag colors per country
 * - countries: Array of all country IDs
 *
 * Usage:
 *   loadCountryData().then(() => {
 *     // countryData, countryGlyphs, countryColors, countries are now available
 *   });
 */

// Global container for shared blocks
window.__BLOCK_MODULES__ = window.__BLOCK_MODULES__ || {};

// Global container for country modules to register into
window.__COUNTRY_DATA_MODULES__ = window.__COUNTRY_DATA_MODULES__ || {};

// Registration function for shared block files
function registerBlock(name, glyphs) {
  window.__BLOCK_MODULES__[name] = glyphs;
}

// Registration function for individual country files
function registerCountry(name, data) {
  window.__COUNTRY_DATA_MODULES__[name] = data;
}

// Shared block files to load first
const BLOCK_FILES = [
  'devanagari',
  'arabic_reduced',
  'arabic_nastalique',
  'tamil',
  'kangxi_radicals',
  'cjk_strokes',
  'cjk_radicals_supplement'
];

// List of all country files to load (matches actual files in countries/ directory)
const COUNTRY_FILES = [
  'afghanistan', 'aland_islands', 'albania', 'algeria', 'american_samoa', 'andorra', 'angola', 'anguilla',
  'antarctica', 'antigua_and_barbuda', 'argentina', 'armenia', 'aruba', 'australia', 'austria', 'azerbaijan',
  'bahamas', 'bahrain', 'bangladesh', 'barbados', 'belarus', 'belgium', 'belize', 'benin', 'bermuda',
  'bhutan', 'bolivia', 'bosnia_and_herzegovina', 'botswana', 'brazil', 'british_indian_ocean_territory',
  'british_virgin_islands', 'brunei', 'bulgaria', 'burkina_faso', 'burundi',
  'cambodia', 'cameroon', 'canada', 'cape_verde', 'caribbean_netherlands', 'cayman_islands',
  'central_african_republic', 'chad', 'chile', 'china', 'christmas_island', 'cocos_islands', 'colombia',
  'comoros', 'congo_democratic_republic', 'congo_republic', 'cook_islands', 'costa_rica', 'cote_d_ivoire',
  'croatia', 'cuba', 'curacao', 'cyprus', 'czech_republic',
  'denmark', 'djibouti', 'dominica', 'dominican_republic',
  'ecuador', 'egypt', 'el_salvador', 'england', 'equatorial_guinea', 'eritrea', 'estonia', 'eswatini', 'ethiopia',
  'falkland_islands', 'faroe_islands', 'fiji', 'finland', 'france', 'french_guiana', 'french_polynesia',
  'french_southern_territories',
  'gabon', 'gambia', 'georgia', 'germany', 'ghana', 'gibraltar', 'greece', 'greenland', 'grenada',
  'guadeloupe', 'guam', 'guatemala', 'guernsey', 'guinea', 'guinea_bissau', 'guyana',
  'haiti', 'honduras', 'hong_kong', 'hungary',
  'iceland', 'india', 'indonesia', 'iran', 'iraq', 'ireland', 'isle_of_man', 'israel', 'italy',
  'jamaica', 'japan', 'jersey', 'jordan',
  'kazakhstan', 'kenya', 'kiribati', 'korea_south', 'kuwait', 'kyrgyzstan',
  'laos', 'latvia', 'lebanon', 'lesotho', 'liberia', 'libya', 'liechtenstein', 'lithuania', 'luxembourg',
  'macau', 'madagascar', 'malawi', 'malaysia', 'maldives', 'mali', 'malta', 'marshall_islands', 'martinique',
  'mauritania', 'mauritius', 'mayotte', 'mexico', 'micronesia', 'moldova', 'monaco', 'mongolia', 'montserrat',
  'montenegro', 'morocco', 'mozambique', 'myanmar',
  'namibia', 'nauru', 'nepal', 'netherlands', 'new_caledonia', 'new_zealand', 'nicaragua', 'niger', 'nigeria',
  'niue', 'norfolk_island', 'north_korea', 'north_macedonia', 'northern_mariana_islands', 'norway',
  'oman',
  'pakistan', 'palau', 'palestine', 'panama', 'papua_new_guinea', 'paraguay', 'peru', 'philippines',
  'pitcairn_islands', 'pirate', 'poland', 'portugal', 'pride', 'puerto_rico',
  'qatar',
  'reunion', 'romania', 'russia', 'rwanda',
  'saint_barthelemy', 'saint_kitts_and_nevis', 'saint_lucia', 'saint_martin',
  'saint_vincent_and_the_grenadines', 'samoa', 'san_marino', 'sao_tome_and_principe', 'saudi_arabia',
  'scotland', 'senegal', 'serbia', 'seychelles', 'sierra_leone', 'singapore', 'sint_maarten', 'slovakia',
  'slovenia', 'solomon_islands', 'somalia', 'south_africa', 'south_georgia', 'south_sudan', 'spain',
  'sri_lanka', 'sudan', 'suriname', 'svalbard', 'sweden', 'switzerland', 'syria',
  'taiwan', 'tajikistan', 'tanzania', 'thailand', 'timor_leste', 'togo', 'tokelau', 'tonga',
  'trans', 'trinidad_and_tobago', 'tunisia', 'turkey', 'turkmenistan', 'turks_and_caicos', 'tuvalu',
  'uae', 'uganda', 'ukraine', 'united_kingdom', 'united_states', 'uruguay', 'us_virgin_islands', 'uzbekistan',
  'vanuatu', 'vatican_city', 'venezuela', 'vietnam',
  'wales', 'wallis_and_futuna', 'western_sahara',
  'yemen',
  'zambia', 'zimbabwe'
];

// Global data structures (will be populated after loading)
let countryData = {};
let countryGlyphs = {};
let countryColors = {};
let countryIsoCodes = {};
let countryLanguages = {};
let countries = [];

// Convert ISO code to flag emoji
function getCountryFlagEmoji(countryId) {
  const data = countryData[countryId];
  if (!data) return '';
  if (data.flag) return data.flag;
  if (!data.iso) return '';
  const base = 0x1F1E6 - 65;
  return String.fromCodePoint(base + data.iso.charCodeAt(0), base + data.iso.charCodeAt(1));
}

// Build derived data structures from loaded modules
function buildCountryData() {
  console.log(`Country data build started: ${countries.length} countries, ${Object.keys(window.__BLOCK_MODULES__).length} shared blocks`);

  // Merge all registered country modules into countryData
  for (const [name, data] of Object.entries(window.__COUNTRY_DATA_MODULES__)) {
    countryData[name] = data;
  }

  // Merge shared blocks into countries that reference them via 'scripts' array
  for (const [name, data] of Object.entries(countryData)) {
    if (data.scripts && Array.isArray(data.scripts)) {
      if (!data.glyphs) data.glyphs = {};
      for (const scriptName of data.scripts) {
        if (window.__BLOCK_MODULES__[scriptName]) {
          data.glyphs[scriptName] = window.__BLOCK_MODULES__[scriptName];
        }
      }
    }
  }

  // Legacy post-processing for shared glyph data (backward compatibility)
  if (countryData.chad && countryData.chad.glyphs && countryData.chad.glyphs['Arabic-reduced']) {
    if (countryData.comoros && !countryData.comoros.glyphs) countryData.comoros.glyphs = {};
    if (countryData.comoros) countryData.comoros.glyphs['Arabic-reduced'] = countryData.chad.glyphs['Arabic-reduced'];
  }
  if (countryData.india && countryData.india.glyphs && countryData.india.glyphs.Devanagari) {
    if (countryData.mauritius && !countryData.mauritius.glyphs) countryData.mauritius.glyphs = {};
    if (countryData.mauritius) countryData.mauritius.glyphs.Devanagari = countryData.india.glyphs.Devanagari;
  }

  // Build derived structures
  countries = Object.keys(countryData);

  for (const [id, data] of Object.entries(countryData)) {
    countryColors[id] = data.colors;
    countryIsoCodes[id] = data.iso;
    countryLanguages[id] = [...(data.languages?.national || []), ...(data.languages?.other || [])];
    countryGlyphs[id] = data.glyphs;
  }

  console.log(`Country data loaded: ${countries.length} countries, ${Object.keys(window.__BLOCK_MODULES__).length} shared blocks`);
}

// Load a single script
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = () => {
      console.warn(`Failed to load: ${src}`);
      resolve(); // Don't reject, just skip missing files
    };
    document.head.appendChild(script);
  });
}

// Load all country files and build data structures
// basePath should be the path to js_glyph/ relative to the HTML file
async function loadCountryData(basePath = '') {
  // Normalize base path
  if (basePath && !basePath.endsWith('/')) {
    basePath += '/';
  }

  // Load shared blocks first
  await Promise.all(BLOCK_FILES.map(name => loadScript(`${basePath}countries/blocks/${name}.js`)));

  // Load all country files in parallel batches
  const batchSize = 20;
  for (let i = 0; i < COUNTRY_FILES.length; i += batchSize) {
    const batch = COUNTRY_FILES.slice(i, i + batchSize);
    await Promise.all(batch.map(name => loadScript(`${basePath}countries/${name}.js`)));
  }

  // Build the data structures
  console.log(`starting buildCountryData()`);
  buildCountryData();

  return { countryData, countries, countryColors, countryIsoCodes, countryLanguages, countryGlyphs };
}
