import { createRoot } from 'react-dom/client';
import SiteApp from './SiteApp';
import './landing.css';
import './landing-responsive.css';

createRoot(document.getElementById('root')!).render(<SiteApp />);
