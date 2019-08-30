import React, {Component} from "react";
import DataSource from "../../DataSource"
import UserContext from "../../AppContext"
import withStyles from "@material-ui/core/styles/withStyles";
import {Button, CircularProgress, Grid, List, ListItem, ListItemIcon, ListItemText, Typography} from "@material-ui/core"
import {MessageOutlined, Store} from "@material-ui/icons"
import {Link} from "react-router-dom";
import AppExpansionComponent from "./components/AppExpansionComponent"

let drawerWidth = 220;

let styles = theme => ({
    drawerPaper: {
        width: drawerWidth
    }
});

class App extends Component {

    static contextType = UserContext;
    constructor(props) {
        super(props);
    }
    
    state={
        menuOpen: true,
        stores:[],
        loading: false,
        createingStore: false
    };

    componentDidMount() {
        this.dataSource = new DataSource(this.context.user.token, this.context.user.email);

        this.loadUserStores()
    }


    loadUserStores= async ()=>{

        this.setState({loading: true});

        let result = await this.dataSource.getStores(this.context.user.email);
        this.setState({loading: false});
        if(result.data.length== 0){
            // no stores available
        }else{
            // stores loaded
            this.setState({loading: false, stores:result.data})
        }
    };

    createStore= async ()=>{

        this.setState({createingStore: true});
        let result = await this.dataSource.createStore(this.context.user.email);
        if(result.data){
            this.setState(state => {
                alert(result.data._id);
                state.stores.push(result.data);
                state.createStore = false;
                return state
            })
        }

    };

    loadRoute=(route)=>{
        return ()=>{window.location.replace(`/stores/${route}`);}
    };

    render() {
        let {stores, loading, createingStore} = this.state;


        return (
            <React.Fragment>
                <Grid container spacing={8}>
                    <Grid item xs={11} sm={6}  md={6}>
                        <AppExpansionComponent header={
                            <>
                            <Store style={{marginRight:"12px", color:"grey"}}/>
                            <Typography> Stores </Typography>
                            </>
                        } content={
                            <>
                                {loading? <CircularProgress/>:""}

                                {stores.length==0 
                                    && loading !=true? <Typography> No Stores Available</Typography>:""}
                                <List>
                                {stores.map(v=>
                                    (
                                       <ListItem component={Link} 
                                       onClick={this.loadRoute(v._id)}
                                       to={`/stores/${v._id}`}>
                                           <ListItemIcon><Store/></ListItemIcon>
                                           <ListItemText>{v._id}</ListItemText>
                                       </ListItem> 
                                    )
                                )}
                                </List>
                            </>
                        } actions={
                            <>
                                <span style={{display:"flex",alignItems:"center"}}>
                                    {createingStore? <CircularProgress/> :""}
                                    <Button onClick={this.createStore}>
                                    Create
                                    </Button>
                                </span>
                                <Button>Visit</Button>
                            </>
                        }/>
                    </Grid>
                    <Grid item xs={11} sm={6}  md={6}>
                        <AppExpansionComponent actions={
                            <> 
                                <Button>Open</Button>
                            </>
                        } header={
                            <>
                                <MessageOutlined  style={{marginRight:"12px", color:"grey"}}/>
                                <Typography> Messages </Typography>
                            </>
                        } content={
                            <>
                            <Typography> No Messages available</Typography>
                            </>
                        }/>
                    </Grid>

                </Grid>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(App);


