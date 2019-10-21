import React, {Component} from "react";
import {StoreContext} from "../StoreContext";
import withStyles from "@material-ui/core/styles/withStyles";
import axios from "axios"
import {APIURL} from "../../../DataSource";
import {Button, Grid, Tab, Tabs, Typography, Grow} from "@material-ui/core"

import {BusinessStoreDataComponent} from "./components/BusinessDataModule";
import {UIStoreDataComponent} from "./components/UIModule";
import {GeneralStoreDataComponent} from "./components/GeneralStoreDataModule";
import {LocationStoreDataComponent} from "./components/LocationModule";
import {ContactStoreDataComponent} from "./components/ContactModule";
import {AccountComponent} from "./components/AccountComponent"

let drawerWidth = 220;

let styles = theme => ({
    drawerPaper: {
        width: drawerWidth
    }, inputRoot: {
        padding: "20px 8px 8px 8px"
    }, yMargin: {
        margin: "12px 0px"
    }
});

class App extends Component {

    constructor(props) {
        super(props);
    }

    static contextType = StoreContext;
    state = {

        currentTabIndex: 2
    };

  watchTab=(e, index)=> {

      this.setState({currentTabIndex: index});

  }


    componentDidMount() {


    }

    componentWillMount() {

        axios.get(`${APIURL}/store/${this.context.store.id}`).then(v => {
            console.log(v.data);
            this.setState({...v.data})
        })

    }

    render() {

        let {classes} = this.props;


        let storePrimaries = (

              <Grow  in>
                  <Grid container>
                      <Grid item xs={12}>
                          <GeneralStoreDataComponent/>
                      </Grid>
                  </Grid>
              </Grow>

        );

        let account = (
            <Grow in>
                <Grid container>
                    <Grid item xs={12}>
                        <AccountComponent/>
                    </Grid>
                </Grid>
            </Grow>
        );

        let design = (
            <Grow direction={"left"}>
                <Grid container>
                    <Grid item xs={12}>
                        <GeneralStoreDataComponent/>
                    </Grid>
                </Grid>
            </Grow>
        );

        let seo = (
            <Grow direction={"left"}>
                <Grid container>
                    <Grid item xs={12}>
                        <GeneralStoreDataComponent/>
                    </Grid>
                </Grid>
            </Grow>
        );
        return (
            <React.Fragment>
                <div style={{margin: "12px 16px "}}>
                    <Grid container justify={"center"}>
                        <Grid item>
                            <Tabs value={this.state.currentTabIndex} onChange={this.watchTab} variant={"scrollable"}>
                                <Tab label={"Basics"}/>
                                <Tab label={"SEO"}/>
                                <Tab label={"Account"}/>
                                <Tab label={"Site"}/>
                            </Tabs>
                        </Grid>

                        <Grid item xs={12}>
                            {this.state.currentTabIndex==0 && storePrimaries}
                            {this.state.currentTabIndex==1 && account}
                            {this.state.currentTabIndex==2 && account}
                            {this.state.currentTabIndex==3 && seo}
                        </Grid>
                    </Grid>


                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(App);


