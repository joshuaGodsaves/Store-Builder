import React from "react"
import withStyles from "@material-ui/core/styles/withStyles";

import {Grid, Paper, Typography} from "@material-ui/core";

let styles= {
    root:{

    },
    labelRoot:{
        padding: "12px",
        background:"ghostwhite",
        fontSize:"bold"
    },
    contentRoot: {
        padding: "12px"
    }
};

class Component extends React.Component{

  
    render(){
        let {classes}= this.props
    
        return(
            <>
              <Paper>
                <div className={classes.labelRoot}>
                    <Typography>{"Alert"} </Typography>
                </div>
                <div className={classes.contentRoot}>
                    {this.props.children}
                </div>
              </Paper>
            </>
        )
    }
}

export default withStyles(styles)(Component)