import React, {Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {
    Button,
    CircularProgress,
    FormControl, FormHelperText,
    FormLabel,
    Grid,
    OutlinedInput,
    Paper,
    Typography, Zoom
} from "@material-ui/core"

import AppInput from "../../components/AppInput"
import {SupervisedUserCircle, ChevronRight, StoreRounded} from "@material-ui/icons"
import axios from "axios";
import {APIURL} from './../../DataSource';

let drawerWidth = 220;
let styles = theme => ({
    drawerPaper: {
        width: drawerWidth
    },
    rootInput: {
        padding: "12px 8px"
    },
    rootInputContainer: {
        padding: "0px 6px",
    }
});

class App extends Component {

    state = {

        store_id: undefined,
        password: undefined,
        sentRequest: false,
        validStoreName: undefined,
        failedLogin: false,
        checkingStore: false,
        checkedStore: false,
        noStoreWithStoreId: false,
    };

    constructor(props) {
        super(props);
    }

    preLogin = async ()=>{

        let response;

        try{
            response=await axios.post(`${APIURL}/store/check-store`,{store_id: this.state.store_id});
            this.setState({store: response.data})
        }catch (e) {
            console.log(e);
            throw e;
            return;
        }

        console.log(response.data)
        return response.data
    }

    checkStoreName= async ()=>{
        this.setState({checkingStore:true})
      let check= await this.preLogin();

        this.setState({checkingStore:false, checkedStore: true})
        if(check.success== false){
            this.setState({noStoreWithStoreId: true})
        }

        console.log(check)

        if(check.store_id){
              this.setState({checkingStore:false, checkedStore: true, validStoreName: true, noStoreWithStoreId: false})
        }

    }

    loginUser = async (event) => {

        this.setState({sentRequest: true});

        let req = await axios.post(`${APIURL}/store/login`, {
            store_id: this.state.store_id,
            password: this.state.password
        });

        this.setState({sentRequest: false});

        console.log(req.data)

        if (req.data.token){
            console.log(req.data)
            this.setState({failedLogin: false });
            let store = {
                email: this.state.store.owner,
                token: req.data.token,
                $_id: this.state.store._id,
                store: this.state.store
            };

            window.localStorage.setItem("magnet-client-active-store", JSON.stringify(store));

            window.location.replace("/products");

            console.log("redirected");

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

        let {classes}= this.props
        let collectStoreName= (

            <div>
                <Zoom in>
                    <Paper style={{padding:"24px 16px"}}>
                        <Typography style={{marginBottom:16}} align={"center"} variant={"headline"} color={"primary"}>Login Admin</Typography>
                        <FormControl>
                            <OutlinedInput placeholder={"Store ID"}
                                           onChange={this.watch("store_id")}
                                           classes={{input:classes.rootInput, root:classes.rootInputContainer}} startAdornment={<StoreRounded color={"primary"}/>}/>
                            <FormHelperText>Enter your Store id. </FormHelperText>
                        </FormControl>

                        {this.state.noStoreWithStoreId == true?
                            <div style={{padding:12, margin:12, background: "rgba(200,10,10,.7)",borderRadius:10 }}>
                                <Typography> The Store id you entered is incorrect</Typography>
                            </div>: ""}

                        <div style={{marginTop:"18px"}}>
                            {
                                this.state.checkingStore == false ?
                                <Button size={"medium"} variant={"flat"} color={"primary"} onClick={this.checkStoreName}>Next <ChevronRight/></Button> :
                                <CircularProgress/>
                            }
                        </div>
                    </Paper>
                </Zoom>
            </div>
        );

        let collectStorePassword= (

            <div>
                <Zoom in>
                    <Paper style={{padding:"24px 16px"}}>
                        <Typography style={{marginBottom:16}} align={"center"} variant={"headline"} color={"primary"}>Login Admin</Typography>
                        <FormControl>
                            <OutlinedInput placeholder={"Password"}
                                           type={"password"}
                                           onChange={this.watch("password")}
                                           classes={{input:classes.rootInput, root:classes.rootInputContainer}} startAdornment={<StoreRounded color={"primary"}/>}/>
                            <FormHelperText>Your password</FormHelperText>
                        </FormControl>


                        <div style={{marginTop:"18px"}}>
                            {
                                this.state.sentRequest == false ?
                                    <Button size={"medium"} variant={"flat"} color={"primary"} onClick={this.loginUser}>Login <ChevronRight/></Button> :
                                    <CircularProgress/>
                            }
                        </div>
                    </Paper>


                </Zoom>
            </div>
        );


        return (

            <div style={{height:"100vh", display:"flex", alignItems:"center", justifyContent:"center", alignContent:"center", background:'#89cff0'}}>
                { this.state.validStoreName!=true && collectStoreName}

                { this.state.validStoreName ==true && collectStorePassword}
            </div>

        );
    }
}

export default withStyles(styles)(App);


