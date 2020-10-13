import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import Card, {CardPrimaryContent,} from "@material/react-card";
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        // height: '100vh',
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        margin: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    large: {
        // paddingRight: 50,
        width: theme.spacing(5),
        height: theme.spacing(6),
    },
    googlePay: {
        width: theme.spacing(40),
        height: theme.spacing(7),
        marginLeft: theme.spacing(5)
    },

}));

export default function SignInSide() {
    const classes = useStyles();

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={12} sm={8} md={6}
             container
             direction="column"
             justify="center"
            component={Paper} elevation={0} square>
                <div className={classes.paper}>
                    <List className={classes.root}>
                        <ListItem>
                            <ListItemAvatar>
                                <img alt="Saya" src="https://cdn.glitch.com/626f96b5-637f-400b-81d5-95ad39bd83e2%2FScan.png?v=1602396872789" className={classes.large} />
                            </ListItemAvatar>
                            <ListItemText primary={<Typography variant="caption" style={{ fontSize: '25px', fontWeight: "", fontFamily: "" }}>Scan Prescription</Typography>} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemAvatar>
                                <img alt="Saya" src="https://cdn.glitch.com/626f96b5-637f-400b-81d5-95ad39bd83e2%2Fweb_saya_icon%202.png?v=1602396902766" className={classes.large} />
                            </ListItemAvatar>
                            <ListItemText primary={<Typography variant="h5" style={{ fontSize: '25px', fontWeight: "" }}>Shop Medicine</Typography>} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemAvatar>
                                <img alt="Saya" src="https://cdn.glitch.com/626f96b5-637f-400b-81d5-95ad39bd83e2%2Fweb_saya_icon%203.png?v=1602396912769" className={classes.large} />
                            </ListItemAvatar>
                            <ListItemText primary={<Typography variant="h5" style={{ fontSize: '25px', fontWeight: "" }}>Request Delivery</Typography>} />
                        </ListItem>
                        <Divider />

                        <ListItem>
                            <ListItemAvatar>
                                <img alt="Saya" src="https://cdn.glitch.com/626f96b5-637f-400b-81d5-95ad39bd83e2%2Fweb_saya_icon%204.png?v=1602396916800" className={classes.large} />
                            </ListItemAvatar>
                            <ListItemText primary={<Typography variant="h5" style={{ fontSize: '25px', fontWeight: "" }}>Request Medicine</Typography>} />
                        </ListItem>
                    </List>
                </div>
                <div className={classes.paper}>
                    <List>
                        <ListItem>
                            <img alt="Saya" src="https://cdn.glitch.com/626f96b5-637f-400b-81d5-95ad39bd83e2%2FWhatsApp%20Image%202020-10-11%20at%201.18.02%20PM.jpeg?v=1602403480020" className={classes.googlePay} />
                        </ListItem>
                    </List>
                </div>
            </Grid>
            <Grid item xs={12} sm={8} md={6} container
                    spacing={0}
                    >
                    <Card>
                        <CardPrimaryContent>
                            <img style={{width:400}} alt="Saya" src="https://cdn.glitch.com/626f96b5-637f-400b-81d5-95ad39bd83e2%2FSaya%20website%20phone%20mockup.png?v=1602396862111"  />                        
                        </CardPrimaryContent>
                    </Card>
            </Grid>
        </Grid>
    );
}