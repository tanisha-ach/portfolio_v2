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

// A tab without an href renders as plain text with a coming-soon label.
export const tabs = [
  { label: "Case Studies", href: "/" },
  { label: "About", href: "/about" },
  { label: "Playground", href: "/playground" },
];

export const projects = [
  {
    number: "01",
    eyebrow: "01 · B2C · E-Commerce",
    title: "From blank canvas to a fully functional dashboard for Aimly",
    // The wide card sets the headline in a fixed measure so it breaks where the
    // design breaks it rather than wherever the column happens to end.
    titleWidth: 469,
    description:
      "Led 0-to-1 design of the account creation and dashboard, driving 28.8% increase in new users and a 34.3% lift in events.",
    tags: ["0 → 1", "AI Assisted UX", "Mobile First"],
    href: "/aimly",
    // Pulls the sidebar accent toward this card's own hue while hovered.
    accent: "#38B440",
    // Room the narrow card holds open above its copy. Short enough here that
    // the title tucks in beside the phone, as the design has it.
    reserve: "15rem",
    // The bare 54.34% is a colour hint, not a stop: the blend's midpoint lands
    // right on the first stop, so the green steps up along a crisp diagonal and
    // then eases toward the lighter shade.
    gradient: "linear-gradient(108.84deg in oklab, #098511 54.34%, 54.34%, #38B440 107.14%)",
    // On desktop the step is pinned behind the left phone instead. The phones
    // are placed from the card's right edge, so the step is measured from the
    // gradient's far end too: ~325px back along the 108.84deg line lands it in
    // the middle of that phone, which covers the card's full height, so the
    // diagonal never shows beside it at any card width. The light end keeps
    // the design's 52.8% (about 530px) of run beyond the step.
    gradientWide:
      "linear-gradient(108.84deg in oklab, #098511 calc(100% - 325px), calc(100% - 325px), #38B440 calc(100% + 205px))",
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
      // shows one phone where the wide card shows two. Mobile placements are
      // percentages, not pixels: the narrow card is sized by aspect, so a px
      // offset would drift as the viewport narrows.
      {
        src: "https://app.paper.design/file-assets/01KY86RD325CPNB088ESCM9HH1/01M0ZT48RDS7DDD2JZ0VJJNBQ2.png",
        width: 202,
        height: 411,
        right: 0,
        top: -239,
        shift: 12,
      },
      {
        src: "https://app.paper.design/file-assets/01KY86RD325CPNB088ESCM9HH1/01M0ZT48RDS7DDD2JZ0VJJNBQ2.png",
        width: 205,
        height: 418,
        right: 209,
        top: -16,
        shift: -12,
        mobile: { width: "34%", right: "7.2%", top: "4.6%" },
      },
    ],
  },
  {
    number: "02",
    eyebrow: "02 · Enterprise B2B",
    title: "Helping 120k companies around the world avoid a loss of $1M+",
    titleWidth: 495,
    description:
      "Bringing a code-only upgrade task to the GUI, NPS score of the product went up by 30%.",
    tags: ["0 → 1", "UX Research", "UX Design"],
    href: "/upgrade-hmc",
    accent: "#06B6D4",
    // Taller: this card's artwork runs the full width, so nothing can sit
    // alongside it and the copy has to start below.
    reserve: "18rem",
    gradient:
      "linear-gradient(103.59deg in oklab, oklab(30.8% -0.031 -0.056) 0.29%, oklab(50% -0.055 -0.106) 54.9%, oklab(71.5% -0.103 -0.073) 96.5%)",
    // The racks stay put; only the laptop reacts, so the zoom reads as the
    // screen being leaned into rather than the whole scene lurching forward.
    images: [
      {
        src: "https://app.paper.design/file-assets/01KY86RD325CPNB088ESCM9HH1/01KYDX51X81F7ZPW7Q4HD6MEG5.png",
        width: 403,
        height: 403,
        right: 0,
        top: -94,
        mobile: { width: "119.5%", right: "-55%", top: "-27%" },
      },
      {
        src: "https://app.paper.design/file-assets/01KY86RD325CPNB088ESCM9HH1/01KYDWSSYWKDHRGZ85XWXZ704C.png",
        width: 310,
        height: 189,
        right: 137,
        top: -1,
        zoom: 1.5,
        mobile: { width: "113%", right: "-49%", top: "4.8%" },
      },
    ],
  },
  {
    number: "03",
    eyebrow: "03 · B2C · Fintech",
    title: "Redesigning the investment experience for first-time digital investors",
    titleWidth: 510,
    description:
      "Product rating went up from 3.8 to 4.5 on the Play Store.",
    tags: ["UX Design", "Fintech UX", "Mobile UX"],
    // No case study page yet: the card answers a click with a coming-soon
    // note instead of navigating.
    comingSoon: true,
    accent: "#E5484D",
    // A touch taller than Aimly's: this headline's first line runs wider and
    // would otherwise clip the foot of the phone.
    reserve: "16rem",
    gradient:
      "linear-gradient(135deg in oklab, oklab(25.9% 0.099 0.031) 0%, oklab(39.6% 0.12 0.058) 50%, oklab(44.4% 0.144 0.073) 100%)",
    images: [
      {
        src: "https://app.paper.design/file-assets/01KY86RD325CPNB088ESCM9HH1/01KYDWVN5F3AFAY88VH1HMPK7Q.png",
        width: 207,
        height: 416,
        right: -17,
        top: -201,
        shift: 12,
      },
      {
        // This screenshot carries its own bezel margin, so it is cropped in
        // slightly and given the phone's corner radius.
        src: "https://app.paper.design/file-assets/01KY86RD325CPNB088ESCM9HH1/01M5BWJ2YWK4GQW1BGBH2S68NY.png",
        width: 210,
        height: 437,
        right: 190,
        top: 14,
        shift: -12,
        size: "105%",
        position: "47.619% 77.778%",
        radius: 28,
        mobile: { width: "34%", right: "7.2%", top: "4.6%" },
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
  phrases: ["Moving between Austin and New York", "ATX ↔ NYC"],
  startDelay: 350,
  trace: "#F5C842",
};

export const hireBadge = {
  top: 290,
  left: [5, 17],
  phrases: ["Available for hire", "Hire Me!"],
  startDelay: 550,
  href: "https://calendly.com/tanisha-acharya-utexas/30min",
  hover: "Book time with me on Calendly!",
  trace: "#F5C842",
};

// Things worth a look that are not case studies. Each is a tile on the
// Playground canvas and links out in a new tab.
export const playground = [
  {
    title: "Bevoadvisor",
    note: "building an AI chatbot to help 10,000+ Graduate students make better course choices",
    href: "https://tanishadesigns.framer.website/bevoadvisor",
    image: "/playground-bevoadvisor.webp",
  },
  {
    title: "Beanie Designer",
    note: "Add your own motif to your beanie knitting chart",
    href: "https://t.co/WkxcoFPPG7",
    image: "/playground-beanie.webp",
  },
];
