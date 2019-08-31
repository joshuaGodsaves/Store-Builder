import React from "react";
import {Route, Switch} from "react-router-dom";
import StoreContext from "../StoreContext";
// Pages
import SectionsActivity from "./Sections";
import SectionActivity from "./Section";

class Index extends React.Component {

    static contextType = StoreContext;
  render() {
    return (
      <React.Fragment>
        <Switch>
            <Route path={`/sections`} exact component={SectionsActivity}/>
            <Route path={`/sections/:section`} exact component={SectionActivity}/>
        </Switch>
      </React.Fragment>
    );
  }
}

export default Index;
