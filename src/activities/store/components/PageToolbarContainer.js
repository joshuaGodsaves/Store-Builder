import React from "react"
import withStyles from "@material-ui/core/styles/withStyles";

import {Toolbar, Grid, AppBar} from "@material-ui/core";

let styles= {

}

class PageToolBarContainer extends React.Component{

    render(){
        return(
            <>
                <Grid container style={{
                    height: "200px", background: "darkblue"
                }} alignContent={"flex-end"}>
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