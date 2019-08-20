import React from "react";
import { Drawer, AppBar, Toolbar, IconButton, Grid} from "@material-ui/core";
import {Menu} from "@material-ui/icons"
import withStyles from "@material-ui/core/styles/withStyles";
const width= 225;
let styles = theme => ({
    rootArea:{
        margin:0,
        padding:0,
        marginTop:"70px",
        [theme.breakpoints.up("sm")]:{
            width:`calc(100% - ${width}px)`,
            float:"right"
        },
        [theme.breakpoints.down("sm")]:{
          float:"none",
          width:"100%"
         }
    }
})

class AppContentArea extends React.Component {
    render() {
        let {classes}=this.props;
        return (
            <Grid container className={classes.rootArea}>
                {this.props.children}
            </Grid>
        )
    }
}

export default withStyles(styles)(AppContentArea);