import React, {Component} from "react";
import StoreIndex from "./activities/store/index"
import loginPage from "./activities/user/Login"
import withStyles from "@material-ui/core/styles/withStyles";
import AppContext from "./AppContext"
import {BrowserRouter, Route, Switch} from "react-router-dom";
import "./App.css"

let styles = theme => ({

});

class App extends Component {
  constructor(props) {
    super(props);
  }

  state={};

componentWillMount() {
    let data = JSON.parse(window.localStorage.getItem("magnet-client-active-store"));

    if (data && data.email) {
    //User is loggedIn Set token and email
        this.setState({user: data.email, token: data.token, store: data.store, storeId: data.storeId})
  }else{
    if(window.location.pathname !== "/login") {
      window.location.replace("/login")
    }
  }
}

  render() {
    return (
      <BrowserRouter>
          <AppContext.Provider
              value={{user: {email: this.state.user}, store: {token: this.state.token, id: this.state.storeId}}}>
          <Switch>
            <Route path={"/login"} exact  component={loginPage} />
              <StoreIndex/>
          </Switch>S

        </AppContext.Provider>
      </BrowserRouter>
    );
  }
}

export default withStyles(styles)(App);


