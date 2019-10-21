import React from "react";
import {} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles"
import {StoreContext} from "../../StoreContext";
import {APPPaper} from "../../../../components/AppPaper"

let styles = {

}

export class _GeneralStoreDataComponent{

    static contextType = StoreContext;

    render (){
        return (
            <div style={{background:"red"}}>
                <APPPaper>

                </APPPaper>
            </div>
        );
    }

}


export const UIStoreDataComponent= withStyles(styles)(_GeneralStoreDataComponent)