import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Editorial OG card. Uses next/og's bundled font for build reliability
// (no external font fetch), styled to match the site's warm-paper palette.
export default function OpengraphImage() {
  const paper = "#f6f2ea";
  const ink = "#1b1916";
  const inkSoft = "#57514a";
  const accent = "#c2470f";
  const line = "#cfc6b6";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: paper,
          padding: "80px",
          position: "relative",
        }}
      >
        {/* top accent rule */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "12px",
            backgroundColor: accent,
          }}
        />

        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: "0.18em",
            fontWeight: 600,
            textTransform: "uppercase",
            color: inkSoft,
          }}
        >
          {site.role}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 132,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              color: ink,
              lineHeight: 1,
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "28px",
              fontSize: 30,
              lineHeight: 1.35,
              color: inkSoft,
              maxWidth: "900px",
            }}
          >
            {site.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            paddingTop: "28px",
            borderTop: `2px solid ${line}`,
            fontSize: 26,
            fontWeight: 600,
            color: ink,
          }}
        >
          <div
            style={{
              display: "flex",
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              backgroundColor: accent,
            }}
          />
          snketdesai.com
        </div>
      </div>
    ),
    { ...size },
  );
}
