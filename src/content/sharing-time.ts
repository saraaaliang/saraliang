// ── Sharing Time — Case Study Content ──────────────────────────────────────
// All copy and image references for the Sharing Time case study live here.
// Edit text or swap image files below without touching
// src/app/SharingTimeCaseStudy.tsx.

import cover from "./images/sharing-time/cover.png";
import researchProblemMap from "./images/sharing-time/research-problem-map.png";
import workshopDayMap1 from "./images/sharing-time/workshop-day-map-1.png";
import workshopDayMap2 from "./images/sharing-time/workshop-day-map-2.png";
import workshopJourneyGraphs from "./images/sharing-time/workshop-journey-graphs.png";
import discoveryPhase2Workshop from "./images/sharing-time/discovery-phase2-workshop-blurred.png";
import decisionPsychologicalSafety from "./images/sharing-time/decision-psychological-safety.png";
import decisionManagerCall from "./images/sharing-time/decision-manager-call.png";
import decisionUkDesignerCall from "./images/sharing-time/decision-uk-designer-call.png";
import decisionCardPrompts from "./images/sharing-time/decision-card-prompts.png";
import sessionStepShare from "./images/sharing-time/session-step-share.svg";
import sessionStepDraw from "./images/sharing-time/session-step-draw.svg";
import sessionStepAsk from "./images/sharing-time/session-step-ask.svg";
import sessionStepPoint from "./images/sharing-time/session-step-point.svg";
import sessionStepAward from "./images/sharing-time/session-step-award.svg";
import sessionStepBoard from "./images/sharing-time/session-step-board.svg";
import decisionRef1 from "./images/sharing-time/decision-ref-1.png";
import decisionRef2 from "./images/sharing-time/decision-ref-2.png";
import outcomeBlueprintLeft from "./images/sharing-time/outcome-blueprint-left.png";
import outcomeBlueprintRight from "./images/sharing-time/outcome-blueprint-right.png";
import outcome1 from "./images/sharing-time/outcome1.png";
import outcome2 from "./images/sharing-time/outcome2.png";
import mobile1 from "./images/sharing-time/mobile-1.mp4";
import mobile2 from "./images/sharing-time/mobile-2.mp4";
import mobile3 from "./images/sharing-time/mobile-3.mp4";
import mobile4 from "./images/sharing-time/mobile-4.mp4";
import reflectionPhoto from "./images/sharing-time/reflection-blurred.png";
import personaManager from "./images/sharing-time/persona-manager.png";
import personaSeniorDesigner from "./images/sharing-time/persona-senior-designer.png";
import personaJuniorDesigner from "./images/sharing-time/persona-junior-designer.png";
import personaNewDesigner from "./images/sharing-time/persona-new-designer.png";

export interface SharingImage {
  src: string;
  caption: string;
  /** Width / height; images in a row share one height using this. */
  ratio: number;
}

export interface SharingDecision {
  heading: string;
  body: string;
  /** What Sara heard or saw that led to the decision. */
  evidence?: string;
  /** Someone's own words, shown as a quote without a label. */
  quote?: string;
  /** The service's three stages, drawn as a strip; feedback is what shaped each stage. */
  stages?: Array<{ title: string; months: string }>;
  /** Feedback from testing and Sara's call on it, including what she didn't take as-is. */
  changes?: Array<{ feature: string; why: string; who: string; said: string }>;
  images?: SharingImage[];
}

export interface SharingTimeContent {
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
    project: string;
    timeline: string;
    whatIDid: string;
    coverImage: string;
    coverAlt: string;
  };
  platform: {
    kicker: string;
    heading: string;
    paragraph: string;
    testNote: string;
    decisions: Array<{ title: string; text: string }>;
    screens: Array<{ caption: string; src: string }>;
    cta: string;
    ctaHref: string;
  };
  impact: {
    kicker: string;
    stats: Array<{ title: string; description: string }>;
    feedbackLabel: string;
    quotes: Array<{ quote: string; author: string }>;
  };
  problem: {
    kicker: string;
    heading: string;
    paragraphs: string[];
    usersLabel: string;
    users: string;
  };
  research: {
    kicker: string;
    heading: string;
    phases: Array<{
      label: string;
      heading: string;
      description: string;
      findings: string[];
      /** Each inner array is one row of images sharing a height. */
      rows: SharingImage[][];
    }>;
    persona: {
      label: string;
      description: string;
      cards: Array<{
        photo: string;
        tag: string;
        tagStyle: "primary" | "secondary" | "dark";
        name: string;
        quote: string;
        about: string[];
        needs: string[];
        challenges: string[];
        opportunities: string[];
      }>;
    };
    hmw: { label: string; question: string };
  };
  decisions: {
    kicker: string;
    heading: string;
    items: SharingDecision[];
  };
  service: {
    kicker: string;
    heading: string;
    description: string;
    session: {
      label: string;
      facts: string[];
      steps: Array<{ title: string; time?: string; image: string }>;
    };
    blueprint: SharingImage[];
    blueprintCaption: string;
    board: SharingImage & { label: string };
  };
  reflection: {
    kicker: string;
    heading: string;
    takeaways: Array<{ lead: string; text: string }>;
    quote: { text: string; author: string };
    image: string;
    imageCaption: string;
  };
}

export const sharingTimeContent: SharingTimeContent = {
  meta: {
    id: "enterprise-service-design",
    titleZh: "Sharing Time",
    year: "2024",
  },

  hero: {
    title: "A card toolkit and web platform that let design teams ask and share safely",
    tags: ["Service design", "User research", "Workshops", "Card toolkit", "Web platform"],
    description:
      "Designers in creative studios often handle work stress on their own. Sharing Time gives teams a regular, low-pressure way to share skills, ask for help and communicate better, so people grow together instead of in isolation. I took it from research to a tested card toolkit, and in 2026 to a web platform.",
    role: "Service Designer, UI/UX Designer",
    project: "Solo, MA Service Design graduation project, UAL",
    timeline: "July 2022 to now, ongoing",
    whatIDid: "Interviews, workshops, service blueprint, card toolkit, web platform",
    coverImage: cover,
    coverAlt: "The Sharing Time card toolkit next to the web platform on desktop and mobile",
  },

  platform: {
    kicker: "The platform",
    heading: "From a box of cards to a platform any team can run",
    paragraph:
      "In 2026 I rebuilt the cards and the Miro board as one web platform, so a session can run remotely or in a hybrid team.",
    testNote:
      "I tested its functions in a four-person online sharing session, and everything worked as intended.",
    decisions: [
      { title: "Session tools on one screen", text: "Timer and card draw together, so the host never juggles a phone and a deck." },
      { title: "Anyone can host", text: "The host sets the weekly theme on the home page, so hosting can rotate." },
      { title: "A new prompt every draw", text: "Cards don't repeat until reshuffled, so each draw sparks a new angle." },
      { title: "Sticky notes instead of Miro", text: "Shares are kept by week and searchable by keyword." },
      { title: "The tone, up front", text: "The home page opens with one line: share positive or constructive feedback." },
    ],
    screens: [
      { caption: "Home", src: mobile1 },
      { caption: "The cards", src: mobile2 },
      { caption: "Team sharing space", src: mobile3 },
      { caption: "Timer and card draw", src: mobile4 },
    ],
    cta: "Try the platform",
    ctaHref: "https://saraaaliang.github.io/sharing-time/",
  },

  impact: {
    kicker: "Impact",
    stats: [
      {
        title: "89% positive feedback",
        description:
          "From an 8-person studio team across 4 workshop activities. Everyone rated it 4 or higher out of 5, and many asked for more chances like it.",
      },
      {
        title: "Adopted by the partner studio",
        description:
          "The design manager agreed to bring it into the team and to create more chances for colleagues to share.",
      },
    ],
    feedbackLabel: "What people said",
    quotes: [
      {
        quote: "\"I think the company should have more chances to talk like this!\"",
        author: "Workshop participant",
      },
      {
        quote: "\"I'm glad I found out today that I can talk to another motion designer about what I run into at work.\"",
        author: "Workshop participant",
      },
      {
        quote:
          "\"Fostering deeper internal communication can strengthen the sense of belonging. As belonging grows, efficiency is likely to improve, indirectly benefiting the company's overall output.\"",
        author: "Tiah, Product Designer, Burberry UK",
      },
    ],
  },

  problem: {
    kicker: "The problem",
    heading:
      "I assumed the stress came from workload, deadlines and endless revisions. It came from facing uncertainty alone.",
    paragraphs: [
      "In the studios I spoke to, know-how lived in one-to-one chats and personal habits. Nobody had a team-level way to learn from each other.",
      "In the workshops, stress peaked when a task landed suddenly or feedback came out of nowhere, and designers didn't feel they could ask anyone. Without a support channel, uncertainty turned into overtime, and into lower satisfaction.",
    ],
    usersLabel: "Who it hits hardest",
    users: "New and junior designers, who have the fewest people to turn to.",
  },

  research: {
    kicker: "What I found",
    heading: "Designers who could talk things through coped better",
    phases: [
      {
        label: "Phase 1",
        heading: "Interviews to find the real pain point",
        description:
          "I interviewed 13 people in creative industries in London and Taipei, from designers to studio owners, and added desk research. Thematic analysis and a problem map pointed to three insights.",
        findings: [
          "Workload came up most, but it traced back to two things: team dynamics, and how to work better with supervisors.",
          "Designers who had someone to talk to described the same pressure as manageable.",
          "New hires felt it most, with the fewest people to ask.",
        ],
        rows: [
          [
            {
              src: researchProblemMap,
              caption:
                "The problem map from the interviews: challenges designers named (black) and ways to ease them (outlined). Team dynamics and working with supervisors sat at the centre.",
              ratio: 2000 / 1008,
            },
          ],
        ],
      },
      {
        label: "Phase 2",
        heading: "Workshops to test the direction",
        description:
          "With an 8-person studio team, I ran a workshop of 4 job-satisfaction activities to test whether more chances to talk would help. Then I checked the solution with 9 experts, including design managers, PMs and facilitators.",
        findings: [
          "Seeing it work in person became the reason to turn it into a full service.",
        ],
        rows: [
          [
            {
              src: workshopDayMap1,
              caption:
                "A designer's day at the partner studio, mapped in the workshop: what people do (black), how it feels (above) and why (below).",
              ratio: 1920 / 780,
            },
            { src: workshopDayMap2, caption: "The rest of the day.", ratio: 1720 / 881 },
          ],
          [
            { src: discoveryPhase2Workshop, caption: "The workshop in progress.", ratio: 1006 / 1426 },
            {
              src: workshopJourneyGraphs,
              caption:
                "Satisfaction curves participants drew, from their first day to now. People with under two years at the studio started low.",
              ratio: 650 / 960,
            },
          ],
        ],
      },
    ],
    persona: {
      label: "Personas",
      description:
        "Built from the 13 interviews and the workshop. The group hit hardest was new and junior designers, who felt the most isolated, so every part of the service lets people join in without having to speak up first.",
      cards: [
        {
          photo: personaManager,
          tag: "Service enabler",
          tagStyle: "primary",
          name: "Department manager",
          quote: "The company is willing to care about its people and build a positive place to work.",
          about: ["32, with the company for over five years, experienced and adaptable.", "Satisfaction has risen and is now steady."],
          needs: ["Wants a clearer view of what leadership needs and where the company is heading.", "Needs insight into how to raise team efficiency and cohesion."],
          challenges: ["Balances a heavy workload with managing the team.", "Unsure how far to go in the manager role."],
          opportunities: ["Willing to hear what employees struggle with and help find answers.", "Steps in to help when the team runs into trouble."],
        },
        {
          photo: personaSeniorDesigner,
          tag: "Primary user",
          tagStyle: "secondary",
          name: "Senior designer",
          quote: "The company should run more activities like this so people actually interact.",
          about: ["27, with the company for over four years.", "Neither satisfied nor unhappy. No plans to leave, but not content either."],
          needs: ["Wants a livelier team atmosphere.", "Wants more chances to talk and do things together, and a better onboarding for new hires."],
          challenges: ["Doesn't particularly like the current team atmosphere.", "Often handles last-minute client requests and feels pressure when progress is checked in meetings."],
          opportunities: ["Happy to discuss work with colleagues and managers.", "Willing to use years of experience to help other designers."],
        },
        {
          photo: personaJuniorDesigner,
          tag: "Primary user",
          tagStyle: "secondary",
          name: "Junior designer",
          quote: "I'm not sure I'm doing it right, so I need someone to talk it through with.",
          about: ["23, with the company for over a year.", "Satisfaction goes up and down, with worry that it will drop again."],
          needs: [
            "Chances to talk with colleagues or a manager to check direction.",
            "A manager who understands where designers are and helps find solutions or speaks up for them.",
            "Support from the company when work causes anxiety.",
          ],
          challenges: [
            "Unsure of their own approach, so tends to work alone.",
            "Overwhelmed by urgent projects and accepts changes passively.",
            "Feels pressure when working with other departments.",
          ],
          opportunities: ["Flexible company policies lower the pressure.", "Willing to share their situation with colleagues when given the chance."],
        },
        {
          photo: personaNewDesigner,
          tag: "Extreme user",
          tagStyle: "dark",
          name: "New designer",
          quote: "Everyone is like an island.",
          about: [
            "Just left a previous job for a new company.",
            "Very low satisfaction. Left after about a month because communicating with the manager was so hard.",
            "Gets along with colleagues, but has no chance for professional discussion.",
          ],
          needs: ["More professional conversations with colleagues to grow skills.", "Clear, logical and effective communication with the manager."],
          challenges: [
            "Doesn't like the team atmosphere.",
            "Handles more last-minute client requests and often feels deadline pressure.",
            "Feels pressure in client meetings about progress or requirements.",
          ],
          opportunities: ["Knows the ideal workplace needs rational communication and a team that learns and grows together."],
        },
      ],
    },
    hmw: {
      label: "How might we",
      question:
        "How might we give designers in small creative studios **more chances to talk**, **exchange design skills**, and **communicate better with other professionals**?",
    },
  },

  decisions: {
    kicker: "Key decisions",
    heading: "Four decisions that make sharing feel safe",
    items: [
      {
        heading: "Run it around meetings teams already have",
        body: "I set one rule for myself: build trust without taking up working hours. Many design teams already hold weekly or monthly design meetings, so where they do, Sharing Time runs just before or after them, like an icebreaker, with a short guide for whoever hosts.",
        evidence:
          "The design manager I worked with said earlier team activities had felt like extra work to colleagues, so anything that added a separate session would fade.",
        images: [
          {
            src: decisionPsychologicalSafety,
            caption: "The aim is to move a team from the comfort zone to the learning zone (Edmondson, 2018).",
            ratio: 1120 / 960,
          },
          {
            src: decisionManagerCall,
            caption: "Talking the prototype through with the partner studio's design manager.",
            ratio: 1158 / 616,
          },
        ],
      },
      {
        heading: "Build trust before asking anyone to show their work",
        body: "The service moves through three stages over nine months, from hobbies to real projects, then starts again.",
        quote:
          "The design manager told me: \"At the current stage of the company, we should first create a harmonious atmosphere so that everyone becomes more lively and familiar.\"",
        stages: [
          { title: "Interest sharing", months: "3 months" },
          { title: "Design skill sharing", months: "3 months" },
          { title: "Design work sharing", months: "3 months" },
        ],
        images: [
          {
            src: decisionUkDesignerCall,
            caption:
              "Walking a product designer at Burberry UK through the three stages. Even in a large design team, weekly updates felt like standard reporting, not real sharing.",
            ratio: 1104 / 594,
          },
        ],
      },
      {
        heading: "Give listeners a new angle to ask from",
        body: "Explore cards give listeners a fresh way to look at what is being shared, plus a guiding question, so they learn what a good question sounds like. They are called Explore because \"questions\" can sound like criticism. Support cards do the same for feedback that gives the sharer strength.",
        changes: [
          {
            feature: "Random draw, with one swap allowed",
            why: "Picking a card should feel playful, not like a test. The swap lets people skip a prompt that doesn't fit.",
            who: "Pilot designers",
            said: "Make picking cards more fun.",
          },
          {
            feature: "A rules card and a \"supportive space\" flag",
            why: "People need to know it's safe before they speak. The flag stays on the table, so the tone is visible all session.",
            who: "Senior PM",
            said: "Make the tone clear.",
          },
          {
            feature: "Points go both ways",
            why: "The sharer gives a point to the best question, and listeners give one to the best sharer, so asking well counts as much as presenting.",
            who: "Design manager",
            said: "Reward the sharer.",
          },
          {
            feature: "Questions wait until the share ends",
            why: "Interruptions throw new sharers off. Listeners note thoughts during the share and ask in the five minutes after.",
            who: "Design manager",
            said: "Let people jump in mid-share.",
          },
        ],
        images: [
          {
            src: outcome1,
            caption: "The printed toolkit: rules, Explore, Support and award cards.",
            ratio: 925 / 497,
          },
          {
            src: decisionCardPrompts,
            caption: "Explore and Support cards, front and back.",
            ratio: 1620 / 730,
          },
        ],
      },
      {
        heading: "Borrow from card tools, not HR programs",
        body: "In my review, HR events and wellbeing programs were costly, few people joined, and signing up could look like admitting you were struggling. Icebreaker decks were cheap and fit any moment. I kept that lightness and pointed it at what a company values: sharing skills and work.",
        evidence:
          "I mapped existing ideas, from peer bonus schemes to buddy systems. Skill exchange was the one that helped people learn from each other and get closer at the same time.",
        images: [
          { src: decisionRef1, caption: "Concepts I explored, grouped by what they change.", ratio: 1360 / 1020 },
          { src: decisionRef2, caption: "Existing card and board tools I studied.", ratio: 1086 / 1020 },
        ],
      },
    ],
  },

  service: {
    kicker: "The service",
    heading: "One 40-minute session, and the system behind it",
    description:
      "An in-person session, an online sharing board and a toolkit of guide and cards. The blueprint shows what the host prepares behind each step.",
    session: {
      label: "One session",
      facts: ["Up to 40 minutes", "Up to 4 sharers", "5 min sharing + 5 min questions each"],
      steps: [
        { title: "Share a skill", time: "3 to 5 min", image: sessionStepShare },
        { title: "Draw an Explore card", image: sessionStepDraw },
        { title: "Ask questions", time: "5 min", image: sessionStepAsk },
        { title: "Sharer gives a point", image: sessionStepPoint },
        { title: "Top scorer gets the award card", image: sessionStepAward },
        { title: "See what everyone is working on", image: sessionStepBoard },
      ],
    },
    blueprint: [
      { src: outcomeBlueprintLeft, caption: "Before the session, and how it starts.", ratio: 2000 / 1107 },
      { src: outcomeBlueprintRight, caption: "The rest of the session, and what happens after.", ratio: 1978 / 1124 },
    ],
    blueprintCaption: "The service blueprint: what designers do, what the manager does, and what supports it.",
    board: {
      src: outcome2,
      label: "Early prototype",
      caption:
        "A framework I set up on Miro so the team could post weekly updates, comment on each other's sharing and keep a record of every session.",
      ratio: 918 / 492,
    },
  },

  reflection: {
    kicker: "Reflection",
    heading: "People liked the cards. That didn't mean they had the problem.",
    takeaways: [
      {
        lead: "People liking it isn't the same as needing it.",
        text: "A London studio enjoyed the cards, but its design manager said the pain point didn't apply: the team already shares openly, and keeping good people mattered more right now.",
      },
      {
        lead: "Team culture shapes the problem.",
        text: "One designer at a public showcase said the isolation was exactly their situation. It shows up in some teams, not all.",
      },
      {
        lead: "A service needs an owner.",
        text: "That's why the 2026 platform puts the guide, cards and timer in one place a host can run.",
      },
    ],
    quote: {
      text: "Company is very good at trying new ways of working, but they're not very good at sustaining an idea... Whatever you apply, you need to have a clear ownership on who is going to be responsible.",
      author: "Head of Design at a London tech company",
    },
    image: reflectionPhoto,
    imageCaption: "A workshop reflection session.",
  },
};
