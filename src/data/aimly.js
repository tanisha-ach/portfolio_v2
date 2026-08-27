// Content for the Aimly case study, ported from the Paper design.

const ASSET = "https://app.paper.design/file-assets/01KY86RD325CPNB088ESCM9HH1";

export const nav = [
  { id: "overview", label: "Overview" },
  { id: "context", label: "Context" },
  { id: "research", label: "Research" },
  { id: "approach", label: "Approach" },
  { id: "prototyping", label: "Prototyping" },
  { id: "decisions", label: "Key decisions" },
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
  "Aimly is a free digital fundraising platform founded in 2021. It makes fundraising simple for small and medium organizations by selling gourmet chips and popcorn to raise donations — think Girl Scouts, but savoury. Aimly handles the transactions, customer experience and logistics so organizers can focus on their community.",
  'I joined as senior product designer with a brief no narrower than "improve the overall user experience." Stakeholder interviews and a competitive audit pointed at one gap worth fixing before anything else. Once the team agreed on it, I led account creation and the fundraiser dashboard from 0 to 1, scoped into releases small enough to ship in three weeks.',
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
  heading: "Where Aimly led, and where it was missing table stakes",
  image: `${ASSET}/01M0R2Y5YQATCJF91K4FFYKR7Y.png`,
  paragraphs: [
    "I mapped Aimly against its competitors to find both our gaps and the openings nobody else had taken.",
    "The decisive gap: Aimly had no user accounts and no way to edit an event once it was live. Every competitor but one allowed editing. This wasn't a feature request — it was table stakes, and it was why organizers left.",
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
      title: "Standing up rough screens fast with Claude Code",
      images: [`${ASSET}/01M0R8PPJ4PY3BMGVCFYXY5CAF.png`, `${ASSET}/01M0R8PPJ4CWDJXMWMPFTMS0P7.png`],
    },
    {
      step: "Step 02",
      title: "Pulling competitor patterns into Figma with Mobbin MCP",
      images: [`${ASSET}/01M0RAJ6YVD12MSS8S7B3VQPXH.jpg`],
    },
    {
      step: "Step 03",
      title: "Turning those patterns into written guidance",
      images: [`${ASSET}/01M0R7GGZ17G4HZVR427HQRTQK.png`, `${ASSET}/01M0R8MG847HTJTKGGMY4QMW8R.png`],
    },
    {
      step: "Step 04",
      title: "Expanding the style guide to cover the new surfaces",
      images: [`${ASSET}/01M0RACP1EQV5Z0EMXM3WZPYVT.png`],
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
      image: `${ASSET}/01M0RB7BGXG7PJBMZJ7YCFZQCC.png`,
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
      image: `${ASSET}/01M0RBT3YST30WAE1ZZCY4790M.png`,
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
      image: `${ASSET}/01M0RBTH4F5QMVGMBYBCBK8CGR.png`,
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
      image: `${ASSET}/01M0V7TDD0W9PP24N99CXBKDP4.png`,
      // Where each numbered marker sits on the screenshot, as a percentage of
      // the image. Desktop and mobile both carry the numbers they share.
      markers: [
        { n: 1, left: 19.8, top: 21.5 },
        { n: 2, left: 7.6, top: 21.5 },
        { n: 4, left: 19.8, top: 28.2 },
        { n: 5, left: 19.8, top: 46.6 },
        { n: 3, left: 56.3, top: 51.3 },
        { n: 6, left: 19.8, top: 56.1 },
        { n: 1, left: 76.4, top: 20.8 },
        { n: 4, left: 76.4, top: 25.3 },
        { n: 5, left: 76.4, top: 49.6 },
        { n: 6, left: 76.4, top: 62.4 },
        { n: 2, left: 74.8, top: 78.5 },
        { n: 3, left: 93.8, top: 78.5 },
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
      image: `${ASSET}/01M0XDM60DYV2NYY97Z9MJPYGV.png`,
      // One marker per phone, pinned to each screen's top-left corner.
      markers: [
        { n: 7, left: 5.5, top: 16.5 },
        { n: 8, left: 20.9, top: 16.5 },
        { n: 9, left: 36.3, top: 16.5 },
        { n: 10, left: 51.7, top: 16.5 },
        { n: 11, left: 67.1, top: 16.5 },
        { n: 12, left: 82.5, top: 16.5 },
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
  kicker: "06 · Key decisions",
  heading: "How the four commitments landed",
  intro: "Each commitment had to survive contact with real screens. These are the decisions that resolved them.",
  cards: [
    {
      title: "1 · Edit, where it's needed",
      copy: "Edit sits on the fundraiser card itself rather than inside a settings page — the action that used to require a phone call is now one tap from the dashboard.",
    },
    {
      title: "2 · Event and store, split",
      copy: "Organizing an event and running its storefront became separate entries, so a leader can rally the team while members handle selling.",
    },
    {
      title: "3 · A dashboard that reads the user",
      copy: "First-time organizers get a next-steps checklist; returning ones get their fundraisers first. Same surface, different emphasis.",
    },
    {
      title: "4 · Room to grow",
      copy: "A persistent account nav gives settings, payouts and future campaign tools a fixed home, so the dashboard holds up as usage deepens.",
    },
  ],
};

export const results = {
  kicker: "07 · Results",
  heading: "The outcome, quantified",
  intro: "Account creation and the dashboard launched in May 2026.",
  stats: [
    {
      stat: "28.8%",
      kicker: "Increase in users",
      copy: "More organizers finished signup and came back, now that having an account was worth something.",
      highlight: true,
    },
    {
      stat: "34.3%",
      kicker: "Increase in events created",
      copy: "Editing and duplication made a second event cheap to start, so organizers ran more of them.",
      highlight: false,
    },
    {
      stat: "90%",
      kicker: "Reduction in customer complaints",
      copy: "The calls to customer care that this project existed to remove largely stopped.",
      highlight: false,
    },
  ],
};
