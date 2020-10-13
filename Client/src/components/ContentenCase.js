import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import CardContent from '@material-ui/core/CardContent';
import { Grid } from '@material-ui/core/';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Swal from 'sweetalert2';
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#63798E"
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        alignItems: 'center',
    },
    column: {
        flexBasis: '53.33%',
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: theme.spacing(0, 1, 2),
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    CountButton: {
        minWidth: '0px',
        minHeight: '0px',
        borderWidth: "1px",
        borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function DetailedAccordion(props) {
    const classes = useStyles();
    const [counter, setcounter] = React.useState(1)
    const [results, setResults] = React.useState([])

    const handleIncrement = () => {
        setcounter(counter + 1)
    };

    const handleDecrement = () => {
        setcounter(counter - 1)
    };
    const displayCounter = counter > 0;
    React.useEffect(() => {
        console.log(props.searchProps, "____________________-----------------------___________");
        if (!Object.keys(props.searchProps).includes("Error")) {
            setResults(props.searchProps);

        }else{
            Swal.fire({
                icon: 'warning',
                background: 'rgba(0,0,0,0) linear-gradient(#444,#111) repeat scroll 0 0',
                title: 'Oops...',
                text: props.searchProps.Error
              })
        }
    });
    return (
        <>
            {results.map((data,i) => (
            <div className={classes.root}>
                <CardContent>
                    <Accordion style={{
                        margin: 'auto',
                        maxWidth: 600,
                    }} defaultExpanded>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1c-content"
                            id="panel1c-header"
                        >
                            <Grid container spacing={10}>
                                <Grid item xs={6}>
                                    <Typography className={classes.heading}>Branded Medicine</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography className={classes.secondaryHeading}>Jan Aushadhi Medicine</Typography>
                                </Grid>
                            </Grid>
                        </AccordionSummary>
                        <Divider />

                        <AccordionDetails className={classes.details}>
                            <div className={classes.column}>
                                <Grid container spacing={6}>
                                    <Grid item xs={6}>
                                        <Typography variant="h6" display="block" gutterBottom>{data.NameID}</Typography>
                                        <Typography variant="body2" gutterBottom>{data.Composition}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <ButtonGroup size="small" aria-label="small outlined button group">
                                            <Button className={classes.CountButton} onClick={handleIncrement}>+</Button>
                                            {displayCounter && <Button className={classes.CountButton} disabled>{counter}</Button>}
                                            {displayCounter && <Button className={classes.CountButton} onClick={handleDecrement}>-</Button>}
                                        </ButtonGroup>
                                        <Typography variant="subtitle1">Rs {parseInt(data.Price,10)*counter}</Typography>
                                    </Grid>
                                </Grid>
                            </div>
                            <div className={clsx(classes.column, classes.helper)}>
                                <Typography variant="subtitle2" display="block" gutterBottom>{data.Database_Comp}</Typography>
                                <Grid container
                                    direction="row"
                                    justify="space-between"
                                    alignItems="flex-end"
                                    spacing={6}>
                                    <Grid item xs={6}>
                                    <Typography className={classes.secondaryHeading} display="block" gutterBottom>Pkt: {parseInt(data.Packet,10)*counter}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                    <Typography className={classes.secondaryHeading} variant="subtitle1">Rs {parseInt(data.MRP,10)*counter}</Typography>
                                    </Grid>
                                </Grid>
                                <Divider />

                                {/* <Typography variant="subtitle2" display="block" gutterBottom>acetaminophen</Typography>
                                <Grid container
                                    direction="row"
                                    justify="space-between"
                                    alignItems="flex-end"
                                    spacing={6}>
                                    <Grid item xs={6}>
                                        <Typography className={classes.secondaryHeading} display="block" gutterBottom>35g</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography className={classes.secondaryHeading} variant="subtitle1">Rs 30</Typography>
                                    </Grid>
                                </Grid>
                                <Divider /> */}

                            </div>
                        </AccordionDetails>
                        <Divider />
                        <AccordionActions>
                            <Grid container spacing={3}>
                                <Grid item xs>
                                    <Paper></Paper>
                                </Grid>
                                <Grid item xs>
                                    <Typography style={{}} className={classes.secondaryHeading, classes.details} variant="subtitle1">You save Rs.{(parseInt(data.Price,10)*counter)-(parseInt(data.MRP,10)*counter)}</Typography>
                                </Grid>
                                <Grid item xs>
                                    <Paper className={clsx(classes.paper)}>Total : Rs {parseInt(data.MRP,10)*counter}</Paper>
                                </Grid>
                            </Grid>
                        </AccordionActions>


                    </Accordion>
                </CardContent>
            </div>
             ))}
        </>
    );
}
