import React from "react"
import {
    ExpansionPanel, ExpansionPanelActions, ExpansionPanelSummary, ExpansionPanelDetails
} from "@material-ui/core"
import {
    ArrowDownward
} from "@material-ui/icons"

export default class Component extends React.Component{

    render(){
        let {content, actions, header}= this.props

        return (
            <ExpansionPanel >
                <ExpansionPanelSummary expandIcon={<ArrowDownward/>}  style={{background:"ghostwhite"}}>
                    {header}
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    {content}
                </ExpansionPanelDetails>
                <ExpansionPanelActions style={{alignItems:"center"}}>
                    {actions}        
                </ExpansionPanelActions>  
            </ExpansionPanel>
        )
        
    }
}