import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import AdminMenu from './AdminMenu.jsx';

import MenuItem from 'material-ui/MenuItem';


const AdminPanel = ({onChange}) => (
  <Card className="container">
    <CardTitle title="Administration">
      <AdminMenu onChange={onChange}/>
    </CardTitle>




  </Card>
);

export default AdminPanel;
