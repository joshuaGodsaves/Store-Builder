import React, {Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {Grid} from "@material-ui/core"
import AppContext from "../../AppContext"
import {Route, Switch} from "react-router-dom";
import StorePrimaryMenu from "./components/menu"
import defaultStorePage from "./default"
import StoreContext from "./StoreContext"
import productIndex from "./Product/Index"
import orderIndex from "./Order/Index"
import sectionIndex from "./Section/Index"
import categoryIndex from "./Category/Index"
import customerIndex from "./Customer/Index"
import settings from "./Settings"

import CoreLayout from "../../components/CoreLayout"

let styles = theme => ({
    
});

class App extends Component {

    constructor(props) {
        super(props);
    }

    static contextType = AppContext;
    state={
        menuOpen: false
    };

    openUserMenu = ()=>{
        this.setState({menuOpen: !this.state.menuOpen})
    };

    closeMenu = () => (this.setState({menuOpen: false}));

    componentWillMount() {
        this.setState({activeStore: this.context.store.id})
    }

    render() {
        let {classes} = this.props;
        let {menuOpen} = this.state;
        let {drawerPaper, drawerPaperOpen} = classes;
        return (
            <StoreContext.Provider value={{store: {id: this.context.store.id, token: "undefined"}}}>
                <CoreLayout

                    drawerItems={
                        <StorePrimaryMenu store={this.state.activeStore}>
                        </StorePrimaryMenu>
                    }
                    content={
                        <Grid item xs={12} sm={12} md={12}>
                            <Switch>
                                <Route path={`/`} exact component={defaultStorePage}/>
                                <Route path={`/products`} component={productIndex}/>
                                <Route path={`/orders`} component={orderIndex}/>
                                <Route path={`/categories`} component={categoryIndex}/>
                                <Route path={`/customers`} component={customerIndex}/>
                                <Route path={`/sections`} component={sectionIndex}/>
                                <Route path={`/settings`} component={settings}/>
                            </Switch>
                        </Grid>
                    }
                />

            </StoreContext.Provider>

        );
    }
}

export default withStyles(styles)(App);


