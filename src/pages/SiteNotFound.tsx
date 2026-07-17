import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SiteFooter } from '@/components/site/SiteFooter';
import { SiteHeader } from '@/components/site/SiteHeader';
import { useSiteLanguage } from '@/contexts/SiteLanguageContext';

export default function SiteNotFound() {
  const { isArabic }=useSiteLanguage(); const Arrow=isArabic?ArrowLeft:ArrowRight;
  return <div className="min-h-screen bg-[#fbf8fd]"><SiteHeader/><main className="site-container grid min-h-[75vh] place-items-center pb-20 pt-36 text-center"><div><p className="text-8xl font-black tracking-[-.06em] text-fuchsia-200 sm:text-9xl">404</p><h1 className="mt-3 text-3xl font-black text-violet-950 sm:text-5xl">{isArabic?'هذه الصفحة غير موجودة':'This page does not exist'}</h1><p className="mx-auto mt-4 max-w-lg text-base leading-8 text-violet-950/50">{isArabic?'قد يكون الرابط قد تغيّر. يمكنك العودة إلى الصفحة الرئيسية ومتابعة استكشاف قرار.':'The link may have changed. Return home to continue exploring Qrar.'}</p><a href="/" className="brand-button mt-8 h-13 px-7">{isArabic?'العودة للرئيسية':'Return home'}<Arrow className="h-4 w-4"/></a></div></main><SiteFooter/></div>;
}
