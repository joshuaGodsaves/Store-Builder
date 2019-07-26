import React from "react"
import withStyles from "@material-ui/core/styles/withStyles"
import {FormControl, OutlinedInput, FormLabel} from "@material-ui/core"

let styles={

}
class TempInputContainer extends React.Component{

    constructor(props){
        super(props)
    }
    render(){
        let {onChange, label, value}= this.props
        return (
            <FormControl fullWidth style={{margin:"12px 0px"}}> 
                <FormLabel>{label}</FormLabel>
                <OutlinedInput onChange={onChange} value={value}/>
            </FormControl>
        )
    }
}

export const ProductInputContainer = withStyles(styles)(TempInputContainer)

