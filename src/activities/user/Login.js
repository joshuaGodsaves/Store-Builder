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

        email: undefined,
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
        let req = await axios.post(`${APIURL}/user/login`, {
            email: this.state.email,
            userName: this.state.email,
            password: this.state.password
        });

        if (req.data.token) {
            let user = {
                email: this.state.email,
                token: req.data.token
            };
            window.localStorage.setItem("magnet-client-active-user", JSON.stringify(user));
            window.location.replace("/")
        } else {
            this.setState({failedLogin: true})
        }
    };

    watch = (prop) => {
        return (event) => {
            if (this.state.failedLogin) {
                this.setState({failedLogin: false});
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
                        <Typography align={"center"} style={{margin: "16px 0px"}}>Login User Account</Typography>
                        {this.state.failedLogin ?
                            <div style={{padding: 8, color: "red", fontSize: "bold"}}> Wrong email or
                                password </div> : ""}
                        <Paper style={{padding: 16, background: "white"}} elevation={1}>
                            <div>
                                <Grid container justify={"center"}>
                                    <Grid item style={{height: 100, display: "flex", alignItems: "center"}}>
                                        {this.state.sentRequest ? <CircularProgress/> :
                                            <SupervisedUserCircle style={{fontSize: 30}}/>}
                                    </Grid>
                                </Grid>
                                <FormControl style={{margin: "16px 0px"}}>
                                    <FormLabel>Email</FormLabel>
                                    <OutlinedInput onChange={this.watch("email")}/>
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


