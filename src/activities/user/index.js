import React, {Component} from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import {Grid, Typography, AppBar, Toolbar, Drawer, ButtonBase, List, Paper} from "@material-ui/core"
import defaultUserActivity from "./default"
import storeActivity from "./stores"
import {Switch, Link, Route} from "react-router-dom";
import UserMenuList from "./components/menu"
import PrimaryMenu from "../../components/AppPrimaryMenu"
import {VerifiedUserOutlined,  SupervisedUserCircle} from "@material-ui/icons";

let drawerWidth = 225;

let styles = theme => ({
    drawerPaper: {
        width:drawerWidth,
        [theme.breakpoints.up("sm")]:{
            width: `calc( ${drawerWidth}px)`
        },
        [theme.breakpoints.down("sm")]:{
            width: 0
         }
    },
    drawerPaperOpen:{
        width: drawerWidth
    },
    container:{
        margin:"0px",
        [theme.breakpoints.between("sm","xl")]:{
            width: `calc( 100% - ${drawerWidth}px )`,
            marginLeft: `${drawerWidth}px`
        },
        [theme.breakpoints.between("xs", "sm")]:{
            marginLeft: '0px',
            width:"100%"
        }
    }
});

class App extends Component {

    constructor(props) {
        super(props);
    }

    state={
        menuOpen: false,
        activateToggleMenuButton: false
    }

    openUserMenu = ()=>{
        this.setState({menuOpen: !this.state.menuOpen})
    }
    closeMenu= ()=>(this.setState({menuOpen: false}))

    render() {
        let {classes}= this.props
        let {drawerPaper, drawerPaperOpen} = classes
        let {menuOpen}= this.state
        return (
            <React.Fragment>
                <PrimaryMenu triggerMenuClick={ this.openUserMenu }/>
                <AppBar position={"relative"} style={{zIndex:0}}><Toolbar></Toolbar></AppBar>
                <Drawer open={menuOpen} style={{}} classes={{paper: menuOpen === true ? drawerPaperOpen : drawerPaper}}
                        variant={"permanent"}
                        onClose={this.closeMenu}
                >
                    <Toolbar/>
                    <UserMenuList>
                    </UserMenuList>
                </Drawer>
                <div className={classes.container} >
                    <Grid container justify={"center"} >
                        <Grid item xs={12} sm={12} md={12} style={{padding:"12px 12px"}}>
                            <Switch>
                                <Route path={"/" }  exact component={defaultUserActivity}/>
                                <Route path={"/list-stores" } exact component={storeActivity}/>
                            </Switch>
                        </Grid>
                    </Grid>
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(App);


