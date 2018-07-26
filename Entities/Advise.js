const { advices } = require('../config.json');

class Advise {//Proxy
    getRandom() {
        return Math.floor(Math.random() * advices.length);
    }
    getResult() {
        const proxy = new Proxy(this, handler);
        return proxy.getResult;
    }
}

const handler = {
    get: (target, prop) => {
        if (prop === 'getResult') {
            return  advices[target.getRandom()];
        }
    }
};

module.exports = Advise;