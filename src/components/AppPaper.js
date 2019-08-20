import React from "react"
import { Paper } from "@material-ui/core"
import withStyles from "@material-ui/core/styles/withStyles"


let styles = {

}

function Component(props) {

    let { classes, children, nomargin } = props
    nomargin = nomargin ? true : false
    return (
        <Paper style={{ margin: nomargin ? "":"12px 0px", background: "white", padding: "12px 16px", borderRadius: 0 }}>
            {children}
        </Paper>
    )
}


export default withStyles(styles)(Component)