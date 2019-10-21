import React from "react"
import withStyles from "@material-ui/core/styles/withStyles"
import {} from "@material-ui/icons"
import { FormControl, InputBase, FormLabel, OutlinedInput } from "@material-ui/core"

let styles = theme => ({
    inputRoot: {
        padding:"12px 0px",
        paddingLeft:8
    },
    startAd:{
        paddingRight:12
    },
    rootForm: {
        margin: "12px 0px"
    }
})

class AppInput extends React.Component {
    render() {
        let { classes, onChange, label, value, multiline, startAdornment , disabled, endAdornment ,noFull, type} = this.props
        value = value || "";
        return (
            <FormControl fullWidth={noFull == true ? false: true } className={classes.rootForm}>
                <FormLabel>{label}</FormLabel>
                <OutlinedInput
                    type={type? type: "text"}
                    endAdornment={endAdornment? endAdornment : false}
                    disabled={disabled}
                    style={{}}
                    classes={{input: classes.inputRoot, inputAdornedStart: classes.startAd, adornedStart: classes.startAd}}
                           onChange={onChange} value={value} multiline={multiline? true : false} rows={2}
                startAdornment={startAdornment ? startAdornment : false}/>
            </FormControl>
        )
    }
}

export default withStyles(styles)(AppInput);