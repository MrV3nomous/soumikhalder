import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Mail,
  MapPin,
  Database,
  Workflow,
  Braces,
  Layers3,
  LockKeyhole,
  Sparkles,
  Network,
  Rocket,
  Code2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import heroArt from '../assets/hero-system.svg';
import comeWildArt from '../assets/projects/come-wild.svg';
import qixArt from '../assets/projects/qix.svg';
import devScoutArt from '../assets/projects/devscout.svg';
import platformArt from '../assets/projects/platform.svg';
import miniGitArt from '../assets/projects/minigit.svg';
import lieArt from '../assets/projects/lie.svg';

const projects = [
  {
    name: 'Come Wild',
    category: 'Social discovery · Independent product',
    summary: 'A dating and social-discovery product shaped around expressive profiles, considered interactions and a responsive experience across devices.',
    stack: ['React', 'TypeScript', 'Supabase', 'PostgreSQL'],
    status: 'Product build',
    url: 'https://comewild.vercel.app/',
    accent: 'violet',
    mark: 'CW',
    artwork: comeWildArt,
  },
  {
    name: 'Qix',
    category: 'Privacy · Distributed systems',
    summary: 'A privacy-focused messaging system using client-side encryption, WebSocket message routing and short-lived data lifecycles.',
    stack: ['React', 'Go', 'WebSockets', 'MongoDB', 'Redis'],
    status: 'Live product',
    url: 'https://qix-six.vercel.app/',
    route: '/qix',
    accent: 'blue',
    mark: 'Q',
    artwork: qixArt,
  },
  {
    name: 'DevScout',
    category: 'AI · Recruitment workflows',
    summary: 'An AI-assisted hiring platform for candidate analysis, structured evaluation, interview assessment and decision tracking.',
    stack: ['React', 'TypeScript', 'PostgreSQL', 'Supabase', 'LLM APIs'],
    status: 'Live product',
    url: 'https://devscout-orcin.vercel.app/',
    route: '/devscout',
    accent: 'cyan',
    mark: 'DS',
    artwork: devScoutArt,
  },
  {
    name: 'Proprietary Platform Engineering',
    category: 'Confidential · Transaction systems',
    summary: 'End-to-end engineering of a proprietary platform, including payment processing, transaction-safe workflows, data-integrity safeguards and automated asset pipelines.',
    stack: ['PostgreSQL', 'Supabase', 'Razorpay', 'GitHub Actions'],
    status: 'Private case study',
    confidential: true,
    accent: 'emerald',
    mark: 'PX',
    artwork: platformArt,
  },
  {
    name: 'MiniGit',
    category: 'Developer tools · Computer science',
    summary: 'A Git-inspired version-control implementation exploring content-addressable storage, hashing, commits and repository state.',
    stack: ['Java', 'SHA-1', 'Zlib', 'File systems'],
    status: 'Source available',
    url: 'https://github.com/MrV3nomous/MiniGit',
    route: '/minigit',
    accent: 'amber',
    mark: 'MG',
    artwork: miniGitArt,
  },
  {
    name: 'Lie Detector Pro',
    category: 'AI · Data-driven evaluation',
    summary: 'A hybrid evaluation application combining deterministic database logic with AI-assisted semantic analysis and structured scoring.',
    stack: ['React', 'PostgreSQL', 'PL/pgSQL', 'Supabase Edge Functions'],
    status: 'Live product',
    url: 'https://lie-detector-pro.vercel.app/',
    accent: 'rose',
    mark: 'LD',
    artwork: lieArt,
  },
];

const additionalProjects = [
  { name: 'Krishna Speaks', description: 'A conversational AI application with web and Java desktop experiences.', stack: 'Java · React · LLM integration', url: 'https://krishna-speaks-kappa.vercel.app/' },
  { name: 'VisionDetect', description: 'Browser-based object detection using client-side machine-learning inference.', stack: 'JavaScript · TensorFlow.js · COCO-SSD', url: 'https://vision-detect.vercel.app/' },
  { name: 'Universe Explorer', description: 'An interactive astronomy experience using procedural rendering and canvas-based visualisation.', stack: 'JavaScript · Canvas · Algorithms', url: 'https://mrv3nomous.github.io/universe-explorer/' },
  { name: "Texas Hold’em CLI", description: 'A terminal-based poker implementation focused on game state and object-oriented design.', stack: 'Java · OOP · State modelling', url: 'https://github.com/MrV3nomous/TexasHoldemCLI' },
];

const capabilities = [
  { icon: Braces, number: '01', title: 'APIs & application services', text: 'Designing, integrating and troubleshooting the interfaces that let software systems communicate.' },
  { icon: Database, number: '02', title: 'Data & transaction integrity', text: 'Modelling data, protecting state and making critical workflows predictable and recoverable.' },
  { icon: Workflow, number: '03', title: 'Technical investigation', text: 'Reproducing defects, tracing behaviour, isolating root causes and turning findings into fixes.' },
  { icon: Layers3, number: '04', title: 'Product delivery', text: 'Owning the path from an initial idea and architecture to a tested, deployed application.' },
];

const experience = [
  { role: 'Independent Product Engineer', organisation: 'Independent Product Development', period: 'Jun 2025 – Present', description: 'Designing, building and deploying software products across backend systems, full-stack applications, integrations and infrastructure.' },
  { role: 'Music Educator & Program Coordinator', organisation: 'Furtados School of Music', period: 'Dec 2023 – Mar 2025', description: 'Designed structured learning programmes for 300+ students and coordinated academic activities and events.' },
  { role: 'Senior Software Engineer', organisation: 'Geotech Informatics Services', period: 'May 2021 – Dec 2021', description: 'Developed Java backend services and REST APIs, worked across Android application workflows, and wrote unit and integration tests.' },
  { role: 'Co-Founder & Operations Lead', organisation: 'Keshav Foods', period: '2018 – 2021', description: 'Managed supply-chain, inventory and day-to-day business operations.' },
  { role: 'Software Engineer', organisation: 'WYDR', period: 'Oct 2016 – May 2018', description: 'Developed Android and web features, backend APIs and AWS-based deployments.' },
];

const skillGroups = [
  { label: 'Languages', items: ['Java', 'JavaScript', 'TypeScript', 'Python', 'Kotlin', 'SQL'] },
  { label: 'Backend & APIs', items: ['Node.js', 'Express.js', 'Go', 'REST APIs', 'WebSockets', 'Authentication'] },
  { label: 'Data systems', items: ['PostgreSQL', 'MongoDB', 'Supabase', 'Redis', 'Data modelling'] },
  { label: 'Frontend', items: ['React', 'Tailwind CSS', 'HTML', 'CSS', 'Responsive UI'] },
  { label: 'Infrastructure', items: ['AWS', 'Docker', 'Linux', 'Git', 'GitHub Actions', 'CI/CD'] },
  { label: 'Applied AI', items: ['LLM APIs', 'AI workflows', 'Prompt design', 'TensorFlow.js'] },
];

function ProjectArtwork({ project }) {
  return (
    <div className={`project-art project-art--${project.accent}`} aria-hidden="true">
      <img src={project.artwork} alt="" loading="lazy" />
      <span className="project-art__mark">{project.mark}</span>
      <span className="project-art__shine" />
    </div>
  );
}

function ProjectCard({ project, index }) {
  return (
    <article className={`project-card project-card--${project.accent}`}>
      <ProjectArtwork project={project} />
      <div className="project-card__body">
        <div className="project-card__meta">
          <span className="project-card__category">{project.category}</span>
          <span className="project-card__status">{project.status}</span>
        </div>
        <div className="project-card__title-row">
          <h3>{project.name}</h3>
          <span className="project-card__index">0{index + 1}</span>
        </div>
        <p className="project-card__summary">{project.summary}</p>
        <div className="project-card__stack">
          {project.stack.map((item) => <span key={item} className="tech-pill">{item}</span>)}
        </div>
        {(project.url || project.route || project.confidential) && (
          <div className="project-card__links">
            {project.route && <Link to={project.route} className="project-link project-link--primary">Explore case study <ArrowRight size={15} /></Link>}
            {project.url && <a href={project.url} target="_blank" rel="noreferrer" className="project-link">{project.route ? 'Open product' : project.status === 'Source available' ? 'View source' : 'Visit project'} <ArrowUpRight size={15} /></a>}
            {project.confidential && <span className="project-link project-link--quiet"><LockKeyhole size={14} /> Details available privately</span>}
          </div>
        )}
      </div>
    </article>
  );
}

function SectionHeading({ eyebrow, title, description, light = false }) {
  return (
    <div className="section-heading">
      <p className="section-eyebrow">{eyebrow}</p>
      <h2 className={light ? 'section-title section-title--light' : 'section-title'}>{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}

export default function Home() {
  return (
    <div className="portfolio-home">
      <div className="site-atmosphere" aria-hidden="true"><div className="atmosphere-glow atmosphere-glow--blue" /><div className="atmosphere-glow atmosphere-glow--violet" /><div className="atmosphere-grid" /></div>

      <main className="home-shell">
        <section className="hero-section">
          <div className="hero-copy">
            <div className="hero-kicker"><span className="hero-kicker__dot" /> INDEPENDENT PRODUCT ENGINEER <span className="hero-kicker__line" /> KOLKATA, INDIA</div>
            <h1 className="hero-title">I turn complex problems into <span>working products.</span></h1>
            <p className="hero-lede">I design, build and troubleshoot the systems behind digital products—APIs, backend services, data workflows and end-user applications.</p>
            <p className="hero-support">Independent product engineering backed by professional software-development experience and hands-on business operations.</p>
            <div className="hero-actions">
              <a href="#work" className="button-primary">Explore selected work <ArrowDownRight size={17} /></a>
              <Link to="/contact" className="button-secondary">Discuss an opportunity <ArrowUpRight size={16} /></Link>
            </div>
            <div className="hero-meta">
              <span><MapPin size={14} /> Kolkata · Open to Bengaluru relocation</span>
              <a href="mailto:soumik.afterlife@gmail.com"><Mail size={14} /> soumik.afterlife@gmail.com</a><a href="tel:+919831191641"><span aria-hidden="true">☎</span> +91 98311 91641</a>
            </div>
          </div>

          <aside className="hero-visual" aria-label="A visual representation of product engineering from architecture to delivery">
            <div className="hero-visual__header"><span>ENGINEERING / 001</span><span className="hero-visual__availability"><i /> INDEPENDENTLY BUILT</span></div>
            <div className="hero-visual__art"><img src={heroArt} alt="Abstract system architecture with connected layers and engineering stages" /></div>
            <div className="hero-visual__footer"><span>IDEA <i /> SYSTEM <i /> PRODUCT</span><span>THINK · BUILD · SHIP</span></div>
            <div className="hero-float hero-float--one"><span className="hero-float__icon"><Network size={15} /></span><span><b>Systems thinking</b><small>Structure before scale</small></span></div>
            <div className="hero-float hero-float--two"><span className="hero-float__icon hero-float__icon--mint"><Rocket size={15} /></span><span><b>End-to-end ownership</b><small>Concept to deployment</small></span></div>
          </aside>
        </section>

        <section className="value-strip" aria-label="Core strengths">
          <div><span className="value-strip__number">01</span><span>Product thinking</span></div>
          <div><span className="value-strip__number">02</span><span>Backend engineering</span></div>
          <div><span className="value-strip__number">03</span><span>Technical problem-solving</span></div>
          <div><span className="value-strip__number">04</span><span>Independent execution</span></div>
        </section>

        <section id="work" className="work-section section-block">
          <div className="section-topline"><SectionHeading eyebrow="Selected work · Independent builds" title="Ideas made tangible." description="A selection of products and engineering projects. Different problems, different systems—connected by the same approach: understand the need, design the mechanics, then make it work." /><div className="section-side-note"><span className="side-note__symbol">↗</span><span>Concept to<br />working product</span></div></div>
          <div className="project-grid">{projects.map((project, index) => <ProjectCard key={project.name} project={project} index={index} />)}</div>
          <div className="archive-banner"><div><span className="archive-banner__eyebrow">THE BROADER BODY OF WORK</span><h3>There's more behind the products.</h3><p>Explore technical experiments, architecture diagrams and implementation walkthroughs.</p></div><Link to="/lab" className="button-secondary">Open engineering archive <ArrowRight size={16} /></Link></div>
          <div className="additional-grid">{additionalProjects.map((project, index) => <a key={project.name} href={project.url} target="_blank" rel="noreferrer" className="additional-project"><span className="additional-project__index">0{index + 7}</span><div><h3>{project.name} <ArrowUpRight size={14} /></h3><p>{project.description}</p><span>{project.stack}</span></div></a>)}</div>
        </section>

        <section className="approach-section section-block">
          <div className="approach-intro"><SectionHeading eyebrow="How I add value" title="More than a feature. A working system." description="I enjoy the full engineering picture: how the pieces connect, what happens when something fails, and how the result behaves for the person using it." /><div className="approach-note"><Sparkles size={17} /><span>Business-aware. Technically hands-on.</span></div></div>
          <div className="capability-grid">{capabilities.map(({ icon: Icon, number, title, text }) => <article className="capability-card" key={title}><div className="capability-card__top"><span>{number}</span><Icon size={19} /></div><h3>{title}</h3><p>{text}</p></article>)}</div>
          <div className="process-line"><div><span>01</span><b>Understand</b><small>Clarify the real problem</small></div><i /><div><span>02</span><b>Architect</b><small>Design the right mechanics</small></div><i /><div><span>03</span><b>Build</b><small>Implement and test</small></div><i /><div><span>04</span><b>Ship</b><small>Deploy and improve</small></div></div>
        </section>

        <section className="experience-section section-block">
          <div className="section-topline"><SectionHeading eyebrow="Experience" title="Built through work, ownership and curiosity." description="Professional software roles, independent product development, business operations and programme coordination." /><Link to="/journey" className="text-link">Full professional journey <ArrowUpRight size={16} /></Link></div>
          <div className="experience-list">{experience.map((item, index) => <article key={`${item.role}-${item.organisation}`} className="experience-row"><span className="experience-row__index">0{index + 1}</span><div className="experience-row__main"><h3>{item.role}</h3><p>{item.organisation}</p><small>{item.description}</small></div><time>{item.period}</time></article>)}</div>
        </section>

        <section className="toolkit-section section-block">
          <SectionHeading eyebrow="Technical toolkit" title="The tools behind the work." description="A practical selection of languages, frameworks and infrastructure used across my projects." />
          <div className="toolkit-grid">{skillGroups.map((group) => <div className="toolkit-group" key={group.label}><h3>{group.label}</h3><div>{group.items.map((item) => <span key={item}>{item}</span>)}</div></div>)}</div>
        </section>

        <section className="contact-band">
          <div className="contact-band__backdrop" aria-hidden="true" />
          <div className="contact-band__copy"><p className="section-eyebrow">Open to the right opportunity</p><h2>Let's build something<br /><span>that works in the real world.</span></h2><p>For engineering roles, technical product support, backend systems or product development conversations, I'd be glad to connect.</p></div>
          <div className="contact-band__actions"><a href="mailto:soumik.afterlife@gmail.com" className="button-primary button-primary--light"><Mail size={16} /> Start a conversation <ArrowUpRight size={16} /></a><a href="https://github.com/MrV3nomous" target="_blank" rel="noreferrer" className="button-secondary button-secondary--light"><Code2 size={16} /> GitHub profile</a></div>
        </section>

        <footer className="site-footer"><Link to="/" className="site-footer__brand"><img src="/me.png" alt="Soumik Halder" /> Soumik Halder</Link><p>Independent product engineering · Backend systems · APIs</p><div><a href="mailto:soumik.afterlife@gmail.com">Email</a><a href="tel:+919831191641">Call</a><a href="https://github.com/MrV3nomous" target="_blank" rel="noreferrer">GitHub</a><Link to="/journey">Experience</Link></div><small>© {new Date().getFullYear()} Soumik Halder</small></footer>
      </main>
    </div>
  );
}
