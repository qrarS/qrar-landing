import { BrowserRouter,Navigate,Route,Routes } from 'react-router-dom';
import RegisterInterest from '@/pages/RegisterInterest';
import { LandingContentProvider } from '@/contexts/LandingContentContext';
import { SiteLanguageProvider } from '@/contexts/SiteLanguageContext';
import LandingPage from '@/pages/LandingPage';
import About from '@/pages/About';
import Privacy from '@/pages/Privacy';
import Terms from '@/pages/Terms';
import SiteNotFound from '@/pages/SiteNotFound';

export default function SiteApp() {
  return <SiteLanguageProvider><LandingContentProvider><BrowserRouter><Routes><Route path="/" element={<LandingPage/>}/><Route path="/about" element={<About/>}/><Route path="/privacy" element={<Privacy/>}/><Route path="/terms" element={<Terms/>}/><Route path="/interests" element={<RegisterInterest/>}/><Route path="/Intersters" element={<Navigate to="/interests" replace/>}/><Route path="*" element={<SiteNotFound/>}/></Routes></BrowserRouter></LandingContentProvider></SiteLanguageProvider>;
}
