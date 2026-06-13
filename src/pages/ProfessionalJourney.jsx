import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Briefcase, GraduationCap, Code2, 
  Music, Store, Activity, Target, Compass, Award, ArrowRight,
  Workflow, GitBranch, Search, Zap, CheckCircle2, Crosshair, BookOpen, Smartphone,
  TerminalSquare, BrainCircuit, Orbit, Layers, Server, Network, Database, Cpu,
  Clock, Globe, Users, ShieldCheck, Package, Layout, Calendar, Lightbulb, ChevronRight
} from 'lucide-react';
import { projects } from '../data/projects';

function ScrollReveal({ children, delay = 0, direction = "up", className = "" }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -50px 0px", threshold: 0 } 
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const yOffset = direction === "up" ? 40 : direction === "down" ? -40 : 0;
  const xOffset = direction === "left" ? 40 : direction === "right" ? -40 : 0;

  return (
    <div 
      ref={ref} 
      className={className}
      style={{ 
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate3d(0, 0, 0)' : `translate3d(${xOffset}px, ${yOffset}px, 0)`,
        transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: 'opacity, transform'
      }}
    >
      {children}
    </div>
  );
}

export default function ProfessionalJourney() {
  const timelineRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('era-1');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (timelineRef.current) {
        const { top, height } = timelineRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const scrolled = (windowHeight / 2) - top;
        let percentage = (scrolled / height) * 100;
        setScrollProgress(Math.max(0, Math.min(100, percentage)));
      }

      const sections = ['era-1', 'era-2', 'era-3', 'era-4', 'era-5'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.6 && rect.bottom >= window.innerHeight * 0.4) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const eras = [
    { id: 'era-1', num: '01', title: 'Systems R&D' },
    { id: 'era-2', num: '02', title: 'Music Educator' },
    { id: 'era-3', num: '03', title: 'Geotech' },
    { id: 'era-4', num: '04', title: 'Business' },
    { id: 'era-5', num: '05', title: 'Foundations' }
  ];

  const activeIndex = Math.max(0, eras.findIndex(era => era.id === activeSection));

  return (
    <div className="w-full flex flex-col text-slate-200 font-sans selection:bg-blue-500/30 selection:text-blue-100 overflow-x-clip relative min-h-screen">
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/5 blur-[120px] rounded-full" />
      </div>

      <main className="relative z-10 pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col gap-16 lg:gap-24 w-full">

        <section className="flex flex-col gap-6 w-full max-w-5xl">
          <ScrollReveal>
            <div className="flex items-center gap-3 text-blue-400 text-xs font-bold uppercase pb-4  tracking-[0.3em] mb-2">
              <Compass size={16} /> Chronology
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1]">
              Professional Journey
            </h1>
            
            <div className="flex flex-wrap items-center gap-3 mt-6 mb-2">
              {['Electronics', 'Startup', 'Entrepreneur', 'Music Educator'].map((step) => (
                <div key={step} className="flex items-center gap-3">
                  <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px] md:text-xs">{step}</span>
                  <ArrowRight size={14} className="text-slate-700" />
                </div>
              ))}
              <span className="text-blue-400 font-black uppercase tracking-widest text-[10px] md:text-xs shadow-[0_0_20px_rgba(59,130,246,0.3)] bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20 flex items-center gap-2 animate-pulse">
                <Target size={12} /> Systems Engineer
              </span>
            </div>

            <p className="text-lg md:text-xl text-slate-400 font-medium leading-relaxed mt-4 max-w-3xl">
              My path to systems engineering was built through diverse domains. From designing circuits to managing retail supply chains and breaking down complex theory for hundreds of students, every role refined my ability to architect complex, reliable systems.
            </p>
          </ScrollReveal>
        </section>

        <section className="w-full relative z-20">
          <ScrollReveal delay={150}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 w-full">
               {[
                 { val: "4", label: "Industries", icon: Globe, color: "blue" },
                 { val: "300+", label: "Students", icon: Users, color: "indigo" },
                 { val: "8+", label: "Years Tech", icon: Clock, color: "emerald" },
                 { val: "5", label: "Domains", icon: Layers, color: "amber" },
                 { val: "12+", label: "Systems", icon: TerminalSquare, color: "cyan" }
               ].map((m, i) => (
                 <div key={m.label} className="bg-[#05070a]/80 border border-white/5 rounded-2xl p-5 md:p-6 flex flex-col items-center justify-center text-center shadow-lg backdrop-blur-md hover:-translate-y-1 hover:border-white/20 transition-all duration-300 group">
                   <span className="text-3xl md:text-4xl font-black text-white group-hover:text-blue-400 transition-colors">{m.val}</span>
                   <span className="text-[9px] md:text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-2 flex items-center gap-1.5">
                     <m.icon size={12} className="opacity-40 group-hover:scale-110 transition-transform" /> {m.label}
                   </span>
                 </div>
               ))}
               <div className="bg-gradient-to-b from-blue-900/10 to-[#05070a]/80 border border-blue-500/20 rounded-2xl p-5 md:p-6 flex flex-col items-center justify-center text-center shadow-[0_0_20px_rgba(59,130,246,0.1)] backdrop-blur-md hover:-translate-y-1 hover:border-blue-400/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all duration-300 group">
                 <span className="text-3xl md:text-4xl font-black text-blue-400 group-hover:text-blue-300 transition-colors">1</span>
                 <span className="text-[9px] md:text-[10px] text-blue-500/80 font-bold uppercase tracking-widest mt-2 group-hover:text-blue-400 transition-colors flex items-center gap-1.5">
                   <BrainCircuit size={12} className="opacity-70 group-hover:scale-110 transition-transform" /> Mindset
                 </span>
               </div>
            </div>
          </ScrollReveal>
        </section>

        <section className="flex flex-col lg:flex-row gap-8 lg:gap-16 w-full relative">
          
          <div className="hidden lg:block w-1/4 relative">
            <div className="sticky top-32 flex flex-col gap-6 w-full">
              <ScrollReveal>
                <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest border-b border-slate-800/60 pb-4 block">Journey Map</span>
              </ScrollReveal>
              <nav className="flex flex-col relative py-2">
                
                <div className="absolute left-0 top-2 bottom-2 w-[2px] bg-slate-800/50 rounded-full"></div>
                
                <div 
                  className="absolute left-[-1px] w-[4px] h-8 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] rounded-full transition-all duration-500 ease-out z-10"
                  style={{ top: `${(activeIndex * 56) + 12}px` }}
                ></div>

                {eras.map((item, index) => {
                  const isActive = activeSection === item.id;
                  return (
                    <ScrollReveal key={item.id} delay={index * 50}>
                      <a 
                        href={`#${item.id}`} 
                        onClick={(e) => handleNavClick(e, item.id)}
                        className="flex items-center gap-5 h-14 pl-6 group outline-none"
                      >
                        <span className={`text-xs font-black transition-colors duration-300 ${isActive ? 'text-blue-500' : 'text-slate-600 group-hover:text-slate-400'}`}>
                          {item.num}
                        </span>
                        <span className={`text-sm font-bold tracking-wide transition-all duration-300 ${isActive ? 'text-white translate-x-2' : 'text-slate-500 group-hover:text-slate-300'}`}>
                          {item.title}
                        </span>
                      </a>
                    </ScrollReveal>
                  );
                })}
              </nav>
            </div>
          </div>

          <div className="w-full lg:w-3/4 relative pb-16" ref={timelineRef}>
            
            <div className="absolute left-[36px] md:left-[48px] -translate-x-1/2 top-12 bottom-12 w-[2px] bg-slate-800/60 rounded-full z-0 overflow-hidden">
               <div 
                 className="absolute top-0 w-full bg-gradient-to-b from-blue-400 via-indigo-500 to-blue-600 transition-all duration-200 ease-out shadow-[0_0_20px_2px_rgba(59,130,246,0.5)]"
                 style={{ height: `${scrollProgress}%` }}
               ></div>
            </div>

            <div className="flex flex-col gap-20 lg:gap-24 relative w-full">

              <div id="era-1" className="flex w-full relative group">
                 <div className={`absolute left-[36px] md:left-[48px] top-16 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-[3px] z-20 flex items-center justify-center transition-all duration-500 ${activeSection === 'era-1' ? 'bg-[#0a0f1a] border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.8)] scale-110' : 'bg-[#0a0f1a] border-slate-700'}`}>
                    <div className={`w-2.5 h-2.5 rounded-full bg-blue-400 transition-all duration-500 ${activeSection === 'era-1' ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}></div>
                 </div>
                 
                 <div className="w-full pl-[80px] md:pl-[112px]">
                   <ScrollReveal>
                     <div className="bg-[#05070a]/80 border border-white/5 p-8 md:p-10 rounded-[2.5rem] shadow-2xl backdrop-blur-md hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_20px_80px_-20px_rgba(59,130,246,0.15)] transition-all duration-500 relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[70px] pointer-events-none group-hover:bg-blue-500/10 transition-all duration-700"></div>
                       
                       <div className="flex items-center gap-4 mb-6 relative z-10">
                         <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                           <Code2 size={24} className="text-blue-400" />
                         </div>
                         <div className="flex flex-col gap-1">
                           <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">Software Systems R&D</h3>
                           <span className="text-blue-400 text-[11px] font-bold uppercase tracking-widest mt-1 flex items-center gap-1.5"><Calendar size={12}/> 2026 – Present</span>
                         </div>
                       </div>

                       <p className="text-slate-300 text-base leading-relaxed font-medium mb-8 relative z-10">
                         Dedicated 2026 to building and researching software systems spanning developer tooling, AI workflows, distributed architectures, simulations, and backend platforms.
                       </p>
                       
                       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8 relative z-10">
                          <Link to="/devscout" className="flex items-center gap-3 bg-white/[0.02] border border-white/5 p-3 rounded-2xl hover:border-blue-500/50 hover:bg-blue-500/5 transition-colors group/proj shadow-lg">
                             <Target size={16} className="text-blue-400 shrink-0" />
                             <div className="flex flex-col">
                               <span className="text-white font-bold text-xs tracking-tight">DevScout</span>
                               <span className="text-slate-500 text-[8px] font-bold uppercase tracking-widest">Hiring Platform</span>
                             </div>
                          </Link>
                          <Link to="/minigit" className="flex items-center gap-3 bg-white/[0.02] border border-white/5 p-3 rounded-2xl hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-colors group/proj shadow-lg">
                             <GitBranch size={16} className="text-emerald-400 shrink-0" />
                             <div className="flex flex-col">
                               <span className="text-white font-bold text-xs tracking-tight">MiniGit</span>
                               <span className="text-slate-500 text-[8px] font-bold uppercase tracking-widest">Java VCS Engine</span>
                             </div>
                          </Link>
                          <Link to="/lab" className="flex items-center gap-3 bg-white/[0.02] border border-white/5 p-3 rounded-2xl hover:border-fuchsia-500/50 hover:bg-fuchsia-500/5 transition-colors group/proj shadow-lg">
                             <BrainCircuit size={16} className="text-fuchsia-400 shrink-0" />
                             <div className="flex flex-col">
                               <span className="text-white font-bold text-xs tracking-tight">Lie Detector Pro</span>
                               <span className="text-slate-500 text-[8px] font-bold uppercase tracking-widest">Cognitive AI</span>
                             </div>
                          </Link>
                          <Link to="/lab" className="flex items-center gap-3 bg-white/[0.02] border border-white/5 p-3 rounded-2xl hover:border-violet-500/50 hover:bg-violet-500/5 transition-colors group/proj shadow-lg">
                             <Orbit size={16} className="text-violet-400 shrink-0" />
                             <div className="flex flex-col">
                               <span className="text-white font-bold text-xs tracking-tight">Universe Engine</span>
                               <span className="text-slate-500 text-[8px] font-bold uppercase tracking-widest">Procedural Sim</span>
                             </div>
                          </Link>
                          <Link to="/lab" className="flex items-center gap-3 bg-white/[0.02] border border-white/5 p-3 rounded-2xl hover:border-amber-500/50 hover:bg-amber-500/5 transition-colors group/proj shadow-lg">
                             <Layers size={16} className="text-amber-400 shrink-0" />
                             <div className="flex flex-col">
                               <span className="text-white font-bold text-xs tracking-tight">KrishnaSpeaks</span>
                               <span className="text-slate-500 text-[8px] font-bold uppercase tracking-widest">Knowledge AI</span>
                             </div>
                          </Link>
                          <Link to="/lab" className="flex items-center gap-3 bg-white/[0.02] border border-white/5 p-3 rounded-2xl hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-colors group/proj shadow-lg">
                             <TerminalSquare size={16} className="text-cyan-400 shrink-0" />
                             <div className="flex flex-col">
                               <span className="text-white font-bold text-xs tracking-tight">Hold'em CLI</span>
                               <span className="text-slate-500 text-[8px] font-bold uppercase tracking-widest">State Machines</span>
                             </div>
                          </Link>
                       </div>

                       <div className="mt-auto pt-6 border-t border-slate-800/60 flex items-center justify-between relative z-10 group/link">
                          <Link to="/lab" className="text-white font-bold text-sm hover:text-blue-400 transition-colors flex items-center gap-2">
                             Explore Engineering Lab <ChevronRight size={16} className="group-hover/link:translate-x-1 transition-transform"/>
                          </Link>
                       </div>
                     </div>
                   </ScrollReveal>
                 </div>
              </div>

              <div id="era-2" className="flex w-full relative group">
                 <div className={`absolute left-[36px] md:left-[48px] top-16 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-[3px] z-20 flex items-center justify-center transition-all duration-500 ${activeSection === 'era-2' ? 'bg-[#0a0f1a] border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.8)] scale-110' : 'bg-[#0a0f1a] border-slate-700'}`}>
                    <div className={`w-2.5 h-2.5 rounded-full bg-indigo-400 transition-all duration-500 ${activeSection === 'era-2' ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}></div>
                 </div>
                 
                 <div className="w-full pl-[80px] md:pl-[112px]">
                   <ScrollReveal delay={100}>
                     <div className="bg-[#05070a]/80 border border-white/5 p-8 md:p-10 rounded-[2.5rem] shadow-xl backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-indigo-500/30 hover:shadow-[0_20px_80px_-20px_rgba(99,102,241,0.15)] relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[70px] pointer-events-none group-hover:bg-indigo-500/10 transition-all duration-700"></div>

                       <div className="flex items-center gap-4 mb-6 relative z-10">
                         <div className="p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 shadow-inner group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500">
                           <Music size={24} className="text-indigo-400" />
                         </div>
                         <div className="flex flex-col gap-1">
                           <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">Music Educator</h3>
                           <span className="text-indigo-400 text-[11px] font-bold uppercase tracking-widest mt-1 flex items-center gap-1.5"><Calendar size={12}/> 2023 – 2025 • Furtados School</span>
                         </div>
                       </div>

                       <p className="text-slate-300 text-base leading-relaxed font-medium mb-8 relative z-10">
                         Designed and delivered structured learning experiences for hundreds of students across varying skill levels, developing a systems-oriented approach to communication, curriculum design, and problem decomposition.
                       </p>
                       
                       <div className="mt-auto pt-6 border-t border-slate-800/60 relative z-10">
                         <div className="bg-indigo-900/10 p-5 rounded-2xl border border-indigo-500/10 flex gap-4 items-start group-hover:bg-indigo-900/20 group-hover:border-indigo-500/20 transition-colors">
                           <Lightbulb size={18} className="text-indigo-400 shrink-0 mt-0.5" />
                           <div className="flex flex-col gap-1.5">
                             <span className="text-indigo-400 text-[10px] font-bold uppercase tracking-widest">The Lesson</span>
                             <span className="text-slate-300 text-sm font-medium leading-relaxed">If someone cannot understand it, the explanation is the problem, not the student.</span>
                           </div>
                         </div>
                       </div>
                     </div>
                   </ScrollReveal>
                 </div>
              </div>

              <div id="era-3" className="flex w-full relative group">
                 <div className={`absolute left-[36px] md:left-[48px] top-16 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-[3px] z-20 flex items-center justify-center transition-all duration-500 ${activeSection === 'era-3' ? 'bg-[#0a0f1a] border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.8)] scale-110' : 'bg-[#0a0f1a] border-slate-700'}`}>
                    <div className={`w-2.5 h-2.5 rounded-full bg-emerald-400 transition-all duration-500 ${activeSection === 'era-3' ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}></div>
                 </div>
                 
                 <div className="w-full pl-[80px] md:pl-[112px]">
                   <ScrollReveal delay={100}>
                     <div className="bg-[#05070a]/80 border border-white/5 p-8 md:p-10 rounded-[2.5rem] shadow-xl backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-[0_20px_80px_-20px_rgba(16,185,129,0.15)] relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[70px] pointer-events-none group-hover:bg-emerald-500/10 transition-all duration-700"></div>

                       <div className="flex items-center gap-4 mb-6 relative z-10">
                         <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                           <Briefcase size={24} className="text-emerald-400" />
                         </div>
                         <div className="flex flex-col gap-1">
                           <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">Software Engineer</h3>
                           <span className="text-emerald-400 text-[11px] font-bold uppercase tracking-widest mt-1 flex items-center gap-1.5"><Calendar size={12}/> 2021 • Geotech Informatics</span>
                         </div>
                       </div>

                       <div className="flex flex-col gap-4 text-slate-300 text-sm md:text-base leading-relaxed font-medium mb-8 relative z-10">
                         <p>
                           Operated in a strict Agile environment serving international clients, primarily acting as a backend engineer for <strong className="text-white">Anva B.V. (Netherlands)</strong>. Engineered modular <strong className="text-white">Core Java</strong> REST APIs and <strong className="text-white">AWS S3</strong> integrations while maintaining rigorous enterprise code quality via <strong className="text-white">SonarQube</strong>.
                         </p>
                         <p>
                           Simultaneously contributed to <strong className="text-white">Real Fantasy Teams</strong>—a cross-platform fantasy football application—bridging <strong className="text-white">MongoDB</strong> backend services with native mobile architecture.
                         </p>
                       </div>

                       <div className="mt-auto pt-6 border-t border-slate-800/60 relative z-10">
                         <div className="bg-emerald-900/10 p-5 rounded-2xl border border-emerald-500/10 flex gap-4 items-start group-hover:bg-emerald-900/20 group-hover:border-emerald-500/20 transition-colors">
                           <Lightbulb size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                           <div className="flex flex-col gap-1.5">
                             <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest">The Lesson</span>
                             <span className="text-slate-300 text-sm font-medium leading-relaxed">Enterprise scale requires strict code quality, modular architecture, and predictable Agile rhythms.</span>
                           </div>
                         </div>
                       </div>
                     </div>
                   </ScrollReveal>
                 </div>
              </div>

              <div id="era-4" className="flex w-full relative group">
                 <div className={`absolute left-[36px] md:left-[48px] top-16 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-[3px] z-20 flex items-center justify-center transition-all duration-500 ${activeSection === 'era-4' ? 'bg-[#0a0f1a] border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.8)] scale-110' : 'bg-[#0a0f1a] border-slate-700'}`}>
                    <div className={`w-2.5 h-2.5 rounded-full bg-amber-400 transition-all duration-500 ${activeSection === 'era-4' ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}></div>
                 </div>
                 
                 <div className="w-full pl-[80px] md:pl-[112px]">
                   <ScrollReveal delay={100}>
                     <div className="bg-[#05070a]/80 border border-white/5 p-8 md:p-10 rounded-[2.5rem] shadow-xl backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-amber-500/30 hover:shadow-[0_20px_80px_-20px_rgba(245,158,11,0.15)] relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[70px] pointer-events-none group-hover:bg-amber-500/10 transition-all duration-700"></div>

                       <div className="flex items-center gap-4 mb-6 relative z-10">
                         <div className="p-3 bg-amber-500/10 rounded-2xl border border-amber-500/20 shadow-inner group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                           <Store size={24} className="text-amber-400" />
                         </div>
                         <div className="flex flex-col gap-1">
                           <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">Co-Founder & Ops Lead</h3>
                           <span className="text-amber-400 text-[11px] font-bold uppercase tracking-widest mt-1 flex items-center gap-1.5"><Calendar size={12}/> 2018 – 2020 • Packaged Food</span>
                         </div>
                       </div>

                       <p className="text-slate-300 text-base leading-relaxed font-medium mb-8 relative z-10">
                         Managed sourcing, packaging, logistics, and retail distribution while maintaining sustainable profitability across local markets.
                       </p>

                       <div className="mt-auto pt-6 border-t border-slate-800/60 relative z-10">
                         <div className="bg-amber-900/10 p-5 rounded-2xl border border-amber-500/10 flex gap-4 items-start group-hover:bg-amber-900/20 group-hover:border-amber-500/20 transition-colors">
                           <Lightbulb size={18} className="text-amber-400 shrink-0 mt-0.5" />
                           <div className="flex flex-col gap-1.5">
                             <span className="text-amber-400 text-[10px] font-bold uppercase tracking-widest">The Lesson</span>
                             <span className="text-slate-300 text-sm font-medium leading-relaxed">Products fail operationally long before they fail technically.</span>
                           </div>
                         </div>
                       </div>
                     </div>
                   </ScrollReveal>
                 </div>
              </div>

              <div id="era-5" className="flex w-full relative group">
                 <div className={`absolute left-[36px] md:left-[48px] top-16 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-[3px] z-20 flex items-center justify-center transition-all duration-500 ${activeSection === 'era-5' ? 'bg-[#0a0f1a] border-slate-400 shadow-[0_0_20px_rgba(148,163,184,0.8)] scale-110' : 'bg-[#0a0f1a] border-slate-700'}`}>
                    <div className={`w-2.5 h-2.5 rounded-full bg-slate-300 transition-all duration-500 ${activeSection === 'era-5' ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}></div>
                 </div>
                 
                 <div className="w-full pl-[80px] md:pl-[112px]">
                   <ScrollReveal delay={100}>
                     <div className="bg-[#05070a]/80 border border-white/5 p-8 md:p-10 rounded-[2.5rem] shadow-xl backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-slate-500/30 hover:shadow-[0_20px_80px_-20px_rgba(255,255,255,0.05)] relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-64 h-64 bg-slate-500/5 blur-[70px] pointer-events-none group-hover:bg-slate-500/10 transition-all duration-700"></div>

                       <div className="flex items-center gap-4 mb-10 relative z-10">
                         <div className="p-3 bg-slate-500/10 rounded-2xl border border-slate-500/20 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                           <GraduationCap size={24} className="text-slate-400" />
                         </div>
                         <div className="flex flex-col gap-1">
                           <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">Foundations</h3>
                           <span className="text-slate-400 text-[11px] font-bold uppercase tracking-widest mt-1 flex items-center gap-1.5"><Calendar size={12}/> 2012 - 2018</span>
                         </div>
                       </div>
                       
                       <div className="flex flex-col relative z-10 ml-2">
                         <div className="absolute left-[24px] -translate-x-1/2 top-[30px] bottom-[40px] w-px bg-gradient-to-b from-slate-700 via-slate-700/50 to-transparent"></div>

                         <div className="relative pl-14 pb-10 group/sub">
                           <div className="absolute left-[24px] -translate-x-1/2 top-6 w-3.5 h-3.5 rounded-full bg-[#05070a] border-2 border-slate-700 flex items-center justify-center group-hover/sub:border-slate-400 transition-colors duration-300 z-10 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                             <div className="w-1 h-1 rounded-full bg-slate-400 opacity-0 group-hover/sub:opacity-100 transition-opacity"></div>
                           </div>
                           
                           <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 md:p-6 hover:bg-white/[0.04] hover:border-slate-500/30 transition-all duration-300">
                             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                               <div className="flex items-center gap-3">
                                 <TerminalSquare size={18} className="text-slate-400" />
                                 <div className="flex flex-col">
                                    <h3 className="text-lg font-bold text-white tracking-tight">Software Engineer</h3>
                                    <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-0.5">WYDR</span>
                                 </div>
                               </div>
                               <span className="text-slate-400 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 bg-slate-800/50 rounded-md border border-slate-700/50 w-fit">2016 – 2018</span>
                             </div>
                             <p className="text-slate-400 text-sm leading-relaxed font-medium">Cut my teeth as a developer in a fast-paced startup environment, shipping features rapidly until an organization-wide collapse.</p>
                           </div>
                         </div>

                         <div className="relative pl-14 group/sub">
                           <div className="absolute left-[24px] -translate-x-1/2 top-6 w-3.5 h-3.5 rounded-full bg-[#05070a] border-2 border-slate-700 flex items-center justify-center group-hover/sub:border-slate-400 transition-colors duration-300 z-10 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                             <div className="w-1 h-1 rounded-full bg-slate-400 opacity-0 group-hover/sub:opacity-100 transition-opacity"></div>
                           </div>
                           
                           <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 md:p-6 hover:bg-white/[0.04] hover:border-slate-500/30 transition-all duration-300">
                             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                               <div className="flex items-center gap-3">
                                 <BookOpen size={18} className="text-slate-400" />
                                 <div className="flex flex-col">
                                    <h3 className="text-lg font-bold text-white tracking-tight">Engineering Student</h3>
                                    <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-0.5">Jadavpur University</span>
                                 </div>
                               </div>
                               <span className="text-slate-400 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 bg-slate-800/50 rounded-md border border-slate-700/50 w-fit">2012 – 2016</span>
                             </div>
                             
                             <p className="text-slate-400 text-sm leading-relaxed font-medium mb-5">While pursuing Electronics Engineering, I increasingly gravitated toward software development, teaching myself Android and web technologies.</p>
                             
                             <div className="bg-slate-900/40 p-5 rounded-2xl border border-white/5 flex gap-4 items-start group-hover/sub:bg-slate-800/40 group-hover/sub:border-slate-500/30 transition-colors">
                               <Smartphone size={18} className="text-slate-400 shrink-0 mt-0.5" />
                               <div className="flex flex-col gap-1.5">
                                 <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5"><Award size={12} className="text-slate-500" /> Key Project Shipped</span>
                                 <span className="text-slate-300 text-sm font-medium leading-relaxed">Selected by a faculty member to design and develop a mobile application that centralized departmental study materials.</span>
                               </div>
                             </div>
                           </div>
                         </div>
                       </div>

                     </div>
                   </ScrollReveal>
                 </div>
              </div>

            </div>
          </div>
        </section>

        <section className="w-full mt-8">
          <div className="flex flex-col gap-8">
            <ScrollReveal>
              <div className="flex flex-col gap-2">
                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">Core Principles</h2>
                <p className="text-slate-400 text-sm font-bold tracking-wide flex items-center gap-2">
                  <Award size={14} className="text-blue-400" /> Mental models for engineering high-performance systems.
                </p>
              </div>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: Layers, color: "blue", title: "Simplicity scales.", desc: "Complex architectures fail under their own weight. The best systems are the easiest to understand and explain." },
                { icon: ShieldCheck, color: "emerald", title: "Systems beat hacks.", desc: "A reliable, predictable structure will always outperform clever, unmaintainable code in production." },
                { icon: Package, color: "amber", title: "Product over code.", desc: "Code is a liability until it solves a problem. If the user experience fails, the tech stack doesn't matter." },
                { icon: Users, color: "fuchsia", title: "Technology serves people.", desc: "Whether teaching or guiding a user, technology must reduce friction and empower human capability." }
              ].map((principle, index) => {
                const themeMap = {
                  blue: { text: "text-blue-500", border: "hover:border-blue-500/30", bg: "bg-blue-500/10", shadow: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]" },
                  emerald: { text: "text-emerald-500", border: "hover:border-emerald-500/30", bg: "bg-emerald-500/10", shadow: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]" },
                  amber: { text: "text-amber-500", border: "hover:border-amber-500/30", bg: "bg-amber-500/10", shadow: "group-hover:shadow-[0_0_30px_rgba(245,158,11,0.1)]" },
                  fuchsia: { text: "text-fuchsia-500", border: "hover:border-fuchsia-500/30", bg: "bg-fuchsia-500/10", shadow: "group-hover:shadow-[0_0_30px_rgba(217,70,239,0.1)]" }
                };
                const theme = themeMap[principle.color];
                return (
                  <ScrollReveal key={principle.title} delay={index * 150}>
                    <div className={`bg-[#05070a]/80 border border-white/5 p-8 md:p-10 rounded-[2.5rem] ${theme.border} ${theme.shadow} transition-all duration-500 h-full group relative overflow-hidden flex flex-col backdrop-blur-md`}>
                      <principle.icon className={`absolute -bottom-10 -right-10 w-56 h-56 opacity-5 group-hover:opacity-10 group-hover:rotate-12 transition-all duration-700 pointer-events-none ${theme.text}`} strokeWidth={1} />
                      
                      <div className={`w-14 h-14 rounded-2xl ${theme.bg} border border-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-inner`}>
                        <principle.icon className={`${theme.text}`} size={24} />
                      </div>
                      <h4 className="text-xl font-bold text-white mb-3 relative z-10">{principle.title}</h4>
                      <p className="text-slate-400 text-sm font-medium leading-relaxed relative z-10">{principle.desc}</p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="w-full mt-16 mb-12">
          <ScrollReveal>
            <div className="flex flex-col gap-2 mb-8">
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">Command Center</h2>
              <p className="text-slate-400 text-sm font-bold tracking-wide flex items-center gap-2">
                <Search size={14} className="text-blue-400" /> Directing focus toward high-impact engineering sectors.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full h-auto lg:h-[480px]">
            <ScrollReveal delay={100} className="lg:col-span-8 h-full">
              <div className="bg-[#05070a]/80 border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden h-full group flex flex-col backdrop-blur-md">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[100px] rounded-full group-hover:bg-blue-500/10 transition-colors duration-1000 pointer-events-none" />
                <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-3 mb-10 relative z-10">
                  <Target className="text-blue-400" size={24}/> Targeting
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10 flex-grow">
                  {[
                    { name: 'Backend Architecture', icon: Server, desc: 'Enterprise data models & REST' },
                    { name: 'Platform Engineering', icon: Network, desc: 'Developer infra & CI/CD logic' },
                    { name: 'AI Systems Integration', icon: BrainCircuit, desc: 'LLM logic nodes & agentic flows' },
                    { name: 'Developer Tooling', icon: TerminalSquare, desc: 'CLI design & automated workflows' }
                  ].map(item => (
                    <div key={item.name} className="flex flex-col justify-center gap-1.5 bg-white/[0.02] border border-white/5 p-5 rounded-2xl hover:bg-blue-500/10 hover:border-blue-500/30 transition-all group/card">
                      <div className="flex items-center gap-3">
                        <item.icon size={18} className="text-blue-500 shrink-0 group-hover/card:scale-110 transition-transform" />
                        <span className="font-bold text-sm tracking-wide text-slate-200 group-hover/card:text-white transition-colors">{item.name}</span>
                      </div>
                      <span className="text-slate-500 text-[11px] font-medium pl-8">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200} className="lg:col-span-4 h-full">
              <div className="bg-[#05070a]/80 border border-white/5 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden h-full group flex flex-col backdrop-blur-md">
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-500/5 blur-[80px] rounded-full group-hover:bg-indigo-500/10 transition-colors duration-1000 pointer-events-none" />
                <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-3 mb-10 relative z-10">
                  <Activity className="text-indigo-400" size={24}/> Exploring
                </h3>
                <div className="flex flex-col justify-between flex-grow gap-3 relative z-10">
                  {[
                    { name: 'Distributed Systems', icon: Database },
                    { name: 'Event-Driven Arch', icon: Workflow },
                    { name: 'LLM Workflows', icon: Cpu },
                    { name: 'High-Perf Compute', icon: Zap }
                  ].map(item => (
                    <div key={item.name} className="flex items-center justify-between bg-white/[0.02] border border-white/5 p-5 rounded-xl hover:bg-indigo-500/10 hover:border-indigo-500/30 transition-all group/card">
                      <span className="font-bold text-sm tracking-wide text-slate-300 group-hover/card:text-white transition-colors">{item.name}</span>
                      <item.icon size={16} className="text-indigo-500 shrink-0 group-hover/card:scale-110 group-hover/card:rotate-12 transition-transform" />
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="w-full pt-16 border-t border-slate-800/60 pb-8 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
          <ScrollReveal delay={100}>
            <div className="bg-gradient-to-b from-[#0a0f1a] to-[#05070a] rounded-[3rem] p-10 md:p-20 flex flex-col items-center justify-center text-center gap-8 relative overflow-hidden shadow-2xl border border-white/5 mt-8 group">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-blue-600/5 blur-[100px] pointer-events-none group-hover:bg-blue-600/10 transition-all duration-1000" />
              <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 mb-2 relative z-10 shadow-[0_0_30px_rgba(37,99,235,0.2)] group-hover:scale-110 transition-transform duration-500">
                <Workflow size={36} className="text-blue-400" />
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight relative z-10 leading-tight max-w-4xl">
                I followed problems worth solving, <br className="hidden md:block" />
                <span className="text-blue-400">spanning classrooms to enterprise cores.</span>
              </h2>
              <p className="text-slate-400 text-lg md:text-xl max-w-3xl leading-relaxed font-medium relative z-10 mt-2 italic">
                "Today, I build technology with the broader perspective of how complex systems actually behave across every domain."
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-8 w-full relative z-10">
                <Link to="/lab" className="w-full sm:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:scale-105 flex items-center justify-center gap-3 text-base group/btn">
                  Engineering Lab <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
                <Link to="/" className="w-full sm:w-auto px-10 py-4 bg-[#05070a] border border-slate-700 hover:border-slate-400 text-white font-bold rounded-2xl transition-all shadow-lg text-center text-base">
                  Return to Home
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </section>

      </main>
    </div>
  );
}