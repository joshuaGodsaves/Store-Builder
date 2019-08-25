import React from "react"
import withStyles from "@material-ui/core/styles/withStyles"
import { AddAPhoto, TagFaces } from "@material-ui/icons"
import { APIURL } from "../../../DataSource"
import StoreContext from "../StoreContext"
import {
    ButtonBase, Avatar, TextField,    MenuItem,                                   
    Tabs, Tab, Button, Grid, GridList, GridListTile, IconButton, GridListTileBar
} from "@material-ui/core"
import Context from "../../../AppContext"
import AppInput from "../../../components/AppInput"
import AppPaper from "../../../components/AppPaper"
import AppExpansionPanel from "../../../components/AppExpansionPanel"
import CategoryLite from '../components/CategoryLite'
import FileUploader from "../components/FileUpload"
import axios from "axios"

let styles = theme => ({
    imageBox: {
        background: "rgba(233,233,233,.5)",
        width: "140px",
        borderRadius: "4px",
        margin: "0px 12px"
    }
})


class GeneralTab extends React.Component {

    static contextType = Context

    state = {
        categoryOpen: false
    }

    render() {
        let { classes } = this.props

        let { product, brandChange, categoryChange, tagsChange, watchText, selectMainImage , openCategory } = this.props

        let CategoryLite = (
            <CategoryLite open={this.state.categoryOpen}
                categories={product.categories.length ? this.state.product.categories : []}
                closeCategorySelector={this.categoryChange} />
        )

        return (
            <>
                {categoryChange ? CategoryLite : "" }
                <AppPaper>
                    <Grid container alignContent={"stretch"} spacing={16}>
                        <Grid item xs={6} style={{ margin: "16px 0px" }}>
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


                                        {/*  */}
                                        <FileUploader
                                            onError={() => { }}
                                            onFinish={selectMainImage} />

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
                        <AppPaper nomargin>
                            <div>
                                <div style={{ height: 40, background: "gold", marginBottom: 12 }}>
                                    <TextField select variant={"outlined"} value={"Product category"}>
                                        {[1,2,2,4,5].map(v=>(
                                            <MenuItem key={v} value={v}>Option {v} </MenuItem>
                                        ))}
                                    </TextField>
                                </div>  
                                <div>

                                    <Button>Product category</Button>
                                </div>
                            </div>
                            <Grid container style={{ marginTop: "12px" }}>
                                <Grid item xs={6}>
                                    <ButtonBase style={{ padding: "4px 12px", borderRadius: 4, background: "rgba(0,0,0,.2)" }}>
                                        Brand <Avatar style={{ margin: "0px 12px" }} />
                                    </ButtonBase>
                                </Grid>
                                <Grid item xs={6}>
                                    <ButtonBase>
                                    </ButtonBase>
                                </Grid>
                            </Grid>

                            <AppInput label={"Tags"} nomargin />

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

    static contextType = StoreContext


    state = {
        tabIndex: 0
    }

    tabChange = (v) => {
        this.setState({ tabIndex: v });
    }


    state = {
        product: {
            image: null, title: null, caption: null, description: null,
            categories: [], brand: null, sellingPrice: null, costPrice: null,
            available: null, gallery: [], highPrice: null, lowPrice: null
        }
    }

    // Watches for input element onchange event to send values to particular state properties
    watchText = (prop) => {
        return event => {
            event.persist();
            this.setState(state => {
                state['product'][prop] = event.target.value;
                return state
            })
        }
    }

    saveCategory = (categories) => {
        this.setState(state => { state.product.categories = categories; state.openCategory = false; return state })
    }


    openCategory = () => {
        this.setState({ openCategory: true })
    }

    selectMainImage = (url) => {
        this.setState(state => {
            state.product.mainImageLink = url
            state.product.image = url
            return state
        })
    }

    updateProduct = () => {
        let { product, mainProductObj } = this.state
        let { match: { params } } = this.props
        this.setState({ saveingProduct: true })
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
                this.setState({ saveingProduct: false })
                this.setState({ updated: true })
                setTimeout(() => {
                    this.setState({ updated: false })
                }, 2000)
                this.loadProduct(params.product)

            }).catch(v => console.log(v))

    };


    save = event => {
        this.setState({ saveingProduct: true })
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
                this.setState({ saveingProduct: false })
                window.location.replace(`/stores/${this.context.store.id}/products`)
            })
    };


    loadProduct = async (productID) => {
        let product = await axios.get(`${APIURL}/store/${this.context.store.id}/product/${productID}`)
        if (product.data) {
            this.setState({ product: product.data, mainProductObj: product.data })
            return true
        }
        return false

    }
    componentDidMount() {
        let { match: { params } } = this.props
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
            })
            this.setState({ productID: params.product })
            //load product
        }
    }

    render() {
        let { tabIndex } = this.state

        let { classes } = this.props
        return (
            <>
                <Grid container justify={"center"} style={{ background: "darkblue" }}>
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
                            brandChange={null}
                            categoryChange={null}
                            tagsChange={null}
                            selectMainImage={this.selectMainImage}
                        />

                    </Grid>
                </Grid>
            </>

        )
    }
}

export default withStyles(styles)(Component);