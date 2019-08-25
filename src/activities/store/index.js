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

import CoreLayout from "../../components/CoreLayout"
import AppDrawer from "../../components/AppDrawer"
import AppContentArea from "../../components/AppContentArea"

import {VerifiedUserOutlined,  SupervisedUserCircle} from "@material-ui/icons";


let styles = theme => ({
    
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
      
            <StoreContext.Provider value={{ store: { id: this.state.activeStore, token: "undefined" } }}>

                <CoreLayout
                    drawerItems={
                        <StorePrimaryMenu store={this.state.activeStore}>
                        </StorePrimaryMenu>
                    }
                    content={
                        <Grid item xs={12} sm={12} md={12}>
                            <Switch>
                                <Route path={`/stores/${this.state.activeStore}`} exact component={defaultStorePage} />
                                <Route path={`/stores/${this.state.activeStore}/products`} component={productIndex} />
                                <Route path={`/stores/${this.state.activeStore}/orders`} component={orderIndex} />
                                <Route path={`/stores/${this.state.activeStore}/categories`} component={categoryIndex} />
                                <Route path={`/stores/${this.state.activeStore}/customers`} component={customerIndex} />
                                <Route path={`/stores/${this.state.activeStore}/sections`} component={sectionIndex} />
                                <Route path={`/stores/${this.state.activeStore}/settings`} component={settings} />
                            </Switch>
                        </Grid>
                    }
                />

            </StoreContext.Provider>

        );
    }
}

export default withStyles(styles)(App);


