import type { CostThreshold } from "./CostThreshold";

export type Params = {
  weightTravelTime: number;
  weightTimeDistance: number;
  exponentTimeDistance: number;
  costWalk: Array<CostThreshold>;
  costTaxi: Array<CostThreshold>;
  costTransfer: Array<CostThreshold>;
  constantDirectTaxi: number;
  factorDirectTaxi: number;  
}