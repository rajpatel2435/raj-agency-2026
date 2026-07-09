// Generates a set of branded Google Business Profile photos as PNGs.
// Run: node public/gbp/generate.js
const sharp = require("sharp");
const path = require("path");

const OUT = __dirname;
const ORANGE = "#F95D0A";

const base = `
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0A0A0A"/>
      <stop offset="100%" stop-color="#050505"/>
    </linearGradient>
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="5" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
`;

function grid(w, h) {
  let lines = "";
  for (let y = 120; y < h; y += 120) lines += `<line x1="0" y1="${y}" x2="${w}" y2="${y}"/>`;
  for (let x = 120; x < w; x += 120) lines += `<line x1="${x}" y1="0" x2="${x}" y2="${h}"/>`;
  return `<g stroke="#FFFFFF" stroke-opacity="0.035" stroke-width="1">${lines}</g>`;
}

// Simple rocket mark (matches "launch" theme)
function rocket(cx, cy, s, color) {
  return `<g transform="translate(${cx},${cy}) scale(${s})" fill="${color}" filter="url(#glow)">
    <path d="M0,-40 C18,-28 20,0 8,26 L-8,26 C-20,0 -18,-28 0,-40 Z"/>
    <circle cx="0" cy="-8" r="7" fill="#050505"/>
    <path d="M-8,20 L-22,40 L-6,32 Z"/>
    <path d="M8,20 L22,40 L6,32 Z"/>
    <path d="M-4,30 L0,50 L4,30 Z" fill="#FFB37A"/>
  </g>`;
}

const images = [
  {
    name: "logo",
    w: 720, h: 720,
    svg: (w, h) => `
      <rect width="${w}" height="${h}" fill="url(#bg)"/>
      ${grid(w, h)}
      ${rocket(w / 2, h / 2 - 40, 3.4, ORANGE)}
      <text x="${w / 2}" y="${h / 2 + 150}" text-anchor="middle" fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-size="52" font-weight="800" letter-spacing="-1">launch<tspan fill="${ORANGE}">at</tspan>dawn</text>
    `,
  },
  {
    name: "cover",
    w: 1200, h: 675,
    svg: (w, h) => `
      <rect width="${w}" height="${h}" fill="url(#bg)"/>
      ${grid(w, h)}
      ${rocket(1020, 180, 2.2, ORANGE)}
      <text x="90" y="240" fill="${ORANGE}" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="700" letter-spacing="6">TECHNICAL SEO &amp; WEB DEVELOPMENT</text>
      <text x="90" y="330" fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="800" letter-spacing="-2">Architecture</text>
      <text x="90" y="410" fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="800" letter-spacing="-2">dictates <tspan fill="${ORANGE}">rankings.</tspan></text>
      <text x="90" y="500" fill="#FFFFFF" fill-opacity="0.5" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="600">Montreal &amp; Vancouver // Serving Canada &amp; the USA</text>
    `,
  },
  {
    name: "services",
    w: 1200, h: 900,
    svg: (w, h) => {
      const items = [
        "Technical SEO Audits",
        "Local SEO &amp; Map Pack",
        "High-Performance Websites",
        "Google Business Profile",
        "Digital PR &amp; Link Building",
      ];
      const rows = items
        .map(
          (t, i) => `
        <g transform="translate(90, ${300 + i * 100})">
          <circle cx="0" cy="-8" r="7" fill="${ORANGE}"/>
          <text x="30" y="0" fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-size="38" font-weight="700">${t}</text>
        </g>`
        )
        .join("");
      return `
        <rect width="${w}" height="${h}" fill="url(#bg)"/>
        ${grid(w, h)}
        <text x="90" y="150" fill="${ORANGE}" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="700" letter-spacing="6">WHAT WE DO</text>
        <text x="90" y="220" fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-size="60" font-weight="800" letter-spacing="-1">Our Services</text>
        ${rows}
      `;
    },
  },
  {
    name: "results",
    w: 1200, h: 900,
    svg: (w, h) => `
      <rect width="${w}" height="${h}" fill="url(#bg)"/>
      ${grid(w, h)}
      <text x="90" y="150" fill="${ORANGE}" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="700" letter-spacing="6">CLIENT OUTCOMES</text>
      <text x="90" y="220" fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-size="60" font-weight="800" letter-spacing="-1">Results, not vanity metrics.</text>
      <g font-family="Arial, Helvetica, sans-serif">
        <text x="90"  y="450" fill="${ORANGE}" font-size="120" font-weight="800">400%</text>
        <text x="95"  y="510" fill="#FFFFFF" fill-opacity="0.55" font-size="26" font-weight="600">ORGANIC GROWTH</text>
        <text x="650" y="450" fill="${ORANGE}" font-size="120" font-weight="800">Top 3</text>
        <text x="655" y="510" fill="#FFFFFF" fill-opacity="0.55" font-size="26" font-weight="600">GOOGLE MAP PACK</text>
        <text x="90"  y="720" fill="${ORANGE}" font-size="120" font-weight="800">&lt;400ms</text>
        <text x="95"  y="780" fill="#FFFFFF" fill-opacity="0.55" font-size="26" font-weight="600">PAGE LOAD SPEED</text>
        <text x="650" y="720" fill="${ORANGE}" font-size="120" font-weight="800">12X</text>
        <text x="655" y="780" fill="#FFFFFF" fill-opacity="0.55" font-size="26" font-weight="600">AVG. RETURN ON AD SPEND</text>
      </g>
    `,
  },
  {
    name: "cta",
    w: 1200, h: 900,
    svg: (w, h) => `
      <rect width="${w}" height="${h}" fill="url(#bg)"/>
      ${grid(w, h)}
      ${rocket(w / 2, 250, 2.6, ORANGE)}
      <text x="${w / 2}" y="470" text-anchor="middle" fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-size="60" font-weight="800" letter-spacing="-1">Free Website Teardown</text>
      <text x="${w / 2}" y="540" text-anchor="middle" fill="#FFFFFF" fill-opacity="0.55" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="500">See exactly where your site is leaking revenue.</text>
      <g>
        <rect x="${w / 2 - 220}" y="610" width="440" height="90" rx="45" fill="${ORANGE}"/>
        <text x="${w / 2}" y="668" text-anchor="middle" fill="#050505" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="800" letter-spacing="1">BOOK A CALL</text>
      </g>
      <text x="${w / 2}" y="790" text-anchor="middle" fill="#FFFFFF" fill-opacity="0.4" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="600">launchatdawn.com</text>
    `,
  },
];

(async () => {
  for (const img of images) {
    const svg = `<svg width="${img.w}" height="${img.h}" viewBox="0 0 ${img.w} ${img.h}" xmlns="http://www.w3.org/2000/svg">${base}${img.svg(
      img.w,
      img.h
    )}</svg>`;
    const out = path.join(OUT, `${img.name}.png`);
    await sharp(Buffer.from(svg)).png().toFile(out);
    console.log("Created", out);
  }
})();
