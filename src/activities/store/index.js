import React, {Component} from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import {Grid, Typography, AppBar, Toolbar, Drawer, ButtonBase, List, Paper} from "@material-ui/core"
import {Switch, Link, Route} from "react-router-dom";
import StorePrimaryMenu from "./components/menu"
import PrimaryMenu from "../../components/AppPrimaryMenu"
import defaultStorePage from "./default"
import StoreContext from "./StoreContext"
import productIndex from "./Product/Index"
import orderIndex from "./Order/Index"
import sectionIndex from "./Section/Index"
import categoryIndex from "./Category/Index"
import customerIndex from "./Customer/Index"
import settings from "./Settings"

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
        menuOpen: false
    }

    openUserMenu = ()=>{
        this.setState({menuOpen: !this.state.menuOpen})
    }
    closeMenu= ()=>(this.setState({menuOpen: false}))

    componentWillMount() {
        let {match: {params}} = this.props
        this.setState({activeStore: params.store})
    }

    render() {
        let {classes}= this.props
        let {menuOpen}= this.state
        let {drawerPaper, drawerPaperOpen}= classes
        return (
            <StoreContext.Provider value={{store: {id: this.state.activeStore, token:"undefined"}}}>
                <PrimaryMenu triggerMenuClick={ this.openUserMenu }/>
                <AppBar position={"relative"} style={{zIndex:0}}><Toolbar></Toolbar></AppBar>
                <Drawer open={menuOpen} style={{}} classes={{paper: menuOpen === true ? drawerPaperOpen : drawerPaper}}
                        variant={"permanent"}
                        onClose={this.closeMenu}
                >
                    <Toolbar/>
                    <StorePrimaryMenu store={this.state.activeStore}>
                    </StorePrimaryMenu>
                </Drawer>
                    <div className={classes.container}>
                        <Grid container justify={"center"}>
                            <Grid item xs={12} sm={12} md={12} style={{padding:"12px 12px"}}>
                                <Switch>
                                    <Route path={`/stores/${this.state.activeStore}`} exact  component={defaultStorePage}/>
                                    <Route path={`/stores/${this.state.activeStore}/products` }   component={productIndex}/>
                                    <Route path={`/stores/${this.state.activeStore}/orders` }   component={orderIndex}/>
                                    <Route path={`/stores/${this.state.activeStore}/categories` }   component={categoryIndex}/>
                                    <Route path={`/stores/${this.state.activeStore}/customers` }   component={customerIndex}/>
                                    <Route path={`/stores/${this.state.activeStore}/sections` }   component={sectionIndex}/>
                                    <Route path={`/stores/${this.state.activeStore}/settings` }   component={settings}/>
                                </Switch>
                            </Grid>
                        </Grid>
                    </div>
            </StoreContext.Provider>

        );
    }
}

export default withStyles(styles)(App);


