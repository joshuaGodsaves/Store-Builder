import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import {Add} from "@material-ui/icons";
import {FaProductHunt} from "react-icons/fa"
import {Link} from "react-router-dom";
import StoreContext from "../StoreContext"
import {
    Button,
    Card,
    CardActionArea,
    CardContent,
    Divider,
    Grid,
    IconButton,
    LinearProgress,
    Paper
} from "@material-ui/core";
import DataSource from "../../../DataSource"
import PageToolbarContainer from "../components/PageToolbarContainer";

let styles = {
    ProductItemRoot: {
        padding: 8
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between"
    }
};

class TableProductsView extends React.Component {
    static contextType = StoreContext;
    dataSource;
    state = {
        loading: false,
        loaded: false,
        selected: [],
        sections: []
    };

    constructor(props) {
        super(props)

    }

    selectAll = (event, checked) => {
        if (checked) {
            this.setState(state => {
                state.selected = state.sections.map(v => v._id);
                return state;
            });
        } else {
            this.setState(state => {
                state.selected = [];
                return state;
            });
        }
    };

    selectSingle = itemKey => {
        return (event, checked) => {
            this.setState(state => {
                if (checked) {
                    //push
                    state.selected.push(itemKey)
                } else {
                    //Pull out
                    state.selected = state.selected.filter(v => v != itemKey)
                }
                return state;
            });
        };
    };

    componentWillMount() {
        this.dataSource = new DataSource(this.context.store.token, this.context.store.id)

    }

    componentDidMount() {

        this.setState({loading: true})
        
        this.dataSource.getStoreSections().then(v => {
            this.setState({sections: v});
            this.setState({loaded: true, loading: false});
        }).catch(v => {
            console.log(v);
        });

        
    }

    render() {
        let {classes} = this.props;

        let defaultToolbarArea = (
            <PageToolbarContainer>
                <Grid container justify={"center"}>
                    <Grid item xs={11} sm={10} md={10}>
                        <div style={{margin: "16px 0px"}}>
                            <Typography variant={"h5"} align={"center"}>Sections Page</Typography>
                        </div>
                        <div style={{margin: "16px 0px"}}>
                            <Grid container justify={"center"}>
                            </Grid>
                            <Grid container justify={"center"} style={{margin: "12px 0px"}}>
                                <Grid item>
                                    <Button
                                        color={"primary"}
                                        to={`/sections/new`}
                                        component={Link}>
                                        <Add/>
                                        CREATE
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </PageToolbarContainer>
        );

        let sectionsAvailable = (
            <React.Fragment>
                {defaultToolbarArea}
                <Grid container justify={"center"} style={{margin: "12px 0px "}}>
                    <Grid item xs={10}>
                        <Grid container spacing={8}>
                            {this.state.sections.map((section, i) => (
                                <Grid item xs={11} md={6} lg={4}>
                                    <Card>
                                        <CardContent>
                                            <div style={{minHeight: 180, background: "url()"}}>
                                                <div>
                                                    <IconButton>
                                                        <FaProductHunt/>
                                                    </IconButton>
                                                    {section.label}
                                                </div>
                                            </div>
                                        </CardContent>
                                        <Divider/>
                                        <CardActionArea
                                            style={{padding: 16, display: "flex", justifyContent: "space-between"}}
                                            component={Link}
                                            to={`/sections/${section._id}`}>
                                            <div>
                                                View/ Edit
                                            </div>
                                            <div>
                                            </div>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </React.Fragment>
        );

        let sectionsNotAvailable = (
            <Grid container style={{height: "100vh"}} alignItems={"center"} justify={"center"}>
                <Grid item>
                    <Paper style={{padding: "24px"}}>
                        <div align="center">
                            <Typography align={"center"} style={{margin: "16px 0px"}}>
                                You have not created any sections yes.
                            </Typography>
                            <Button to={`/sections/new`} component={Link} style={{margin: "16px 0px"}}>
                                <Add/> CREATE
                            </Button>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        );
        return (
            <React.Fragment>
                {this.state.loading ? <LinearProgress/> :   
                    <div style={{height: "100vh"}}>
                        {this.state.sections.length == 0
                            ? sectionsNotAvailable
                            : sectionsAvailable}
                    </div>
                }

            </React.Fragment>
        );
    }
}

let WithStylesTableProductsView = withStyles(styles)(TableProductsView);


export default withStyles(styles)(TableProductsView)
