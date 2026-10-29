// ── Sync AI：設計溝通轉譯工具 — Case Study Content ──────────────────────────
// All copy and image references for the Sync AI case study live here.
// Edit text or swap image files below — no need to touch the layout component
// (src/app/SyncAiCaseStudy.tsx) to change content.
//
// Status note: unlike the other case studies, this project has not shipped.
// It's a self-initiated product taken from research to a working two-sided
// prototype built with AI, ending on "What's next" (see `whatsNext`) rather
// than a resolved outcome. Keep that framing when editing; don't describe it
// as a fixed-length sprint.
//
// Page order is decision-led: product first, then the problem, then each key
// decision with its final screen, the process image that backs it, and why.

import cover from "./images/sync-ai/hero-cover.png";
import problemSurveyFrustration from "./images/sync-ai/problem-survey-frustration.png";
import surveyQ8OutputValue from "./images/sync-ai/survey-q8-output-value.png";
import surveyQ9AdoptionBarriers from "./images/sync-ai/survey-q9-adoption-barriers.png";
import prototypeDesignerModeSelect from "./images/sync-ai/prototype-designer-mode-select.png";
import prototypeDesignerReview from "./images/sync-ai/prototype-designer-review.png";
import prototypeClientFlow from "./images/sync-ai/prototype-client-flow.png";
import demoDesignerFlow from "./images/sync-ai/demo-designer-flow.mp4";
import demoClientFlow from "./images/sync-ai/demo-client-flow.mp4";
import demoDesignerStart from "./images/sync-ai/demo-designer-start.png";
import demoClientStart from "./images/sync-ai/demo-client-start.png";
import finalClientLink from "./images/sync-ai/final-client-link.png";
import finalClientDetail from "./images/sync-ai/final-client-detail.png";
import beforeClientDetail from "./images/sync-ai/before-client-detail.png";
import flowDesignerOpen from "./images/sync-ai/flow-designer-open.png";
import flowDesignerReview from "./images/sync-ai/flow-designer-review.png";
import flowDesignerResult from "./images/sync-ai/flow-designer-result.png";
import flowClientInvite from "./images/sync-ai/flow-client-invite.png";
import flowClientReview from "./images/sync-ai/flow-client-review.png";
import flowClientSuggest from "./images/sync-ai/flow-client-suggest.png";

// One step in the "How it works" strip (after the Keelung case study's journey row):
// a real prototype screen, or a drawn scene of what the person is doing.
export type FlowStep = {
  // who is doing this step; shown as a small avatar badge so the hand-offs are visible
  actor: "designer" | "client";
  image?: string;
  phone?: boolean;
  illustration?: "share" | "tap" | "question" | "screenshot" | "vague" | "backforth" | "redo";
  alt: string;
  text: string;
};

export type IconKey = "alert" | "lightbulb" | "chat" | "people" | "check" | "target" | "compass";

// The one visual under a decision: a real prototype screen, or a before → after pair.
// "phone" screens are shown height-limited inside the frame; "desktop" ones fill it.
export type DecisionVisual =
  | { kind: "screen"; image: string; alt: string; device: "desktop" | "phone"; caption: string }
  | {
      kind: "beforeAfter";
      // note: a short count under each screen so the difference reads at a glance
      before: { image: string; alt: string; label: string; note?: string };
      after: { image: string; alt: string; label: string; note?: string };
      caption: string;
    };

// Decisions follow one format (pain point | decision, then one visual), so every
// decision reads the same way. `evidence` is optional and only used when a research
// image directly backs the pain point; leave it out rather than forcing one in.
export type UserFlowNodeId =
  | "start" | "mode" | "handoff" | "drafts" | "sure" | "context" | "reason" | "confirm" | "viewOnly" | "send"
  | "open" | "review" | "looks" | "confirms" | "suggest"
  | "refresh" | "done" | "update";

export interface Decision {
  title: string;
  painPoint: string;
  decision: string;
  evidence?: { image: string; caption: string };
  // The options weighed for this decision, shown side by side with equal weight
  // (after Yenting Chen's ixtLibrary case study) instead of a footnote.
  options?: {
    label: string;
    items: Array<{ name: string; pro: string; con: string; verdict: "Chosen" | "Not adopted" }>;
  };
  visual: DecisionVisual;
}

export interface SyncAiContent {
  meta: {
    id: string;
    titleZh: string;
    year: string;
  };
  hero: {
    kicker: string;
    title: string;
    tags: string[];
    description: string;
    role: string;
    type: string;
    workedWith: string;
    deliverables: string;
    // used by the homepage project card only; the case page opens on the prototype
    coverImage: string;
    coverAlt: string;
  };
  prototypeShowcase: {
    designerVideo: string;
    // first frame, shown until the reader presses play
    designerPoster: string;
    designerVideoCaption: string;
    clientVideo: string;
    clientPoster: string;
    clientVideoCaption: string;
    // step labels and the arrow between the two demos, so the hero reads as one story:
    // the designer shares a link, the client opens it on their phone
    designerStep: string;
    clientStep: string;
    handoffLabel: string;
    ctaLabel: string;
    ctaDesignerLabel: string;
    ctaClientLabel: string;
  };
  howItWorks: {
    kicker: string;
    heading: string;
    phases: Array<{ label: string; steps: FlowStep[] }>;
    actorLabels: { designer: string; client: string };
    illustrationNote: string;
    prototypeLabel: string;
    // the full branching flow, drawn as a diagram under the 9 steps; node text is split
    // into lines here, positions live in SyncAiUserFlow.tsx
    userFlow: {
      label: string;
      lanes: [string, string, string];
      nodes: Record<UserFlowNodeId, string[]>;
      edges: { visual: string; devHandoff: string; yes: string; no: string; later: string; sentBack: string; nextVersion: string; allConfirmed: string; hasSuggestion: string };
      caption: string;
    };
  };
  problem: {
    kicker: string;
    heading: string;
    intro: string;
    stats: Array<{ icon: IconKey; title: string; description: string }>;
    // open answers from the survey (Q7: "your most painful collaboration"), translated
    quotes: { label: string; items: string[] };
    persona: {
      label: string;
      cards: Array<{
        // portrait drawn in the same style as the "How it works" illustrations
        avatar: "newcomer" | "side" | "fulltime";
        name: string;
        tag: string;
        traits: string[];
        quote: string;
        aiRole: { name: string; description: string };
      }>;
    };
    // "Before" user flow: how feedback works today, in a chat app. Contrasts with the
    // "How it works" flow at the top; LINE itself stays, only the review moves out of it.
    before: {
      label: string;
      heading: string;
      steps: Array<{
        actors: Array<"designer" | "client">;
        illustration: FlowStep["illustration"];
        alt: string;
        text: string;
        note?: string;
      }>;
      keepLine: { bold: string; after: string };
    };
  };
  decisions: {
    kicker: string;
    heading: string;
    painPointLabel: string;
    decisionLabel: string;
    items: Decision[];
  };
  // kicker over "How I built it" and "What's next", so the page ends like the other cases
  reflection: { kicker: string };
  // A compact "how I used AI" box (after Krystal Cheng's case studies): who did what,
  // one concrete course correction, and the tools.
  howIBuilt: {
    kicker: string;
    items: Array<{ bold: string; after: string }>;
    toolsLabel: string;
    tools: string;
  };
  whatsNext: {
    kicker: string;
    intro: string;
    steps: Array<{ bold: string; after: string }>;
  };
}

export const syncAiContent: SyncAiContent = {
  meta: {
    id: "sync-ai",
    titleZh: "AI Product Design · Sync AI 設計溝通轉譯工具",
    year: "2026",
  },

  hero: {
    title: "A Figma plugin that helps clients understand design decisions",
    tags: ["Self-initiated", "User research", "0 to 1", "AI product", "Built with AI"],
    description:
      "Sync AI is a Figma plugin that turns design choices into business language clients can trust, with a clear online confirmation flow instead of endless back-and-forth in chat apps. I took it from 0 to 1 on my own: user research, wireframes, and a working two-sided prototype (the designer's plugin and the client's review page) built with AI.",
    role: "UX Designer",
    type: "Self-initiated product",
    workedWith: "Solo, building with AI (Claude Code)",
    deliverables: "Research, user flows, wireframes, working prototype",
    coverImage: cover,
    coverAlt: "Sync AI landing page next to the client leaving a suggestion on their phone",
  },

  prototypeShowcase: {
    designerVideo: demoDesignerFlow,
    designerPoster: demoDesignerStart,
    designerVideoCaption:
      "Designer side, a Figma plugin: choose a mode, review what AI wrote, add the why, share a review link.",
    clientVideo: demoClientFlow,
    clientPoster: demoClientStart,
    clientVideoCaption:
      "Client side, a web page: open the link, go through each point, suggest a change or confirm.",
    designerStep: "1 · Designer, in Figma",
    clientStep: "2 · Client, on their phone",
    handoffLabel: "Sends the review link",
    ctaLabel: "Try the prototype",
    ctaDesignerLabel: "Designer side",
    ctaClientLabel: "Client side",
  },

  howItWorks: {
    kicker: "How it works",
    heading: "From a Figma file to a client's suggestion",
    phases: [
      {
        label: "A · The designer, in Figma",
        steps: [
          { actor: "designer", image: flowDesignerOpen, alt: "Sync AI plugin open on a course page design in Figma", text: "Finishes a page in Figma and opens Sync AI." },
          { actor: "designer", image: flowDesignerReview, alt: "Plugin review card: what changed, drafted by AI, and the reason, written by the designer", text: "AI drafts what changed. The designer checks it and writes the reason in one line." },
          { actor: "designer", illustration: "share", alt: "Illustration: a review link sent from a laptop into a chat", text: "Sends one review link in the same LINE chat as always." },
        ],
      },
      {
        label: "B · The client opens the link",
        steps: [
          { actor: "client", illustration: "tap", alt: "Illustration: a client tapping the review link in a chat on their phone", text: "Taps the link in LINE. No app to install, no sign-up." },
          { actor: "client", image: flowClientInvite, alt: "Invitation screen showing who sent it and the design to review", text: "Opens straight to the review, no sign-in to another app. Sees who sent it and what to review." },
          { actor: "client", image: flowClientReview, alt: "Decision screen with the change and the designer's reason", text: "Goes through each change and the reason behind it." },
        ],
      },
      {
        label: "C · If something needs changing",
        steps: [
          { actor: "client", illustration: "question", alt: "Illustration: a client looking at their phone with a question", text: "Has a question about the Enroll button." },
          { actor: "client", image: flowClientSuggest, alt: "Suggestion screen with the client's comment typed in", text: "Writes a suggestion and sends it back to the designer." },
          { actor: "designer", image: flowDesignerResult, alt: "Plugin showing one item confirmed and the client's suggestion on the other", text: "Back in Figma, the designer refreshes and sees what to change." },
        ],
      },
    ],
    actorLabels: { designer: "Designer", client: "Client" },
    illustrationNote: "Steps 3, 4 and 7 are illustrations made for this page; the rest are screens from the working prototype.",
    prototypeLabel: "See it in motion",
    userFlow: {
      label: "The full flow, with every branch",
      lanes: ["Designer · in Figma", "Client · on their phone", "Designer · back in Figma"],
      nodes: {
        start: ["Finishes a page,", "opens Sync AI"],
        mode: ["Which", "mode?"],
        handoff: ["Dev handoff:", "spec check (later)"],
        drafts: ["AI drafts", "what changed"],
        sure: ["Is AI", "sure?"],
        context: ["Asks the designer", "for context"],
        reason: ["Designer checks it,", "writes the reason"],
        confirm: ["Ask client", "to confirm?"],
        viewOnly: ["Makes a", "view-only link"],
        send: ["Sends the link", "in LINE"],
        open: ["Opens it on the", "phone, no sign-up"],
        review: ["Goes through", "each change"],
        looks: ["Looks", "right?"],
        confirms: ["Confirms", "the design"],
        suggest: ["Writes a", "suggestion"],
        refresh: ["Refreshes", "the status"],
        done: ["Done:", "design confirmed"],
        update: ["Updates the", "design"],
      },
      edges: {
        visual: "Visual",
        devHandoff: "Dev handoff",
        yes: "Yes",
        no: "No",
        later: "Opens it when free",
        sentBack: "Saved for the designer",
        nextVersion: "Next version",
        allConfirmed: "All confirmed",
        hasSuggestion: "Has a suggestion",
      },
      caption: "Dashed lines are not live: the client opens the link when they have time, and the designer refreshes to see what came back.",
    },
  },

  problem: {
    kicker: "The problem",
    heading: "Most rework isn't caused by weak design",
    intro:
      "Communicating with clients is one of the biggest sources of stress for freelance designers. I surveyed 12 freelance designers to find out why. The work usually misses because the two sides never build a shared basis for judging it.",
    stats: [
      {
        icon: "alert",
        title: "66.7% have redone work after a misunderstanding",
        description: "The most draining situation in the survey: the client misread the brief and the work started over.",
      },
      {
        icon: "lightbulb",
        title: "8 of 12 want design decisions explained for clients",
        description:
          "Asked what a one-click design translation should produce, most picked a plain explanation of why a design looks the way it does.",
      },
      {
        icon: "chat",
        title: "No shared idea of \"done\"",
        description: "The gap isn't just words. The two sides never agreed on what a finished design looks like.",
      },
    ],
    quotes: {
      label: "In their words: the most painful collaboration",
      items: [
        "We agreed on a direction, but the client didn't follow the brief. After many rounds, the final work had drifted away from it.",
        "The PM couldn't pin down what the client wanted and kept overturning the last version. It ran so far over time that I stopped the project.",
        "The key visual was redone again and again. Major changes, every time.",
      ],
    },
    persona: {
      label: "Three kinds of freelancers, and where AI helps each",
      cards: [
        {
          avatar: "newcomer",
          name: "The newcomer",
          tag: "New to freelancing",
          traits: ["Just started freelancing or switched careers", "Easily led by the client"],
          quote: "I made a lot, and most of it got cut. Very little made it into the final work.",
          aiRole: { name: "Mentor", description: "Helps them judge the work and fills in professional standards." },
        },
        {
          avatar: "side",
          name: "The side freelancer",
          tag: "Mid-level, the largest group",
          traits: ["Freelances alongside a job", "Skilled, but communication doesn't go smoothly"],
          quote: "The brief wasn't clear, so the result was far from what they expected. Clearer references would help.",
          aiRole: { name: "Filter", description: "Speeds up communication and catches pointless revisions." },
        },
        {
          avatar: "fulltime",
          name: "The full-timer",
          tag: "Full-time freelancer",
          traits: [
            "Freelances full-time",
            "Has dropped projects over communication",
            "Now sets their own rules for taking on work",
          ],
          quote: "It's not that clients are hard to talk to. I judge whether the conversation is worth my time.",
          aiRole: { name: "Leverage", description: "Turns communication into a service they can charge for." },
        },
      ],
    },
    before: {
      label: "Before Sync AI",
      heading: "Feedback lives in a chat thread",
      steps: [
        {
          actors: ["designer"],
          illustration: "screenshot",
          alt: "Illustration: the designer pastes a screenshot of the design into a chat",
          text: "Sends a screenshot of the design on LINE.",
        },
        {
          actors: ["client"],
          illustration: "vague",
          alt: "Illustration: the client replies that something feels off",
          text: "Replies with a feeling, not a decision: \"it feels a bit off?\"",
        },
        {
          actors: ["designer", "client"],
          illustration: "backforth",
          alt: "Illustration: a long chat thread across several days",
          text: "They work out what it means over many messages and days. Earlier feedback gets buried.",
          note: "× many rounds",
        },
        {
          actors: ["designer"],
          illustration: "redo",
          alt: "Illustration: a tired designer and versions 1 to 3 crossed out",
          text: "Redoes the work without a shared idea of \"done\". 66.7% of the designers I surveyed have been here.",
        },
      ],
      keepLine: {
        bold: "LINE stays.",
        after:
          " Clients already live in it, so Sync AI doesn't replace it. The review link is still sent in the same chat; only the review itself moves to one page.",
      },
    },
  },

  decisions: {
    kicker: "Key decisions",
    heading: "Five decisions that shaped the product",
    painPointLabel: "Pain point",
    decisionLabel: "Decision",
    items: [
      {
        title: "A Figma plugin, not a new platform",
        painPoint:
          "41.7% of the designers I surveyed said the biggest barrier to a new tool is a broken workflow: exporting from their design software, then uploading somewhere else.",
        decision:
          "Sync AI is a Figma plugin. It opens next to the file the designer is already working on, so there is nothing to export and no new tool to learn.",
        evidence: {
          image: surveyQ9AdoptionBarriers,
          caption: "Survey: which barrier would put you off a new tool most? (12 responses)",
        },
        visual: {
          kind: "screen",
          image: prototypeDesignerReview,
          alt: "Sync AI plugin floating over a course page design in Figma",
          device: "desktop",
          caption: "The plugin opens right on top of the design, inside Figma.",
        },
      },
      {
        title: "Clients open a link, no sign-up",
        painPoint:
          "The next biggest barrier in the same question (25%) was having to get partners, like clients or engineers, to join a tool too. Clients are even less willing to create an account just to give feedback.",
        decision:
          "The designer shares one link on LINE or Slack. The client taps it and lands straight on the review, on desktop or phone.",
        visual: {
          kind: "screen",
          image: finalClientLink,
          alt: "Client invitation screen and design overview screen on a phone",
          device: "phone",
          caption: "Tap the link, see the invitation, start reviewing. There is no account step.",
        },
      },
      {
        title: "Translate design into the client's language, in two modes",
        painPoint:
          "Asked what a one-click design translation should produce, 66.7% chose an explanation for clients of why the design looks this way, and 58.3% chose key points for marketing or PM. Only 8.3% chose specs for engineers.",
        decision:
          "The plugin has two modes: Visual communication explains design choices in plain language for clients and PMs, and Dev handoff checks specs for engineers. The MVP builds the client side first, since that is what designers asked for most.",
        evidence: {
          image: surveyQ8OutputValue,
          caption: "Survey: if a tool could translate your design in one click, which output matters most? (12 responses)",
        },
        visual: {
          kind: "screen",
          image: prototypeDesignerModeSelect,
          alt: "Plugin asking the designer to choose Visual communication or Dev handoff mode",
          device: "desktop",
          caption: "Choosing a mode is the first step in the plugin.",
        },
      },
      {
        title: "Let the design speak, keep the words short",
        painPoint:
          "In my first version, AI wrote a full rationale and strategy for every change. It read like a sales pitch. Clients don't need to be persuaded; they look at the design to see if it meets their needs, and long text gets skipped.",
        decision:
          "Each change now shows the screen first, then one line on what changed and one line on why. AI only drafts what changed, from the file itself, so it can be checked against the screen right above it. The reason starts empty and the designer writes it; nothing can be shared until every line is confirmed, and if anything is too brief, the client can ask right there.",
        visual: {
          kind: "beforeAfter",
          before: {
            image: beforeClientDetail,
            alt: "First version: AI writes both the design rationale and the strategy",
            label: "Before",
            note: "5 blocks of text",
          },
          after: {
            image: finalClientDetail,
            alt: "Prototype screen with two parts: the change and the design rationale",
            label: "After",
            note: "2 short lines",
          },
          caption: "Before: paragraphs of AI-written persuasion. After: the screen, one line on what changed, one line on why.",
        },
      },
      {
        title: "LINE for sharing, one page for confirming",
        painPoint:
          "66.7% of designers said the most draining situation is redoing work after a misunderstanding. Feedback scattered across chat messages is easy to misread and hard to trace, but LINE is still where clients are.",
        decision:
          "The link still goes out on LINE, but the client confirms or comments on each decision on one review page. Every response is saved, so the designer sees what was confirmed and what needs work. Designers can switch this off for projects that don't need a formal sign-off.",
        options: {
          label: "Options considered",
          items: [
            {
              name: "A revision limit",
              pro: "Directly caps the rounds of changes, for example no more after three.",
              con: "It strains client trust, and freelancers worry it costs them the client.",
              verdict: "Not adopted",
            },
            {
              name: "A confirmation loop",
              pro: "Builds a shared understanding first, so fewer revisions are needed at all.",
              con: "Adds a step for the client, so it is optional and off by default.",
              verdict: "Chosen",
            },
          ],
        },
        evidence: {
          image: problemSurveyFrustration,
          caption: "Survey: which situation drains you most? (12 responses)",
        },
        visual: {
          kind: "screen",
          image: prototypeClientFlow,
          alt: "Four client screens: invitation, overview, decision detail, confirmed",
          device: "desktop",
          caption: "The client's loop: invitation, overview, each decision, confirmed and sent back to the designer.",
        },
      },
    ],
  },

  reflection: { kicker: "Reflection" },

  howIBuilt: {
    kicker: "How I built it with AI",
    items: [
      {
        bold: "I wrote the spec, AI wrote the code.",
        after:
          " I designed the wireframes, requirements and user flow; Claude Code built the prototype from them.",
      },
      {
        bold: "I caught where AI got it wrong.",
        after:
          " Its first version was one page that switched between the designer’s and the client’s views. In reality neither side sees the other’s screen, so I split it into two apps that share one set of data.",
      },
    ],
    toolsLabel: "Tools used",
    tools: "Claude Code, Figma, FigJam",
  },

  whatsNext: {
    kicker: "What's next",
    intro: "The prototype works end to end. Next, in order:",
    // one ordered list: settle the scope first, then make it product-ready
    steps: [
      {
        bold: "Test the scope: keep the client confirmation loop, or only generate AI explanations?",
        after:
          " As tools like Figma MCP with Claude Code spread, an explanation on its own is easy to replace; the confirmation loop is what tackles the rework found in the research. Compare both with 3 to 5 freelance designers and their clients, count revision rounds and back-and-forth messages, and let the data decide.",
      },
      {
        bold: "Check accuracy.",
        after: " Measure how often AI's \"what changed\" lines match the real design, and stress-test unusual files.",
      },
      {
        bold: "Speed and privacy.",
        after: " Time the scan on large Figma files, and handle unreleased designs in a way clients can trust.",
      },
      {
        bold: "Learn from usage.",
        after: " Track where clients stop or leave after opening the link, and feed that into the next changes.",
      },
    ],
  },
};
