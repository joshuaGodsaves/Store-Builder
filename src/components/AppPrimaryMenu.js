import React, {Component} from "react";
import Toolbar from "@material-ui/core/Toolbar";
import {
    AppBar, IconButton, Menu, MenuItem,
    Button, Avatar, Grid, InputBase, Paper, Switch, Typography
} from "@material-ui/core";
import Link from "react-router-dom/Link"
import withStyles from "@material-ui/core/styles/withStyles";
import {Menu as MenuIcon, MoreHoriz, Search, Notifications,StoreMallDirectory, Store, NotificationsNone} from "@material-ui/icons";
import axios from "axios"
import AppContext from "../AppContext";
import {APIURL} from './../DataSource';

let styles = theme => ({
    rootMenu: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - 225px)`,
            marginLeft: 225
        },
        [theme.breakpoints.down('sm')]: {
            width: `calc(100%)`,
            marginLeft: 0
        },
        width: "100%"
    }
});

class App extends Component {
    constructor(props) {
        super(props);
    }

    static contextType = AppContext

    state = {
        anchorEl: undefined,
        contextMenu: undefined,
        activeStore: "Store Name",
        storesInputLabelWidth: 0,
        stores: [],
        selectedStore: "Store"
    }
    selectStoreTrigger = (e) => {
        e.persist()
        this.setState({storeListElTrigger: e.target})
    }

    closeStoresListTrigger = (e) => {
        e.persist()
        this.setState({storeListElTrigger: null})
    }

    selectStore = (storeId) => {
        return () => {
            this.setState({selectedStore: storeId})
            this.closeStoresListTrigger()
        }
    }

    componentWillMount() {
        let email = this.context.user.email
        axios.get(`${APIURL}/user/${email}/stores`).then(v => {
            this.setState({stores: v.data})
        }).catch(v => {
            console.log(v)
        })
    }

    openMenu = (event) => {
        event.persist()
        this.setState({anchorEl: event.target})
    }

    closeMenu = () => {
        this.setState({anchorEl: null})
    }

    render() {
        let {classes} = this.props;
        let {storeListElTrigger} = this.state
        let {anchorEl, activeProduct} = this.state

        let userMenu = (
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} id="simple-menu" onClose={this.closeMenu}
                  style={{zIndex: 100000}}>
                <MenuItem component={Link} to={"/"}>Profile</MenuItem>
                <MenuItem component={Link} to={"/"}>Settings</MenuItem>
                <MenuItem onClick={this.closeMenu}
                          component={Link} to={"/login"}>Logout</MenuItem>
            </Menu>
        )

        return (
            <AppBar style={{zIndex: 2000}} elevation={0} className={classes.rootMenu}>
                {userMenu}
                <Toolbar
                    style={{display: "flex", alignItems: "center", justifyContent: "space-between", color: "white"}}>
                    <Grid container justify={"space-between"} alignItems={"center"}>
                        <Grid item>
                            <IconButton>
                                <MenuIcon/>
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <Grid container alignItems={"center"}>
                                <Grid item>
                                    <IconButton>
                                        <Notifications/>
                                    </IconButton>
                                </Grid>
                                <Grid item>
                                    <IconButton>
                                        <StoreMallDirectory/>
                                    </IconButton>
                                </Grid>
                                <Grid item>
                                    <Avatar sizes={"small"} style={{marginLeft:12}}/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>

        );
    }
}

export default withStyles(styles)(App);
