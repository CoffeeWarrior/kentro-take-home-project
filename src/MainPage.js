import React from "react";
import EventEmitter from "./event-emitter"
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
class MainPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            messageData: {},
            messagesArray: [],
            buttonMode: "send",
            messageUpdateIndex: ''
        }
    }

    formInputChange = (event) => {
        //this function will update the message listed in messageData
        const messageData = {
            message: event.target.value,
            username: this.props.name
        }
        this.setState({messageData})
    }

    onButtonPress = (e) => {
        //this function will update the messageArray in state and update the time at which the message is sent.
        //this function will either update the message or add a new one depending on whether a message is selected
        if(this.state.buttonMode === "send"){
            const messageData = {...this.state.messageData}
            messageData.time = new Date().toLocaleTimeString();
            this.setState({messageData}, () => {
                EventEmitter.on("message", (messageData) => {
                    const messagesArray = [...this.state.messagesArray]
                    messagesArray.push(messageData)
                    this.setState({messagesArray});    
                })
        
                EventEmitter.emit("message", this.state.messageData)
                this.refs.input.value = ""
                 this.setState({messageData : {
                message: ""
                }})
            });   
        } else {
            const messagesArray = this.state.messagesArray
            if(this.state.messageData.message.length === 0){
                messagesArray.splice(this.state.messageUpdateIndex, 1)
            } else {
                messagesArray[this.state.messageUpdateIndex].message = this.state.messageData.message;
            }
            this.setState({messagesArray, buttonMode: "send"}, () => {
                this.refs.input.value = ""
                 this.setState({messageData : {
                message: ""
                }})
            });
        }
        
    }
        

    messageUpdate = (messageUpdateIndex) => {
        //this will change the status of the input to update a message or delete it
        this.setState({buttonMode: "update", messageUpdateIndex: messageUpdateIndex}, () => {console.log(this.state.messageUpdateIndex)});
    }

    render(){
        const messages = this.state.messagesArray.map((messageData, messageUpdateIndex) => {
            return(<li key={messageData.time}><a onClick={() => this.messageUpdate(messageUpdateIndex)}>{messageData.username} [{messageData.time}] {messageData.message}</a></li>)
        })

        return(
            <div>
                <ul>
                    {messages}
                </ul>
                <p>{this.props.name}</p>
                <input placeholder={this.state.buttonMode === "send"? "your message here":"update your message here, or leave blank to delete"} onChange = {this.formInputChange} ref="input"></input>
                <button onClick = {this.onButtonPress}>{this.state.buttonMode}</button>
            </div>
        )
    }
}

export default MainPage