import type { Step, Guarantee } from "./types";

// ─── Step data ────────────────────────────────────────────────────────────────
export const STEPS: Step[] = [
  {
    id: "browse",
    num: "01",
    label: "Discover",
    tag: "Step One",
    heading: (
      <>
        Browse &amp; <em>Discover</em>
      </>
    ),
    body: "Explore all upcoming IEGS webinars on the public listing page. Filter by discipline — GIS, Drones, Agriculture, Oil & Gas or Remote Sensing — or search by keyword. Every webinar card shows the date, speakers, platform and duration upfront.",
    checkItems: [
      "Filter by category: GIS, Drones, Agric, Oil & Gas, Remote Sensing",
      "Search by keyword across titles and descriptions",
      "Sort by date or popularity",
      "View speaker profiles before registering",
      "See past recordings on the archive page",
    ],
    centerLabel: "What you can do",
    outcomeText: (
      <>
        You land on the <strong>right webinar</strong> for your discipline in
        under 60 seconds.
      </>
    ),
    ctaLabel: "Browse Webinars →",
    color: "var(--gold)",
  },
  {
    id: "filter",
    num: "02",
    label: "Choose",
    tag: "Step Two",
    heading: (
      <>
        View Full <em>Details</em>
      </>
    ),
    body: "Click any webinar card to open its full detail page. Read the complete description, see who the speakers are with their bios, check the date and duration, and confirm the platform (Zoom, Google Meet or Zoho). The webinar time is automatically shown in your local timezone.",
    checkItems: [
      "Full webinar description and learning objectives",
      "Speaker bios, titles and LinkedIn profiles",
      "Date & time auto-converted to your local timezone",
      "Platform details: Zoom, Google Meet or Zoho",
      "Share to WhatsApp, LinkedIn or Twitter/X",
    ],
    centerLabel: "Detail page shows",
    outcomeText: (
      <>
        You have <strong>full clarity</strong> on the topic, speakers and timing
        before committing.
      </>
    ),
    ctaLabel: "View a Webinar →",
    color: "var(--cyan)",
  },
  {
    id: "register",
    num: "03",
    label: "Register",
    tag: "Step Three",
    heading: (
      <>
        Fill the <em>Form</em>
      </>
    ),
    body: "Click Register and fill a simple form — first name, last name, email address, phone number and your timezone. That's it. No account creation, no password, no payment. The system prevents duplicate registrations so you only ever receive one set of emails per webinar.",
    checkItems: [
      "First name, last name, email, phone",
      "Select your timezone from the dropdown",
      "Newsletter opt-in checkbox (pre-checked, opt-out)",
      "No account or password required",
      "Duplicate registration is automatically blocked",
    ],
    centerLabel: "Form fields required",
    outcomeText: (
      <>
        Registration is complete in <strong>under 60 seconds</strong>. No
        friction. No barriers.
      </>
    ),
    ctaLabel: "Register Now — Free →",
    color: "var(--green)",
  },
  {
    id: "email",
    num: "04",
    label: "Confirmed",
    tag: "Step Four",
    heading: (
      <>
        <em>Emails</em> Keep You Ready
      </>
    ),
    body: "Immediately after registration, a confirmation email lands in your inbox. Then 24 hours before the webinar, a reminder. One hour before, another reminder. When the admin marks the session live, the meeting link and password are emailed directly to you.",
    checkItems: [
      "Instant confirmation email after registration",
      "24-hour reminder with webinar details",
      "1-hour reminder to help you prepare",
      "Meeting link + password sent when session goes live",
      "All emails show time in your registered timezone",
    ],
    centerLabel: "Automated email sequence",
    outcomeText: (
      <>
        You <strong>never miss a session</strong> — every critical moment is
        covered by an automated email.
      </>
    ),
    ctaLabel: "See How Emails Work →",
    color: "var(--gold)",
  },
  {
    id: "join",
    num: "05",
    label: "Join Live",
    tag: "Step Five",
    heading: (
      <>
        Join &amp; <em>Learn Live</em>
      </>
    ),
    body: "Click the meeting link from your email and join the live session on Zoom, Google Meet or Zoho. After the webinar ends, IEGS publishes the recording to the archive page so you can rewatch or share with colleagues. Missed a session? The recordings page has every past webinar.",
    checkItems: [
      "One-click join via Zoom, Google Meet or Zoho",
      "Meeting link arrives in email when session goes live",
      "Session recordings published on the archive page",
      "Watch any past webinar without registering again",
      "Certificates issued for attended sessions (Phase 2)",
    ],
    centerLabel: "On the day",
    outcomeText: (
      <>
        Expert geospatial knowledge —{" "}
        <strong>live, free</strong> and accessible from anywhere in the world.
      </>
    ),
    ctaLabel: "View Upcoming Sessions →",
    color: "var(--green)",
  },
];

// ─── Guarantee items ──────────────────────────────────────────────────────────
export const GUARANTEES: Guarantee[] = [
  { icon: "◈", title: "Always Free",       sub: "No payment, ever"          },
  { icon: "◎", title: "No Account Needed", sub: "Register per webinar only" },
  { icon: "◷", title: "Your Timezone",     sub: "Times auto-converted"      },
  { icon: "✉", title: "Smart Reminders",   sub: "24hr + 1hr before session" },
];
