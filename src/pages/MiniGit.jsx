import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Terminal, GitCommit, PlayCircle, X, ZoomIn, Hand, ChevronLeft, ChevronRight, 
  Cpu, TerminalSquare, Command, CheckCircle2, ArrowRight, Database, Network, GitBranch, 
  FileDigit, ArrowDown, ShieldCheck, Zap, Server, Code2, Download, Layers, Box, Lock
} from 'lucide-react';
import { projects } from '../data/projects';

export default function MiniGit() {
  const data = projects.minigit;
  const [activeTab, setActiveTab] = useState('terminal'); 
  const diagrams = data.architectureDiagrams ? data.architectureDiagrams.map(d => ({ type: 'image', src: d.path, title: d.name })) : [];
  const scenarios = data.videos?.scenarios ? data.videos.scenarios.map(v => ({ type: 'video', src: v.youtubeId, title: v.title })) : [];
  const allMedia = [...diagrams, ...scenarios];
  const [activeIndex, setActiveIndex] = useState(null); 
  const activeMedia = activeIndex !== null ? allMedia[activeIndex] : null;
  const [isZoomed, setIsZoomed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => { if (!isZoomed) setPanPosition({ x: 0, y: 0 }); }, [isZoomed]);

  const handleMouseDown = (e) => {
    if (!isZoomed) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !isZoomed) return;
    setPanPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  return (
    <div className="flex flex-col gap-8 md:gap-12 pt-24 pb-24 animate-in fade-in duration-700 relative max-w-7xl mx-auto px-4 md:px-6">
      <style>{`
        .mgit-scroll::-webkit-scrollbar { width: 4px; height: 4px; }
        .mgit-scroll::-webkit-scrollbar-track { background: transparent; }
        .mgit-scroll::-webkit-scrollbar-thumb { background: #065f46; border-radius: 10px; }
        .mgit-scroll::-webkit-scrollbar-thumb:hover { background: #10b981; }
      `}</style>
      <section className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 w-fit">
            <Terminal className="text-emerald-500" size={32} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{data.title}</h1>
            <p className="text-emerald-500/80 font-mono text-xs md:text-sm mt-1">{data.tagline}</p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-6 gap-3 w-full">
        {[
          { label: 'Language', val: 'Java' },
          { label: 'Storage', val: 'SHA-1 Objects' },
          { label: 'Compression', val: 'Zlib' },
          { label: 'Testing', val: 'JUnit 5' },
          { label: 'Architecture', val: 'Git-Inspired VCS' },
          { label: 'Platform', val: 'Cross Platform' }
        ].map(stat => (
          <div key={stat.label} className="bg-slate-900/40 border border-slate-800/50 rounded-xl p-3 flex flex-col items-center justify-center text-center shadow-sm">
            <span className="text-slate-500 text-[10px] uppercase font-mono tracking-widest mb-1">{stat.label}</span>
            <span className="text-emerald-400 font-bold text-sm">{stat.val}</span>
          </div>
        ))}
      </section>

      <div className="w-full bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-[0_0_50px_-12px_rgba(16,185,129,0.1)] flex flex-col lg:flex-row h-auto lg:h-[600px]">
        
        <div className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-slate-800 bg-slate-900/30 flex flex-col shrink-0">
          <div className="p-4 md:p-6 border-b border-slate-800 flex items-center gap-2 text-slate-100 font-bold text-sm md:text-base">
            <Cpu size={18} className="text-emerald-500" /> Core Philosophy
          </div>
          
          <div className="p-4 md:p-6 flex flex-col gap-6 lg:gap-8 overflow-y-auto mgit-scroll max-h-[370px] lg:max-h-full">
            <div className="flex flex-col gap-2 md:gap-3">
              <h4 className="text-emerald-400 text-[10px] md:text-xs font-mono uppercase tracking-widest">Why Build Git Again?</h4>
              <p className="text-slate-300 text-sm md:text-[13px] leading-relaxed">
                Git is one of the most widely trusted tools in software engineering, yet most developers never see the mechanisms behind it. MiniGit was built to understand how content-addressable storage, commit graphs, compression, and repository recovery actually work beneath the abstraction.
              </p>
            </div>
            <div className="flex flex-col gap-2 md:gap-3">
              <h4 className="text-emerald-400 text-[10px] md:text-xs font-mono uppercase tracking-widest">What I Learned</h4>
              <p className="text-slate-300 text-sm md:text-[13px] leading-relaxed">
                No frameworks. No shortcuts. Just pure Java. I engineered the object storage layer from the ground up—SHA-1 hashing, Zlib compression, and DAG traversal. By rebuilding Git's core storage model from scratch, I gained a deeper understanding of how modern version control systems manage history, integrity, and recovery.
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col min-w-0 min-h-[500px] lg:min-h-0">
          
          <div className="bg-slate-900/50 px-4 md:px-6 py-3 border-b border-slate-800 flex items-center justify-between overflow-x-auto mgit-scroll">
            <div className="flex gap-2 md:gap-4 shrink-0">
              <button 
                onClick={() => setActiveTab('terminal')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-[11px] md:text-xs font-mono transition-all ${activeTab === 'terminal' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <Command size={14} /> Execution.log
              </button>
              <button 
                onClick={() => setActiveTab('architecture')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-[11px] md:text-xs font-mono transition-all ${activeTab === 'architecture' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <GitCommit size={14} /> Architecture.svg
              </button>
            </div>
            <div className="hidden md:flex gap-1.5 shrink-0 ml-4">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-red-700"></div>
            </div>
          </div>

          <div className="flex-1 overflow-hidden bg-slate-950 p-4 md:p-6">
            
            {activeTab === 'terminal' && (
              <div className="h-full overflow-y-auto mgit-scroll font-mono text-xs md:text-[13px] text-slate-300 space-y-4 pr-2 md:pr-4 leading-relaxed">
                <div className="opacity-50 break-all"># System Initialized: ubuntu@raj-dev:~/workspace/minigit</div>
                
                <div>
                  <p><span className="text-emerald-400">$</span> minigit sttaus</p>
                  <p className="text-rose-400 mt-1">Command not found.</p>
                  <p className="text-slate-400">Did you mean: <span className="text-emerald-400">status</span> ?</p>
                </div>

                <div>
                  <p><span className="text-emerald-400">$</span> minigit pack</p>
                  <p className="text-slate-400 mt-1">Scanning loose objects...</p>
                  <p className="text-slate-400">Compressing object database...</p>
                  <p className="text-emerald-500">Packfile generated successfully.</p>
                </div>

                <div>
                  <p><span className="text-emerald-400">$</span> minigit clone repoA repoB</p>
                  <p className="text-emerald-500 mt-1">Repository cloned successfully.</p>
                  <p className="text-slate-400">142 objects restored.</p>
                </div>

                <div>
                  <p><span className="text-emerald-400">$</span> minigit log</p>
                  <pre className="text-slate-500 text-[10px] md:text-[11px] mt-2 leading-snug overflow-x-auto mgit-scroll pb-2">
                    {`commit 3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c (HEAD -> main)
                    Date: Mon Jun 08 12:35:10 2026
                        fix: correct UI welcome text

                    commit 9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b
                    Date: Mon Jun 08 12:32:05 2026
                        feat: initial architecture`}
                  </pre>
                </div>
                <div className="animate-pulse text-emerald-400 mt-2">$ _</div>
              </div>
            )}

            {activeTab === 'architecture' && (
              <div className="h-full flex flex-col gap-4">
                 <div className="flex-1 bg-white rounded-xl border border-slate-800 p-4 md:p-8 flex items-center justify-center overflow-hidden cursor-zoom-in" onClick={() => setActiveIndex(0)}>
                   <img 
                    src={diagrams[0]?.src} 
                    alt="MiniGit Architecture" 
                    className="max-w-full max-h-full object-contain mix-blend-multiply" 
                   />
                 </div>
                 <p className="text-slate-500 text-[10px] md:text-xs font-mono text-center uppercase tracking-widest break-words">Directed Acyclic Graph (DAG) & Object Storage Verification</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <div className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-6 md:p-8 flex flex-col">
          <h3 className="text-emerald-400 font-mono text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
            <TerminalSquare size={16} /> Features Implemented
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-2 text-slate-300 font-mono text-xs md:text-sm">
            {['init', 'add', 'commit', 'status', 'log', 'branch', 'checkout', 'merge', 'diff', 'pack', 'clone'].map(cmd => (
              <span key={cmd} className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0"/> {cmd}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-6 md:p-8 flex flex-col">
          <h3 className="text-emerald-400 font-mono text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
            <Database size={16} /> Engineering Systems
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-4 gap-x-2 text-slate-300 font-mono text-xs md:text-sm">
            {['SHA-1 Object Database', 'Atomic File Operations', 'Commit Graph Engine', 'Branch Pointer System', 'Packfile Compression', 'Cross-Platform Pathing', 'Repository Recovery', 'Command Correction Engine'].map(concept => (
              <span key={concept} className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0"/> {concept}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-6 w-full items-center text-center">
        <div className="flex flex-col gap-1">
          <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Repository Internals</h3>
          <p className="text-slate-400 text-sm">The lifecycle of data flow within the version control system.</p>
        </div>
        
        <div className="bg-slate-900/40 border border-slate-800/50 rounded-3xl p-6 md:p-10 flex flex-wrap items-center justify-center gap-y-8 gap-x-2 md:gap-x-4 w-full max-w-5xl shadow-xl">
          
          <div className="px-4 md:px-6 py-3 border border-emerald-500/30 bg-emerald-500/10 rounded-xl text-emerald-400 font-mono text-xs md:text-sm shadow-[0_0_15px_rgba(16,185,129,0.1)] whitespace-nowrap">
            Working Directory
          </div>
          
          <div className="relative flex justify-center items-center px-1 md:px-2 shrink-0">
            <span className="absolute -top-4 md:-top-5 text-[9px] md:text-[10px] font-mono uppercase tracking-widest text-slate-400">Add</span>
            <ArrowRight size={16} className="text-slate-500" />
          </div>

          <div className="px-4 py-3 border border-slate-700 bg-slate-800 rounded-xl text-slate-300 font-mono text-xs md:text-sm flex items-center gap-2 whitespace-nowrap">
            <FileDigit size={16} className="shrink-0"/> Blob Objects
          </div>
          
          <ArrowRight size={16} className="text-slate-500 shrink-0" />
          
          <div className="px-4 py-3 border border-slate-700 bg-slate-800 rounded-xl text-slate-300 font-mono text-xs md:text-sm flex items-center gap-2 whitespace-nowrap">
            <Network size={16} className="shrink-0"/> Tree Object
          </div>
          
          <ArrowRight size={16} className="text-slate-500 shrink-0" />
          
          <div className="px-4 py-3 border border-slate-700 bg-slate-800 rounded-xl text-slate-300 font-mono text-xs md:text-sm flex items-center gap-2 whitespace-nowrap">
            <GitCommit size={16} className="shrink-0"/> Commit Object
          </div>
          
          <ArrowRight size={16} className="text-slate-500 shrink-0" />
          
          <div className="px-4 py-3 border border-slate-700 bg-slate-800 rounded-xl text-slate-300 font-mono text-xs md:text-sm flex items-center gap-2 whitespace-nowrap">
            <GitBranch size={16} className="shrink-0"/> Branch Pointer
          </div>
          
          <ArrowRight size={16} className="text-slate-500 shrink-0" />
          
          <div className="px-4 md:px-6 py-3 border border-emerald-500/50 bg-emerald-500/20 rounded-xl text-emerald-400 font-bold font-mono text-xs md:text-sm shadow-[0_0_20px_rgba(16,185,129,0.2)] whitespace-nowrap">
            HEAD
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <div className="bg-slate-900/40 border border-slate-800/50 p-6 rounded-2xl flex flex-col gap-2">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-2"><Lock className="text-emerald-500" size={18} /></div>
          <h4 className="text-white font-bold text-lg tracking-tight">Atomic Commits</h4>
          <p className="text-slate-400 text-sm leading-relaxed mt-1">Uses <code className="text-emerald-400 bg-emerald-400/10 px-1 py-0.5 rounded text-[11px]">StandardCopyOption.ATOMIC_MOVE</code> to ensure commits either succeed entirely or fail safely.</p>
        </div>

        <div className="bg-slate-900/40 border border-slate-800/50 p-6 rounded-2xl flex flex-col gap-2">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-2"><ShieldCheck className="text-blue-500" size={18} /></div>
          <h4 className="text-white font-bold text-lg tracking-tight">Memory Safety</h4>
          <p className="text-slate-400 text-sm leading-relaxed mt-1">Explicit <code className="text-blue-400 bg-blue-400/10 px-1 py-0.5 rounded text-[11px]">Inflater</code> and <code className="text-blue-400 bg-blue-400/10 px-1 py-0.5 rounded text-[11px]">Deflater</code> cleanup prevents native zlib resource leaks in long-running processes.</p>
        </div>

        <div className="bg-slate-900/40 border border-slate-800/50 p-6 rounded-2xl flex flex-col gap-2">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-2"><Server className="text-indigo-500" size={18} /></div>
          <h4 className="text-white font-bold text-lg tracking-tight">Cross Platform</h4>
          <p className="text-slate-400 text-sm leading-relaxed mt-1">Repository state and path normalization remains entirely deterministic across Windows, Linux, and Termux environments.</p>
        </div>
      </section>

      <section className="flex flex-col gap-6 pt-8 w-full border-t border-slate-800/50">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Engineering Decisions</h2>
          <p className="text-slate-400 text-sm">Architectural choices made to guarantee data integrity and developer experience.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {[
            { t: 'Atomic Operations', d: 'Repository updates use ATOMIC_MOVE to guarantee crash-safe commits and prevent corrupted writes.' },
            { t: 'Deterministic Hashing', d: 'TreeMap ordering guarantees identical repository states always generate mathematically identical SHA-1 hashes.' },
            { t: 'Native Memory Safety', d: 'Inflater and Deflater resources are explicitly released to avoid native zlib memory leaks during bulk operations.' },
            { t: 'Command Recovery', d: 'Custom Levenshtein Distance implementation automatically corrects and suggests mistyped CLI commands.' },
            { t: 'Cross Platform Consistency', d: 'Custom path normalization ensures repository object integrity across Windows, Linux, and Termux filesystems.' },
            { t: 'Testing Architecture', d: 'JUnit suite strictly validates hashing, compression, path traversal, branching, and repository state drift.' }
          ].map((item, i) => (
            <div key={i} className="bg-slate-900/20 border border-slate-800/50 p-5 rounded-2xl">
              <h4 className="text-emerald-400 font-bold text-sm mb-2">{item.t}</h4>
              <p className="text-slate-400 text-xs leading-relaxed">{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-6 w-full">
        <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3"><ShieldCheck className="text-emerald-500"/> Testing Architecture</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            'Hash Determinism',
            'Compression Integrity',
            'Path Traversal Security',
            'End-to-End Repository Lifecycle'
          ].map(test => (
            <div key={test} className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center justify-center text-center shadow-inner hover:border-emerald-500/30 transition-colors">
              <span className="text-slate-300 font-mono text-xs">{test}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4 md:gap-6 pt-8 border-t border-slate-800/50">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">See it in action.</h2>
          <p className="text-slate-400 text-sm md:text-base">Live demonstrations of atomic commits, hotfixes, and system state recovery.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {scenarios.map((scenario, idx) => (
            <div key={idx} onClick={() => setActiveIndex(diagrams.length + idx)} className="group bg-slate-900/40 border border-slate-800/50 rounded-2xl p-3 md:p-4 cursor-pointer hover:border-emerald-500/50 transition-all">
              <div className="aspect-video bg-black rounded-xl overflow-hidden relative mb-3 md:mb-4 border border-slate-800/50">
                <img src={`https://img.youtube.com/vi/${scenario.src}/maxresdefault.jpg`} alt={scenario.title} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
                <div className="absolute inset-0 flex items-center justify-center bg-emerald-500/0 group-hover:bg-emerald-500/10 transition-all z-10 duration-500">
                  <PlayCircle size={48} className="text-white/40 group-hover:text-emerald-400 transition-all group-hover:scale-110 duration-500 drop-shadow-2xl" />
                </div>
              </div>
              <h4 className="text-white font-mono text-xs md:text-sm px-1">{scenario.title}</h4>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-6 pt-8 w-full border-t border-slate-800/50">
        <h2 className="text-2xl font-bold text-white tracking-tight">Built With Production Engineering Principles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            'Crash-safe atomic commits',
            'Deterministic repository hashing',
            'Native memory leak prevention',
            'DAG based commit traversal',
            'Zlib object compression',
            'Cross-platform consistency',
            'Algorithmic typo correction',
            'JUnit validation suite'
          ].map((principle, i) => (
            <div key={i} className="flex items-start gap-2 bg-slate-900/20 p-3 rounded-lg border border-slate-800/30">
              <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
              <span className="text-slate-300 text-sm leading-snug">{principle}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-6 w-full pt-8">
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[80px] pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4 relative z-10">
            <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
              <TerminalSquare className="text-emerald-500" /> Quick Start
            </h2>
            <a href="https://github.com/MrV3nomous/MiniGit" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg text-sm text-white transition-colors">
              <GitBranch size={16} /> View Repository
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            <div className="flex flex-col gap-4">
              <h4 className="text-slate-300 font-bold flex items-center gap-2"><Download size={16} className="text-emerald-500"/> Download & Run</h4>
              <p className="text-slate-400 text-sm">Grab the latest <code className="text-emerald-400 bg-emerald-400/10 px-1 py-0.5 rounded">minigit.jar</code> from the Releases tab and run it globally.</p>
              <div className="bg-black border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-300 overflow-x-auto">
                <span className="text-emerald-400">$</span> java -jar minigit.jar help<br/><br/>
                <span className="text-slate-500"># Pro-tip: Alias this in your .bashrc or .zshrc</span><br/>
                <span className="text-emerald-400">$</span> alias minigit="java -jar /path/to/minigit.jar"
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-slate-300 font-bold flex items-center gap-2"><Code2 size={16} className="text-emerald-500"/> Build from Source</h4>
              <p className="text-slate-400 text-sm">Clone the repository and compile the Java source files manually.</p>
              <div className="bg-black border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-300 overflow-x-auto">
                <span className="text-emerald-400">$</span> git clone https://github.com/MrV3nomous/MiniGit.git<br/>
                <span className="text-emerald-400">$</span> cd MiniGit<br/><br/>
                <span className="text-slate-500"># Compile source files</span><br/>
                <span className="text-emerald-400">$</span> javac -d bin $(find src -name "*.java")<br/><br/>
                <span className="text-slate-500"># Package the standalone executable</span><br/>
                <span className="text-emerald-400">$</span> echo "Main-Class: minigit.Main" &gt; MANIFEST.MF<br/>
                <span className="text-emerald-400">$</span> jar cvfm minigit.jar MANIFEST.MF -C bin .
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-emerald-900/10 border border-emerald-500/20 rounded-[2rem] p-8 md:p-12 flex flex-col items-center text-center mt-8 w-full">
        <h2 className="text-xs font-mono text-emerald-500/80 uppercase tracking-widest mb-6">What This Project Demonstrates</h2>
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl">
          {[
            'Version Control Internals', 'Deterministic Systems Design', 'Storage Engine Engineering', 
            'Compression Algorithms', 'Graph Traversal', 'Fault Tolerant Persistence', 
            'CLI Architecture', 'Cross Platform Development', 'Test Driven Engineering'
          ].map(skill => (
            <span key={skill} className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-full text-xs font-mono text-slate-300 flex items-center gap-2 shadow-sm">
              <CheckCircle2 size={14} className="text-emerald-500"/> {skill}
            </span>
          ))}
        </div>
      </section>

      {activeMedia && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950/95 backdrop-blur-xl p-2 md:p-8 animate-in fade-in duration-200" onClick={() => setActiveIndex(null)}>
          <div className="absolute top-4 right-4 md:top-6 md:right-6 flex gap-2 md:gap-4 z-[110]" onClick={e => e.stopPropagation()}>
            <span className="hidden md:block text-slate-400 font-mono text-xs bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-800">
              {activeIndex + 1} / {allMedia.length}
            </span>
            <button className="p-2 bg-slate-900/80 border border-slate-700 rounded-full text-slate-300 hover:text-emerald-400 hover:bg-slate-800" onClick={() => setActiveIndex(null)}>
              <X size={20} className="md:w-6 md:h-6" />
            </button>
          </div>
          <button onClick={handlePrev} className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-slate-900/80 border border-slate-700 rounded-full text-slate-300 hover:text-emerald-400 hover:bg-slate-800 hover:scale-110 transition-all z-[110]">
            <ChevronLeft size={24} />
          </button>
          <button onClick={handleNext} className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-slate-900/80 border border-slate-700 rounded-full text-slate-300 hover:text-emerald-400 hover:bg-slate-800 hover:scale-110 transition-all z-[110]">
            <ChevronRight size={24} />
          </button>
          
          <div className="relative w-full max-w-7xl h-[85vh] md:h-[80vh] flex flex-col items-center justify-center select-none" onClick={e => e.stopPropagation()}>
            {activeMedia.type === 'image' && (
              <div className="w-full h-full bg-white rounded-xl flex items-center justify-center overflow-hidden cursor-zoom-in shadow-2xl" 
                   onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={() => setIsDragging(false)} onTouchStart={() => setIsDragging(true)} onTouchEnd={() => setIsDragging(false)}
                   onClick={() => setIsZoomed(!isZoomed)}>
                <img src={activeMedia.src} style={{ transform: `translate(${panPosition.x}px, ${panPosition.y}px) scale(${isZoomed ? 2.5 : 1})` }} className="mix-blend-multiply transition-transform max-w-full max-h-full object-contain pointer-events-none" />
              </div>
            )}
            {activeMedia.type === 'video' && (
              <iframe key={activeMedia.src} src={`https://www.youtube.com/embed/${activeMedia.src}?autoplay=1`} className="w-full max-w-5xl aspect-video rounded-xl md:rounded-2xl border border-slate-800 shadow-2xl" allowFullScreen />
            )}
            <h3 className="text-emerald-400 font-mono text-sm md:text-xl mt-4 md:mt-6 text-center">{activeMedia.title}</h3>
          </div>
        </div>
      )}
    </div>
  );
}