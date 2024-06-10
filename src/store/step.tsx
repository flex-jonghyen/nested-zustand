import { Actor } from "./actor";

export interface Step {
  viewId: string;
  actors: Actor[];
  step: number;
  status: string;
}
