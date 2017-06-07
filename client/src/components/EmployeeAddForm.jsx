import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import axios from 'axios';

class EmployeeAddForm extends React.Component {




 constructor(props) {
   super(props);

   // set the initial component state
   this.state = {
     username : "",
     password : "",
     email : "",
     isAdmin : false,
     msgSuccess : "",
     msgFailure : ""

   };

   this.onSubmit = this.onSubmit.bind(this);
   this.onIsAdminChange = this.onIsAdminChange.bind(this);
   this.changeUser = this.changeUser.bind(this);

 }

 onIsAdminChange (event, value) {
   console.log('State = ' , this.state);
   this.setState({
     username : this.state.username,
     password : this.state.password,
     email : this.state.email,
     isAdmin : value,
   })
   console.log("CLICK EVENT ", value) ;
 }

 onSubmit(event) {
   event.preventDefault();

   var self = this;
   axios.post(`/api/employee`,this.state,{ headers: {'Accept': 'application/json'} })
     .then(function (response) {

         var st = self.state;
         if(response.data.message){
           st.msgSuccess = st.username + " " + response.data.message;
           st.msgFailure = "";
           self.setState(st);
         }

       })
       .catch(function (errRs) {
         var st = self.state;
          if( errRs.response.data.message) {
            st.msgFailure = errRs.response.data.message;
            st.msgSuccess = "";
            self.setState(st);
          }

       });
 }


 changeUser(event) {
   const field = event.target.name;
   const user = this.state;
   user[field] = event.target.value;
   this.setState(user);
 }


 render() {

   return (
     <Card className="container">
       <form action="/" onSubmit={this.onSubmit}>
         <h2 className="card-heading">Add Employee</h2>

         {this.state.msgSuccess != '' && <p className="success-message">{this.state.msgSuccess}</p>}
         {this.state.msgFailure != '' && <p className="error-message">{this.state.msgFailure}</p>}

         <div className="field-line">
           <TextField
             floatingLabelText="Username"
             name="username"
             value={this.state.username}
             onChange={this.changeUser}
           />
         </div>
         <div className="field-line">
           <TextField
             floatingLabelText="Password"
             name="password"
             type="password"
             value={this.state.password}
             onChange={this.changeUser}
           />
       </div>
       <div className="field-line">
         <TextField
           floatingLabelText="E-mail"
           name="email"
           type="email"
           value={this.state.email}
           onChange={this.changeUser}
         />
     </div>
     <div className="field-line">
       <Checkbox   label="Is Administrator"   labelPosition="left"  onCheck={this.onIsAdminChange}/>

    </div>

         <div className="button-line">
           <RaisedButton type="submit" label="Add" primary />
         </div>


       </form>
     </Card>
   );
 }
}

/*
EmployeeAddForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}; */

export default EmployeeAddForm;
