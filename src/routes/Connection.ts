import { type Params } from './Params';
import { tally } from './CostThreshold';

// remove for debug logging, causes jank
console.log = function() {}

export enum Mode {
	Walk,
	Taxi
}

export type Connection = {
	name: string;
	departure: string;
	arrival: string;
	transfers: number;
	startMode: string;
	startLength: number;
	endMode: string;
	endLength: number;
	toDom: boolean;
};

export function formatTime(i: number) {
	return `${Math.floor(i / 60)}:${('0' + (i % 60)).slice(-2)}`;
}

export function parseTime(s: string) {
	const regex: RegExp = /^(\d{2}):(\d{2})$/g;
	const match = regex.exec(s);
	if (match != null) {
		return parseInt(match[1]) * 60 + parseInt(match[2]);
	}
	return -1;
}

export function isValidModeStr(raw: string) {
	var s = raw.trim().toLocaleLowerCase();
	return s == 'walk' || s == 'taxi';
}

function parseMode(raw: string) {
	var s = raw.trim().toLocaleLowerCase();
	if (s == 'walk') {
		return Mode.Walk;
	} else {
		return Mode.Taxi;
	}
}

function startMode(c: Connection) {
	return parseMode(c.startMode);
}
function endMode(c: Connection) {
	return parseMode(c.endMode);
}

function usesTaxi(c: Connection) {
	return parseMode(c.startMode) === Mode.Taxi || parseMode(c.endMode) === Mode.Taxi;
}

function startCost(c: Connection, params: Params) {
	switch (startMode(c)) {
		case Mode.Walk:
			return tally(c.startLength, params.costWalk);
		case Mode.Taxi:
			return tally(c.startLength, params.costTaxi);
	}
}

function endCost(c: Connection, params: Params) {
	switch (endMode(c)) {
		case Mode.Walk:
			return tally(c.endLength, params.costWalk);
		case Mode.Taxi:
			return tally(c.endLength, params.costTaxi);
	}
}

function travelTime(c: Connection) {
	return arr(c) - dep(c);
}

function cost(c: Connection, params: Params) {
	return (
		startCost(c, params) +
		endCost(c, params) +
		travelTime(c) +
		tally(c.transfers, params.costTransfer)
	);
}

function dep(c: Connection) {
	return parseTime(c.departure);
}
function arr(c: Connection) {
	return parseTime(c.arrival);
}

function overtakes(a: Connection, b: Connection) {
	return dep(a) > dep(b) && arr(a) < arr(b);
}

function directTaxi(c: Connection) {
	return (
		(parseMode(c.startMode) === Mode.Taxi || parseMode(c.endMode) === Mode.Taxi) &&
		c.startLength + c.endLength === travelTime(c)
	);
}

// positive = dominates
// negative = does not dominate
function dominates(a: Connection, b: Connection, params: Params): number {
	if (a === b) {
		return 0;
	} 
	
	if(!usesTaxi(a) && !usesTaxi(b)) {
		return paretoDominates(a, b) ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
	}

	if(usesTaxi(a) && directTaxi(b)) {
		return directTaxiDominates(a,b,params);
	}

	if (usesTaxi(b)) {
		return costDominates(a,b,params);
	}
	
	return Number.NEGATIVE_INFINITY;	
}

function paretoDominates(a: Connection, b: Connection) {
	const res = (
		dep(a) >= dep(b) &&
		arr(a) <= arr(b) &&
		a.transfers <= b.transfers &&
		(dep(a) > dep(b) || arr(a) < arr(b) || a.transfers < b.transfers)
	);
	console.log(
		'%s dominatesPareto %s? => %o',
		a.name,
		b.name,
		res
	);
	return res;
}

function costDominates(a: Connection, b: Connection, params: Params): number {
	const costA = cost(a, params);
	const costB = cost(b, params);
	const alphaTerm = params.alpha * (travelTime(a) / travelTime(b)) * distance(a, b);
	const sum = costA + alphaTerm;
	const res = sum < costB;

	console.log(
		'%s dominatesPtTaxi %s? distance: %d, %d + %d = %d < %d => %o',
		a.name,
		b.name,
		distance(a, b),
		costA,
		alphaTerm,
		sum,
		costB,
		res
	);
	// domination <=>
	//           sum  <  costB
	//             0  <  costB - sum
	//   costB - sum  >  0
	return costB - sum;
}

function directTaxiDominates(a: Connection, b: Connection, params: Params): number {
	const sumA = travelTime(a) + params.distanceDirectTaxi * distance(a,b);
	const travelTimeB = travelTime(b);
	const minImprScore = (travelTimeB + params.minImprovementDirectTaxi) - sumA;
	const factorImprScore = params.improvementFactorDirectTaxi * travelTimeB - sumA;
	const res = Math.max(minImprScore, factorImprScore);
	console.log(
		'%s dominatesDirectTaxi %s? travelTime(%s): %d, travelTime(%s): %d, distance: %d,  => %o',
		a.name,
		b.name,a.name,travelTime(a),b.name,travelTime(b),
		distance(a, b),
		res
	);
	return res;
}

function distance(a: Connection, b: Connection) {
	if (overtakes(a, b) || overtakes(b, a)) {
		return 0;
	}
	return Math.min(Math.abs(dep(a) - dep(b)), Math.abs(arr(a) - arr(b)));
}

export function dominatedBy(
	x: Connection,
	conns: Array<Connection>,
	params: Params
): Array<[Connection, number]> {
	return conns
		.map((c): [Connection, number] => [c, dominates(c, x, params)])
		.filter(([_, d]) => d > 0);
}

export function dominatedByArr(
	conns: Array<Connection>,
	params: Params
): Array<Array<[Connection, number]>> {
	let domBy = new Array<Array<[Connection, number]>>();
	conns.forEach((con) => {
		domBy.push(dominatedBy(con, conns, params));
	});
	return domBy;
}

export function closestToDomination(
	x: Connection,
	conns: Array<Connection>,
	params: Params
): [string, number] | undefined {
	if (dominatedBy(x, conns, params).length !== 0) {
		return undefined;
	}

	let min = Number.NEGATIVE_INFINITY;
	let name = '';

	conns.forEach((c) => {
		if (c != x) {
			const d = dominates(c, x, params);
			if (d > min) {
				min = d;
				name = c.name;
			}
		}
	});

	return min == Number.NEGATIVE_INFINITY ? undefined : [name, min];
}
