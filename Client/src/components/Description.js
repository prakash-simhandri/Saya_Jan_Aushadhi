import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import Card, { CardPrimaryContent, } from "@material/react-card";

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    textContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 0, 0),
    },
    SecondtextContent:{
        padding: theme.spacing(0, 0, 3),
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


export default function Description() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <main className={classes.root}>
                <div className={classes.textContent}>
                    <Container maxWidth="md">
                        <Typography align="center" variant="h5" paragraph>
                            Now get medicine at your door step through
                        </Typography>
                        <Typography style={{ fontWeight: "bold", color: "#6E7999", fontStyle: "italic" }} display="block" variant="h4" align="center" gutterBottom>
                            SAYA MEDICINE DELIVERY SYSTEM
            </Typography>
                        <Typography variant="h5" align="center" paragraph>
                            In Himchal Pradesh and save upto 70%
                        </Typography>
                    </Container>
                </div>


                <Container maxWidth="md" >
                    {/* End hero unit */}
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
                                        <a href="https://play.google.com/store/apps/details?id=com.saya.services" alt="APP" target="_blank" style={{cursor:"pointer"}}>
                                        <img alt="Saya" src="https://cdn.glitch.com/626f96b5-637f-400b-81d5-95ad39bd83e2%2FWhatsApp%20Image%202020-10-11%20at%201.18.02%20PM.jpeg?v=1602403480020" className={classes.googlePay} />
                                        </a>
                                    </ListItem>
                                </List>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={8} md={6} container
                            spacing={0}
                        >
                            <Card>
                                <CardPrimaryContent>
                                    <img style={{ width: 400 }} alt="Saya" src="https://cdn.glitch.com/626f96b5-637f-400b-81d5-95ad39bd83e2%2FSaya%20website%20phone%20mockup.png?v=1602396862111" />
                                </CardPrimaryContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>

                <div className={classes.SecondtextContent}>
                    <Container maxWidth="md">
                        <Typography variant="body1" gutterBottom align="center" paragraph>
                           Saya is a local delivery system that partners with you local chemists
                                            to both save you time and money.
                        </Typography>
                        <Typography variant="body1" gutterBottom align="center" paragraph>
                           We suggest you Jan Aushadhi alternatives so if you feel secure about government
                                sanctioned/NABL tested generics-you can get those instead-
                                    saving you upto 90% on the cost of the medicine.
                        </Typography>
                    </Container>
                </div>

            </main>
        </React.Fragment>
    );
}