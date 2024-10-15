import type { CostThreshold } from "./CostThreshold";

export type Params = {
  alpha: number;
  costWalk: Array<CostThreshold>;
  costTaxi: Array<CostThreshold>;
  costTransfer: Array<CostThreshold>;
  distanceDirectTaxi: number;
  improvementFactorDirectTaxi: number;
  minImprovementDirectTaxi: number;
}