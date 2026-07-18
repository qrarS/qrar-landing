import { createRoot } from 'react-dom/client';
import SiteApp from './SiteApp';
import './site.css';
import './design-responsive.css';

createRoot(document.getElementById('root')!).render(<SiteApp />);
