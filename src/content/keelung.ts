// ── Keelung Hot Pot Kiosk — Case Study Content ──────────────────────────────
// All copy and image references for the Keelung case study live here.
// Edit text or swap image files below without touching
// src/app/KeelungCaseStudy.tsx.

import cover from "./images/keelung/cover-stage.jpg";
import booth from "./images/keelung/booth.jpg";
import step02 from "./images/keelung/step-02-start.jpg";
import step03 from "./images/keelung/step-03-ingredient.jpg";
import step04 from "./images/keelung/step-04-cooking.jpg";
import step05 from "./images/keelung/step-05-result.jpg";
import step06 from "./images/keelung/step-06-qr.jpg";
import phoneCoupon from "./images/keelung/phone-coupon.jpg";
import phoneSave from "./images/keelung/phone-save.jpg";
import phoneStores from "./images/keelung/phone-stores.jpg";
import phoneDetail from "./images/keelung/phone-detail.jpg";
import phoneMore from "./images/keelung/phone-more.jpg";
import userFlow from "./images/keelung/user-flow.jpg";
import hardware1 from "./images/keelung/hardware-test-1.jpg";
import hardware2 from "./images/keelung/hardware-test-2.jpg";

export interface KeelungStep {
  /** A real screen or photo; omit when the step is drawn as an illustration. */
  image?: string;
  /** Steps with no photo are drawn in KeelungCaseStudy.tsx. */
  illustration?: "cards" | "maps-and-page" | "restaurant";
  alt: string;
  text: string;
  /** Phone screenshots are tall; they get a narrower frame. */
  phone?: boolean;
  /** Shown next to the step number, e.g. "× 3 cards". */
  note?: string;
}

export const keelungContent = {
  meta: {
    id: "keelung",
    titleZh: "基隆在地互動體驗",
    year: "2022",
  },

  hero: {
    kicker: "Case Study",
    title: "From interactive kiosk to local restaurant table",
    tags: ["0 to 1 experience", "User flow", "Physical + digital", "Hardware collaboration"],
    description:
      "For the 2022 Keelung City Expo, I designed a journey that starts at an interactive kiosk and ends at a local restaurant. Visitors build a fisherman's hot pot with wooden seafood cards, see it cook inside a food cart through a Pepper's ghost reflection, then take a coupon for a real restaurant home on their phone.",
    role: "Lead UI/UX Designer",
    client: "Keelung City Government",
    workedWith: "Software & hardware engineers, PM, client",
    deliverables: "User flow, kiosk screens, phone pages",
    coverImage: cover,
    coverAlt: "Cooking screen on the kiosk display, with the saved hot pot page on a phone",
    caption: "2022 Keelung City Expo",
  },

  impact: {
    kicker: "Impact",
    stats: [
      {
        title: "1.01 million visits",
        description: "The expo drew 1.01 million visits in 10 days (figure reported by Keelung City Government for the whole expo).",
      },
      {
        title: "One journey, three places",
        description: "From the kiosk to the visitor's phone to a partner restaurant, each step tells people what to do next.",
      },
      {
        title: "Built with the hardware",
        description: "Screens were tested many times inside the cart with the engineers, so the reflection and steam effect looked right.",
      },
    ],
  },

  problem: {
    kicker: "The gap",
    heading: "A booth alone doesn't get anyone to a restaurant",
    description:
      "The expo promoted Keelung's local food, including its fisherman's hot pot. The city wanted visitors to learn about local seafood, and then actually go and eat it. So the experience had to start at the booth and end at a real restaurant, with no one there to explain each step.",
    image: booth,
    imageCaption: "The hot pot cart at the expo.",
  },

  decisions: {
    kicker: "Key decisions",
    heading: "Three choices to get people from the booth to a table",
    items: [
      {
        title: "Lead with food",
        text: "Text and pictures about local culture rarely get people into the neighborhood. Food is the easiest way in, so we built the experience around Keelung's fisherman's hot pot and the local restaurants that serve it.",
        see: "Journey steps 01 to 03",
      },
      {
        title: "Reward people with a fortune",
        text: "Every finished hot pot gets a name and a fortune. A small bit of luck makes people want to take part, and gives them something to keep.",
        see: "Journey step 05",
      },
      {
        title: "Give them a reason to go",
        text: "A coupon for partner restaurants turns a fun moment at the booth into a real visit, and the restaurant list shows where to use it.",
        see: "Journey steps 07 and 09",
      },
    ],
  },

  journey: {
    kicker: "The journey",
    heading: "From a card in your hand to a table in town",
    steps: [
      { illustration: "cards", alt: "Illustration: a wooden seafood card placed on the reader", text: "Pick a wooden seafood card and place it on the reader." },
      { image: step02, alt: "Start screen", text: "The screen says what to do." },
      { image: step03, alt: "Ingredient reveal", text: "Each card reveals its ingredient with a short fact, one after another.", note: "× 3 cards" },
      { image: step04, alt: "Order placed, cooking", text: "After the third card, the hot pot starts cooking." },
      { image: step05, alt: "Hot pot result", text: "Their hot pot gets a name and a fortune." },
      { image: step06, alt: "QR code screen", text: "A QR code appears on the screen." },
      { image: phoneCoupon, alt: "Phone coupon", text: "They scan it and get NT$30 off at partner restaurants.", phone: true },
      { image: phoneSave, alt: "Hot pot image on the phone", text: "They can save their hot pot as an image.", phone: true },
      { image: phoneStores, alt: "List of partner restaurants", text: "They browse the list of restaurants taking part.", phone: true },
      { illustration: "maps-and-page", alt: "Illustration: a map location and a restaurant's fan page on a phone", text: "Tapping a restaurant opens its Google Maps location and Facebook fan page." },
      { illustration: "restaurant", alt: "Illustration: a local hot pot restaurant", text: "They eat at a local hot pot restaurant with the coupon." },
    ] as KeelungStep[],
    illustrationNote: "Steps 1, 10 and 11 are illustrations made for this page.",
    userFlow,
    userFlowCaption: "The original user flow, including the loop until three cards are placed.",
  },

  hardware: {
    kicker: "Designing with hardware",
    heading: "Screens that look real inside a food cart",
    description:
      "The screens appear inside the cart through a Pepper's ghost reflection, so the steam from the hot pot looks real. I tested the effect with the engineers many times to see how each screen looked through the hardware.",
    images: [hardware1, hardware2],
    caption: "Left: testing with the engineers. Right: the reflection in the cart, with the wooden ingredient cards on the counter.",
  },

  outcome: {
    kicker: "On the phone",
    heading: "Taking the experience home",
    phones: [phoneCoupon, phoneSave, phoneStores, phoneDetail, phoneMore],
    caption: "Coupon, saved hot pot, partner restaurants, restaurant details and more local food.",
  },

  reflection: {
    kicker: "Reflection",
    heading: "Next time, I'd measure how many visitors reach a restaurant",
    paragraph:
      "Planning the UX from 0 to 1 with the PM, across online and offline, showed me that a digital experience can do more than entertain. It can bring people to local businesses. The expo ended before we could study the results. Next time, I'd track how many visitors actually used the coupon at a restaurant. That conversion rate would show which steps worked, and where the next experience could do better.",
  },
};

export type KeelungContent = typeof keelungContent;
