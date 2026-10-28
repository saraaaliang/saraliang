// ── Energy Transition — Case Study Content ──────────────────────────────────
// All copy and image references for the Energy Transition case study live here.
// Edit text or swap image files below without touching
// src/app/SdgEnergyCaseStudy.tsx.

import cover from "./images/sdg-energy/cover.png";
import oldDesign from "./images/sdg-energy/old-design.png";
import usabilityTestPhoto from "./images/sdg-energy/usability-test-photo.png";
import heroMockup from "./images/sdg-energy/hero-outdoor-mockup.png";
import newFlow from "./images/sdg-energy/new-flow.png";
import onboardingStep1 from "./images/sdg-energy/onboarding-step-1.png";
import onboardingStep2 from "./images/sdg-energy/onboarding-step-2.png";
import onboardingStep3 from "./images/sdg-energy/onboarding-step-3.png";
import onboardingStep4 from "./images/sdg-energy/onboarding-step-4.png";
import finalScreen from "./images/sdg-energy/final-screen.png";
import balancedBadge from "./images/sdg-energy/balance-status-balanced.png";
import demandNeedle from "./images/sdg-energy/demand-needle.png";
import facesLegend from "./images/sdg-energy/faces-legend.png";
import coalWarning from "./images/sdg-energy/coal-warning.png";
import version1Screen from "./images/sdg-energy/version-1-screen.png";
import gestureChange from "./images/sdg-energy/version-1-screen-1.png";
import version2Screen from "./images/sdg-energy/version-2-screen.png";
import version3Screen from "./images/sdg-energy/version-3-screen.png";

export interface EnergyImage {
  src: string;
  caption: string;
  /** Width / height; images in a "row" share one height using this. */
  ratio?: number;
}

export interface EnergyDecision {
  heading: string;
  body: string;
  /** Before / after pair shown above the main images; the label sits on the image. */
  compare?: Array<EnergyImage & { label: string }>;
  /** The same questions asked of both screens, shown under the pair. */
  compareRows?: Array<{ question: string; before: string; after: string }>;
  /** Small label above the main images when a compare pair comes first. */
  imagesLabel?: string;
  images: EnergyImage[];
  /** One caption under the whole image group; images keep their own captions too. */
  caption?: string;
  /** "row" lays images side by side (versions); "grid" is 2 columns (steps); "small" is a simple diagram. */
  layout?: "single" | "small" | "row" | "grid";
}

export const sdgEnergyContent = {
  meta: {
    id: "sdg-energy",
    titleZh: "Energy Transition",
    year: "2021",
  },

  hero: {
    kicker: "Case Study",
    title: "An energy activity kids and parents can finish on their own",
    tags: ["Redesign", "Usability testing", "Touch screen", "3 weeks"],
    description:
      "Energy Transition is a touch screen activity where visitors balance a city's power supply. I took over a version that many visitors left halfway through, and redesigned the flow and screens in three weeks so families could reach the end without help.",
    role: "UI/UX Designer",
    exhibition: "Taiwan SDGs Action Days 2021",
    workedWith: "Engineers, PM",
    whatIDid: "UX flow, UI design, data visualization, usability testing",
    coverImage: cover,
    image: heroMockup,
    imageAlt: "The final dashboard on an outdoor touch screen stand",
    caption: "The final screen, shown on an outdoor touch screen stand.",
  },

  impact: {
    kicker: "Impact",
    photo: usabilityTestPhoto,
    photoAlt: "A parent and children using the energy activity at the exhibition",
    photoCaption: "Families at Taiwan SDGs Action Days 2021, National Dr. Sun Yat-sen Memorial Hall, Taipei.",
    stats: [
      {
        title: "Over 90% finished",
        description:
          "Based on on-site observation and checks with the exhibition staff. Far fewer visitors left halfway than with the old version, and fewer asked how to use it.",
      },
      {
        title: "Shipped in 3 weeks",
        description:
          "Three design versions and four rounds of usability tests with colleagues from other teams, within what the engineers could build in time.",
      },
      {
        title: "Reused by the team",
        description: "The team used this version as the model for later interactive exhibits.",
      },
    ],
  },

  problem: {
    kicker: "The gap",
    heading: "Visitors tapped around, then walked away",
    description:
      "This touch screen was left by a previous project team. At another exhibition, visitors weren't sure how to use it, and many left before they finished. I took over the redesign.",
    usersLabel: "Who uses it",
    users: "Kids and parents, mostly non-technical, staying 10 seconds to 1 minute.",
    image: oldDesign,
    imageCaption: "The previous team's version, controlled by rotating dials.",
  },

  discovery: {
    kicker: "What I found",
    heading: "People didn't know what they were trying to do",
    items: [
      {
        label: "Watched on site",
        text: "For about 30 minutes. Most people tapped at random to see what would happen, with no clear goal.",
      },
      {
        label: "Asked the previous team",
        text: "The PM and engineer confirmed that visitors explored, then often left before finishing.",
      },
      {
        label: "My hypothesis",
        text: "Cleaner visuals alone wouldn't fix it. People needed a clear goal they could see, so they'd know what to do and when they were done.",
      },
    ],
  },

  decisions: {
    kicker: "Key decisions",
    heading: "Four decisions that made it easy to finish",
    items: [
      {
        heading: "Turn the numbers into a dashboard",
        body: "To make the goal visible, I moved to a car dashboard layout: power output and coal share became two large dials, and each power plant got its own slider. Each screen answers the same three questions differently.",
        compare: [
          { label: "Before", src: oldDesign, caption: "The version left by the previous team." },
          { label: "After", src: finalScreen, caption: "The redesigned dashboard." },
        ],
        compareRows: [
          { question: "Is there a target?", before: "No. Visitors had nothing to aim for.", after: "Yes. A needle on the dial marks today's demand." },
          { question: "How am I doing?", before: "Six small dials and tiny numbers.", after: "Two large dials: power output against demand, and coal share." },
          { question: "Am I done?", before: "Nothing tells you.", after: "A status panel at the top right turns to balanced." },
        ],
        imagesLabel: "How it got there",
        images: [
          {
            src: version1Screen,
            ratio: 682 / 382,
            caption: "Version 1: a dial for each power plant, turned by flipping the pointer. It would have taken the engineers too long to rebuild the old program.",
          },
          {
            src: version2Screen,
            ratio: 688 / 369,
            caption: "Version 2: sliders the engineers could build in time, but the whole screen looked flat, so I reworked the main display panel.",
          },
          {
            src: version3Screen,
            ratio: 697 / 380,
            caption: "Version 3: a car dashboard showed the data most clearly. After discussing it with the team, we built the final screen on it.",
          },
        ],
        layout: "row",
      },
      {
        heading: "Give every round a goal and an end",
        body: "I added a time limit and clear success and fail screens, so visitors know what to aim for and whether they made it.",
        images: [{ src: newFlow, caption: "The new flow: start, how-to animation, the activity, then a result." }],
        layout: "single",
      },
      {
        heading: "Show how before they start",
        body: "A short animation walks through each step before the activity begins. In testing, more people understood how to use it.",
        images: [
          { src: onboardingStep1, caption: "1. Drag a slider to change a power plant's output." },
          { src: onboardingStep2, caption: "2. A warning shows when output is too high or too low." },
          { src: onboardingStep3, caption: "3. A warning shows when the carbon share goes over 30%." },
          { src: onboardingStep4, caption: "4. Then the activity begins." },
        ],
        layout: "grid",
      },
      {
        heading: "Swap the dial for a swipe",
        body: "Rotating the dials was too hard to use, and testing confirmed it. I switched to swiping left and right, a gesture the engineers confirmed they could build within the three weeks.",
        images: [{ src: gestureChange }],
        layout: "small",
      },
    ] as EnergyDecision[],
  },

  outcome: {
    kicker: "The final screen",
    heading: "How the data maps to the screen",
    description:
      "Visitors stay for under a minute and many can't read MW, so every number had to work as a picture first.",
    image: finalScreen,
    imageAlt: "The final dashboard screen, with seven numbered parts",
    // x / y are percentages of the image, placed on the matching part of the screen.
    points: [
      {
        x: 43.0, y: 29.2,
        title: "Today's demand",
        text: "Shown as a number and as a needle on the output dial. The needle is the mark to line up with, so visitors can see the target without reading it.",
        image: demandNeedle,
        imageAlt: "Close-ups of today's demand and the target needle on the output dial",
      },
      {
        x: 43.0, y: 36.7,
        title: "Current output",
        text: "The largest number on the screen. Meeting demand is the goal, so the eye lands here first.",
      },
      {
        x: 80.3, y: 76.8,
        title: "Faces",
        text: "A smile for renewables, neutral for gas, sad for coal. Kids who can't read the numbers still see if a choice is good.",
        image: facesLegend,
        imageAlt: "Three faces: a smile for renewable energy, neutral for gas, sad for coal",
        imageBox: true,
      },
      {
        x: 16.7, y: 44.7,
        title: "Coal share",
        text: "Coal share gets its own dial, with a red Too high tag before it's too late.",
        image: coalWarning,
        imageAlt: "The red Too high warning tag",
      },
      {
        x: 68.1, y: 10.5,
        title: "Balance status",
        text: "One fixed panel at the top right says unbalanced or balanced. It answers \"am I done?\", the question visitors couldn't answer before.",
        image: balancedBadge,
        imageAlt: "The status panel when the grid is balanced",
      },
      {
        x: 4.6, y: 67.7,
        title: "Color and icon by power plant",
        text: "Each type has its own color and icon: coal red with a flame, gas orange, hydro blue with a water drop, solar yellow with a sun, wind green with a turbine. Plants can be told apart without reading.",
      },
      {
        x: 67.3, y: 32.9,
        title: "Wind and solar follow the weather",
        text: "Nature can't be controlled, so they have no slider. The system sets their output from the current weather and they move on their own. Their panels are smaller and only display.",
      },
    ],
  },

  reflection: {
    kicker: "Reflection",
    heading: "Watch the hands, not just the answers",
    paragraph:
      "On a touch screen, where people's hands and eyes went told me more than what they said afterwards. It also mattered that the engineers and PM were willing to test and revise with me on a tight schedule, so we shipped something that worked within real limits.",
  },
};

export type SdgEnergyContent = typeof sdgEnergyContent;
