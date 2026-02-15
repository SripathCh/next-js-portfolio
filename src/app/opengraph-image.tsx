import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Portfolio | Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Auto-generated OG image for social media sharing
// Next.js serves this at /opengraph-image
export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 800,
            color: "#ededed",
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
          }}
        >
          YOUR NAME
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#646cff",
            marginTop: 16,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          Full-Stack Developer &amp; AI Enthusiast
        </div>
      </div>
    ),
    { ...size }
  );
}
