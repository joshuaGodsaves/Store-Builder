import React from "react";
import {} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles"
import {AppFlatInput} from "../../../../components/AppFlatInput";
import {StoreContext} from "../../StoreContext";
import {APPPaper} from "../../../../components/AppPaper"
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

let styles = {

}

export class _GeneralStoreDataComponent extends React.Component{

    static contextType = StoreContext;

    constructor(props) {
        super(props);
    }

    render (){
        return (
           <div style={{marginTop:"24px"}}>
              <div>
                 <Grid container justify={"center"}>
                    <Grid item lg={10}>
                        <Grid container alignItems={"center"}>
                            <Grid item xs={12} style={{padding:12, background:"ghostwhite"}}>
                                <Grid container justify={"space-between"} alignItems={"center"}>
                                    <Typography style={{fontWeight:"bold"}}>  Generals </Typography>
                                    <Button size={"medium"}>Update</Button>
                                </Grid>
                            </Grid>

                            <Grid item lg={7}>
                                <Grid container>
                                    <Grid item  xs={12} >
                                        <AppFlatInput label="Label"/>
                                    </Grid>
                                    <Grid item  xs={12} >

                                        <AppFlatInput label/>

                                    </Grid>
                                    <Grid item xs={12} >

                                        <AppFlatInput label/>

                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                 </Grid>
              </div>
           </div>
        );
    }
}


export const GeneralStoreDataComponent= withStyles(styles)(_GeneralStoreDataComponent)