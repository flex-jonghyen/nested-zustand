import { StateCreator } from "zustand";
import { Actor } from "./actor";
import { Store } from "./store";

export interface Step {
  viewId: string;
  actors: Actor[];
  step: number;
  status: string;
}

export interface StepSlice {
  getStep: (viewId: string) => Step | void;
  _setStep: (newStep: Partial<Step>, viewId: string) => void;
  updateStep: (step: number, viewId: string) => void;
  updateStatus: (status: string, viewId: string) => void;

  appendActor: (actor: Actor, viewId: string) => void;
  deleteActor: (viewId: string) => void;
}

export const createStepSlice: StateCreator<Store, [], [], StepSlice> = (
  set,
  get
) => ({
  getStep: (viewId) => {
    return get().line.find((step) => step.viewId === viewId);
  },
  _setStep: (newStep, viewId) => {
    set((prev) => {
      const newLine = prev.line.slice();
      const index = newLine.findIndex((step) => step.viewId === viewId);

      if (index === -1) {
        return { line: prev.line };
      }

      newLine[index] = {
        ...newLine[index],
        ...newStep,
      };

      return { line: newLine };
    });
  },
  updateStep: (step, viewId) => {
    get()._setStep({ step }, viewId);
  },
  updateStatus: (status, viewId) => {
    get()._setStep({ status }, viewId);
  },
  appendActor: (actor, viewId) => {
    set((prev) => {
      const newLine = prev.line.slice();
      const index = newLine.findIndex((step) => step.viewId === viewId);

      if (index === -1) {
        return { line: prev.line };
      }

      newLine[index].actors.push(actor);

      return { line: newLine };
    });
  },
  deleteActor: (viewId) => {
    set((prev) => {
      const newLine = prev.line.slice();
      const index = newLine.findIndex((step) => step.viewId === viewId);

      if (index === -1) {
        return { line: prev.line };
      }

      newLine[index].actors = newLine[index].actors.filter(
        (actor) => actor.viewId !== viewId
      );

      return { line: newLine };
    });
  },
});
