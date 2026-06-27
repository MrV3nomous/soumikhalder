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
    <div className="min-h-screen bg-slate-950 font-sans text-slate-50 selection:bg-blue-500/30">
      <ScrollManager />

      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pb-24">
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
      </main>
    </div>
  );
}