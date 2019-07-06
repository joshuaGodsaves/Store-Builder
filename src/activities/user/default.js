import React, {Component} from "react";
import DataSource from "../../DataSource"
import UserContext from "../../AppContext"
import withStyles from "@material-ui/core/styles/withStyles";
import {
    CircularProgress, List, ListItem,
    Grid, Typography, ListItemText, ListItemIcon,
    Button,Paper, ExpansionPanel, ExpansionPanelSummary,
    ExpansionPanelActions, ExpansionPanelDetails, IconButton
} from "@material-ui/core"
import {FaUserCircle} from "react-icons/fa"
import {ArrowDownward, ArrowDropDown, MessageOutlined, Store} from "@material-ui/icons"
import {Switch, Link, Route} from "react-router-dom";

let drawerWidth = 220;

let styles = theme => ({
    drawerPaper: {
        width: drawerWidth
    }
});

class App extends Component {

    static contextType= UserContext
    constructor(props) {
        super(props);
    }

    state={
        menuOpen: true,
        stores:[],
        loading: false,
        createingStore: false
    }

    componentDidMount() {
        this.dataSource=new DataSource(this.context.user.token, this.context.user.email)

        this.loadUserStores()
    }

    loadUserStores= async ()=>{
        this.setState({loading: true})
        let result = await this.dataSource.getStores(this.context.user.email);
        this.setState({loading: false})
        if(result.data.length== 0){
            // no stores available
        }else{
            alert(JSON.stringify(result.data))
            // stores loaded
            this.setState({loading: false, stores:result.data})
        }
    }

    createStore= async ()=>{
        this.setState({createingStore: true})
        let result= await this.dataSource.createStore(this.context.user.email)
        if(result.data){
            this.setState({createingStore: false})
        }
    }

    loadRoute=(route)=>{
        return ()=>{window.location.replace(`/stores/${route}`); alert()}
    }

    render() {
        let {stores, loading, createingStore}= this.state
        return (
            <React.Fragment>
                <Grid container spacing={8}>
                    <Grid item md={12}>
                        <Paper style={{padding: 24, height: 300, display:"flex", alignItems:"flex-end"}}>
                            <div>
                                <div style={{width:150, height:150, 
                                    borderRadius:100, background:"ghostwhite",
                                     margin:"16px 0px", display:'flex',alignItems:"center", justifyItems:"center", justifyContent:"center"}}> 
                                    <FaUserCircle style={{fontSize:100}}/>
                                </div>
                                <Typography variant={"h4"}>  User Name</Typography>
                            </div>
                            <div>
                               
                            </div>
                        </Paper>
                    </Grid>

                    <Grid item sm={11} md={6}>
                        <ExpansionPanel >
                            <ExpansionPanelSummary expandIcon={<ArrowDownward/>}  style={{background:"ghostwhite"}}>
                                <Store style={{marginRight:"12px", color:"grey"}}/>
                                <Typography> Stores </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                
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
                            </ExpansionPanelDetails>
                            <ExpansionPanelActions style={{alignItems:"center"}}>
                                <span style={{display:"flex",alignItems:"center"}}>
                                    {createingStore? <CircularProgress/> :""}
                                    <Button onClick={this.createStore}>
                                    Create
                                    </Button>
                                </span>
                                <Button>Visit</Button>
                            </ExpansionPanelActions>
                        </ExpansionPanel>
                    </Grid>
                    <Grid item  sm={11}  md={6}>
                        <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ArrowDownward/> } style={{background:"ghostwhite"}}>
                                <MessageOutlined  style={{marginRight:"12px", color:"grey"}}/>
                                <Typography> Messages </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography> No Messages available</Typography>
                            </ExpansionPanelDetails>
                            <ExpansionPanelActions>
                                <Button>Open</Button>
                            </ExpansionPanelActions>
                        </ExpansionPanel>
                    </Grid>

                </Grid>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(App);


