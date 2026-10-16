import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Scenox Commerce: 1000+ products live on your store in 48 hours for eligible projects";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Site-wide social preview. Brand palette: porcelain, carbon, ember accent. */
export default async function OpengraphImage() {
  const font = (f: string) => readFile(join(process.cwd(), "src/assets/fonts", f));
  const [semi, medium] = await Promise.all([font("Geist-SemiBold.ttf"), font("Geist-Medium.ttf")]);
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
          fontFamily: "Geist",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 38, letterSpacing: -1.2 }}>
          <svg width="56" height="56" viewBox="0 0 48 48">
            <rect width="48" height="48" rx="11" fill="#101112" />
            <path d="M26.8 9h7.8L21.2 39h-7.8z" fill="#C2410C" />
            <rect x="31" y="31.5" width="7.5" height="7.5" rx="1.5" fill="#F5F4EF" />
          </svg>
          <span style={{ fontWeight: 600, marginLeft: 18 }}>scenox</span>
          <span style={{ fontWeight: 500, color: "#C2410C", margin: "0 2px" }}>/</span>
          <span style={{ fontWeight: 500, color: "#5A5D5F" }}>commerce</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 92, fontWeight: 600, lineHeight: 1, letterSpacing: -3.5 }}>
          <span>1000+ PRODUCTS.</span>
          <span>48 HOURS.</span>
          <span>LIVE ON YOUR STORE.</span>
          <span style={{ fontSize: 22, fontWeight: 500, letterSpacing: 0, color: "#5A5D5F", marginTop: 22 }}>48 hours is for eligible projects; turnaround depends on scope and your data.</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #D9D7CF", paddingTop: 24, fontSize: 24, color: "#4A4A46" }}>
          <span>Catalog · Feeds · Email · WhatsApp · AI support</span>
          <span style={{ color: "#C2410C", fontWeight: 500 }}>Run by AI. Checked by people.</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: semi, weight: 600, style: "normal" },
        { name: "Geist", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
}
