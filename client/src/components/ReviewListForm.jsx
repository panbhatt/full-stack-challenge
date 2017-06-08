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
import {  Table, TableBody,  TableHeader,  TableHeaderColumn,TableRow,  TableRowColumn} from 'material-ui/Table';

class ReviewListForm extends React.Component {

 constructor(props) {
   super(props);

   // set the initial component state
   this.state = {
     errors : {},
     reviews:[],
     revTexts : []
   };

   this.onSubmit = this.onSubmit.bind(this);
   this.onChange = this.onChange.bind(this);
   this.handleOpen = this.handleOpen.bind(this);

   this.getReviewsList = this.getReviewsList.bind(this);

   this.getReviewsList();

 }

 handleOpen(event) {

 }

 onChange(index) {
   event.preventDefault();
   var state = this.state;
   var self = this ;
   var text = window.prompt("Enter the Review Details");
   console.log(text);
   if(text != null && text != undefined && text.trim().length !=0){
        var review = this.state.reviews[index];
        console.log(review);
        axios.put('/api/review/'+review._id,{ review : text})
        .then((response) =>{
          console.log("Successfully upated teh review "+ review._id) ;
          var newData = state.reviews.slice(); //copy array
          newData.splice(index, 1); //remove element
          state.reviews = newData;
          state.msgSuccess = "Review has been submitted";
          state.msgFailure = "";
          self.setState(state);

        }).catch((errRs)=>{
          console.log("An Error occured while updating the review. ", errRs) ;
        })

   } else {
     state.msgSuccess = "";
     state.msgFailure = "Please, Enter some Review Text.";
     self.setState(state);
   }

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
   getReviewsList() {

     var self = this;

      axios.get('/api/review/user/'+sessionStorage.getItem('username')+"?complete=false")
      .then((response)=> {
        console.log(response);
        self.setState({
          reviews : response.data,
          revTexts : new Array(response.data.length)
        })

      }).catch((errRs) => {
         console.error("Error occured, while getting list of Reviews. ");
      });
   }


 render() {

   return (
    <div>
      {this.state.msgSuccess != '' && <p className="success-message">{this.state.msgSuccess}</p>}
      {this.state.msgFailure != '' && <p className="error-message">{this.state.msgFailure}</p>}
     <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderColumn>ID</TableHeaderColumn>
          <TableHeaderColumn>Assigned By</TableHeaderColumn>

          <TableHeaderColumn>Action</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody>
        {this.state.reviews.map( (row, index) => (
             <TableRow key={index}>
               <TableRowColumn>{index}</TableRowColumn>
               <TableRowColumn>{row.by}</TableRowColumn>
               <TableRowColumn><RaisedButton label="Primary" primary={true} label="Complete" onTouchTap={this.onChange.bind(null,index)}/></TableRowColumn>


             </TableRow>
             ))}
      </TableBody>
    </Table>
    </div>




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

export default ReviewListForm;
