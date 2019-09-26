import React, {Component} from "react";
import StoreContext from "./StoreContext"
import withStyles from "@material-ui/core/styles/withStyles";
import axios from "axios"
import AppInput from "../../components/AppInput"
import AppPaper from "../../components/AppPaper"
import {APIURL} from "../../DataSource";
import {Button, Grid, Tab, Tabs, Typography} from "@material-ui/core"

import {FaFacebook, FaInstagram, FaTwitter, FaWhatsapp} from "react-icons/fa";

let drawerWidth = 220;

let styles = theme => ({
    drawerPaper: {
        width: drawerWidth
    }, inputRoot: {
        padding: "20px 8px 8px 8px"
    }, yMargin: {
        margin: "12px 0px"
    }
});

class App extends Component {

    constructor(props) {
        super(props);
    }

    static contextType = StoreContext;
    static contextType = StoreContext;
    state = {
        social: {},
        siteDetails: {},
        title: undefined,
        description: undefined,
        location: {},
        phone: undefined,
        email: undefined,
        status: undefined
    };

    watchText = (prop) => {
        return (e) => {
            e.persist();
            this.setState(state => {
                state[prop] = e.target.value;
                return state;
            })

        }
    };

    watchSocial = (prop) => {
        return (e) => {
            e.persist();
            this.setState(state => {
                state.social[prop] = e.target.value;
                return state;
            })
        }
    };

    save = async () => {
        let data = this.state;
        console.log(this.state);
        let store = await axios.put(`${APIURL}/store/${this.context.store.id}`,
            this.state,
            {
                headers: {
                    "X-auth-license": this.context.store.token
                }
            });

        console.log(store.data)


    };

    componentDidMount() {


    }

    componentWillMount() {

        axios.get(`${APIURL}/store/${this.context.store.id}`).then(v => {
            console.log(v.data);
            this.setState({...v.data})
        })

    }

    render() {

        let {classes} = this.props;
        let state = this.state;
        let {social} = this.state;


        let storePrimaries = (
            <Grid container>
                <Grid item xs={12}>
                    {/*DEFINE CORE STORE PROPERTIES HERE*/}
                    <AppPaper labe={"Basic Details"} title={"Basic details"}>
                        <Grid container spacing={8}>
                            <Grid item xs={12} md={6}>
                                <AppInput label={"Store name"} onChange={this.watchText("title")} value={state.title}/>
                                <AppInput label={"Store status"} onChange={this.watchText("status")} value={state.status}/>
                                <AppInput label={"Store description"} onChange={this.watchText("description")}
                                          value={state.description}/>
                                <Grid container spacing={8}>
                                    <Grid item xs={12} sm={6}>
                                        <AppInput label={"phone"} onChange={this.watchText("phone")} value={state.phone} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <AppInput label={"email"} onChange={this.watchText("email")} value={state.email}/>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={6}>

                            </Grid>
                        </Grid>
                    </AppPaper>
                </Grid>
                <Grid item style={{margin: "0px 12px"}} xs={12}>
                    <Grid container spacing={8}>
                        <Grid item xs={12}>
                            <Typography variant={"h5"} style={{margin: "12px 0px", marginBottom: 0}}>Social
                                Media</Typography>
                        </Grid>
                        <Grid item>
                            <AppInput label={"Facebook"} startAdornment={<FaFacebook/>}
                                      onChange={this.watchSocial("facebook")} value={state.social.facebook}/>
                        </Grid>
                        <Grid item>
                            <AppInput label={"Instagram"} startAdornment={<FaInstagram/>}
                                      onChange={this.watchSocial("instagram")} value={state.social.instagram}/>
                        </Grid>
                        <Grid item>
                            <AppInput label={"Whatsapp"} startAdornment={<FaWhatsapp/>}
                                      onChange={this.watchSocial("whatsapp")} value={state.social.whatsapp}/>
                        </Grid>
                        <Grid item>
                            <AppInput label={"Twitter"} startAdornment={<FaTwitter/>}
                                      onChange={this.watchSocial("twitter")} value={state.social.twitter}/>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
        );
        return (
            <React.Fragment>
                <div style={{margin: "12px 16px "}}>
                    <Grid container justify={"space-between"} alignContent={"center"} alignItems={"center"}>
                        <Typography variant={"headline"} style={{margin: "16px 0px"}}>Settings page </Typography>
                        <Button color={"primary"} onClick={this.save}>Save</Button>
                    </Grid>

                    <Grid container>
                        <Grid item>
                            <Tabs value={0} >
                                <Tab label={"Basics"}/>
                                <Tab label={"Site"}/>
                                <Tab label={"Notifications"}/>
                            </Tabs>
                        </Grid>
                        <Grid item>
                            {storePrimaries}
                        </Grid>
                    </Grid>


                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(App);


