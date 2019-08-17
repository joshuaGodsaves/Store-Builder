import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Grid, Typography, AppBar, Toolbar, Drawer, ButtonBase, List, Paper } from "@material-ui/core"
import defaultUserActivity from "./default"
import storeActivity from "./stores"
import { Switch, Link, Route } from "react-router-dom";
import UserMenuList from "./components/menu"
import PrimaryMenu from "../../components/AppPrimaryMenu"
import AppDrawer from "../../components/AppDrawer"
import AppContentArea from "../../components/AppContentArea"
let drawerWidth = 225;

let styles = theme => ({

    container: {
        margin: "0px",
        [theme.breakpoints.between("sm", "xl")]: {
            width: `calc( 100% - ${drawerWidth}px )`,
            marginLeft: `${drawerWidth}px`
        },
        [theme.breakpoints.between("xs", "sm")]: {
            marginLeft: '0px',
            width: "100%"
        }
    }
});

class App extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        menuOpen: false,
        activateToggleMenuButton: false
    }

    openUserMenu = () => {
        this.setState({ menuOpen: !this.state.menuOpen })
    }
    closeMenu = () => (this.setState({ menuOpen: false }))

    render() {
        let { classes } = this.props
        let { drawerPaper, drawerPaperOpen } = classes
        let { menuOpen } = this.state
        return (
            <React.Fragment>
                <PrimaryMenu triggerMenuClick={this.openUserMenu} />
                <AppDrawer>
                    <UserMenuList>
                    </UserMenuList>
                </AppDrawer>
                <AppContentArea className={classes.container} >
                    <Grid container>
                        <Grid item xs={12} sm={12} md={12}>
                            <Switch>
                                <Route path={"/"} exact component={defaultUserActivity} />
                                <Route path={"/list-stores"} exact component={storeActivity} />
                            </Switch>
                        </Grid>
                    </Grid>
                </AppContentArea>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(App);


