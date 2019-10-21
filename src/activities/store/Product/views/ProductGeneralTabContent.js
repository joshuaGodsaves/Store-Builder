import withStyles from "@material-ui/core/styles/withStyles"

import React from "react";
import Context from "../../../../AppContext";
import {
    Avatar,
    Button,
    Chip,
    Grid,
    IconButton,
    LinearProgress,
    Menu,
    MenuItem,
    Typography
} from "@material-ui/core";
import CategoryLite from "../../components/CategoryLite";
import AppPaper from "../../../../components/AppPaper";
import AppInput from "../../../../components/AppInput";
import FileUploader from "../../components/FileUpload";
import {FaTag} from "react-icons/fa"
import {AddAPhoto, ArrowDropDown, BrandingWatermark, TagFaces} from "@material-ui/icons";

const styles = theme => ({
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
        brandOpen: false,
        typeAnchorEl: false,
        uploading: false
    };

    openBrand = (e) => {
        e.persist();
        this.setState({brandOpen: true});
    };

    brandChange = (v) => {
        this.props.brandChange(v);
        this.setState({brandOpen: false});
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
        console.log(product)

        let {brandSelectorAnchorEl, typeAnchorEl} = this.state;

        let {classes, product, categoryChange, tagsChange, watchText, selectMainImage, brandChange, brands} = this.props;

        const productTypeMenu = (
            <Menu anchorEl={typeAnchorEl} open={typeAnchorEl ? true : typeAnchorEl} onClose={this.closeType}>
                <MenuItem onClick={this.closeType}>Type 1</MenuItem>
                <MenuItem onClick={this.closeType}>Type 2</MenuItem>
            </Menu>
        );
        return (
            <>
                {this.state.categoryOpen ? (
                    <CategoryLite open={true}
                                  type={"product"}
                                  categories={product.categories}
                                  closeCategorySelector={this.categoryChange}/>
                ) : ""}

                {this.state.brandOpen ? (
                    <CategoryLite open={true}
                                  type={"brand"}
                                  single={true}
                                  categories={product.brand ?  product.brand : ""}
                                  closeCategorySelector={this.brandChange}/>
                ) : ""}

                <AppPaper nomargin title={"Basic details"}>
                    <Grid container alignContent={"stretch"} spacing={16}>
                        <Grid item xs={6} style={{margin: "12px 0px"}}>
                            <div>
                                <AppInput label={"Product name"} onChange={watchText("title")} value={product.title}/>
                                <AppInput label={"Product caption"} onChange={watchText("caption")}
                                          value={product.caption}/>
                                <Grid container spacing={8}>
                                    <Grid item xs={6}>
                                        <AppInput label={"Cost price"} onChange={watchText("costPrice")}
                                                  value={product.costPrice}/>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <AppInput label={"Selling price"} onChange={watchText("sellingPrice")}
                                                  value={product.sellingPrice}/>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                        <Grid item xs={6} style={{margin: "16px 0px"}}>

                            <Grid container justify={"center"} alignItems={"center"} alignContent={"center"}
                                  style={{height: "100%", borderRadius: 10, background: "rgba(0,0,0,.6)"}}>
                                <Grid item>
                                    {this.state.uploading ? <LinearProgress style={{zIndex: 2000}}/> : ""}
                                    {/*  */}
                                    <FileUploader
                                        onError={() => {
                                        }}
                                        onUploading={this.uploading}
                                        onFinish={(v) => {
                                            this.setState({uploading: false});
                                            alert("ok");
                                            selectMainImage(v)
                                        }}/>
                                    <img src={product.image} style={{height: "100%"}}/>
                                    <IconButton style={{color: 'white'}} onClick={() => {
                                        document.getElementById("fileSelectorElement").click()
                                    }}>
                                        <AddAPhoto/>
                                    </IconButton>
                                </Grid>
                            </Grid>
                            <div>
                            </div>

                        </Grid>
                    </Grid>
                </AppPaper>

                <Grid container alignContent={"stretch"} spacing={16}>
                    <Grid item xs={6} style={{margin: "16px 0px"}}>
                        <AppPaper nomargin title={"Basic classification"}>
                            <div>
                                <div style={{marginBottom: 12, background: "ghostwhite", minHeight: 80}}>
                                    {product.categories.map(v => {
                                            return (<Chip label="Category name" style={{margin: "8px 8px"}}/>)
                                    })}
                                </div>
                                <div>
                                    <Button onClick={this.openCategory} variant={"raised"} color="primary" size="medium"
                                            style={{marginRight: 12}}>
                                        Main Category
                                    </Button>
                                    <Button onClick={this.openCategory} variant={"raised"} color="primary"
                                            size="medium">
                                        Add Category
                                    </Button>
                                </div>
                            </div>
                            <Grid container style={{marginTop: "12px"}} spacing={8} direction={"column"}>
                                <AppInput  label={"Product brand"}
                                          value={product.brand}
                                          startAdornment={<BrandingWatermark/>}
                                          endAdornment={<Button variant={"raised"} size={"medium"} color={"primary"}
                                                                onClick={this.openBrand}>Brand <ArrowDropDown/></Button>}/>
                            </Grid>
                            <AppInput label={"Tags"} nomargin onChange={tagsChange}
                                      startAdornment={<FaTag style={{color: "gray"}}/>}
                                      value={product.tags ? product.tags.join(" ") : ""}/>
                        </AppPaper>
                    </Grid>
                    <Grid item xs={6} style={{margin: "16px 0px"}} hidden>
                        <AppPaper nomargin>
                        </AppPaper>
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item sm={12}>
                        <AppPaper title={"Related Products"} actions={<Button variant={"contained"}
                                                                              color={"primary"}
                                                                              size={"medium"}> Add </Button>}/>
                    </Grid>
                </Grid>
            </>
        )

    }
}

export default withStyles(styles)(GeneralTab)
