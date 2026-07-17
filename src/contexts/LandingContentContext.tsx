import { createContext, type ReactNode, useContext } from 'react';
import { useLandingContent } from '@/hooks/useLandingContent';

type LandingContentContextValue = ReturnType<typeof useLandingContent>;
const LandingContentContext = createContext<LandingContentContextValue | null>(null);

export function LandingContentProvider({ children }: { children: ReactNode }) {
  const value = useLandingContent();
  return <LandingContentContext.Provider value={value}>{children}</LandingContentContext.Provider>;
}

export function usePublishedLanding(): LandingContentContextValue {
  const value = useContext(LandingContentContext);
  if (!value) throw new Error('usePublishedLanding must be used inside LandingContentProvider');
  return value;
}
