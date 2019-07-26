import React, {Component} from "react";
import Toolbar from "@material-ui/core/Toolbar";
import {AppBar, IconButton, Menu, MenuItem, 
    Button, Avatar, Grid, InputBase,Paper,  Switch, Typography} from "@material-ui/core";
import Link from "react-router-dom/Link"
import withStyles from "@material-ui/core/styles/withStyles";
import {Menu as MenuIcon, MoreHoriz, Search, Notifications} from "@material-ui/icons";
import axios from "axios"
import AppContext from "../AppContext";
import { APIURL } from './../DataSource';
let styles = theme => ({
    rootMenuMobile:{
        [theme.breakpoints.up("sm")]:{
            display: "none"
        },
        [theme.breakpoints.down("sm")]:{
            display: "block"
        },
    },
    mobileHidden:{
        [theme.breakpoints.down("sm")]:{
            display:"none"
        }
    }
});

class App extends Component {
    constructor(props) {
        super(props);
    }

    static contextType= AppContext

    state={
        anchorEl: undefined,
        contextMenu:undefined,
        activeStore: "Store Name",
        storesInputLabelWidth: 0,
        stores: [],
        selectedStore: "Store"
    }
    selectStoreTrigger= (e)=>{
        e.persist()
        this.setState({storeListElTrigger: e.target})
    }

    closeStoresListTrigger= (e)=>{
        e.persist()
        this.setState({storeListElTrigger: null})
    }

    selectStore= (storeId)=>{
        return ()=>{
            this.setState({selectedStore: storeId})
            this.closeStoresListTrigger()
        }
    }

    componentWillMount() {
        let email= this.context.user.email
        axios.get(`${APIURL}/user/${email}/stores`).then(v=>{
            this.setState({stores: v.data})
        }).catch(v=>{
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
        let { classes } = this.props;
        let {storeListElTrigger}= this.state

        let {anchorEl, activeProduct} = this.state
        let userMenu = (
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} id="simple-menu" onClose={this.closeMenu}
            style={{zIndex:100000}}>
                 <MenuItem component={Link} to={"/"}>home</MenuItem>
              <MenuItem onClick={this.closeMenu}
                        component={Link} to={"/login"}>logout</MenuItem>
            </Menu>
        )
        
        return (
                    <AppBar style={{zIndex:2000}} elevation={0}>
                         {userMenu}
                        <Toolbar 
                        style={{display:"flex", alignItems:"center", justifyContent:"space-between", color:"white"}}>
                            <Grid container justify={"space-between"} alignItems={"center"}>
                                <Grid sm={2} item>
                                    <IconButton onClick={this.props.triggerMenuClick} color={"inherit"}>
                                        <MenuIcon/>
                                    </IconButton>
                                </Grid>
                                <Grid item xs={2} sm={3} md={5}>
                                    <Paper style={{padding:"4px 8px", background:"rgba(0,0,0,0.5)"}} elevation={0}>
                                        <InputBase style={{width:"100%", color:"white"}} startAdornment={<Search/>} color={"inherit"}/>
                                    </Paper>
                                </Grid>
                                <Grid item sm={2} lg={4}>
                                    <div style={{display:"flex", justifyContent:"flex-end",alignItems:"center"}}>
                                        <Switch  className={classes.mobileHidden}/>
                                        <IconButton color={"inherit"} className={classes.mobileHidden}>
                                            <Notifications/>
                                        </IconButton>
                                        <Typography className={classes.mobileHidden}>
                                            User Email
                                        </Typography>
                                        <Avatar style={{margin:"0px 8px"}} onClick={this.openMenu}/>
                                        <IconButton className={classes.rootMenuMobile}>
                                            <MoreHoriz/>
                                        </IconButton>
                                    </div>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar>

        );
    }
}

export default withStyles(styles)(App);
