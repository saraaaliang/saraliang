// ── Six Interactive Kiosks — Case Study Content ─────────────────────────────
// All copy and image references for the kiosks case study live here.
// Edit text or swap image files below without touching
// src/app/KiosksCaseStudy.tsx.

import hero from "./images/kiosks/hero-frog-kiosk.jpg";
import impactPhoto from "./images/kiosks/impact-kiosk-queue.jpg";
import pmFlow from "./images/kiosks/pm-flow-hatchery.jpg";
import inUseHowTo from "./images/kiosks/in-use-how-to-play.jpg";

import controlNineButtons from "./images/kiosks/control-nine-buttons.jpg";
import controlSoftBall from "./images/kiosks/control-soft-ball.jpg";
import controlThreeButtons from "./images/kiosks/control-three-buttons.jpg";
import controlRollingBall from "./images/kiosks/control-rolling-ball.jpg";
import controlCamera from "./images/kiosks/control-camera-qr.jpg";
import controlMicrophone from "./images/kiosks/control-microphone.jpg";

import hatchery1 from "./images/kiosks/hatchery-1-start.jpg";
import hatchery2 from "./images/kiosks/hatchery-2-intro.jpg";
import hatchery3 from "./images/kiosks/hatchery-3-play.jpg";
import hatcheryWin from "./images/kiosks/hatchery-4-result-success.jpg";
import hatcheryOld1 from "./images/kiosks/hatchery-old-1-start.jpg";

// Sustainable Ecosystem runs on two touch screens, one above the other.
import seaStartTop from "./images/kiosks/sea-1-start-top.jpg";
import seaStartBottom from "./images/kiosks/sea-1-start-bottom.jpg";
import seaIntroTop from "./images/kiosks/sea-2-intro-top.jpg";
import seaIntroBottom from "./images/kiosks/sea-2-intro-bottom.jpg";
import seaPlayTop from "./images/kiosks/sea-3-play-top.jpg";
import seaPlayBottom from "./images/kiosks/sea-3-play-bottom.jpg";
import seaClearedTop from "./images/kiosks/sea-4-cleared-top.jpg";
import seaClearedBottom from "./images/kiosks/sea-4-cleared-bottom.jpg";

import detective1 from "./images/kiosks/detective-1-start.jpg";
import detective2 from "./images/kiosks/detective-2-intro.jpg";
import detective3 from "./images/kiosks/detective-3-play.jpg";
import detectiveCorrect from "./images/kiosks/detective-3-play-correct.jpg";
import detectiveWin from "./images/kiosks/detective-4-result-success.jpg";
import detectiveLow from "./images/kiosks/detective-4-result-fail.jpg";
import rejectedCorrect from "./images/kiosks/detective-rejected-fill-correct.jpg";
import feedbackPrototype from "./images/kiosks/detective-feedback-prototype.mp4";

import crisis1 from "./images/kiosks/crisis-1-start.jpg";
import crisisStep1 from "./images/kiosks/crisis-2-step-1.jpg";
import crisis3 from "./images/kiosks/crisis-3-play.jpg";
import crisisWin from "./images/kiosks/crisis-4-result-success.jpg";

import recording1 from "./images/kiosks/recording-1-start.jpg";
import recording2 from "./images/kiosks/recording-2-intro.jpg";
import recording3 from "./images/kiosks/recording-3-recording.jpg";
import recordingDone from "./images/kiosks/recording-4-result.jpg";
import readAlongDemo from "./images/kiosks/recording-read-along-demo.jpg";

import booth1 from "./images/kiosks/booth-1-select.jpg";
import booth2 from "./images/kiosks/booth-2-start.jpg";
import booth3 from "./images/kiosks/booth-3-result.jpg";

/** Portrait kiosk screens are 9:16, landscape ones 16:9; "stacked" is two 16:9 screens, one above the other. */
export type ScreenShape = "portrait" | "landscape" | "stacked";

export interface KioskScreen {
  src: string;
  /** The lower screen, for stacked kiosks. */
  src2?: string;
  label: string;
}

export interface Kiosk {
  name: string;
  /** What families do, in one line. */
  task: string;
  control: string;
  photo: string;
  photoAlt: string;
  /** Where the tile crop sits, for photos whose subject isn't centred. */
  photoPosition?: string;
  shape: ScreenShape;
  flow: KioskScreen[];
  flowNote?: string;
}

export interface KioskImage {
  src: string;
  caption: string;
  shape?: ScreenShape;
  /** Keep the image's own proportions instead of a screen ratio (sketches). */
  natural?: boolean;
}

export interface KioskAnatomy {
  label: string;
  screens: KioskScreen[];
  /** screen is an index into screens; x / y are percentages of that screen. */
  markers: Array<{ screen: number; x: number; y: number; title: string; text: string }>;
}

export interface KioskDecision {
  heading: string;
  body: string;
  /** The four steps every kiosk repeats, drawn as a simple loop. */
  journey?: boolean;
  /** Put the text and a small visual side by side on wide screens. */
  aside?: boolean;
  /** One kiosk's screens with numbered markers on the parts every kiosk shares. */
  anatomy?: KioskAnatomy;
  /** Two labelled groups shown side by side, e.g. rejected and final. */
  compare?: Array<{ label: string; images: KioskImage[] }>;
  images?: KioskImage[];
  video?: { src: string; caption: string };
  photo?: KioskImage;
}

export const kiosksContent = {
  meta: {
    id: "kiosks",
    titleZh: "水獺媽媽樂園互動機台",
    year: "2026",
  },

  hero: {
    title: "A screen system for six family kiosks, each played a different way",
    tags: ["Kiosk UI", "Interaction design", "Physical controls", "Screen system"],
    description:
      "Otter Mama Park was a series of family fairs in New Taipei in 2026, run by a mayoral campaign to share city policy and keep Taiwanese in everyday use. I designed the screens for six kiosks, each with a different control, so families could play them on their own.",
    role: "UI Designer",
    event: "Otter Mama Park, New Taipei, 2026",
    workedWith: "PM, engineers, client team",
    whatIDid: "UI for 6 kiosks, part of the UX flow, interaction prototype",
    coverImage: hero,
    image: hero,
    imageAlt: "A visitor reaching for the three colored buttons on the Taiwanese Sayings kiosk",
    caption: "Taiwanese Sayings: hear a saying, then press the button for its meaning.",
  },

  impact: {
    kicker: "Impact",
    photo: impactPhoto,
    photoAlt: "A staff member guides a child at the rolling ball kiosk while families wait in line",
    photoCaption: "A staff member guides a child at Disaster Prep while families wait. Photo from the legislator's official social media.",
    stats: [
      {
        title: "6 kiosks, 6 controls",
        description: "Buttons, balls, a microphone and a camera, on one set of screen rules.",
      },
      {
        title: "7 events across New Taipei",
        description: "A different district each time, summer 2026.",
      },
      {
        title: "Over 1,000 families per event",
        description: "1,500 families at the first fair and over 1,000 at the second, per news reports.",
      },
    ],
  },

  problem: {
    kicker: "The challenge",
    heading: "Staff could help, but each kiosk had to explain itself",
    description:
      "Each fair drew over a thousand families, more than the staff could guide one by one. Every kiosk had to be clear at first glance, so lines kept moving and families could simply enjoy it. Players ranged from preschoolers to grandparents.",
    goalLabel: "The goal",
    goal: "Help families learn city policy and hear Taiwanese, through play.",
    image: pmFlow,
    imageCaption: "The PM's flow for each kiosk, where I started.",
  },

  kiosksIntro: {
    kicker: "The six kiosks",
    heading: "Same screen rules, very different controls",
  },

  decisions: {
    kicker: "Key decisions",
    heading: "Six decisions behind one screen system",
    items: [
      {
        heading: "Give all six kiosks the same four screens",
        body: "The engineers had many assets to build and needed a simple flow, and visitors needed to get it at first glance. So every kiosk follows the same four steps. After one kiosk, families already know the next.",
        journey: true,
        anatomy: {
          label: "What every kiosk shares, on Disaster Prep",
          screens: [
            { src: crisis1, label: "Start" },
            { src: crisisStep1, label: "How to play" },
            { src: crisis3, label: "Play" },
            { src: crisisWin, label: "Result" },
          ],
          markers: [
            { screen: 0, x: 16, y: 21, title: "Name and goal", text: "Same place on every start screen." },
            { screen: 0, x: 33, y: 78, title: "How to start", text: "Worded for this kiosk's control." },
            { screen: 1, x: 6, y: 29, title: "Steps with the motion", text: "Shows the move, then counts down 3, 2, 1." },
            { screen: 2, x: 31, y: 6, title: "Points and timer", text: "Always at the top, 30 seconds." },
            { screen: 2, x: 24, y: 66, title: "+10 and -10", text: "Right where the action happens." },
            { screen: 3, x: 6, y: 51, title: "Title and points", text: "Then back to start after 5 seconds." },
          ],
        },
        photo: {
          src: inUseHowTo,
          caption: "The how-to-play screen in use at Disaster Prep.",
        },
      },
      {
        heading: "Prototype the interaction, not just the screens",
        aside: true,
        body: "Still screens can't show timing or feedback. On my own initiative I built a Figma prototype, so the engineers and the team could see how it should work before building it. It made working together much smoother.",
        video: {
          src: feedbackPrototype,
          caption: "My Figma prototype for Taiwanese Sayings.",
        },
      },
      {
        heading: "Word every result positively",
        aside: true,
        body: "The point is the experience, not the score, so the team agreed every result is worded positively.",
        compare: [
          { label: "Low score", images: [{ src: detectiveLow, caption: "Taiwanese Rising Star, 0 points.", shape: "portrait" }] },
          { label: "High score", images: [{ src: detectiveWin, caption: "Sayings Master, 80 points.", shape: "portrait" }] },
        ],
      },
      {
        heading: "Keep feedback readable on a colorful screen",
        aside: true,
        body: "Filling the whole card green or red made the text and pictures hard to read. In the final version each card keeps its color, and the feedback moves to the border and a check or cross.",
        compare: [
          {
            label: "First version",
            images: [{ src: rejectedCorrect, caption: "The whole card turns green.", shape: "portrait" }],
          },
          {
            label: "Final",
            images: [{ src: detectiveCorrect, caption: "Only the border and a check.", shape: "portrait" }],
          },
        ],
      },
      {
        heading: "Agree on the style with AI references",
        aside: true,
        body: "I extended the client's characters into the screens, but my first style didn't match what the client had in mind. So I used AI to make references in different styles, confirmed one with the client, then designed. It sped up our work a lot.",
        compare: [
          {
            label: "First version",
            images: [{ src: hatcheryOld1, caption: "Clean and modern.", shape: "portrait" }],
          },
          {
            label: "Final",
            images: [{ src: hatchery1, caption: "Warm and playful.", shape: "portrait" }],
          },
        ],
      },
      {
        heading: "Show kids the pace before they record",
        aside: true,
        body: "At Treasure Box, families record the opening line of Otter Mama's show. I proposed lighting up each word in yellow as Otter Mama reads it, so kids catch the pace, then read along.",
        images: [
          { src: readAlongDemo, caption: "My sketch: words turn yellow once read.", natural: true },
          { src: recording2, caption: "Listen first, as the words light up.", shape: "portrait" },
        ],
      },
    ] as KioskDecision[],
  },

  journey: {
    label: "Every kiosk, the same four steps",
    steps: ["Start", "How to play", "Play", "Result"],
    loop: "Back to start after 5 seconds",
    note: "Only the control changes.",
  },

  kiosks: [
    {
      name: "Job Finder",
      task: "Hear a job in Taiwanese, press its tools.",
      control: "9 buttons",
      photo: controlNineButtons,
      photoAlt: "Hands on the nine pink buttons below the Job Finder screen",
      shape: "portrait",
      flow: [
        { src: hatchery1, label: "Start" },
        { src: hatchery2, label: "How to play" },
        { src: hatchery3, label: "Play" },
        { src: hatcheryWin, label: "Result" },
      ],
    },
    {
      name: "Sustainable Ecosystem",
      task: "Hit the trash, miss the sea animals.",
      control: "Soft balls thrown at the screen",
      photo: controlSoftBall,
      photoAlt: "A child throwing a soft ball at the sea screen",
      shape: "stacked",
      flow: [
        { src: seaStartTop, src2: seaStartBottom, label: "Start" },
        { src: seaIntroTop, src2: seaIntroBottom, label: "How to play" },
        { src: seaPlayTop, src2: seaPlayBottom, label: "Play" },
        { src: seaClearedTop, src2: seaClearedBottom, label: "Result" },
      ],
      flowNote: "Two touch screens, one above the other.",
    },
    {
      name: "Taiwanese Sayings",
      task: "Hear a saying in Taiwanese, pick its meaning.",
      control: "3 colored buttons",
      photo: controlThreeButtons,
      photoAlt: "A hand on the yellow button below the Taiwanese Sayings screen",
      shape: "portrait",
      flow: [
        { src: detective1, label: "Start" },
        { src: detective2, label: "How to play" },
        { src: detective3, label: "Play" },
        { src: detectiveWin, label: "Result" },
      ],
    },
    {
      name: "Disaster Prep",
      task: "Roll the ball to collect emergency supplies.",
      control: "A big rolling ball",
      photo: controlRollingBall,
      photoAlt: "Hands pushing a large silver ball in front of the Disaster Prep screen",
      shape: "landscape",
      flow: [
        { src: crisis1, label: "Start" },
        { src: crisisStep1, label: "How to play" },
        { src: crisis3, label: "Play" },
        { src: crisisWin, label: "Result" },
      ],
    },
    {
      name: "Treasure Box",
      task: "Record the opening line of Otter Mama's show.",
      control: "Microphone and touch screen",
      photo: controlMicrophone,
      photoAlt: "A child at the Treasure Box microphone, with a staff member beside him",
      shape: "portrait",
      flow: [
        { src: recording1, label: "Start" },
        { src: recording2, label: "How to play" },
        { src: recording3, label: "Record" },
        { src: recordingDone, label: "Result" },
      ],
    },
    {
      name: "Policy Photo Booth",
      task: "Pick a frame, take a photo, keep it.",
      control: "Touch screen, camera and printer",
      photo: controlCamera,
      photoAlt: "A visitor scanning the photo booth's QR code with a phone",
      shape: "landscape",
      flow: [
        { src: booth1, label: "Pick a frame" },
        { src: booth2, label: "Take a photo" },
        { src: booth3, label: "Result" },
      ],
      flowNote: "No start button: walking into the booth is the start, so it opens on the frames. Family photo: Unsplash stock.",
    },
  ] as Kiosk[],

  outcome: {
    kicker: "All six kiosks",
    heading: "Every kiosk, start to finish",
    description:
      "Each kiosk's final screens, in the same four steps.",
  },

  reflection: {
    kicker: "Reflection",
    heading: "Next time, on site and not only remote",
    paragraph:
      "This was a rush project, so I joined after planning had started and had only a short time to understand six kiosks. Using AI to make style references let me confirm the look the client wanted before I designed. Next time, even on a tight schedule, I'd find a way to join the client's testing and the on-site setup, and get into the meetings earlier. Seeing the problems firsthand works better than collaborating only remotely.",
  },
};

export type KiosksContent = typeof kiosksContent;
