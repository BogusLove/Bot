const Weather = require('./Entities/Weather');
const Exchange = require('./Entities/Exchange');
const Notes = require('./Entities/Notes');
const Advice = require('./Entities/Advise');
const Quote = require('./Entities/Quote');


class BOT {//Factory
    constructor(body){
        this.body = body;
        this.dataString = body.trim().substr(5, body.length);
        this.dataArray = body.trim().split(' ').splice(1, body.split(' ').length);
    }

    apply(){
        if (this.dataString.includes('weather')) return new Weather(this.dataString);
        if (this.dataArray[0].toLowerCase() === 'convert') return new Exchange(this.dataString);
        if (this.dataArray[1] === 'note') return new Notes(this.dataString);
        if (this.dataArray[this.dataArray.length - 1] === '#@)₴?$0') return new Advice(this.dataString);
        if (this.dataArray[1] === 'quote') return new Quote(this.dataString);
        return { 
            getResult() {
                return "Ha-ha, wrong command :)";
            }
        };
    }
}

module.exports =  BOT;