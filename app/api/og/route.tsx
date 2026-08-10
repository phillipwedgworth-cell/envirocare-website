import { ImageResponse } from "next/og";
import { type NextRequest } from "next/server";

export const runtime = "edge";

function slugToName(slug: string): string {
  const overrides: Record<string, string> = {
    "mt-laurel": "Mt Laurel",
    "hampton-cove": "Hampton Cove",
    "lake-martin": "Lake Martin",
    "alexander-city": "Alexander City",
    "mountain-brook": "Mountain Brook",
    "vestavia-hills": "Vestavia Hills",
  };
  return (
    overrides[slug] ??
    slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
  );
}

export async function GET(request: NextRequest) {
  const slug = new URL(request.url).searchParams.get("slug") ?? "";
  const cityName = slugToName(slug);
  const fontSize = cityName.length > 14 ? 72 : cityName.length > 10 ? 84 : 96;

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "linear-gradient(135deg, #0A7935 0%, #07642B 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 72px",
          fontFamily: "Georgia, 'Times New Roman', serif",
          position: "relative",
        }}
      >
        {/* subtle dot grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* gold accent bar left edge */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 8,
            background: "#F5A800",
          }}
        />

        {/* ENVIROCARE wordmark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            zIndex: 1,
          }}
        >
          <div
            style={{
              color: "#F5A800",
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            🌻 ENVIROCARE
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: 18,
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            {/* Reads as "ENVIROCARE Pest Services" with the line above -- the
                published brand name (docs/decisions/name.md). This string is
                rendered INTO the social share image, so it is the brand name on
                every Facebook, LinkedIn and X preview of every page. It said
                "Pest & Termite Services" until 2026-08-10: an image, so no text
                sweep could ever have found it. */}
            Pest Services
          </div>
        </div>

        {/* city name + subtitle */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: 16, zIndex: 1 }}
        >
          <div
            style={{
              color: "white",
              fontSize,
              fontWeight: 700,
              lineHeight: 1.0,
              fontFamily: "Georgia, 'Times New Roman', serif",
            }}
          >
            {cityName}
          </div>
          <div
            style={{
              color: "#F5A800",
              fontSize: 32,
              fontStyle: "italic",
              fontFamily: "Georgia, 'Times New Roman', serif",
            }}
          >
            Pest, Termite &amp; Mosquito Control
          </div>
        </div>

        {/* tagline */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            zIndex: 1,
          }}
        >
          <div
            style={{
              color: "rgba(255,255,255,0.9)",
              fontSize: 22,
              letterSpacing: "0.04em",
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            No One Cares Like EnviroCare
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: 16,
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            Family-owned since 1958 · Alabama
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
