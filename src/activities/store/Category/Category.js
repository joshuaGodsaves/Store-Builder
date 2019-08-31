import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {LinearProgress, MenuItem, Select, Tab, Tabs, Toolbar} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import AppPaper from "../../../components/AppPaper"
import AppInput from "../../../components/AppInput"
import {CloudUpload as UploadIcon} from "@material-ui/icons";
import axios from "axios";
import StoreContext from "../StoreContext";
import FileUploader from "../components/FileUpload"
import {APIURL} from "../../../DataSource";
import Divider from "@material-ui/core/Divider";

let styles = {
    xPadding: {
        padding: "0px 16px"
    },
    margin: {
        marginBottom: 8,
        marginTop: 8
    },
    ymargin: {
        marginTop: 16,
        marginBottom: 16
    },
    flexBetween: {
        display: "flex",
        justifyContent: "space-between",
        justifyItems: "space-between"
    }
};

class Category extends React.Component {
    static contextType = StoreContext;
    state = {
        uploadFile: false,
        currentTab: 0,
        type: "",
        categoryDialogOpen: false,
        category: {
            title: undefined,
            caption: undefined,
            description: undefined,
            type: undefined,
            products: [],
            tags: []
        },
        selectMainImageDrawerOpen: false
    };

    tabChange = (e, v) => {
        this.setState({currentTab: v});
    };

    watchInput = propName => {
        return event => {
            event.persist();
            this.setState(state => {
                state.category[propName] = event.target.value;
                return state;
            });
        };
    };

    update = () => {
        let {match: {params}} = this.props;
        axios
            .put(
                `${APIURL}/store/${this.context.store.id}/category/${params.category}`,
                this.state.category,
                {
                    headers: {
                        "X-auth-license": this.context.user.token
                    }
                }
            ).then(v => {
            console.log(v);
            this.setState({updated: true});
            setTimeout(() => {
                this.setState({updated: false})
            }, 2000);
            this.loadCategory(params.category)
        }).catch(v => console.log(v))

    };

    uploadingEvent = () => {
        this.setState({uploading: true});
        alert("uploading")
    };

    selectImage = (url) => {
        this.setState(state => {
            state.category.mainImageLink = url;
            state.category.image = url;
            state.uploading = false;
            return state
        })
    };

    uploadFile = () => {
        this.setState({uploadFile: true})
    };


    loadCategory = async (catID) => {
        let category;
        category = await axios.get(`${APIURL}/store/${this.context.store.id}/category/${catID}`);
        if (!category) {
            console.log("error");
            return
        }
        if (category.data) {
            this.setState({category: category.data, mainCategoryObj: category.data});
            return true
        }
        return false
    };

    componentDidMount() {
        let {match: {params, query}} = this.props;
        let catType = "";
        if (params.category == "new") {
            var squery = window.location.search;
            var search = squery.substring(1, squery.length);
            let arrQ = search.split("=");
            let qObj = {};
            arrQ.forEach(function (v, i) {
                if ((i / 2 !== 0 || i == 0) && i != 1) {
                    qObj[v] = "";

                } else {
                    qObj[arrQ[i - 1]] = v;
                    catType = qObj.type;

                }
            });

            //alert(search[0])
            this.setState({isNewCategory: true, type: qObj.type})
            // Init new product
        } else {
            this.setState({isNewCategory: false});
            this.loadCategory(params.category).then(v => {
                if (v) {
                    this.setState(state => {
                        if (catType) {
                            state.category.type = catType;
                        }
                        return state;
                    })
                } else {
                }
            });
            this.setState({categoryID: params.category})
            //load product
        }
    }

    save = async () => {
        let category = await axios.post(`${APIURL}/store/${this.context.store.id}/category`,
            this.state.category,
            {
                headers: {
                    "X-auth-license": this.context.store.token
                }
            });
        window.location.replace(`/stores/${this.context.store.id}/categories`)

    };

    render() {
        let {classes} = this.props;
        let {category} = this.state;

        let primaryComponent = (
            <React.Fragment>
                <Grid container>
                    <Grid item xs={12}>
                        <AppPaper title={"Basic details"}>
                            <Grid container spacing={16} alignContent={"start"}>
                                <Grid item xs={6}>
                                    <AppInput onChange={this.watchInput("title")} label={"Label"}
                                              value={this.state.category.title}/>
                                    <AppInput onChange={this.watchInput("caption")} label={"Category Caption"}
                                              value={this.state.category.caption}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid container spacing={8}
                                          style={{background: "rgba(200,200,200,.9)", borderRadius: 10}}
                                          justify={"center"}>
                                        <Grid item xs={12} style={{display: 'flex', justifyContent: "center"}}>
                                            <FormControl>
                                                <div style={{padding: 4, border: ".5px solid blue"}}> Type</div>
                                                <Select variant={"standard"}
                                                        value={this.state.category.type || this.state.type}
                                                        onChange={this.typeChange}>
                                                    <MenuItem value={"brand"}>brand</MenuItem>
                                                    <MenuItem value={"product"}>product</MenuItem>
                                                    <MenuItem value={"manufacturers"}>manufacturers</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item>
                                            {this.state.uploading ? <LinearProgress/> : ""}
                                            <div style={{
                                                width: 100,
                                                height: 100,
                                                background: "ghostwhite",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center"
                                            }}>

                                                <Button onClick={() => {
                                                    document.getElementById("fileSelectorElement").click();
                                                }}
                                                        size={"small"}
                                                        color={"primary"}
                                                >Picture
                                                    <FileUploader
                                                        onError={() => {
                                                        }}
                                                        onUploading={this.uploadingEvent}
                                                        onFinish={this.selectImage}/>
                                                    <UploadIcon/>
                                                </Button>
                                            </div>

                                        </Grid>
                                        <Grid item>
                                            <div style={{
                                                width: 100,
                                                height: 100,
                                                background: "ghostwhite",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center"
                                            }}>
                                                <Button onClick={() => {
                                                    document.getElementById("fileSelectorElement").click();
                                                }}
                                                        size={"small"}
                                                        color={"primary"}
                                                >Icon
                                                    <FileUploader
                                                        onError={() => {
                                                        }}
                                                        onUploading={() => {
                                                        }}
                                                        onFinish={this.selectMainImage}/>
                                                    <UploadIcon/>
                                                </Button>
                                            </div>

                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </AppPaper>
                    </Grid>
                </Grid>

            </React.Fragment>
        );

        let propertiesComponents = (
            <React.Fragment>
                <Grid container>
                    <Grid item>
                    </Grid>
                </Grid>
            </React.Fragment>
        );

        return (
            <React.Fragment>
                <Toolbar style={{
                    borderBottom: "1px solid blue",
                    paddingTop: 12,
                    display: "flex",
                    justifyContent: "space-between"
                }} variant={"dense"}>
                    <Tabs
                        variant={"scrollable"}
                        textColor={"primary"}
                        indicatorColor={"primary"}
                        value={this.state.currentTab}
                        onChange={this.tabChange}
                    >
                        <Tab label={"Primary"} style={{color: "black"}}/>
                        <Tab label={"Properties"} style={{color: "black"}}/>
                    </Tabs>
                    <div>
                        <Button
                            color={"primary"}
                            onClick={this.state.isNewCategory ? this.save : this.update}> {this.state.isNewCategory ? "Save" : "Update"}</Button>
                    </div>
                </Toolbar>
                <Divider/>
                <Grid container style={{padding: "24px 0"}} justify={"center"}>
                    <Grid item xs={10}>
                        {this.state.currentTab == 0 && primaryComponent}
                        {this.state.currentTab == 1 && primaryComponent}
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Category);
