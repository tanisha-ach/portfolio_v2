// Content for the landing page, ported from the Paper design (Page 1.0 / Page 1.1).

export const profile = {
  name: "Tanisha Acharya",
  title: "Senior Product Designer",
  tagline: "Solving problems that happen to have interfaces.",
  email: "tanisha.acharya@utexas.edu",
  linkedin: "https://www.linkedin.com/in/tanisha-acharya/",
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
    // Pulls the sidebar accent toward this card's own hue while hovered.
    accent: "#38B440",
    gradient: "linear-gradient(108.84deg in oklab, #098511 54%, #38B440 54%)",
    // `shift` is how far the mockup slides on card hover, in px — negative is
    // up. The two phones move in opposite directions so the pair opens out
    // rather than sliding as one block.
    images: [
      // Every placement is measured from the card's right edge, so the art stays
      // put as the card grows instead of stranding a gap beside it. The wide
      // values are measured from the text column's right edge, which is where
      // the design aligns them — the card keeps its 32px of gradient beyond. `mobile` is
      // the same artwork re-placed for the narrow card; an image with no
      // `mobile` block sits out that breakpoint entirely — the mobile design
      // shows one phone where the wide card shows two.
      {
        src: "https://app.paper.design/file-assets/01KY86RD325CPNB088ESCM9HH1/01M0ZT48RDS7DDD2JZ0VJJNBQ2.png",
        width: 199,
        height: 409,
        right: 60,
        top: -239,
        shift: 12,
      },
      {
        src: "https://app.paper.design/file-assets/01KY86RD325CPNB088ESCM9HH1/01M0ZT48RDS7DDD2JZ0VJJNBQ2.png",
        width: 199,
        height: 409,
        right: 275,
        top: -16,
        shift: -12,
        mobile: { width: 111, height: 228, right: 18, top: 15 },
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
    accent: "#06B6D4",
    gradient:
      "linear-gradient(103.59deg in oklab, oklab(30.8% -0.031 -0.056) 0.29%, oklab(50% -0.055 -0.106) 54.9%, oklab(71.5% -0.103 -0.073) 96.5%)",
    // The racks stay put; only the laptop reacts, so the zoom reads as the
    // screen being leaned into rather than the whole scene lurching forward.
    images: [
      {
        src: "https://app.paper.design/file-assets/01KY86RD325CPNB088ESCM9HH1/01KYDX51X81F7ZPW7Q4HD6MEG5.png",
        width: 403,
        height: 403,
        right: 60,
        top: -94,
        mobile: { width: 328, height: 328, right: -189, top: -72 },
      },
      {
        src: "https://app.paper.design/file-assets/01KY86RD325CPNB088ESCM9HH1/01KYDWSSYWKDHRGZ85XWXZ704C.png",
        width: 310,
        height: 189,
        right: 197,
        top: -1,
        zoom: 1.5,
        mobile: { width: 310, height: 189, right: -168, top: 18 },
      },
    ],
  },
];

// The location/hire badges. Each types out its Page 1.0 phrase, erases it, then
// types the compact Page 1.1 phrase and keeps it. Width is left to the content
// so the pill hugs the text as it types; only `left` shifts between the two
// states (`top` is fixed), matching the two artboards.
// `trace` is the colour of the outline that draws itself around the pill once
// its text has settled, and then stays. Both pills share one hue so they read
// as a pair rather than two unrelated chips. `href` makes a pill a link.
export const locationBadge = {
  top: 24,
  left: [198, 206],
  phrases: ["Moving between Austin and New York", "AUS ↔ NYC"],
  startDelay: 350,
  trace: "#F5C842",
};

export const hireBadge = {
  top: 290,
  left: [5, 17],
  phrases: ["Available for hire", "Hire Me!"],
  startDelay: 550,
  href: "https://calendly.com/tanisha-acharya-utexas/30min",
  trace: "#F5C842",
};
