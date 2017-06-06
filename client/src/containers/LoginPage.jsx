import React, { PropTypes } from 'react';
import axios from 'axios';
import LoginForm from '../components/LoginForm.jsx';


class LoginPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      errors: {},
      user: {
        email: '',
        password: '',
        username : ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
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

    axios.post(`/auth/login`,userObject,{ headers: {'Accept': 'application/json'} })
      .then(function (response) {
          if(response.admin == true) {
              // Do the Routing here.
          }
        })
        .catch(function (errRs) {
          console.log(errRs.response.data.message) ;

          var errObj = {
            summary : errRs.response.data.message,
            username : errRs.response.data.errors.username,
            password : errRs.response.data.errors.password
          } ;

          self.setState({
            errors : errObj
          })
        });
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <LoginForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
      />
    );
  }

}

export default LoginPage;
