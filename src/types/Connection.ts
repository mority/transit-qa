export enum Mode {
    Walk,
    Taxi
}

export class Connection {
    static taxi_base_cost = 35;

    getDeparture() {
        return Connection.parseTime(this.departure);
    }

    getArrival() {
        return Connection.parseTime(this.arrival);
    }

    getStartMode() {
        return Connection.parseMode(this.start_mode);
    }

    getEndMode() {
        return Connection.parseMode(this.end_mode);
    }

    overtakes(o: Connection) {
        return this.getDeparture() > o.getDeparture() && this.getArrival() < o.getArrival();
    }

    getTau(cost_taxi: number, cost_transfer: number) {
        return (this.getStartMode() == Mode.Walk ? this.start_length : Connection.taxi_base_cost + cost_taxi * this.start_length) + (this.getArrival() - this.getDeparture()) + cost_transfer * this.transfers + (this.getEndMode() == Mode.Walk ? this.end_length : Connection.taxi_base_cost + cost_taxi * this.end_length);
    }

    getTravelTime() {
        return this.getArrival() - this.getDeparture();
    }

    static formatTime(i: number) {
        return `${Math.floor(i / 60)}:${('0' + (i % 60)).slice(-2)}`;
    }

    static parseTime(s: string) {
        const regex: RegExp = /^(\d{2}):(\d{2})$/g;
        const match = regex.exec(s);
        if (match != null) {
            return parseInt(match[1]) * 60 + parseInt(match[2]);
        }
        return -1
    }

    static isValidModeStr(raw: string) {
        var s = raw.trim().toLocaleLowerCase();
        return s == "walk" || s == "taxi";
    }

    static parseMode(raw: string) {
        var s = raw.trim().toLocaleLowerCase();
        if (s == "walk") {
            return Mode.Walk;
        } else {
            return Mode.Taxi;
        }
    }

    constructor(
        public name: string,
        private departure: string,
        private arrival: string,
        public transfers: number,
        private start_mode: string,
        public start_length: number,
        private end_mode: string,
        public end_length: number
    ) {
    }

    dominated = Array<[string,number]>();
    closest_to_dominate_index = -1;
    closest_to_dominate_res = Number.NEGATIVE_INFINITY;
}