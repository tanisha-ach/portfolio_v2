// Content for the IBM HMC case study, ported from the Paper design.

export const nav = [
  { id: "overview", label: "Overview" },
  { id: "challenge", label: "Challenge" },
  { id: "research", label: "Research" },
  { id: "prototyping", label: "Prototyping" },
  { id: "results", label: "Results" },
  { id: "impact", label: "Impact" },
];

export const meta = [
  { label: "Role", value: "Primary UX Designer" },
  { label: "Timeline", value: "6 weeks" },
  { label: "Users Tested", value: "12 participants" },
  { label: "NPS Impact", value: "+30% NPS" },
];

export const researchStats = [
  { stat: "9/12", copy: "Admins manually verify compatibility with no automated guidance" },
  { stat: "11/12", copy: "Spend significant time onboarding juniors on upgrade procedures" },
  { stat: "6/12", copy: "CLI error messages lack detail needed to diagnose issues" },
  { stat: "7/12", copy: "Required downloads to internal server even on connected systems" },
];

export const approach = [
  {
    kicker: "01 · Observe",
    copy: "User interviews · Experience Service Map · As-Is Scenario Map · Usability testing",
  },
  {
    kicker: "02 · Reflect",
    copy: "Persona mapping · Challenge identification · Process mapping · Interview synthesis · Design audit",
  },
  {
    kicker: "03 · Make",
    copy: "Co-creation with SMEs · Low fidelity prototyping · High fidelity mockups",
  },
];

export const features = [
  {
    kicker: "1 · Step-by-step progress",
    copy: "A persistent sidebar indicator shows users exactly which step they're on. Each step only unlocks once the previous is completed without errors.",
  },
  {
    kicker: "2 · Time estimate warning",
    copy: "An upfront warning tells users the estimated upgrade duration (up to 2 hours) so they can plan accordingly and avoid interruptions to live systems.",
  },
  {
    kicker: "3 · Flexible backup options",
    copy: "Users can select from multiple backup destinations — including backing up at multiple locations at once — extending what is available on the command line.",
  },
  {
    kicker: "4 · Review before commit",
    copy: "A summary page lets users review all inputs before triggering the upgrade and reboot — with a system-wide warning for other users connected to the HMC.",
  },
];

export const directions = [
  {
    label: "Screen A — Modal dialog overlay",
    copy: "The upgrade wizard opens as a full-page modal on the HMC dashboard. Users stay in context but the overlay limits space for step-by-step content and inline guidance.",
  },
  {
    label: "Screen B — Tearsheet, full right panel",
    copy: "The wizard opens as a tearsheet sliding in from the right. More space for step content, a persistent progress sidebar, and contextual help inline.",
  },
];

export const results = [
  {
    stat: "9/12",
    kicker: "Preferred Screen B",
    copy: "Participants found the tearsheet layout easier to follow and less cognitively demanding under realistic time pressure.",
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
];
