import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Grid } from "@material-ui/core"
import defaultUserActivity from "./default"
import storeActivity from "./stores"
import { Switch, Link, Route } from "react-router-dom";
import UserMenuList from "./components/menu"
import CoreLayout from "../../components/CoreLayout"


let styles = theme => ({
   
});

class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            
            <CoreLayout 
            drawerItems= {<UserMenuList></UserMenuList>}
            content= {
                <Grid container>
                        <Grid item xs={12} sm={12} md={12}>
                            <Switch>
                                <Route path={"/"} exact component={defaultUserActivity} />
                                <Route path={"/list-stores"} exact component={storeActivity} />
                            </Switch>
                        </Grid>
                    </Grid>
            }
            />
        );
    }
}

export default withStyles(styles)(App);


