"use client";

export interface GoogleMapProps {
  address?: string;
  height?: number;
}

export default function GoogleMap({
  address = "New York, NY",
  height = 320,
}: GoogleMapProps) {
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <section style={{ width: "100%" }}>
      <div
        style={{
          position: "relative",
          width: "100%",
          height,
          minHeight: 200,
          borderRadius: 12,
          overflow: "hidden",
          border: "1px solid #e5e7eb",
        }}
      >
        <iframe
          src={src}
          title={`Map for ${address}`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </section>
  );
}
