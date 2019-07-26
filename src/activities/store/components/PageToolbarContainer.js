import React from "react"
import withStyles from "@material-ui/core/styles/withStyles"
import {Toolbar} from "@material-ui/core"
let styles= {

}
class PageToolBarContainer extends React.Component{

    render(){
        return(
            <>
                <Toolbar  style={{borderBottom:"2px solid blue"}} variant={"dense"}>
                    {this.props.children}
                </Toolbar>
            </>
        )
    }
}


export default withStyles(styles)(PageToolBarContainer)