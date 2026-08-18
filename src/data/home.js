// Content for the landing page, ported from the Paper design (Page 1.0 / Page 1.1).

export const skillTags = ["Enterprise B2B", "B2C SaaS", "Fintech", "E-commerce", "Healthcare"];

export const tabs = [
  { label: "Case Studies", active: true },
  { label: "Articles", active: false },
  { label: "About", active: false },
];

export const projects = [
  {
    number: "01",
    title: "Aimly LLC",
    description:
      "Led 0-to-1 design of the account creation and dashboard, driving 28.8% increase in new users and a 34.3% lift in events.",
    tags: ["0 → 1", "AI Assisted UX", "Mobile First"],
    href: "/aimly",
    gradient: "linear-gradient(108.84deg in oklab, oklab(53.6% -0.14 0.106) 54.34%, oklab(67.8% -0.154 0.112) 107.14%)",
    images: [
      {
        src: "https://app.paper.design/file-assets/01KY86RD325CPNB088ESCM9HH1/01KYDWVN5F3AFAY88VH1HMPK7Q.png",
        width: 207,
        height: 416,
        left: 702,
        top: -236,
      },
      {
        src: "https://app.paper.design/file-assets/01KY86RD325CPNB088ESCM9HH1/01KYDWVN5F3AFAY88VH1HMPK7Q.png",
        width: 207,
        height: 416,
        left: 488,
        top: -26,
      },
    ],
  },
  {
    number: "02",
    title: "Upgrade HMC",
    description:
      "Bringing a code-only upgrade task to the GUI, helping enterprises avoid losses of up to a million dollars.",
    tags: ["0 → 1", "UX Research", "UX Design"],
    href: "/upgrade-hmc",
    gradient:
      "linear-gradient(103.59deg in oklab, oklab(30.8% -0.031 -0.056) 0.29%, oklab(50% -0.055 -0.106) 54.9%, oklab(71.5% -0.103 -0.073) 96.5%)",
    images: [
      {
        src: "https://app.paper.design/file-assets/01KY86RD325CPNB088ESCM9HH1/01KYDX51X81F7ZPW7Q4HD6MEG5.png",
        width: 403,
        height: 403,
        left: 513,
        top: -94,
      },
      {
        src: "https://app.paper.design/file-assets/01KY86RD325CPNB088ESCM9HH1/01KYDWSSYWKDHRGZ85XWXZ704C.png",
        width: 310,
        height: 189,
        left: 469,
        top: -1,
      },
    ],
  },
];

// The location/hire badges. Each types out its Page 1.0 phrase, erases it, then
// types the compact Page 1.1 phrase and keeps it. Width is left to the content
// so the pill hugs the text as it types; only `left` shifts between the two
// states (`top` is fixed), matching the two artboards.
// `trace` is the colour of the outline that draws itself around the pill once
// its text has settled, and then stays. The green is the Aimly card's own
// gradient hue (oklab 67.8% -0.154 0.112) lifted so it reads as a hairline.
export const locationBadge = {
  top: 24,
  left: [198, 206],
  phrases: ["Moving between Austin and New York", "AUS ↔ NYC"],
  startDelay: 350,
  trace: "#53CB57",
};

export const hireBadge = {
  top: 290,
  left: [5, 17],
  phrases: ["Available for hire", "Hire Me!"],
  startDelay: 550,
  trace: "#F5C842",
};
