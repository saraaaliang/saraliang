// ── Homepage — Content ──────────────────────────────────────────────────────
// All homepage copy and images live here (hero, selected work, testimonials,
// about). Edit text or swap images below without touching App.tsx.

import aciImage from "./images/home/aci-course-experience.jpg";
import kiosksImage from "./images/home/kiosks-frog-kiosk.jpg";
import keelungImage from "./images/home/keelung-stage.jpg";
import energyImage from "./images/home/energy-dashboard.jpg";
import sharingImage from "./images/sharing-time/cover.png";
import syncAiImage from "./images/sync-ai/cover.png";

export interface HomeCase {
  label: string;
  title: string;
  text: string;
  image: string;
  alt: string;
  /** Project id of an existing case study page; omit when there is no page yet. */
  caseId?: string;
  status?: string;
  /** Show the image whole (for transparent device mockups) instead of cropping it. */
  contain?: boolean;
}

export const homeContent = {
  hero: {
    kicker: "UX Designer",
    titleBefore: "Designing experiences that ",
    titleHighlight: "explain themselves",
    titleAfter: ".",
    subtitle:
      "From course platforms to exhibition kiosks, I turn complex information and flows into experiences people understand at first glance.",
  },

  cases: [
    {
      label: "Course platform",
      status: "In progress",
      title: "ACI Course Experience",
      text: "The Asian Classics Institute (ACI) offers Buddhist and meditation courses online, in 16 languages. I'm redesigning the course page so learners anywhere can understand what a course includes and how to enroll and donate, without having to ask.",
      image: aciImage,
      alt: "Course journey from discover to lesson, with the Discover and course pages",
    },
    {
      label: "Exhibition dashboard",
      title: "Energy Transition",
      text: "I redesigned an interactive exhibition about energy so kids and parents could read the data on their own. After rounds of testing, over 90% of visitors completed the experience.",
      image: energyImage,
      alt: "Energy Transition dashboard on an exhibition screen",
      caseId: "sdg-energy",
    },
    {
      label: "Service design",
      title: "Sharing Time",
      text: "I designed an internal sharing service that gives teams in creative companies a safe space to ask and share. Teams grew closer, and the client adopted it as an internal tool.",
      image: sharingImage,
      alt: "Sharing Time card toolkit and platform",
      caseId: "enterprise-service-design",
    },
    {
      label: "Figma plugin · Self-initiated",
      title: "Sync AI",
      text: "I took Sync AI from 0 to 1 on my own: a Figma plugin that turns design choices into business language clients can trust, with a clear approval flow instead of endless chat. I built the working prototype with AI.",
      image: syncAiImage,
      alt: "Sync AI landing page",
      caseId: "sync-ai",
    },
    {
      label: "Exhibition kiosks",
      title: "Six interactive kiosks",
      text: "I designed the screens for six family kiosks, each played with a different control, and kept one screen system across all of them so families could play on their own when staff were busy. The first two of 7 events each drew over 1,000 families.",
      image: kiosksImage,
      alt: "A visitor reaching for the buttons on the Taiwanese Sayings kiosk",
      caseId: "kiosks",
    },
    {
      label: "Physical + digital",
      title: "Keelung hot pot kiosk",
      text: "I designed a journey that guides visitors from an exhibition kiosk to their phone to a local restaurant, with each step telling them what to do next. Shown at the Keelung City Expo, which drew 1.01 million visits in 10 days.",
      image: keelungImage,
      alt: "Cooking screen on the kiosk display, with the saved hot pot page on a phone",
      caseId: "keelung",
    },
  ] as HomeCase[],

  testimonial: {
    quote:
      "Sara understands what's needed without much explanation, and spots blind spots on her own. Her first drafts are already over 80% there and need almost no changes. Her use of colour and layout is refined. A professional partner I'd highly recommend.",
    name: "Ann Chen",
    role: "Digital Designer, ex-Cafe24 and Fung Group",
    context: "Worked with Sara on the Canon series",
  },

  about: {
    heading: "I started by making things look good. Now I make them easy to use.",
    body: 'Visual design taught me how people take in a page at a glance. Service design taught me to find where they get stuck. I have a sharp eye for detail, and my conclusions often make people say, "Yes, that\'s exactly it!"',
  },
};
