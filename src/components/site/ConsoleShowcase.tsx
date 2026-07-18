import type { ReactNode } from 'react';
import { ChefHat, Loader2, MapPin, Phone, Star, StopCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useSiteLanguage } from '@/contexts/SiteLanguageContext';
import { cn } from '@/lib/utils';

const STR = {
  name: { ar: 'مطعم الواحة البيضاء', en: 'White Oasis Restaurant' },
  category: { ar: 'مطعم للأكلات السريعة', en: 'Fast food restaurant' },
  address: { ar: '251 ب شارع المدينة المنوره ، الرياض', en: '251B Al Madinah Road, Riyadh' },
  phone: '+966 53 814 4466',
  googleChip: 'Google: 4.6',
  starsChip: '(100 / 5,100) 4.7',
  priceChip: '£200 – £400',
  donutTitle: { ar: 'التقييم العام', en: 'Overall sentiment' },
  donutSub: { ar: 'يعتمد على آراء العملاء آخر 3 شهور', en: 'Based on the last 3 months of reviews' },
  donutCaption: { ar: 'تحسن بنسبة', en: 'improvement' },
  legendPositive: { ar: 'ايجابي (19)', en: 'Positive (19)' },
  legendNegative: { ar: 'سلبي (4)', en: 'Negative (4)' },
  stop: { ar: 'ايقاف التحليل', en: 'Stop analysis' },
  analyzing: { ar: 'جاري التحليل', en: 'Analyzing' },
  progressSub: { ar: 'تحليل 8,540 من أصل 12,987', en: 'Analyzing 8,540 of 12,987' },
  remaining: { ar: 'متبقي 4,447 تقييم', en: '4,447 reviews remaining' },
};

const POSITIVE = 'hsl(var(--positive))';
const NEGATIVE = 'hsl(var(--negative))';
const PROGRESS_PCT = 66;
const DONUT_PCT = 54;

function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

function Pill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/50 border border-border/50', className)}>
      {children}
    </div>
  );
}

function PlaceCard({ className }: { className?: string }) {
  const { pick } = useSiteLanguage();
  return (
    <Card className={cn('rounded-3xl border-0 bg-card/95 shadow-none backdrop-blur-sm overflow-hidden', className)}>
      <CardContent className="p-8 sm:p-10 space-y-5 text-center">
        <Badge variant="secondary" className="gap-2 px-5 py-2 text-sm font-normal text-primary">
          <ChefHat className="h-5 w-5" />
          {pick(STR.category)}
        </Badge>
        <h3 className="text-3xl sm:text-4xl font-bold text-foreground leading-snug">{pick(STR.name)}</h3>
        <div className="flex items-center justify-center gap-2.5 flex-wrap">
          <Pill className="text-amber-600 px-4 py-2">
            <span className="text-sm font-semibold" dir="ltr">{STR.starsChip}</span>
            <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
          </Pill>
          <Pill className="px-4 py-2">
            <span className="text-sm font-semibold text-foreground" dir="ltr">{STR.googleChip}</span>
            <GoogleG className="h-4 w-4" />
          </Pill>
          <Pill className="px-4 py-2">
            <span className="text-sm font-semibold text-primary" dir="ltr">{STR.priceChip}</span>
          </Pill>
        </div>
        <div className="space-y-2.5 pt-1">
          <div className="flex items-center justify-center gap-2 text-base">
            <MapPin className="h-5 w-5 text-primary shrink-0" />
            <span className="text-foreground/80">{pick(STR.address)}</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-base">
            <Phone className="h-5 w-5 text-primary shrink-0" />
            <span className="text-foreground/80" dir="ltr">{STR.phone}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Donut({ value }: { value: number }) {
  const { pick } = useSiteLanguage();
  const SIZE = 148;
  const R = 56;
  const STROKE = 15;
  const C = 2 * Math.PI * R;
  // Round linecaps extend each dash end by STROKE / 2, so reserve that on top
  // of the visible gap to keep segments from touching.
  const GAP = 4 + STROKE;
  const avail = C - 2 * GAP;
  const greenLen = (avail * value) / 100;
  const redLen = avail - greenLen;
  return (
    <div className="relative mx-auto" style={{ width: SIZE, height: SIZE }}>
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        <circle cx={SIZE / 2} cy={SIZE / 2} r={R} fill="none" stroke="hsl(var(--muted))" strokeWidth={STROKE} />
        <circle
          cx={SIZE / 2} cy={SIZE / 2} r={R} fill="none"
          stroke={POSITIVE} strokeWidth={STROKE} strokeLinecap="round"
          strokeDasharray={`${greenLen} ${C - greenLen}`} strokeDashoffset={-GAP / 2}
          transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
        />
        <circle
          cx={SIZE / 2} cy={SIZE / 2} r={R} fill="none"
          stroke={NEGATIVE} strokeWidth={STROKE} strokeLinecap="round"
          strokeDasharray={`${redLen} ${C - redLen}`} strokeDashoffset={-(GAP * 1.5 + greenLen)}
          transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[10px] text-muted-foreground leading-none">{pick(STR.donutCaption)}</span>
        <span className="text-2xl font-bold text-foreground tabular-nums leading-tight" dir="ltr">{value}%</span>
      </div>
    </div>
  );
}

function SentimentCard({ className }: { className?: string }) {
  const { pick } = useSiteLanguage();
  return (
    <Card className={cn('rounded-3xl border-0 bg-card/95 shadow-none backdrop-blur-sm', className)}>
      <CardContent className="p-5 space-y-4 text-center">
        <div>
          <h3 className="text-base font-bold text-foreground">{pick(STR.donutTitle)}</h3>
          <p className="text-[10px] text-muted-foreground leading-snug mt-1">{pick(STR.donutSub)}</p>
        </div>
        <Donut value={DONUT_PCT} />
        <div className="flex justify-between px-1 pt-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: POSITIVE }} />
            <span className="text-[11px] text-muted-foreground">{pick(STR.legendPositive)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: NEGATIVE }} />
            <span className="text-[11px] text-muted-foreground">{pick(STR.legendNegative)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ProgressCard({ className }: { className?: string }) {
  const { pick } = useSiteLanguage();
  return (
    <div className={cn('rounded-3xl bg-card/95 backdrop-blur-sm p-5', className)}>
      <div className="flex items-center gap-4 mb-3">
        <div className="console-showcase-progress-percent text-3xl font-bold tabular-nums shrink-0" dir="ltr">{PROGRESS_PCT}%</div>
        <div className="flex-1 min-w-0 text-start">
          <h3 className="font-bold text-foreground text-base">{pick(STR.analyzing)}</h3>
          <p className="text-xs text-muted-foreground truncate">{pick(STR.progressSub)}</p>
        </div>
        <Button
          variant="destructive"
          size="sm"
          className="gap-2 rounded-full px-4 pointer-events-none shrink-0"
          tabIndex={-1}
        >
          <StopCircle className="h-4 w-4" />
          <span className="text-xs">{pick(STR.stop)}</span>
        </Button>
      </div>
      <div className="relative h-3 bg-muted rounded-full overflow-hidden mb-2">
        <div className="absolute inset-y-0 start-0 rounded-full bg-primary" style={{ width: `${PROGRESS_PCT}%` }} />
      </div>
      <span className="text-xs text-muted-foreground flex items-center justify-end gap-1.5">
        <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
        {pick(STR.remaining)}
      </span>
    </div>
  );
}

export function ConsoleShowcase({ compact = false }: { compact?: boolean }) {
  const { isArabic } = useSiteLanguage();
  return (
    <div
      className={cn('console-artwork console-showcase', compact && 'console-artwork--compact')}
      role="img"
      aria-label={isArabic ? 'معاينة منصة قرار لتحليل تقييمات العملاء' : 'Qrar customer-review analysis preview'}
    >
      <div className="console-artwork-glow" />
      <div className="console-showcase-canvas">
        <div className="console-showcase-anchor">
          <PlaceCard className="console-showcase-card console-showcase-card--place" />
          <SentimentCard className="console-showcase-card console-showcase-card--donut" />
          <ProgressCard className="console-showcase-card console-showcase-card--progress" />
        </div>
      </div>
    </div>
  );
}
