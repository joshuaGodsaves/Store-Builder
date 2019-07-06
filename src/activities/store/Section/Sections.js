import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import {Add, Collections as Group, Delete, Edit, MoreHoriz, Refresh} from "@material-ui/icons";
import {FaProductHunt} from "react-icons/fa"
import {Link} from "react-router-dom";
import StoreContext from "../StoreContext"
import {
  Card, CardActionArea, CardContent,
    Checkbox,
    IconButton,
    LinearProgress,
    Paper, Button,Toolbar,Grid,CardMedia,CardHeader, Divider
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
    sections: [
    ]
  };
  selectAll = (event, checked) => {
    if (checked) {
      this.setState(state => {
        state.selected= state.sections.map(v=> v._id)
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
    this.dataSource.getStoreSections().then(v=>{
      let sections= v.data.items
      this.setState({sections:sections})
      this.setState({loaded: true})
      this.setState({loading:false})
    }).catch(v=> {console.log(v); })
    this.setState({loading: true})
  }
  static contextType= StoreContext

  render() {
    let { classes } = this.props;
    let selectedCategoriesOptionToolBar = (
        <div>
          <Toolbar>
              <Typography variant={"h6"}> Bulk Action</Typography>
            <div>
              <IconButton color={"primary"}><Delete/></IconButton>
              <IconButton color={"primary"}><Edit/></IconButton>
            </div>
            <div>
            </div>
          </Toolbar>
        </div>
    );

    let defaultToolbar = (
        <div>
          <Toolbar style={{display:'flex', justifyContent:"space-between"}}>
            <Typography variant={"h6"}>
              Store Sections
            </Typography>
            <div>
                <IconButton>
                  <Refresh/>
                </IconButton>
                <Button
                  color={"primary"}
                
                            to={`/stores/${this.context.store.id}/sections/new`}
                            component={Link}>
                  <Add/>
                  CREATE
                </Button>
            </div>
          </Toolbar>
        </div>
    );

    let sectionsAvailable = (
        <React.Fragment>
            {this.state.selected.length !== 0
                ? selectedCategoriesOptionToolBar
                : defaultToolbar}

            <Grid container spacing={8}>
                {this.state.sections.map((section, i) => (
                <Grid item xs={11} md={6} lg={4}>
                        <Card>
                          <CardContent>
                            <div style={{minHeight:180, background:"url()"}}>
                                <div>
                                        <IconButton>
                                            <FaProductHunt/>
                                        </IconButton>
                                        {section.label}
                              </div>
                            </div>
                          </CardContent>
                          <Divider/>
                          <CardActionArea 
                          style={{padding:16, display:"flex", justifyContent:"space-between"}}
                          component={Link}
                          to={`/stores/${this.context.store.id}/sections/${section._id}`}> 
                            <div>
                              View/ Edit
                            </div>
                            <div>
                              </div>
                          </CardActionArea>
                        </Card>
                        <Paper style={{margin:"8px 0px"}} elevation={1}>
                            <Grid container alignItems={"center"} justify={"space-between"}>
                                <Grid item>
                                    <Checkbox
                                    disabled
                                        color={"primary"}
                                        checked={this.state.selected.some(v2 => v2 == section._id)}
                                        onChange={this.selectSingle(section._id)}
                                    />
                                </Grid>
                                <Grid item>
                                    <IconButton component={Link}
                                    disabled
                                                to={``}><MoreHoriz/></IconButton>
                                </Grid>
                            </Grid>
                        </Paper>
                </Grid>
                ))}
            </Grid>
        </React.Fragment>
    );
    let sectionsNotAvailable = (
      <div align="center">
      <Typography align={"center"}>
        You dont have any sections yet, click the button above to add some.
      </Typography>
      <Button to={`/stores/${this.context.store.id}/sections/new`} component={Link}  style={{margin:"16px 0px"}}>
        <Add/> CREATE
      </Button>
      </div>
    );
    return (
        <React.Fragment>
          {this.state.loading? <LinearProgress/> :
              <div>
            {this.state.sections.length == 0
                ? sectionsNotAvailable
                : sectionsAvailable}
          </div>
          }

        </React.Fragment>
    );
  }
}
let WithStylesTableProductsView = withStyles(styles)(TableProductsView);


export default withStyles(styles)(TableProductsView)
