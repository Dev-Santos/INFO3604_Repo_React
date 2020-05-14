//Needed React modules
import React from 'react';

//Imported Bootstrap elements from Material UI
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

//Import the component that will allows to add images
import Img from './Img';


//Here is where we import our respective images
import i1 from '../../pics/gallery1.jpg';
import i2 from '../../pics/gallery2.jpg';
import i3 from '../../pics/gallery3.jpg';
import i4 from '../../pics/gallery4.jpg';
import i5 from '../../pics/gallery5.jpg';
import i6 from '../../pics/gallery6.PNG';
import i7 from '../../pics/gallery7.jpg';

//Some styling definitions (directly taken from a website)
const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));


//Similar to ReactUploadImage component, this component was defined using React Hooks

export default function Album() { //Export the component to be used - It is done in the beginning as opposed at the botton
  
  //Initialise our styling classes
  const classes = useStyles();

  //The following is rendered/displayed on the browser
  return (

    <React.Fragment> {/* The Fragment element is used to indicated that the following is a fragment/block of elements to be rendered by React */}
      <div class="bordered">    

        <div>

          <Container maxWidth="sm">

              {/* Page Heading */}
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                Gallery
              </Typography>

          </Container>
        
        </div>
      

        {/* Section with different pictures */}
        <Container className={classes.cardGrid} maxWidth="md">

          <Grid container spacing={4}>

              <Grid item xs={12} sm={6} md={4}>
                    
                    {/* CARD #1  */}
                    <Card className={classes.card}>
                        
                        <div className={classes.cardContent}>
                          {/* This is where the image is positioned and we just pass the image reference (lines 19-22) */}
                          <Img id="i1" alt="Snow" src={i1}/>
                        </div>
                     

                        {/* CARD DESCRIPTION */}
                        <CardContent className={classes.cardContent}>
                            
                            <Typography gutterBottom variant="h5" component="h2">
                                RSC teaches E-waste Refurbishment
                            </Typography>

                            <Typography>
                                Seen here: Members of RSC teaching PC Refurbishment at their secondary school club at Naparima College
                            </Typography>

                        </CardContent>

                        {/* CARD BUTTONS */}
                        <CardActions>
                          
                          <Button size="small" color="primary">
                          <a  href="https://www.facebook.com/photo/?fbid=3058877897511722&set=pcb.3239310046113194" target="_blank" rel="noopener noreferrer">View in Detail</a>
                          </Button>
                          


                        </CardActions>

                    </Card>

              </Grid>


              <Grid item xs={12} sm={6} md={4}>
                    
                    {/* CARD #2  */}
                    <Card className={classes.card}>
                        
                        <div className={classes.cardContent}>
                          {/* This is where the image is positioned and we just pass the image reference (lines 19-22) */}
                          <Img src={i2}/>
                        </div>

                        {/* CARD DESCRIPTION */}
                        <CardContent className={classes.cardContent}>
                            
                            <Typography gutterBottom variant="h5" component="h2">
                                Members of Tech Clubs Repair Old PC
                            </Typography>

                            <Typography>
                                Seen here: Members of the RSC Tech Club in Naparima College held a "Repair Day" in their Gymnasium/Auditorium. There with the guidance of RSC, many PC's were repaired for donation.
                            </Typography>

                        </CardContent>

                        {/* CARD BUTTONS */}
                        <CardActions>
                          
                          <Button size="small" color="primary">
                          <a  href="https://www.facebook.com/photo?fbid=3058878224178356&set=pcb.3239310046113194" target="_blank" rel="noopener noreferrer">View in Detail</a>
                          </Button>

                        </CardActions>

                    </Card>

              </Grid>


              <Grid item xs={12} sm={6} md={4}>
                    
                    {/* CARD #3  */}
                    <Card className={classes.card}>
                        
                        <div className={classes.cardContent}>
                          {/* This is where the image is positioned and we just pass the image reference (lines 19-22) */}
                          <Img src={i3}/>
                        </div>

                        {/* CARD DESCRIPTION */}
                        <CardContent className={classes.cardContent}>
                            
                            <Typography gutterBottom variant="h5" component="h2">
                                RSC teaches Assists Club Members with E-waste Refurbishment
                            </Typography>

                            <Typography>
                                Seen here: Volunteers of the Non-Profit RSC assists Club Members with the repair and refurbishment of Old PC's
                            </Typography>

                        </CardContent>

                        {/* CARD BUTTONS */}
                        <CardActions>
                          
                          <Button size="small" color="primary">
                          <a  href="https://www.facebook.com/photo?fbid=3058878320845013&set=pcb.3239310046113194" target="_blank" rel="noopener noreferrer">View in Detail</a>
                          </Button>

                        </CardActions>

                    </Card>

              </Grid>


              <Grid item xs={12} sm={6} md={4}>
                    
                    {/* CARD #1  */}
                    <Card className={classes.card}>
                        
                        <div className={classes.cardContent}>
                          {/* This is where the image is positioned and we just pass the image reference (lines 19-22) */}
                          <Img src={i4}/>
                        </div>

                        {/* CARD DESCRIPTION */}
                        <CardContent className={classes.cardContent}>
                            
                            <Typography gutterBottom variant="h5" component="h2">
                                RSC Club Members Gather Old E-Waste
                            </Typography>

                            <Typography>
                                Seen here: Members of RSC Tech Club Form a line to empty an a storage room of old e-waste
                            </Typography>

                        </CardContent>

                        {/* CARD BUTTONS */}
                        <CardActions>
                          
                          <Button size="small" color="primary">
                          <a  href="https://www.facebook.com/photo?fbid=3058878554178323&set=pcb.3239310046113194" target="_blank" rel="noopener noreferrer">View in Detail</a>
                          </Button>

                        </CardActions>

                    </Card>

              </Grid>


              <Grid item xs={12} sm={6} md={4}>
                    
                    {/* CARD #5  */}
                    <Card className={classes.card}>
                        
                        <div className={classes.cardContent}>
                          {/* This is where the image is positioned and we just pass the image reference (lines 19-22) */}
                          <Img src={i5}/>
                        </div>

                        {/* CARD DESCRIPTION */}
                        <CardContent className={classes.cardContent}>
                            
                            <Typography gutterBottom variant="h5" component="h2">
                                RSC Donates Refurbished E-waste
                            </Typography>

                            <Typography>
                                Seen here: Members of RSC donate refurbished E-waste to places in need.
                            </Typography>

                        </CardContent>

                        {/* CARD BUTTONS */}
                        <CardActions>
                          
                          <Button size="small" color="primary">
                          <a  href="https://www.facebook.com/photo?fbid=3058878257511686&set=pcb.3239310046113194" target="_blank" rel="noopener noreferrer">View in Detail</a>
                          </Button>

                        </CardActions>

                    </Card>

              </Grid>


              <Grid item xs={12} sm={6} md={4}>
                    
                    {/* CARD #6  */}
                    <Card className={classes.card}>
                        
                        <div className={classes.cardContent}>
                          {/* This is where the image is positioned and we just pass the image reference (lines 19-22) */}
                          <Img src={i6}/>
                        </div>

                        {/* CARD DESCRIPTION */}
                        <CardContent className={classes.cardContent}>
                            
                            <Typography gutterBottom variant="h5" component="h2">
                                RSC Executive: The R.I.D.E. Project
                            </Typography>

                            <Typography>
                                Seen here: RSC Executive Raj Ramdass Speak of the RSC E-waste Project, R.I.D.E. (Reduce the Indiscriminate Dumoing of E-waste) 
                            </Typography>

                        </CardContent>

                        {/* CARD BUTTONS */}
                        <CardActions>
                          
                          <Button size="small" color="primary">
                          <a  href="https://www.youtube.com/watch?v=5pjesuht4Pw&t=20s" target="_blank" rel="noopener noreferrer">View Video</a>
                          </Button>

                        </CardActions>

                    </Card>

              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                    
                    {/* CARD #7  */}
                    <Card className={classes.card}>
                        
                        <div className={classes.cardContent}>
                          {/* This is where the image is positioned and we just pass the image reference (lines 19-22) */}
                          <Img src={i7}/>
                        </div>

                        {/* CARD DESCRIPTION */}
                        <CardContent className={classes.cardContent}>
                            
                            <Typography gutterBottom variant="h5" component="h2">
                                RSC Tech Club Collects E-waste
                            </Typography>

                            <Typography>
                                Seen here: Members of RSC Tech Club collects old E-waste
                            </Typography>

                        </CardContent>

                        {/* CARD BUTTONS */}
                        <CardActions>
                          
                          <Button size="small" color="primary">
                          <a  href="https://www.facebook.com/photo/?fbid=3049384445105756&set=a.1603414999702715" target="_blank" rel="noopener noreferrer">View in Detail</a>
                          </Button>

                        </CardActions>

                    </Card>

              </Grid>

          </Grid>

        </Container>

      </div>
      
    </React.Fragment>
  );
}