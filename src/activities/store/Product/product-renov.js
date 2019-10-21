import React from "react"
import withStyles from "@material-ui/core/styles/withStyles"
import {APIURL} from "../../../DataSource"
import StoreContext from "../StoreContext"
import {Button, Grid, LinearProgress, Tab, Tabs, Toolbar} from '@material-ui/core';

import SEOTabContent from "./views/ProductSEOTab"

import GeneralTabContent from "./views/ProductGeneralTabContent"

import axios from "axios"

let styles = theme => ({
    imageBox: {
        background: "rgba(233,233,233,.5)",
        width: "140px",
        borderRadius: "4px",
        margin: "0px 12px"
    }
});

class Component extends React.Component {
    static contextType = StoreContext;
    state = {
        tabIndex: 0,
        product: {
            image: null, title: null, caption: null, description: null,
            categories: [], brand: null, sellingPrice: null, costPrice: null,
            available: null, gallery: [], highPrice: null, lowPrice: null
        },
        loading: false
    };

    tabChange = (e, v) => {

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
            ).then(() => {
            this.setState({saveingProduct: false, loading: false});

            this.setState({updated: true});
            setTimeout(() => {
                this.setState({updated: false})
            }, 2000);

            this.loadProduct(params.product)

        }).catch(() => {
        })

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
            window.history.back()
            // window.location.replace(`/products`)
        })
    };

    loadProduct = async (productID) => {
        let product = await axios.get(`${APIURL}/store/${this.context.store.id}/product/${productID}`);
        if (product.data && product.data.success) {

            this.setState({product: product.data.item, mainProductObj: product.data.item});
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
            this.setState({isNewProduct: true})
            // Init new product
        } else {
            this.loadProduct(params.product).then(v => {
                if (v) {
                    this.setState({productID: params.product})
                } else {
                    // could not load product and error occured somewhere maybe in the network.
                }
            });
            this.setState({productID: params.product})
            //load product
        }
    }

    render() {
        let {tabIndex, loading} = this.state;

        let {classes} = this.props;
        return (
            <>
                {loading ? <LinearProgress/> : ""}
                <Toolbar style={{
                    borderBottom: "1px solid blue",
                    paddingTop: 12,
                    display: "flex",
                    justifyContent: "space-between"
                }} variant={"dense"}>
                    <Grid container justify={"space-between"} alignItems={"center"}>
                        <Grid item xs={10} style={{}}>
                            <Tabs value={this.state.tabIndex ? this.state.tabIndex : 0} variant={"scrollable"}
                                  indicatorColor={"primary"} textColor={"primary"} onChange={this.tabChange}>
                                <Tab label={"General"}/>
                                <Tab label={"SEO"}/>
                                <Tab label={"Settings"}/>
                            </Tabs>
                        </Grid>

                        <Grid item style={{display: "flex", justifyContent: "space-between"}}>
                            <div></div>
                            <Button
                                color={"primary"}
                                onClick={this.state.isNewProduct ? this.save : this.updateProduct}> {this.state.isNewProduct ? "Save" : "Update"} </Button>
                        </Grid>

                    </Grid>
                </Toolbar>
                <Grid container justify={"center"}>
                    <Grid item xs={11}>
                        {this.state.tabIndex == 0 ? <GeneralTabContent classes={classes} product={this.state.product}
                                                                watchText={this.watchText}
                                                                brandChange={this.watchBrand}
                                                                categoryChange={this.watchCategory}
                                                                tagsChange={this.watchTags}
                                                                selectMainImage={this.selectMainImage}
                                                                brands={[1, 2, 3, 4]}
                        /> : ""}
                        {this.state.tabIndex == 1 ? <SEOTabContent  product={this.state.product} /> : ""}
                    </Grid>
                </Grid>
            </>

        )
    }
}

export default withStyles(styles)(Component);