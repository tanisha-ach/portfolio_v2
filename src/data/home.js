// Content for the landing page, ported from the Paper design (Page 1.0 / Page 1.1).

export const profile = {
  name: "Tanisha Acharya",
  title: "Senior Product Designer",
  tagline: "Solving problems that happen to have interfaces.",
  email: "tanisha.acharya@utexas.edu",
  linkedin: "https://linkedin.com",
  photo:
    "https://app.paper.design/file-assets/01KY86RD325CPNB088ESCM9HH1/01KY8DD6K8PS5XVMERCT51J7D3.jpg",
};

export const skillTags = ["Enterprise B2B", "B2C SaaS", "Fintech", "E-commerce", "Healthcare"];

// Playground has no page yet, so it carries no href and renders as plain text.
export const tabs = [
  { label: "Case Studies", href: "/" },
  { label: "Playground" },
  { label: "About", href: "/about" },
];

export const projects = [
  {
    number: "01",
    eyebrow: "01 · B2C · E-Commerce",
    title: "Aimly LLC",
    description:
      "Led 0-to-1 design of the account creation and dashboard, driving 28.8% increase in new users and a 34.3% lift in events.",
    tags: ["0 → 1", "AI Assisted UX", "Mobile First"],
    href: "/aimly",
    gradient: "linear-gradient(108.84deg in oklab, oklab(53.6% -0.14 0.106) 54.34%, oklab(67.8% -0.154 0.112) 107.14%)",
    images: [
      {
        src: "https://app.paper.design/file-assets/01KY86RD325CPNB088ESCM9HH1/01M0ZT48RDS7DDD2JZ0VJJNBQ2.png",
        width: 199,
        height: 409,
        left: 717,
        top: -239,
      },
      {
        src: "https://app.paper.design/file-assets/01KY86RD325CPNB088ESCM9HH1/01M0ZT48RDS7DDD2JZ0VJJNBQ2.png",
        width: 199,
        height: 409,
        left: 502,
        top: -16,
      },
    ],
  },
  {
    number: "02",
    eyebrow: "02 · Enterprise B2B",
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
