// src/shared/fanytelStore.ts
import { create } from "zustand";
import { FanytelHistoryEntry } from "./contracts";

interface FanytelState {
  history: FanytelHistoryEntry[];
  setHistory: (entries: FanytelHistoryEntry[]) => void;
}

export const useFanytelStore = create<FanytelState>((set) => ({
  history: [],
  setHistory: (entries) => set({ history: entries }),
}));
