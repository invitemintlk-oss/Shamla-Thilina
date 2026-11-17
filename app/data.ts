// All invitation content lives here — edit this file to personalise the template.

export const C = {
  bg: "#FDF7F9",
  ink: "#3B3F5C",
  green: "#7880AE",
  greenDark: "#4E5689",
  greenMid: "#868DB8",
  greenDeep: "#5F679A",
  sage: "#A9AFD1",
  gold: "#CC6F8D",
  goldLight: "#F6B7C7",
  muted: "#7D7F98",
  card: "#FFFCFD",
  cream: "#FBE6EC",
};

export const F = {
  body: 'var(--font-sn-body), "Cormorant Garamond", Georgia, serif',
  script: 'var(--font-mea), "Mea Culpa", cursive',
  sans: 'var(--font-montserrat), "Montserrat", sans-serif',
  deco: 'var(--font-cinzel-decorative), "Cinzel Decorative", serif',
  serif: 'var(--font-serif), "Playfair Display", serif',
  marcellus: 'var(--font-marcellus), "Marcellus", serif',
};

export const invitation = {
  bride: "Shamla",
  brideParents: "Daughter of Mr. & Mrs. Fouzer",
  groom: "Thilina",
  groomParents: "Son of the late Mr. S. Jayasekara & Mrs. Ilangakoon",
  initials: ["T", "S"] as const,
  // ISO date-time with Sri Lanka offset — drives the countdown & calendar links
  weddingStart: "2026-12-23T18:30:00+05:30",
  weddingEnd: "2026-12-23T23:30:00+05:30",
  dateLong: "Wednesday, 23rd December 2026",
  dateShort: "23 . 12 . 26",
  rsvpBy: "Kindly respond at your earliest convenience",
  maxGuests: 4,
  // Google Apps Script web app URL (ends with /exec) — see google-apps-script/Code.gs
  rsvpScriptUrl: "https://script.google.com/macros/s/AKfycby5mM1PrzL6fPsda1PZDtWP5qoDmVSPb0Llijzfk6s_bwhmiEQByLurwImrkLcO5MMl/exec",

  // Photos (set to null to show the "Your photo" placeholder)
  heroPhoto: "/photos/hero.jpg" as string | null,
  storyPhoto: "/photos/story.webp" as string | null,


  events: [
    { icon: "utensils", title: "HOMECOMING RECEPTION", time: "6:30 PM onwards", place: "The Glasgow, Kalagedihena", detail: "Dinner, music and celebration" },
  ],

  venue: {
    name: "The Glasgow",
    address: "Kalagedihena, Sri Lanka",
  },

};
