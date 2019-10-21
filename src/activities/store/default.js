import React, {Component} from "react";
import StoreContext from "./StoreContext"
import withStyles from "@material-ui/core/styles/withStyles";
import {Link} from "react-router-dom";
import {ChevronRight} from "@material-ui/icons"
import {Button, Grid, Paper} from "@material-ui/core"

import OrderAnalytics from "./components/Chart"
import Typography from "@material-ui/core/Typography";

let styles = theme => ({
    xMargin: {
        margin: "0px 8px"
    },
    jumboArea: {
        height: 300,
        size:"center",
        position:"cover",
        background: "linear-gradient(blue, white)",
        backgroundImage:'url(https://t3.ftcdn.net/jpg/02/82/76/62/240_F_282766220_lf6nfwH2oKwiMhtqYPXEt8LQjkh9hdDJ.jpg)'
    },
    itemContent: {
        position: "relative",
        background: "white"
    },
    contentHints: {
        width: "100%",
        bottom: "0",
        position: "absolute",
        padding: "8px 0px"
    },
    itemContainer: {
        padding: 12
    },
    equalBox: {
        paddingTop: "70%",
        position: "relative"
    },
    itemsContainer: {
        margin: "16px 0",
        [theme.breakpoints.up("md")]: {
            justifyContent: "center"
        },
        [theme.breakpoints.only("sm")]: {
            justifyContent: "flex-start",
            padding: "0px 0px"
        },
        [theme.breakpoints.down("xs")]: {
            justifyContent: "center"
        }
    }
});

function CoreComponentBox(props) {
    let {classes, to, details} = props;
    return (
        <Grid item xs={11} sm={6} md={4}>
            <Paper style={{overflow:"hidden"}}>
                <div className={classes.itemContent}>
                    <div className={classes.equalBox}>
                        <div style={{
                            width: "100%",
                            height: "100%",
                            position: "absolute",
                            left: 0,
                            top: 0,
                            backgroundImage: "url()"
                        }}>
                            <div style={{padding:16}}>
                                <Typography className={classes.contentHints}>
                                    Brief details should stay here
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={""} style={{padding: 12, background: "rgba(240,240,240,.9)"}}>
                    <Button color={"primary"} component={Link} to={to}>
                        Open
                        <ChevronRight className={classes.xMargin}/>
                    </Button>
                </div>
            </Paper>

        </Grid>
    )
}

class App extends Component {

    constructor(props) {
        super(props);
    }

    static contextType = StoreContext;

    state = {
        menuOpen: true
    };

    componentDidMount() {

    }

    render() {
        let {classes} = this.props;
        let storeId = this.context.store.id;
        return (
            <React.Fragment>
                <Grid container justify={'center'}>

                    <Grid item xs={12}>
                        <div className={classes.jumboArea}>

                        </div>
                    </Grid>

                    <Grid item xs={12} sm={11} md={10}>
                        <Grid container justify={"center"} className={classes.itemsContainer} spacing={8}>

                            <CoreComponentBox classes={classes} to={`/products`} details={"detail"}/>
                            <CoreComponentBox classes={classes} to={`/customers`} details={"detail"}/>
                            <CoreComponentBox classes={classes} to={`/transactions`} details={"detail"}/>

                        </Grid>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(App);


