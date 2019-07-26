import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import {Add, Collections as Group, Delete, Edit, MoreHoriz, Refresh} from "@material-ui/icons";
import {FaProductHunt} from "react-icons/fa/index"
import {Link} from "react-router-dom";
import PageToolbarContainer from "../components/PageToolbarContainer"
import StoreContext from "../StoreContext"
import {
    Checkbox,
    IconButton,
    LinearProgress,
    Paper, Button,
 Toolbar,
  Grid,
  Avatar
} from "@material-ui/core";
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
    let selectedCategoriesOptionToolBar = (
        <PageToolbarContainer>
          <Toolbar>
              <Typography variant={"h6"}> Bulk Action</Typography>
            <div>
              <IconButton><Delete/></IconButton>
              <IconButton><Edit/></IconButton>
            </div>
            <div>
            </div>
          </Toolbar>
        </PageToolbarContainer>
    );

    let defaultToolbar = (
        <PageToolbarContainer>
            <Grid container justify="space-between" alignItems={"center"}>
              <Grid item>
                <Typography variant={"h6"}>
                  Store categories
                </Typography>
              </Grid>
            
              <Grid item>
                  <IconButton  color={"primary"}>
                    <Refresh/>
                  </IconButton>
                  <Button
                      variant={"flat"}
                      color={"primary"}
                              to={`/stores/${this.context.store.id}/categories/new`}
                              component={Link}>
                    <Add/>
                    CREATE
                  </Button>
              </Grid>
            </Grid>
        </PageToolbarContainer>
    );

    let productsAvailable = (
        <React.Fragment>
            {this.state.selected.length !== 0
                ? selectedCategoriesOptionToolBar
                : defaultToolbar}
            <Grid container spacing={8} style={{margin:"16px 0px"}}>
                {this.state.categories.map((category, i) => (
                <Grid item xs={12} md={6} style={{margin:"8px 0px"}}>
                        <Paper elevation={1}>
                            <Grid container alignItems={"center"} justify={"space-between"} spacing={8}>
                                <Grid item style={{display:"flex"}}>
                                    <Checkbox
                                        color={"primary"}
                                        checked={this.state.selected.some(v2 => v2 == category._id)}
                                        onChange={this.selectSingle(category._id)}
                                    />
                                    <div style={{display:"flex", alignItems:"center"}}>
                                      <Avatar src={category.mainImageLink}/>
                                      <span style={{margin:"0px 12px"}}>
                                      {category.title}
                                      </span>
                                    </div>
                                </Grid>
                                <Grid item>
                                    <IconButton component={Link}
                                     color={"primary"}
                                                to={`/stores/${this.context.store.id}/categories/${category._id}`}><MoreHoriz/></IconButton>
                                </Grid>
                            </Grid>
                        </Paper>
                </Grid>
                ))}
            </Grid>
        </React.Fragment>
    );
    let itemsNotAvailable = (
      <div align="center">
      <Typography align={"center"}>
        You dont have any category created yet, click the button below to add some.
      </Typography>
      <Button to={`/stores/${this.context.store.id}/categories/new`} component={Link} style={{margin:"16px 0px"}}>
        <Add/> CREATE
      </Button>
    </div>
    );
    return (
        <React.Fragment>
          {this.state.loading? <LinearProgress/> :
              <div>
            {this.state.categories.length == 0
                ? itemsNotAvailable
                : productsAvailable}
          </div>
          }

        </React.Fragment>
    );
  }
}
let WithStylesTableProductsView = withStyles(styles)(TableProductsView);


export default withStyles(styles)(TableProductsView)
