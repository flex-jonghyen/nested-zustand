import { StateCreator } from "zustand";
import { Store } from "./store";

export interface Actor {
  viewId: string;
  name: string;
  value: string; // variable
}

export interface ActorSlice {
  getActor: (viewId: string) => Actor | void;
  _setActor: (newActor: Partial<Actor>, viewId: string) => void;
  updateName: (name: string, viewId: string) => void;
  updateValue: (value: string, viewId: string) => void;
}

export const createActorSlice: StateCreator<Store, [], [], ActorSlice> = (
  set,
  get
) => ({
  getActor: (viewId) => {
    return get()
      .line.flatMap((step) => step.actors)
      .find((actor) => actor.viewId === viewId);
  },
  _setActor: (newActor, viewId) => {
    set((prev) => {
      const newLine = prev.line.slice();
      const index = newLine.findIndex((step) => step.viewId === viewId);

      if (index === -1) {
        return { line: prev.line };
      }

      newLine[index] = {
        ...newLine[index],
        ...newActor,
      };

      return { line: newLine };
    });
  },
  updateName: (name, viewId) => {
    get()._setActor({ name }, viewId);
  },
  updateValue: (value, viewId) => {
    get()._setActor({ value }, viewId);
  },
});
