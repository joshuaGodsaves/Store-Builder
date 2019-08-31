import React from "react";
import {Route, Switch} from "react-router-dom";
import StoreContext from "../StoreContext";
// Pages
import CategoriesActivity from "./Categories";
import CategoryActivity from "./Category";

class Index extends React.Component {

    static contextType = StoreContext;
  render() {
    return (
      <React.Fragment>
        <Switch>
            <Route path={`/categories`} exact component={CategoriesActivity}/>
            <Route path={`/categories/:category`} exact component={CategoryActivity}/>
        </Switch>
      </React.Fragment>
    );
  }
}

export default Index;
