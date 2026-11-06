import { ArrowLeft, ArrowUpRight, Code2, Mail, MapPin, Globe2, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const contactMethods = [
  { label: 'Email', value: 'soumik.afterlife@gmail.com', href: 'mailto:soumik.afterlife@gmail.com', icon: Mail, note: 'Best for opportunities and detailed conversations.' },
  { label: 'Phone', value: '+91 98311 91641', href: 'tel:+919831191641', icon: Phone, note: 'Available for calls and professional enquiries.' },
  { label: 'GitHub', value: 'github.com/MrV3nomous', href: 'https://github.com/MrV3nomous', icon: Code2, note: 'Selected public repositories and technical projects.' },
  { label: 'Portfolio', value: 'soumikhalder.vercel.app', href: 'https://soumikhalder.vercel.app/', icon: Globe2, note: 'Project summaries and engineering case studies.' },
];

export default function Contact() {
  return (
    <div className="portfolio-text-page portfolio-text-page--contact min-h-screen bg-[#080d13] px-5 pb-20 pt-32 text-slate-200 sm:px-8 lg:px-10">
      <main className="mx-auto max-w-5xl">
        <Link to="/" className="mb-12 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-white"><ArrowLeft size={16} /> Back to portfolio</Link>
        <section className="max-w-3xl border-b border-white/10 pb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">Contact</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-6xl">Let’s talk about the work.</h1>
          <p className="mt-6 text-lg leading-8 text-slate-400">For engineering opportunities, product development conversations or questions about a project, email is the simplest way to reach me.</p>
          <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/[0.05] px-4 py-2 text-xs text-emerald-200"><MapPin size={14} /> Kolkata, India · Open to Bengaluru relocation</div>
        </section>

        <section className="grid gap-4 py-12 sm:grid-cols-2 xl:grid-cols-4">
          {contactMethods.map(({ label, value, href, icon: Icon, note }) => (
            <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined} className="group rounded-2xl border border-white/[0.09] bg-[#101720]/75 p-6 transition-all hover:-translate-y-1 hover:border-blue-300/30 hover:bg-[#131d29]">
              <div className="flex items-center justify-between"><span className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-300/15 bg-blue-300/[0.07] text-blue-200"><Icon size={18} /></span><ArrowUpRight size={17} className="text-slate-500 transition-colors group-hover:text-white" /></div>
              <h2 className="mt-6 text-lg font-semibold text-white">{label}</h2>
              <p className="mt-1 break-words text-sm text-blue-200">{value}</p>
              <p className="mt-4 text-xs leading-6 text-slate-500">{note}</p>
            </a>
          ))}
        </section>

        <section className="mb-2 grid items-center gap-6 rounded-2xl border border-white/[0.09] bg-[#101720]/75 p-5 sm:grid-cols-[220px_1fr] sm:p-6">
          <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-900">
            <img src="/me.png" alt="Soumik with friends in an older group photograph" className="h-48 w-full object-cover object-[50%_42%]" />
          </div>
          <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">The person behind the work</p><h2 className="mt-2 text-xl font-semibold text-white">Soumik Halder</h2><p className="mt-2 max-w-2xl text-sm leading-7 text-slate-400">Independent product engineer with a business-oriented approach to building useful software—from understanding the problem to designing, shipping and improving the system.</p></div>
        </section>

        <section className="rounded-2xl border border-white/[0.09] bg-gradient-to-br from-[#142033] to-[#101720] p-7 sm:p-9">
          <h2 className="text-xl font-semibold text-white">A little context helps.</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">For a role or project enquiry, include the position or subject, the expected responsibilities and the best way to continue the conversation. I’m especially interested in backend systems, APIs, technical investigation and product engineering.</p>
          <a href="mailto:soumik.afterlife@gmail.com?subject=Professional%20enquiry" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-blue-100"><Mail size={16} /> Send an email</a>
        </section>
      </main>
    </div>
  );
}
