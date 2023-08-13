export class Connection {
    static formatTime(i: number) {
        return `${Math.floor(i / 60)}:${('0' + (i % 60)).slice(-2)}`;
    }

    static parseTime(s : string) {
        const regex : RegExp = /^\d{2}:\d{2}$/g;
        const match = regex.exec(s);
        if (match != null) {
            return parseInt(match[1]) * 60 + parseInt(match[2]);
        }
        console.log(`no match on "${s}"`)
        return -1
    }

    constructor(
        private departure: string,
        private arrival: string,
        public transfers: number
    ) {}
}