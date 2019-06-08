class EventEmitter {
    constructor(){
      this.events = {};
    }
    
    on(event, handler) {
      this.events[event] = handler;
    }
  
    emit(event, data) {
      this.events[event](data);
    }
  }


export default new EventEmitter();