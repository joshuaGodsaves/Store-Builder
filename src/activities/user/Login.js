import React, {Component} from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import {Grid, Typography, AppBar, Paper, Button, FormControl, FormLabel, FormHelperText, OutlinedInput} from "@material-ui/core"
import {VerifiedUserOutlined,  SupervisedUserCircle} from "@material-ui/icons";
import axios from "axios";
import { APIURL } from './../../DataSource';
let drawerWidth = 220;
let styles = theme => ({
    drawerPaper: {
        width: drawerWidth
    }
});

class App extends Component {

    state={
        email : undefined,
        password: undefined,
        sentRequest: false,
        isLoggedIn: false
    }
    constructor(props) {
        super(props);
    }

    loginUser =async (event) => {
        this.setState({sentRequest: true})
        let req= await axios.post(`${APIURL}/user/login`, {
            email: this.state.email,
            userName: this.state.email,
            password: this.state.password
        })

        this.setState({sentRequest: false})

        if(req.data.token){
    
            let user= {
                email: this.state.email,
                token: req.data.token
            }
            
            window.localStorage.setItem("magnet-client-active-user", JSON.stringify(user))
            window.location.replace("/")
        }

    };

    watch= (prop)=>{
        return (event)=>{
            event.persist()
            this.setState(state=>{
                state[prop]= event.target.value
                return state;
            })
        }
    }


    componentDidMount() {

    }
    render() {

        return (
            <React.Fragment>
                <Grid container justify={"center"}>
                    <Grid item style={{margin:"24px"}} >
                        <Typography align={"center"} style={{margin:"16px 0px"}}>Login User Account</Typography>
                        <Paper style={{padding:16}} elevation={1}>
                            <div>
                            <FormControl  onChange={this.watch("email")}  style={{margin:"16px 0px"}}>
                                <FormLabel>Email</FormLabel>
                                <OutlinedInput />
                            </FormControl>
                            </div>
                            <div>
                            <FormControl style={{margin:"16px 0px"}}>
                                <FormLabel>Password</FormLabel>
                                <OutlinedInput onChange={this.watch("password")}/>
                            </FormControl>
                            </div>
                            <Button onClick={ this.loginUser} style={{width:"70%", margin:"8px 15%"}}> Login</Button>
                        </Paper>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(App);


