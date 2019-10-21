import React from "react"
import {Paper, Typography, Grid, Divider} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles"


let styles = {};

function Component(props) {
    let {classes, children, nomargin, actions} = props;
    nomargin = nomargin ? true : false;
    return (
        <Paper style={{overflow:"hidden"}}>
            <div style={{padding: "12px 16px", background: "ghostwhite"}}>
                <Grid container justify={"space-between"} alignItems={"center"}>
                    <Grid item>
                        <Typography variant={"subheading"}
                                    style={{fontWeight:"bolder", margin:0, padding:0}}
                                    color={"default"}>{props.title}</Typography>
                    </Grid>
                    <Grid item>
                        {actions}
                    </Grid>
                </Grid>
            </div>
            <Divider/>
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

let componet= withStyles(styles)(Component)

export default componet;

export const APPPaper = componet