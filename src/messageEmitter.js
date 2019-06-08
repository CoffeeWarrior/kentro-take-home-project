import EventEmitter from "./event-emitter.js";

/*
2) Once they have given there name, display there name, a input field at the button and a button. If the user types something into the input field and clicks the 'send' button. This event should display the message.

For submittig a message and recieving it use the event emitter in the event-meitter.js file and use it to listen for new events and emit new messages to the event called 'message'

- Thes message should contain these three things:
    * the message that was sent
    * the time they sent it
    * and the name of the user who sent the message

3) once that is complete, create these two other features.
    * The ability to delete a specific message the user him/her self sent
    * The ability to edit a specific message that user him/her self sent

*/ 

const MessageEmitter = new EventEmitter();

MessageEmitter.on("message", (message) => {
    console.log(...message);
})
