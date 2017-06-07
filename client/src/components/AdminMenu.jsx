import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  customWidth: {
    width: 200,
  },
};

export default class AdminMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      empSelect : "employee",
      revSelect : "review"
    };

    this.handleEmployeeItemChange = this.handleEmployeeItemChange.bind(this);
    this.handleReviewMenuItemChange = this.handleReviewMenuItemChange.bind(this);
  }

  handleEmployeeItemChange(event, index, value) {
    console.log("COMING HERE EMpoyee item change", index, value ) ;
    //this.setState({value});
    this.props.onChange(value);
  }

  handleReviewMenuItemChange(event, index, value) {
    console.log("COMING HERE Review item change", index, value) ;
    //this.setState({value});
    this.props.onChange(value);
  }

  render() {
    return (
      <div>
        <DropDownMenu value={this.state.empSelect} onChange={this.handleEmployeeItemChange}>
          <MenuItem value="employee" primaryText="Employee" />
          <MenuItem value="AddEmployee" primaryText="Add Employee" />
          <MenuItem value="UpdateEmployee" primaryText="Update Employee" />
          <MenuItem value="ViewEmployee" primaryText="View Employees" />
        </DropDownMenu>

        <DropDownMenu  value={this.state.revSelect}  onChange={this.handleReviewMenuItemChange} style={styles.customWidth} autoWidth={false}>
          <MenuItem value="review" primaryText="Review" />
          <MenuItem value="AddReview" primaryText="Add Review" />
          <MenuItem value="AssignReview" primaryText="Assign Reviewe" />
          <MenuItem value="ViewReview" primaryText="View Review" />

        </DropDownMenu>
      </div>
    );
  }
}
