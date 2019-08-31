import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {Route, Switch} from "react-router-dom";
// Pages
import ProductsActivity from "./Products";
import ProductActivity from "./product-renov";
import StoreContext from "../StoreContext";

let styles = {};

class Index extends React.Component {

  constructor(props) {
    super(props);
  }

    static contextType = StoreContext;

  render() {
    return (
      <React.Fragment>
        <Switch>
            <Route path={`/products`} exact component={ProductsActivity}/>
            <Route path={`/products/:product`} exact component={ProductActivity}/>
        </Switch>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Index);
