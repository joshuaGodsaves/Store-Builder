import React from "react"
import withStyles from "@material-ui/core/styles/withStyles"
import {Avatar, Button, Grid, IconButton, Paper, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import {MoreHoriz} from "@material-ui/icons";
import StoreContext from "../../StoreContext";
import DataSource from "../../../../DataSource";

let styles = {};

class Component extends React.Component {

    static contextType = StoreContext;

    componentWillMount() {
        this.dataSource = new DataSource(this.context.store.token, this.context.store.id);
    }

    state = {
        loading: false,
        loaded: false,
        categories: []
    };

    componentDidMount() {
        this.dataSource.getStoreCategories({type: "product"}).then(v => {
            let categories = v;
            this.setState({categories: categories});
            this.setState({loaded: true});
            this.setState({loading: false})
        }).catch(v => {
            console.log(v);
        });
        this.setState({loading: true})
    }

    render() {

        return (<React.Fragment>
            <Grid container justify={"center"}>
                <Grid item xs={12} sm={10}>
                    <Grid container justify={"flex-end"} style={{margin: "8px 0px"}}>
                        <Grid item>
                            <Button disabled>
                                Bulk Add
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button component={Link}
                                    variant={"contained"}
                                    color={"primary"}
                                    size={"medium"}
                                    to={`/categories/new?type=product`}>
                                New Category
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container spacing={8}>
                        {this.state.categories.map((category, i) => (
                            <Grid item xs={12} md={6} style={{margin: "8px 0px"}}>
                                <Paper elevation={1}>
                                    <Grid container alignItems={"center"} justify={"space-between"} spacing={8}>
                                        <Grid item style={{display: "flex"}} xs={8}>
                                            <div style={{display: "flex", alignItems: "center", paddingLeft: 12}}>
                                                <Avatar src={category.image}/>
                                                <div style={{margin: "0px 12px"}}>
                                                    <Typography>
                                                        {category.title}
                                                    </Typography>
                                                    <Typography variant={"caption"}>Label</Typography>
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid item>
                                            {/*<Typography> For Products</Typography>*/}
                                        </Grid>
                                        <Grid item>
                                            <IconButton component={Link}
                                                        color={"primary"}
                                                        to={`/categories/${category._id}`}><MoreHoriz/></IconButton>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>);
    }
}


export default withStyles(styles)(Component)