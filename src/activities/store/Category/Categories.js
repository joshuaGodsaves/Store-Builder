import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import {Add, Collections as Group, Delete, Edit, MoreHoriz, Refresh, SearchRounded} from "@material-ui/icons";
import {FaProductHunt} from "react-icons/fa/index"
import {Link} from "react-router-dom";
import PageToolbarContainer from "../components/PageToolbarContainer"
import StoreContext from "../StoreContext"
import {
  Tab,
  Checkbox,
  IconButton,
  LinearProgress,
  Paper, Button,
  Toolbar,
  Grid,
  Avatar, FormControl, InputBase, Tabs
} from "@material-ui/core";
import ProductCategories from "../components/TabComponents/ProductCategoriesTabComponent"

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
  state = {
    loading: false,
    loaded: false,
    selected: [],
    categories: [
    ]
  };
  selectAll = (event, checked) => {
    if (checked) {
      this.setState(state => {
        state.selected= state.products.map(v=> v._id)
        return state;
      });
    } else {
      this.setState(state => {
        state.selected= []
        return state;
      });
    }
  };

  selectSingle = itemKey => {
    return (event, checked) => {
      this.setState(state => {
        if(checked){
          //push
          state.selected.push(itemKey)
        }else{
          //Pull out
          state.selected= state.selected.filter(v=> v!=itemKey)
        }
        return state;
      });
    };
  };

  componentWillMount(){
    this.dataSource= new DataSource(this.context.store.token, this.context.store.id)

  }

  componentDidMount() {
    this.dataSource.getStoreCategories().then(v=>{
      let categories= v.data.items
      this.setState({categories:categories})
      this.setState({loaded: true})
      this.setState({loading:false})
    }).catch(v=> {console.log(v); })
    this.setState({loading: true})
  }

  static contextType= StoreContext

  render() {
    let { classes } = this.props;

    let searchBox= (
        <Paper style={{ background: "transparent" }}>
          <FormControl fullWidth>
            <InputBase
                style={{ color: "ghostwhite" }}
                startAdornment={<SearchRounded color={"inherit"} />}
                endAdornment={
                  <Button style={{ color: "ghostwhite" }} size={"small"} color={"inherit"}>Search</Button>
                }
                classes={{ input: classes.rootInput }}
                style={{ background: "rgba(0,0,0,.5)", padding: "4px 12px", borderRadius: "4px" }} />
          </FormControl>
        </Paper>
    )

    let actionsBoxGridContainer=(
        <Grid container justify={"center"}>
          <Grid item>
            <Button>
              Bulk Add
            </Button>
          </Grid>
          <Grid item>
            <Button component={Link} to={`/stores/${this.context.store.id}/categories/new`}>
              New Category
            </Button>
          </Grid>
        </Grid>
    )

    let defaultToolbarArea = (
        <PageToolbarContainer>
          <Grid container justify={"center"}>
            <Grid item xs={11} sm={10} md={10}>
              <div style={{ margin: "16px 0px" }}>
                <Typography variant={"h5"} align={"center"}>Categories Page</Typography>
              </div>
              <div style={{ margin: "16px 0px", marginBottom:0}}>
                <Grid container justify={"center"}>
                  <Grid item xs={12} sm={12} md={8} lg={6} xl={6}>
                    {searchBox}
                  </Grid>
                </Grid>
                <Grid container justify={"center"}>
                  <Grid item>
                    <Tabs value={0} variant={"scrollable"}>
                      <Tab label={"Products cat"}></Tab>
                      <Tab label={"Brands"}></Tab>
                      <Tab label={"Products type"}></Tab>
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
          {this.state.loading? <LinearProgress/> :""}
          {defaultToolbarArea}
          <div style={{margin:"12px 0px"}}>
            <ProductCategories/>
          </div>

        </React.Fragment>
    );
  }
}
let WithStylesTableProductsView = withStyles(styles)(TableProductsView);


export default withStyles(styles)(TableProductsView)
