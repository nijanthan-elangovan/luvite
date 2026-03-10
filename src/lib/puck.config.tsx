import type { Config } from "@puckeditor/core";
import Hero3D from "@/components/blocks/Hero3D";
import InteractiveTimeline from "@/components/blocks/InteractiveTimeline";
import AudioEngine from "@/components/blocks/AudioEngine";
import RSVPForm from "@/components/blocks/RSVPForm";
import Countdown from "@/components/blocks/Countdown";
import GoogleMap from "@/components/blocks/GoogleMap";
import FloatingHearts from "@/components/blocks/FloatingHearts";
import FloatingPetals from "@/components/blocks/FloatingPetals";
import PhotoGallery from "@/components/blocks/PhotoGallery";
import EventCard from "@/components/blocks/EventCard";
import QuoteBlock from "@/components/blocks/QuoteBlock";
import CityHero from "@/components/blocks/CityHero";
import ScheduleCard from "@/components/blocks/ScheduleCard";
import AnimationWrapper from "@/components/blocks/AnimationWrapper";
import FontLoader from "@/components/blocks/FontLoader";

/* ── Google Fonts list (curated for wedding invitations) ── */
const googleFontOptions = [
  { label: "Default (Playfair)", value: "" },
  { label: "Cormorant Garamond", value: "Cormorant Garamond" },
  { label: "Great Vibes", value: "Great Vibes" },
  { label: "Dancing Script", value: "Dancing Script" },
  { label: "Tangerine", value: "Tangerine" },
  { label: "Cinzel", value: "Cinzel" },
  { label: "Libre Baskerville", value: "Libre Baskerville" },
  { label: "Lora", value: "Lora" },
  { label: "Marcellus", value: "Marcellus" },
  { label: "Pinyon Script", value: "Pinyon Script" },
  { label: "Alex Brush", value: "Alex Brush" },
  { label: "Sacramento", value: "Sacramento" },
  { label: "Italiana", value: "Italiana" },
  { label: "Josefin Sans", value: "Josefin Sans" },
  { label: "Montserrat", value: "Montserrat" },
  { label: "Raleway", value: "Raleway" },
  { label: "Poppins", value: "Poppins" },
  { label: "Manrope", value: "Manrope" },
];

const fontField = {
  type: "select" as const,
  label: "Font",
  options: googleFontOptions,
};

const alignField = {
  type: "select" as const,
  label: "Alignment",
  options: [
    { label: "Left", value: "left" },
    { label: "Center", value: "center" },
    { label: "Right", value: "right" },
  ],
};

const contentStyleFields = {
  color: { type: "text", label: "Color" as const },
  fontSize: { type: "number", label: "Font Size" as const, min: 10, max: 96 },
  fontFamily: fontField,
  align: alignField,
  margin: { type: "text", label: "Margin" as const },
};

const motionField = {
  type: "object" as const,
  label: "Motion",
  objectFields: {
    type: {
      type: "select" as const,
      label: "Type",
      options: [
        { label: "Fade", value: "fade" },
        { label: "Slide", value: "slide" },
        { label: "Zoom", value: "zoom" },
      ],
    },
    delay: { type: "number" as const, label: "Delay (s)", min: 0, max: 5, step: 0.1 },
    parallaxSpeed: {
      type: "number" as const,
      label: "Parallax Speed",
      min: 0,
      max: 5,
      step: 0.1,
    },
  },
};

const defaultMotion = {
  type: "fade",
  delay: 0,
  parallaxSpeed: 0,
};

/** Resolve font-family CSS string, loading the Google Font if needed */
function resolveFont(fontFamily?: string) {
  if (!fontFamily) return "var(--font-display), serif";
  return `'${fontFamily}', serif`;
}

export const puckConfig: Config = {
  categories: {
    layout: {
      title: "Layout",
      components: ["Section", "Columns", "FlexRow", "Spacer"],
      defaultExpanded: true,
    },
    content: {
      title: "Content",
      components: ["Heading", "Paragraph", "Image", "Button", "Divider", "QuoteBlock"],
      defaultExpanded: true,
    },
    widgets: {
      title: "Widgets",
      components: ["RSVPForm", "Countdown", "GoogleMap", "EventCard", "ScheduleCard", "PhotoGallery"],
      defaultExpanded: true,
    },
    effects: {
      title: "Effects & Decor",
      components: ["FloatingPetals", "FloatingHearts"],
      defaultExpanded: true,
    },
    advanced: {
      title: "Advanced",
      components: ["CityHero", "Hero3D", "InteractiveTimeline", "AudioEngine"],
    },
  },
  components: {
    /* ═══════════════════ LAYOUT ═══════════════════ */
    Section: {
      label: "Section",
      fields: {
        backgroundColor: { type: "text", label: "Background Color" },
        backgroundImage: { type: "text", label: "Background Image URL" },
        backgroundOverlay: { type: "text", label: "Overlay Color (rgba)" },
        padding: { type: "text", label: "Padding" },
        margin: { type: "text", label: "Margin" },
        minHeight: { type: "text", label: "Min Height" },
        children: { type: "slot", label: "Content" },
        motion: motionField,
      },
      defaultProps: {
        backgroundColor: "transparent",
        backgroundImage: "",
        backgroundOverlay: "",
        padding: "24px",
        margin: "0",
        minHeight: "",
        motion: defaultMotion,
      },
      render: ({ children: Slot, backgroundColor, backgroundImage, backgroundOverlay, padding, margin, minHeight, motion }) => (
        <AnimationWrapper motionConfig={motion}>
          <section
            style={{
              backgroundColor,
              padding,
              margin,
              minHeight: minHeight || undefined,
              position: "relative",
              overflow: "hidden",
              ...(backgroundImage
                ? {
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : {}),
            }}
          >
            {backgroundOverlay && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: backgroundOverlay,
                  pointerEvents: "none",
                }}
              />
            )}
            <div style={{ position: "relative", zIndex: 1 }}>
              <Slot />
            </div>
          </section>
        </AnimationWrapper>
      ),
    },

    Columns: {
      label: "Columns",
      fields: {
        gap: { type: "number", label: "Gap", min: 0, max: 80 },
        horizontalAlign: {
          type: "select",
          label: "Horizontal Align",
          options: [
            { label: "Stretch", value: "stretch" },
            { label: "Start", value: "start" },
            { label: "Center", value: "center" },
            { label: "End", value: "end" },
          ],
        },
        verticalAlign: {
          type: "select",
          label: "Vertical Align",
          options: [
            { label: "Stretch", value: "stretch" },
            { label: "Top", value: "start" },
            { label: "Center", value: "center" },
            { label: "Bottom", value: "end" },
          ],
        },
        margin: { type: "text", label: "Margin" },
        left: { type: "slot", label: "Left Column" },
        right: { type: "slot", label: "Right Column" },
        motion: motionField,
      },
      defaultProps: {
        gap: 24,
        horizontalAlign: "stretch",
        verticalAlign: "stretch",
        margin: "0",
        motion: defaultMotion,
      },
      render: ({ left: LeftSlot, right: RightSlot, gap, horizontalAlign, verticalAlign, margin, motion }) => (
        <AnimationWrapper motionConfig={motion}>
          <section
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap,
              justifyItems: horizontalAlign,
              alignItems: verticalAlign,
              margin,
            }}
          >
            <div>
              <LeftSlot />
            </div>
            <div>
              <RightSlot />
            </div>
          </section>
        </AnimationWrapper>
      ),
    },

    FlexRow: {
      label: "Flex Row",
      fields: {
        gap: { type: "number", label: "Gap", min: 0, max: 80 },
        justifyContent: {
          type: "select",
          label: "Justify",
          options: [
            { label: "Start", value: "flex-start" },
            { label: "Center", value: "center" },
            { label: "End", value: "flex-end" },
            { label: "Space Between", value: "space-between" },
          ],
        },
        alignItems: {
          type: "select",
          label: "Align",
          options: [
            { label: "Start", value: "flex-start" },
            { label: "Center", value: "center" },
            { label: "End", value: "flex-end" },
            { label: "Stretch", value: "stretch" },
          ],
        },
        margin: { type: "text", label: "Margin" },
        children: { type: "slot", label: "Content" },
        motion: motionField,
      },
      defaultProps: {
        gap: 16,
        justifyContent: "flex-start",
        alignItems: "stretch",
        margin: "0",
        motion: defaultMotion,
      },
      render: ({ children: Slot, gap, justifyContent, alignItems, margin, motion }) => (
        <AnimationWrapper motionConfig={motion}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap,
              justifyContent,
              alignItems,
              margin,
            }}
          >
            <Slot />
          </div>
        </AnimationWrapper>
      ),
    },

    Spacer: {
      label: "Spacer",
      fields: {
        height: { type: "number", label: "Height", min: 0, max: 400 },
        motion: motionField,
      },
      defaultProps: {
        height: 32,
        motion: defaultMotion,
      },
      render: ({ height, motion }) => (
        <AnimationWrapper motionConfig={motion}>
          <div style={{ height }} aria-hidden="true" />
        </AnimationWrapper>
      ),
    },

    /* ═══════════════════ CONTENT ═══════════════════ */
    Heading: {
      label: "Heading",
      fields: {
        text: { type: "text", label: "Text" },
        level: {
          type: "select",
          label: "Heading Level",
          options: [
            { label: "H1", value: "h1" },
            { label: "H2", value: "h2" },
            { label: "H3", value: "h3" },
            { label: "H4", value: "h4" },
            { label: "H5", value: "h5" },
            { label: "H6", value: "h6" },
          ],
        },
        letterSpacing: { type: "text", label: "Letter Spacing" },
        fontWeight: {
          type: "select",
          label: "Weight",
          options: [
            { label: "Normal", value: "400" },
            { label: "Medium", value: "500" },
            { label: "Semi-Bold", value: "600" },
            { label: "Bold", value: "700" },
          ],
        },
        ...contentStyleFields,
        motion: motionField,
      },
      defaultProps: {
        text: "Heading",
        level: "h2",
        letterSpacing: "",
        fontWeight: "700",
        color: "#111827",
        fontSize: 36,
        fontFamily: "",
        align: "left",
        margin: "0 0 12px",
        motion: defaultMotion,
      },
      render: ({ text, level, letterSpacing, fontWeight, color, fontSize, fontFamily, align, margin, motion }) => {
        const Tag = (level || "h2") as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

        return (
          <AnimationWrapper motionConfig={motion}>
            <FontLoader fontFamily={fontFamily} />
            <Tag
              style={{
                color,
                fontSize,
                fontFamily: resolveFont(fontFamily),
                fontWeight: Number(fontWeight) || 700,
                textAlign: align,
                letterSpacing: letterSpacing || undefined,
                margin,
                lineHeight: 1.2,
              }}
            >
              {text}
            </Tag>
          </AnimationWrapper>
        );
      },
    },

    Paragraph: {
      label: "Paragraph",
      fields: {
        text: { type: "textarea", label: "Text" },
        letterSpacing: { type: "text", label: "Letter Spacing" },
        ...contentStyleFields,
        motion: motionField,
      },
      defaultProps: {
        text: "Add your paragraph text here.",
        letterSpacing: "",
        color: "#374151",
        fontSize: 16,
        fontFamily: "",
        align: "left",
        margin: "0 0 16px",
        motion: defaultMotion,
      },
      render: ({ text, letterSpacing, color, fontSize, fontFamily, align, margin, motion }) => (
        <AnimationWrapper motionConfig={motion}>
          <FontLoader fontFamily={fontFamily} />
          <p
            style={{
              color,
              fontSize,
              fontFamily: resolveFont(fontFamily),
              textAlign: align,
              letterSpacing: letterSpacing || undefined,
              margin,
              lineHeight: 1.6,
            }}
          >
            {text}
          </p>
        </AnimationWrapper>
      ),
    },

    Image: {
      label: "Image",
      fields: {
        src: { type: "text", label: "Image URL" },
        alt: { type: "text", label: "Alt Text" },
        borderRadius: { type: "number", label: "Border Radius", min: 0, max: 100 },
        ...contentStyleFields,
        motion: motionField,
      },
      defaultProps: {
        src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
        alt: "Image",
        borderRadius: 10,
        color: "#111827",
        fontSize: 14,
        fontFamily: "",
        align: "center",
        margin: "0 0 16px",
        motion: defaultMotion,
      },
      render: ({ src, alt, borderRadius, color, fontSize, align, margin, motion }) => (
        <AnimationWrapper motionConfig={motion}>
          <figure style={{ margin, color, fontSize, textAlign: align }}>
            <img
              src={src}
              alt={alt}
              style={{ width: "100%", height: "auto", display: "block", borderRadius }}
            />
          </figure>
        </AnimationWrapper>
      ),
    },

    Button: {
      label: "Button",
      fields: {
        text: { type: "text", label: "Button Text" },
        href: { type: "text", label: "URL" },
        backgroundColor: { type: "text", label: "Background Color" },
        borderRadius: { type: "number", label: "Border Radius", min: 0, max: 50 },
        ...contentStyleFields,
        motion: motionField,
      },
      defaultProps: {
        text: "Click here",
        href: "#",
        backgroundColor: "#111827",
        borderRadius: 8,
        color: "#ffffff",
        fontSize: 16,
        fontFamily: "",
        align: "left",
        margin: "0",
        motion: defaultMotion,
      },
      render: ({ text, href, backgroundColor, borderRadius, color, fontSize, fontFamily, align, margin, motion }) => (
        <AnimationWrapper motionConfig={motion}>
          <FontLoader fontFamily={fontFamily} />
          <div style={{ textAlign: align }}>
            <a
              href={href}
              style={{
                display: "inline-block",
                backgroundColor,
                color,
                fontSize,
                fontFamily: fontFamily ? resolveFont(fontFamily) : undefined,
                margin,
                padding: "10px 16px",
                borderRadius,
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              {text}
            </a>
          </div>
        </AnimationWrapper>
      ),
    },

    Divider: {
      label: "Divider",
      fields: {
        thickness: { type: "number", label: "Thickness", min: 1, max: 12 },
        ...contentStyleFields,
        motion: motionField,
      },
      defaultProps: {
        thickness: 1,
        color: "#d1d5db",
        fontSize: 0,
        fontFamily: "",
        align: "left",
        margin: "16px 0",
        motion: defaultMotion,
      },
      render: ({ thickness, color, margin, motion }) => (
        <AnimationWrapper motionConfig={motion}>
          <hr style={{ border: 0, borderTop: `${thickness}px solid ${color}`, margin }} />
        </AnimationWrapper>
      ),
    },

    QuoteBlock: {
      label: "Quote Block",
      fields: {
        text: { type: "textarea", label: "Quote Text" },
        attribution: { type: "text", label: "Attribution" },
        accentColor: { type: "text", label: "Accent Color" },
        textColor: { type: "text", label: "Text Color" },
        fontSize: { type: "number", label: "Font Size", min: 14, max: 48 },
        fontFamily: fontField,
        motion: motionField,
      },
      defaultProps: {
        text: "Two souls with but a single thought, two hearts that beat as one.",
        attribution: "— John Keats",
        accentColor: "#C9A84C",
        textColor: "#2C2C2C",
        fontSize: 22,
        fontFamily: "Cormorant Garamond",
        motion: defaultMotion,
      },
      render: ({ puck: _p, editMode: _e, id: _i, motion, fontFamily, ...props }) => (
        <AnimationWrapper motionConfig={motion}>
          <FontLoader fontFamily={fontFamily} />
          <QuoteBlock {...props} fontFamily={fontFamily ? `'${fontFamily}', serif` : ""} />
        </AnimationWrapper>
      ),
    },

    /* ═══════════════════ WIDGETS ═══════════════════ */
    RSVPForm: {
      label: "RSVP Form",
      fields: {
        title: { type: "text", label: "Title" },
        buttonText: { type: "text", label: "Button Text" },
        successMessage: { type: "text", label: "Success Message" },
        showMealOptions: {
          type: "radio",
          label: "Show Meal Options",
          options: [
            { label: "Yes", value: true },
            { label: "No", value: false },
          ],
        },
        motion: motionField,
      },
      defaultProps: {
        title: "RSVP",
        buttonText: "Submit RSVP",
        successMessage: "Thanks for confirming!",
        showMealOptions: true,
        motion: defaultMotion,
      },
      render: ({ puck: _p, editMode: _e, id: _i, motion, ...props }) => (
        <AnimationWrapper motionConfig={motion}>
          <RSVPForm {...props} />
        </AnimationWrapper>
      ),
    },

    Countdown: {
      label: "Countdown",
      fields: {
        targetDate: { type: "text", label: "Target Date (ISO)" },
        expiredMessage: { type: "text", label: "Expired Message" },
        themeColor: { type: "text", label: "Theme Color" },
        motion: motionField,
      },
      defaultProps: {
        targetDate: "2026-12-31T23:59:59",
        expiredMessage: "The event has started!",
        themeColor: "#111827",
        motion: defaultMotion,
      },
      render: ({ puck: _p, editMode: _e, id: _i, motion, ...props }) => (
        <AnimationWrapper motionConfig={motion}>
          <Countdown {...props} />
        </AnimationWrapper>
      ),
    },

    GoogleMap: {
      label: "Google Map",
      fields: {
        address: { type: "text", label: "Address" },
        height: { type: "number", label: "Height", min: 160, max: 1000 },
        motion: motionField,
      },
      defaultProps: {
        address: "New York, NY",
        height: 320,
        motion: defaultMotion,
      },
      render: ({ puck: _p, editMode: _e, id: _i, motion, ...props }) => (
        <AnimationWrapper motionConfig={motion}>
          <GoogleMap {...props} />
        </AnimationWrapper>
      ),
    },

    EventCard: {
      label: "Event Card",
      fields: {
        eventName: { type: "text", label: "Event Name" },
        date: { type: "text", label: "Date" },
        time: { type: "text", label: "Time" },
        venue: { type: "text", label: "Venue" },
        description: { type: "textarea", label: "Description" },
        icon: {
          type: "select",
          label: "Icon",
          options: [
            { label: "Ring", value: "ring" },
            { label: "Music", value: "music" },
            { label: "Flower", value: "flower" },
            { label: "Star", value: "star" },
            { label: "Heart", value: "heart" },
            { label: "Camera", value: "camera" },
          ],
        },
        accentColor: { type: "text", label: "Accent Color" },
        backgroundColor: { type: "text", label: "Background Color" },
        textColor: { type: "text", label: "Text Color" },
        motion: motionField,
      },
      defaultProps: {
        eventName: "Wedding Ceremony",
        date: "December 15, 2026",
        time: "5:00 PM",
        venue: "The Grand Ballroom",
        description: "Join us for the sacred ceremony followed by dinner and celebrations.",
        icon: "ring",
        accentColor: "#C9A84C",
        backgroundColor: "#ffffff",
        textColor: "#2C2C2C",
        motion: defaultMotion,
      },
      render: ({ puck: _p, editMode: _e, id: _i, motion, ...props }) => (
        <AnimationWrapper motionConfig={motion}>
          <EventCard {...props} />
        </AnimationWrapper>
      ),
    },

    ScheduleCard: {
      label: "Schedule Card",
      fields: {
        eventName: { type: "text", label: "Event Name" },
        date: { type: "text", label: "Date" },
        time: { type: "text", label: "Time" },
        venue: { type: "text", label: "Venue" },
        details: { type: "textarea", label: "Details" },
        routeLink: { type: "text", label: "Route Link" },
        routeText: { type: "text", label: "Route Button Text" },
        accentColor: { type: "text", label: "Accent Color" },
        backgroundColor: { type: "text", label: "Background Color" },
        textColor: { type: "text", label: "Text Color" },
        motion: motionField,
      },
      defaultProps: {
        eventName: "Mehendi",
        date: "20 Feb 2027",
        time: "11:00 AM",
        venue: "The Grand Orchid, Jaipur",
        details: "A colorful celebration with music and close family.",
        routeLink: "https://maps.google.com",
        routeText: "See the route",
        accentColor: "#c9a84c",
        backgroundColor: "#f9f4ea",
        textColor: "#2C2C2C",
        motion: defaultMotion,
      },
      render: ({ puck: _p, editMode: _e, id: _i, motion, ...props }) => (
        <AnimationWrapper motionConfig={motion}>
          <ScheduleCard {...props} />
        </AnimationWrapper>
      ),
    },

    PhotoGallery: {
      label: "Photo Gallery",
      fields: {
        images: {
          type: "array",
          label: "Images",
          arrayFields: {
            src: { type: "text", label: "Image URL" },
            alt: { type: "text", label: "Alt Text" },
          },
        },
        columns: { type: "number", label: "Columns", min: 1, max: 4 },
        gap: { type: "number", label: "Gap", min: 0, max: 40 },
        borderRadius: { type: "number", label: "Border Radius", min: 0, max: 50 },
        motion: motionField,
      },
      defaultProps: {
        images: [
          { src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80", alt: "Photo 1" },
          { src: "https://images.unsplash.com/photo-1478146059778-26028b07395a?auto=format&fit=crop&w=600&q=80", alt: "Photo 2" },
          { src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=600&q=80", alt: "Photo 3" },
          { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80", alt: "Photo 4" },
        ],
        columns: 2,
        gap: 12,
        borderRadius: 12,
        motion: defaultMotion,
      },
      render: ({ puck: _p, editMode: _e, id: _i, motion, ...props }) => (
        <AnimationWrapper motionConfig={motion}>
          <PhotoGallery {...props} />
        </AnimationWrapper>
      ),
    },

    /* ═══════════════════ EFFECTS ═══════════════════ */
    FloatingPetals: {
      label: "Floating Petals",
      fields: {
        count: { type: "number", label: "Count", min: 1, max: 40 },
        color: { type: "text", label: "Primary Color" },
        secondaryColor: { type: "text", label: "Secondary Color" },
        variant: {
          type: "select",
          label: "Shape",
          options: [
            { label: "Petals", value: "petals" },
            { label: "Leaves", value: "leaves" },
            { label: "Stars", value: "stars" },
            { label: "Sparkles", value: "sparkles" },
          ],
        },
        height: { type: "number", label: "Height", min: 100, max: 800 },
        speed: { type: "number", label: "Speed", min: 0.3, max: 3, step: 0.1 },
        opacity: { type: "number", label: "Opacity", min: 0.1, max: 1, step: 0.1 },
        motion: motionField,
      },
      defaultProps: {
        count: 18,
        color: "#e8c4c4",
        secondaryColor: "#d4af37",
        variant: "petals",
        height: 400,
        speed: 1,
        opacity: 0.6,
        motion: defaultMotion,
      },
      render: ({ puck: _p, editMode: _e, id: _i, motion, ...props }) => (
        <AnimationWrapper motionConfig={motion}>
          <FloatingPetals {...props} />
        </AnimationWrapper>
      ),
    },

    FloatingHearts: {
      label: "Floating Hearts",
      fields: {
        count: { type: "number", label: "Count", min: 1, max: 40 },
        color: { type: "text", label: "Color" },
        height: { type: "number", label: "Height", min: 120, max: 800 },
        motion: motionField,
      },
      defaultProps: {
        count: 14,
        color: "#f472b6",
        height: 320,
        motion: defaultMotion,
      },
      render: ({ puck: _p, editMode: _e, id: _i, motion, ...props }) => (
        <AnimationWrapper motionConfig={motion}>
          <FloatingHearts {...props} />
        </AnimationWrapper>
      ),
    },

    /* ═══════════════════ ADVANCED ═══════════════════ */
    Hero3D: {
      label: "3D Parallax Hero",
      render: ({ puck: _p, editMode: _e, id: _i, motion, ...props }) => (
        <AnimationWrapper motionConfig={motion}>
          <Hero3D {...props} />
        </AnimationWrapper>
      ),
      defaultProps: {
        heading: "Ankit & Priya",
        subheading:
          "Together with their families, request the honour of your presence",
        date: "Saturday, the Fifteenth of June",
        backgroundImage: "",
        overlayOpacity: 0.4,
        motion: defaultMotion,
      },
      fields: {
        heading: { type: "text", label: "Couple Names" },
        subheading: { type: "textarea", label: "Invitation Line" },
        date: { type: "text", label: "Event Date" },
        backgroundImage: { type: "text", label: "Background Image URL" },
        overlayOpacity: {
          type: "number",
          label: "Overlay Darkness (0-1)",
          min: 0,
          max: 1,
        },
        motion: motionField,
      },
    },

    CityHero: {
      label: "City Hero",
      fields: {
        blessingText: { type: "text", label: "Blessing Line" },
        familyText: { type: "text", label: "Family Line" },
        title: { type: "text", label: "Title" },
        subtitle: { type: "textarea", label: "Subtitle" },
        targetDate: { type: "text", label: "Target Date (ISO)" },
        themeColor: { type: "text", label: "Theme Color" },
        backgroundImage: { type: "text", label: "Background Image URL" },
        overlayColor: { type: "text", label: "Overlay Color (rgba)" },
        minHeight: { type: "text", label: "Min Height" },
        motion: motionField,
      },
      defaultProps: {
        blessingText: "ॐ श्री गणेशाय नम",
        familyText: "WITH BLESSINGS OF OUR FAMILIES",
        title: "ABHISHEK WEDS KANIKA",
        subtitle: "Join us as we celebrate love, laughter, and a lifetime together.",
        targetDate: "2027-02-21T18:00:00",
        themeColor: "#c9a84c",
        backgroundImage:
          "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1800&q=80",
        overlayColor: "rgba(12,10,8,0.64)",
        minHeight: "100vh",
        motion: defaultMotion,
      },
      render: ({ puck: _p, editMode: _e, id: _i, motion, ...props }) => (
        <AnimationWrapper motionConfig={motion}>
          <CityHero {...props} />
        </AnimationWrapper>
      ),
    },

    InteractiveTimeline: {
      label: "Journey Timeline",
      render: ({ puck: _p, editMode: _e, id: _i, motion, ...props }) => (
        <AnimationWrapper motionConfig={motion}>
          <InteractiveTimeline {...props} />
        </AnimationWrapper>
      ),
      defaultProps: {
        heading: "Our Journey",
        events: [
          {
            date: "June 2020",
            title: "First Meeting",
            description: "A chance encounter that changed everything.",
          },
          {
            date: "December 2021",
            title: "The First Trip",
            description:
              "Exploring new places and making memories together.",
          },
          {
            date: "February 2024",
            title: "The Proposal",
            description: "A magical evening under the stars.",
          },
        ],
        motion: defaultMotion,
      },
      fields: {
        heading: { type: "text", label: "Section Heading" },
        events: {
          type: "array",
          label: "Timeline Events",
          arrayFields: {
            date: { type: "text", label: "Date" },
            title: { type: "text", label: "Title" },
            description: { type: "textarea", label: "Description" },
          },
        },
        motion: motionField,
      },
    },

    AudioEngine: {
      label: "Background Music",
      render: ({ puck: _p, editMode: _e, id: _i, motion, ...props }) => (
        <AnimationWrapper motionConfig={motion}>
          <AudioEngine {...props} />
        </AnimationWrapper>
      ),
      defaultProps: {
        src: "",
        label: "Background Music",
        motion: defaultMotion,
      },
      fields: {
        src: { type: "text", label: "Audio URL (mp3)" },
        label: { type: "text", label: "Music Label" },
        motion: motionField,
      },
    },
  },
};
