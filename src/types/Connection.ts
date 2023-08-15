export class Connection {
    getDeparture() {
        return Connection.parseTime(this.departure);
    }

    getArrival() {
        return Connection.parseTime(this.arrival);
    }

    overtakes(o: Connection) {
        return this.getDeparture() > o.getDeparture() && this.getArrival() < o.getArrival();
    }

    getCriteria3() {
        return [-this.getDeparture(), this.getArrival(), this.transfers];
    }

    getCriteria2() {
        return [this.getArrival() - this.getDeparture(), this.transfers];
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

    constructor(
        private departure: string,
        private arrival: string,
        public transfers: number
    ) {
    }
}