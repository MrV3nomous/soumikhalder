import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, X, ZoomIn, Hand, ChevronLeft, ChevronRight, 
  Fingerprint, PlayCircle, LayoutGrid, Database, Terminal, 
  LayoutDashboard, Swords, Radar, Sliders, Ticket, ShieldCheck, 
  FileCode2, Activity, Command, CheckCircle2, Layers, Wrench, 
  Clock, Server, Cpu, BarChart3, AlertTriangle, Flame, ArrowRight, Network
} from 'lucide-react';
import { projects } from '../data/projects';

export default function DevScout() {
  const data = projects.devscout;
  const featuredVideo = data.videos.scenarios[1];
  const gridScenarios = data.videos.scenarios;
  
  const diagrams = data.architectureDiagrams.map(d => ({ type: 'image', src: d.path, title: d.name }));
  const scenarios = gridScenarios.map(v => ({ type: 'video', src: v.youtubeId, title: v.title }));
  const miniclips = data.videos.miniclips.map(v => ({ type: 'video', src: v.youtubeId, title: v.title }));
  const allMedia = [...diagrams, ...scenarios, ...miniclips];
  const [activeIndex, setActiveIndex] = useState(null); 
  const activeMedia = activeIndex !== null ? allMedia[activeIndex] : null;
  const [isZoomed, setIsZoomed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
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
  const handleMouseDown = (e) => { if (!isZoomed) return; setIsDragging(true); setDragStart({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y }); };
  const handleMouseMove = (e) => { if (!isDragging || !isZoomed) return; setPanPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y }); };
  const handleMouseUp = () => setIsDragging(false);

  const getIconForDiagram = (name) => {
    const n = name.toLowerCase();
    if (n.includes('dashboard')) return <LayoutDashboard size={16} className="text-blue-500 shrink-0" />;
    if (n.includes('war room')) return <Swords size={16} className="text-blue-500 shrink-0" />;
    if (n.includes('radar')) return <Radar size={16} className="text-blue-500 shrink-0" />;
    if (n.includes('rubric')) return <Sliders size={16} className="text-blue-500 shrink-0" />;
    if (n.includes('dispatch') || n.includes('terminal')) return <Terminal size={16} className="text-blue-500 shrink-0" />;
    if (n.includes('memory') || n.includes('backend')) return <Database size={16} className="text-blue-500 shrink-0" />;
    if (n.includes('billing')) return <Ticket size={16} className="text-blue-500 shrink-0" />;
    if (n.includes('auth')) return <ShieldCheck size={16} className="text-blue-500 shrink-0" />;
    return <FileCode2 size={16} className="text-blue-500 shrink-0" />; 
  };

  return (
    <div className="w-full flex flex-col text-slate-200 font-sans selection:bg-blue-500/30 overflow-x-hidden relative animate-in fade-in duration-700">
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/5 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <main className="relative z-10 pt-24 pb-32 px-4 md:px-8 max-w-7xl mx-auto flex flex-col gap-20 w-full">
        

        <section className="flex flex-col items-center text-center mt-4 w-full max-w-5xl mx-auto gap-8">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-blue-500/20 border border-blue-400/50 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.3)] relative z-10 p-2">
            <img src="/devscoutlightlogo.png" alt="DevScout" className="w-full h-full object-contain opacity-90" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1]">
            Resumes are narratives.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Code is reality.</span>
          </h1>
          
          <div className="max-w-3xl flex flex-col gap-6 mt-4">
            <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed">
              A full-stack hiring intelligence platform built from scratch. Featuring deep repository telemetry, AI-assisted evaluation, and end-to-end workflow orchestration.
            </p>
            <div className="bg-blue-900/10 border border-blue-500/20 p-6 rounded-2xl">
              <p className="text-sm md:text-base text-blue-100/80 leading-relaxed font-medium">
                Most hiring systems evaluate narratives. DevScout evaluates evidence. The platform was designed around the belief that repository history, execution consistency, and technical proof-of-work reveal more than traditional resumes.
              </p>
        <div className="w-full flex justify-end">

          {data.liveUrl && (
            <a 
              href={data.liveUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-full text-sm font-bold text-white transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:scale-105"
            >
              Launch Live App <ArrowRight size={16} />
            </a>
          )}
        </div>
            </div>
          </div>
        </section>

        <section className="w-full flex justify-center">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 bg-slate-900/50 border border-slate-800/60 rounded-full px-6 md:px-10 py-3 backdrop-blur-md text-xs md:text-sm font-mono">
            <span className="flex items-center gap-2 text-slate-300"><div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" /> Production Prototype</span>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-slate-700" />
            <span className="text-slate-400">Built By: <strong className="text-white">Raj</strong></span>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-slate-700" />
            <span className="text-slate-400">Architecture Nodes: <strong className="text-white">{diagrams.length}</strong></span>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-slate-700" />
            <span className="text-slate-400">Core Modules: <strong className="text-white">7</strong></span>
          </div>
        </section>

        <section className="w-full flex flex-col items-center gap-4">
          <div className="w-full max-w-5xl aspect-video bg-black rounded-2xl md:rounded-[2rem] border border-slate-800/80 shadow-[0_0_80px_rgba(59,130,246,0.15)] overflow-hidden relative group">
            <iframe 
              src={`https://www.youtube.com/embed/${featuredVideo?.youtubeId}?autoplay=0&rel=0`} 
              title="DevScout Walkthrough" 
              className="w-full h-full" 
              allowFullScreen 
            />
          </div>
          <p className="text-slate-500 text-sm font-mono uppercase tracking-widest mt-2 flex items-center gap-2">
            <PlayCircle size={16} className="text-blue-500" />Demo Platform Walkthrough
          </p>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          <div className="bg-slate-900/30 border border-slate-800/60 rounded-3xl p-8 backdrop-blur-sm shadow-xl flex flex-col">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3"><Wrench className="text-blue-500" /> My Role</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-2 text-sm text-slate-300">
              {['Sole Product Engineer', 'Frontend Architecture', 'Backend Architecture', 'Database Design', 'AI Workflow Design', 'Supabase Infrastructure', 'Authentication & Billing', 'State Management', 'Deployment & Ops'].map((role) => (
                <li key={role} className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-blue-500 shrink-0 mt-0.5" /> {role}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-xs text-slate-500 font-mono uppercase tracking-widest border-t border-slate-800/60 pt-4">Built end-to-end by a single developer.</p>
          </div>

          <div className="bg-slate-900/30 border border-slate-800/60 rounded-3xl p-8 backdrop-blur-sm shadow-xl flex flex-col">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3"><Layers className="text-blue-500" /> Technical Stack</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { name: 'React', icon: FileCode2 }, { name: 'Tailwind', icon: LayoutGrid }, { name: 'Framer', icon: Activity },
                { name: 'Supabase', icon: Database }, { name: 'PostgreSQL', icon: Server }, { name: 'Edge Functions', icon: Terminal },
                { name: 'Google Gemini', icon: Cpu }, { name: 'GoTrue Auth', icon: ShieldCheck }, { name: 'Stripe Billing', icon: Ticket }
              ].map((tech) => (
                <div key={tech.name} className="flex flex-col items-center justify-center gap-2 p-3 bg-slate-950/50 rounded-xl border border-slate-800/50 hover:border-blue-500/30 transition-colors text-center">
                  <tech.icon size={20} className="text-slate-400" />
                  <span className="text-xs font-medium text-slate-300">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full bg-blue-950/10 border border-blue-500/20 rounded-3xl p-8 lg:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 text-center divide-x divide-slate-800/50">
            <div className="flex flex-col gap-1 border-none"><span className="text-4xl font-black text-white">7</span><span className="text-[10px] uppercase tracking-widest text-blue-400 font-bold mt-2">Core Modules</span></div>
            <div className="flex flex-col gap-1"><span className="text-4xl font-black text-white">20+</span><span className="text-[10px] uppercase tracking-widest text-blue-400 font-bold mt-2">AI Workflows</span></div>
            <div className="flex flex-col gap-1"><span className="text-4xl font-black text-white">34</span><span className="text-[10px] uppercase tracking-widest text-blue-400 font-bold mt-2">DB Tables</span></div>
            <div className="flex flex-col gap-1"><span className="text-4xl font-black text-white">58</span><span className="text-[10px] uppercase tracking-widest text-blue-400 font-bold mt-2">Relationships</span></div>
            <div className="hidden lg:flex flex-col gap-1"><span className="text-4xl font-black text-white">12</span><span className="text-[10px] uppercase tracking-widest text-blue-400 font-bold mt-2">Triggers & States</span></div>
          </div>
        </section>


        <section className="flex flex-col gap-8 w-full">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Platform Surface Area</h2>
            <p className="text-slate-400">Not just an AI wrapper. A complete state-machine for recruitment.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="lg:col-span-2 bg-blue-900/10 border border-blue-500/30 rounded-3xl p-8 flex flex-col gap-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity"><Terminal size={120} /></div>
              <h3 className="text-2xl font-bold text-blue-400 flex items-center gap-3"><Terminal size={24}/> Dispatch Terminal</h3>
              <p className="text-slate-300 leading-relaxed z-10 max-w-xl">
                The star of the platform. A complete workflow orchestrator that handles candidate communication and technical evaluation through a multi-step pipeline.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 z-10">
                <div className="flex flex-col gap-1 bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                  <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">1. Outreach</span>
                  <span className="text-slate-400 text-sm">AI-generated emails with response tracking.</span>
                </div>
                <div className="flex flex-col gap-1 bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                  <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">2. Screening</span>
                  <span className="text-slate-400 text-sm">Automated technical screening kits & risk flags.</span>
                </div>
                <div className="flex flex-col gap-1 bg-slate-900/50 p-3 rounded-xl border border-slate-800 sm:col-span-2">
                  <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">3. Evaluation (Audio Transcription)</span>
                  <span className="text-slate-400 text-sm">Upload interview audio. Backend transcribes and AI analyzes text against telemetry to detect hallucinated concepts or hesitation.</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/40 border border-slate-800/50 rounded-3xl p-8 flex flex-col gap-3 hover:border-slate-700 transition-colors">
              <h3 className="text-xl font-bold text-white flex items-center gap-3"><Swords className="text-indigo-400" size={20}/> War Room</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Deep telemetry analysis. Switch between Solo mode for intense scrutiny, or Battlefield mode to mathematically compare candidates.
              </p>
            </div>

            <div className="bg-slate-900/40 border border-slate-800/50 rounded-3xl p-8 flex flex-col gap-3 hover:border-slate-700 transition-colors">
              <h3 className="text-xl font-bold text-white flex items-center gap-3"><Radar className="text-emerald-400" size={20}/> Talent Radar</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Background job processing. Configure up to 3 concurrent radar services that scan profiles and update states every 24 hours.
              </p>
            </div>

            <div className="bg-slate-900/40 border border-slate-800/50 rounded-3xl p-8 flex flex-col gap-3 hover:border-slate-700 transition-colors">
              <h3 className="text-xl font-bold text-white flex items-center gap-3"><Database className="text-amber-400" size={20}/> Decision Memory</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Persistent hiring history. Canvas, Roster, and Timeline views to manage the lifecycle of candidates, including reactivation workflows.
              </p>
            </div>

            <div className="bg-slate-900/40 border border-slate-800/50 rounded-3xl p-8 flex flex-col gap-3 hover:border-slate-700 transition-colors">
              <h3 className="text-xl font-bold text-white flex items-center gap-3"><Ticket className="text-rose-400" size={20}/> Billing Infrastructure</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Supabase Auth and complex subscription logic. 6 tiered plans with variable tenure cycles, automated renewals, and strict RLS.
              </p>
            </div>

          </div>
        </section>

        <section className="flex flex-col lg:flex-row gap-12 w-full bg-slate-900/20 border border-slate-800/50 rounded-3xl p-8 md:p-12 items-center">
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-blue-500 font-mono text-xs uppercase tracking-widest"><BarChart3 size={16} /> Technical Moat</div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Telemetry Visualization</h2>
            <p className="text-slate-400 leading-relaxed">
              Resumes are self-reported. Telemetry is behavioral evidence. DevScout extracts thousands of data points from candidate repositories to build an irrefutable profile of execution consistency, impact, and architectural scale.
            </p>
          </div>
          
          <div className="w-full lg:w-1/2 bg-[#05070A] border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px]"></div>
             <div className="flex items-center justify-between mb-8 relative z-10">
               <div className="flex flex-col">
                 <span className="text-slate-500 text-[10px] font-mono uppercase">DevScore™</span>
                 <span className="text-3xl font-black text-white">94<span className="text-slate-600 text-lg">/100</span></span>
               </div>
               <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">Top 5% Cohort</div>
             </div>
             
             <div className="flex flex-col gap-2 relative z-10">
               <span className="text-slate-500 text-[10px] font-mono uppercase">Commit Frequency (90 Days)</span>
               <div className="flex items-end gap-1.5 h-16 w-full">
                 {[40, 20, 60, 80, 45, 90, 70, 30, 85, 100, 65, 50, 75, 40, 95].map((height, i) => (
                   <div key={i} className="flex-1 bg-blue-500/20 hover:bg-blue-400 transition-colors rounded-t-sm" style={{ height: `${height}%` }}></div>
                 ))}
               </div>
             </div>
             
             <div className="grid grid-cols-2 gap-4 mt-6 relative z-10">
               <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                 <span className="block text-slate-500 text-[10px] font-mono uppercase mb-1">Execution Consistency</span>
                 <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden"><div className="w-[88%] h-full bg-indigo-500"></div></div>
               </div>
               <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                 <span className="block text-slate-500 text-[10px] font-mono uppercase mb-1">Repository Activity</span>
                 <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden"><div className="w-[72%] h-full bg-blue-500"></div></div>
               </div>
             </div>
          </div>
        </section>

        <section className="flex flex-col gap-16 w-full border-t border-slate-800/50 pt-16">
          
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-bold text-white tracking-tight">System Blueprints</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {diagrams.map((diagram, idx) => (
                <div key={idx} onClick={() => setActiveIndex(idx)} className="bg-slate-900/40 border border-slate-800/50 rounded-xl p-4 md:p-5 hover:bg-slate-800/60 hover:border-blue-500/40 transition-all cursor-zoom-in group flex flex-col h-[260px]">
                  <h4 className="text-white font-medium text-sm mb-4 flex justify-between">
                    <span className="flex items-center gap-2">{getIconForDiagram(diagram.title)} {diagram.title}</span>
                    <div className="w-7 h-7 rounded-full bg-slate-800/50 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors"><ZoomIn size={14} className="text-slate-400 group-hover:text-blue-400" /></div>
                  </h4>
                  <div className="flex-1 bg-white rounded-lg p-2 overflow-hidden relative border border-slate-800/50">
                    <img src={diagram.src} className="w-full h-full object-contain opacity-90 group-hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
              <Activity className="text-blue-500" size={28} /> Execution Telemetry
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {scenarios.map((scenario, localIndex) => {
                const globalIndex = diagrams.length + localIndex;
                return (
                  <div key={globalIndex} onClick={() => setActiveIndex(globalIndex)} className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-4 hover:bg-slate-800/60 hover:border-blue-500/40 transition-all cursor-pointer group">
                    <div className="aspect-video bg-black rounded-xl overflow-hidden relative mb-4 border border-slate-800/50">
                      <img src={`https://img.youtube.com/vi/${scenario.src}/maxresdefault.jpg`} alt={scenario.title} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
                      <div className="absolute inset-0 flex items-center justify-center bg-blue-500/0 group-hover:bg-blue-500/10 transition-all z-10 duration-500">
                        <PlayCircle size={48} className="text-white/40 group-hover:text-white transition-all group-hover:scale-110 duration-500 drop-shadow-2xl" />
                      </div>
                    </div>
                    <div className="px-2 pb-2 flex items-center gap-2">
                      <Command size={16} className="text-blue-500 shrink-0" />
                      <h4 className="text-slate-200 font-medium truncate">{scenario.title}</h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
               <LayoutGrid className="text-blue-500" size={24} /> Module Deep-Dives
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {miniclips.map((clip, localIndex) => {
                const globalIndex = diagrams.length + scenarios.length + localIndex;
                return (
                  <div key={globalIndex} onClick={() => setActiveIndex(globalIndex)} className="bg-slate-900/40 border border-slate-800/50 rounded-xl p-3 hover:bg-slate-800/60 hover:border-indigo-500/40 transition-all cursor-pointer group">
                    <div className="aspect-video bg-[#05070A] rounded-lg overflow-hidden relative mb-3 border border-slate-800/50">
                      <img src={`https://img.youtube.com/vi/${clip.src}/maxresdefault.jpg`} alt={clip.title} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <PlayCircle size={32} className="text-white/40 group-hover:text-indigo-400 transition-all" />
                      </div>
                    </div>
                    <h4 className="text-slate-300 text-xs font-mono px-2 flex items-center gap-2">
                      {getIconForDiagram(clip.title)}
                      <span className="truncate">{clip.title}</span>
                    </h4>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 border-t border-slate-800/50 pt-16 w-full">          
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-rose-500 font-mono text-xs uppercase tracking-widest"><Flame size={16} /> What Broke During Development</div>
            <h3 className="text-2xl font-bold text-white tracking-tight">Interesting Failures</h3>
            <p className="text-slate-400 text-sm mb-4">You don't build a system this large without hitting walls. Here is where the architecture failed, and how I fixed it.</p>
            <div className="space-y-4">
              <div className="bg-rose-950/10 border border-rose-900/30 p-4 rounded-xl">
                <h5 className="text-rose-400 text-sm font-bold mb-1">State Desynchronization across Tabs</h5>
                <p className="text-xs text-slate-400 leading-relaxed">Multi-context evaluator workflows caused stale reads when recruiters switched tabs. Solved by implementing Postgres realtime channels with optimistic UI invalidation to guarantee strict cross-client consistency.</p>
              </div>
              <div className="bg-rose-950/10 border border-rose-900/30 p-4 rounded-xl">
                <h5 className="text-rose-400 text-sm font-bold mb-1">Duplicate Candidate Insertion Races</h5>
                <p className="text-xs text-slate-400 leading-relaxed">Async radar workers were occasionally scanning the same candidate simultaneously, causing DB race conditions. Fixed by implementing strict unique constraints and debounced queue locks.</p>
              </div>
              <div className="bg-rose-950/10 border border-rose-900/30 p-4 rounded-xl">
                <h5 className="text-rose-400 text-sm font-bold mb-1">Prompt Drift During Evaluation</h5>
                <p className="text-xs text-slate-400 leading-relaxed">LLMs struggled to evaluate long audio transcripts deterministically. Solved by breaking transcripts into chunks and forcing strict JSON-schema outputs via API parameters.</p>
              </div>
              <div className="bg-rose-950/10 border border-rose-900/30 p-4 rounded-xl">
                <h5 className="text-rose-400 text-sm font-bold mb-1">Supabase Edge Function Limits</h5>
                <p className="text-xs text-slate-400 leading-relaxed">Heavy PDF parsing hit Edge Function memory limits. Migrated heavy processing logic to chunked streams and delegated storage references.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-amber-500 font-mono text-xs uppercase tracking-widest"><AlertTriangle size={16} /> Engineering Reality</div>
            <h3 className="text-2xl font-bold text-white tracking-tight">System Constraints</h3>
            <p className="text-slate-400 text-sm mb-4">Every architecture requires tradeoffs. These are the conscious limitations of the current prototype.</p>
            <ul className="space-y-3">
              {[
                { t: 'Single Tenant Design', d: 'Currently optimized for standalone recruitment nodes rather than multi-org SaaS.' },
                { t: 'GitHub-Centric Telemetry', d: 'Parsers are heavily biased towards GitHub API payloads; GitLab/Bitbucket require adapters.' },
                { t: 'AI Evaluation Cost Scaling', d: 'Deep audio transcription + dual LLM evaluation creates high token costs per candidate.' },
                { t: 'Background Worker Limits', d: 'Radar tracking is capped to 3 concurrent services to respect Supabase free-tier limits.' },
                { t: 'No Enterprise SSO', d: 'Authentication relies on standard GoTrue email/magic-links without SAML/Okta integration.' }
              ].map(c => (
                <li key={c.t} className="bg-amber-950/10 border border-amber-900/30 p-4 rounded-xl">
                  <strong className="text-amber-400 block text-sm font-bold mb-1">{c.t}</strong>
                  <span className="text-xs text-slate-400">{c.d}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-blue-900/10 border border-blue-500/20 rounded-[2rem] p-10 md:p-16 flex flex-col gap-10 text-center items-center relative overflow-hidden w-full mt-8">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
          
          <div className="flex flex-col items-center z-10">
            <h2 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-4">What This Project Demonstrates</h2>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl">
              {['Full-Stack Engineering', 'System Architecture', 'AI Workflow Design', 'Database Modeling', 'Authentication & Security', 'Subscription Infrastructure', 'Complex State Management', 'Product Thinking'].map(skill => (
                <span key={skill} className="flex items-center gap-2 px-4 py-2 bg-[#05070A] border border-slate-800 rounded-full text-xs font-mono text-slate-300">
                  <CheckCircle2 size={14} className="text-blue-500" /> {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="w-full max-w-md h-[1px] bg-slate-800 z-10 my-2"></div>

          <div className="flex flex-col items-center z-10">
            <p className="text-xl md:text-2xl font-light text-white mb-6">
              Interested in discussing architecture, engineering decisions, or implementation details?
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              {data.liveUrl && (
                <a href={data.liveUrl} target="_blank" rel="noreferrer" className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-colors shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                  Explore App Live
                </a>
              )}
              <a href="mailto:soumikhlder@gmail.com" className="px-8 py-3 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-white font-bold rounded-full transition-colors shadow-lg">
                Let's Talk
              </a>
            </div>
          </div>
        </section>

      </main>

      {activeMedia && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-2xl p-0 md:p-8 animate-in fade-in duration-300" onClick={() => setActiveIndex(null)}>
          <div className="absolute top-4 right-4 md:top-8 md:right-8 flex items-center gap-4 z-[110]" onClick={e => e.stopPropagation()}>
            <span className="hidden md:block text-slate-400 font-mono text-xs bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              {activeIndex + 1} / {allMedia.length}
            </span>
            <button className="p-3 bg-white/10 border border-white/20 rounded-full text-white hover:bg-white/20 transition-all backdrop-blur-md" onClick={() => setActiveIndex(null)}>
              <X size={20} />
            </button>
          </div>
          <button onClick={handlePrev} className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-white/5 border border-white/10 rounded-full text-white hover:bg-white/20 hover:scale-110 transition-all z-[110] backdrop-blur-md">
            <ChevronLeft size={24} />
          </button>
          <button onClick={handleNext} className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-white/5 border border-white/10 rounded-full text-white hover:bg-white/20 hover:scale-110 transition-all z-[110] backdrop-blur-md">
            <ChevronRight size={24} />
          </button>
          <div className="relative w-full max-w-[90vw] md:max-w-7xl h-[100dvh] md:h-[85vh] flex flex-col items-center justify-center select-none py-20 md:py-0" onClick={e => e.stopPropagation()}>
            {activeMedia.type === 'image' && (
              <div className="w-full h-full bg-slate-50 rounded-2xl md:rounded-[2rem] flex items-center justify-center overflow-hidden cursor-zoom-in" 
                   onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={() => setIsDragging(false)} onTouchStart={() => setIsDragging(true)} onTouchEnd={() => setIsDragging(false)}
                   onClick={() => setIsZoomed(!isZoomed)}>
                <img src={activeMedia.src} style={{ transform: `translate(${panPosition.x}px, ${panPosition.y}px) scale(${isZoomed ? 2.5 : 1})` }} className="mix-blend-multiply transition-transform max-w-full max-h-full object-contain pointer-events-none p-4 md:p-12" />
              </div>
            )}
            {activeMedia.type === 'video' && (
              <div className="w-full max-w-6xl aspect-video bg-black rounded-2xl md:rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden shadow-[0_0_100px_rgba(59,130,246,0.1)]">
                <iframe key={activeMedia.src} src={`https://www.youtube.com/embed/${activeMedia.src}?autoplay=1`} className="w-full h-full" allowFullScreen />
              </div>
            )}
            <h3 className="text-white font-bold text-lg md:text-2xl mt-6 md:mt-8 tracking-tight text-center px-8">{activeMedia.title}</h3>
          </div>
        </div>
      )}
    </div>
  );
}