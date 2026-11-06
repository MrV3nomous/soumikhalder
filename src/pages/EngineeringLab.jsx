import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, BrainCircuit,
  CheckCircle2, ChevronLeft, ChevronRight, Code2, Database, ExternalLink,
  Eye, FlaskConical, GitBranch, Globe2, Layers3, LockKeyhole, Network,
  PlayCircle, ScanEye, ShieldCheck, TerminalSquare, Workflow, X, ZoomIn,
} from 'lucide-react';
import { projects } from '../data/projects';
import comeWildArt from '../assets/projects/come-wild.svg';
import devScoutArt from '../assets/projects/devscout.svg';
import qixArt from '../assets/projects/qix.svg';
import miniGitArt from '../assets/projects/minigit.svg';
import lieDetectorArt from '../assets/projects/lie.svg';

const filters = [
  'All work',
  'Product systems',
  'Security & infrastructure',
  'AI & data',
  'Developer tools',
  'Creative computing',
];

const archiveProjects = [
  {
    key: 'comeWild', title: 'Come Wild', category: 'Product systems', discipline: 'Product engineering',
    description: 'An independent social-discovery product shaped around expressive profiles, considered interactions and a responsive experience across devices.',
    stack: ['React', 'TypeScript', 'Supabase', 'PostgreSQL'],
    accent: 'violet', icon: Workflow, artwork: comeWildArt, status: 'Ongoing product build', liveUrl: 'https://comewild.vercel.app/',
  },
  {
    key: 'devscout', title: 'DevScout', category: 'AI & data', discipline: 'Decision intelligence',
    description: 'A hiring-intelligence platform combining structured evaluation workflows, candidate analysis and decision tracking.',
    stack: ['React', 'Supabase', 'PostgreSQL', 'LLM APIs'],
    accent: 'blue', icon: BrainCircuit, artwork: devScoutArt, status: 'Live product', route: '/devscout',
  },
  {
    key: 'qix', title: 'Qix', category: 'Security & infrastructure', discipline: 'Privacy · distributed systems',
    description: 'A privacy-focused messaging system built around client-side encryption, WebSocket routing and short-lived data lifecycles.',
    stack: ['React', 'Go', 'WebSockets', 'MongoDB', 'Redis'],
    accent: 'cyan', icon: LockKeyhole, artwork: qixArt, status: 'Live product', route: '/qix',
  },
  {
    key: 'minigit', title: 'MiniGit', category: 'Developer tools', discipline: 'Version-control internals',
    description: 'A Git-inspired version-control implementation exploring content-addressable storage, object hashing, commits and repository state.',
    stack: ['Java', 'SHA-1', 'Zlib', 'File systems'],
    accent: 'emerald', icon: GitBranch, artwork: miniGitArt, status: 'Source available', route: '/minigit',
  },
  {
    key: 'lieDetector', title: 'Lie Detector Pro', category: 'AI & data', discipline: 'Hybrid evaluation systems',
    description: 'An evaluation application that combines deterministic database logic with AI-assisted semantic analysis and structured scoring.',
    stack: ['React', 'PostgreSQL', 'PL/pgSQL', 'Edge Functions'],
    accent: 'rose', icon: BrainCircuit, artwork: lieDetectorArt, status: 'Live product',
  },
  {
    key: 'visionDetect', title: 'VisionDetect', category: 'AI & data', discipline: 'Browser-based machine learning',
    description: 'A browser-based object-detection experiment that runs machine-learning inference on the client.',
    stack: ['JavaScript', 'TensorFlow.js', 'COCO-SSD'],
    accent: 'amber', icon: ScanEye, status: 'Live experiment',
  },
  {
    key: 'krishnaSpeaks', title: 'Krishna Speaks', category: 'AI & data', discipline: 'Conversational applications',
    description: 'A context-aware conversational application explored through both a Java desktop experience and a web interface.',
    stack: ['Java Swing', 'React', 'State management'],
    accent: 'violet', icon: Globe2, status: 'Live product',
  },
  {
    key: 'texasHoldem', title: "Texas Hold’em CLI", category: 'Developer tools', discipline: 'State machines · game logic',
    description: 'A terminal-based card-game implementation focused on turn progression, game-state transitions and decision logic.',
    stack: ['Java', 'Object-oriented design'],
    accent: 'emerald', icon: TerminalSquare, status: 'CLI project',
  },
  {
    key: 'universeExplorer', title: 'Universe Explorer', category: 'Creative computing', discipline: 'Procedural graphics',
    description: 'An interactive astronomy experience using procedural generation and canvas-based visualisation.',
    stack: ['JavaScript', 'HTML Canvas', 'Algorithms'],
    accent: 'blue', icon: Layers3, status: 'Live experiment',
  },
];

const accentClasses = {
  violet: { icon: 'archive-icon--violet', glow: 'archive-card--violet' },
  blue: { icon: 'archive-icon--blue', glow: 'archive-card--blue' },
  cyan: { icon: 'archive-icon--cyan', glow: 'archive-card--cyan' },
  emerald: { icon: 'archive-icon--emerald', glow: 'archive-card--emerald' },
  rose: { icon: 'archive-icon--rose', glow: 'archive-card--rose' },
  amber: { icon: 'archive-icon--amber', glow: 'archive-card--amber' },
};

function buildMediaIndex() {
  const media = [];
  const lookup = {};

  archiveProjects.forEach((item) => {
    const project = projects[item.key];
    if (!project) return;

    lookup[item.key] = { diagrams: [], videos: [] };
    (project.architectureDiagrams || []).forEach((diagram) => {
      lookup[item.key].diagrams.push(media.length);
      media.push({ type: 'image', src: diagram.path, title: `${project.title} · ${diagram.name}` });
    });

    const videoItems = [
      ...(project.videos?.demo ? [project.videos.demo] : []),
      ...(project.videos?.scenarios || []),
      ...(project.videos?.miniclips || []),
    ];
    videoItems.forEach((video) => {
      if (!video.youtubeId) return;
      lookup[item.key].videos.push(media.length);
      media.push({ type: 'video', src: video.youtubeId, title: `${project.title} · ${video.title || 'Walkthrough'}` });
    });
  });

  return { media, lookup };
}

const { media: allMedia, lookup: mediaLookup } = buildMediaIndex();

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="archive-section-heading">
      <p className="archive-eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description && <p className="archive-section-description">{description}</p>}
    </div>
  );
}

export default function EngineeringLab() {
  const [activeFilter, setActiveFilter] = useState('All work');
  const [activeIndex, setActiveIndex] = useState(null);
  const [zoomed, setZoomed] = useState(false);
  const activeMedia = activeIndex !== null ? allMedia[activeIndex] : null;

  const visibleProjects = useMemo(
    () => activeFilter === 'All work'
      ? archiveProjects
      : archiveProjects.filter((project) => project.category === activeFilter),
    [activeFilter],
  );

  const openMedia = (index) => {
    setActiveIndex(index);
    setZoomed(false);
  };

  const moveMedia = (direction) => {
    setActiveIndex((current) => (current + direction + allMedia.length) % allMedia.length);
    setZoomed(false);
  };

  useEffect(() => {
    document.body.style.overflow = activeIndex !== null ? 'hidden' : '';
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setActiveIndex(null);
      if (event.key === 'ArrowRight' && activeIndex !== null) {
        setActiveIndex((current) => (current + 1) % allMedia.length);
        setZoomed(false);
      }
      if (event.key === 'ArrowLeft' && activeIndex !== null) {
        setActiveIndex((current) => (current - 1 + allMedia.length) % allMedia.length);
        setZoomed(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeIndex]);

  const devScoutMedia = mediaLookup.devscout || { diagrams: [], videos: [] };

  return (
    <div className="archive-page">
      <div className="archive-atmosphere" aria-hidden="true" />
      <main className="archive-shell">
        <header className="archive-hero">
          <div className="archive-hero-copy">
            <Link to="/" className="archive-back-link"><ArrowLeft size={14} /> Back to portfolio</Link>
            <div className="archive-kicker"><span className="archive-kicker-dot" /> ENGINEERING ARCHIVE <span className="archive-kicker-rule" /> SELECTED BUILDS & TECHNICAL STUDIES</div>
            <h1>Systems, decisions <span>&amp; implementation.</span></h1>
            <p className="archive-hero-lede">A closer look at the engineering behind my work: the problems being solved, the architecture connecting the pieces and the decisions that shape how each system behaves.</p>
            <div className="archive-hero-actions">
              <a href="#archive-index" className="archive-primary-action">Explore the archive <ArrowDownRight size={16} /></a>
              <Link to="/contact" className="archive-secondary-action">Discuss an opportunity <ArrowUpRight size={15} /></Link>
            </div>
          </div>

          <aside className="archive-hero-panel" aria-label="Archive overview">
            <div className="archive-panel-top"><span>FIELD NOTES / 2026</span><span className="archive-live-dot">CURATED WORK</span></div>
            <div className="archive-panel-graphic" aria-hidden="true">
              <div className="archive-orbit archive-orbit--outer" />
              <div className="archive-orbit archive-orbit--inner" />
              <div className="archive-core"><Network size={28} /></div>
              <span className="archive-node archive-node--one"><Database size={15} /></span>
              <span className="archive-node archive-node--two"><Workflow size={15} /></span>
              <span className="archive-node archive-node--three"><ShieldCheck size={15} /></span>
            </div>
            <div className="archive-panel-bottom"><span>PROBLEM <i /> DESIGN <i /> SYSTEM</span><span>01—09</span></div>
          </aside>
        </header>

        <section className="archive-metrics" aria-label="Archive contents">
          <div><strong>09</strong><span>Selected builds</span></div>
          <div><strong>05</strong><span>Engineering disciplines</span></div>
          <div><strong>{allMedia.filter((item) => item.type === 'image').length}</strong><span>Architecture diagrams</span></div>
          <div><strong>{allMedia.filter((item) => item.type === 'video').length}</strong><span>Recorded walkthroughs</span></div>
        </section>

        <section className="archive-feature" aria-labelledby="archive-feature-title">
          <div className="archive-feature-visual">
            <div className="archive-feature-visual-top"><span>CASE STUDY / 001</span><span>DECISION SYSTEMS</span></div>
            <div className="archive-feature-mark"><img src="/devscoutlightlogo.png" alt="DevScout mark" /></div>
            <div className="archive-feature-flow" aria-hidden="true">
              <span>INPUT</span><i /><span>ANALYSIS</span><i /><span>DECISION</span>
            </div>
            <div className="archive-feature-visual-bottom"><span>DEVSCOUT / SYSTEM OVERVIEW</span><span>01</span></div>
          </div>
          <div className="archive-feature-copy">
            <p className="archive-eyebrow"><span className="archive-eyebrow-line" /> FEATURED CASE STUDY</p>
            <h2 id="archive-feature-title">DevScout</h2>
            <p className="archive-feature-lede">A hiring-intelligence platform built to bring structure to candidate analysis, evaluation workflows and decision tracking.</p>
            <div className="archive-feature-points">
              <div><CheckCircle2 size={16} /><span>Structured evaluation and review workflows</span></div>
              <div><CheckCircle2 size={16} /><span>Data-backed candidate analysis</span></div>
              <div><CheckCircle2 size={16} /><span>Decision context carried across a hiring process</span></div>
            </div>
            <div className="archive-stack-row">{projects.devscout.stack.map((item) => <span key={item}>{item}</span>)}</div>
            <div className="archive-feature-actions">
              <Link to="/devscout" className="archive-primary-action">Open case study <ArrowUpRight size={16} /></Link>
              {devScoutMedia.diagrams.length > 0 && <button type="button" onClick={() => openMedia(devScoutMedia.diagrams[0])} className="archive-text-action"><Network size={15} /> View architecture</button>}
              {devScoutMedia.videos.length > 0 && <button type="button" onClick={() => openMedia(devScoutMedia.videos[0])} className="archive-text-action"><PlayCircle size={15} /> Watch walkthrough</button>}
            </div>
          </div>
        </section>

        <section id="archive-index" className="archive-index-section">
          <div className="archive-index-head">
            <SectionHeading
              eyebrow="THE PROJECT INDEX"
              title="Different problems. Deliberate systems."
              description="Browse the work by the kind of engineering problem it explores. Open a project for its deeper case study, or inspect the available diagrams and walkthroughs here."
            />
            <span className="archive-index-count">{String(visibleProjects.length).padStart(2, '0')} / 09 PROJECTS</span>
          </div>

          <div className="archive-filters" role="group" aria-label="Filter projects by discipline">
            {filters.map((filter) => (
              <button
                type="button"
                key={filter}
                className={activeFilter === filter ? 'archive-filter archive-filter--active' : 'archive-filter'}
                onClick={() => setActiveFilter(filter)}
                aria-pressed={activeFilter === filter}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="archive-project-grid">
            {visibleProjects.map((item) => {
              const Icon = item.icon;
              const media = mediaLookup[item.key] || { diagrams: [], videos: [] };
              const github = projects[item.key]?.github;
              const liveUrl = item.liveUrl || projects[item.key]?.liveUrl;
              const isExternalGithub = typeof github === 'string' && github.startsWith('http');
              const classes = accentClasses[item.accent] || accentClasses.blue;
              return (
                <article key={item.key} className={`archive-project-card ${classes.glow}`}>
                  <div className="archive-project-topline"><span>PROJECT / {String(archiveProjects.indexOf(item) + 1).padStart(2, '0')}</span><span>{item.status}</span></div>
                  <div className="archive-project-title-row">
                    <span className={`archive-project-icon ${classes.icon}`}>{item.artwork ? <img src={item.artwork} alt="" /> : <Icon size={20} />}</span>
                    <div><p className="archive-project-discipline">{item.discipline}</p><h3>{item.title}</h3></div>
                  </div>
                  <p className="archive-project-description">{item.description}</p>
                  <div className="archive-project-stack">{item.stack.map((tech) => <span key={tech}>{tech}</span>)}</div>
                  <div className="archive-project-footer">
                    <div className="archive-project-media">
                      {media.diagrams.length > 0 && <button type="button" onClick={() => openMedia(media.diagrams[0])} aria-label={`View ${item.title} architecture diagram`}><Network size={14} /> <span>{media.diagrams.length} diagrams</span></button>}
                      {media.videos.length > 0 && <button type="button" onClick={() => openMedia(media.videos[0])} aria-label={`Watch ${item.title} walkthrough`}><PlayCircle size={14} /> <span>{media.videos.length} videos</span></button>}
                    </div>
                    <div className="archive-project-links">
                      {item.route && <Link to={item.route} aria-label={`Open ${item.title} case study`}><ArrowUpRight size={16} /></Link>}
                      {liveUrl && <a href={liveUrl} target="_blank" rel="noreferrer" aria-label={`Visit ${item.title}`}><ExternalLink size={15} /></a>}
                      {isExternalGithub && <a href={github} target="_blank" rel="noreferrer" aria-label={`View ${item.title} source on GitHub`}><Code2 size={15} /></a>}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="archive-principles-section">
          <SectionHeading
            eyebrow="ENGINEERING APPROACH"
            title="The principles behind the implementation."
            description="The project domains vary. The habits that make the systems dependable are more consistent."
          />
          <div className="archive-principles-grid">
            <article><span className="archive-principle-number">01</span><div className="archive-principle-icon"><Workflow size={20} /></div><h3>Make state explicit.</h3><p>Model the important states and transitions so that the system is easier to reason about, test and debug.</p></article>
            <article><span className="archive-principle-number">02</span><div className="archive-principle-icon"><ShieldCheck size={20} /></div><h3>Protect the boundaries.</h3><p>Validate inputs, enforce permissions and preserve data integrity where information crosses system boundaries.</p></article>
            <article><span className="archive-principle-number">03</span><div className="archive-principle-icon"><BrainCircuit size={20} /></div><h3>Keep logic accountable.</h3><p>Separate deterministic application rules from probabilistic AI output, and make the relationship between them understandable.</p></article>
            <article><span className="archive-principle-number">04</span><div className="archive-principle-icon"><Eye size={20} /></div><h3>Design for recovery.</h3><p>Consider failure, retries and incomplete operations as part of the normal system design—not as afterthoughts.</p></article>
          </div>
        </section>

        <section className="archive-closing">
          <div className="archive-closing-symbol"><FlaskConical size={24} /></div>
          <p className="archive-eyebrow">FROM EXPLORATION TO DELIVERY</p>
          <h2>Good engineering makes complexity usable.</h2>
          <p>These projects reflect how I approach software: understand the problem, choose the right structure, make the behaviour clear and carry the work through to a working product.</p>
          <div className="archive-closing-actions">
            <Link to="/contact" className="archive-primary-action">Start a conversation <ArrowUpRight size={16} /></Link>
            <Link to="/journey" className="archive-secondary-action">View professional experience <ArrowRight size={15} /></Link>
          </div>
        </section>

        <footer className="archive-footer">
          <Link to="/" className="archive-footer-brand"><img src="/me.png" alt="Soumik Halder" /> <span>Soumik Halder</span></Link>
          <span>Independent product engineering · Backend systems · APIs</span>
          <div><Link to="/">Home</Link><Link to="/journey">Experience</Link><Link to="/contact">Contact</Link></div>
        </footer>
      </main>

      {activeMedia && (
        <div className="archive-lightbox" role="dialog" aria-modal="true" aria-label={activeMedia.title} onClick={() => setActiveIndex(null)}>
          <div className="archive-lightbox-toolbar">
            <span>{String(activeIndex + 1).padStart(2, '0')} / {String(allMedia.length).padStart(2, '0')}</span>
            <button type="button" onClick={() => setActiveIndex(null)} aria-label="Close media viewer"><X size={19} /></button>
          </div>
          <button type="button" className="archive-lightbox-nav archive-lightbox-nav--previous" aria-label="Previous item" onClick={(event) => { event.stopPropagation(); moveMedia(-1); }}><ChevronLeft size={22} /></button>
          <button type="button" className="archive-lightbox-nav archive-lightbox-nav--next" aria-label="Next item" onClick={(event) => { event.stopPropagation(); moveMedia(1); }}><ChevronRight size={22} /></button>
          <div className="archive-lightbox-content" onClick={(event) => event.stopPropagation()}>
            {activeMedia.type === 'image' ? (
              <button type="button" className="archive-lightbox-image-wrap" onClick={() => setZoomed((value) => !value)} aria-label={zoomed ? 'Zoom out' : 'Zoom in'}>
                <img src={activeMedia.src} alt={activeMedia.title} className={zoomed ? 'archive-lightbox-image archive-lightbox-image--zoomed' : 'archive-lightbox-image'} />
                <span className="archive-lightbox-hint"><ZoomIn size={14} /> {zoomed ? 'Click to zoom out' : 'Click to zoom in'}</span>
              </button>
            ) : (
              <div className="archive-lightbox-video"><iframe key={activeMedia.src} src={`https://www.youtube.com/embed/${activeMedia.src}?autoplay=1&rel=0`} title={activeMedia.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></div>
            )}
            <h2>{activeMedia.title}</h2>
          </div>
        </div>
      )}
    </div>
  );
}
