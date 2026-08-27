// Content for the IBM HMC case study, ported from the Paper design.

const ASSET = "https://app.paper.design/file-assets/01KY86RD325CPNB088ESCM9HH1";

export const nav = [
  { id: "overview", label: "Overview" },
  { id: "context", label: "Context" },
  { id: "research", label: "Research Findings" },
  { id: "ideation", label: "Ideation" },
  { id: "results", label: "Usability Testing Results" },
  { id: "final-design", label: "Final Design" },
  { id: "impact", label: "Business Impact" },
  { id: "future", label: "Future of the Design" },
  { id: "learnings", label: "Learnings" },
];

export const hero = {
  eyebrow: ["IBM Power Systems", "Primary UX Researcher and Designer", "2023"],
  title: "Helping 120k companies around the world avoid a loss of $1M+",
  summary:
    "How I designed the HMC upgrade experience from 0 to 1 — from command-line only to a guided, UI-based flow that reduced errors, saved time, and increased adoption of critical system updates across IBM Power infrastructure. My work across 2 releases led to a 30% increase in NPS.",
  image: `${ASSET}/01M064C7W8S11ZV9E1NMATYHJJ.png`,
};

export const meta = [
  { label: "Role", value: "Senior Product Designer" },
  { label: "Timeline", value: "8 weeks" },
  {
    label: "Team",
    team: {
      avatar: "/tanisha.jpg",
      avatarAlt: "Tanisha Acharya",
      others: 4,
      roles: "1 PM, 1 Dev, 1 QA and 1 Design Lead",
    },
  },
  { label: "Domain", value: "B2B, 0 → 1" },
];

export const context = {
  body: "IBM Power HMC helps companies bridge the gap between physical servers and virtual cloud, helping them innovate and modernise their applications. Upgrades to the HMC software were released regularly — but the entire upgrade process could only be performed by typing commands into a terminal.",
  challenge:
    "This meant system administrators had to manually research compatibility, download files to a separate server, and execute multi-step commands — with no progress visibility and no error guidance. A time-consuming, error-prone process in a high-stakes environment.",
  hmw: "How might we bring the upgrade process to the GUI so that users can easily bring their systems to the latest level, saving time and money?",
};

export const research = {
  heading: "Discovery with end users— what we found",
  body: "I ran a collaborative design workshops with IBM stakeholders and conducted twelve 1:1 informational interviews with HMC clients to surface pain points, map the existing process end-to-end, and define outcomes grounded in real-world context.",
  quote:
    "“There are two people who need to do the upgrade. I have the junior system admin shadow me to run a few upgrades so that I’m sure that they know the process well. Also since upgrades are few and far in between this can be harder to do.”  - P3",
  stats: [
    { stat: "9/12", copy: "Admins manually verify compatibility with no automated guidance." },
    { stat: "11/12", copy: "Spend significant time onboarding juniors on upgrade procedures." },
    { stat: "6/12", copy: "Error messages need maximum detail to diagnose or escalate issues correctly." },
    { stat: "7/12", copy: "Required downloads to internal server even on connected systems, leading to delays." },
  ],
};

export const ideation = {
  heading: "Two design directions",
  body: "I explored two distinct interaction patterns were built to test how users respond to different approaches. While the key content remained the same, I experiemented with different copies for the warning messages, having the remaining steps happen on the same page v/s a step-by-step wizard with progressive disclosure built in. We performed usability testing for both versions with preference testing, asking users which interaction they preferred.",
  directions: [
    {
      label: "Screen A — Right-side tearsheet",
      image: `${ASSET}/01M0DQ5WEQQDW0DAA8Z67Q69CP.png`,
      copy: "The wizard opens as a tearsheet sliding in from the right. More space for step content, a persistent progress sidebar, and contextual help inline.",
    },
    {
      label: "Screen B — Modal dialog overlay",
      image: `${ASSET}/01M0DQ676AGMA8J3CV7DH98751.png`,
      copy: "The upgrade wizard opens as a full-page modal on the HMC dashboard. Users stay in context but the overlay limits space for step-by-step content and inline guidance.",
    },
  ],
};

export const results = {
  heading: "Screen B wins — 9 out of 12 participants preferred it",
  body: "12 participants completed moderated usability sessions testing both designs back-to-back. Participants rated clarity, confidence, and perceived effort. The modal gave operators room to work through each step without feeling visually overwhelmed and constrained.",
  stats: [
    {
      stat: "9/12",
      kicker: "Preferred Screen B",
      copy: "Participants found the modal layout easier to follow and less cognitively demanding under realistic time pressure.",
      highlight: true,
    },
    {
      stat: "85%",
      kicker: "First-attempt task completion",
      copy: "Participants completed the full upgrade flow on their first attempt without backtracking or requesting help from the facilitator.",
      highlight: false,
    },
    {
      stat: "↓ Errors",
      kicker: "Fewer critical errors in B",
      copy: "Screen B produced significantly fewer critical errors — particularly at the backup selection and compatibility check steps.",
      highlight: false,
    },
  ],
};

export const finalDesign = {
  heading: "Key features for the final upgrade flow",
  body: "Drawing from initial findings, we identified and prioritized features that directly addressed core pain points. These core features were validated by our users in the usability testing. I worked on the error states and the detailed final user flow before handing off to developement. These were the key moments that I designed for the upgrade flow.",
};

// Each feature pairs a card with a screenshot and a dashed callout that crops
// into the same screenshot. Geometry is in px, measured from the Paper design.
export const features = [
  {
    number: 1,
    title: "Step-by-step progress",
    body: "A persistent sidebar indicator shows users exactly which step they're on. Each step only unlocks once the previous is completed without errors.",
    image: `${ASSET}/01M0DQ676AGMA8J3CV7DH98751.png`,
    imagePosition: "88.889%",
    callout: {
      image: `${ASSET}/01M0DQ676AGMA8J3CV7DH98751.png`,
      width: 172.5,
      height: 151.5,
      left: 8,
      top: 115,
      size: "481.304%",
      position: "8.438% 40.752%",
    },
    badge: { left: -7, top: 100 },
  },
  {
    number: 2,
    title: "Recommended level, found for you",
    body: "The console reads the machine's current level and recommends the level it supports based on the limitations of the physical server, so admins no longer research compatibility manually before they start.",
    image: `${ASSET}/01M0DQ676AGMA8J3CV7DH98751.png`,
    imagePosition: "50%",
    callout: {
      image: `${ASSET}/01M0E65M34ME9PWB0NGWKSW0PZ.png`,
      width: 488,
      height: 52,
      left: 48,
      top: 170,
      size: "117.647%",
      position: "32.143% 44%",
    },
    badge: { left: 33, top: 155 },
  },
  {
    number: 3,
    title: "Time estimate warning",
    body: "An upfront warning tells users the estimated upgrade duration (up to 2 hours) so they can plan accordingly and avoid interruptions to live systems.",
    image: `${ASSET}/01M0DQ676AGMA8J3CV7DH98751.png`,
    imagePosition: "50%",
    callout: {
      image: `${ASSET}/01M0DQ676AGMA8J3CV7DH98751.png`,
      width: 393,
      height: 86,
      left: 132,
      top: 120,
      size: "230.285%",
      position: "48.861% 37.141%",
    },
    badge: { left: 117, top: 105 },
  },
  {
    number: 4,
    title: "Error states and messages that show CLI level of Detail",
    body: "When processes undergo errors, the messages show and refelct the level of detail the CLI would show so that users can diagnose, or escalate issues correctly.",
    image: `${ASSET}/01M0EP52WFZHPJ7PQ39M3V1D7R.png`,
    imagePosition: "50%",
    callout: {
      image: `${ASSET}/01M0EP52WFZHPJ7PQ39M3V1D7R.png`,
      width: 402,
      height: 196,
      left: 118,
      top: 186,
      size: "150.139%",
      position: "72.928% 87.425%",
    },
    badge: { left: 103, top: 171 },
  },
  {
    number: 5,
    title: "Review before commit",
    body: "A summary page lets users review all inputs before triggering the upgrade and reboot — with a system-wide warning for other users connected to the HMC.",
    image: `${ASSET}/01M0E4NBBM1JPQ6YQF6Y4GBB3N.png`,
    imagePosition: "50%",
    imageWidth: 424,
    callout: {
      image: `${ASSET}/01M0E4NBBM1JPQ6YQF6Y4GBB3N.png`,
      width: 342.5,
      height: 363.2,
      left: 95,
      top: 32,
      size: "142.282%",
      position: "83.333% 80.476%",
    },
    badge: { left: 77, top: 17 },
  },
];

export const impact = {
  kicker: "Business Impact",
  heading: "Shipped in the Autumn 2023 Power10 release",
  body: "The design was approved by IBM's PM, development and testing teams. Upgrades through the UI directly increased adoption of the latest software versions, meaning more frequent security patching for virtual servers, protecting companies from malicious attacks. Increased adoption also meant faster access to new features. This release led to a 30% increase in NPS across IBM Power enterprise clients.",
};

export const future = {
  body: "Due to the tight timeline, the following features were pushed to the future release.",
  cards: [
    {
      title: "Consolidated view",
      copy: "Enable administrators managing multiple HMC environments to initiate, monitor, and compare upgrades across systems from a single consolidated view.",
    },
    {
      title: "Scheduled upgrades",
      copy: "Allow operators to schedule upgrades during maintenance windows, reducing disruption to live production and supporting enterprise change management processes.",
    },
    {
      title: "Zero planned downtime",
      copy: "Design for Zero Planned Downtime, allowing for maintenance, security patches, and upgrades without interrupting critical applications. (This was implemented in 2025!)",
    },
  ],
};

export const learnings = {
  body: "Three things this project changed about how I approach high-stakes enterprise workflows.",
  cards: [
    {
      title: "A GUI shouldn't hide what the terminal showed",
      copy: "I assumed moving off the CLI meant simplifying error messages. Interviews said the opposite — 6 of 12 admins needed full diagnostic detail to fix an issue or escalate it. The GUI had to match the terminal's depth, not soften it.",
    },
    {
      title: "Testing settled what a design review couldn't",
      copy: "Two directions, strong opinions, no consensus in the room. Putting both in front of 12 users back-to-back turned a taste debate into a decision — 9 of 12 chose the tearsheet. The second prototype paid for itself.",
    },
    {
      title: "Rare tasks are really onboarding problems",
      copy: "11 of 12 admins spent real time teaching juniors, because upgrades happen too rarely for anyone to build muscle memory. The step indicator and review screen became training material as much as interface.",
    },
  ],
};
