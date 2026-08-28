// Content for the Aimly case study, ported from the Paper design.

const ASSET = "https://app.paper.design/file-assets/01KY86RD325CPNB088ESCM9HH1";

export const nav = [
  { id: "overview", label: "Overview" },
  { id: "context", label: "Context" },
  { id: "research", label: "Research" },
  { id: "approach", label: "Approach" },
  { id: "prototyping", label: "Prototyping" },
  { id: "decisions", label: "Outcome" },
  { id: "results", label: "Results" },
];

export const hero = {
  eyebrow: ["Aimly", "Senior Product Designer", "2026"],
  title: "From blank canvas to a fully functional dashboard for Aimly",
  summary:
    'How I took a brief to "improve the experience" and designed a flexible, scalable dashboard from 0 to 1, that let users finally have control over their fundraisers, leading to a 28% increase in users, 34% increase in fundraising events and a 90% reduction in customer complaints.',
};

export const meta = [
  { label: "Role", value: "Senior Product Designer" },
  { label: "Timeline", value: "3 weeks" },
  {
    label: "Team",
    team: {
      avatar: "/tanisha.jpg",
      avatarAlt: "Tanisha Acharya",
      others: 3,
      roles: "1 co-founder, 1 PM and 1 Dev",
    },
  },
  { label: "Domain", value: "B2C, 0 → 1" },
];

export const context = [
  "Aimly is a free digital fundraising platform founded in 2021. It makes fundraising simple for small and medium organizations by selling gourmet chips and popcorn to raise donations, think Girl Scouts, but savoury! Aimly handles the transactions, customer experience and logistics so organizers can focus on their community.",
  'I joined as senior product designer with a brief to "improve the overall user experience." Stakeholder interviews and a competitive analysis of features pointed at one (giant) gap worth fixing before anything else. Once I got the team to align on solving the gap, I led account creation and the fundraiser dashboard from 0 to 1, scoped into a release small enough to ship in three weeks.',
];

export const research = {
  kicker: "01 · Research — stakeholder interviews",
  heading: "Finding the problem without a research budget",
  body: "We had no budget or time to recruit customers, so I went to the people who hear from them every day — two founders, the head of customer management, and the VP of relationship success. Pairing what they told me with the customer complaint log turned scattered anecdotes into a ranked list of what was actually costing us.",
  statement:
    "Organizers could create a campaign and share it. Everything after that — fixing a typo, moving a date, raising a goal — meant a phone call to customer care.",
};

export const competitive = {
  kicker: "02 · Research — competitive analysis",
  heading: "Where Aimly led, and where it was missing",
  image: `${ASSET}/01M0R2Y5YQATCJF91K4FFYKR7Y.png`,
  paragraphs: [
    "I mapped Aimly against its competitors to find both our gaps and the openings nobody else had taken.",
    "The decisive gap: Aimly had no user accounts and no way to edit an event once it was live. Every competitor but one allowed editing. This wasn't a feature request — it was a key component, and it was why organizers left.",
    "What Aimly already owned: free coaching paired with a five-minute setup, which no competitor matches. Participant-level motivation — personal and team goals, progress, and a live leaderboard — that GoFundMe and Bonfire barely touch. Marketing support for organizers, who elsewhere are left to promote alone. And scheduling a year ahead, which matters to booster clubs and athletic directors who budget annually.",
    "The read was clear: fix table stakes first, then lean on the differentiators. New features could wait.",
  ],
};

export const commitments = {
  kicker: "03 · Research — what we chose to build",
  heading: "Four commitments for MVP 1",
  cards: [
    {
      title: "Edit + duplicate",
      copy: "Events had to be editable after publishing, and duplicable so last year's event doesn't get rebuilt from scratch.",
    },
    {
      title: "Event vs. store",
      copy: "Customers wanted event management separated from the storefront, so a leader can rally the team while members handle selling and fundraising.",
    },
    {
      title: "Contextual dashboard",
      copy: "One dashboard that reads differently for a first-time organizer than a returning one, and differently again for a member who only sells.",
    },
    {
      title: "Room to scale",
      copy: "The dashboard had to hold up as organizers move to heavier use, and as more campaign management tools land on it.",
    },
  ],
};

export const approach = {
  kicker: "04 · Approach",
  steps: [
    {
      step: "Step 01",
      title: "Ideation with Claude Code",
      copy: "I fed Claude Code the existing design system and asked it to come up with iterations of the dashboard, describing the elements I wanted along with a low fidelity wireframe. I decided to build on one of the ideas for the final dashboard.",
      images: ["/aimly-approach-ideation.webp"],
    },
    {
      step: "Step 02",
      title: "Pulling competitor patterns into Figma with Mobbin MCP",
      copy: 'I wanted a quick way of looking at the checklists that came from direct and indirect competitors. After connecting to the Mobbin MCP, I instructed Claude to gather examples of "Getting Started" patterns with a focus on random order completion from direct and indirect competitors of Aimly.',
      images: ["/aimly-approach-mobbin.webp"],
    },
    {
      step: "Step 03",
      title: "Turning those patterns into written guidance",
      copy: "I asked Claude to take the examples collected and write a short report on the industry wide best practices and design recommendations. I ran a similar report for the event card design for the dashboard.",
      // The report itself, rather than a picture of it — it is a document, and
      // a screenshot of a document is unreadable at this size.
      doc: {
        src: "/onboarding-checklist-analysis.html",
        title: "Onboarding checklist competitive analysis",
      },
    },
    {
      step: "Step 04",
      title: "Expanding the style guide to cover the new surfaces",
      copy: "Looking at the current state of the style guide, I noticed several gaps. Before I started on the ideation, I got Claude to make the foundation solid by getting it to set and expand the design system.",
      compare: {
        before: "/aimly-style-guide-before.webp",
        after: "/aimly-style-guide-after.webp",
        beforeLabel: "Before",
        afterLabel: "After",
        beforeFill: "#808080",
        afterFill: "#f5f7f8",
      },
    },
  ],
};

export const prototyping = {
  kicker: "05 · Prototyping",
  cardsHeading: "Iterating through the event cards",
  cardsIntro:
    "The fundraiser card is the unit organizers live in, so I tried three versions of how much it should carry — then two dashboard shells around them.",
  cardVersions: [
    {
      label: "Version 1",
      image: `${ASSET}/01M0RB7HY769ZYAA6MZQP4NVBG.png`,
      notes: [
        { kind: "pro", text: "The card starts off simple showing event details with options within the kebab menu." },
        { kind: "pro", text: "A progress banner sits above the card." },
        { kind: "con", text: "Key details like money raised needs to be included." },
      ],
    },
    {
      label: "Version 2",
      image: `${ASSET}/01M0RB76HDMAA90J9EYM2WMEQV.png`,
      notes: [
        {
          kind: "pro",
          text: "'View' and 'Edit' sit on the card — the shortest route to the thing organizers used to phone in for.",
        },
        {
          kind: "warn",
          text: "Extra actions can sit within the menu. However, this means that options like 'Duplicate' that the user asked for aren't upfront and harder to find.",
        },
        { kind: "pro", text: "Amount raised can be tracked upfront." },
      ],
    },
    {
      label: "Version 3 — finalized",
      chosen: true,
      video: "/aimly-card-v3.mp4",
      videoRatio: "924 / 510",
      videoLabel:
        "Screen recording of the finalized fundraiser card, with every action opening from the kebab menu",
      notes: [
        {
          kind: "pro",
          text: "All actions now live in the kebab menu to keep the card minimal and clean. This also trains the user to find all available options in one place.",
        },
        { kind: "pro", text: "The banners from V1 can be added if needed to nudge the user towards a certain action." },
      ],
    },
  ],
  shellsHeading: "Two dashboard shell directions",
  shells: [
    {
      label: "Version 1",
      image: "/aimly-shell-v1.webp",
      imageMobile: "/aimly-shell-v1-mobile.webp",
      frame: "#C6C6C6",
      notes: [
        {
          kind: "pro",
          text: "'Next steps' checklist sits at the top to guide the user to complete the necessary steps to run a successful event. The checklist is minimizable.",
        },
        {
          kind: "warn",
          text: "'Next steps' checklist covers a lot of the viewport upon first load, which might be annoying to returning users.",
        },
        { kind: "warn", text: "The account nav items are hidden within the account menu on both desktop and mobile." },
      ],
    },
    {
      label: "Version 2 — finalized",
      chosen: true,
      image: "/aimly-shell-v2.webp",
      imageMobile: "/aimly-shell-v2-mobile.webp",
      frame: "#C6C6C6",
      notes: [
        { kind: "pro", text: "'Next steps' checklist is a minimizable modal that floats on the screen." },
        {
          kind: "pro",
          text: "Account nav items are persistent on both desktop (persistent menu) and mobile (floating nav).",
        },
        { kind: "pro", text: "All items are visible within viewport on desktop and mobile." },
        {
          kind: "pro",
          text: "Style guide is updated so the dashboard has a modern look and signals where the team wants the product to move towards.",
        },
        {
          kind: "pro",
          text: "Adding a payout method is clearly called out on both mobile and desktop, nudging users to complete an action that is causing the backend team the most pain.",
        },
      ],
    },
  ],
  finalHeading: "Final dashboard: designed and ready to deploy",
  finalShots: [
    {
      image: "/aimly-final-dashboard.webp",
      imageMobile: "/aimly-final-dashboard-mobile.webp",
      frame: "#C6C6C6",
      // Where each numbered marker sits on the screenshot, as a percentage of
      // the image. Desktop and mobile both carry the numbers they share, and the
      // mobile pair is the same point measured against the tighter crop.
      markers: [
        { n: 1, left: 19.8, top: 21.5, mobileLeft: 16.3, mobileTop: 11.4 },
        { n: 2, left: 7.6, top: 21.5, mobileLeft: 3, mobileTop: 11.4 },
        { n: 4, left: 19.8, top: 28.2, mobileLeft: 16.3, mobileTop: 20.5 },
        { n: 5, left: 19.8, top: 46.6, mobileLeft: 16.3, mobileTop: 45.4 },
        { n: 3, left: 56.3, top: 51.3, mobileLeft: 56.2, mobileTop: 51.8 },
        { n: 6, left: 19.8, top: 56.1, mobileLeft: 16.3, mobileTop: 58.3 },
        { n: 1, left: 76.4, top: 20.8, mobileLeft: 78.1, mobileTop: 10.5 },
        { n: 4, left: 76.4, top: 25.3, mobileLeft: 78.1, mobileTop: 16.6 },
        { n: 5, left: 76.4, top: 49.6, mobileLeft: 78.1, mobileTop: 49.5 },
        { n: 6, left: 76.4, top: 62.4, mobileLeft: 78.1, mobileTop: 66.8 },
        { n: 2, left: 74.8, top: 78.5, mobileLeft: 76.4, mobileTop: 88.6 },
        { n: 3, left: 93.8, top: 78.5, mobileLeft: 97.1, mobileTop: 88.6 },
      ],
      notes: [
        {
          n: 1,
          text: "User greeting and a breadcrumb navigation to indicate which page the user is located at within the information architecture.",
        },
        {
          n: 2,
          text: "Persistent account nav and a named account header. Costs width, but gives dashboard, settings and payouts a fixed home as the features grow. On mobile the options are added to the floating navigation bar.",
        },
        {
          n: 3,
          text: "'Next steps' to guide the user to complete the necessary steps to run a successful event. On mobile it switches to a modal that minimizes to an option on the floating navigation.",
        },
        {
          n: 4,
          text: "All upcoming and current fundraisers are upfront and easily scannable. Events that have ended but the payout method is yet to be added also sit here until payout is completed.",
        },
        { n: 5, text: "Options to run a new event or join a team are upfront and easy to find." },
        { n: 6, text: "Tips and inspiration to guide new and returning users on how to run a successful event." },
      ],
    },
    {
      image: "/aimly-final-screens.webp",
      imageMobile: "/aimly-final-screens-mobile.webp",
      frame: "#C6C6C6",
      // One marker per phone, pinned to each screen's top-left corner.
      markers: [
        { n: 7, left: 5.5, top: 16.5, mobileLeft: 2.3, mobileTop: 7.3 },
        { n: 8, left: 20.9, top: 16.5, mobileLeft: 19.1, mobileTop: 7.3 },
        { n: 9, left: 36.3, top: 16.5, mobileLeft: 36, mobileTop: 7.3 },
        { n: 10, left: 51.7, top: 16.5, mobileLeft: 52.8, mobileTop: 7.3 },
        { n: 11, left: 67.1, top: 16.5, mobileLeft: 69.7, mobileTop: 7.3 },
        { n: 12, left: 82.5, top: 16.5, mobileLeft: 86.5, mobileTop: 7.3 },
      ],
      notes: [
        { n: 7, text: "For a first time user without a fundraiser the card becomes a call to action." },
        {
          n: 8,
          text: "The account dashboard is adaptable — if the user is only a team member and does not need to add a payout method, the option disappears from the nav.",
        },
        { n: 9, text: "On mobile 'Next steps' switches to a modal that minimizes to an option on the floating nav." },
        { n: 10, text: "Account settings lets the user update their name and email." },
        {
          n: 11,
          text: "Payout method option directs to Stripe to let the user get their amount due as a direct deposit into their bank account.",
        },
        { n: 12, text: "Payout method can be updated to a different bank account if needed." },
      ],
    },
  ],
};

export const decisions = {
  kicker: "06 · Outcome",
  heading: "How the four commitments landed",
  intro: "Each commitment had to survive contact with real screens. These are the decisions that resolved them.",
  cards: [
    {
      title: "1 · Edit, where it's needed",
      copy: "Edit sits on the fundraiser card itself rather than inside a settings page — the action that used to require a phone call is now one tap from the dashboard.",
    },
    {
      title: "2 · User based dashboard",
      copy: "First-time organizers get a next-steps checklist; returning ones get their fundraisers first. Same surface, different emphasis.",
    },
    {
      title: "3 · Room to grow",
      copy: "A persistent account nav gives settings, payouts and future campaign tools a fixed home, so the dashboard holds up as usage deepens.",
    },
    {
      title: "4 · Event and store, split",
      copy: "The feature to split event and store got pushed to MVP 2 to make room to fix other security vulnerabilities that were of higher importance.",
    },
  ],
};

export const results = {
  kicker: "07 · Results",
  heading: "The outcome, quantified",
  intro: "Account creation and the dashboard were launched in May 2026, these were the changes we saw in 3 months.",
  stats: [
    {
      stat: "28.8% ↑",
      kicker: "users",
      copy: "More organizers finished signup and came back, now that having an account was worth something.",
      highlight: true,
    },
    {
      stat: "34.3% ↑",
      kicker: "events created",
      copy: "Editing and duplication made a second event cheap to start, so organizers ran more of them.",
      highlight: false,
    },
    {
      stat: "90% ↓",
      kicker: "customer complaints",
      copy: "The calls to customer care that this project existed to remove largely stopped.",
      highlight: false,
    },
  ],
};
