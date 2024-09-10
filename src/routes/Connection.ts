import { type Params } from "./Params";

export enum Mode {
    Walk,
    Taxi
}

export type Connection = {
    name: string,
    departure: string,
    arrival: string,
    transfers: number,
    startMode: string,
    startLength: number,
    endMode: string,
    endLength: number
}

export function formatTime(i: number) {
    return `${Math.floor(i / 60)}:${('0' + (i % 60)).slice(-2)}`;
}

export function parseTime(s: string) {
    const regex: RegExp = /^(\d{2}):(\d{2})$/g;
    const match = regex.exec(s);
    if (match != null) {
        return parseInt(match[1]) * 60 + parseInt(match[2]);
    }
    return -1
}

export function isValidModeStr(raw: string) {
    var s = raw.trim().toLocaleLowerCase();
    return s == "walk" || s == "taxi";
}

function parseMode(raw: string) {
    var s = raw.trim().toLocaleLowerCase();
    if (s == "walk") {
        return Mode.Walk;
    } else {
        return Mode.Taxi;
    }
}

function startMode(c: Connection) { return parseMode(c.startMode); }
function endMode(c: Connection) { return parseMode(c.endMode); }

function startCost(c: Connection, params: Params) {
    switch (startMode(c)) {
        case Mode.Walk: return c.startLength;
        case Mode.Taxi: return params.baseTaxi + params.factorTaxi * c.startLength;
    }
}

function endCost(c: Connection, params: Params) {
    switch (endMode(c)) {
        case Mode.Walk: return c.endLength;
        case Mode.Taxi: return params.baseTaxi + params.factorTaxi * c.endLength;
    }
}

function travelTime(c: Connection) {
    return arr(c) - dep(c);
}

function cost(c: Connection, params: Params) {
    return startCost(c, params)
        + endCost(c, params)
        + travelTime(c)
        + params.factorTransfer * c.transfers;
}

function dep(c: Connection) { return parseTime(c.departure); }
function arr(c: Connection) { return parseTime(c.arrival); }

function overtakes(a: Connection, b: Connection) {
    return dep(a) > dep(b) && arr(a) < arr(b);
}

// positive = dominates
// negative = does not dominate
function dominates(a: Connection, b: Connection, params: Params): number {
    if (a === b) {
        return 0;
    }

    const costA = cost(a, params);
    const costB = cost(b, params);
    const alphaTerm = params.alpha * (travelTime(a) / travelTime(b)) * distance(a, b);
    const sum = costA + alphaTerm;
    const res = sum < costB;

    console.log(
        '%s dominates %s? distance: %d, %d + %d = %d < %d => %o',
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

function distance(a: Connection, b: Connection) {
    if (overtakes(a, b) || overtakes(b, a)) {
        return 0;
    }
    return Math.min(
        Math.abs(dep(a) - dep(b)),
        Math.abs(arr(a) - arr(b))
    );
}

export function dominatedBy(x: Connection, conns: Array<Connection>, params: Params): Array<[Connection, number]> {
    return conns
        .map((c): [Connection, number] => [c, dominates(c, x, params)])
        .filter(([_, d]) => d > 0);
}

export function closestToDomination(x: Connection, conns: Array<Connection>, params: Params): [string, number] | undefined {
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


