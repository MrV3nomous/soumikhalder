import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, ExternalLink, Activity, BrainCircuit,
  TerminalSquare, ScanEye, Orbit, Layers, Cpu,
  ShieldAlert, GitBranch, Binary, Lightbulb, Eye, Compass, Hand,
  FlaskConical, CheckCircle2, ArrowRight, Network, ArrowDown, Database, Code2, Target, XCircle,
  PlayCircle, ZoomIn, X, ChevronLeft, ChevronRight, Workflow, Lock
} from 'lucide-react';
import { projects } from '../data/projects';

export default function EngineeringLab() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const allMedia = [];
  const mediaMap = {};

  const labProjectKeys = ['qix', 'lieDetector', 'krishnaSpeaks', 'visionDetect', 'minigit', 'texasHoldem', 'universeExplorer'];

  labProjectKeys.forEach(key => {
    const p = projects[key];
    if (!p) return;

    mediaMap[key] = { diagrams: null, videos: null };

    if (p.architectureDiagrams && p.architectureDiagrams.length > 0) {
      mediaMap[key].diagrams = allMedia.length;
      p.architectureDiagrams.forEach(d => {
        allMedia.push({ type: 'image', src: d.path, title: `${p.title} - ${d.name}` });
      });
    }

    if (p.videos) {
      const startIdx = allMedia.length;
      let added = false;
      if (p.videos.demo && p.videos.demo.youtubeId) {
        allMedia.push({ type: 'video', src: p.videos.demo.youtubeId, title: `${p.title} Demo` });
        added = true;
      } else if (p.videos.scenarios) {
        p.videos.scenarios.forEach(v => {
          if (v.youtubeId) {
            allMedia.push({ type: 'video', src: v.youtubeId, title: `${p.title} - ${v.title}` });
            added = true;
          }
        });
      }
      if (added) mediaMap[key].videos = startIdx;
    }
  });

  const [activeIndex, setActiveIndex] = useState(null);
  const activeMedia = activeIndex !== null ? allMedia[activeIndex] : null;
  const [isZoomed, setIsZoomed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => { if (!isZoomed) setPanPosition({ x: 0, y: 0 }); }, [isZoomed]);

  useEffect(() => {
    if (activeMedia) document.body.style.overflow = 'hidden';
    else { document.body.style.overflow = 'unset'; setIsZoomed(false); }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveIndex(null);
      if (e.key === 'ArrowRight' && activeIndex !== null) handleNext(e);
      if (e.key === 'ArrowLeft' && activeIndex !== null) handlePrev(e);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeMedia, activeIndex]);

  const handleNext = (e) => { e?.stopPropagation(); setActiveIndex((prev) => (prev + 1) % allMedia.length); setIsZoomed(false); };
  const handlePrev = (e) => { e?.stopPropagation(); setActiveIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length); setIsZoomed(false); };

  return (
    <div className="w-full flex flex-col text-slate-200 font-sans selection:bg-blue-500/30 overflow-x-hidden relative animate-in fade-in duration-700 min-h-screen">

      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/5 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <main className="relative z-10 pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto flex flex-col gap-20 w-full">

        <section className="flex flex-col gap-6 w-full max-w-4xl">
          <div className="flex items-center gap-3 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-2 bg-cyan-500/10 w-fit px-4 py-2 rounded-full border border-cyan-500/20 shadow-inner">
            <FlaskConical size={16} /> Research Archive
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.1]">
            Engineering Lab
          </h1>
          <p className="text-lg text-slate-400 font-medium leading-relaxed mt-2">
            This is not a gallery of applications. It is a research archive of algorithmic proofs-of-concept, system-level experiments, and architectural prototypes.
          </p>
        </section>

        <section className="w-full bg-slate-900/40 border border-slate-800/60 rounded-[2.5rem] p-8 md:p-12 shadow-2xl backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none"></div>

          <div className="flex flex-col gap-2 mb-10 relative z-10">
            <h3 className="text-3xl font-black text-white tracking-tight">Engineering Journey</h3>
            <p className="text-sm text-slate-400 font-bold tracking-wide">How 6 months of isolated systems research culminated in one flagship platform.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">

            {[
              { num: "Poker", date: "January, 2026", title: "CLI State Machines", desc: "Mastering complex, probabilistic logic in pure terminal memory.", color: "emerald", icon: TerminalSquare },
              { num: "Universe", date: "February, 2026", title: "Simulation Engines", desc: "Pushing Canvas rendering and spatial culling to the architectural limit.", color: "violet", icon: Orbit },
              { num: "Vision", date: "March, 2026", title: "Browser Compute", desc: "Executing ML and TensorFlow models entirely on the client edge.", color: "cyan", icon: ScanEye },
              { num: "MiniGit", date: "April, 2026", title: "VCS Internals", desc: "Rebuilding content-addressable storage and DAG logic from scratch.", color: "amber", icon: GitBranch },
              { num: "Detector", date: "May, 2026", title: "Cognitive AI", desc: "Fusing deterministic database events with stochastic LLM analysis.", color: "fuchsia", icon: BrainCircuit },
              { num: "Qix", date: "June, 2026", title: "Zero-Knowledge", desc: "Engineering ephemeral Web Crypto encryption and high-speed Go WebSockets.", color: "blue", icon: Lock }
            ].map((phase) => (
              <div key={phase.num} className={`bg-[#05070A]/80 border border-slate-800 p-6 rounded-3xl flex flex-col gap-3 group hover:border-${phase.color}-500/40 transition-all duration-300 relative overflow-hidden shadow-lg hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.05)]`}>
                <div className={`absolute -right-1 -bottom-1 text-[70px] font-black text-white/5 select-none pointer-events-none group-hover:text-${phase.color}-500/5 transition-colors duration-500 leading-none`}>
                  {phase.num}
                </div>
                <div className="flex items-center gap-3 mb-2 relative z-10">
                  <div className={`p-2 rounded-xl bg-${phase.color}-500/10 border border-${phase.color}-500/20`}><phase.icon size={16} className={`text-${phase.color}-400`} /></div>
                  <span className={`text-${phase.color}-400 text-[10px] font-bold uppercase tracking-widest`}>{phase.date}</span>
                </div>
                <h4 className="text-xl font-bold text-white tracking-tight relative z-10">{phase.title}</h4>
                <p className="text-slate-400 text-sm font-medium leading-relaxed relative z-10">{phase.desc}</p>
              </div>
            ))}

            <div className="md:col-span-2 lg:col-span-3 bg-blue-600/10 border border-blue-500/40 p-6 lg:p-8 rounded-3xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 group transition-all duration-300 relative overflow-hidden shadow-[0_0_30px_rgba(37,99,235,0.15)] hover:bg-blue-600/20">
              <div className="absolute inset-0 bg-blue-500/20 blur-[50px] pointer-events-none"></div>
              <div className="flex flex-col gap-3 relative z-10">
                <div className="flex items-center gap-3 mb-1">
                  <div className="p-2 rounded-xl bg-blue-500/20 border border-blue-400/50"><Target size={16} className="text-white" /></div>
                  <span className="text-blue-200 text-[10px] font-bold uppercase tracking-widest">July, 2026</span>
                </div>
                <h4 className="text-2xl lg:text-3xl font-black text-white tracking-tight">DevScout Architecture</h4>
                <p className="text-blue-100/80 text-sm font-medium leading-relaxed max-w-2xl">The synthesis of 6 domains of foundational research into one cohesive enterprise-grade platform.</p>
              </div>
              <Link to="/devscout" className="relative z-10 w-fit px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap">
                View Platform <ArrowRight size={16} />
              </Link>
            </div>

          </div>
        </section>

        <section className="w-full">
          <div className="bg-blue-950/20 border border-blue-500/30 rounded-[2.5rem] p-6 md:p-8 lg:p-12 flex flex-col justify-between group hover:border-blue-500/50 transition-colors shadow-2xl overflow-hidden relative">
            <div className="absolute -right-20 -top-20 opacity-10 pointer-events-none"><Network size={300} /></div>

            <div className="flex flex-col gap-8 z-10 w-full">

              <div className="flex items-start justify-between flex-col lg:flex-row gap-6 w-full">
                <div className="flex flex-col gap-4">
                  <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight flex items-center gap-5">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-blue-500/20 border border-blue-400/50 flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.4)] relative z-10 p-3">
                      <img src="/devscoutlightlogo.png" alt="DevScout Logo" className="w-full h-full object-contain opacity-90 drop-shadow-md" />
                    </div>
                    DevScout
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-3 py-1.5 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded text-[10px] font-bold uppercase tracking-widest">Flagship Production System</span>
                    <span className="px-3 py-1.5 bg-slate-900 border border-slate-700 text-slate-300 rounded text-[10px] font-bold uppercase tracking-widest">Decision Intelligence</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-5 items-center bg-slate-950/50 p-5 rounded-2xl border border-slate-800/60 w-full lg:w-auto shadow-inner">
                  <div className="flex flex-col gap-1"><span className="text-slate-500 text-[9px] font-bold uppercase tracking-widest">Complexity</span><span className="text-white text-sm font-bold tracking-wide">Enterprise</span></div>
                  <div className="hidden sm:block w-[2px] h-8 bg-slate-800"></div>
                  <div className="flex flex-col gap-1"><span className="text-slate-500 text-[9px] font-bold uppercase tracking-widest">Scale</span><span className="text-white text-sm font-bold tracking-wide">Full-Stack Platform</span></div>
                  <div className="hidden sm:block w-[2px] h-8 bg-slate-800"></div>
                  <div className="flex flex-col gap-1"><span className="text-slate-500 text-[9px] font-bold uppercase tracking-widest">Core Modules</span><span className="text-white text-sm font-bold tracking-wide">7 Systems</span></div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                <div className="bg-slate-950/60 p-6 rounded-2xl border border-slate-800/50 flex flex-col gap-2">
                  <span className="text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-1">Engineering Goal</span>
                  <p className="text-sm text-slate-300 leading-relaxed font-medium">Synthesize local-first data parsing, state-machine logic, and deterministic AI scoring into a single, cohesive ecosystem for hiring intelligence.</p>
                </div>
                <div className="bg-slate-950/60 p-6 rounded-2xl border border-slate-800/50 flex flex-col gap-2">
                  <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-1">Key Outcome</span>
                  <p className="text-sm text-slate-300 leading-relaxed font-medium">Successfully abstracted the hiring lifecycle into a rigid, auditable 5-step pipeline tracking human telemetry deterministically.</p>
                </div>
                <div className="bg-blue-900/20 p-6 rounded-2xl border border-blue-500/20 flex flex-col gap-2">
                  <span className="text-blue-300 text-[10px] font-bold uppercase tracking-widest mb-1">Unexpected Discovery</span>
                  <p className="text-sm text-blue-100/90 leading-relaxed italic font-medium">Candidate ranking wasn't the difficult part. Preserving complex decision context across asynchronous hiring cycles without state desynchronization was.</p>
                </div>
              </div>

              <div className="flex justify-end mt-4 pt-8 border-t border-slate-800/60">
                <Link to="/devscout" className="flex items-center justify-center w-full md:w-auto gap-3 px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-950">
                  Read Full Architecture Case Study <ArrowRight size={18} />
                </Link>
              </div>

            </div>
          </div>
        </section>

        <section className="flex flex-col gap-10 w-full pt-12">
          <div className="flex flex-col gap-2 border-b border-slate-800/60 pb-6">
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight flex items-center gap-4">
              <FlaskConical className="text-indigo-400" size={32} /> Foundational Research
            </h2>
            <p className="text-slate-400 text-sm font-bold tracking-wide">The underlying systems studies that formulated the blueprint for DevScout.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <div className="bg-slate-900/40 border border-slate-800/60 rounded-[2rem] p-6 lg:p-8 flex flex-col gap-6 group hover:border-blue-500/40 transition-colors shadow-xl">
              <div className="flex items-start justify-between flex-col xl:flex-row gap-5">
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-black text-white tracking-tight">{projects.qix?.title || 'Qix'}</h3>
                  <div className="flex gap-2 mt-1">
                    <span className="px-2.5 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded text-[10px] font-bold uppercase tracking-widest">Systems Architecture</span>
                    <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 text-slate-300 rounded text-[10px] font-bold uppercase tracking-widest">Go / React</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 items-center bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <a href={projects.qix?.github} target="_blank" rel="noreferrer" aria-label="View Source on GitHub" className="px-3 py-1 text-slate-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-md"><Code2 size={20} /></a>
                  <div className="w-[2px] h-6 bg-slate-800"></div>
                  <a href={projects.qix?.liveUrl} target="_blank" rel="noreferrer" aria-label="Visit Live URL" className="px-3 py-1 text-slate-400 hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-md"><ExternalLink size={20} /></a>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 text-[11px] font-bold tracking-wide text-slate-400 bg-slate-950/50 p-5 rounded-2xl border border-slate-800">
                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-500 shrink-0" /> Zero-knowledge encryption</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-500 shrink-0" /> URL fragment key passing</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-500 shrink-0" /> Blind WebSocket routing</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-500 shrink-0" /> Ephemeral data lifecycles</span>
              </div>

              {(mediaMap.qix?.diagrams !== null || mediaMap.qix?.videos !== null) && (
                <div className="flex flex-wrap gap-3">
                  {mediaMap.qix?.diagrams !== null && (
                    <button onClick={() => setActiveIndex(mediaMap.qix.diagrams)} className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 hover:bg-blue-500/20 rounded-xl text-[11px] font-bold text-blue-400 uppercase tracking-widest transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                      <Network size={14} /> Architecture Details
                    </button>
                  )}
                  {mediaMap.qix?.videos !== null && (
                    <button onClick={() => setActiveIndex(mediaMap.qix.videos)} className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 hover:bg-blue-500/20 rounded-xl text-[11px] font-bold text-blue-400 uppercase tracking-widest transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                      <PlayCircle size={14} /> Watch Demo
                    </button>
                  )}
                </div>
              )}

              <div className="flex flex-col gap-5 mt-auto border-t border-slate-800/60 pt-6">
                <div>
                  <span className="text-blue-400 text-[10px] font-bold uppercase tracking-widest block mb-2">Research Question</span>
                  <p className="text-sm text-slate-300 leading-relaxed font-medium">How do you architect a secure communication layer where the central routing server is mathematically incapable of reading the payloads it transmits?</p>
                </div>
                <div className="bg-slate-950/50 p-5 rounded-xl border border-slate-800">
                  <span className="text-amber-400 text-[10px] font-bold uppercase tracking-widest block mb-2">Unexpected Discovery</span>
                  <p className="text-sm text-amber-100/80 leading-relaxed italic font-medium">Encryption wasn't the hard part, key distribution was. Exploiting the W3C specification where URL hash fragments are never sent to the server solved the zero-knowledge constraint perfectly.</p>
                </div>
                <div className="bg-blue-900/10 p-5 rounded-xl border border-blue-500/20 flex items-start gap-4">
                  <Activity size={20} className="text-blue-500 shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-blue-400 text-[10px] font-bold uppercase tracking-widest block mb-1.5">Architectural Lesson</span>
                    <span className="text-sm text-blue-200/90 font-medium leading-relaxed">Solidified the decoupled, zero-trust WebSocket patterns used for real-time state synchronization in DevScout.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/40 border border-slate-800/60 rounded-[2rem] p-6 lg:p-8 flex flex-col gap-6 group hover:border-emerald-500/40 transition-colors shadow-xl">
              <div className="flex items-start justify-between flex-col xl:flex-row gap-5">
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-black text-white tracking-tight">MiniGit</h3>
                  <div className="flex gap-2 mt-1">
                    <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-[10px] font-bold uppercase tracking-widest">Systems Study</span>
                    <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 text-slate-300 rounded text-[10px] font-bold uppercase tracking-widest">Java</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 items-center bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div className="flex flex-col px-3 border-r border-slate-800"><span className="text-slate-500 text-[9px] font-bold uppercase tracking-widest">Scale</span><span className="text-slate-300 font-bold tracking-wide text-xs mt-1">~4k LOC</span></div>
                  <Link to="/minigit" className="px-3 text-blue-400 hover:text-blue-300 font-bold text-xs flex items-center gap-1 transition-colors focus:outline-none focus:underline">Study <ExternalLink size={14} /></Link>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 text-[11px] font-bold tracking-wide text-slate-400 bg-slate-950/50 p-5 rounded-2xl border border-slate-800">
                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500 shrink-0" /> Immutable object store</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500 shrink-0" /> Commit DAG traversal</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500 shrink-0" /> Branch ref management</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500 shrink-0" /> Zlib compression</span>
              </div>

              {(mediaMap.minigit?.diagrams !== null || mediaMap.minigit?.videos !== null) && (
                <div className="flex flex-wrap gap-3">
                  {mediaMap.minigit?.diagrams !== null && (
                    <button onClick={() => setActiveIndex(mediaMap.minigit.diagrams)} className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 rounded-xl text-[11px] font-bold text-emerald-400 uppercase tracking-widest transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/50">
                      <Network size={14} /> Architecture Details
                    </button>
                  )}
                  {mediaMap.minigit?.videos !== null && (
                    <button onClick={() => setActiveIndex(mediaMap.minigit.videos)} className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 rounded-xl text-[11px] font-bold text-emerald-400 uppercase tracking-widest transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/50">
                      <PlayCircle size={14} /> Watch Demo
                    </button>
                  )}
                </div>
              )}

              <div className="flex flex-col gap-5 mt-auto border-t border-slate-800/60 pt-6">
                <div>
                  <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest block mb-2">Research Question</span>
                  <p className="text-sm text-slate-300 leading-relaxed font-medium">Can Git's content-addressable storage model be recreated from first principles using only raw filesystem primitives and Java?</p>
                </div>
                <div className="bg-slate-950/50 p-5 rounded-xl border border-slate-800">
                  <span className="text-amber-400 text-[10px] font-bold uppercase tracking-widest block mb-2">Unexpected Discovery</span>
                  <p className="text-sm text-amber-100/80 leading-relaxed italic font-medium">Recreating object storage was highly straightforward. The true algorithmic complexity emerged entirely from commit DAG traversal and reference management.</p>
                </div>
                <div className="bg-blue-900/10 p-5 rounded-xl border border-blue-500/20 flex items-start gap-4">
                  <Activity size={20} className="text-blue-500 shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-blue-400 text-[10px] font-bold uppercase tracking-widest block mb-1.5">Architectural Lesson</span>
                    <span className="text-sm text-blue-200/90 font-medium leading-relaxed">Influenced the immutable, append-only event tracking logic used inside DevScout's <strong className="text-blue-300">Decision Memory</strong> module.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/40 border border-slate-800/60 rounded-[2rem] p-6 lg:p-8 flex flex-col gap-6 group hover:border-fuchsia-500/40 transition-colors shadow-xl">
              <div className="flex items-start justify-between flex-col xl:flex-row gap-5">
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-black text-white tracking-tight">{projects.lieDetector?.title || 'Lie Detector Pro'}</h3>
                  <div className="flex gap-2 mt-1">
                    <span className="px-2.5 py-1 bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20 rounded text-[10px] font-bold uppercase tracking-widest">Engineering Investigation</span>
                    <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 text-slate-300 rounded text-[10px] font-bold uppercase tracking-widest">Cognitive AI</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 items-center bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <a href={projects.lieDetector?.github} target="_blank" rel="noreferrer" aria-label="View Source on GitHub" className="px-3 py-1 text-slate-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 rounded-md"><Code2 size={20} /></a>
                  <div className="w-[2px] h-6 bg-slate-800"></div>
                  <a href={projects.lieDetector?.liveUrl} target="_blank" rel="noreferrer" aria-label="Visit Live URL" className="px-3 py-1 text-slate-400 hover:text-fuchsia-400 transition-colors focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 rounded-md"><ExternalLink size={20} /></a>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 text-[11px] font-bold tracking-wide text-slate-400 bg-slate-950/50 p-5 rounded-2xl border border-slate-800">
                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-fuchsia-500 shrink-0" /> Zero-trust architecture</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-fuchsia-500 shrink-0" /> PL/pgSQL event triggers</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-fuchsia-500 shrink-0" /> Real-time state syncing</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-fuchsia-500 shrink-0" /> Edge function AI routing</span>
              </div>

              {(mediaMap.lieDetector?.diagrams !== null || mediaMap.lieDetector?.videos !== null) && (
                <div className="flex flex-wrap gap-3">
                  {mediaMap.lieDetector?.diagrams !== null && (
                    <button onClick={() => setActiveIndex(mediaMap.lieDetector.diagrams)} className="flex items-center gap-2 px-4 py-2 bg-fuchsia-500/10 border border-fuchsia-500/30 hover:bg-fuchsia-500/20 rounded-xl text-[11px] font-bold text-fuchsia-400 uppercase tracking-widest transition-all focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50">
                      <Network size={14} /> Architecture Details
                    </button>
                  )}
                  {mediaMap.lieDetector?.videos !== null && (
                    <button onClick={() => setActiveIndex(mediaMap.lieDetector.videos)} className="flex items-center gap-2 px-4 py-2 bg-fuchsia-500/10 border border-fuchsia-500/30 hover:bg-fuchsia-500/20 rounded-xl text-[11px] font-bold text-fuchsia-400 uppercase tracking-widest transition-all focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50">
                      <PlayCircle size={14} /> Watch Demo
                    </button>
                  )}
                </div>
              )}

              <div className="flex flex-col gap-5 mt-auto border-t border-slate-800/60 pt-6">
                <div>
                  <span className="text-fuchsia-400 text-[10px] font-bold uppercase tracking-widest block mb-2">Hypothesis</span>
                  <p className="text-sm text-slate-300 leading-relaxed font-medium">Can deterministic database-level triggers evaluate human behavior alongside stochastic LLM semantic analysis in real-time?</p>
                </div>
                <div className="bg-slate-950/50 p-5 rounded-xl border border-slate-800">
                  <span className="text-amber-400 text-[10px] font-bold uppercase tracking-widest block mb-2">Unexpected Discovery</span>
                  <p className="text-sm text-amber-100/80 leading-relaxed italic font-medium">Evaluating behavior wasn't the hardest part. Synchronizing hard database events with slow, stochastic AI output across an active UI was the true challenge.</p>
                </div>
                <div className="bg-blue-900/10 p-5 rounded-xl border border-blue-500/20 flex items-start gap-4">
                  <Activity size={20} className="text-blue-500 shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-blue-400 text-[10px] font-bold uppercase tracking-widest block mb-1.5">Production Adoption</span>
                    <span className="text-sm text-blue-200/90 font-medium leading-relaxed">Directly spawned DevScout's <strong className="text-blue-300">TruthScore Architecture</strong> and audio-evaluation pipelines.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/40 border border-slate-800/60 rounded-[2rem] p-6 lg:p-8 flex flex-col gap-6 group hover:border-cyan-500/40 transition-colors shadow-xl">
              <div className="flex items-start justify-between flex-col xl:flex-row gap-5">
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-black text-white tracking-tight">{projects.visionDetect?.title || 'VisionDetect'}</h3>
                  <div className="flex gap-2 mt-1">
                    <span className="px-2.5 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded text-[10px] font-bold uppercase tracking-widest">Architectural Prototype</span>
                    <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 text-slate-300 rounded text-[10px] font-bold uppercase tracking-widest">Browser Compute</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 items-center bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <a href={projects.visionDetect?.github} target="_blank" rel="noreferrer" aria-label="View Source on GitHub" className="px-3 py-1 text-slate-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500/50 rounded-md"><Code2 size={20} /></a>
                  <div className="w-[2px] h-6 bg-slate-800"></div>
                  <a href={projects.visionDetect?.liveUrl} target="_blank" rel="noreferrer" aria-label="Visit Live URL" className="px-3 py-1 text-slate-400 hover:text-cyan-400 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500/50 rounded-md"><ExternalLink size={20} /></a>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 text-[11px] font-bold tracking-wide text-slate-400 bg-slate-950/50 p-5 rounded-2xl border border-slate-800">
                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-cyan-500 shrink-0" /> Real-time COCO-SSD</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-cyan-500 shrink-0" /> Browser-only inference</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-cyan-500 shrink-0" /> Zero backend required</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-cyan-500 shrink-0" /> Garbage collection tuning</span>
              </div>

              {(mediaMap.visionDetect?.diagrams !== null || mediaMap.visionDetect?.videos !== null) && (
                <div className="flex flex-wrap gap-3">
                  {mediaMap.visionDetect?.diagrams !== null && (
                    <button onClick={() => setActiveIndex(mediaMap.visionDetect.diagrams)} className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 rounded-xl text-[11px] font-bold text-cyan-400 uppercase tracking-widest transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500/50">
                      <Network size={14} /> Architecture Details
                    </button>
                  )}
                  {mediaMap.visionDetect?.videos !== null && (
                    <button onClick={() => setActiveIndex(mediaMap.visionDetect.videos)} className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 rounded-xl text-[11px] font-bold text-cyan-400 uppercase tracking-widest transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500/50">
                      <PlayCircle size={14} /> Watch Demo
                    </button>
                  )}
                </div>
              )}

              <div className="flex flex-col gap-5 mt-auto border-t border-slate-800/60 pt-6">
                <div>
                  <span className="text-cyan-400 text-[10px] font-bold uppercase tracking-widest block mb-2">Challenge</span>
                  <p className="text-sm text-slate-300 leading-relaxed font-medium">Can TensorFlow.js execute complex COCO-SSD object detection continuously over a live webcam stream without a backend server?</p>
                </div>
                <div className="bg-slate-950/50 p-5 rounded-xl border border-slate-800">
                  <span className="text-amber-400 text-[10px] font-bold uppercase tracking-widest block mb-2">Bottleneck</span>
                  <p className="text-sm text-amber-100/80 leading-relaxed italic font-medium">Browser inference itself was blazing fast. The dominant performance killer was actually JavaScript's memory garbage collection dropping frames.</p>
                </div>
                <div className="bg-blue-900/10 p-5 rounded-xl border border-blue-500/20 flex items-start gap-4">
                  <Activity size={20} className="text-blue-500 shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-blue-400 text-[10px] font-bold uppercase tracking-widest block mb-1.5">Reusable Pattern</span>
                    <span className="text-sm text-blue-200/90 font-medium leading-relaxed">Proved viability for <strong className="text-blue-300">Client-Side Analytics</strong> parsing before sending payloads to Edge.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/40 border border-slate-800/60 rounded-[2rem] p-6 lg:p-8 flex flex-col gap-6 group hover:border-amber-500/40 transition-colors shadow-xl">
              <div className="flex items-start justify-between flex-col xl:flex-row gap-5">
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-black text-white tracking-tight">{projects.krishnaSpeaks?.title || 'KrishnaSpeaks'}</h3>
                  <div className="flex gap-2 mt-1">
                    <span className="px-2.5 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded text-[10px] font-bold uppercase tracking-widest">Research Experiment</span>
                    <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 text-slate-300 rounded text-[10px] font-bold uppercase tracking-widest">Knowledge Systems</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 items-center bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <a href={projects.krishnaSpeaks?.github} target="_blank" rel="noreferrer" aria-label="View Source on GitHub" className="px-3 py-1 text-slate-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/50 rounded-md"><Code2 size={20} /></a>
                  <div className="w-[2px] h-6 bg-slate-800"></div>
                  <a href={projects.krishnaSpeaks?.liveUrl} target="_blank" rel="noreferrer" aria-label="Visit Live URL" className="px-3 py-1 text-slate-400 hover:text-amber-400 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/50 rounded-md"><ExternalLink size={20} /></a>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 text-[11px] font-bold tracking-wide text-slate-400 bg-slate-950/50 p-5 rounded-2xl border border-slate-800">
                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-500 shrink-0" /> Decoupled knowledge base</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-500 shrink-0" /> Terminal CLI client</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-500 shrink-0" /> React/Web client</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-500 shrink-0" /> Java Swing client</span>
              </div>

              {(mediaMap.krishnaSpeaks?.diagrams !== null || mediaMap.krishnaSpeaks?.videos !== null) && (
                <div className="flex flex-wrap gap-3">
                  {mediaMap.krishnaSpeaks?.diagrams !== null && (
                    <button onClick={() => setActiveIndex(mediaMap.krishnaSpeaks.diagrams)} className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 rounded-xl text-[11px] font-bold text-amber-400 uppercase tracking-widest transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/50">
                      <Network size={14} /> Architecture Details
                    </button>
                  )}
                  {mediaMap.krishnaSpeaks?.videos !== null && (
                    <button onClick={() => setActiveIndex(mediaMap.krishnaSpeaks.videos)} className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 rounded-xl text-[11px] font-bold text-amber-400 uppercase tracking-widest transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/50">
                      <PlayCircle size={14} /> Watch Demo
                    </button>
                  )}
                </div>
              )}

              <div className="flex flex-col gap-5 mt-auto border-t border-slate-800/60 pt-6">
                <div>
                  <span className="text-amber-400 text-[10px] font-bold uppercase tracking-widest block mb-2">Goal</span>
                  <p className="text-sm text-slate-300 leading-relaxed font-medium">How do we architect a single semantic knowledge base that seamlessly interoperates across Java Desktop, Web React, and CLI endpoints?</p>
                </div>
                <div className="bg-slate-950/50 p-5 rounded-xl border border-slate-800">
                  <span className="text-amber-400 text-[10px] font-bold uppercase tracking-widest block mb-2">Insight</span>
                  <p className="text-sm text-amber-100/80 leading-relaxed italic font-medium">Decoupling the knowledge base revealed that dynamic context-injection latency was a much larger user-experience bottleneck than the actual LLM inference.</p>
                </div>
                <div className="bg-blue-900/10 p-5 rounded-xl border border-blue-500/20 flex items-start gap-4">
                  <Activity size={20} className="text-blue-500 shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-blue-400 text-[10px] font-bold uppercase tracking-widest block mb-1.5">System Blueprint</span>
                    <span className="text-sm text-blue-200/90 font-medium leading-relaxed">Became the foundation for DevScout's <strong className="text-blue-300">Context-Aware AI Orchestrator</strong>.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/40 border border-slate-800/60 rounded-[2rem] p-6 lg:p-8 flex flex-col gap-6 group hover:border-emerald-500/40 transition-colors shadow-xl">
              <div className="flex items-start justify-between flex-col xl:flex-row gap-5">
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-black text-white tracking-tight">{projects.texasHoldem?.title || "Texas Hold'em CLI"}</h3>
                  <div className="flex gap-2 mt-1">
                    <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-[10px] font-bold uppercase tracking-widest">Architectural Prototype</span>
                    <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 text-slate-300 rounded text-[10px] font-bold uppercase tracking-widest">State Machines</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 items-center bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <a href={projects.texasHoldem?.github} target="_blank" rel="noreferrer" aria-label="View Source on GitHub" className="px-3 py-1 text-slate-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/50 rounded-md"><Code2 size={20} /></a>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 text-[11px] font-bold tracking-wide text-slate-400 bg-slate-950/50 p-5 rounded-2xl border border-slate-800">
                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500 shrink-0" /> OOP state transitions</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500 shrink-0" /> Probabilistic AI</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500 shrink-0" /> Multi-round pot tracking</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500 shrink-0" /> Pure CLI execution</span>
              </div>

              {(mediaMap.texasHoldem?.diagrams !== null || mediaMap.texasHoldem?.videos !== null) && (
                <div className="flex flex-wrap gap-3">
                  {mediaMap.texasHoldem?.diagrams !== null && (
                    <button onClick={() => setActiveIndex(mediaMap.texasHoldem.diagrams)} className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 rounded-xl text-[11px] font-bold text-emerald-400 uppercase tracking-widest transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/50">
                      <Network size={14} /> Architecture Details
                    </button>
                  )}
                  {mediaMap.texasHoldem?.videos !== null && (
                    <button onClick={() => setActiveIndex(mediaMap.texasHoldem.videos)} className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 rounded-xl text-[11px] font-bold text-emerald-400 uppercase tracking-widest transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/50">
                      <PlayCircle size={14} /> Watch Demo
                    </button>
                  )}
                </div>
              )}

              <div className="flex flex-col gap-5 mt-auto border-t border-slate-800/60 pt-6">
                <div>
                  <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest block mb-2">Research Question</span>
                  <p className="text-sm text-slate-300 leading-relaxed font-medium">Can complex, probabilistic multi-round betting logic be modeled strictly using object-oriented terminal state machines?</p>
                </div>
                <div className="bg-slate-950/50 p-5 rounded-xl border border-slate-800">
                  <span className="text-amber-400 text-[10px] font-bold uppercase tracking-widest block mb-2">Unexpected Discovery</span>
                  <p className="text-sm text-amber-100/80 leading-relaxed italic font-medium">Terminal interfaces mask complexity. Managing pure CLI state transitions without React UI wrappers forced significantly tighter and cleaner data models.</p>
                </div>
                <div className="bg-blue-900/10 p-5 rounded-xl border border-blue-500/20 flex items-start gap-4">
                  <Activity size={20} className="text-blue-500 shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-blue-400 text-[10px] font-bold uppercase tracking-widest block mb-1.5">Core Methodology</span>
                    <span className="text-sm text-blue-200/90 font-medium leading-relaxed">Directly translated to the <strong className="text-blue-300">Strict State Machine Pipeline</strong> in Dispatch Terminal.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/40 border border-slate-800/60 rounded-[2rem] p-6 lg:p-8 flex flex-col gap-6 group hover:border-violet-500/40 transition-colors shadow-xl">
              <div className="flex items-start justify-between flex-col xl:flex-row gap-5">
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-black text-white tracking-tight">{projects.universeExplorer?.title || 'Universe Explorer'}</h3>
                  <div className="flex gap-2 mt-1">
                    <span className="px-2.5 py-1 bg-violet-500/10 text-violet-400 border border-violet-500/20 rounded text-[10px] font-bold uppercase tracking-widest">Engineering Investigation</span>
                    <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 text-slate-300 rounded text-[10px] font-bold uppercase tracking-widest">Simulation</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 items-center bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <a href={projects.universeExplorer?.github} target="_blank" rel="noreferrer" aria-label="View Source on GitHub" className="px-3 py-1 text-slate-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500/50 rounded-md"><Code2 size={20} /></a>
                  <div className="w-[2px] h-6 bg-slate-800"></div>
                  <a href={projects.universeExplorer?.liveUrl} target="_blank" rel="noreferrer" aria-label="Visit Live URL" className="px-3 py-1 text-slate-400 hover:text-violet-400 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500/50 rounded-md"><ExternalLink size={20} /></a>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 text-[11px] font-bold tracking-wide text-slate-400 bg-slate-950/50 p-5 rounded-2xl border border-slate-800">
                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-violet-500 shrink-0" /> Canvas procedural rendering</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-violet-500 shrink-0" /> Seeded noise generation</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-violet-500 shrink-0" /> Spatial culling</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-violet-500 shrink-0" /> DeltaTime physics</span>
              </div>

              {(mediaMap.universeExplorer?.diagrams !== null || mediaMap.universeExplorer?.videos !== null) && (
                <div className="flex flex-wrap gap-3">
                  {mediaMap.universeExplorer?.diagrams !== null && (
                    <button onClick={() => setActiveIndex(mediaMap.universeExplorer.diagrams)} className="flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/30 hover:bg-violet-500/20 rounded-xl text-[11px] font-bold text-violet-400 uppercase tracking-widest transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/50">
                      <Network size={14} /> Architecture Details
                    </button>
                  )}
                  {mediaMap.universeExplorer?.videos !== null && (
                    <button onClick={() => setActiveIndex(mediaMap.universeExplorer.videos)} className="flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/30 hover:bg-violet-500/20 rounded-xl text-[11px] font-bold text-violet-400 uppercase tracking-widest transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/50">
                      <PlayCircle size={14} /> Watch Demo
                    </button>
                  )}
                </div>
              )}

              <div className="flex flex-col gap-5 mt-auto border-t border-slate-800/60 pt-6">
                <div>
                  <span className="text-violet-400 text-[10px] font-bold uppercase tracking-widest block mb-2">Challenge</span>
                  <p className="text-sm text-slate-300 leading-relaxed font-medium">Can an infinite, deterministic 2D universe be procedurally generated and rendered synchronously using only raw HTML5 Canvas and seeded noise?</p>
                </div>
                <div className="bg-slate-950/50 p-5 rounded-xl border border-slate-800">
                  <span className="text-amber-400 text-[10px] font-bold uppercase tracking-widest block mb-2">Unexpected Discovery</span>
                  <p className="text-sm text-amber-100/80 leading-relaxed italic font-medium">Canvas rendering is computationally cheap. Rapid spatial culling and math-heavy noise-function hashing are where the CPU actually bottlenecks.</p>
                </div>
                <div className="bg-blue-900/10 p-5 rounded-xl border border-blue-500/20 flex items-start gap-4">
                  <Activity size={20} className="text-blue-500 shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-blue-400 text-[10px] font-bold uppercase tracking-widest block mb-1.5">Research Outcome</span>
                    <span className="text-sm text-blue-200/90 font-medium leading-relaxed">Guided the <strong className="text-blue-300">Spatial Data Indexing</strong> logic for dynamic UI visualizers.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>


        <section className="w-full pt-16 border-t border-slate-800/60 mt-8">
          <div className="bg-[#0a0505]/50 border border-rose-900/30 rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-2xl backdrop-blur-sm">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-rose-600/5 blur-[150px] rounded-full pointer-events-none"></div>

            <div className="flex flex-col lg:flex-row gap-16 relative z-10">

              <div className="flex flex-col w-full lg:w-1/3">
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-2 text-rose-500 text-[10px] font-bold uppercase tracking-widest mb-1 bg-rose-500/10 w-fit px-4 py-2 rounded-full border border-rose-500/20 shadow-inner">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                    Discarded Prototypes
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                    Research<br />Dead Ends
                  </h3>
                  <p className="text-slate-400 text-base leading-relaxed mt-2 font-medium">
                    Several architectures were intentionally built and abandoned. These failures exposed the bottlenecks that eventually governed DevScout's strict constraints.
                  </p>
                </div>

                <div className="mt-10 pt-10 border-t border-white/5">
                  <span className="text-slate-500 text-xs font-bold uppercase tracking-widest block mb-6">Post-Mortem Yield</span>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-5xl font-black text-rose-100/90 tracking-tighter">300</span>
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">Scrapped<br />Architectures</span>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-5xl font-black text-emerald-400/90 tracking-tighter">100<span className="text-2xl text-emerald-400/50">%</span></span>
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">Compute<br />Offloaded</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="relative overflow-hidden bg-[#050505] border border-white/5 p-8 rounded-3xl flex flex-col gap-4 group hover:border-rose-500/30 transition-all duration-300 hover:shadow-[0_0_40px_rgba(225,29,72,0.1)]">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-rose-500/50 text-[10px] font-bold uppercase tracking-widest">Architecture 01</span>
                    <span className="text-rose-100 font-black text-lg line-through decoration-rose-500/60 decoration-2 group-hover:text-white transition-colors">Full ATS Architecture</span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed font-medium">Building an Applicant Tracking System resulted in too much CRUD and not enough intelligence.</p>
                  <div className="mt-auto pt-6 border-t border-white/5 flex items-center gap-3">
                    <div className="p-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      <ArrowRight size={14} className="text-emerald-400" />
                    </div>
                    <span className="text-emerald-400 text-[10px] uppercase tracking-widest font-bold">Pivot: Evaluation Engine</span>
                  </div>
                </div>

                <div className="relative overflow-hidden bg-[#050505] border border-white/5 p-8 rounded-3xl flex flex-col gap-4 group hover:border-rose-500/30 transition-all duration-300 hover:shadow-[0_0_40px_rgba(225,29,72,0.1)]">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-rose-500/50 text-[10px] font-bold uppercase tracking-widest">Architecture 02</span>
                    <span className="text-rose-100 font-black text-lg line-through decoration-rose-500/60 decoration-2 group-hover:text-white transition-colors">Continuous AI Scoring</span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed font-medium">Running LLM evals on every tiny state change resulted in massive token waste and unbearable latency.</p>
                  <div className="mt-auto pt-6 border-t border-white/5 flex items-center gap-3">
                    <div className="p-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      <ArrowRight size={14} className="text-emerald-400" />
                    </div>
                    <span className="text-emerald-400 text-[10px] uppercase tracking-widest font-bold">Pivot: Discrete Checkpoints</span>
                  </div>
                </div>

                <div className="md:col-span-2 relative overflow-hidden bg-[#050505] border border-white/5 p-8 rounded-3xl flex flex-col gap-4 group hover:border-rose-500/30 transition-all duration-300 hover:shadow-[0_0_40px_rgba(225,29,72,0.1)]">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-rose-500/50 text-[10px] font-bold uppercase tracking-widest">Architecture 03</span>
                    <span className="text-rose-100 font-black text-lg line-through decoration-rose-500/60 decoration-2 group-hover:text-white transition-colors">Browser-Side Resume OCR</span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-3xl font-medium">Pushing Tesseract.js into the browser to parse PDFs completely froze the main thread and ruined the user experience. The client simply couldn't handle the memory spikes.</p>
                  <div className="mt-auto pt-6 border-t border-white/5 flex items-center gap-3">
                    <div className="p-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      <ArrowRight size={14} className="text-emerald-400" />
                    </div>
                    <span className="text-emerald-400 text-[10px] uppercase tracking-widest font-bold">Pivot: Edge Function Delegation</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-12 w-full pt-20 border-t border-slate-800/60 mt-12 relative">
          <div className="flex flex-col gap-4 items-center text-center mb-4">
            <span className="text-indigo-400 text-xs font-bold uppercase tracking-widest bg-indigo-500/10 px-5 py-2 rounded-full border border-indigo-500/20 shadow-inner">
              The Architecture Manifesto
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">Core Principles</h2>
            <p className="text-slate-400 text-base max-w-xl font-medium">The recurring design philosophies embedded across all DevScout prototypes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 w-full z-10 text-sm">

            <div className="lg:col-span-2 md:col-span-1 relative overflow-hidden bg-gradient-to-b from-slate-900/60 to-slate-950/60 p-8 rounded-[2.5rem] border border-white/5 group hover:border-indigo-500/30 transition-all duration-500 flex flex-col gap-6 hover:-translate-y-1 hover:shadow-[0_15px_50px_-10px_rgba(99,102,241,0.15)]">
              <div className="absolute -top-4 -right-2 text-[75px] font-black text-white/5 select-none pointer-events-none group-hover:text-indigo-500/5 transition-colors duration-500 leading-none">INIT</div>
              <div className="p-3 bg-indigo-500/10 rounded-2xl w-fit border border-indigo-500/20 relative z-10 shadow-inner"><Binary size={24} className="text-indigo-400" /></div>
              <span className="text-slate-200 leading-relaxed font-bold relative z-10 text-lg">Build the primitive before utilizing the abstraction.</span>
            </div>

            <div className="lg:col-span-2 md:col-span-1 relative overflow-hidden bg-gradient-to-b from-slate-900/60 to-slate-950/60 p-8 rounded-[2.5rem] border border-white/5 group hover:border-indigo-500/30 transition-all duration-500 flex flex-col gap-6 hover:-translate-y-1 hover:shadow-[0_15px_50px_-10px_rgba(99,102,241,0.15)]">
              <div className="absolute -top-4 -right-2 text-[75px] font-black text-white/5 select-none pointer-events-none group-hover:text-indigo-500/5 transition-colors duration-500 leading-none">LOG</div>
              <div className="p-3 bg-indigo-500/10 rounded-2xl w-fit border border-indigo-500/20 relative z-10 shadow-inner"><Database size={24} className="text-indigo-400" /></div>
              <span className="text-slate-200 leading-relaxed font-bold relative z-10 text-lg">Prefer immutable history and event-sourcing over mutable state.</span>
            </div>

            <div className="lg:col-span-2 md:col-span-2 relative overflow-hidden bg-gradient-to-b from-slate-900/60 to-slate-950/60 p-8 rounded-[2.5rem] border border-white/5 group hover:border-indigo-500/30 transition-all duration-500 flex flex-col gap-6 hover:-translate-y-1 hover:shadow-[0_15px_50px_-10px_rgba(99,102,241,0.15)]">
              <div className="absolute -top-4 -right-2 text-[75px] font-black text-white/5 select-none pointer-events-none group-hover:text-indigo-500/5 transition-colors duration-500 leading-none">FLOW</div>
              <div className="p-3 bg-indigo-500/10 rounded-2xl w-fit border border-indigo-500/20 relative z-10 shadow-inner"><Network size={24} className="text-indigo-400" /></div>
              <span className="text-slate-200 leading-relaxed font-bold relative z-10 text-lg">Model complex workflows strictly as explicit state transitions.</span>
            </div>

            <div className="lg:col-span-3 md:col-span-1 relative overflow-hidden bg-gradient-to-b from-slate-900/60 to-slate-950/60 p-10 rounded-[2.5rem] border border-white/5 group hover:border-indigo-500/30 transition-all duration-500 flex flex-col gap-6 hover:-translate-y-1 hover:shadow-[0_15px_50px_-10px_rgba(99,102,241,0.15)]">
              <div className="absolute -top-4 -right-2 text-[75px] font-black text-white/5 select-none pointer-events-none group-hover:text-indigo-500/5 transition-colors duration-500 leading-none">THINK</div>
              <div className="p-4 bg-indigo-500/10 rounded-2xl w-fit border border-indigo-500/20 relative z-10 shadow-inner"><BrainCircuit size={28} className="text-indigo-400" /></div>
              <span className="text-slate-200 leading-relaxed font-bold relative z-10 text-xl max-w-xs">Separate deterministic core logic from probabilistic AI wrappers.</span>
            </div>

            <div className="lg:col-span-3 md:col-span-1 relative overflow-hidden bg-gradient-to-b from-slate-900/60 to-slate-950/60 p-10 rounded-[2.5rem] border border-white/5 group hover:border-indigo-500/30 transition-all duration-500 flex flex-col gap-6 hover:-translate-y-1 hover:shadow-[0_15px_50px_-10px_rgba(99,102,241,0.15)]">
              <div className="absolute -top-4 -right-2 text-[75px] font-black text-white/5 select-none pointer-events-none group-hover:text-indigo-500/5 transition-colors duration-500 leading-none">RECOVER</div>
              <div className="p-4 bg-indigo-500/10 rounded-2xl w-fit border border-indigo-500/20 relative z-10 shadow-inner"><ShieldAlert size={28} className="text-indigo-400" /></div>
              <span className="text-slate-200 leading-relaxed font-bold relative z-10 text-xl max-w-xs">Design for explicit failure states first, success states second.</span>
            </div>

          </div>
        </section>

        <section className="w-full mt-4 pt-10 border-t border-slate-800/40 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>

          <div className="bg-gradient-to-b from-[#0a0f1a] to-[#05070a] rounded-[3rem] p-10 md:p-20 flex flex-col items-center justify-center text-center gap-8 relative overflow-hidden shadow-2xl border border-white/5 mt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-blue-600/5 blur-[100px] pointer-events-none"></div>

            <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 mb-2 relative z-10 shadow-[0_0_30px_rgba(37,99,235,0.2)]">
              <FlaskConical size={36} className="text-blue-400" />
            </div>

            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight relative z-10">The Research Is Complete.</h2>

            <p className="text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed font-medium relative z-10">
              Every prototype in this lab was a stepping stone. See how these isolated experiments converged into a single, enterprise-grade platform.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-6 w-full relative z-10">
              <Link to="/devscout" className="w-full sm:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:scale-105 flex items-center justify-center gap-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-950 text-base">
                Explore DevScout <ArrowRight size={20} />
              </Link>
              <Link to="/" className="w-full sm:w-auto px-10 py-4 bg-slate-900 border border-slate-700 hover:bg-slate-800 text-white font-bold rounded-2xl transition-all shadow-lg text-center focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-950 text-base">
                Return to Home
              </Link>
            </div>
          </div>
        </section>

      </main>

      {activeMedia && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-2xl p-0 md:p-8 animate-in fade-in duration-300" onClick={() => setActiveIndex(null)}>

          <div className="absolute top-4 right-4 md:top-8 md:right-8 flex items-center gap-4 z-[110]" onClick={e => e.stopPropagation()}>
            <span className="hidden md:block text-slate-400 text-xs font-bold tracking-widest bg-slate-900/80 px-4 py-2 rounded-full border border-slate-700/50 backdrop-blur-md">
              {activeIndex + 1} / {allMedia.length}
            </span>
            <button aria-label="Close Lightbox" className="p-3 bg-slate-900/80 border border-slate-700/50 rounded-full text-slate-300 hover:text-white hover:bg-slate-800 transition-all backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/50" onClick={() => setActiveIndex(null)}>
              <X size={20} />
            </button>
          </div>

          <button aria-label="Previous Media" onClick={handlePrev} className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 p-4 bg-slate-900/80 border border-slate-700/50 rounded-full text-slate-300 hover:text-white hover:bg-slate-800 hover:scale-110 transition-all z-[110] backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/50">
            <ChevronLeft size={24} />
          </button>
          <button aria-label="Next Media" onClick={handleNext} className="absolute right-2 md:left-8 top-1/2 -translate-y-1/2 p-4 bg-slate-900/80 border border-slate-700/50 rounded-full text-slate-300 hover:text-white hover:bg-slate-800 hover:scale-110 transition-all z-[110] backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/50">
            <ChevronRight size={24} />
          </button>

          <div className="relative w-full max-w-[90vw] md:max-w-7xl h-[100dvh] md:h-[85vh] flex flex-col items-center justify-center select-none py-20 md:py-0" onClick={e => e.stopPropagation()}>

            {activeMedia.type === 'image' && (
              <div
                className={`w-full h-full bg-slate-50 rounded-2xl md:rounded-[2rem] flex items-center justify-center overflow-hidden shadow-2xl relative select-none touch-none ${!isZoomed ? 'cursor-zoom-in' : isDragging ? 'cursor-grabbing' : 'cursor-grab'
                  }`}
                onMouseDown={(e) => {
                  setHasDragged(false);
                  if (!isZoomed) return;
                  setIsDragging(true);
                  setDragStart({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y });
                }}
                onMouseMove={(e) => {
                  if (!isDragging || !isZoomed) return;
                  setHasDragged(true);
                  setPanPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
                }}
                onMouseUp={() => {
                  setIsDragging(false);
                }}
                onMouseLeave={() => {
                  setIsDragging(false);
                }}
                onTouchStart={(e) => {
                  setHasDragged(false);
                  if (!isZoomed) return;
                  setIsDragging(true);
                  const touch = e.touches[0];
                  setDragStart({ x: touch.clientX - panPosition.x, y: touch.clientY - panPosition.y });
                }}
                onTouchMove={(e) => {
                  if (!isDragging || !isZoomed) return;
                  setHasDragged(true);
                  const touch = e.touches[0];
                  setPanPosition({ x: touch.clientX - dragStart.x, y: touch.clientY - dragStart.y });
                }}
                onTouchEnd={() => {
                  setIsDragging(false);
                }}
                onClick={() => {
                  if (!hasDragged) {
                    setIsZoomed(!isZoomed);
                  }
                }}
              >

                <div className="absolute bottom-6 right-6 bg-slate-900/80 text-white text-xs font-bold tracking-wide px-4 py-2 rounded-xl flex items-center gap-2 backdrop-blur-md border border-slate-700/50 z-20 pointer-events-none">
                  {isZoomed ? (
                    <>
                      <Hand size={14} className="text-blue-400" /> Drag to explore | Click to shrink
                    </>
                  ) : (
                    <>
                      <ZoomIn size={14} className="text-indigo-400" /> Click to zoom blueprint
                    </>
                  )}
                </div>

                <img
                  src={activeMedia.src}
                  alt={activeMedia.title}
                  style={{
                    transform: `translate(${panPosition.x}px, ${panPosition.y}px) scale(${isZoomed ? 2.5 : 1})`,
                    transition: isDragging ? 'none' : 'transform 250ms cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  className="mix-blend-multiply max-w-full max-h-full object-contain pointer-events-none p-4 md:p-12"
                  draggable="false"
                />
              </div>
            )}

            {activeMedia.type === 'video' && (
              <div className="w-full max-w-6xl aspect-video bg-[#05070A] rounded-2xl md:rounded-[2rem] border border-slate-800 shadow-[0_0_100px_rgba(59,130,246,0.1)] overflow-hidden relative">
                <iframe
                  key={activeMedia.src}
                  src={`https://www.youtube.com/embed/${activeMedia.src}?autoplay=1`}
                  title={activeMedia.title}
                  className="w-full h-full absolute inset-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            <h3 className="text-white font-bold text-lg md:text-2xl mt-6 md:mt-8 tracking-tight text-center px-8 bg-slate-950/50 py-2.5 rounded-2xl backdrop-blur-sm border border-slate-800/50 shadow-lg">
              {activeMedia.title}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}