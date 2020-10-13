import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.7)',
  },
  mainFeaturedPostContent: {
      textAlign:"center",
    position: 'relative',
    padding: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(5),
      paddingRight: 0,
    },
  },
}));

export default function MainFeaturedPost() {
  const classes = useStyles();

  return (
    <Paper className={classes.mainFeaturedPost} style={{ backgroundImage: `url(https://png.pngtree.com/thumb_back/fw800/back_our/20190621/ourmid/pngtree-medical-medicinal-gene-blue-poster-background-image_198185.jpg)` }}>
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none' }} src="https://png.pngtree.com/thumb_back/fw800/back_our/20190621/ourmid/pngtree-medical-medicinal-gene-blue-poster-background-image_198185.jpg" alt="'main image description'" />}
      <div className={classes.overlay} />
      <Grid container
        justify="center"
        spacing={0}>
        <Grid item xs={8} >
          <Grid className={classes.mainFeaturedPostContent}>
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
            What is Jan Aushadi?
            </Typography>
            <Typography variant="subtitle1" color="inherit" paragraph>
            India's only medicine delivery system that offers and 
            compares both Jan Aushadhi and Branded Medicine - allowing 
            you to save up to 80% on the price of medicine. Saya is dedicated
             to ensuring that affordable medicine reach everyone. We work with 
             local NGOs, local and state governments, chemists, jan-aushadhis, and 
             a host of other partners to ensure that Jan Aushadhi medicine is available 
             to everyone. The scheme Pradhan Mantri Jan Dhan Yojana was launched in 2013, 
             and covered only a few medicine. Now the medicine is utilized by hospitals & 
             NGOs all over India for its efficacy and affordability, and sold at over 5000+ Jan Aushadhi Kendras.
              Only quality double-tested medicine is given the name Jan Aushadhi.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

MainFeaturedPost.propTypes = {
  post: PropTypes.object,
};