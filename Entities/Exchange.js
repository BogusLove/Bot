const config = require('../config.json');
const { currency } = config.exchange;

class Exchange {
    constructor(body) {
        this.body = body;
        this.amount = 0;
        this.from = '';
        this.to = '';
    }

    parseBody() {
        let body = this.body.split(' ');
        this.amount = body[1];
        this.to = body[2];
        this.from = body[4];
    }

    calc() {
        return parseInt(this.amount) * currency[this.from + this.to];
    }

    getResult() {   
        this.parseBody();
        return `${this.amount} ${this.from} = ${this.calc()} ${this.to}`;
    }
}

module.exports = Exchange;