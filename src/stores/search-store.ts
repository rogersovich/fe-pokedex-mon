import { create } from 'zustand';

interface SearchState {
  q: string;
  offset: number;
  limit: number;
  base_offset: number;
  base_limit: number;
  setQ: (newQ: string) => void;
  setOffset: (newOffset: number) => void;
  setLimit: (newLimit: number) => void;
  resetSearch: () => void; // Optional: for clearing search state
}

// Define your default values
const DEFAULT_LIMIT = 9;
const DEFAULT_OFFSET = 0;

export const useSearchStore = create<SearchState>((set) => ({
  q: '',
  offset: DEFAULT_OFFSET,
  limit: DEFAULT_LIMIT,
  base_offset: DEFAULT_OFFSET,
  base_limit: DEFAULT_LIMIT,
  setQ: (newQ) => set({ q: newQ, offset: DEFAULT_OFFSET }), // Reset offset when search term changes
  setOffset: (newOffset) => set({ offset: newOffset }),
  setLimit: (newLimit) => set({ limit: newLimit }),
  resetSearch: () => set({ q: '', offset: DEFAULT_OFFSET, limit: DEFAULT_LIMIT }),
}));