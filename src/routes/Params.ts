import type { CostThreshold } from "./CostThreshold";

export type Params = {
  alpha: number;
  beta: number;
  costWalk: Array<CostThreshold>;
  costTaxi: Array<CostThreshold>;
  costTransfer: Array<CostThreshold>; 
}