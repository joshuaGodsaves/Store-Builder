import React, {Component} from "react";
import StoreIndex from "./activities/store/index"
import loginPage from "./activities/user/Login"
import withStyles from "@material-ui/core/styles/withStyles";
import AppContext from "./AppContext"
import {BrowserRouter, Route, Switch} from "react-router-dom";

let styles = theme => ({});

class App extends Component {
    constructor(props) {
        super(props);
    }

    state = {};

    componentWillMount() {
        let data = JSON.parse(window.localStorage.getItem("magnet-client-active-store"));

        console.log(data)
        if (data.store && data.store._id) {
            //User is loggedIn Set token and email
            console.log("Allow access to app");
            this.setState({user: data.email, token: data.token, store: data.store, storeId: data.$_id});
        } else {
            if (window.location.pathname !== "/login") {
                console.log("about to load login page")
                window.location.replace("/login")
            }
        }
    }

    render() {
        return (
            <BrowserRouter>
                <AppContext.Provider
                    value={{user: {email: this.state.user}, store: {token: this.state.token, id: this.state.storeId, details: this.state.store}}}>
                    <Switch>
                        <Route path={"/login"} exact component={loginPage}/>
                    </Switch>
                    {
                        this.state.user && window.location.pathname !== "/login" ?
                            <Switch>
                                <StoreIndex/>
                            </Switch>
                            : ""
                    }
                </AppContext.Provider>
            </BrowserRouter>
        );
    }
}

export default withStyles(styles)(App);


