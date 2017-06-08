import React, { PropTypes } from 'react';
import axios from 'axios';
import { browserHistory, Router } from 'react-router';
import AdminPanel from '../components/AdminPanel.jsx';
import EmployeeAddForm from './../components/EmployeeAddForm.jsx' ;
import ReviewAssignForm from './../components/ReviewAssignForm.jsx' ;
import ReviewListForm from './../components/ReviewListForm.jsx' ;
import { Card, CardTitle } from 'material-ui/Card';


class EmployeePage extends React.Component {

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
        <Card className="container">
          <CardTitle title="Employee Pending Reviews">
              <ReviewListForm />
          </CardTitle>
        </Card>

      </div>
    );
  }

}

export default EmployeePage;
