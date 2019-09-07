import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import {Delete, Edit, MoreHoriz, SearchRounded} from "@material-ui/icons";
import {FaDollarSign, FaMailBulk, FaUserCircle} from "react-icons/fa"
import Button from "@material-ui/core/Button";
import StoreContext from "../StoreContext"
import {
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
    Toolbar
} from "@material-ui/core";
import DataSource from "../../../DataSource"
import {MdGroup} from "react-icons/md";
import PageToolbarContainer from "../components/PageToolbarContainer";

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
    anchorEl: undefined,
    loading: true,
    loaded: false,
    selected: [],
    orders: [
    ]
  };
    static contextType = StoreContext;

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

    selectAll = (event, checked) => {
        if (checked) {
            this.setState(state => {
                state.selected = state.orders.map(v => v._id);
                return state;
            });
        } else {
            this.setState(state => {
                state.selected = [];
                return state;
            });
        }
    };

  loadTransactions = () => {
      this.dataSource = new DataSource(this.context.token, this.context.store.id);
    this.dataSource.getStoreTransactions().then(v => {
        this.setState({loading: false});
        let orders = v.data.items;
      this.setState({orders: orders})
    }).catch(v=> { this.setState({loading: false})})
  };

  openMenu = (transaction) => {
    return (event) => {
        this.setState({activeTransaction: transaction});
        event.persist();
      this.setState({anchorEl: event.target})
    }
  };

  closeMenu = (event) => {
    this.setState({anchorEl: null})
  };

  componentWillMount() {
      this.dataSource = new DataSource(this.context.store.token, this.context.store.id);
    this.loadTransactions()
  }

  deleteTransaction = () => {
      let {activeTransaction} = this.state;
    this.dataSource.deleteStoreTransaction(activeTransaction._id).then(v => {

    });
      this.closeMenu();
    this.loadTransactions()

  };

  render() {
    let { classes } = this.props;

      let {anchorEl} = this.state;
    let transactionMenu = (
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} id="simple-menu" onClose={this.closeMenu}>
          <MenuItem onClick={this.closeMenu}>View</MenuItem>
          <MenuItem onClick={this.deleteTransaction}>Delete</MenuItem>
          <MenuItem onClick={this.closeMenu}>Processing</MenuItem>
          <MenuItem onClick={this.closeMenu}>Cancel</MenuItem>
          <MenuItem onClick={this.closeMenu}>Complete</MenuItem>
        </Menu>
    );
    let selectedCategoriesOptionToolBar = (
        <Paper>
          <Toolbar>
            <div>
              <IconButton><Delete/></IconButton>
              <IconButton><Edit/></IconButton>
              <IconButton><MdGroup/></IconButton>
              <IconButton><FaMailBulk/></IconButton>
            </div>
          </Toolbar>
        </Paper>
    );


      let searchBox = (
          <Paper style={{background: "transparent"}}>
              <FormControl fullWidth>
                  <InputBase
                      style={{color: "ghostwhite"}}
                      startAdornment={<SearchRounded color={"inherit"}/>}
                      endAdornment={
                          <Button style={{color: "ghostwhite"}} size={"small"} color={"inherit"}>Search</Button>
                      }
                      classes={{input: classes.rootInput}}
                      style={{background: "rgba(0,0,0,.5)", padding: "4px 12px", borderRadius: "4px"}}/>
              </FormControl>
          </Paper>
      );

    let defaultToolbar = (
        <PageToolbarContainer>
            <Grid container justify={"center"}>
                <Grid item xs={11} sm={10} md={10}>
                    <div style={{margin: "16px 0px"}}>
                        <Typography variant={"h5"} align={"center"}>Categories Page</Typography>
                    </div>
                    <div style={{margin: "16px 0px", marginBottom: 0}}>
                        <Grid container justify={"center"}>
                            <Grid item xs={12} sm={12} md={8} lg={6} xl={6}>
                                {searchBox}
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </PageToolbarContainer>
    );

    let ordersAvailable = (
        <React.Fragment>
          {transactionMenu}
          <div>
              {defaultToolbar}
            <Grid container justify={"center"}>
              <Grid item xs={12}>
                {this.state.orders.map((v, i) => (
                    <Paper style={{margin:"8px 0px"}} elevation={1}>
                      <Grid container alignItems={"center"} justify={"space-between"}>
                        <Grid item xs={12} md={6}>
                          <Grid container>
                            <Grid item>
                              <Checkbox
                                  checked={this.state.selected.some(v2=> v2 == v._id)}
                                  onChange={this.selectSingle(v._id)}
                              />
                            </Grid>
                            <Grid item>
                              <IconButton>
                                <FaUserCircle/>
                              </IconButton>
                              <span>{v.customer}</span>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Grid container justify={"space-between"} alignItems={"center"}>
                            <Grid>
                              <Chip variant={"outlined"} label={"status"} color={"primary"}/>
                            </Grid>
                            <Grid item>
                              {new Date().toDateString()}
                            </Grid>
                            <Grid item>
                              <Chip label={v.items.length} variant={"outlined"} color={"primary"}/>
                            </Grid>
                            <Grid item>
                              <Chip label={v.total} variant={"outlined"} icon={<FaDollarSign/>} color={"primary"}/>
                            </Grid>
                            <Grid item>
                              <IconButton color={"primary"}  onClick={this.openMenu(v)}><MoreHoriz/></IconButton>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Paper>
                ))}
              </Grid>
            </Grid>
          </div>
        </React.Fragment>
    );
    
    let ordersNotAvailable = (
        <Grid container style={{height: "100vh"}} alignItems={"center"} justify={"center"}>
            <Grid item>
                <Paper style={{padding: "24px"}}>
                    <div align="center">
                        <Typography align={"center"} style={{margin: "16px 0px"}}>
                            You dont have any orders yet
                        </Typography>
                    </div>
                </Paper>
            </Grid>
        </Grid>
    );

    return (
        <React.Fragment>
          {this.state.loading? <LinearProgress/> :
              <div style={{height: "calc( 100vh - 64px)", background: '#404040'}}>
                {this.state.orders.length == 0
                    ? ordersNotAvailable
                    : ordersAvailable}
              </div>
          }
        </React.Fragment>
    );
  }
}

let WithStylesTableProductsView = withStyles(styles)(TableProductsView);


export default withStyles(styles)(TableProductsView)
