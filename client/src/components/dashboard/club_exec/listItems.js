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
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { ListGroup } from 'react-bootstrap';


//The following is rendered/displayed on the browser
export const CE_MainListItems = (
  
  <div>

    {/* First Half of Options */}

    
      {/* Dashboard Option */}
      <ListItem>

        <Link href="/api/dashboard">

          <ExpansionPanel expanded={false}>
            
              <ExpansionPanelSummary style={{width: '260px'}}>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ExpansionPanelSummary>
            
          </ExpansionPanel>

        </Link>

      </ListItem>


      {/* Club Members Option */}
      <ListItem>

        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} style={{width: '260px'}}>

                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>

                <ListItemText primary="Club Members" />
                    
            </ExpansionPanelSummary>

            <ExpansionPanelDetails>
              
              <ListGroup>
                <ListGroup.Item action href="/api/dashboard/reg_listing">Registration Listing</ListGroup.Item>
                <ListGroup.Item action href="/api/dashboard/reg_users" >Authenticated Users</ListGroup.Item>
              </ListGroup>
              
            </ExpansionPanelDetails>

        </ExpansionPanel>

      </ListItem>
    

      {/* E-Waste Reports Option */}
      <ListItem>

          <Link href="/api/dashboard/ereports">

            <ExpansionPanel expanded={false}>
              
                <ExpansionPanelSummary style={{width: '260px'}}>
                  <ListItemIcon>
                    <AssignmentIcon />
                  </ListItemIcon>
                  <ListItemText primary="E-Waste Reports" />
                </ExpansionPanelSummary>
              
            </ExpansionPanel>

          </Link>

    </ListItem>


    {/* Donors Option */}
    <ListItem>

        <ExpansionPanel>

            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} style={{width: '260px'}}>

                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>

                <ListItemText primary="Donors" />
                    
            </ExpansionPanelSummary>

            <ExpansionPanelDetails>
              
              <ListGroup>
                <ListGroup.Item action href="/api/dashboard/donor_reg_listing">Registration Listing</ListGroup.Item>
                <ListGroup.Item action href="/api/dashboard/donor_listing" >Authenticated Donors</ListGroup.Item>
              </ListGroup>
              
            </ExpansionPanelDetails>

        </ExpansionPanel>

    </ListItem>


    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Beneficiaries" />
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