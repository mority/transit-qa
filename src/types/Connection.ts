export enum Mode {
    Walk,
    Taxi
}

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

    static formatMode(m: Mode) {
        switch(m) {
            case Mode.Walk:
                return "walk";
            case Mode.Taxi:
                return "taxi";
        }
    }

    static isValidModeStr(raw: string) {
        var s = raw.trim().toLocaleLowerCase();    
        return s == "walk" || s == "taxi";      
    }

    static parseMode(raw: string) {
        var s = raw.trim().toLocaleLowerCase();
        if(s == "walk") {
            return Mode.Walk;
        } else {
            return Mode.Taxi;
        }
    }

    constructor(
        public start_mode: string,
        public start_length:number,
        private departure: string,
        private arrival: string,
        public transfers: number,
        public end_mode: string,
        public end_length: number
    ) {
    }
}