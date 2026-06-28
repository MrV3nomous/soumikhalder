import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Terminal, Activity, Target, GitBranch,
  BrainCircuit, Orbit, Compass, Zap, Check, Mail, Code2,
  ShieldCheck, Rocket, FileCode2, Network,
  FileSearch, PlayCircle, Scale, Lock
} from 'lucide-react';
import { projects } from '../data/projects';
import profileImage from '../assets/me.jpg';


const domainThemes = {
  blue: { iconBg: "bg-blue-500/10", iconBorder: "border-blue-500/20", iconText: "text-blue-400", accentBorder: "hover:border-blue-500/30", shadow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]" },
  emerald: { iconBg: "bg-emerald-500/10", iconBorder: "border-emerald-500/20", iconText: "text-emerald-400", accentBorder: "hover:border-emerald-500/30", shadow: "hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]" },
  indigo: { iconBg: "bg-indigo-500/10", iconBorder: "border-indigo-500/20", iconText: "text-indigo-400", accentBorder: "hover:border-indigo-500/30", shadow: "hover:shadow-[0_0_30px_rgba(99,102,241,0.1)]" },
  purple: { iconBg: "bg-purple-500/10", iconBorder: "border-purple-500/20", iconText: "text-purple-400", accentBorder: "hover:border-purple-500/30", shadow: "hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]" },
  violet: { iconBg: "bg-violet-500/10", iconBorder: "border-violet-500/20", iconText: "text-violet-400", accentBorder: "hover:border-violet-500/30", shadow: "hover:shadow-[0_0_30px_rgba(139,92,246,0.1)]" },
  amber: { iconBg: "bg-amber-500/10", iconBorder: "border-amber-500/20", iconText: "text-amber-400", accentBorder: "hover:border-amber-500/30", shadow: "hover:shadow-[0_0_30px_rgba(245,158,11,0.1)]" }
};

const featuredTech = ['JavaScript', 'React', 'Node.js', 'Java', 'MongoDB', 'Redis', 'Tailwind CSS', 'PostgreSQL', 'Docker', 'GOLANG', 'Linux'];

const statsGrid = [
  { val: "7", label: "Independent Systems Built", icon: Rocket },
  { val: "20+", label: "Architecture Documents", icon: FileCode2 },
  { val: "50+", label: "Technical Experiments", icon: Activity },
  { val: "5", label: "Live Deployments", icon: ShieldCheck }
];

const progressionSteps = [
  { title: "Storage & VCS", color: "emerald" },
  { title: "Security & Crypto", color: "blue" },
  { title: "Engine Rendering", color: "violet" },
  { title: "Edge ML", color: "amber" },
  { title: "DB Triggers & AI", color: "purple" },
  { title: "Product Systems", color: "indigo" }
];

const progressionProjects = [
  {
    ...projects.minigit,
    color: 'emerald',
    icon: Terminal,
    desc: "A Git-like version control system built from scratch in Java. Implemented low-level atomic operations, SHA-1 hashing, and Zlib compression.",
    problem: "Reliance on black-box version control tools.",
    solution: "Engineered a custom VCS interpreting raw bytes.",
    impact: "Mastered low-level data compression and integrity."
  },
  {
    ...projects.qix,
    color: 'blue',
    icon: Lock,
    desc: "Zero-knowledge ephemeral communication vault. Architected secure E2E encryption via Web Crypto API, Go WebSockets, and Redis.",
    problem: "Sensitive communications require absolute server-side trust.",
    solution: "Browser-controlled zero-knowledge encryption architecture.",
    impact: "Server mathematically cannot access plaintext data."
  },
  {
    ...projects.universeExplorer,
    color: 'violet',
    icon: Orbit,
    desc: "Procedural world generation using noise algorithms. Implemented high-performance rendering via HTML5 Canvas.",
    problem: "Static digital environments lack organic replayability.",
    solution: "Simulated natural generation using deterministic noise functions.",
    impact: "High-performance procedural rendering on the client."
  },
  {
    ...projects.visionDetect,
    color: 'amber',
    icon: Zap,
    desc: "Client-side object detection using TensorFlow.js. Deployed serverless machine learning for real-time computer vision.",
    problem: "Server-side ML inference causes high latency and costs.",
    solution: "Distributed execution of models directly in the user browser.",
    impact: "Achieved real-time serverless visual processing."
  },
  {
    ...projects.lieDetector,
    color: 'purple',
    icon: BrainCircuit,
    desc: "Real-time biometric analysis using PostgreSQL triggers and AI. Fused deterministic databases with edge-function AI interpretation.",
    problem: "Need for rapid forensic data visualization.",
    solution: "Real-time analysis pipeline leveraging edge computing.",
    impact: "Bridged strict database triggers with generative AI logic."
  },
  {
    ...projects.krishnaSpeaks,
    color: 'indigo',
    icon: Network,
    desc: "Retrieval-enhanced conversational architecture with persistent memory. Architected a full-stack chatbot with localized context awareness.",
    problem: "Standard conversational bots lack localized context and memory.",
    solution: "Designed a multi-stage retrieval augmented pipeline.",
    impact: "Enabled persistent entity memory and context-aware routing."
  }
];

const caseStudyFeatures = [
  { text: "20+ Architecture Diagrams", icon: Network },
  { text: "20+ Live Demo Videos", icon: PlayCircle },
  { text: "Implementation Walkthroughs", icon: GitBranch },
  { text: "Technical Trade-offs", icon: Scale },
  { text: "Source Code References", icon: FileSearch }
];

const philosophyCards = [
  { title: "Design for Failure", desc: "Systems should degrade gracefully. I architect with edge cases and fallbacks as primary requirements." },
  { title: "Make Complexity Visible", desc: "Architecture decisions must be documented and transparent, never hidden behind 'magic' frameworks." },
  { title: "Build From Fundamentals", desc: "Understanding primitives creates better abstractions. I build from scratch to master the lower levels." }
];

const getProjectLink = (proj) => proj.liveUrl || proj.github || '/lab';

const engineeringHighlights = [
  { desc: "Built a Git-like VCS from scratch in Java.", link: getProjectLink(projects.minigit), label: "View MiniGit" },
  { desc: "Architected a zero-knowledge communication vault in Go.", link: "/qix", label: "View Qix" },
  { desc: "Designed AI recruitment platform with deep telemetry analysis.", link: "/devscout", label: "View DevScout" },
  { desc: "Built deterministic AI scoring pipelines using edge computing.", link: "/lab", label: "View Research Lab" }
];


function ScrollReveal({ children, delay = 0, direction = "up", className = "" }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const yOffset = direction === "up" ? 30 : direction === "down" ? -30 : 0;
  const xOffset = direction === "left" ? 30 : direction === "right" ? -30 : 0;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? `translate3d(0, 0, 0)` : `translate3d(${xOffset}px, ${yOffset}px, 0)`,
        transition: `opacity 1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: 'opacity, transform'
      }}
    >
      {children}
    </div>
  );
}


export default function Home() {
  const progressionRef = useRef(null);
  const [progressionScroll, setProgressionScroll] = useState(0);
  const [activeProgressionIndex, setActiveProgressionIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (progressionRef.current) {
        const { top, height } = progressionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const triggerPoint = windowHeight * 0.4;
        const scrolled = triggerPoint - top;

        const scrollableDistance = height - windowHeight * 0.8;

        let percentage = (scrolled / scrollableDistance) * 100;
        percentage = Math.max(0, Math.min(100, percentage));

        setProgressionScroll(percentage);

        let newIndex = Math.min(5, Math.floor((percentage / 100) * 6));
        setActiveProgressionIndex(newIndex);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full flex flex-col text-slate-200 font-sans selection:bg-blue-500/30 selection:text-blue-100 overflow-x-clip relative min-h-screen">

      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url(&quot;data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E&quot;)] opacity-[0.03] mix-blend-overlay" />
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/5 blur-[120px] rounded-full" />
      </div>

      <main className="relative z-10 pt-20 pb-32 px-4 md:px-8 max-w-7xl mx-auto flex flex-col gap-24 w-full">

        <section className="flex flex-col mt-10 gap-6 max-w-5xl">
          <ScrollReveal>
            <div className="flex items-center gap-5 mb-8">
              <div className="w-16 h-16 rounded-full border-2 border-white/10 bg-slate-800 flex items-center justify-center overflow-hidden shadow-2xl">
                <img src={profileImage} alt="Soumik Halder" className="w-full h-full object-cover opacity-95 scale-110" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                <span className="hidden w-full h-full items-center justify-center text-slate-400 font-bold text-2xl bg-slate-800">S</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white font-black text-2xl tracking-tighter">Hi, I'm Soumik.</span>
                <span className="text-blue-400 text-sm font-bold uppercase tracking-widest">
                  Independent Software Engineer
                </span>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2 w-fit">
              <Activity size={14} className="animate-pulse" /> Engineered From First Principles
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h1 className="text-5xl md:text-7xl lg:text-[4rem] font-black tracking-tight text-white leading-[1.05]">
              I build systems from primitives: <br className="hidden xl:block" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-500">
                AI infrastructure, developer tools, and distributed applications.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 font-medium mt-6 max-w-3xl leading-relaxed">
              From low-level version control systems to AI-assisted recruitment platforms, I focus on turning complex workflows into deterministic, highly scalable software.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 py-8 border-t border-white/5">
              {statsGrid.map((m) => (
                <div key={m.label} className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-white">
                    <m.icon size={16} className="text-blue-500" />
                    <span className="text-2xl font-black">{m.val}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{m.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 pb-8 border-b border-white/5">
              <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Featured Technologies</span>
              <div className="flex flex-wrap gap-2">
                {featuredTech.map(tech => (
                  <span key={tech} className="px-3 py-1.5 bg-black/40 border border-white/5 rounded-lg text-[10px] font-bold uppercase tracking-widest text-slate-400 shadow-sm">{tech}</span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-5 mt-10 w-full sm:w-auto">
              <a href="#flagship" className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:shadow-[0_0_40px_rgba(37,99,235,0.5)] hover:-translate-y-1 flex items-center justify-center gap-3 text-base group">
                View Flagship Case Study <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <Link to="/journey" className="w-full sm:w-auto px-8 py-4 bg-[#05070a]/80 border border-white/10 hover:border-white/20 text-white font-bold rounded-2xl transition-all shadow-lg text-center text-base backdrop-blur-md flex items-center justify-center gap-3 group">
                <Compass size={20} className="text-slate-400 group-hover:text-white transition-colors" /> Professional Journey
              </Link>
            </div>
          </ScrollReveal>
        </section>

        <section id="flagship" className="flex flex-col gap-6 w-full pt-8">
          <ScrollReveal>
            <div className="flex flex-col gap-2 mb-2">
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight flex items-center gap-3">
                <Target className="text-indigo-400" size={28} /> CASE STUDY
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100} className="w-full">
            <div className="group relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-[#05070a]/80 hover:border-blue-500/30 transition-colors shadow-2xl backdrop-blur-md">
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none group-hover:bg-blue-500/10 transition-colors duration-1000"></div>

              <div className="p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row gap-12 lg:gap-16 items-center justify-between z-10 relative">

                <div className="flex flex-col gap-6 w-full lg:w-1/2">
                  <Link to="/devscout" className="flex items-center gap-4 w-fit">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.2)] p-3 group-hover:scale-105 transition-transform duration-500">
                      <img src="/devscoutlightlogo.png" alt={projects.devscout.title} className="w-full h-full object-contain opacity-90 drop-shadow-md" />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-4xl md:text-5xl font-black text-white group-hover:text-blue-400 transition-colors tracking-tight">{projects.devscout.title}</h3>
                      <span className="text-blue-400 font-bold uppercase tracking-widest text-[10px] mt-1">Enterprise Platform</span>
                    </div>
                  </Link>

                  <div className="flex flex-col gap-4 mt-2">
                    <p className="text-white text-xl font-bold leading-snug">
                      An AI-powered recruitment intelligence platform that combines repository analysis, interview processing, and explainable candidate scoring.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {projects.devscout.stack.slice(0, 5).map(tech => (
                      <span key={tech} className="px-3 py-1.5 bg-black/40 border border-white/5 rounded-lg text-[10px] font-bold uppercase tracking-widest text-slate-400 shadow-sm">{tech}</span>
                    ))}
                  </div>

                  <Link to="/devscout" className="text-blue-400 font-bold flex items-center gap-2 mt-4 hover:text-blue-300 transition-colors w-fit group/link bg-blue-500/10 border border-blue-500/20 px-6 py-3 rounded-xl">
                    Read the Case Study <ArrowRight size={18} className="group-hover/link:translate-x-1.5 transition-transform" />
                  </Link>
                </div>

                <div className="w-full lg:w-1/2 relative group/video">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl blur-lg opacity-0 group-hover/video:opacity-100 transition-opacity duration-700"></div>
                  <Link to="/devscout#demos" className="relative w-full aspect-[16/10] bg-[#030407] rounded-xl border border-slate-700 shadow-2xl overflow-hidden block flex flex-col cursor-pointer transform group-hover/video:scale-[1.02] transition-transform duration-500">
                    <div className="w-full h-8 bg-slate-900 border-b border-slate-800 flex items-center px-4 gap-2 shrink-0">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                    </div>
                    <div className="w-full flex-grow relative bg-black">
                      <video autoPlay loop muted playsInline preload="metadata" poster={`https://img.youtube.com/vi/${projects.devscout.videos?.scenarios?.[0]?.youtubeId || ''}/maxresdefault.jpg`} className="w-full h-full object-cover opacity-80 group-hover/video:opacity-100 transition-opacity duration-500">
                        <source src="/devscout-loop.mp4" type="video/mp4" />
                      </video>
                    </div>
                  </Link>
                </div>

              </div>
            </div>
          </ScrollReveal>

        </section>

        <section className="relative flex flex-col lg:flex-row gap-12 lg:gap-20 w-full mt-12" ref={progressionRef}>

          <div className="lg:w-1/3 flex flex-col relative z-20">
            <div className="sticky top-32 flex flex-col gap-8">
              <ScrollReveal>
                <div className="flex flex-col gap-3">
                  <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight flex flex-col gap-1">
                    <span className="flex items-center gap-3"><Code2 className="text-blue-500" size={32} /> Selected</span>
                    <span>Engineering</span>
                    <span className="text-slate-500">Progression</span>
                  </h2>
                  <p className="text-slate-400 text-base md:text-lg font-medium mt-4 leading-relaxed pr-4">
                    Tracking the architectural evolution from low-level fundamentals to complex enterprise systems.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={100}>
                <div className="hidden lg:flex flex-col gap-8 relative pl-4 border-l-2 border-slate-800/60 ml-2 mt-8">
                  <div
                    className="absolute top-0 left-[-2px] w-[2px] bg-gradient-to-b from-emerald-500 via-purple-500 to-blue-500 transition-all duration-300 ease-out shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                    style={{ height: `${progressionScroll}%` }}
                  ></div>

                  {progressionSteps.map((step, idx) => {
                    const isActive = idx <= activeProgressionIndex;
                    const isCurrent = idx === activeProgressionIndex;

                    return (
                      <div key={step.title} className="flex items-center gap-5 transition-all duration-500">
                        <div className={`absolute left-[-6px] w-2.5 h-2.5 rounded-full transition-all duration-500 ${isActive ? 'bg-white shadow-[0_0_12px_white] scale-125' : 'bg-slate-800 scale-100'}`}></div>
                        <span className={`text-xs font-bold uppercase tracking-widest transition-all duration-500 ${isCurrent ? 'text-white translate-x-2' : isActive ? 'text-slate-400' : 'text-slate-700'}`}>
                          {step.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </ScrollReveal>
            </div>
          </div>

          <div className="lg:w-2/3 flex flex-col gap-10 md:gap-16 relative z-10 pb-12">
            {progressionProjects.map((proj, idx) => {
              const theme = domainThemes[proj.color];
              const isCurrent = idx === activeProgressionIndex;
              const hasPassed = idx < activeProgressionIndex;

              const glowColors = {
                emerald: 'bg-emerald-500', violet: 'bg-violet-500',
                amber: 'bg-amber-500', purple: 'bg-purple-500',
                indigo: 'bg-indigo-500', blue: 'bg-blue-500'
              };

              return (
                <ScrollReveal key={proj.title} delay={idx * 100} className="w-full">
                  <div className={`group relative transition-all duration-700 ${isCurrent ? 'scale-[1.02] opacity-100 z-20' : hasPassed ? 'scale-100 opacity-50 hover:opacity-100' : 'scale-[0.98] opacity-30'}`}>

                    <div className={`absolute -inset-1 rounded-[3rem] blur-lg transition-opacity duration-1000 ${isCurrent ? 'opacity-20' : 'opacity-0'} ${glowColors[proj.color]}`}></div>

                    <Link to={getProjectLink(proj)} target={proj.liveUrl || proj.github ? "_blank" : "_self"} className={`relative block overflow-hidden rounded-[2.5rem] border ${isCurrent ? theme.accentBorder : 'border-white/5'} bg-[#05070a]/90 backdrop-blur-xl p-8 md:p-12 flex flex-col shadow-2xl transition-all duration-500 h-full`}>
                      <div className="flex flex-col gap-6 relative z-10">

                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                          <div className="flex items-center gap-5">
                            <div className={`w-16 h-16 rounded-2xl ${theme.iconBg} border ${theme.iconBorder} flex items-center justify-center shadow-inner group-hover:rotate-3 group-hover:scale-110 transition-transform duration-500`}>
                              <proj.icon size={28} className={theme.iconText} />
                            </div>
                            <div className="flex flex-col">
                              <h3 className="text-3xl font-bold text-white tracking-tight">{proj.title}</h3>
                              <span className={`${theme.iconText} font-bold uppercase tracking-widest text-[10px] mt-1`}>Evolution Phase 0{idx + 1}</span>
                            </div>
                          </div>

                          <div className={`hidden md:flex w-12 h-12 rounded-full border items-center justify-center transition-all duration-500 ${isCurrent ? `bg-white/10 ${theme.iconBorder}` : 'bg-white/5 border-white/10'}`}>
                            <ArrowRight size={18} className={`text-white transition-transform duration-500 ${isCurrent ? '-rotate-45' : 'group-hover:-rotate-45'}`} />
                          </div>
                        </div>

                        <p className="text-slate-400 text-lg font-medium leading-relaxed mt-2 pr-4">
                          {proj.desc}
                        </p>

                        <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-white/5">
                          <div className="text-sm md:text-base text-slate-300">
                            <span className="font-bold text-white uppercase tracking-wider text-xs mr-2">Problem</span>
                            {proj.problem}
                          </div>
                          <div className="text-sm md:text-base text-slate-300">
                            <span className="font-bold text-white uppercase tracking-wider text-xs mr-2">Solution</span>
                            {proj.solution}
                          </div>
                          <div className="text-sm md:text-base text-slate-300">
                            <span className="font-bold text-white uppercase tracking-wider text-xs mr-2">Impact</span>
                            {proj.impact}
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-4 pt-8 border-t border-white/5">
                          <div className="flex flex-wrap gap-2">
                            {proj.stack && proj.stack.slice(0, 4).map(tech => (
                              <span key={tech} className="px-3 py-1.5 bg-black/40 border border-white/5 rounded-lg text-[11px] font-bold uppercase tracking-widest text-slate-400">{tech}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        <section className="flex flex-col gap-8 w-full mt-8">
          <ScrollReveal>
            <div className="bg-gradient-to-br from-[#05070a] to-slate-900/40 border border-white/5 rounded-[3rem] p-10 md:p-16 max-w-5xl mx-auto shadow-2xl relative overflow-hidden backdrop-blur-md flex flex-col md:flex-row items-center gap-12 w-full">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[80px] rounded-full pointer-events-none"></div>

              <div className="flex flex-col gap-4 md:w-1/2 relative z-10">
                <h3 className="text-3xl font-black text-white tracking-tight leading-tight">
                  What You'll Find In <br />My Case Studies
                </h3>
                <p className="text-slate-400 font-medium text-lg">
                  A look under the hood at how the systems were designed, built, and deployed.
                </p>
              </div>

              <div className="flex flex-col gap-5 md:w-1/2 relative z-10 bg-black/20 p-8 rounded-3xl border border-white/5">
                {caseStudyFeatures.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-slate-300">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                      <item.icon size={16} className="text-blue-400" />
                    </div>
                    <span className="text-base font-bold">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </section>

        <section className="flex flex-col gap-8 w-full mt-16 max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="flex flex-col gap-2 mb-8 text-center items-center">
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                Engineering Philosophy
              </h2>
              <p className="text-slate-400 text-sm font-bold tracking-wide">
                The principles driving my architecture decisions.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {philosophyCards.map((phil, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="bg-[#05070a]/80 border border-white/10 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 shadow-lg h-full">
                  <h4 className="text-white font-bold text-lg mb-2">{phil.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{phil.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-8 w-full mt-16 max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="flex flex-col gap-2 mb-4 text-center items-center">
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight flex items-center justify-center gap-3">
                <ShieldCheck className="text-emerald-400" size={28} /> Engineering Highlights
              </h2>
              <p className="text-slate-400 text-sm font-bold tracking-wide">Factual, verifiable technical achievements.</p>
            </div>
          </ScrollReveal>

          <div className="flex flex-col gap-4 w-full">
            {engineeringHighlights.map((highlight, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <Link to={highlight.link} target={highlight.link.startsWith('http') ? "_blank" : "_self"} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/[0.02] border border-white/5 p-5 md:p-6 rounded-2xl hover:bg-white/[0.04] hover:border-slate-500/30 transition-all duration-300 group">
                  <div className="flex items-center gap-4">
                    <Check size={18} className="text-emerald-500 shrink-0" />
                    <span className="text-slate-200 text-base md:text-lg font-medium">{highlight.desc}</span>
                  </div>
                  <span className="text-slate-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:text-blue-400 transition-colors whitespace-nowrap">
                    {highlight.label} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <section className="w-full mt-24 border-t border-slate-800/60 pt-16 pb-12 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

          <ScrollReveal className="relative z-10">
            <div className="bg-[#05070a]/60 border border-white/10 rounded-[3rem] p-10 md:p-16 lg:p-24 flex flex-col items-center justify-center text-center gap-8 relative overflow-hidden backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] group">

              <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 group-hover:opacity-50 transition-opacity duration-1000 pointer-events-none"></div>

              <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 blur-[80px] transition-transform duration-1000 group-hover:translate-x-10 group-hover:translate-y-10"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/10 blur-[80px] transition-transform duration-1000 group-hover:-translate-x-10 group-hover:-translate-y-10"></div>

              <div className="w-20 h-20 rounded-3xl bg-[#0a0f1a] border border-blue-500/30 flex items-center justify-center mb-2 relative z-10 shadow-[0_0_30px_rgba(59,130,246,0.2)] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                <div className="absolute inset-0 bg-blue-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Terminal size={32} className="text-blue-400 relative z-10" />
              </div>

              <div className="flex flex-col gap-6 relative z-10 w-full max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                  I build systems where <br className="hidden lg:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">architecture</span>, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">engineering</span>, and product meet.
                </h2>
                <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                  Designed, architected, and implemented independently. Let's discuss your hardest engineering challenges.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 w-full relative z-10">

                <a href="mailto:soumikhlder@gmail.com" className="relative w-full sm:w-auto group/btn">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-50 group-hover/btn:opacity-100 transition duration-500 group-hover/btn:duration-200"></div>
                  <div className="relative w-full sm:w-auto px-10 py-4 bg-[#05070a] border border-white/10 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-3 text-base group-hover/btn:-translate-y-1">
                    <Terminal size={18} className="text-blue-400 group-hover/btn:scale-110 transition-transform" /> Discuss a Technical Challenge
                  </div>
                </a>

                <Link to="/journey" className="w-full sm:w-auto px-10 py-4 bg-white/[0.02] border border-white/10 hover:bg-white/[0.06] hover:border-white/30 text-white font-bold rounded-2xl transition-all shadow-lg text-center text-base flex items-center justify-center gap-3 backdrop-blur-md hover:-translate-y-1 group/link">
                  Explore My Engineering Journey <ArrowRight size={18} className="text-slate-500 group-hover/link:text-white group-hover/link:translate-x-1 transition-all" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </section>

      </main>
    </div>
  );
}