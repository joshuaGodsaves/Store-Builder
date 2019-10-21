import React from "react";
import {Grid, Paper, Typography} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles"
import {StoreContext} from "../../StoreContext";
import {APPPaper} from "../../../../components/AppPaper"

let styles = {
}

export class _GeneralStoreDataComponent extends React.Component{
    static contextType = StoreContext;
    render (){
        return (
            <Grid container alignContent="center">
                <Grid item lg={10}>
                    <APPPaper title="Account">
                        <Typography></Typography>
                    </APPPaper>
                </Grid>
            </Grid>
        );
    }

}


export const AccountComponent= withStyles(styles)(_GeneralStoreDataComponent)