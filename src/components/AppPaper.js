import React from "react"
import {Paper, Typography} from "@material-ui/core"
import withStyles from "@material-ui/core/styles/withStyles"


let styles = {};

function Component(props) {

    let {classes, children, nomargin} = props;
    nomargin = nomargin ? true : false;
    return (
        <Paper>
            <div style={{padding: "12px 16px", background: "ghostwhite"}}>
                <Typography variant={"subheading"}>{props.title}</Typography>
            </div>
            <div style={{
                margin: nomargin ? "" : "12px 0px",
                background: "white",
                padding: "12px 16px",
                borderRadius: 0,
                paddingTop: 6
            }}>
            {children}
            </div>
        </Paper>
    )
}


export default withStyles(styles)(Component)