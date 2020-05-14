import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CreateIcon from '@material-ui/icons/Create';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export function CEPrimary() {
  
    const classes = useStyles();

  const [openCM, setOpenCM] = React.useState(false);
  const [openDonor, setOpenDonor] = React.useState(false);
  const [openBen, setOpenBen] = React.useState(false);

  const handleCM = () => {
    setOpenCM(!openCM);
  };

  const handleDonor = () => {
    setOpenDonor(!openDonor);
  };

  const handleBen = () => {
    setOpenBen(!openBen);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
      subheader={
        <ListSubheader component="div" inset>
          <Typography style={{marginTop: '20px', marginBottom: '20px', fontWeight: 'bold'}}>System Entities</Typography>
        </ListSubheader>
      }
    >
        <Link href="/api/dashboard" style={{textDecoration: 'none', color: 'black'}}>
        
            <ListItem button>
            <ListItemIcon>
            <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
            </ListItem>

        </Link>
        
        

        <ListItem onClick={handleCM}>
        <ListItemIcon>
            <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Club Members" />
        {openCM ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

                <Link href="/api/dashboard/reg_listing" style={{textDecoration: 'none', color: 'black'}}>
                
                    <Collapse in={openCM} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                            <LibraryBooksIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Registration Listing" />
                        </ListItem>
                        </List>
                    </Collapse>
                
                </Link>

                <Link href="/api/dashboard/reg_users" style={{textDecoration: 'none', color: 'black'}}>
                
                    <Collapse in={openCM} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                            <HowToRegIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Authenticated Users" />
                        </ListItem>
                        </List>
                    </Collapse>
                
                </Link>
        

        <ListItem onClick={handleDonor}>
        <ListItemIcon>
            <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Donors" />
        {openDonor ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

                <Link href="/api/dashboard/donor_reg_listing" style={{textDecoration: 'none', color: 'black'}}>
                
                    <Collapse in={openDonor} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                            <LibraryBooksIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Registration Listing" />
                        </ListItem>
                        </List>
                    </Collapse>
                
                </Link>

                <Link href="/api/dashboard/donor_listing" style={{textDecoration: 'none', color: 'black'}}>
                
                    <Collapse in={openDonor} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                            <HowToRegIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Authenticated Donors" />
                        </ListItem>
                        </List>
                    </Collapse>     
                
                </Link>


        <ListItem onClick={handleBen}>
        <ListItemIcon>
            <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Beneficiaries" />
        {openBen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

                <Link href="/api/dashboard/ben_reg_listing" style={{textDecoration: 'none', color: 'black'}}>

                    <Collapse in={openBen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                            <LibraryBooksIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Registration Listing" />
                        </ListItem>
                        </List>
                    </Collapse>

                </Link>


                <Link href="/api/dashboard/ben_listing" style={{textDecoration: 'none', color: 'black'}}>
                
                    <Collapse in={openBen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                            <HowToRegIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Authenticated Beneficiaries" />
                        </ListItem>
                        </List>
                    </Collapse>
                   
                </Link>

    </List>
  );
}



export function CESecondary() {
    
    const classes = useStyles();

    const [openER, setOpenER] = React.useState(false);
    const [openDon, setOpenDon] = React.useState(false);
    const [openDonReq, setOpenDonReq] = React.useState(false);
    const [openAct, setOpenAct] = React.useState(false);

    
    const handleER = () => {
        setOpenER(!openER);
    };
    
    const handleDon = () => {
        setOpenDon(!openDon);
    };

    const handleDonReq = () => {
        setOpenDonReq(!openDonReq);
    };

    const handleAct = () => {
        setOpenAct(!openAct);
    };

  
    return (
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        className={classes.root}
        subheader={
          <ListSubheader component="div" inset>
            <Typography style={{marginTop: '20px', marginBottom: '20px', fontWeight: 'bold'}}>Club Details</Typography>
          </ListSubheader>
        }
      >

        <ListItem onClick={handleER}>
        <ListItemIcon>
        <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="E-Waste Reports" />
        {openER ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

                <Link href="/api/dashboard/ereports" style={{textDecoration: 'none', color: 'black'}}>
                
                    <Collapse in={openER} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                            <AutorenewIcon/>
                            </ListItemIcon>
                            <ListItemText primary="E-Waste For Collection" />
                        </ListItem>
                        </List>
                    </Collapse>
                
                </Link>

                <Link href="/api/dashboard/ereports_collected" style={{textDecoration: 'none', color: 'black'}}>
                
                    <Collapse in={openER} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                            <CheckBoxIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Collected E-Waste" />
                        </ListItem>
                        </List>
                    </Collapse>
    
                </Link>



        <ListItem onClick={handleDon}>
        <ListItemIcon>
            <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Donations" />
        {openDon ? <ExpandLess /> : <ExpandMore />}
        </ListItem>


                <Link href="/api/dashboard/donations" style={{textDecoration: 'none', color: 'black'}}>

                        <Collapse in={openDon} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                <AssignmentIcon />
                                </ListItemIcon>
                                <ListItemText primary="Submitted Donations" />
                            </ListItem>
                            </List>
                        </Collapse>

                        </Link>


                        <Link href="/api/dashboard/donations_auth" style={{textDecoration: 'none', color: 'black'}}>

                        <Collapse in={openDon} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                <AssignmentTurnedInIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Approved Donations" />
                            </ListItem>
                            </List>
                        </Collapse>

                </Link>


        <ListItem onClick={handleDonReq}>
        <ListItemIcon>
            <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Donation Requests" />
        {openDonReq ? <ExpandLess /> : <ExpandMore />}
        </ListItem>


            <Link href="/api/dashboard/donation_reqs" style={{textDecoration: 'none', color: 'black'}}>

                <Collapse in={openDonReq} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                        <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Donation Requests" />
                    </ListItem>
                    </List>
                </Collapse>

                </Link>


                <Link href="/api/dashboard/donation_reqs_auth" style={{textDecoration: 'none', color: 'black'}}>

                <Collapse in={openDonReq} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                        <AssignmentTurnedInIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Approved Requests" />
                    </ListItem>
                    </List>
                </Collapse>

            </Link>


        <ListItem onClick={handleAct}>
        <ListItemIcon>
            <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Club Activities" />
        {openAct ? <ExpandLess /> : <ExpandMore />}
        </ListItem>


            <Link href="/api/dashboard/activity" style={{textDecoration: 'none', color: 'black'}}>

                <Collapse in={openAct} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                        <CreateIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Create Activity" />
                    </ListItem>
                    </List>
                </Collapse>

                </Link>


                <Link href="/api/dashboard/activity_listing" style={{textDecoration: 'none', color: 'black'}}>

                <Collapse in={openAct} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                        <LibraryBooksIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Activity Listing" />
                    </ListItem>
                    </List>
                </Collapse>

            </Link>

      </List>
    );
  }