import React from "react"
import withStyles from "@material-ui/core/styles/withStyles";

import {Grid} from "@material-ui/core";

let styles= theme=>({
    root:{
        background: "ghostwhite",
        [theme.breakpoints.up("sm")]:{
            minHeight: 200
        },
        [theme.breakpoints.down("sm")]:{
            minHeight: 120
        }
    }
});

class PageToolBarContainer extends React.Component{

    render(){
        let {classes}= this.props
        return(
            <>
                <Grid container className={classes.root} alignContent={"flex-end"}>
                    <Grid item sm={12}>
                        {/* <AppBar position={"relative"}>
                            <Toolbar variant={"dense"}> */}
                                {this.props.children}
                            {/* </Toolbar>
                        </AppBar> */}
                    </Grid>
                </Grid>
            </>
        )
    }
}


export default withStyles(styles)(PageToolBarContainer)