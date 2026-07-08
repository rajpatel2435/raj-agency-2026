// Renders a vertical (9:16) animated cartoon reel for Instagram.
// Cute rocket mascot launches "at dawn". Motion-graphics, no external assets.
// Run: node public/gbp/generate-reel.js
const sharp = require("sharp");
const ffmpegPath = require("ffmpeg-static");
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const W = 1080;
const H = 1920;
const FPS = 30;
const DURATION = 12; // seconds
const TOTAL = FPS * DURATION;
const ORANGE = "#F95D0A";

const FRAMES_DIR = path.join(__dirname, "_reel_frames");
const OUT = path.join(__dirname, "instagram-reel.mp4");

const clamp01 = (x) => Math.max(0, Math.min(1, x));
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const seg = (t, a, b, ease = easeOut) => ease(clamp01((t - a) / (b - a)));
const lerp = (a, b, t) => a + (b - a) * t;

// Cartoon rocket mascot with face
function rocket(x, y, s, rot, flame) {
  const flameH = 60 + flame * 60;
  const flameW = 26 + flame * 8;
  return `
  <g transform="translate(${x},${y}) rotate(${rot}) scale(${s})">
    <!-- flame -->
    <g>
      <path d="M-${flameW},60 Q0,${60 + flameH} ${flameW},60 Q0,90 -${flameW},60 Z" fill="#FFD54A"/>
      <path d="M-${flameW * 0.6},60 Q0,${60 + flameH * 0.7} ${flameW * 0.6},60 Q0,80 -${flameW * 0.6},60 Z" fill="${ORANGE}"/>
    </g>
    <!-- fins -->
    <path d="M-34,30 L-64,80 L-34,64 Z" fill="${ORANGE}"/>
    <path d="M34,30 L64,80 L34,64 Z" fill="${ORANGE}"/>
    <!-- body -->
    <path d="M0,-90 C46,-60 50,10 34,64 L-34,64 C-50,10 -46,-60 0,-90 Z" fill="#FFFFFF"/>
    <path d="M0,-90 C46,-60 50,10 34,64 L0,64 L0,-90 Z" fill="#EDEDED"/>
    <!-- nose -->
    <path d="M0,-90 C18,-74 24,-58 24,-44 L-24,-44 C-24,-58 -18,-74 0,-90 Z" fill="${ORANGE}"/>
    <!-- window / face -->
    <circle cx="0" cy="-6" r="30" fill="#0A0A0A"/>
    <circle cx="0" cy="-6" r="30" fill="none" stroke="${ORANGE}" stroke-width="5"/>
    <!-- eyes -->
    <circle cx="-11" cy="-10" r="6" fill="#FFFFFF"/>
    <circle cx="11" cy="-10" r="6" fill="#FFFFFF"/>
    <circle cx="-9" cy="-9" r="2.6" fill="#0A0A0A"/>
    <circle cx="13" cy="-9" r="2.6" fill="#0A0A0A"/>
    <!-- smile -->
    <path d="M-10,4 Q0,14 10,4" stroke="#FFFFFF" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  </g>`;
}

function star(x, y, r, o) {
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="#FFFFFF" opacity="${o}"/>`;
}

function frameSVG(i) {
  const t = i / FPS;

  // Dawn sky gradient shifts brighter over time
  const dawn = seg(t, 0, 6, easeInOut);
  const skyTop = `rgb(${Math.round(lerp(8, 20, dawn))},${Math.round(lerp(8, 14, dawn))},${Math.round(lerp(20, 30, dawn))})`;
  const skyBot = `rgb(${Math.round(lerp(20, 249, dawn))},${Math.round(lerp(14, 93, dawn))},${Math.round(lerp(20, 10, dawn))})`;

  // Sun rises
  const sunRise = seg(t, 0.5, 4.5, easeOut);
  const sunY = lerp(H + 120, H * 0.62, sunRise);
  const rayRot = (t * 20) % 360;

  // Rocket phases
  const wiggle = t > 4 && t < 6 ? Math.sin(t * 30) * 3 : 0;
  const launch = seg(t, 6, 10, easeInOut);
  const rocketY = lerp(H * 0.6, -260, launch);
  const rocketX = W / 2 + Math.sin(t * 4) * 8 * (1 - launch);
  const rocketScale = lerp(1.15, 0.75, launch);
  const flame = t > 5.4 ? 0.4 + 0.6 * Math.abs(Math.sin(t * 22)) : (t > 4 ? 0.2 : 0);

  // Countdown 3-2-1 (4s..5.5s)
  let countdown = "";
  if (t >= 4 && t < 5.6) {
    const n = t < 4.5 ? "3" : t < 5.0 ? "2" : "1";
    const local = (t * 2) % 1;
    const pop = 1 + 0.2 * (1 - local);
    countdown = `<text x="${W / 2}" y="${H * 0.32}" text-anchor="middle" fill="#FFFFFF" opacity="${0.85}" font-family="Arial, Helvetica, sans-serif" font-size="${220 * pop}" font-weight="800">${n}</text>`;
  }

  // Stars fade with dawn
  const starO = (1 - dawn) * 0.8;
  let stars = "";
  const seeds = [[120, 300, 4], [900, 240, 5], [300, 500, 3], [780, 560, 4], [180, 700, 3], [980, 760, 5], [500, 220, 3], [640, 420, 4]];
  for (const [sx, sy, sr] of seeds) stars += star(sx, sy, sr, starO * (0.5 + 0.5 * Math.abs(Math.sin(t * 2 + sx))));

  // Title in (0.4-2s), fades out before launch
  const titleIn = seg(t, 0.4, 1.8);
  const titleOut = 1 - seg(t, 3.4, 4.2);
  const titleOp = titleIn * titleOut;

  // Message during launch
  const msgIn = seg(t, 6.4, 7.4);
  const msgOut = 1 - seg(t, 9.0, 9.6);
  const msgOp = msgIn * msgOut;

  // Final CTA
  const ctaIn = seg(t, 9.8, 10.8);

  // Growth bars in final scene
  let bars = "";
  const barP = seg(t, 10.0, 11.4);
  const heights = [120, 200, 300, 430, 560];
  heights.forEach((hh, idx) => {
    const bh = hh * barP;
    bars += `<rect x="${180 + idx * 150}" y="${H * 0.5 - bh + 200}" width="90" height="${bh}" rx="12" fill="${ORANGE}" opacity="${0.35 + idx * 0.13}"/>`;
  });

  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${skyTop}"/>
        <stop offset="100%" stop-color="${skyBot}"/>
      </linearGradient>
      <radialGradient id="sun" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#FFE9A8"/>
        <stop offset="60%" stop-color="#FFC24A"/>
        <stop offset="100%" stop-color="${ORANGE}"/>
      </radialGradient>
    </defs>

    <rect width="${W}" height="${H}" fill="url(#sky)"/>
    ${stars}

    <!-- Sun with rotating rays -->
    <g transform="translate(${W / 2},${sunY})">
      <g transform="rotate(${rayRot})" opacity="${0.5 * sunRise}">
        ${Array.from({ length: 12 }).map((_, k) => `<rect x="-6" y="-360" width="12" height="120" rx="6" fill="#FFD98A" transform="rotate(${k * 30})"/>`).join("")}
      </g>
      <circle r="${220 * sunRise}" fill="url(#sun)"/>
    </g>

    <!-- Ground -->
    <path d="M0,${H * 0.78} Q${W / 2},${H * 0.74} ${W},${H * 0.78} L${W},${H} L0,${H} Z" fill="#0A0A0A" opacity="0.55"/>

    ${bars}

    ${rocket(rocketX + wiggle, rocketY, rocketScale, wiggle * 0.6, flame)}

    ${countdown}

    <!-- Title -->
    <g opacity="${titleOp}" transform="translate(0, ${30 * (1 - titleIn)})">
      <text x="${W / 2}" y="${H * 0.2}" text-anchor="middle" fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-size="96" font-weight="800" letter-spacing="-2">launch<tspan fill="${ORANGE}">at</tspan>dawn</text>
      <text x="${W / 2}" y="${H * 0.2 + 60}" text-anchor="middle" fill="#FFFFFF" fill-opacity="0.6" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="600">Technical SEO &amp; Web Development</text>
    </g>

    <!-- Message -->
    <g opacity="${msgOp}" transform="translate(0, ${20 * (1 - msgIn)})">
      <text x="${W / 2}" y="${H * 0.86}" text-anchor="middle" fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="800" letter-spacing="-1">We launch your</text>
      <text x="${W / 2}" y="${H * 0.86 + 84}" text-anchor="middle" fill="${ORANGE}" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="800" letter-spacing="-1">growth.</text>
    </g>

    <!-- CTA -->
    <g opacity="${ctaIn}" transform="translate(0, ${30 * (1 - ctaIn)})">
      <text x="${W / 2}" y="${H * 0.72}" text-anchor="middle" fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-size="64" font-weight="800">Free Website Teardown</text>
      <rect x="${W / 2 - 260}" y="${H * 0.75}" width="520" height="110" rx="55" fill="${ORANGE}"/>
      <text x="${W / 2}" y="${H * 0.75 + 72}" text-anchor="middle" fill="#0A0A0A" font-family="Arial, Helvetica, sans-serif" font-size="40" font-weight="800" letter-spacing="1">BOOK NOW</text>
      <text x="${W / 2}" y="${H * 0.9}" text-anchor="middle" fill="#FFFFFF" fill-opacity="0.6" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="600">@launchatdawn  //  launchatdawn.com</text>
    </g>
  </svg>`;
}

(async () => {
  if (fs.existsSync(FRAMES_DIR)) fs.rmSync(FRAMES_DIR, { recursive: true, force: true });
  fs.mkdirSync(FRAMES_DIR, { recursive: true });

  console.log(`Rendering ${TOTAL} frames (${W}x${H})...`);
  for (let i = 0; i < TOTAL; i++) {
    const svg = frameSVG(i);
    const file = path.join(FRAMES_DIR, `f${String(i).padStart(4, "0")}.png`);
    await sharp(Buffer.from(svg)).png().toFile(file);
    if (i % 60 === 0) console.log(`  ${i}/${TOTAL}`);
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
