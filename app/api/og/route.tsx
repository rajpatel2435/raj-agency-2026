import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get("title") || "Launch at Dawn").slice(0, 120);
  const eyebrow = (searchParams.get("eyebrow") || "Digital Engineering & SEO").slice(0, 60);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#050505",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top row: wordmark + accent */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "18px",
              height: "18px",
              borderRadius: "9999px",
              backgroundColor: "#F95D0A",
            }}
          />
          <div
            style={{
              color: "#F95D0A",
              fontSize: "22px",
              fontWeight: 700,
              letterSpacing: "8px",
              textTransform: "uppercase",
            }}
          >
            {eyebrow}
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            color: "#ffffff",
            fontSize: title.length > 60 ? "64px" : "84px",
            fontWeight: 800,
            lineHeight: 1.02,
            letterSpacing: "-3px",
            maxWidth: "1000px",
          }}
        >
          {title}
        </div>

        {/* Bottom row: brand */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "baseline", fontSize: "40px", fontWeight: 800 }}>
            <span style={{ color: "#ffffff" }}>launch</span>
            <span style={{ color: "#71717a", fontSize: "26px", fontStyle: "italic", padding: "0 6px" }}>at</span>
            <span style={{ color: "#F95D0A" }}>dawn</span>
          </div>
          <div
            style={{
              color: "#71717a",
              fontSize: "22px",
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
    {
      width: 1200,
      height: 630,
    }
  );
}
