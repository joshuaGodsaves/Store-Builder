import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {Add, MoreHoriz, SearchRounded} from "@material-ui/icons";
import {FaDollarSign, FaFilter} from "react-icons/fa";
import {Link} from "react-router-dom";
import AppContext from "../StoreContext"
import PageToolbarContainer from "../components/PageToolbarContainer"
import {
    Avatar,
    Button,
    Checkbox,
    Chip,
    FormControl,
    Grid,
    IconButton,
    InputBase,
    LinearProgress,
    Menu,
    MenuItem,
    Paper,
    Typography
} from "@material-ui/core";
import DataSource from "../../../DataSource"

let styles = {
  ProductItemRoot: {
    padding: 8
  },
  rootInput: {
    paddingLeft: 8,
    paddingRigh: 8,
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 16,
    fontWeight: 500,
    color: "ghostwhite"
  }
};

class TableProductsView extends React.Component {
  dataSource;
  constructor(props) {
    super(props)

  }
  state = {
    loading: false,
    loaded: false,
    selected: [],
    products: [],
    anchorEl: undefined,
    activeProduct: undefined
  };
    static contextType = AppContext;

  selectSingle = itemKey => {
    return (event, checked) => {
      this.setState(state => {
        if (checked) {
          //push
          state.selected.push(itemKey)
        } else {
          //Pull out
          state.selected = state.selected.filter(v => v != itemKey)
        }
        return state;
      });
    };
  };

    selectAll = (event, checked) => {
        if (checked) {
            this.setState(state => {
                state.selected = state.products.map(v => v._id);
                return state;
            });
        } else {
            this.setState(state => {
                state.selected = [];
                return state;
            });
        }
    };

  loadProducts = () => {
    this.dataSource.getStoreProducts().then(v => {
      this.setState({ products: v.data.items, loading: false })
    }).catch(v => console.log(v));
    this.setState({ loading: true })
  };

  componentWillMount() {

      this.dataSource = new DataSource(this.context.store.token, this.context.store.id);
    this.loadProducts()
  }

  openMenu = (product) => {
    return (event) => {
        this.setState({activeProduct: product});
        event.persist();
      this.setState({ anchorEl: event.target, activeProduct: product })
    }
  };

  closeMenu = () => {
    this.setState({ anchorEl: null })
  };

  deleteProduct = async () => {
      let {activeProduct} = this.state;
      let result = await this.dataSource.deleteStoreProduct(activeProduct._id);
      this.closeMenu();
    this.loadProducts()
  };


  render() {
    let { classes } = this.props;
      let {anchorEl, activeProduct} = this.state;
    let productMenu = (
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} id="simple-menu" onClose={this.closeMenu}>
        <MenuItem onClick={this.closeMenu}
                  component={Link} to={`/products/${activeProduct ? activeProduct._id : undefined}`}>View</MenuItem>
        <MenuItem onClick={this.deleteProduct}>Delete</MenuItem>
        <MenuItem>Mute</MenuItem>
      </Menu>
    );

    let defaultToolbarArea = (
      <PageToolbarContainer>
        <Grid container justify={"center"}>
          <Grid item xs={11} sm={10} md={10}>
            <div style={{ margin: "16px 0px" }}>
              <Typography variant={"h5"} align={"center"}>Products Page</Typography>
            </div>
            <div style={{ margin: "16px 0px"}}>
              <Grid container justify={"center"}>
                <Grid item xs={12} sm={12} md={8} lg={6} xl={6}>
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
                </Grid>
              </Grid>
                <Grid container justify={"center"} style={{marginTop: 8}} spacing={8}>
                    <Grid item>
                        <Button color={"primary"}>
                            <FaFilter style={{marginRight: 8}}/>

                            Filter
                        </Button>
                    </Grid>

                <Grid item>
                    <Button component={Link} to={`/products/new`} color={"primary"}>
                    New Product
                    </Button>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </PageToolbarContainer>
    );

    let productsAvailable = (
      <React.Fragment>
        {productMenu}
        {defaultToolbarArea}
        <Grid container justify={"center"}>
          <Grid item xs={12} sm={10}>
            {this.state.products.map((product, i) => (
              <Paper style={{ margin: "8px 0px", padding: 4 }} elevation={1}>
                <Grid container alignItems={"center"} alignContent={"center"} justify={"space-between"}>
                  <Grid item xs={12} md={6}>
                    <Grid container>
                      <Grid item>
                        <Checkbox
                          color={"primary"}
                          checked={this.state.selected.some(v2 => v2 == product._id)}
                          onChange={this.selectSingle(product._id)}
                        />
                      </Grid>
                      <Grid item style={{ display: "flex", alignItems: "center" }} >
                        <span>
                          <Avatar src={product.mainImageLink} />
                        </span>
                        <span style={{ margin: "0px 12px" }}>
                          {product.title}
                        </span>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Grid container justify={"space-between"} alignItems={"center"}>
                      <Grid item style={{paddingLeft:"12px"}}>
                        {"Category"}
                      </Grid>
                      <Grid item>
                        <div>
                          <Chip label={product.categories.length} color={"primary"} />
                        </div>
                      </Grid>
                      <Grid item>
                        <div>
                          <Chip label={product.categories.length} color={"primary"} />
                        </div>
                      </Grid>
                      <Grid item>
                        <Chip label={product.sellingPrice || "$00.00"} variant={"outlined"} icon={<FaDollarSign />} color={"primary"} />
                      </Grid>
                      <Grid item>
                        <IconButton color={"primary"} onClick={this.openMenu(product)}><MoreHoriz /></IconButton>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            ))}
          </Grid>
        </Grid>
      </React.Fragment>
    );

    let productsNotAvailable = (
        <Grid container style={{height: "100vh"}} alignItems={"center"} justify={"center"}>
            <Grid item>
                <Paper style={{padding: "24px"}}>
                    <div align="center">
                        <Typography align={"center"} style={{margin: "16px 0px"}}>
                            You dont have any products yet, click the button above to add some.
                        </Typography>
                        <Button to={`/products/new`}
                                component={Link} style={{margin: "16px 0px"}}
                                color={"primary"}>
                            <Add/> CREATE
                        </Button>
                    </div>
                </Paper>
            </Grid>
        </Grid>
    );

    return (
      <React.Fragment>
        {this.state.loading ? <LinearProgress /> :
            <div style={{height: "calc( 100vh - 64px)"}}>
            {this.state.products.length == 0
              ? productsNotAvailable
              : productsAvailable}
          </div>
        }
      </React.Fragment>
    );
  }
}
let WithStylesTableProductsView = withStyles(styles)(TableProductsView);

export default withStyles(styles)(TableProductsView)
