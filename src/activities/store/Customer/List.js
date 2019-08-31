import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import {Add, Delete, Edit, MoreHoriz} from "@material-ui/icons";
import {Link} from "react-router-dom";
import StoreContext from "../StoreContext"
import {FaMailBulk, FaUserCircle} from "react-icons/fa"
import {MdGroup, MdNotifications} from "react-icons/md"
import {
    Button,
    Card,
    CardActionArea,
    Checkbox,
    Divider,
    Grid,
    IconButton,
    LinearProgress,
    Menu,
    MenuItem,
    Paper,
    Toolbar
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
        createCustomerDrawer: false,
        anchorEl: undefined,
        loading: true,
        loaded: false,
        selected: [],
        customers: [],
        activeCustomer: undefined,
        addedCustomer: false,
        ui: {
            create: {
                anchorEl: null
            }
        }
    };

    constructor(props) {
        super(props)

    }

    selectAll = (event, checked) => {
        if (checked) {
            this.setState(state => {
                state.selected = state.customers.map(v => v._id);
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

    loadCustomers() {
        this.dataSource.getStoreCustomers().then(v => {
            this.setState({loading: false});
            let customers = v.data.items;
            customers.forEach(async (v, i, a) => {
                let customer = v.customer;
                let maguser = await this.dataSource.getUser(customer);
                a[i].user = maguser
            });
            this.setState({customers: customers})
        }).catch(v => {
            console.log(v);
            this.setState({loading: false})
        })

    }

    componentWillMount() {
        this.dataSource = new DataSource(this.context.store.token, this.context.store.id);
        this.loadCustomers()
    }

    openMenu = (customer) => {
        return (event) => {
            this.setState({activeCustomer: customer});
            event.persist();
            this.setState({anchorEl: event.target})
        }
    };

    closeMenu = (event) => {
        event.persist();
        this.setState({anchorEl: null})
    };

    finishNewCustomer = (check) => {
        if (check) {
            this.setState({addedCustomer: true})
        } else {
        }
        this.setState({createCustomerDrawer: false})

    };
    openCreateCustomer = () => {
        this.setState({createCustomerDrawer: true})
    };

    render() {
        let {classes} = this.props;

        let {anchorEl, activeCustomer} = this.state;

        let customerMenu = (
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} id="simple-menu" onClose={this.closeMenu}>
                <MenuItem onClick={this.closeMenu} component={Link}
                          to={`/stores/${this.context.store.id}/customers/${activeCustomer ? activeCustomer._id : "undefined"}`}>View</MenuItem>
                <MenuItem onClick={this.closeMenu}>Delete</MenuItem>
                <MenuItem onClick={this.closeMenu}>Reach</MenuItem>
            </Menu>
        );

        let selectedCategoriesOptionToolBar = (
            <React.Fragment>
                <Toolbar>
                    <div>
                        <IconButton><Delete/></IconButton>
                        <IconButton><Edit/></IconButton>
                        <IconButton><MdGroup/></IconButton>
                        <IconButton><FaMailBulk/></IconButton>
                    </div>
                    <Typography>Bulk Action</Typography>

                </Toolbar>
            </React.Fragment>
        );

        let defaultToolbarArea = (
            <PageToolbarContainer>
                <Grid container justify={"center"}>
                    <Grid item xs={11} sm={10} md={10}>
                        <div style={{margin: "16px 0px"}}>
                            <Typography variant={"h5"} align={"center"}>Customers page</Typography>
                        </div>
                        <div style={{margin: "16px 0px"}}>
                            <Grid container justify={"center"}>
                            </Grid>
                            <Grid container justify={"center"} style={{margin: "12px 0px"}}>
                                <Grid item>
                                    <Button
                                        color={"primary"}

                                        to={`/stores/${this.context.store.id}/customers/new`}
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

        let customersAvailable = (
            <React.Fragment>
                <div style={{overflow: "hidden", color: "white"}}>
                    {defaultToolbarArea}
                </div>
                {/*<Checkbox onChange={this.selectAll} />*/}
                <Grid container style={{margin: "24px 0"}} justify={"flex-start"}>
                    {this.state.customers.map((customer, i) => (
                        <Grid item style={{margin: 8}}>
                            <Card style={{width: 230, background: "ghostwhite", minHeight: 100}}>
                                <Grid container justify={"space-between"} alignContent={"center"} alignItems={"center"}>
                                    <Checkbox
                                        checked={this.state.selected.some(v2 => v2 == customer._id)}
                                        onChange={this.selectSingle(customer._id)}
                                    />
                                    <IconButton>
                                        <MdNotifications style={{fontSize: "inherit"}}/>
                                    </IconButton>
                                    <IconButton onClick={this.openMenu(customer)}><MoreHoriz/></IconButton>
                                </Grid>
                                <Divider/>
                                <CardActionArea>
                                    <Grid container justify={"space-around"} style={{padding: 16, fontSize: 24}}
                                          alignContent={"center"}>
                                        <FaUserCircle style={{fontSize: "inherit"}}/>
                                        <Typography>{customer.customer}</Typography>
                                    </Grid>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </React.Fragment>
        );

        let customersNotAvailable = (
            <Grid container style={{height: "100vh"}} alignItems={"center"} justify={"center"}>
                <Grid item>
                    <Paper style={{padding: "24px"}}>
                        <div align="center">
                            <Typography align={"center"} style={{margin: "16px 0px"}}>
                                You have not created any sections yes.
                            </Typography>
                            <Typography>
                                Whenever a customer registers to you stor, you'll get notified and find them here.
                            </Typography>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        );
        return (
            <React.Fragment>
                {customerMenu}
                {this.state.loading ? <LinearProgress/> :
                    <div style={{height: "100vh", background: '#404040'}}>
                        {this.state.customers.length == 0
                            ? customersNotAvailable
                            : customersAvailable}
                    </div>
                }
            </React.Fragment>
        );
    }
}

let WithStylesTableProductsView = withStyles(styles)(TableProductsView);

export default withStyles(styles)(TableProductsView)
