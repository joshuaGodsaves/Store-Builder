import React from "react"
import withStyles from "@material-ui/core/styles/withStyles"
import {AddAPhoto} from "@material-ui/icons"
import {APIURL} from "../../../DataSource"
import StoreContext from "../StoreContext"
import {
    Avatar,
    Button,
    ButtonBase,
    Chip,
    Grid,
    GridList,
    GridListTile,
    GridListTileBar,
    IconButton,
    LinearProgress,
    Menu,
    MenuItem,
    Tab,
    Tabs,
    Typography
} from '@material-ui/core';
import Context from "../../../AppContext"
import AppInput from "../../../components/AppInput"

import AppPaper from "../../../components/AppPaper"

import CategoryLite from "../components/CategoryLite"

import FileUploader from "../components/FileUpload"
import axios from "axios"

let styles = theme => ({
    imageBox: {
        background: "rgba(233,233,233,.5)",
        width: "140px",
        borderRadius: "4px",
        margin: "0px 12px"
    }
});


class GeneralTab extends React.Component {

    static contextType = Context;

    state = {
        categoryOpen: false,
        brandSelectorAnchorEl: false,
        openBrand: false,
        typeAnchorEl: false,
        uploading: false
    };

    openBrand = (e) => {
        e.persist();
        this.setState({brandSelectorAnchorEl: e.target, openBrand: true});
    };
    closeBrand = () => {
        this.setState({brandSelectorAnchorEl: false});
    };
    openType = (e) => {
        e.persist();
        this.setState({typeAnchorEl: e.target, openType: true});
    };
    closeType = () => {
        this.setState({typeAnchorEl: false});
    };
    uploading = () => {
        this.setState({uploading: true})
    };
    openCategory = () => {
        this.setState(state => {
            state.categoryOpen = true;
            return state;
        })
    };
    closeCategory = () => {
        this.setState({categoryOpen: false})
    };

    categoryChange = (v) => {
        this.props.categoryChange(v);
        this.closeCategory()
    };

    render() {

        let {brandSelectorAnchorEl, typeAnchorEl} = this.state;

        let {classes, product, categoryChange, tagsChange, watchText, selectMainImage, brandChange, brands} = this.props;

        const productTypeMenu = (
            <Menu anchorEl={typeAnchorEl} open={typeAnchorEl ? true : false} onClose={this.closeType}>
                <MenuItem onClick={this.closeType}>Type 1</MenuItem>
                <MenuItem onClick={this.closeType}>Type 2</MenuItem>
            </Menu>
        );
        return (
            <>
                {this.state.categoryOpen ? (
                    <CategoryLite open={true}
                                  categories={product.categories}
                                  closeCategorySelector={this.categoryChange}/>
                ) : ""}


                <AppPaper nomargin title={"Basic details"}>
                    <Grid container alignContent={"stretch"} spacing={16}>
                        <Grid item xs={6} style={{margin: "12px 0px"}}>
                            <div>
                                <AppInput label={"Product name"} onChange={watchText("title")} value={product.title} />
                                <AppInput label={"Product caption"} onChange={watchText("caption")} value={product.caption} />
                                <Grid container spacing={8}>
                                    <Grid item xs={6}>
                                        <AppInput label={"Cost price"} onChange={watchText("costPrice")} value={product.costPrice} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <AppInput label={"Selling price"} onChange={watchText("sellingPrice")} value={product.sellingPrice} />
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                        <Grid item xs={6} style={{ margin: "16px 0px" }}>
                            <div style={{ border: ".5px solid ghostwhite" }}>
                                <GridList style={{ flexDirection: "row", flexWrap: "nowrap", padding: "8px 0px", borderRadius: 4 }} >
                                    <GridListTile className={classes.imageBox}>
                                        {this.state.uploading ? <LinearProgress style={{zIndex: 2000}}/> : ""}
                                        {/*  */}
                                        <FileUploader
                                            onError={() => { }}
                                            onUploading={this.uploading}
                                            onFinish={(v) => {
                                                this.setState({uploading: false});
                                                alert("ok");
                                                selectMainImage(v)
                                            }}/>

                                        <img src={product.image} style={{height: "100%"}}/>

                                        <GridListTileBar title={"Image"} subtitle={"main product image"} actionIcon={
                                            // Triggers internal input element [type: file]
                                            <IconButton style={{ color: 'white' }} onClick={() => { document.getElementById("fileSelectorElement").click() }}>
                                                <AddAPhoto />
                                            </IconButton>
                                        } />
                                    </GridListTile>
                                    {[1, 2, 3, 4].map(v => (
                                        <GridListTile className={classes.imageBox}>

                                        </GridListTile>
                                    ))}
                                </GridList>
                            </div>
                        </Grid>
                    </Grid>
                </AppPaper>

                <Grid container alignContent={"stretch"} spacing={16}>
                    <Grid item xs={6} style={{ margin: "16px 0px" }}>
                        <AppPaper nomargin title={"Basic classification"}>
                            <div>
                                <div style={{marginBottom: 12, background: "ghostwhite", minHeight: 80}}>
                                    {product.categories.map(v => (
                                        <Chip label="Category name" style={{margin: "8px 8px"}}/>
                                    ))}
                                </div>
                                <div>
                                    <ButtonBase onClick={this.openCategory}
                                                style={{
                                                    padding: "4px 12px",
                                                    borderRadius: 4,
                                                    background: "rgba(0,0,0,.2)",
                                                    width: "100%"
                                                }}>
                                        <Typography variant={"button"}>Product category</Typography>
                                    </ButtonBase>
                                </div>
                            </div>
                            <Grid container style={{marginTop: "12px"}} spacing={8}>
                                <Grid item xs={6}>
                                    <Menu anchorEl={brandSelectorAnchorEl}
                                          open={!brandSelectorAnchorEl ? false : true}
                                          onClose={this.closeBrand}>
                                        {brands.map(v => (
                                            <MenuItem onClick={() => {
                                                brandChange(v);
                                                this.closeBrand()
                                            }}>
                                                <Avatar/>
                                                <Typography style={{marginLeft: "12px"}}> Brand name </Typography>
                                            </MenuItem>
                                        ))}
                                    </Menu>

                                    <ButtonBase
                                        onClick={this.openBrand}
                                        style={{
                                            padding: "4px 12px",
                                            borderRadius: 4,
                                            background: "rgba(0,0,0,.2)",
                                            width: "100%",
                                            display: "flex",
                                            justifyContent: "space-between"
                                        }}>
                                        <Avatar style={{margin: "0px 12px"}}/> Brand
                                    </ButtonBase>
                                </Grid>
                                <Grid item xs={6}>
                                    {productTypeMenu}
                                    <ButtonBase
                                        onClick={this.openType}
                                        style={{
                                            padding: "4px 12px",
                                            borderRadius: 4,
                                            background: "rgba(0,0,0,.2)",
                                            width: "100%",
                                            display: "flex",
                                            justifyContent: "space-between"
                                        }}>
                                        <Avatar style={{margin: "0px 12px"}}/> Type
                                    </ButtonBase>
                                </Grid>
                            </Grid>
                            <AppInput label={"Tags"} nomargin onChange={tagsChange}
                                      value={product.tags ? product.tags.join(" ") : ""}/>
                        </AppPaper>
                    </Grid>
                    <Grid item xs={6} style={{ margin: "16px 0px" }} hidden>
                        <AppPaper nomargin>
                        </AppPaper>
                    </Grid>
                </Grid>
            </>
        )

    }
}

class Component extends React.Component {

    static contextType = StoreContext;


    state = {
        tabIndex: 0
    };
    state = {
        product: {
            image: null, title: null, caption: null, description: null,
            categories: [], brand: null, sellingPrice: null, costPrice: null,
            available: null, gallery: [], highPrice: null, lowPrice: null
        },
        loading: false
    };

    tabChange = (v) => {
        this.setState({tabIndex: v});
    };

    // Watches for input element onchange event to send values to particular state properties
    watchText = (prop) => {
        return event => {
            event.persist();
            this.setState(state => {
                state['product'][prop] = event.target.value;
                return state
            })
        }
    };

    selectMainImage = (url) => {
        this.setState(state => {
            state.product.mainImageLink = url;
            state.product.image = url;
            return state
        })
    };

    updateProduct = () => {
        let {product, mainProductObj} = this.state;
        let {match: {params}} = this.props;
        this.setState({saveingProduct: true, loading: true});
        axios
            .put(
                `${APIURL}/store/${this.context.store.id}/product/${params.product}`,
                this.state.product,
                {
                    headers: {
                        "X-auth-license": this.context.store.token
                    }
                }
            ).then(v => {
            this.setState({saveingProduct: false, loading: false});
            this.setState({updated: true});
                setTimeout(() => {
                    this.setState({ updated: false })
                }, 2000);
                this.loadProduct(params.product)

            }).catch(v => console.log(v))

    };


    save = event => {
        this.setState({saveingProduct: true});
        axios
            .post(
                `${APIURL}/store/${this.context.store.id}/product`,
                this.state.product,
                {
                    headers: {
                        "X-auth-license": this.context.store.token
                    }
                }
            ).then(v => {
                //After saveing product reload with product id
            this.setState({saveingProduct: false});
                window.location.replace(`/stores/${this.context.store.id}/products`)
            })
    };


    loadProduct = async (productID) => {
        let product = await axios.get(`${APIURL}/store/${this.context.store.id}/product/${productID}`);
        if (product.data) {
            this.setState({product: product.data, mainProductObj: product.data});
            return true
        }
        return false

    };

    watchBrand = (value) => {
        this.setState(state => {
            state.product.brand = value;
            return state
        })
    };

    watchTags = (event) => {
        event.persist();
        let arr = event.target.value.split(" ");
        this.setState(state => {
            state.product.tags = arr;
            return state
        })
    };

    watchCategory = (cat) => {
        this.setState(state => {
            state.product.categories = cat;
            return state;
        })
    };

    componentDidMount() {
        let {match: {params}} = this.props;
        if (params.product == "new") {
            this.setState({ isNewProduct: true })
            // Init new product
        } else {
            this.loadProduct(params.product).then(v => {
                if (v) {
                    this.setState({ productID: params.product })
                } else {
                    // could not load product and error occured somewhere maybe in the network.
                }
            });
            this.setState({ productID: params.product })
            //load product
        }
    }

    render() {
        let {tabIndex, loading} = this.state;

        let {classes} = this.props;
        return (
            <>
                {loading ? <LinearProgress/> : ""}
                <div style={{margin: "4px 0px"}}></div>
                <Grid container justify={"center"} style={{background: ""}}>
                    <Grid item xs={10}>
                        <Grid container>
                            <Grid item xs={12} style={{ display: "flex", justifyContent: "space-between" }}>
                                <div></div>
                                <Button onClick={this.state.isNewProduct ? this.save : this.updateProduct}> {this.state.isNewProduct ? "Save" : "Update"} </Button>
                            </Grid>
                            <Grid item xs={10} style={{}}>
                                <Tabs value={0} >
                                    <Tab label={"General"} />
                                    <Tab label={"Event"} />
                                    <Tab label={"Advanced"} />
                                    <Tab label={"Settings"} />
                                </Tabs>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container justify={"center"}>
                    <Grid item xs={11}>

                        <GeneralTab classes={classes} product={this.state.product}
                                    watchText={this.watchText}
                                    brandChange={this.watchBrand}
                                    categoryChange={this.watchCategory}
                                    tagsChange={this.watchTags}
                                    selectMainImage={this.selectMainImage}
                                    brands={[1, 2, 3, 4]}
                        />

                    </Grid>
                </Grid>
            </>

        )
    }
}

export default withStyles(styles)(Component);