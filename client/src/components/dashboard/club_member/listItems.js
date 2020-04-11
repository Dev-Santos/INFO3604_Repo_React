//Needed React module
import React from 'react';

//Imported Bootstrap modules
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BarChartIcon from '@material-ui/icons/BarChart';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ScheduleIcon from '@material-ui/icons/Schedule';
import Link from '@material-ui/core/Link';


//The following is rendered/displayed on the browser
export const CM_MainListItems = (
  
  <div>

    {/* Set of Options */}

    <Link href="/api/dashboard">
      <ListItem button >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </Link>

    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Log Club Activities" />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <ScheduleIcon/>
      </ListItemIcon>
      <ListItemText primary="Delivery Schedule" />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <BarChartIcon/>
      </ListItemIcon>
      <ListItemText primary="Inventory" />
    </ListItem>


  </div>
);