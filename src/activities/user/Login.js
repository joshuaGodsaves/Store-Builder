import React, {Component} from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import {
    Button,
    CircularProgress,
    FormControl,
    FormLabel,
    Grid,
    OutlinedInput,
    Paper,
    Typography
} from "@material-ui/core"
import {SupervisedUserCircle} from "@material-ui/icons"
import axios from "axios";
import {APIURL} from './../../DataSource';

let drawerWidth = 220;
let styles = theme => ({
    drawerPaper: {
        width: drawerWidth
    }
});

class App extends Component {

    state = {

        storeId: undefined,
        password: undefined,
        sentRequest: false,
        isLoggedIn: false,
        failedLogin: false

    };
    constructor(props) {
        super(props);
    }

    loginUser = async (event) => {
        this.setState({sentRequest: true});
        let req = await axios.post(`${APIURL}/store/login`, {
            storeId: this.state.storeId,
            password: this.state.password
        });

        if (req.data.token){
            let store = {
                email: req.data.store.owner,
                token: req.data.token,
                storeId: req.data.store._id,
                store: req.data.store
            };

            window.localStorage.setItem("magnet-client-active-store", JSON.stringify(store));
            window.location.replace("/")
        } else {
            this.setState({failedLogin: true, sentRequest: false})
        }
    };

    watch = (prop) => {
        return (event) => {

            if (this.state.failedLogin) {
                this.setState({failedLogin:false});
            }

            event.persist();
            this.setState(state => {
                state[prop] = event.target.value;
                return state;
            })
        }
    };


    componentDidMount() {
    }
    render() {

        return (
            <React.Fragment>
                <Grid container justify={"center"} style={{zIndex: "20000"}}>
                    <Grid item style={{margin: "24px"}}>
                        <Typography align={"center"} style={{margin: "8px 0px"}}>Login User Account</Typography>
                        {this.state.failedLogin ?
                            <Typography align={"center"} style={{padding: 8, color: "red", fontSize: "bold"}}> Wrong email or
                                password </Typography> : ""}
                        <Paper style={{padding: 16, background: "white"}} elevation={1}>
                            <div>
                                <Grid container justify={"center"}>
                                    <Grid item style={{height: 70, display: "flex", alignItems: "center"}}>
                                        {this.state.sentRequest ? <CircularProgress/> :
                                            <SupervisedUserCircle style={{fontSize: 30}}/>}
                                    </Grid>
                                </Grid>
                                <FormControl style={{margin: "16px 0px"}}>
                                    <FormLabel>Store_ID</FormLabel>
                                    <OutlinedInput onChange={this.watch("storeId")}/>
                                </FormControl>
                            </div>
                            <div>
                                <FormControl style={{margin: "16px 0px"}}>
                                    <FormLabel>Password</FormLabel>
                                    <OutlinedInput onChange={this.watch("password")} type={"password"}/>
                                </FormControl>
                            </div>
                            <Button onClick={this.loginUser} style={{width: "70%", margin: "8px 15%"}}> Login</Button>
                        </Paper>
                    </Grid>
                </Grid>

            </React.Fragment>
        );
    }
}

export default withStyles(styles)(App);


