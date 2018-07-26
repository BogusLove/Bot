const STORE = require('./Store');
const OUTPUT = require('./Output');

class Notes {
    constructor(body) {
        this.body = body;
    }
    
    parseBody(commandBody) {
        let body = commandBody.split(' ');
        let command = body[0].toLowerCase();
        let data = {};
        switch(command) {
            case 'save':
                data = {
                    title: body.slice(body.indexOf('title:') + 1, body.indexOf('body:')).join(' '),
                    body: body.slice(body.indexOf('body:') + 1).join(' ')
                };
                break;
            case 'show': 
                if (body[body.length - 1] === 'list') 
                    data = {};
                else 
                    data = { 
                        title: body.slice(2).join(' ') 
                    };                
                break;
            case 'delete':
                data = { 
                    title: body.slice(2).join(' ') 
                };
                break;
        }
        return {
            command: command,
            data: data
        }
    }

    runCommand({ command, data = '' }) {
        console.dir(data);        
        switch (command) {
            case 'save':
                STORE.add(data);
                return `Note ${data.title} added`;
            case 'show'://Facade
                if (data.title) return OUTPUT.prettify(STORE.getAll().find(note => note.title.includes(data.title)));
                else return OUTPUT.prettify(STORE.getAll());
            case 'delete': 
                STORE.getAll().splice(STORE.getAll().findIndex((elem) => elem.title === data.title), 1);
                return `Note ${data.title} deleted`;
            default:
                return `No such command "${command}" with note`;
        }
    }

    getResult() {
        return this.curry(this.runCommand)(this.parseBody)(this.body);//currying
    }

    curry(fn1) {
        return (fn2) => {
            return (fn3) => {
                return fn1(fn2(fn3));
            }
        }
    }
}



module.exports = Notes;