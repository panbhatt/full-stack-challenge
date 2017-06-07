import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import AdminMenu from './AdminMenu.jsx';

import MenuItem from 'material-ui/MenuItem';


const AdminPanel = () => (
  <Card className="container">
    <CardTitle title="Administration">
      <AdminMenu/>
    </CardTitle>




  </Card>
);

export default AdminPanel;
