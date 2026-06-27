export const projects = {
  devscout: {
    id: "devscout",
    title: "DevScout",
    tagline: "AI-Powered Recruitment Intelligence Platform",
    github: "Private Repository",
    liveUrl: "https://devscout-orcin.vercel.app/",
    stack: ["React", "Supabase", "PostgreSQL", "GROQ API", "TailwindCSS"],
    architectureDiagrams: [
      { name: "Authentication", path: "/architecture/devscout/auth.svg" },
      { name: "Backend Functions", path: "/architecture/devscout/backendspecialfunctions.svg" },
      { name: "Billing Engine", path: "/architecture/devscout/billing.svg" },
      { name: "Dashboard", path: "/architecture/devscout/dashboard.svg" },
      { name: "Decision Memory", path: "/architecture/devscout/decisionmemory.svg" },
      { name: "Dispatch Terminal", path: "/architecture/devscout/dispatchterminal.svg" },
      { name: "Strategic Rubric", path: "/architecture/devscout/strategicrubric.svg" },
      { name: "Talent Radar", path: "/architecture/devscout/talentradar.svg" },
      { name: "War Room", path: "/architecture/devscout/warroom.svg" }
    ],
    videos: {
      scenarios: [
        { title: "Startup Scenario", youtubeId: "Qzpmhmy8Xek" },
        { title: "Emergency Scenario", youtubeId: "F7rAQ9DpHLA" },
        { title: "Crisis Scenario", youtubeId: "vo4Jy4qqwoA" }
      ],
      miniclips: [
        { title: "Auth Demo", youtubeId: "0D1xEdHr--4" },
        { title: "Billing Demo", youtubeId: "tmjetEBJfOc" },
        { title: "Command Center", youtubeId: "kEJTTuKRfM4" },
        { title: "Decision Memory", youtubeId: "_dC4aqY-gAc" },
        { title: "Dispatch Terminal", youtubeId: "oFhE7vxJSYw" },
        { title: "Strategic Rubric", youtubeId: "aLGWf_HjzX8" },
        { title: "Talent Radar", youtubeId: "11wK5Dx3kn8" },
        { title: "War Room", youtubeId: "D8KJND8vmYA" }
      ]
    }
  },
  
  qix: {
    id: "qix",
    title: "Qix",
    tagline: "Zero-Knowledge Ephemeral Communication Infrastructure",
    github: "https://github.com/MrV3nomous/qix",
    liveUrl: "https://qix-six.vercel.app/",
    stack: ["React", "Go", "MongoDB", "Redis", "Python", "Chi Router", "Web Crypto API", "TailwindCSS"],
    architectureDiagrams: [
      { name: "Full Architecture", path: "/architecture/qix/qix.svg" },
      { name: "E2E Encryption & WebSocket", path: "/architecture/qix/qixe2ewebsocket.svg" },
      { name: "Security & Authentication Lifecycle", path: "/architecture/qix/qixsecurityandauthentication.svg" },
      { name: "Ephemeral Data Lifecycle", path: "/architecture/qix/qixephemeral.svg" },
      { name: "Database Schema & Relationships", path: "/architecture/qix/qixdbrelationsanddata.svg" }
    ],
    videos: {
      miniclips: [
        { title: "Qix - How it works", youtubeId: "FVBSAYIzODo" }
      ]
    }
  },

  lieDetector: {
    id: "lie-detector-pro",
    title: "Lie Detector Pro",
    tagline: "The Zero-Trust Cognitive Biometric Interrogator",
    github: "https://github.com/MrV3nomous/lie-detector-pro",
    liveUrl: "https://lie-detector-pro.vercel.app/",
    stack: ["React", "PostgreSQL", "Gemini Edge Functions", "Deno"],
    architectureDiagrams: [
      { name: "Two Brains Flow", path: "/architecture/liedetectorpro.svg" }
    ],
    videos: {
      demo: { title: "Working Demo", youtubeId: "-YU-IEItKKU" }
    }
  },

  minigit: {
    id: "minigit",
    title: "MiniGit",
    tagline: "Enterprise-grade local version control system from scratch.",
    github: "https://github.com/MrV3nomous/MiniGit",
    liveUrl: null,
    stack: ["Java", "Zlib Compression", "SHA-1 Hashing"],
    architectureDiagrams: [
      { name: "Object Storage & Hashing", path: "/architecture/minigit.svg" }
    ],
    videos: {
      scenarios: [
        { title: "Commit & Tracking", youtubeId: "OBIe7F1wYqY" },
        { title: "Emergency Hotfix", youtubeId: "SsulM_BNL0M" },
        { title: "Enterprise Archive", youtubeId: "oCM4VnBxP1c" }
      ]
    }
  },

  krishnaSpeaks: {
    id: "krishnaspeaks",
    title: "KrishnaSpeaks",
    tagline: "Context-Aware Interactive AI",
    github: "https://github.com/MrV3nomous/KrishnaSpeaks",
    liveUrl: "https://krishna-speaks-kappa.vercel.app/",
    stack: ["Java Swing", "React", "State Management"],
    architectureDiagrams: [
      { name: "Java Swing Architecture", path: "/architecture/krishnaspeaksjavaswing.svg" },
      { name: "React Architecture", path: "/architecture/krishnaspeaksreact.svg" }
    ],
    videos: {
      demo: { title: "Working Demo", youtubeId: "JbLv-0C7rwg" }
    }
  },

  texasHoldem: {
    id: "texasholdem",
    title: "Texas Hold'em CLI",
    tagline: "Complex Game State & AI Logic in Terminal",
    github: "https://github.com/MrV3nomous/TexasHoldemCLI",
    liveUrl: null,
    stack: ["Java", "Object-Oriented Design"],
    architectureDiagrams: [
      { name: "Game Loop Architecture", path: "/architecture/poker.svg" }
    ],
    videos: {
      demo: { title: "4 Rounds Gameplay", youtubeId: "HSsAn1crk58" }
    }
  },

  universeExplorer: {
    id: "universe-explorer",
    title: "Universe Explorer",
    tagline: "Procedural Canvas Generation",
    github: "https://github.com/MrV3nomous/universe-explorer",
    liveUrl: "https://mrv3nomous.github.io/universe-explorer/",
    stack: ["JavaScript", "HTML5 Canvas", "Procedural Algorithms"],
    architectureDiagrams: [
      { name: "Rendering Pipeline", path: "/architecture/universeexplorer.svg" }
    ],
    videos: {
      demo: { title: "Simulation Demo", youtubeId: "mIyY1lwL5R0" }
    }
  },

  visionDetect: {
    id: "vision-detect",
    title: "VisionDetect",
    tagline: "Client-side Browser ML Detection",
    github: "https://github.com/MrV3nomous/vision-detect",
    liveUrl: "https://vision-detect.vercel.app/",
    stack: ["JavaScript", "TensorFlow.js", "COCO-SSD"],
    architectureDiagrams: [
      { name: "Client-Side ML Flow", path: "/architecture/visiondetect.svg" }
    ]
  }
};