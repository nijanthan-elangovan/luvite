import type { Data } from "@puckeditor/core";

export type Template = {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  tags: string[];
  data: Data;
};

export const templates: Template[] = [
  {
    id: "eternal-bloom",
    name: "Eternal Bloom",
    description:
      "A cinematic, scroll-driven invitation with floating petals, elegant Cormorant serif typography, event cards, photo gallery, and a romantic quote — inspired by premium Indian wedding invitations.",
    thumbnail:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80",
    tags: ["premium", "romantic", "floral", "cinematic"],
    data: {
      root: { props: {} },
      content: [
        /* ── 1. HERO with BG image + floating petals overlay ── */
        {
          type: "Section",
          props: {
            id: "s-hero",
            backgroundColor: "#0d0d0d",
            backgroundImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80",
            backgroundOverlay: "rgba(0,0,0,0.45)",
            padding: "0",
            margin: "0",
            minHeight: "100vh",
            motion: { type: "fade", delay: 0, parallaxSpeed: 0 },
          },
        },

        /* ── 2. Floating petals transition ── */
        {
          type: "FloatingPetals",
          props: {
            id: "petals-1",
            count: 22,
            color: "#e8c4c4",
            secondaryColor: "#d4af37",
            variant: "petals",
            height: 200,
            speed: 0.7,
            opacity: 0.5,
            motion: { type: "fade", delay: 0, parallaxSpeed: 0 },
          },
        },

        /* ── 3. Quote section ── */
        {
          type: "Section",
          props: {
            id: "s-quote",
            backgroundColor: "#fffaf5",
            backgroundImage: "",
            backgroundOverlay: "",
            padding: "40px 24px",
            margin: "0",
            minHeight: "",
            motion: { type: "fade", delay: 0.1, parallaxSpeed: 0 },
          },
        },

        /* ── 4. Events section ── */
        {
          type: "Section",
          props: {
            id: "s-events",
            backgroundColor: "#fff",
            backgroundImage: "",
            backgroundOverlay: "",
            padding: "60px 24px",
            margin: "0",
            minHeight: "",
            motion: { type: "slide", delay: 0.1, parallaxSpeed: 0 },
          },
        },

        /* ── 5. Photo Gallery ── */
        {
          type: "Section",
          props: {
            id: "s-gallery",
            backgroundColor: "#faf6f1",
            backgroundImage: "",
            backgroundOverlay: "",
            padding: "60px 24px",
            margin: "0",
            minHeight: "",
            motion: { type: "fade", delay: 0.1, parallaxSpeed: 0 },
          },
        },

        /* ── 6. Timeline ── */
        {
          type: "Section",
          props: {
            id: "s-timeline",
            backgroundColor: "#fff",
            backgroundImage: "",
            backgroundOverlay: "",
            padding: "20px 24px",
            margin: "0",
            minHeight: "",
            motion: { type: "slide", delay: 0, parallaxSpeed: 0 },
          },
        },

        /* ── 7. Map section ── */
        {
          type: "Section",
          props: {
            id: "s-map",
            backgroundColor: "#faf6f1",
            backgroundImage: "",
            backgroundOverlay: "",
            padding: "60px 24px",
            margin: "0",
            minHeight: "",
            motion: { type: "fade", delay: 0.1, parallaxSpeed: 0 },
          },
        },

        /* ── 8. RSVP with dark bg ── */
        {
          type: "Section",
          props: {
            id: "s-rsvp",
            backgroundColor: "#0d0d0d",
            backgroundImage: "",
            backgroundOverlay: "",
            padding: "80px 24px",
            margin: "0",
            minHeight: "",
            motion: { type: "fade", delay: 0.1, parallaxSpeed: 0 },
          },
        },

        /* ── 9. Final petals ── */
        {
          type: "FloatingPetals",
          props: {
            id: "petals-2",
            count: 15,
            color: "#d4af37",
            secondaryColor: "#e8c4c4",
            variant: "sparkles",
            height: 150,
            speed: 0.5,
            opacity: 0.4,
            motion: { type: "fade", delay: 0, parallaxSpeed: 0 },
          },
        },

        /* ── 10. Footer ── */
        {
          type: "Section",
          props: {
            id: "s-footer",
            backgroundColor: "#0d0d0d",
            backgroundImage: "",
            backgroundOverlay: "",
            padding: "40px 24px",
            margin: "0",
            minHeight: "",
            motion: { type: "fade", delay: 0, parallaxSpeed: 0 },
          },
        },
      ],

      zones: {
        /* ── HERO CONTENT ── */
        "s-hero:children": [
          {
            type: "Spacer",
            props: { id: "spacer-top", height: 120, motion: { type: "fade", delay: 0, parallaxSpeed: 0 } },
          },
          {
            type: "Paragraph",
            props: {
              id: "p-invite-line",
              text: "Together with their families",
              color: "#d4af37",
              fontSize: 14,
              fontFamily: "Cormorant Garamond",
              align: "center",
              letterSpacing: "0.25em",
              margin: "0 0 16px",
              motion: { type: "fade", delay: 0.2, parallaxSpeed: 0 },
            },
          },
          {
            type: "Heading",
            props: {
              id: "h-names",
              text: "Arjun & Meera",
              level: "h1",
              letterSpacing: "0.06em",
              fontWeight: "400",
              color: "#ffffff",
              fontSize: 64,
              fontFamily: "Cormorant Garamond",
              align: "center",
              margin: "0 0 12px",
              motion: { type: "fade", delay: 0.4, parallaxSpeed: 0 },
            },
          },
          {
            type: "Paragraph",
            props: {
              id: "p-subtitle",
              text: "request the honour of your presence\nat their wedding celebration",
              color: "#e0d6c8",
              fontSize: 17,
              fontFamily: "Cormorant Garamond",
              align: "center",
              letterSpacing: "0.04em",
              margin: "0 0 40px",
              motion: { type: "fade", delay: 0.6, parallaxSpeed: 0 },
            },
          },
          {
            type: "Countdown",
            props: {
              id: "countdown-hero",
              targetDate: "2027-02-14T17:00:00",
              expiredMessage: "The celebration has begun!",
              themeColor: "#d4af37",
              motion: { type: "zoom", delay: 0.8, parallaxSpeed: 0 },
            },
          },
          {
            type: "Spacer",
            props: { id: "spacer-bot", height: 80, motion: { type: "fade", delay: 0, parallaxSpeed: 0 } },
          },
        ],

        /* ── QUOTE CONTENT ── */
        "s-quote:children": [
          {
            type: "QuoteBlock",
            props: {
              id: "quote-1",
              text: "Whatever our souls are made of, his and mine are the same.",
              attribution: "— Emily Brontë",
              accentColor: "#d4af37",
              textColor: "#3d2e1e",
              fontSize: 24,
              fontFamily: "Cormorant Garamond",
              motion: { type: "fade", delay: 0, parallaxSpeed: 0 },
            },
          },
        ],

        /* ── EVENTS CONTENT ── */
        "s-events:children": [
          {
            type: "Heading",
            props: {
              id: "h-events",
              text: "Wedding Events",
              level: "h2",
              letterSpacing: "0.08em",
              fontWeight: "400",
              color: "#1a1a1a",
              fontSize: 38,
              fontFamily: "Cormorant Garamond",
              align: "center",
              margin: "0 0 8px",
              motion: { type: "fade", delay: 0, parallaxSpeed: 0 },
            },
          },
          {
            type: "Paragraph",
            props: {
              id: "p-events-sub",
              text: "We would be honoured to have you join us for these celebrations",
              color: "#888",
              fontSize: 15,
              fontFamily: "Manrope",
              align: "center",
              letterSpacing: "",
              margin: "0 0 40px",
              motion: { type: "fade", delay: 0.1, parallaxSpeed: 0 },
            },
          },
          {
            type: "EventCard",
            props: {
              id: "event-mehendi",
              eventName: "Mehendi & Sangeet",
              date: "February 13, 2027",
              time: "6:00 PM",
              venue: "The Royal Lawns, Udaipur",
              description: "An evening of music, henna art, and joyful dancing under the stars.",
              icon: "music",
              accentColor: "#d4af37",
              backgroundColor: "#fffaf5",
              textColor: "#2C2C2C",
              motion: { type: "slide", delay: 0.1, parallaxSpeed: 0 },
            },
          },
          {
            type: "Spacer",
            props: { id: "sp-ev1", height: 20, motion: { type: "fade", delay: 0, parallaxSpeed: 0 } },
          },
          {
            type: "EventCard",
            props: {
              id: "event-haldi",
              eventName: "Haldi Ceremony",
              date: "February 14, 2027",
              time: "10:00 AM",
              venue: "Family Residence",
              description: "The auspicious turmeric ceremony blessing the couple before the wedding.",
              icon: "flower",
              accentColor: "#e0a030",
              backgroundColor: "#fffaf5",
              textColor: "#2C2C2C",
              motion: { type: "slide", delay: 0.15, parallaxSpeed: 0 },
            },
          },
          {
            type: "Spacer",
            props: { id: "sp-ev2", height: 20, motion: { type: "fade", delay: 0, parallaxSpeed: 0 } },
          },
          {
            type: "EventCard",
            props: {
              id: "event-wedding",
              eventName: "Wedding Ceremony",
              date: "February 14, 2027",
              time: "5:00 PM",
              venue: "The Heritage Palace, Udaipur",
              description: "The sacred pheras under a canopy of marigolds, followed by a grand reception.",
              icon: "ring",
              accentColor: "#d4af37",
              backgroundColor: "#fffaf5",
              textColor: "#2C2C2C",
              motion: { type: "slide", delay: 0.2, parallaxSpeed: 0 },
            },
          },
        ],

        /* ── GALLERY CONTENT ── */
        "s-gallery:children": [
          {
            type: "Heading",
            props: {
              id: "h-gallery",
              text: "Our Moments",
              level: "h2",
              letterSpacing: "0.08em",
              fontWeight: "400",
              color: "#1a1a1a",
              fontSize: 38,
              fontFamily: "Cormorant Garamond",
              align: "center",
              margin: "0 0 32px",
              motion: { type: "fade", delay: 0, parallaxSpeed: 0 },
            },
          },
          {
            type: "PhotoGallery",
            props: {
              id: "gallery-1",
              images: [
                { src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80", alt: "Together" },
                { src: "https://images.unsplash.com/photo-1478146059778-26028b07395a?auto=format&fit=crop&w=600&q=80", alt: "Celebration" },
                { src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=600&q=80", alt: "Joy" },
                { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80", alt: "Love" },
                { src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80", alt: "Promise" },
                { src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=600&q=80", alt: "Forever" },
              ],
              columns: 3,
              gap: 10,
              borderRadius: 8,
              motion: { type: "zoom", delay: 0.1, parallaxSpeed: 0 },
            },
          },
        ],

        /* ── TIMELINE CONTENT ── */
        "s-timeline:children": [
          {
            type: "InteractiveTimeline",
            props: {
              id: "timeline-1",
              heading: "Our Journey",
              events: [
                {
                  date: "March 2021",
                  title: "When It All Began",
                  description: "A chance introduction through mutual friends at a rooftop gathering in Mumbai.",
                },
                {
                  date: "October 2022",
                  title: "The First Adventure",
                  description: "Backpacking through the misty hills of Meghalaya, discovering beauty in every turn.",
                },
                {
                  date: "August 2024",
                  title: "Moving In Together",
                  description: "Building our little world, one book, one plant, one laugh at a time.",
                },
                {
                  date: "December 2025",
                  title: "The Proposal",
                  description: "Under a sky full of stars in Udaipur, a question that changed everything — she said yes.",
                },
              ],
              motion: { type: "slide", delay: 0, parallaxSpeed: 0 },
            },
          },
        ],

        /* ── MAP CONTENT ── */
        "s-map:children": [
          {
            type: "Heading",
            props: {
              id: "h-venue",
              text: "Find The Venue",
              level: "h2",
              letterSpacing: "0.08em",
              fontWeight: "400",
              color: "#1a1a1a",
              fontSize: 38,
              fontFamily: "Cormorant Garamond",
              align: "center",
              margin: "0 0 8px",
              motion: { type: "fade", delay: 0, parallaxSpeed: 0 },
            },
          },
          {
            type: "Paragraph",
            props: {
              id: "p-venue",
              text: "The Heritage Palace, Udaipur, Rajasthan",
              color: "#888",
              fontSize: 15,
              fontFamily: "Manrope",
              align: "center",
              letterSpacing: "",
              margin: "0 0 32px",
              motion: { type: "fade", delay: 0.1, parallaxSpeed: 0 },
            },
          },
          {
            type: "GoogleMap",
            props: {
              id: "map-1",
              address: "City Palace, Udaipur, Rajasthan",
              height: 340,
              motion: { type: "fade", delay: 0.2, parallaxSpeed: 0 },
            },
          },
        ],

        /* ── RSVP CONTENT ── */
        "s-rsvp:children": [
          {
            type: "Heading",
            props: {
              id: "h-rsvp",
              text: "Will You Join Us?",
              level: "h2",
              letterSpacing: "0.08em",
              fontWeight: "400",
              color: "#d4af37",
              fontSize: 38,
              fontFamily: "Cormorant Garamond",
              align: "center",
              margin: "0 0 8px",
              motion: { type: "fade", delay: 0, parallaxSpeed: 0 },
            },
          },
          {
            type: "Paragraph",
            props: {
              id: "p-rsvp-sub",
              text: "Kindly let us know if you can make it — your presence means the world to us.",
              color: "#999",
              fontSize: 15,
              fontFamily: "Manrope",
              align: "center",
              letterSpacing: "",
              margin: "0 0 32px",
              motion: { type: "fade", delay: 0.1, parallaxSpeed: 0 },
            },
          },
          {
            type: "RSVPForm",
            props: {
              id: "rsvp-1",
              title: "",
              buttonText: "Confirm Attendance",
              successMessage: "Thank you! We can't wait to celebrate with you.",
              showMealOptions: true,
              motion: { type: "fade", delay: 0.2, parallaxSpeed: 0 },
            },
          },
        ],

        /* ── FOOTER CONTENT ── */
        "s-footer:children": [
          {
            type: "Paragraph",
            props: {
              id: "p-footer-names",
              text: "Arjun & Meera",
              color: "#d4af37",
              fontSize: 28,
              fontFamily: "Cormorant Garamond",
              align: "center",
              letterSpacing: "0.06em",
              margin: "0 0 8px",
              motion: { type: "fade", delay: 0, parallaxSpeed: 0 },
            },
          },
          {
            type: "Paragraph",
            props: {
              id: "p-footer-date",
              text: "February 14, 2027 — Udaipur",
              color: "#666",
              fontSize: 13,
              fontFamily: "Manrope",
              align: "center",
              letterSpacing: "0.1em",
              margin: "0 0 16px",
              motion: { type: "fade", delay: 0.1, parallaxSpeed: 0 },
            },
          },
          {
            type: "Paragraph",
            props: {
              id: "p-footer-made",
              text: "Made with love on Luvite",
              color: "#444",
              fontSize: 11,
              fontFamily: "Manrope",
              align: "center",
              letterSpacing: "0.08em",
              margin: "0",
              motion: { type: "fade", delay: 0.2, parallaxSpeed: 0 },
            },
          },
        ],
      },
    },
  },
];
