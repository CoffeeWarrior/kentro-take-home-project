import React from 'react';
import MainPage from "./MainPage.js";
import "./App.css"

/* Simple Chat Task: - The task is to build a react web application for messaging 'people'. This task involes these rules and set of features. This will also be using the event emitter class created in the exercise task.

1) When the user goes to the site they must first provide a name inorder to view the main part of the application. If one is not given they can not view the main part of the application, this also means giving a value field of input ( ex: no empty strings ).

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

class App extends React.Component {
	constructor(props){
    super(props);
    this.state = {
      formNameInput: "",
      submittable: false,
      submitted: false
    }
  }
  
  onFormInputChange = (event) => {
    //this function will set the value input to the form as formNameInput
    this.setState({formNameInput: event.target.value, submittable: event.target.value.length > 0})
  }
  
  accessMainPage = () => {
    this.setState({submitted: true})

  }

  LoginPage = () => {
    //render jsx for login so its not gross in render function    
    return (
      <div>
        <form style={this.formStyles}>
          <input type="text" name="name" placeholder="please enter your name" onChange={this.onFormInputChange}></input>
          <button type="submit" disabled={!this.state.submittable} onClick={this.accessMainPage}>submit</button>
        </form>
      </div>
    );
  }

  MainSite = () => {
    return <MainPage name={this.state.formNameInput}></MainPage>;
  }

  render() {
    if(this.state.submitted){
      return this.MainSite();
    } else {
      return this.LoginPage();
    }
  }
}

export default App;