export type CostThreshold = {
	threshold: number;
	cost: number;
};

export function tally(val: number, costArr: Array<CostThreshold>): number {
	let acc = 0;
	for (let i = 0; i < costArr.length && costArr[i].threshold < val; ++i) {
		const validUntil =
			i + 1 === costArr.length ? Number.POSITIVE_INFINITY : costArr[i + 1].threshold;
		acc += (Math.min(val, validUntil) - costArr[i].threshold) * costArr[i].cost;
	}
	return acc;
}
