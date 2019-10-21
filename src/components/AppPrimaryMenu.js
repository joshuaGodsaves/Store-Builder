import React, {Component} from "react";
import Toolbar from "@material-ui/core/Toolbar";
import {AppBar, Avatar, Grid, IconButton, Menu, MenuItem, Divider, Typography, ButtonBase, Button, StepButton} from "@material-ui/core";
import Link from "react-router-dom/Link"
import withStyles from "@material-ui/core/styles/withStyles";
import {Link as LinkIcon, Menu as MenuIcon, Notifications, Store} from "@material-ui/icons";
import axios from "axios"
import AppContext from "../AppContext";
import {APIURL} from './../DataSource';

let styles = theme => ({
    toggler: {
        [theme.breakpoints.up('sm')]: {
            display: "none"
        },
        [theme.breakpoints.down('sm')]: {
            display: "block"
        }
    },
    rootMenu: {
        background: "ghostwhite",
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

    static contextType = AppContext;

    state = {
        anchorEl: undefined,
        contextMenu: undefined,
        activeStore: "Store Name",
        storesInputLabelWidth: 0,
        stores: [],
        selectedStore: "Store"
    };
    selectStoreTrigger = (e) => {
        e.persist();
        this.setState({storeListElTrigger: e.target})
    };

    closeStoresListTrigger = (e) => {
        e.persist();
        this.setState({storeListElTrigger: null})
    };

    selectStore = (storeId) => {
        return () => {
            this.setState({selectedStore: storeId});
            this.closeStoresListTrigger()
        }
    };

    componentWillMount() {
        let email = this.context.user.email;
        axios.get(`${APIURL}/user/${email}/stores`).then(v => {
            this.setState({stores: v.data})
        }).catch(v => {
            console.log(v)
        })
    }

    openMenu = (event) => {
        event.persist();
        this.setState({anchorEl: event.target})
    };

    closeMenu = () => {
        this.setState({anchorEl: null})
    };


    toggleDrawer= ()=>{

    };

    loginHandler = ()=>{
        window.location.replace("/login");
        this.closeMenu()
    }
    render() {
        let {classes} = this.props;
        let {storeListElTrigger} = this.state;
        let {anchorEl, activeProduct} = this.state;
        let userMenu = (
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} id="simple-menu" onClose={this.closeMenu}
                  style={{zIndex: 100000}}>
                <MenuItem component={Link} to={"/"} divider>Profile</MenuItem>
                <MenuItem component={Link} to={"/"}>Shuttdown</MenuItem>
                <MenuItem component={Link} to={"/settings"}>Settings</MenuItem>
                <MenuItem onClick={this.loginHandler} >Logout</MenuItem>
            </Menu>
        );

        let {drawerOpener} = this.props;

        return (
           <div>
                <AppBar style={{zIndex: 2000, background:"white"}} elevation={2} className={classes.rootMenu}>
                {userMenu}
                <Toolbar
                    style={{display: "flex", alignItems: "center", justifyContent: "space-between", color: "white"}}>
                    <Grid container justify={"space-between"} alignItems={"center"}>
                        <Grid item>
                            <IconButton onClick={drawerOpener} className={classes.toggler}>
                                <MenuIcon/>
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <Grid container alignItems={"center"}>

                                <Grid item style={{margin:"0px 4px"}}>
                                    <Typography>Live</Typography>
                                </Grid>
                                <Grid item>
                                    <Button color={"primary"}>
                                        <LinkIcon/>
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <IconButton  color={"primary"}>
                                        <Notifications/>
                                    </IconButton>
                                </Grid>
                                <Grid item>
                                    <Avatar color={"primary"}  style={{marginLeft: 12, color: "ghostwhite"}} onClick={this.openMenu}/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Toolbar>
                <Divider color={"primary"}/>
            </AppBar>
            </div>

        );
    }
}

export default withStyles(styles)(App);
