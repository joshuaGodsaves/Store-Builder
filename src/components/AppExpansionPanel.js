import React from "react"
import { ExpansionPanel,ExpansionPanelSummary, ExpansionPanelDetails} from "@material-ui/core"

import withStyles from "@material-ui/core/styles/withStyles"


let styles = (theme)=> ({
    summaryRoot: {

    }, detailsRoot:{

    }, 
    root:{
        background:"rgba(0,0,0,.2)",
        borderBottom:"1px solid blue"
    }
}) 

function Component(props) {

    let { classes,  details, summary} = props
  
    return (
        <ExpansionPanel elevation={0} className={classes.root}>
            <ExpansionPanelSummary>
                {summary}
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                {details}
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}


export default withStyles(styles)(Component)