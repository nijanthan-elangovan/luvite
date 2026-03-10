"use client";

import { useEffect, useState } from "react";
import removeBackground from "@imgly/background-removal";

export interface PortraitCutoutProps {
  imageUrl?: string;
  width?: number;
  autoProcess?: boolean;
  buttonText?: string;
  frameColor?: string;
  shadowColor?: string;
}

export default function PortraitCutout({
  imageUrl = "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=900&q=80",
  width = 380,
  autoProcess = false,
  buttonText = "Create Portrait Cutout",
  frameColor = "#c9a84c",
  shadowColor = "rgba(0,0,0,0.28)",
}: PortraitCutoutProps) {
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!autoProcess) return;
    void processCutout();
  }, [autoProcess, imageUrl]);

  async function processCutout() {
    if (!imageUrl) return;

    setLoading(true);
    setError(null);

    try {
      const blob = await removeBackground(imageUrl, {
        model: "isnet_fp16",
      });
      const url = URL.createObjectURL(blob);
      setProcessedUrl(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Background removal failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section style={{ textAlign: "center", width: "100%" }}>
      <div
        style={{
          position: "relative",
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          width,
          maxWidth: "100%",
          minHeight: 280,
          borderRadius: 18,
          border: `1px solid ${frameColor}66`,
          background: "linear-gradient(145deg, rgba(255,255,255,0.88), rgba(255,255,255,0.55))",
          padding: 16,
          overflow: "hidden",
        }}
      >
        {processedUrl ? (
          <img
            src={processedUrl}
            alt="Cutout portrait"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
              filter: `drop-shadow(0 24px 22px ${shadowColor})`,
            }}
          />
        ) : (
          <img
            src={imageUrl}
            alt="Source portrait"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              borderRadius: 14,
            }}
          />
        )}
      </div>

      {!autoProcess && !processedUrl ? (
        <div style={{ marginTop: 14 }}>
          <button
            type="button"
            disabled={loading}
            onClick={processCutout}
            style={{
              border: "none",
              borderRadius: 999,
              background: "#111827",
              color: "#fff",
              padding: "10px 16px",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              fontWeight: 600,
            }}
          >
            {loading ? "Processing..." : buttonText}
          </button>
        </div>
      ) : null}

      {error ? (
        <p style={{ marginTop: 8, fontSize: 12, color: "#b91c1c" }}>{error}</p>
      ) : null}
    </section>
  );
}
