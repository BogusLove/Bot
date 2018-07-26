class UserStore {
    constructor(){
        if(! UserStore.instance){
            this._data = [];
            UserStore.instance = this;
        }        
        return UserStore.instance;
    }
  
    add(item){
      this._data.push(item);
    }   

    delete(id) {
        this._data.splice(this._data.findIndex(data => elem.title === id), 1);
    }

    getAll() {
        return this._data;
    }
  }
  
const instance = new UserStore();
Object.freeze(instance);

module.exports = instance;