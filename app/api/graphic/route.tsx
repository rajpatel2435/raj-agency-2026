import { ImageResponse } from "next/og";

export const runtime = "edge";

type FormatKey = "post" | "story" | "landscape" | "linkedin";
type ThemeKey = "dark" | "orange" | "light" | "glow";

const FORMATS: Record<FormatKey, { width: number; height: number }> = {
  post: { width: 1080, height: 1080 },
  story: { width: 1080, height: 1920 },
  landscape: { width: 1200, height: 630 },
  linkedin: { width: 1584, height: 396 },
};

const THEMES: Record<
  ThemeKey,
  { bg: string; title: string; sub: string; accent: string; wordFaint: string }
> = {
  dark: { bg: "#050505", title: "#ffffff", sub: "#a1a1aa", accent: "#F95D0A", wordFaint: "#71717a" },
  orange: { bg: "#F95D0A", title: "#050505", sub: "#1c1c1c", accent: "#050505", wordFaint: "#7a2e05" },
  light: { bg: "#ffffff", title: "#050505", sub: "#52525b", accent: "#F95D0A", wordFaint: "#a1a1aa" },
  glow: { bg: "#080808", title: "#ffffff", sub: "#a1a1aa", accent: "#F95D0A", wordFaint: "#71717a" },
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const format = (searchParams.get("format") as FormatKey) in FORMATS
    ? (searchParams.get("format") as FormatKey)
    : "post";
  const theme = (searchParams.get("theme") as ThemeKey) in THEMES
    ? (searchParams.get("theme") as ThemeKey)
    : "dark";

  const eyebrow = (searchParams.get("eyebrow") || "Launch at Dawn").slice(0, 60);
  const title = (searchParams.get("title") || "Your headline goes here").slice(0, 140);
  const subtitle = (searchParams.get("subtitle") || "").slice(0, 200);
  const cta = (searchParams.get("cta") || "").slice(0, 40);

  const { width, height } = FORMATS[format];
  const t = THEMES[theme];

  const isStory = format === "story";
  const isBanner = format === "linkedin";

  // Scale typography to the canvas.
  const base = Math.min(width, height);
  const pad = isBanner ? 64 : Math.round(base * 0.09);
  const titleSize = isBanner
    ? title.length > 40 ? 52 : 68
    : title.length > 80
      ? Math.round(base * 0.075)
      : title.length > 40
        ? Math.round(base * 0.095)
        : Math.round(base * 0.12);
  const eyebrowSize = isBanner ? 20 : Math.round(base * 0.026);
  const subSize = isBanner ? 24 : Math.round(base * 0.036);
  const wordSize = isBanner ? 30 : Math.round(base * 0.045);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: t.bg,
          padding: `${pad}px`,
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Accent glow for the glow theme */}
        {theme === "glow" && (
          <div
            style={{
              position: "absolute",
              top: -height * 0.15,
              right: -width * 0.1,
              width: width * 0.7,
              height: width * 0.7,
              borderRadius: "9999px",
              backgroundColor: "rgba(249,93,10,0.18)",
              display: "flex",
            }}
          />
        )}

        {/* Eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: `${eyebrowSize * 0.8}px`,
              height: `${eyebrowSize * 0.8}px`,
              borderRadius: "9999px",
              backgroundColor: t.accent,
              display: "flex",
            }}
          />
          <div
            style={{
              color: t.accent,
              fontSize: `${eyebrowSize}px`,
              fontWeight: 700,
              letterSpacing: `${Math.max(4, eyebrowSize * 0.3)}px`,
              textTransform: "uppercase",
            }}
          >
            {eyebrow}
          </div>
        </div>

        {/* Title + subtitle */}
        <div style={{ display: "flex", flexDirection: "column", gap: `${subSize}px`, maxWidth: "100%" }}>
          <div
            style={{
              display: "flex",
              color: t.title,
              fontSize: `${titleSize}px`,
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: "-2px",
              textTransform: "uppercase",
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                display: "flex",
                color: t.sub,
                fontSize: `${subSize}px`,
                fontWeight: 500,
                lineHeight: 1.25,
                maxWidth: isStory ? "100%" : "85%",
              }}
            >
              {subtitle}
            </div>
          ) : null}
          {cta ? (
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                marginTop: `${subSize * 0.5}px`,
                backgroundColor: t.accent,
                color: theme === "light" || theme === "glow" || theme === "dark" ? "#050505" : "#ffffff",
                fontSize: `${subSize}px`,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "2px",
                padding: `${subSize * 0.6}px ${subSize * 1.2}px`,
                borderRadius: "9999px",
              }}
            >
              {cta}
            </div>
          ) : null}
        </div>

        {/* Wordmark footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "baseline", fontSize: `${wordSize}px`, fontWeight: 800 }}>
            <span style={{ color: t.title }}>launch</span>
            <span style={{ color: t.wordFaint, fontSize: `${wordSize * 0.65}px`, fontStyle: "italic", padding: "0 6px" }}>at</span>
            <span style={{ color: t.accent }}>dawn</span>
          </div>
          <div
            style={{
              color: t.wordFaint,
              fontSize: `${wordSize * 0.55}px`,
              fontWeight: 700,
              letterSpacing: "4px",
              textTransform: "uppercase",
            }}
          >
            Montreal // Vancouver
          </div>
        </div>
      </div>
    ),
    { width, height }
  );
}
