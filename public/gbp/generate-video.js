// Renders a short branded motion-graphics MP4 for Google Business Profile.
// Run: node public/gbp/generate-video.js
const sharp = require("sharp");
const ffmpegPath = require("ffmpeg-static");
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const W = 1280;
const H = 720;
const FPS = 30;
const DURATION = 8; // seconds
const TOTAL = FPS * DURATION;
const ORANGE = "#F95D0A";

const FRAMES_DIR = path.join(__dirname, "_frames");
const OUT = path.join(__dirname, "brand-video.mp4");

// easing
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const clamp01 = (x) => Math.max(0, Math.min(1, x));
// progress of a segment [start,end] (in seconds) at time t
const seg = (t, start, end) => easeOut(clamp01((t - start) / (end - start)));

function rocket(cx, cy, s, color, opacity = 1) {
  return `<g transform="translate(${cx},${cy}) scale(${s})" fill="${color}" opacity="${opacity}">
    <path d="M0,-40 C18,-28 20,0 8,26 L-8,26 C-20,0 -18,-28 0,-40 Z"/>
    <circle cx="0" cy="-8" r="7" fill="#050505"/>
    <path d="M-8,20 L-22,40 L-6,32 Z"/>
    <path d="M8,20 L22,40 L6,32 Z"/>
    <path d="M-4,30 L0,${30 + 20 * (0.6 + 0.4 * Math.random())} L4,30 Z" fill="#FFB37A"/>
  </g>`;
}

function frameSVG(i) {
  const t = i / FPS; // seconds

  // Scene timing
  const rocketRise = seg(t, 0.2, 1.6);
  const rocketY = 420 - 200 * rocketRise; // rises up
  const rocketOpacity = seg(t, 0.1, 0.7);

  const titleIn = seg(t, 1.4, 2.4);
  const subIn = seg(t, 2.0, 3.0);

  // Stats count-up (start at 3.2s)
  const statP = seg(t, 3.2, 5.2);
  const growth = Math.round(400 * statP);
  const roas = Math.round(12 * statP);
  const speed = Math.round(400 - 0 * 0 + (1 - statP) * 0); // static-ish
  const ms = 400 - Math.round(0 * statP); // keep 400ms
  const statsOpacity = seg(t, 3.0, 3.6);

  const ctaIn = seg(t, 5.6, 6.6);

  // subtle grid drift
  const drift = (t * 12) % 120;
  let grid = "";
  for (let y = -120 + drift; y < H + 120; y += 120) grid += `<line x1="0" y1="${y}" x2="${W}" y2="${y}"/>`;
  for (let x = 0; x < W; x += 120) grid += `<line x1="${x}" y1="0" x2="${x}" y2="${H}"/>`;

  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#0A0A0A"/><stop offset="100%" stop-color="#050505"/>
      </linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <g stroke="#FFFFFF" stroke-opacity="0.04" stroke-width="1">${grid}</g>

    ${rocket(W / 2, rocketY, 2.2 + 0.6 * rocketRise, ORANGE, rocketOpacity)}

    <text x="${W / 2}" y="470" text-anchor="middle" fill="#FFFFFF" opacity="${titleIn}"
      font-family="Arial, Helvetica, sans-serif" font-size="${54 + 6 * titleIn}" font-weight="800" letter-spacing="-1"
      transform="translate(0, ${20 * (1 - titleIn)})">launch<tspan fill="${ORANGE}">at</tspan>dawn</text>

    <text x="${W / 2}" y="530" text-anchor="middle" fill="#FFFFFF" fill-opacity="${0.55 * subIn}" opacity="${subIn}"
      font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="600"
      transform="translate(0, ${16 * (1 - subIn)})">Technical SEO &amp; Web Development</text>

    <g opacity="${statsOpacity}" font-family="Arial, Helvetica, sans-serif" text-anchor="middle">
      <text x="300" y="380" fill="${ORANGE}" font-size="86" font-weight="800">${growth}%</text>
      <text x="300" y="420" fill="#FFFFFF" fill-opacity="0.5" font-size="20" font-weight="600">ORGANIC GROWTH</text>
      <text x="640" y="380" fill="${ORANGE}" font-size="86" font-weight="800">${ms}ms</text>
      <text x="640" y="420" fill="#FFFFFF" fill-opacity="0.5" font-size="20" font-weight="600">LOAD SPEED</text>
      <text x="980" y="380" fill="${ORANGE}" font-size="86" font-weight="800">${roas}X</text>
      <text x="980" y="420" fill="#FFFFFF" fill-opacity="0.5" font-size="20" font-weight="600">AVG. ROAS</text>
    </g>

    <g opacity="${ctaIn}" transform="translate(0, ${20 * (1 - ctaIn)})">
      <rect x="${W / 2 - 210}" y="600" width="420" height="80" rx="40" fill="${ORANGE}"/>
      <text x="${W / 2}" y="652" text-anchor="middle" fill="#050505"
        font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="800" letter-spacing="1">FREE WEBSITE TEARDOWN</text>
    </g>
  </svg>`;
}

(async () => {
  if (fs.existsSync(FRAMES_DIR)) fs.rmSync(FRAMES_DIR, { recursive: true, force: true });
  fs.mkdirSync(FRAMES_DIR, { recursive: true });

  console.log(`Rendering ${TOTAL} frames...`);
  for (let i = 0; i < TOTAL; i++) {
    const svg = frameSVG(i);
    const file = path.join(FRAMES_DIR, `f${String(i).padStart(4, "0")}.png`);
    await sharp(Buffer.from(svg)).png().toFile(file);
  }

  console.log("Encoding MP4...");
  execFileSync(
    ffmpegPath,
    [
      "-y",
      "-framerate", String(FPS),
      "-i", path.join(FRAMES_DIR, "f%04d.png"),
      "-c:v", "libx264",
      "-pix_fmt", "yuv420p",
      "-movflags", "+faststart",
      OUT,
    ],
    { stdio: "inherit" }
  );

  fs.rmSync(FRAMES_DIR, { recursive: true, force: true });
  console.log("Done:", OUT);
})();
