import { atom } from "jotai";
import { Step } from "./step";

export type ApprovalLine = Step[];

export const lineAtom = atom<ApprovalLine>([]);
