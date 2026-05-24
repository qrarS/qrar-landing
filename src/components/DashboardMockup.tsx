import { Star, MapPin, MessageSquare, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Pure SVG/CSS abstract dashboard mockup for the hero.
 * Theme-aware, RTL-safe, no real product screenshots.
 */
const DashboardMockup = () => {
  const { t } = useLanguage();

  return (
    <div className="relative w-full">
      {/* Glow */}
      <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-accent/30 via-accent/10 to-transparent blur-3xl opacity-70" />

      <div className="relative rounded-2xl border border-border bg-card/80 backdrop-blur-xl card-shadow overflow-hidden">
        {/* Window chrome */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
          </div>
          <div className="flex items-center gap-1.5 rounded-md bg-background/60 px-2.5 py-1 text-[10px] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-glow" />
            qrar.ai/dashboard
          </div>
          <div className="w-12" />
        </div>

        <div className="grid grid-cols-12 gap-4 p-5">
          {/* Sidebar */}
          <div className="col-span-3 space-y-1.5">
            {["Overview", "Branches", "Reviews", "Analytics", "Settings"].map((item, i) => (
              <div
                key={item}
                className={`flex items-center gap-2 rounded-md px-2.5 py-2 text-[11px] ${
                  i === 0
                    ? "bg-accent/15 text-accent font-semibold"
                    : "text-muted-foreground"
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${i === 0 ? "bg-accent" : "bg-muted-foreground/40"}`} />
                {item}
              </div>
            ))}
          </div>

          {/* Main content */}
          <div className="col-span-9 space-y-3">
            {/* Stat cards */}
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { icon: MapPin, label: "Branches", value: "24", trend: "+2" },
                { icon: Star, label: "Avg rating", value: "4.7", trend: "+0.2" },
                { icon: MessageSquare, label: "New reviews", value: "138", trend: "+18%" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-lg border border-border bg-background/40 p-2.5"
                >
                  <div className="flex items-center justify-between">
                    <s.icon className="h-3 w-3 text-accent" />
                    <span className="text-[9px] font-medium text-emerald-400">{s.trend}</span>
                  </div>
                  <div className="mt-1.5 text-base font-bold text-foreground">{s.value}</div>
                  <div className="text-[9px] text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="rounded-lg border border-border bg-background/40 p-3">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="h-3 w-3 text-accent" />
                  <span className="text-[10px] font-semibold text-foreground">Map views — last 30 days</span>
                </div>
                <span className="text-[9px] text-muted-foreground">+24.6%</span>
              </div>
              <div className="flex h-16 items-end gap-1">
                {[40, 55, 35, 70, 50, 65, 45, 80, 60, 75, 70, 90, 85, 95].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: `${h}%` }}
                    className="flex-1 rounded-sm bg-gradient-to-t from-accent/40 to-accent"
                  />
                ))}
              </div>
            </div>

            {/* Reviews list */}
            <div className="space-y-1.5">
              {[
                { name: "Riyadh — Olaya", stars: 5, text: "Excellent service and clean place." },
                { name: "Jeddah — Tahlia", stars: 4, text: "Great food, slow at peak hours." },
              ].map((r) => (
                <div
                  key={r.name}
                  className="flex items-start gap-2 rounded-lg border border-border bg-background/40 p-2.5"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-accent/15 text-[9px] font-bold text-accent">
                    {r.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="truncate text-[10px] font-semibold text-foreground">{r.name}</span>
                      <div className="flex">
                        {Array.from({ length: r.stars }).map((_, i) => (
                          <Star key={i} className="h-2 w-2 fill-accent text-accent" />
                        ))}
                      </div>
                    </div>
                    <p className="truncate text-[9px] text-muted-foreground">{r.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating notification chip */}
      <div className="absolute -bottom-4 -end-4 hidden md:flex animate-float items-center gap-2 rounded-full border border-border bg-card/90 px-3 py-2 backdrop-blur-xl card-shadow">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/15">
          <Star className="h-3.5 w-3.5 fill-accent text-accent" />
        </div>
        <div className="leading-tight">
          <div className="text-[10px] font-semibold text-foreground">New 5★ review</div>
          <div className="text-[9px] text-muted-foreground">Riyadh — Olaya · just now</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMockup;
