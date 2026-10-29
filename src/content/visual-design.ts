// ── Visual Design (client work) — Content ───────────────────────────────────
// Copy and images for the Visual design page. Each project shows a carousel
// with a thumbnail strip; edit or reorder images below.

import meetcardProductUi from "./images/visual-design/meetcard-product-ui.jpg";
import meetcardConcept from "./images/visual-design/meetcard-concept.jpg";
import meetcardConstruction from "./images/visual-design/meetcard-construction.jpg";
import meetcardWordmark from "./images/visual-design/meetcard-wordmark.jpg";
import meetcardFacebookPage from "./images/visual-design/meetcard-facebook-page.jpg";
import canonIdentity from "./images/visual-design/canon-identity.jpg";
import canonAutoFiling from "./images/visual-design/canon-auto-filing.jpg";
import canonFips from "./images/visual-design/canon-fips.jpg";
import canonE2Analysis from "./images/visual-design/canon-e2-analysis.jpg";
import canonLinkedinPost from "./images/visual-design/canon-linkedin-post.jpg";
import esliteSolarTerms from "./images/visual-design/eslite-solar-terms.jpg";
import esliteFennelUses from "./images/visual-design/eslite-fennel-uses.jpg";
import esliteFennelTaiwan from "./images/visual-design/eslite-fennel-taiwan.jpg";
import esliteDiagramOverview from "./images/visual-design/eslite-diagram-overview.jpg";
import esliteChapterTitle from "./images/visual-design/eslite-chapter-title.jpg";
import liveKeyVisual from "./images/visual-design/live-key-visual.jpg";
import liveWebsite from "./images/visual-design/live-website.jpg";
import liveInstagramGrid from "./images/visual-design/live-instagram-grid.jpg";
import liveLineupPoster from "./images/visual-design/live-lineup-poster.jpg";
import feifeiHomeDevices from "./images/visual-design/feifei-home-devices.jpg";
import feifeiHomeThumb from "./images/visual-design/feifei-home-thumb.jpg";
import feifeiIceActivity from "./images/visual-design/feifei-ice-activity.jpg";
import feifeiPuzzle from "./images/visual-design/feifei-puzzle.jpg";
import feifeiBlackHole from "./images/visual-design/feifei-black-hole.jpg";
import feifeiEnding from "./images/visual-design/feifei-ending.jpg";
import edenExpoKeyVisual from "./images/visual-design/eden-expo-key-visual.jpg";
import edenExpoStoryStation from "./images/visual-design/eden-expo-story-station.jpg";
import edenExpoWordWall from "./images/visual-design/eden-expo-word-wall.jpg";
import edenExpoIceScreens from "./images/visual-design/eden-expo-ice-screens.jpg";
import edenExpoArcade from "./images/visual-design/eden-expo-arcade.jpg";

export interface VisualImage {
  src: string;
  alt: string;
}

export interface VisualProject {
  meta: string;
  title: string;
  text: string;
  images: VisualImage[];
}

export interface VisualGroup {
  kicker: string;
  heading: string;
  projects: VisualProject[];
}

export const visualDesignContent = {
  meta: { id: "visual-design" },
  kicker: "Visual design",
  title: "The visual craft behind my UX work.",
  // Thumbnails for the homepage teaser that links to this page. They show as
  // equal squares so the square Canon post is not cropped.
  homePreview: [
    { src: meetcardProductUi, alt: "Meetcard product UI" },
    { src: canonAutoFiling, alt: "Canon imageFORCE explainer" },
    { src: feifeiHomeThumb, alt: "Little Space Hero Feifei storybook home page" },
  ] as VisualImage[],
  groups: [
    {
      kicker: "Product identity",
      heading: "Setting the visual direction for a product",
      projects: [
        {
          meta: "Meetcard · Logo, visual direction & UI",
          title: "Meetcard, a platform that matches businesses",
          text: "I turned the letter M into a bridge that also reads as a stack of business cards, then set the colours and type that carry into the product UI. The client picked this proposal and brought me on for the UI.",
          images: [
            { src: meetcardProductUi, alt: "Meetcard applied to the product UI" },
            { src: meetcardConcept, alt: "Concept: bridge plus business card" },
            { src: meetcardConstruction, alt: "Logo construction grid" },
            { src: meetcardWordmark, alt: "Logo lockup and typeface" },
            { src: meetcardFacebookPage, alt: "Meetcard Facebook page" },
          ],
        },
      ],
    },
    {
      kicker: "Information design",
      heading: "Making technical ideas easy to see",
      projects: [
        {
          meta: "Canon, ongoing direct client · Art direction & layout",
          title: "Canon imageFORCE and uniFLOW series",
          text: "Print security, security standards and AI maintenance, explained to business buyers one idea at a time.",
          images: [
            { src: canonAutoFiling, alt: "Canon imageFORCE explainer: automated filing" },
            { src: canonIdentity, alt: "Canon uniFLOW explainer: identity integration" },
            { src: canonFips, alt: "Canon imageFORCE explainer: FIPS standard" },
            { src: canonE2Analysis, alt: "Canon E² Analysis post, key visual" },
            { src: canonLinkedinPost, alt: "A Canon post on LinkedIn" },
          ],
        },
        {
          meta: "Eslite × PressPlay online course · Illustration & diagrams",
          title: "Seasons and food, a Chinese medicine course in diagrams",
          text: "With two other designers, I kept every design for the course, 60+ diagrams in all, in one system that matched its key visual. I drew diagrams like the Big Dipper, the 24 solar terms and everyday herbs so learners could follow. It is close to keeping a product's design language and components consistent.",
          images: [
            { src: esliteChapterTitle, alt: "Chapter title card for the course" },
            { src: esliteFennelTaiwan, alt: "Course video with a map of where fennel grows in Taiwan" },
            { src: esliteDiagramOverview, alt: "Nine of the course diagrams in one visual system" },
            { src: esliteSolarTerms, alt: "Diagram: the 24 solar terms" },
            { src: esliteFennelUses, alt: "Diagram: uses of fennel" },
          ],
        },
      ],
    },
    {
      kicker: "Online to physical",
      heading: "Turning an online experience into one people can walk into",
      projects: [
        {
          meta: "Eden Social Welfare Foundation · Lead UI/UX & illustration",
          title: "Little Space Hero Feifei, an online storybook",
          text: "I led the website's UI/UX and drew Feifei and the space world, so parents and kids could read and play together on any screen. After launch it drew 10x the social engagement, over 1,000 likes and 65,000+ views, and Eden turned the yearly campaign into a long-term public site.",
          images: [
            { src: feifeiHomeDevices, alt: "Storybook home page on desktop and phone" },
            { src: feifeiIceActivity, alt: "Ice planet activity with the timer bar" },
            { src: feifeiPuzzle, alt: "Memory puzzle activity" },
            { src: feifeiBlackHole, alt: "Black hole number activity" },
            { src: feifeiEnding, alt: "Ending page with share and donate buttons" },
          ],
        },
        {
          meta: "Eden Social Welfare Foundation · Exhibition & interaction design",
          title: "Love Kids Festival, the storybook as an exhibition",
          text: "The next year I turned the online story into a mall exhibition. I redesigned the online activities for touch screens and an arcade cabinet, then designed the key visual wall, story stations and a word puzzle wall, so families could step into the same story in person.",
          images: [
            { src: edenExpoIceScreens, alt: "Ice planet activity on the exhibition screens" },
            { src: edenExpoKeyVisual, alt: "Exhibition key visual wall" },
            { src: edenExpoStoryStation, alt: "Story station and word puzzle wall with visitors" },
            { src: edenExpoWordWall, alt: "Close-up of the word puzzle wall" },
            { src: edenExpoArcade, alt: "Arcade cabinet for the black hole activity" },
          ],
        },
      ],
    },
    {
      kicker: "Key visual",
      heading: "One illustration, carried across a whole campaign",
      projects: [
        {
          meta: "akaSwap · Key visual & campaign",
          title: "Live is Alive, an online NFT music exhibition",
          text: "My illustration of music and everyday objects became the key visual, then the website, social grid, teasers and the lineup of 15 musicians.",
          images: [
            { src: liveKeyVisual, alt: "Live is Alive key visual" },
            { src: liveWebsite, alt: "Live is Alive exhibition page on the akaSwap website" },
            { src: liveInstagramGrid, alt: "Teaser grid on akaSwap's Instagram" },
            { src: liveLineupPoster, alt: "Lineup poster of the 15 musicians" },
          ],
        },
      ],
    },
  ] as VisualGroup[],
};

export type VisualDesignContent = typeof visualDesignContent;
