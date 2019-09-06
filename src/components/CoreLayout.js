import React from "react";
import AppDrawer from "./AppDrawer"
import AppPrimaryMenu from "./AppPrimaryMenu"
import AppContentArea from "./AppContentArea"
import { Drawer, AppBar, Toolbar, IconButton, Grid } from "@material-ui/core";
import { Menu } from "@material-ui/icons"
import withStyles from "@material-ui/core/styles/withStyles";
const width = 225;
let styles = theme => ({
    rootArea: {
        margin: 0,
        padding: 0,
        marginTop: "70px",
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${width}px)`,
            float: "right"
        },
        [theme.breakpoints.down("sm")]: {
            float: "none",
            width: "100%"
        }
    }
})

class CoreLayout extends React.Component {
    state={
        drawerOpen: false
    }

    
    drawerOpener= ()=> {    
        this.setState(state=>{
            state.drawerOpen= !state.drawerOpen; return state;
        });
    }

    render() {
        let { classes, content, drawerItems } = this.props;
        return (
            <React.Fragment>
                <AppPrimaryMenu drawerOpener={this.drawerOpener} >

                </AppPrimaryMenu>

                <AppDrawer onClose={this.drawerOpener} open={this.state.drawerOpen}>
                    {drawerItems}
                </AppDrawer>

                <AppContentArea>
                    {content}
                </AppContentArea>
            </React.Fragment>

        )
    }
}


export default withStyles(styles)(CoreLayout);