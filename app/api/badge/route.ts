// Serves an embeddable SVG badge that clients place on their site.
// Each embed is a high-relevance backlink to Launch at Dawn.
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const theme = searchParams.get("theme") === "light" ? "light" : "dark";

  const bg = theme === "light" ? "#ffffff" : "#050505";
  const border = theme === "light" ? "#e5e5e5" : "#1a1a1a";
  const textColor = theme === "light" ? "#050505" : "#ffffff";
  const sub = theme === "light" ? "#71717a" : "#a1a1aa";

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="52" viewBox="0 0 200 52" role="img" aria-label="Built by Launch at Dawn">
  <rect x="0.5" y="0.5" width="199" height="51" rx="9" fill="${bg}" stroke="${border}"/>
  <circle cx="22" cy="26" r="7" fill="#F95D0A"/>
  <text x="40" y="21" font-family="Arial, Helvetica, sans-serif" font-size="9" font-weight="700" letter-spacing="1.5" fill="${sub}">BUILT BY</text>
  <text x="40" y="37" font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="800" fill="${textColor}">launch<tspan fill="#F95D0A">at</tspan>dawn</text>
</svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
