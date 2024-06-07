import { create } from "zustand";

import { ActorSlice, createActorSlice } from "./actor";
import {
  ApprovalLine,
  ApprovalLineSlice,
  createApprovalLineSlice,
} from "./line";
import { StepSlice, createStepSlice } from "./step";

interface State extends ApprovalLine {}

export interface Store
  extends State,
    ApprovalLineSlice,
    StepSlice,
    ActorSlice {}

export const useStore = create<Store>((set, get, api) => ({
  line: [],
  ...createApprovalLineSlice(set, get, api),
  ...createStepSlice(set, get, api),
  ...createActorSlice(set, get, api),
}));
