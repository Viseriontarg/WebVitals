// --- Types ---
export interface PageData {
  id: number;
  path: string;
  vitals: {
    lcp: number;
    fid: number;
    cls: number;
  };
}

// Helper function to generate a random number within a range
const getRandom = (min: number, max: number): number => Math.random() * (max - min) + min;

// Generate 10 mock page objects
const pages: PageData[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  path: i === 0 ? '/' : `/products/${getRandom(1000, 9999).toFixed(0)}`,
  vitals: {
    // LCP: Good < 2500ms, Needs Improvement 2500-4000ms, Poor > 4000ms
    lcp: getRandom(1500, 5000), // in milliseconds
    // FID: Good < 100ms, Needs Improvement 100-300ms, Poor > 300ms
    fid: getRandom(50, 400),    // in milliseconds
    // CLS: Good < 0.1, Needs Improvement 0.1-0.25, Poor > 0.25
    cls: getRandom(0.05, 0.4),
  },
}));

export const mockPageData: PageData[] = pages;