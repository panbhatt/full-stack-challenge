import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';

class ReviewAssignForm extends React.Component {

 constructor(props) {
   super(props);

   // set the initial component state
   this.state = {
     users : [],
     errors : {}

   };

   this.onSubmit = this.onSubmit.bind(this);
   this.handleSourceChange = this.handleSourceChange.bind(this);
   this.handleTargetChange = this.handleTargetChange.bind(this);
   this.getEmployeeList = this.getEmployeeList.bind(this);


   this.getEmployeeList();

 }

 onSubmit(event) {
   event.preventDefault();
   var self = this;
   var state = this.state ;

   if(state.selectedSource === state.selectedTarget){
      state.msgFailure = "Reviewer and Assigned Employee's can't be same";
      state.msgSuccess = undefined;
      this.setState(state);
   } else {
      // Raise a ajax request and get the response.
      var apiObject = {
        by : state.selectedSource,
        for : state.selectedTarget,
        review : ""
      }
      axios.post('/api/review',apiObject)
      .then((response)=>{
          state.errors.msgFailure = "";
          state.msgSuccess = "Review has been added. ";
          state.msgFailure = undefined;
          this.setState(state);
      }).catch((response)=>{

      });
   }



 }

   // This function will retrieve the data
   getEmployeeList() {

     var self = this;
      axios.get('/api/employee')
      .then((response)=> {
        console.log(response);
        var selected ;
           if(response.data.length > 0) {
             selected = response.data[0].username;
           }
          self.setState({
            users : response.data,
            selectedSource : selected,
            selectedTarget : selected,
          })
      }).catch((errRs) => {

      });
   }

// Hanlding first Select click
  handleSourceChange(event,index, value){
      var state = this.state ;
      state['source'] = value;
      state['selectedSource'] = value;
      this.setState(state) ;
  }

// Hanlding Second Select click
  handleTargetChange(event, index, value) {
    var state = this.state ;
    state['target'] = value;
    state['selectedTarget'] = value;
    this.setState(state) ;
  }


 render() {

   return (
     <Card className="container">
       <form action="/" onSubmit={this.onSubmit}>
         <h2 className="card-heading">Assign Review</h2>

         {this.state.msgSuccess != '' && <p className="success-message">{this.state.msgSuccess}</p>}
         {this.state.msgFailure != '' && <p className="error-message">{this.state.msgFailure}</p>}

         <div className="field-line">
         <DropDownMenu value={this.state.selectedSource} onChange={this.handleSourceChange} >
           { this.state.users.map(function (i) {
             return <MenuItem key={i._id} value={i.username} primaryText={i.username} />
           })
           }
         </DropDownMenu>
         </div>
         <br/><h3> Assign to </h3> <br/>
         <div className="field-line">
         <DropDownMenu value={this.state.selectedTarget} onChange={this.handleTargetChange} >
           { this.state.users.map(function (i) {

             return <MenuItem key={i._id} value={i.username} primaryText={i.username} />
           })
           }
         </DropDownMenu>
         </div>

         <div className="button-line">
           <RaisedButton type="submit" label="Assign" primary />
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

export default ReviewAssignForm;
