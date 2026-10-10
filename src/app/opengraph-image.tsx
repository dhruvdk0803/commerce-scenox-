import { ImageResponse } from "next/og";

export const alt = "Scenox Commerce: 1000+ products, 48 hours, live on your store";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Site-wide social preview. Brand palette: porcelain, carbon, ember accent. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F5F4EF",
          color: "#101112",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 4 }}>
          <span style={{ fontWeight: 700 }}>SCENOX</span>
          <span style={{ color: "#6B6B66", marginLeft: 12 }}>/ COMMERCE</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 92, fontWeight: 700, lineHeight: 1, letterSpacing: -3 }}>
          <span>1000+ PRODUCTS.</span>
          <span>48 HOURS.</span>
          <span>LIVE ON YOUR STORE.</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #D9D7CF", paddingTop: 24, fontSize: 24, color: "#4A4A46" }}>
          <span>Catalog · Feeds · Email · WhatsApp · AI support</span>
          <span style={{ color: "#C2410C", fontWeight: 600 }}>Run by AI. Checked by people.</span>
        </div>
      </div>
    ),
    size,
  );
}
