import React, {Component} from "react";
import {Link} from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import ListItemIcon from "@material-ui/core/es/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import {
    AccessibleForward,
    AddShoppingCartRounded as AddShoppingCart,
    Business,
    CategorySharp,
    CreditCard,
    Layers,
    PeopleOutline,
    Settings,
    ShowChart
} from "@material-ui/icons";
import StoreContext from "../../StoreContext"

import {List, ListItem, ListSubheader} from "@material-ui/core"

let styles = theme => ({
    rootListItemContainer: {
        color: "",
        borderRadius: 8,
        padding: "8px 12px",
        background: "rgba(0,0,0,.7)",
        margin: "8px 0px"
    },
    listIcon: {
        color: "ghostwhite"
    },
    text:{color:'ghostwhite'}

});

function AppListItem(props) {
    return (
        <ListItem component={Link} to={props.to} className={props.classes.rootListItemContainer}>
            <ListItemIcon className={props.classes.listIcon}>{props.icon}</ListItemIcon>
            <ListItemText style={{color:'ghost'}} classes={{root:props.classes.text}}>{props.label}</ListItemText>
        </ListItem>
    )
}

class App extends Component {
    constructor(props) {
        super(props);
    }

    static contextType = StoreContext;
    render() {
        let {classes} = this.props;
        return (
            <React.Fragment>
                <List style={{
                    justifyContent: "center",
                    padding: "0px 12px",
                    background: "linear-gradient(ghostwhite, white)"
                }}>
                    <List>

                        <AppListItem to={`/Sections`} label={"Section"} icon={<Layers/>} classes={classes}/>

                        <AppListItem to={`/categories`} label={"Categories"} icon={<CategorySharp/>} classes={classes}/>

                        <AppListItem to={`/products`} label={"Products"} icon={<AddShoppingCart/>} classes={classes}/>

                        <AppListItem to={`/orders`} label={"Orders"} icon={<Business/>} classes={classes}/>

                        <AppListItem to={`/customers`} label={"Customers"} icon={<PeopleOutline/>} classes={classes}/>

                    </List>
                    <ListSubheader> Utilities</ListSubheader>
                    <Divider/>
                    <ListItem component={Link} to={`/blog`} disabled>
                        <ListItemIcon>
                            <ShowChart/>
                        </ListItemIcon>
                        <ListItemText primary={"Analytics"}/>
                    </ListItem>
                    <ListItem component={Link} to={`/assets`} disabled>
                        <ListItemIcon>
                            <AccessibleForward/>
                        </ListItemIcon>
                        <ListItemText primary={"Outreach"}/>
                    </ListItem>
                    <ListSubheader> Account</ListSubheader>
                    <Divider />
                    <ListItem component={Link} to={`/Settings`}>
                        <ListItemIcon>
                            <CreditCard/>
                        </ListItemIcon>
                        <ListItemText>Billing</ListItemText>
                    </ListItem>
                    <ListItem component={Link} to={`/Settings`}>
                        <ListItemIcon>
                            <Settings/>
                        </ListItemIcon>
                        <ListItemText>Settings</ListItemText>
                    </ListItem>
                </List>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(App);


