import { ArrowLeft, ArrowUpRight, BriefcaseBusiness, GraduationCap, Music2, Store, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const roles = [
  {
    role: 'Independent Product Engineer',
    organisation: 'Independent Product Development',
    period: 'June 2025 – Present',
    icon: Code2,
    summary: 'Independently design, build and deploy software products across backend systems, full-stack applications, AI integrations and infrastructure.',
    details: ['Application and backend architecture', 'REST APIs, database design and integrations', 'Debugging, testing, deployment and technical documentation'],
    tone: 'blue',
  },
  {
    role: 'Music Educator & Program Coordinator',
    organisation: 'Furtados School of Music',
    period: 'December 2023 – March 2025',
    icon: Music2,
    summary: 'Designed structured learning programmes for more than 300 students and coordinated academic activities and events.',
    details: ['Simplified complex concepts into structured learning material', 'Coordinated programmes, student progress and events'],
    tone: 'violet',
  },
  {
    role: 'Senior Software Engineer',
    organisation: 'Geotech Informatics Services',
    period: 'May 2021 – December 2021',
    icon: Code2,
    summary: 'Worked on backend services and Android application workflows for the Real Fantasy Teams platform.',
    details: ['Developed Java services and REST APIs', 'Worked with Undertow, RxJava, MongoDB and AWS', 'Created unit and integration tests using JUnit and Mockito'],
    tone: 'emerald',
  },
  {
    role: 'Co-Founder & Operations Lead',
    organisation: 'Keshav Foods',
    period: '2018 – 2021',
    icon: Store,
    summary: 'Managed business operations with responsibility for supply chain, inventory and day-to-day processes.',
    details: ['Coordinated sourcing and operational workflows', 'Managed inventory and supply-chain activities'],
    tone: 'amber',
  },
  {
    role: 'Software Engineer',
    organisation: 'WYDR',
    period: 'October 2016 – May 2018',
    icon: Code2,
    summary: 'Developed Android and web application features and supported backend services and deployments.',
    details: ['Built application features and backend APIs', 'Integrated application services', 'Worked with AWS-based deployments'],
    tone: 'slate',
  },
];

const toneClasses = {
  blue: 'border-blue-300/20 bg-blue-300/[0.07] text-blue-200',
  violet: 'border-violet-300/20 bg-violet-300/[0.07] text-violet-200',
  emerald: 'border-emerald-300/20 bg-emerald-300/[0.07] text-emerald-200',
  amber: 'border-amber-300/20 bg-amber-300/[0.07] text-amber-200',
  slate: 'border-white/10 bg-white/[0.04] text-slate-300',
};

export default function ProfessionalJourney() {
  return (
    <div className="portfolio-text-page portfolio-text-page--journey min-h-screen bg-[#080d13] px-5 pb-20 pt-32 text-slate-200 sm:px-8 lg:px-10">
      <main className="mx-auto max-w-5xl">
        <Link to="/" className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-white"><ArrowLeft size={16} /> Back to portfolio</Link>

        <header className="max-w-3xl border-b border-white/10 pb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">Experience & education</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-6xl">Professional journey</h1>
          <p className="mt-6 text-lg leading-8 text-slate-400">My experience has moved across software engineering, independent product development, business operations and education. Each has shaped how I approach complex work: understand the system, make the process clear and follow through.</p>
        </header>

        <section className="py-14">
          <div className="mb-8 flex items-center gap-3"><BriefcaseBusiness size={19} className="text-blue-300" /><h2 className="text-xl font-semibold text-white">Professional experience</h2></div>
          <div className="space-y-4">
            {roles.map((item) => {
              const Icon = item.icon;
              return (
                <article key={`${item.role}-${item.organisation}`} className="rounded-2xl border border-white/[0.09] bg-[#101720]/70 p-6 sm:p-8">
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                    <div className="flex items-start gap-4">
                      <div className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${toneClasses[item.tone]}`}><Icon size={19} /></div>
                      <div><h3 className="text-xl font-semibold text-white">{item.role}</h3><p className="mt-1 text-sm text-slate-400">{item.organisation}</p></div>
                    </div>
                    <span className="whitespace-nowrap text-xs font-medium text-slate-500 sm:pt-2">{item.period}</span>
                  </div>
                  <p className="mt-6 max-w-3xl text-sm leading-7 text-slate-300">{item.summary}</p>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {item.details.map((detail) => <li key={detail} className="flex items-start gap-2 text-xs leading-6 text-slate-400"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-blue-300/70" />{detail}</li>)}
                  </ul>
                </article>
              );
            })}
          </div>
        </section>

        <section className="border-t border-white/10 py-12">
          <div className="mb-6 flex items-center gap-3"><GraduationCap size={20} className="text-blue-300" /><h2 className="text-xl font-semibold text-white">Education</h2></div>
          <article className="rounded-2xl border border-white/[0.09] bg-[#101720]/70 p-6 sm:p-8">
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center"><div><h3 className="text-lg font-semibold text-white">Jadavpur University</h3><p className="mt-1 text-sm text-slate-400">Electronics & Telecommunications Engineering coursework</p></div><span className="text-xs text-slate-500">2012 – 2016</span></div>
            <p className="mt-4 text-xs leading-6 text-slate-500">Undergraduate coursework completed; degree not awarded.</p>
            <div className="mt-5 border-t border-white/[0.07] pt-5"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Academic project</p><p className="mt-2 text-sm leading-7 text-slate-300">An Android application for digitising and distributing academic materials.</p></div>
          </article>
        </section>

        <section className="flex flex-col gap-4 border-t border-white/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <div><h2 className="text-lg font-semibold text-white">Explore the engineering work</h2><p className="mt-1 text-sm text-slate-400">Selected products, technical case studies and implementation notes.</p></div>
          <Link to="/lab" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-300 hover:text-white">Engineering archive <ArrowUpRight size={16} /></Link>
        </section>
      </main>
    </div>
  );
}
