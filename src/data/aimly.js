// Content for the Aimly case study, ported from the Paper design.

export const nav = [
  { id: "overview", label: "Overview" },
  { id: "context", label: "Context" },
  { id: "research", label: "Research" },
  { id: "challenge", label: "Challenge" },
  { id: "prototyping", label: "Prototyping" },
  { id: "results", label: "Results" },
  { id: "impact", label: "Impact" },
];

export const meta = [
  { label: "Role", value: "Senior Product Designer" },
  { label: "Timeline", value: "3 weeks" },
  {
    label: "Team",
    // `value` stays as the accessible/plain-text form of the avatar cluster.
    value: "Me +4",
    team: {
      avatar: "/tanisha.jpg",
      avatarAlt: "Tanisha Acharya",
      others: 4,
      breakdown: "2 Dev, 1 PM, 1 QA",
    },
  },
  { label: "Domain", value: "B2C, 0 → 1" },
];

export const contextParagraphs = [
  "Aimly is a free to use digital fundraising platform founded in 2021. Aimly makes fundraising for small to medium organizations simple, easy & fun by selling gourmet chips and popcorn to garner donations. Think Girl Scouts, but savoury. All in all, Aimly's goal is to empower organizations to exceed fundraising goals so they can focus on enriching their community, while Aimly manages transactions, customer experience and logistics.",
  "I led the design of the account creation and dashboard for fundraiser management from 0 to 1, navigating the complexities and breaking it down into a mvp for different levels of releases.",
];

export const researchStats = [
  { stat: "00", copy: "Key finding — one line" },
  { stat: "00", copy: "Key finding — one line" },
  { stat: "00", copy: "Key finding — one line" },
  { stat: "00", copy: "Key finding — one line" },
];

export const challengeRequirements = [
  {
    kicker: "01 · The dashboard needed to be contextually customizable",
    copy: "It has to be different for a 1st time user v/s a super user. Different for an organizer managing a team campaign v/s a team member only in charge of raising funds.",
  },
  {
    kicker: "02 · It has to be comprehensive",
    copy: "It has to provide all the details the user needs at a quick glance.",
  },
  {
    kicker: "03 · It had to be scalable",
    copy: "can the dashboard grow as the user moves to higher usage levels? Can the dahsboard stay relevant as we add more complex features for campaign management?",
  },
];

export const approachSteps = [
  { title: "Using Claude Code for Initial Exploration", image: "Claude Code exploration — screenshot" },
  { title: "Competitive Analysis", image: "Competitive analysis — screenshot" },
  { title: "Leveraging Mobbin MCP for Best Practices", image: "Mobbin MCP research — screenshot" },
  { title: "Expanding the Style Guide", image: "Style guide — screenshot" },
];

export const directions = [
  { label: "Direction A", copy: "[ Describe this direction and its trade-offs. ]" },
  { label: "Direction B", copy: "[ Describe this direction and its trade-offs. ]" },
];

export const features = [
  { kicker: "1 · Feature", copy: "[ What it does and why it works. ]" },
  { kicker: "2 · Feature", copy: "[ What it does and why it works. ]" },
  { kicker: "3 · Feature", copy: "[ What it does and why it works. ]" },
  { kicker: "4 · Feature", copy: "[ What it does and why it works. ]" },
];

export const results = [
  {
    stat: "00",
    kicker: "Headline metric",
    copy: "[ What this result means. ]",
    highlight: true,
  },
  {
    stat: "00%",
    kicker: "Secondary metric",
    copy: "[ What this result means. ]",
    highlight: false,
  },
  {
    stat: "↑ Metric",
    kicker: "Directional result",
    copy: "[ What this result means. ]",
    highlight: false,
  },
];
