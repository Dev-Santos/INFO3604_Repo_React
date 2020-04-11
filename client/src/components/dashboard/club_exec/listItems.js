//Needed React module
import React from 'react';

//Imported Bootstrap modules
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ScheduleIcon from '@material-ui/icons/Schedule';
import InfoIcon from '@material-ui/icons/Info';
import Link from '@material-ui/core/Link';


//The following is rendered/displayed on the browser
export const CE_MainListItems = (
  
  <div>

    {/* First Half of Options */}

    <Link href="/api/dashboard">
      <ListItem button >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </Link>

    <Link href="/api/dashboard/register">
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Registrations" />
      </ListItem>
    </Link>

    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Donors" />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Beneficiaries" />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="E-Waste Reports" />
    </ListItem>

  </div>
);

export const CE_SecondaryListItems = (
  <div>

    {/* Second Half of Options */}
    
    <ListSubheader inset>Club Details</ListSubheader>

    <ListItem button>
      <ListItemIcon>
        <BarChartIcon/>
      </ListItemIcon>
      <ListItemText primary="Inventory" />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <ScheduleIcon/>
      </ListItemIcon>
      <ListItemText primary="Club Schedule" />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <InfoIcon />
      </ListItemIcon>
      <ListItemText primary="Club Information" />
    </ListItem>
    
  </div>

);