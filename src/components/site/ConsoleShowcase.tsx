import type { ReactNode } from 'react';
import { Loader2, MapPin, Phone, Star, StopCircle } from 'lucide-react';
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
  analyzedChip: '(100 / 5,100) ★ 4.7',
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

function Pill({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-muted/50 border border-border/50">
      {children}
    </div>
  );
}

function PlaceCard({ className }: { className?: string }) {
  const { pick } = useSiteLanguage();
  return (
    <Card className={cn('rounded-2xl border-border/60 bg-card/90 shadow-none backdrop-blur-sm overflow-hidden', className)}>
      <CardContent className="p-4 sm:p-5 space-y-3">
        <div className="space-y-2">
          <Badge variant="secondary" className="text-xs gap-1.5 font-normal">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {pick(STR.category)}
          </Badge>
          <h3 className="text-base sm:text-lg font-bold text-foreground leading-snug">{pick(STR.name)}</h3>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Pill>
            <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
            <span className="text-xs text-muted-foreground" dir="ltr">{STR.googleChip}</span>
          </Pill>
          <Pill>
            <span className="text-xs text-muted-foreground" dir="ltr">{STR.analyzedChip}</span>
          </Pill>
          <Pill>
            <span className="text-xs text-muted-foreground" dir="ltr">{STR.priceChip}</span>
          </Pill>
        </div>
        <div className="space-y-2">
          <div className="flex items-start gap-2 text-xs sm:text-sm">
            <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
            <span className="text-foreground">{pick(STR.address)}</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <Phone className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-foreground" dir="ltr">{STR.phone}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Donut({ value }: { value: number }) {
  const { pick } = useSiteLanguage();
  const SIZE = 132;
  const R = 50;
  const STROKE = 14;
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
    <Card className={cn('rounded-2xl border-border/60 bg-card/90 shadow-none backdrop-blur-sm', className)}>
      <CardContent className="p-4 space-y-2 text-center">
        <div>
          <h3 className="text-sm font-bold text-foreground">{pick(STR.donutTitle)}</h3>
          <p className="text-[10px] text-muted-foreground leading-snug mt-0.5">{pick(STR.donutSub)}</p>
        </div>
        <Donut value={DONUT_PCT} />
        <div className="flex flex-wrap justify-center gap-3">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: POSITIVE }} />
            <span className="text-[10px] text-muted-foreground">{pick(STR.legendPositive)}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: NEGATIVE }} />
            <span className="text-[10px] text-muted-foreground">{pick(STR.legendNegative)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ProgressCard({ className }: { className?: string }) {
  const { pick } = useSiteLanguage();
  return (
    <div className={cn('rounded-2xl border border-primary/30 bg-card/90 backdrop-blur-sm p-4', className)}>
      <div className="flex items-center gap-3 mb-3">
        <Button
          variant="destructive"
          size="sm"
          className="gap-2 rounded-lg pointer-events-none shrink-0"
          tabIndex={-1}
        >
          <StopCircle className="h-4 w-4" />
          <span className="text-xs">{pick(STR.stop)}</span>
        </Button>
        <div className="flex-1 min-w-0 text-start">
          <h3 className="font-semibold text-foreground text-sm">{pick(STR.analyzing)}</h3>
          <p className="text-xs text-muted-foreground truncate">{pick(STR.progressSub)}</p>
        </div>
        <div className="text-xl font-bold tabular-nums text-foreground" dir="ltr">{PROGRESS_PCT}%</div>
      </div>
      <div className="relative h-2.5 bg-muted rounded-full overflow-hidden mb-2">
        <div className="absolute inset-y-0 start-0 rounded-full bg-primary" style={{ width: `${PROGRESS_PCT}%` }} />
      </div>
      <span className="text-xs text-muted-foreground flex items-center gap-1.5">
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
        <SentimentCard className="console-showcase-card console-showcase-card--donut" />
        <PlaceCard className="console-showcase-card console-showcase-card--place" />
        <ProgressCard className="console-showcase-card console-showcase-card--progress" />
      </div>
    </div>
  );
}
