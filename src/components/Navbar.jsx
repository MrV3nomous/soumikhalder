import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsAtTop(currentScrollY < 20);
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'DevScout', path: '/devscout' },
    { name: 'MiniGit', path: '/minigit' },
    { name: 'Research Lab', path: '/lab' },
    { name: 'Professional Journey', path: '/journey' }
  ];

  return (
    <>
      <header 
        className={`fixed top-0 inset-x-0 z-[100] transition-all duration-500 ease-in-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isAtTop 
            ? 'bg-transparent border-transparent py-6' 
            : 'bg-[#030303]/80 backdrop-blur-xl border-b border-white/[0.04] shadow-2xl py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
          
          <Link to="/" className="flex items-center gap-2 group focus:outline-none">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 transition-transform duration-300 group-hover:scale-150"></div>
            <span className="font-semibold text-white tracking-tight text-lg">
              Soumik <span className="text-zinc-500 font-medium">Halder</span>
            </span>
          </Link>
          
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link 
                  key={link.name}
                  to={link.path} 
                  className={`text-sm font-medium transition-colors duration-200 focus:outline-none ${
                    isActive 
                      ? "text-white" 
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <button 
            className="lg:hidden p-2 -mr-2 text-zinc-400 hover:text-white transition-colors focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </div>
      </header>

      <div 
        className={`fixed inset-0 z-[90] bg-[#030303]/95 backdrop-blur-2xl transition-all duration-500 flex flex-col items-center justify-center ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center gap-8 w-full px-8 relative z-10">
          {navLinks.map((link, index) => {
            const isActive = location.pathname === link.path;
            return (
              <Link 
                key={link.name}
                to={link.path} 
                style={{ 
                  transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(15px)',
                  opacity: isMobileMenuOpen ? 1 : 0,
                  transitionDelay: `${index * 40}ms` 
                }}
                className={`text-2xl md:text-3xl font-semibold tracking-tight transition-all duration-300 ${
                  isActive ? "text-white" : "text-zinc-500 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}