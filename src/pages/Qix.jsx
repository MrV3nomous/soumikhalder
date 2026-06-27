import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowLeft, ExternalLink, Lock, Server, ShieldCheck,
    Trash2, Database, Network, Key, Cpu, Globe, Code2,
    Terminal, PlayCircle, Maximize2, Hand, X, ChevronLeft, ChevronRight, ArrowRight
} from 'lucide-react';
import { projects } from '../data/projects';

export default function Qix() {
    const qix = projects.qix;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const mainVideo = qix.videos?.miniclips?.[0];
    const otherVideos = qix.videos?.miniclips?.slice(1) || [];

    const allMedia = [];
    if (qix.architectureDiagrams) {
        qix.architectureDiagrams.forEach(d => {
            allMedia.push({ type: 'image', src: d.path, title: d.name });
        });
    }
    if (otherVideos.length > 0) {
        otherVideos.forEach(v => {
            if (v.youtubeId) {
                allMedia.push({ type: 'video', src: v.youtubeId, title: v.title });
            }
        });
    }

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
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 blur-[120px] rounded-full mix-blend-screen" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/5 blur-[120px] rounded-full mix-blend-screen" />
                <div className="absolute top-[40%] left-[30%] w-[20%] h-[20%] bg-cyan-600/5 blur-[100px] rounded-full mix-blend-screen" />
            </div>

            <main className="relative z-10 pt-24 pb-32 px-4 md:px-8 max-w-7xl mx-auto flex flex-col gap-24 w-full">

                <section className="flex flex-col gap-12 w-full items-center text-center">

                    <div className="flex flex-col gap-6 items-center max-w-4xl mx-auto">
                        <div className="flex items-center gap-3 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-2 bg-cyan-500/10 w-fit px-4 py-2 rounded-full border border-cyan-500/20 shadow-inner">
                            <Lock size={16} /> Secure Infrastructure
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.05]">
                            {qix.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed max-w-3xl">
                            {qix.tagline}
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-2 mt-2 max-w-4xl mx-auto">
                        {qix.stack.map(tech => (
                            <span key={tech} className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs font-bold uppercase tracking-widest text-slate-300 shadow-sm">{tech}</span>
                        ))}
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 mt-2">
                        <a href={qix.liveUrl} target="_blank" rel="noreferrer" className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)] flex items-center justify-center gap-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
                            Launch Application <ExternalLink size={18} />
                        </a>
                        <a href={qix.github} target="_blank" rel="noreferrer" className="px-8 py-4 bg-slate-900 border border-slate-700 hover:bg-slate-800 text-white font-bold rounded-2xl transition-all shadow-lg flex items-center justify-center gap-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500">
                            View Source Code <Code2 size={18} />
                        </a>
                    </div>

                    {mainVideo && (
                        <div className="w-full max-w-5xl mx-auto mt-12 relative group overflow-hidden">
                            <div className="absolute -inset-1.5 rounded-[2.5rem] blur-xl opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                            <div className="relative w-full aspect-video rounded-[2rem] overflow-hidden border border-slate-700/50 shadow-2xl bg-black">
                                <iframe
                                    src={`https://www.youtube.com/embed/${mainVideo.youtubeId}?autoplay=0&rel=0`}
                                    title={mainVideo.title}
                                    className="w-full h-full absolute inset-0 z-10"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    )}
                </section>

                <section className="w-full bg-[#05070a]/80 border border-slate-800/60 rounded-[2.5rem] p-8 md:p-16 shadow-2xl backdrop-blur-md relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>
                    <div className="flex flex-col gap-6 relative z-10 max-w-4xl">
                        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">Frictionless Secure Communication</h2>
                        <p className="text-lg text-slate-300 leading-relaxed font-medium">
                            Qix eliminates the barriers inherent in modern encrypted messaging. It requires no phone numbers, no account creation, and no app downloads, while ensuring absolutely zero persistent chat history.
                        </p>
                        <p className="text-lg text-slate-300 leading-relaxed font-medium">
                            Users generate a secure vault, share an ephemeral session link, and conduct sensitive communication. Upon completion, the vault and all associated metadata are mathematically and physically eradicated from the infrastructure.
                        </p>
                    </div>
                </section>

                <section className="flex flex-col gap-8 w-full mt-8">
                    <div className="flex flex-col gap-2 mb-2 max-w-3xl">
                        <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2"><Key size={16} /> The Cryptographic Core</span>
                        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">Zero-Knowledge Architecture</h2>
                        <p className="text-slate-400 text-lg font-medium mt-2">
                            The routing server is mathematically incapable of decrypting the payloads it transmits. This constraint is enforced by leveraging native W3C browser specifications regarding URL fragment handling.
                        </p>
                    </div>

                    <div className="w-full bg-[#05070a] border border-blue-500/20 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-[0_0_40px_rgba(37,99,235,0.1)] group">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 pointer-events-none"></div>

                        <div className="flex flex-wrap justify-center gap-6 relative z-10">
                            {[
                                { step: "KEY", title: "Local Key Gen", desc: "The browser natively generates an ephemeral 256-bit AES-GCM encryption key via the Web Crypto API.", icon: Key },
                                { step: "HASH", title: "The Fragment Trick", desc: "The key is appended to the invite link as a hash fragment. By W3C standards, browsers never send this to the server.", icon: Globe },
                                { step: "ENCRYPT", title: "Client Encryption", desc: "The React application encrypts the payload into binary ciphertext natively on the client before network transmission.", icon: ShieldCheck },
                                { step: "ROUTER", title: "Blind Routing", desc: "The Go backend receives the encrypted binary and acts as a blind router, broadcasting it to connected WebSockets.", icon: Server },
                                { step: "DECRYPT", title: "Local Decryption", desc: "The recipient's browser intercepts the ciphertext, retrieves the key from the local URL bar, and decrypts the payload.", icon: Lock }
                            ].map((item, idx) => (
                                <div key={idx} className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden group-hover:border-slate-700 transition-colors">
                                    <div className="absolute -right-2 -top-4 text-[60px] font-black text-white/5 select-none">{item.step}</div>
                                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center relative z-10">
                                        <item.icon size={20} className="text-cyan-400" />
                                    </div>
                                    <h4 className="text-lg font-bold text-white relative z-10">{item.title}</h4>
                                    <p className="text-slate-400 text-sm font-medium relative z-10 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="flex flex-col gap-8 w-full mt-12">
                    <div className="flex flex-col gap-2 mb-2 max-w-3xl">
                        <span className="text-blue-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2"><Network size={16} /> System Design</span>
                        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">Decoupled Microservices</h2>
                        <p className="text-slate-400 text-lg font-medium mt-2">
                            The architecture isolates the encryption engine from the routing engine, orchestrated perfectly via Docker containers.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">

                        <div className="bg-gradient-to-br from-slate-900 to-[#05070a] border border-slate-800 p-8 rounded-[2rem] flex flex-col gap-5 hover:border-cyan-500/40 transition-colors relative overflow-hidden shadow-xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[50px] rounded-full pointer-events-none"></div>
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20"><Terminal size={20} className="text-cyan-400" /></div>
                                <h3 className="text-2xl font-black text-white">The Engine (UI)</h3>
                            </div>
                            <div className="flex gap-2">
                                <span className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded text-[10px] font-bold uppercase tracking-widest text-slate-300">React</span>
                                <span className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded text-[10px] font-bold uppercase tracking-widest text-slate-300">Web Crypto API</span>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed font-medium">
                                The client-side encryption engine. It manages WebSocket state and retains decrypted messages strictly within volatile browser memory (RAM), ensuring zero data touches persistent `localStorage`.
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-slate-900 to-[#05070a] border border-slate-800 p-8 rounded-[2rem] flex flex-col gap-5 hover:border-blue-500/40 transition-colors relative overflow-hidden shadow-xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[50px] rounded-full pointer-events-none"></div>
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20"><Server size={20} className="text-blue-400" /></div>
                                <h3 className="text-2xl font-black text-white">The Traffic Controller</h3>
                            </div>
                            <div className="flex gap-2">
                                <span className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded text-[10px] font-bold uppercase tracking-widest text-slate-300">Go (Golang)</span>
                                <span className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded text-[10px] font-bold uppercase tracking-widest text-slate-300">Gorilla WebSockets</span>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed font-medium">
                                A high-throughput blind router. It issues stateless JWTs and maintains an in-memory Hub of WebSockets, broadcasting incoming binary payloads exclusively to localized vault channels.
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-slate-900 to-[#05070a] border border-slate-800 p-8 rounded-[2rem] flex flex-col gap-5 hover:border-emerald-500/40 transition-colors relative overflow-hidden shadow-xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[50px] rounded-full pointer-events-none"></div>
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20"><Database size={20} className="text-emerald-400" /></div>
                                <h3 className="text-2xl font-black text-white">The Buffer Layer</h3>
                            </div>
                            <div className="flex gap-2">
                                <span className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded text-[10px] font-bold uppercase tracking-widest text-slate-300">MongoDB</span>
                                <span className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded text-[10px] font-bold uppercase tracking-widest text-slate-300">Redis</span>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed font-medium">
                                MongoDB persists encrypted messages and vault metadata. Redis functions as a low-latency memory buffer, temporarily caching messages to instantly flush to clients upon WebSocket reconnection.
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-slate-900 to-[#05070a] border border-slate-800 p-8 rounded-[2rem] flex flex-col gap-5 hover:border-rose-500/40 transition-colors relative overflow-hidden shadow-xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 blur-[50px] rounded-full pointer-events-none"></div>
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20"><Trash2 size={20} className="text-rose-400" /></div>
                                <h3 className="text-2xl font-black text-white">The Failsafe Sweeper</h3>
                            </div>
                            <div className="flex gap-2">
                                <span className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded text-[10px] font-bold uppercase tracking-widest text-slate-300">Python Worker</span>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed font-medium">
                                An asynchronous Python worker (`shredder.py`) that aggressively sanitizes orphaned data, abandoned vaults, and lingering connections that evade standard database TTL policies.
                            </p>
                        </div>

                    </div>
                </section>

                <section className="flex flex-col gap-8 w-full mt-12 border-t border-slate-800/60 pt-16">
                    <div className="flex flex-col gap-2 mb-2 text-center items-center max-w-2xl mx-auto">
                        <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">Data Destruction</span>
                        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">Three Layers of Ephemerality</h2>
                        <p className="text-slate-400 text-lg font-medium mt-2">
                            Data persistence is treated as a vulnerability. Every piece of data in Qix is governed by a strict, irreversible expiration lifecycle.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                        <div className="bg-[#05070a] border border-white/5 p-8 rounded-[2rem] flex flex-col gap-4 items-center text-center">
                            <div className="w-14 h-14 rounded-full bg-rose-500/10 flex items-center justify-center border border-rose-500/30 text-rose-500 mb-2">
                                <Trash2 size={24} />
                            </div>
                            <h4 className="text-xl font-bold text-white">Manual Vault Termination</h4>
                            <p className="text-sm text-slate-400 font-medium">When a user terminates the session, the Go server immediately drops all active WebSockets and permanently deletes the associated database records.</p>
                        </div>

                        <div className="bg-[#05070a] border border-white/5 p-8 rounded-[2rem] flex flex-col gap-4 items-center text-center">
                            <div className="w-14 h-14 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/30 text-amber-500 mb-2">
                                <ShieldCheck size={24} />
                            </div>
                            <h4 className="text-xl font-bold text-white">Automated TTL Expiration</h4>
                            <p className="text-sm text-slate-400 font-medium">If users abandon the session without termination, MongoDB's strict Time-To-Live (TTL) index automatically purges the vault after 48 hours of inactivity.</p>
                        </div>

                        <div className="bg-[#05070a] border border-white/5 p-8 rounded-[2rem] flex flex-col gap-4 items-center text-center">
                            <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/30 text-blue-500 mb-2">
                                <Lock size={24} />
                            </div>
                            <h4 className="text-xl font-bold text-white">Cryptographic Obsolescence</h4>
                            <p className="text-sm text-slate-400 font-medium">Even in the event of a total database breach, bad actors retrieve only binary ciphertext. Without the decryption key held exclusively in the users' browser histories, the data remains mathematically useless.</p>
                        </div>
                    </div>
                </section>

                {allMedia.length > 0 && (
                    <section className="flex flex-col gap-8 w-full mt-16 pt-16 border-t border-slate-800/60">
                        <div className="flex flex-col gap-2 mb-2">
                            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight flex items-center gap-4">
                                <Cpu className="text-cyan-400" size={32} /> System Blueprints
                            </h2>
                            <p className="text-slate-400 text-lg font-medium">Click on any diagram to expand the architecture details.</p>
                        </div>

                        <div className="flex flex-wrap justify-center gap-6">
                            {allMedia.map((media, index) => (
                                <div
                                    key={index}
                                    className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] group relative rounded-[2rem] overflow-hidden bg-slate-900 border border-slate-800 aspect-[4/3] cursor-pointer hover:border-cyan-500/40 transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(34,211,238,0.1)]"
                                    onClick={() => setActiveIndex(index)}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-80 group-hover:opacity-60 transition-opacity"></div>

                                    {media.type === 'image' ? (
                                        <img src={media.src} alt={media.title} className="w-full h-full object-cover object-top opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 mix-blend-screen" />
                                    ) : (
                                        <img src={`https://img.youtube.com/vi/${media.src}/maxresdefault.jpg`} alt={media.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                                    )}

                                    <div className="absolute bottom-6 left-6 right-6 z-20 flex items-center justify-between">
                                        <span className="text-white font-bold text-lg tracking-tight">{media.title}</span>
                                        <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30 group-hover:bg-cyan-500 transition-colors">
                                            {media.type === 'image' ? <Maximize2 size={10} className="text-cyan-300 group-hover:text-white" /> : <PlayCircle size={16} className="text-cyan-300 group-hover:text-white" />}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

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
                    <button aria-label="Next Media" onClick={handleNext} className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 p-4 bg-slate-900/80 border border-slate-700/50 rounded-full text-slate-300 hover:text-white hover:bg-slate-800 hover:scale-110 transition-all z-[110] backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/50">
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
                                onMouseUp={() => setIsDragging(false)}
                                onMouseLeave={() => setIsDragging(false)}
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
                                onTouchEnd={() => setIsDragging(false)}
                                onClick={() => {
                                    if (!hasDragged) setIsZoomed(!isZoomed);
                                }}
                            >

                                <div className="absolute bottom-6 right-6 bg-slate-900/80 text-white text-xs font-bold tracking-wide px-4 py-2 rounded-xl flex items-center gap-2 backdrop-blur-md border border-slate-700/50 z-20 pointer-events-none">
                                    {isZoomed ? (
                                        <><Hand size={14} className="text-cyan-400" /> Drag to explore | Click to shrink</>
                                    ) : (
                                        <><Maximize2 size={14} className="text-blue-400" /> Click to expand blueprint</>
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
                            <div className="w-full max-w-6xl aspect-video bg-[#05070A] rounded-2xl md:rounded-[2rem] border border-slate-800 shadow-[0_0_100px_rgba(34,211,238,0.1)] overflow-hidden relative">
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