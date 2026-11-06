import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollManager from './components/ScrollManager';
import Home from './pages/Home';
import DevScout from './pages/DevScout';
import MiniGit from './pages/MiniGit';
import Qix from './pages/Qix';
import EngineeringLab from './pages/EngineeringLab';
import ProfessionalJourney from './pages/ProfessionalJourney';
import Contact from './pages/Contact';

export default function App() {
  return (
    <div className="min-h-screen bg-[#080d13] font-sans text-slate-100 selection:bg-blue-400/30 selection:text-white">
      <a href="#page-content" className="sr-only z-[200] rounded bg-white px-4 py-2 text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
      <ScrollManager />
      <Navbar />
      <div id="page-content" className="w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/devscout" element={<DevScout />} />
          <Route path="/minigit" element={<MiniGit />} />
          <Route path="/qix" element={<Qix />} />
          <Route path="/lab" element={<EngineeringLab />} />
          <Route path="/journey" element={<ProfessionalJourney />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}
