import React, {Component} from "react";

import StoreContext from "./StoreContext"
import withStyles from "@material-ui/core/styles/withStyles";
import {Link} from "react-router-dom";
import {ChevronRight} from "@material-ui/icons"
import {Button, Grid} from "@material-ui/core"

import Context from "./StoreContext"

import OrderAnalytics from "./components/Chart"

let styles = theme => ({
    xMargin:{
        margin:"0px 8px"
    },
    jumboArea: {
        height: 400,
        background: "#404040"
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

function CoreComponentBox(props){
    let {classes, to, details} = props;
    return (
        <Grid item xs={11} sm={6} md={4} className={classes.itemContainer}>
        <div className={classes.itemContent}>
            <div className={classes.equalBox}>
                <div style={{ width: "100%", height: "100%", position: "absolute", left:0, top:0}}>
                    <div className={classes.contentHints}>
                        // Brief details should stay here
                    </div>
                </div>
            </div>
            <Button color={"primary"} component={Link}    to={to}>
                Open
                <ChevronRight className={classes.xMargin}/>
            </Button>
        </div>
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
                            <OrderAnalytics/>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={11} md={10}>
                        <Grid container justify={"center"} className={classes.itemsContainer}>
                          
                            <CoreComponentBox classes={classes} to={`/stores/${storeId}/products`} details={"detail"}/>
                            <CoreComponentBox classes={classes} to={`/stores/${storeId}/customers`} details={"detail"}/>
                            <CoreComponentBox classes={classes} to={`/stores/${storeId}/transactions`} details={"detail"}/>
                          
                        </Grid>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(App);


