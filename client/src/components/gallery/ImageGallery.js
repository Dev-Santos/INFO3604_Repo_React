import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Img from './Img';

import i1 from '../../pics/slider1.png';
import i2 from '../../pics/slider2.png';
import i3 from '../../pics/slider3.png';

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

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Album() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div>
        {/* Hero unit */}
        <div>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Gallery
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Images
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Videos
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Posts
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        {/* End hero unit */}
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
                {/* CARD #1  */}
                <Card className={classes.card}>
                  <div className={classes.cardContent}>
                    <Img src={i1}/>
                  </div>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Image1
                    </Typography>
                    <Typography>
                      Image1 Description
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Edit
                    </Button>
                  </CardActions>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                {/* CARD #2  */}
                <Card className={classes.card}>
                  <div className={classes.cardContent}>
                    <Img src={i2}/>
                  </div>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Image2
                    </Typography>
                    <Typography>
                      Image2 Description
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Edit
                    </Button>
                  </CardActions>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                {/* CARD #3  */}
                <Card className={classes.card}>
                  <div className={classes.cardContent}>
                    <Img src={i3}/>
                  </div>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Image3
                    </Typography>
                    <Typography>
                      Image3 Description
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Edit
                    </Button>
                  </CardActions>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                {/* CARD #4  */}
                <Card className={classes.card}>
                  <div className={classes.cardContent}>
                    <Img src={i1}/>
                  </div>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Image4
                    </Typography>
                    <Typography>
                      Image4 Description
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Edit
                    </Button>
                  </CardActions>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                {/* CARD #5  */}
                <Card className={classes.card}>
                  <div className={classes.cardContent}>
                    <Img src={i2}/>
                  </div>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Image5
                    </Typography>
                    <Typography>
                      Image5 Description
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Edit
                    </Button>
                  </CardActions>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                  {/* CARD #6  */}
                  <Card className={classes.card}>
                    <div className={classes.cardContent}>
                      <Img src={i3}/>
                    </div>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Image6
                    </Typography>
                    <Typography>
                      Image6 Description
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Edit
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