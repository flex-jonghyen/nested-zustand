import { StateCreator } from "zustand";
import { Step } from "./step";
import { Store } from "./store";

export interface ApprovalLine {
  line: Step[];
}

export interface ApprovalLineSlice {
  setLine: (line: ApprovalLine) => void;
  appendStep: (newStep: Step) => void;
  deleteStep: (viewId: string) => void;
}

export const createApprovalLineSlice: StateCreator<
  Store,
  [],
  [],
  ApprovalLineSlice
> = (set) => ({
  setLine: (state) => {
    set({ line: state.line });
  },
  appendStep: (state) => {
    set((prev) => {
      const newLine = prev.line.slice();
      newLine.push(state);

      return { line: newLine };
    });
  },
  deleteStep: (viewId) => {
    set((prev) => {
      const newLine = prev.line.filter((step) => step.viewId !== viewId);
      return { line: newLine };
    });
  },
});
