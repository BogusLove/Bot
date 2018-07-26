const { quotes } = require('../config.json');

class Quote {
    getRandom() {
        return Math.floor(Math.random() * quotes.length);
    }
    getResult() {     
        return quotes[this.getRandom()];
    }
}

module.exports = Quote;