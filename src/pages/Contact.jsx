import { useState, useEffect } from 'react';
import { Mail, Download, Link as LinkIcon, Check, Terminal, MapPin, QrCode, Share2 } from 'lucide-react';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://soumikhalder.vercel.app/');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Soumik Halder | Software Engineer',
          text: 'Check out Soumik Halder\'s engineering portfolio and case studies.',
          url: 'https://soumikhalder.vercel.app/'
        });
      } catch (error) {
        console.log('Share cancelled', error);
      }
    } else {
      handleCopyLink();
    }
  };

  const handleDownloadCard = () => {
    const link = document.createElement('a');
    link.href = '/social-card.png';
    link.download = 'Soumik_Halder_Card.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full flex flex-col text-slate-200 font-sans relative min-h-[85vh] pt-12 md:pt-20">
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-12 w-full max-w-5xl mx-auto px-4">
        
        <div className="flex flex-col items-center text-center gap-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest">
            <Terminal size={14} className="animate-pulse" /> Connection Protocol
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
            Initialize <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Contact</span>
          </h1>
          <p className="text-lg text-slate-400 font-medium leading-relaxed mt-2">
            Scan the code, download my digital identity card, or reach out directly to discuss architecture and implementation.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16 w-full mt-4">
          
          <div className="w-full max-w-lg relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>          
            <div className="relative bg-[#05070a] border border-white/10 p-2 rounded-3xl shadow-2xl overflow-hidden transform transition-transform duration-500 group-hover:scale-[1.02]">
              <img 
                src="/social-card.png" 
                alt="Soumik Halder - Software Engineer Identity Card" 
                className="w-full h-auto rounded-2xl border border-white/5 shadow-inner"
              />
            </div>
          </div>

          <div className="flex flex-col gap-8 w-full max-w-sm">
            
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <QrCode size={20} className="text-blue-400" /> Identity Artifact
              </h3>
              <p className="text-sm text-slate-400 font-medium leading-relaxed">
                Save this card to your device. The embedded QR code acts as a persistent link back to this portfolio.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <button 
                onClick={handleDownloadCard}
                className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] flex items-center justify-center gap-3 group"
              >
                <Download size={18} className="group-hover:-translate-y-1 transition-transform" /> 
                Save Digital Card
              </button>

              <button 
                onClick={handleNativeShare}
                className="w-full px-6 py-4 bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20 text-indigo-300 font-bold rounded-xl transition-all flex items-center justify-center gap-3 group"
              >
                <Share2 size={18} className="group-hover:scale-110 transition-transform" /> 
                Share Profile
              </button>

              <button 
                onClick={handleCopyLink}
                className="w-full px-6 py-4 bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] hover:border-white/20 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-3 group"
              >
                {copied ? <Check size={18} className="text-emerald-400" /> : <LinkIcon size={18} className="text-slate-400 group-hover:text-white transition-colors" />} 
                {copied ? 'URL Copied to Clipboard' : 'Copy Portfolio Link'}
              </button>
            </div>

            <div className="flex flex-col gap-4 mt-4 pt-6 border-t border-white/10">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Direct Channels</span>
              
              <a href="mailto:soumikhlder@gmail.com" className="flex items-center gap-4 bg-[#0a0f1a] border border-slate-800 p-4 rounded-xl hover:border-slate-600 transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-blue-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-sm">Email Transmit</span>
                  <span className="text-slate-400 text-xs mt-0.5 group-hover:text-blue-400 transition-colors">soumikhlder@gmail.com</span>
                </div>
              </a>

              <div className="flex items-center gap-4 bg-[#0a0f1a] border border-slate-800 p-4 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-emerald-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-sm">Operating Base</span>
                  <span className="text-slate-400 text-xs mt-0.5">West Bengal, India</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}