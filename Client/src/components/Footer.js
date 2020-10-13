import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';


import React from 'react'

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Saya  © '}
        <Link color="inherit" href="https://play.google.com/store/apps/details?id=com.saya.services">
            Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

const useStyles = makeStyles((theme) => ({
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
  }));

export default function Footer() {
    const classes = useStyles();
    return (
        <React.Fragment>
        {/* Footer */}
        < footer className={classes.footer} >
            <Typography variant="h6" align="center" gutterBottom>
            Thank you 😊 
            </Typography>
            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                Please call us at +91-7876701221 for more info, send a mail to contact@saya.net.in, or download the android app!
             </Typography>
            <Copyright />
        </footer >
        {/* End footer */}
    </React.Fragment>
    )
}
