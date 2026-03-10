"use client";

import Countdown from "@/components/blocks/Countdown";

export interface CityHeroProps {
  blessingText?: string;
  familyText?: string;
  title?: string;
  subtitle?: string;
  targetDate?: string;
  themeColor?: string;
  backgroundImage?: string;
  overlayColor?: string;
  minHeight?: string;
}

export default function CityHero({
  blessingText = "? ???? ?????? ??",
  familyText = "WITH BLESSINGS OF OUR FAMILIES",
  title = "ABHISHEK WEDS KANIKA",
  subtitle = "Join us as we celebrate love, laughter, and a lifetime together.",
  targetDate = "2027-02-21T18:00:00",
  themeColor = "#c9a84c",
  backgroundImage = "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1800&q=80",
  overlayColor = "rgba(12,10,8,0.64)",
  minHeight = "100vh",
}: CityHeroProps) {
  return (
    <section
      style={{
        minHeight,
        position: "relative",
        padding: "80px 24px 70px",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ position: "absolute", inset: 0, background: overlayColor }} />

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 960, textAlign: "center" }}>
        <p
          style={{
            margin: "0 0 20px",
            color: "#d9bc77",
            fontSize: 17,
            letterSpacing: "0.14em",
            fontFamily: "'Cormorant Garamond', serif",
          }}
        >
          {blessingText}
        </p>

        <p
          style={{
            margin: "0 0 26px",
            color: "#b59a5f",
            fontSize: 12,
            letterSpacing: "0.3em",
            fontFamily: "Manrope, sans-serif",
          }}
        >
          {familyText}
        </p>

        <h1
          style={{
            margin: "0 0 16px",
            color: "#f6efe3",
            fontWeight: 400,
            letterSpacing: "0.08em",
            fontSize: "clamp(2rem, 6vw, 4rem)",
            fontFamily: "'Cormorant Garamond', serif",
            lineHeight: 1.2,
          }}
        >
          {title}
        </h1>

        <p
          style={{
            margin: "0 0 32px",
            color: "#d4c3a2",
            fontSize: 18,
            letterSpacing: "0.04em",
            fontFamily: "'Cormorant Garamond', serif",
          }}
        >
          {subtitle}
        </p>

        <Countdown targetDate={targetDate} expiredMessage="The celebrations are live!" themeColor={themeColor} />
      </div>
    </section>
  );
}
