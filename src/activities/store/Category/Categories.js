import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import {SearchRounded} from "@material-ui/icons";
import {Link} from "react-router-dom";
import PageToolbarContainer from "../components/PageToolbarContainer"
import StoreContext from "../StoreContext"
import {Button, FormControl, Grid, InputBase, LinearProgress, Paper, Tab, Tabs} from "@material-ui/core";

import ProductCategories from "./components/ProductCategoriesTabComponent"
import BrandCategories from "./components/BrandCategoriesTabComponent"

import DataSource from "../../../DataSource"

let styles = {
  ProductItemRoot: {
    padding: 8
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between"
  }
};

class TableProductsView extends React.Component {
  dataSource;
  constructor(props){
    super(props)

  }

  static contextType = StoreContext;
  state = {
      tab: 0,
    loading: false,
    loaded: false,
    selected: [],
    categories: [
    ]
  };

  componentWillMount(){
    this.dataSource= new DataSource(this.context.store.token, this.context.store.id)

  }
  componentDidMount() {

    this.dataSource.getStoreCategories().then(v=>{
      
        this.setState({categories: v});
        this.setState({loaded: true});
      this.setState({loading:false})
    }).catch(v => {
        console.log(v);
    });
    this.setState({loading: true})
  }

  render() {
    let { classes } = this.props;

    let searchBox= (
        <Paper style={{ background: "transparent" }}>
          <FormControl fullWidth>
            <InputBase
                style={{ color: "black" }}
                startAdornment={<SearchRounded color={"inherit"} />}
                endAdornment={
                  <Button style={{ color: "gray" }} size={"small"} color={"inherit"}>Search</Button>
                }
                classes={{ input: classes.rootInput }}
                style={{ background: "white", padding: "4px 12px", borderRadius: "4px" }} />
          </FormControl>
        </Paper>
    );

    let defaultToolbarArea = (
        <PageToolbarContainer>
          <Grid container justify={"center"}>
            <Grid item xs={11} sm={10} md={10}>
              <div style={{ margin: "16px 0px" }}>
                <Typography variant={"title"} align={"center"}>CATEGORIES PAGE</Typography>
              </div>
              <div style={{ margin: "16px 0px", marginBottom:0}}>
                <Grid container justify={"center"}>
                  <Grid item xs={12} sm={12} md={8} lg={6} xl={6}>
                    {searchBox}
                  </Grid>
                </Grid>
                <Grid container justify={"center"}>
                  <Grid item>
                      <Tabs value={this.state.tab} variant={"scrollable"} onChange={(e, v) => {
                          this.setState({tab: v});
                      }} textColor={"primary"} indicatorColor={"primary"}>
                          <Tab label={"Products Categories"}></Tab>
                      <Tab label={"Brands"}></Tab>
                    </Tabs>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </PageToolbarContainer>
    );

    return (
        <React.Fragment>
            <div style={{height: "calc( 100vh - 64px)"}}>
                {defaultToolbarArea}
                {this.state.tab == 0 ? <ProductCategories/> : ""}
                {this.state.tab == 1 ? <BrandCategories/> : ""}
          </div>
        </React.Fragment>
    );
  }
}


let WithStylesTableProductsView = withStyles(styles)(TableProductsView);


export default withStyles(styles)(TableProductsView)
