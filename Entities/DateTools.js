class DateTools {
    constructor(){
        if(! DateTools.instance){
            this._data = [];
            DateTools.instance = this;
        }        
        return DateTools.instance;
    }
    getNow(args) {
        return args ? new Date(args) : new Date();
    }
    validDate(str) {
        let date = this.getNow();
        return date.toISOString().split('T')[0];
    }
    getNextDayOfWeek(date, dayOfWeek) {    
        var resultDate = this.getNow(date.getTime());
        resultDate.setDate(date.getDate() + (7 + dayOfWeek - date.getDay()) % 7);
        return resultDate;
    }
    getDate() {
        const now = this.getNow();
        return {
            'today': now,
            'tomorrow': (now).setDate(now.getDate() + 1),
            'Sunday': this.getNextDayOfWeek(now, 0),
            'Monday': this.getNextDayOfWeek(now, 1),
            'Tuesday': this.getNextDayOfWeek(now, 2),
            'Wednesday': this.getNextDayOfWeek(now, 3),
            'Thursdaay': this.getNextDayOfWeek(now, 4),
            'Friday': this.getNextDayOfWeek(now, 5),
            'Saturday': this.getNextDayOfWeek(now, 6)
        };
    }
    getTimeNow(){
        let now = this.getNow();
        let str = now.getHours() + ':' + now.getMinutes();
        return str;
    }
}

const instance = new DateTools();
Object.freeze(instance);

module.exports = instance;