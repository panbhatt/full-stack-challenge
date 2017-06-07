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
    this.state = {value: 1};

    this.handleEmployeeItemChange = this.handleEmployeeItemChange.bind(this);
    this.handleReviewMenuItemChange = this.handleReviewMenuItemChange.bind(this);
  }

  handleEmployeeItemChange(event, index, value) {
    this.setState({value});
  }

  handleReviewMenuItemChange(event, index, value) {
    this.setState({value});
  }

  render() {
    return (
      <div>
        <DropDownMenu value={this.state.value} onChange={this.handleChange}>
          <MenuItem value={1} primaryText="Employee" />
          <MenuItem value={2} primaryText="Add Employee" />
          <MenuItem value={3} primaryText="Update Employee" />
          <MenuItem value={4} primaryText="View Employees" />
        </DropDownMenu>

        <DropDownMenu  value={this.state.value}  onChange={this.handleChange} style={styles.customWidth} autoWidth={false}>
          <MenuItem value={1} primaryText="Review" />
          <MenuItem value={2} primaryText="Add Review" />
          <MenuItem value={3} primaryText="Assign Reviewe" />
          <MenuItem value={4} primaryText="View Review" />

        </DropDownMenu>
      </div>
    );
  }
}
