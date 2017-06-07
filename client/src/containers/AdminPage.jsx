import React, { PropTypes } from 'react';
import axios from 'axios';
import { browserHistory, Router } from 'react-router';
import AdminPanel from '../components/AdminPanel.jsx';
import EmployeeAddForm from './../components/EmployeeAddForm.jsx' ;


class AdminPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      action : ""
    };

    this.processForm = this.processForm.bind(this);
    this.handleMenuItemChange = this.handleMenuItemChange.bind(this);

  }

  handleMenuItemChange(value) {

    //event.preventDefault();
    console.log("FINALLY COMING HERE in ADMIN page. ", value) ;
    this.setState({ action : value}) ; 
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    console.log('email:', this.state.user.email);
    console.log('password:', this.state.user.password);

    var userObject = {
      username : this.state.user.username,
      password : this.state.user.password,
    }
    var self = this;

  }

  /**
   * Render the component.
   */
  render() {
    return (
      <div>
      <AdminPanel onChange={this.handleMenuItemChange}/>
        { this.state.action === 'AddEmployee' ? <EmployeeAddForm/>  : null }

      </div>
    );
  }

}

export default AdminPage;
