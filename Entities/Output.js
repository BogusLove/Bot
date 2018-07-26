class Output {
    constructor(){
        if(! Output.instance){
            Output.instance = this;
        }        
        return Output.instance;
    }
    prettify(obj) {
        return this.decorator(obj);
    }
    arrayDecorator(array) {
        let res = '';
        if (typeof array[0] === 'object') {
            for (let i = 0; i < array.length; i++) {
                res += '<-{'
                for (let key in array[i]) {
                    res += `${key}: ${array[i][key]}`;
                }
                res += '}->';
            }
        } else {
            for (let i = 0; i < array.length; i++) {
                res += `${array[i]}`;
            }
        }
        return res;
    }    
    objDecorator(obj) {
        let res = '';
        for (let i in obj) {
            res += `${i}: ${obj[i]}`;
        }
        return res;
    }    
    decorator(obj) {
        return obj.length ? this.arrayDecorator(obj) : this.objDecorator(obj);
    }
}

const instance = new Output();
Object.freeze(instance);

module.exports = instance;