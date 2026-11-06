import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Code2, Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Work', path: '/#work' },
  { name: 'Experience', path: '/journey' },
  { name: 'Engineering archive', path: '/lab' },
];

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-[100] border-b border-white/[0.06] bg-[#080d16]/80 backdrop-blur-2xl">
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-5 sm:px-8">
        <Link to="/" onClick={closeMenu} className="group inline-flex items-center gap-3" aria-label="Soumik Halder home">
          <img src="/me.png" alt="Soumik Halder" className="h-10 w-10 rounded-full border border-blue-100/25 object-cover object-[50%_42%] shadow-[0_0_0_3px_rgba(143,181,245,.06)]" />
          <span className="flex flex-col"><span className="text-[13px] font-semibold tracking-tight text-white">Soumik Halder</span><span className="mt-0.5 text-[9px] font-bold uppercase tracking-[.16em] text-slate-500">Product engineering</span></span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
          {navLinks.map((link) => {
            const active = link.path === '/journey' ? location.pathname === '/journey' : link.path === '/lab' ? location.pathname === '/lab' : false;
            if (link.path === '/#work') return <a key={link.name} href="/#work" className="text-[12px] font-medium text-slate-400 transition-colors hover:text-white">{link.name}</a>;
            return <Link key={link.name} to={link.path} className={`text-[12px] font-medium transition-colors hover:text-white ${active ? 'text-white' : 'text-slate-400'}`}>{link.name}</Link>;
          })}
          <a href="https://github.com/MrV3nomous" target="_blank" rel="noreferrer" aria-label="GitHub profile" className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition-colors hover:border-white/25 hover:text-white"><Code2 size={15} /></a>
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-lg border border-blue-200/25 bg-blue-200/[0.08] px-3.5 py-2 text-[11px] font-bold text-blue-100 transition-all hover:border-blue-200/50 hover:bg-blue-200/[0.14]">Contact <ArrowUpRight size={13} /></Link>
        </nav>

        <button type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-slate-300 transition-colors hover:bg-white/[0.06] lg:hidden" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}>
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-white/[0.07] bg-[#0b1320]/95 px-5 py-4 shadow-2xl lg:hidden" aria-label="Mobile navigation">
          <div className="mx-auto flex max-w-6xl flex-col">
            {navLinks.map((link) => link.path === '/#work' ? (
              <a key={link.name} href="/#work" onClick={closeMenu} className="flex items-center justify-between border-b border-white/[0.06] py-3.5 text-sm font-medium text-slate-300">{link.name}<ArrowUpRight size={15} /></a>
            ) : (
              <Link key={link.name} to={link.path} onClick={closeMenu} className="flex items-center justify-between border-b border-white/[0.06] py-3.5 text-sm font-medium text-slate-300">{link.name}<ArrowUpRight size={15} /></Link>
            ))}
            <Link to="/contact" onClick={closeMenu} className="flex items-center justify-between py-3.5 text-sm font-semibold text-blue-200">Contact <ArrowUpRight size={15} /></Link>
            <a href="https://github.com/MrV3nomous" target="_blank" rel="noreferrer" onClick={closeMenu} className="flex items-center justify-between py-3.5 text-sm font-medium text-slate-300">GitHub <ArrowUpRight size={15} /></a>
          </div>
        </nav>
      )}
    </header>
  );
}
