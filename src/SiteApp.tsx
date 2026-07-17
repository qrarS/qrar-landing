import { BrowserRouter,Route,Routes } from 'react-router-dom';
import { LandingContentProvider } from '@/contexts/LandingContentContext';
import { SiteLanguageProvider } from '@/contexts/SiteLanguageContext';
import LandingPage from '@/pages/LandingPage';
import Privacy from '@/pages/Privacy';
import Terms from '@/pages/Terms';
import SiteNotFound from '@/pages/SiteNotFound';

export default function SiteApp() {
  return <SiteLanguageProvider><LandingContentProvider><BrowserRouter><Routes><Route path="/" element={<LandingPage/>}/><Route path="/privacy" element={<Privacy/>}/><Route path="/terms" element={<Terms/>}/><Route path="*" element={<SiteNotFound/>}/></Routes></BrowserRouter></LandingContentProvider></SiteLanguageProvider>;
}
