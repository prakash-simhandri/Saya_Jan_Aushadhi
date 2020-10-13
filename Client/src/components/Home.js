import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import DetailedAccordion from './ContentenCase';



import {
    createMuiTheme, MuiThemeProvider, responsiveFontSizes,
} from '@material-ui/core/styles';
import {
    AppBar, Toolbar, Typography, List, ListItem,
    withStyles, Grid, SwipeableDrawer
} from '@material-ui/core/';
import MenuIcon from '@material-ui/icons/Menu';
import Axios from "axios";

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

const styleSheet = (theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    list: {
        width: 200,
    },
    padding: {
        paddingRight: 50,
        cursor: "pointer",
        fontSize: "0.90rem"
    },

    sideBarIcon: {
        padding: 0,
        color: "white",
        cursor: "pointer",
    },
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
    Navbar: {
        margin: "auto",
        marginTop: 15,
    },
    cardColor: {
        backgroundColor: "#63798E"
    },
    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: 12,
    },
    SearchButton: {
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },
    notchedOutline: {
        borderWidth: "1px",
        borderColor: "yellow !important",
        borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20,
    },
    main: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2),
    },
    cardHeader: {
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
    },
    cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(3),
        // textAlign: 'center',
        color: theme.palette.text.secondary,
    },
})

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerActivate: false,
            drawer: false,
            open: false,
            options: [],
            medicineName: "",
            userDemand: "",
            serachMedicine:""
        };
        this.createDrawer = this.createDrawer.bind(this);
        this.destroyDrawer = this.destroyDrawer.bind(this);
    }

    componentWillMount() {
        if (window.innerWidth <= 600) {
            this.setState({ drawerActivate: true });
        }

        window.addEventListener('resize', () => {
            if (window.innerWidth <= 600) {
                this.setState({ drawerActivate: true });
            }
            else {
                this.setState({ drawerActivate: false })
            }
        });
    }
    loading() {
        return this.state.open && this.state.options.length === 0
    }
    componentDidUpdate() {
        let active = true;
        if (!this.loading()) {
            return undefined;
        }
        (async () => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    demand: this.state.userDemand,
                })
            };
            const response = await fetch('http://localhost:3020/medicine/names', requestOptions);

            await sleep(1e3); // For demo purposes.
            const allMedicineName = await response.json();
            if (active) {
                const setOptionsData = allMedicineName.data
                this.setState({
                    options: setOptionsData
                });
            }
        })();
    }
    handleSubmit() {
        if (this.state.medicineName.length) {
            Axios.post("http://localhost:3020/medicine/details", { "userchoice": this.state.medicineName })
                .then((response) => {
                    // console.log(response.data, "This is repone data from backend");
                    this.setState({
                        serachMedicine:response.data,
                    })
                }).catch((reject) => {
                    console.log(reject);
                })
        }
    }

    //Small Screens
    createDrawer() {
        const { classes } = this.props
        return (
            <div>
                <AppBar className={classes.cardColor}>
                    <Toolbar>
                        <Grid container direction="row" justify="space-between" alignItems="center">
                            <MenuIcon
                                className={classes.sideBarIcon}
                                onClick={() => { this.setState({ drawer: true }) }} />

                            <Typography color="inherit" variant="headline">Saya</Typography>
                            <Typography color="inherit" variant="headline"></Typography>
                        </Grid>
                    </Toolbar>
                </AppBar>

                <SwipeableDrawer
                    open={this.state.drawer}
                    onClose={() => { this.setState({ drawer: false }) }}
                    onOpen={() => { this.setState({ drawer: true }) }}>

                    <div
                        tabIndex={0}
                        role="button"
                        onClick={() => { this.setState({ drawer: false }) }}
                        onKeyDown={() => { this.setState({ drawer: false }) }}>

                        <List className={classes.list}>
                            <ListItem key={1} button divider> Option 1 </ListItem>
                            <ListItem key={2} button divider> Option 2 </ListItem>
                            <ListItem key={3} button divider> Option 3 </ListItem>
                            <ListItem key={4} button divider> Option 4 </ListItem>
                            <ListItem key={5} button divider> Option 5 </ListItem>
                            <ListItem key={6} button divider> Option 6 </ListItem>
                        </List>

                    </div>
                </SwipeableDrawer>

            </div>
        );
    }

    //Larger Screens
    destroyDrawer() {
        const { classes } = this.props
        return (
            <div>
                <AppBar  elevation={0} className={classes.cardColor}>
                    <Toolbar className={classes.Navbar}>
                        <Typography variant="subheading" className={classes.padding} color="inherit" ><Avatar alt="Saya" src="https://cdn.glitch.com/626f96b5-637f-400b-81d5-95ad39bd83e2%2FSaya%20logo%201080%20p.img?v=1602064206735" className={classes.large} /></Typography>
                        <Typography variant="subheading" className={classes.padding} color="inherit" >HOME</Typography>
                        <Typography variant="subheading" className={classes.padding} color="inherit" >SERVICES</Typography>
                        <Typography variant="subheading" className={classes.padding} color="inherit" >PORTFOLIO</Typography>
                        <Typography variant="subheading" className={classes.padding} color="inherit" >PRICING</Typography>
                        <Typography variant="subheading" className={classes.padding} color="inherit" >ABOUT</Typography>
                        <Typography variant="subheading" className={classes.padding} color="inherit" > <Button style={{ borderRadius: 50 }} variant="contained" color="secondary">
                            BLOG
                    </Button></Typography>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }

    SearchBox() {
        let theme = createMuiTheme();
        theme = responsiveFontSizes(theme);
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                >
                    <CardContent>
                        <Typography style={{fontWeight:"bold", color:"white"}} variant="h5" component="h2">
                            Compare medicine prices
                    </Typography>
                        <Typography style={{fontWeight:"bold",color:"white"}} variant="h5" component="h2">
                            Branded VS Jan Aushadhi
                </Typography>
                    </CardContent>
                </Grid >
                <Grid
                    container
                    alignItems="center"
                    justify="center"
                    spacing={0}>
                    <Grid xs={0}>
                        <Autocomplete
                            size="small"
                            id="asynchronous-demo"
                            style={{ width: 290, backgroundColor: "white", borderBottomLeftRadius: 20, borderTopLeftRadius: 20 }}
                            open={this.state.open}
                            onClose={() => {
                                this.setState({
                                    open: false
                                });
                            }}
                            getOptionSelected={(option, value) => option.NameID === value.NameID}
                            getOptionLabel={(option) => option.NameID}
                            options={this.state.options}
                            loading={this.loading()}
                            renderInput={(params) => (
                                <TextField
                                    placeholder="search for your medicines here :)"
                                    {...params}
                                    variant="outlined"
                                    onChange={(e) => { this.openFuntion(e.target.value) }}
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (

                                            <React.Fragment>
                                                {this.loading() ? (
                                                    <CircularProgress color="inherit" size={20} />
                                                ) : null}
                                            </React.Fragment>

                                        ),
                                        classes: {
                                            notchedOutline: classes.notchedOutline
                                        }
                                    }}
                                />
                            )}
                            onChange={(e, newValue) => {
                                if (newValue !== null) {
                                    this.setState({
                                        medicineName: newValue.NameID
                                    })
                                }
                            }}
                        />
                    </Grid>
                    <Grid xs={0}>
                        <label htmlFor="contained-button-file">
                            <Button size="large" variant="contained" className={classes.SearchButton} color="secondary" component="span"
                                onClick={() => { this.handleSubmit() }}>
                                search
                        </Button>
                        </label>
                    </Grid>

                </Grid>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                >
                    <Grid item xs={12}>
                        <CardContent>
                            <MuiThemeProvider theme={theme}>
                                <Typography style={{color:"#eceff1"}} variant="subtitle1" gutterBottom>you can save 70% on your medicine every month</Typography>
                            </MuiThemeProvider>
                        </CardContent>
                    </Grid>
                </Grid>
            </div >

        )
    }

    openFuntion = (eValue) => {
        if (eValue.length === 4) {
            this.setState({
                open: true,
                userDemand: eValue,
            })
        }
        if (eValue.length === 0) {
            this.setState({
                open: false,
                options: [],
                serachMedicine:""
            })
        }
    }

    render() {
        const { classes } = this.props

        return (
            <div className={classes.cardColor}>
                <AppBar elevation={0} className={classes.cardColor}   style={{ height: 90, position: 'relative' }}>
                    {this.state.drawerActivate ? this.createDrawer() : this.destroyDrawer()}
                </AppBar>

                {this.SearchBox()}
                {this.state.serachMedicine ? <DetailedAccordion searchProps ={this.state.serachMedicine}/> :null }
            </div>

        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired
};



export default withStyles(styleSheet)(Home);