type Ttq = {
  page?: () => void;
  track?: (event: string, props?: Record<string, unknown>) => void;
};

function getTtq(): Ttq | null {
  if (typeof window === "undefined") return null;
  const w = window as typeof window & { ttq?: Ttq };
  return w.ttq ?? null;
}

export const TIKTOK_CURRENCY = "USD";

export function ttqPage() {
  const ttq = getTtq();
  if (ttq?.page) ttq.page();
}

export function ttqTrack(event: string, props?: Record<string, unknown>) {
  const ttq = getTtq();
  if (ttq?.track) {
    ttq.track(event, props ?? {});
  }
}
