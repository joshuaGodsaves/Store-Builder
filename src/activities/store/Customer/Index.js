import React from "react";
import {Route, Switch} from "react-router-dom";
import StoreContext from "../StoreContext";
// Pages
import ListActivity from "./List";
import CustomerActivity from "./Customer";

let styles = {};

class Index extends React.Component {

  constructor(props) {

    super(props);

  }

    static  contextType = StoreContext;

  render() {
    return (
      <React.Fragment>
        <Switch>
            <Route path={`/customers`} exact component={ListActivity}/>
            <Route path={`/customers/:customer`} exact component={CustomerActivity}/>
        </Switch>
      </React.Fragment>
    );
  }
}

export default Index;
