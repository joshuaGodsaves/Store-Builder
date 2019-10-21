import React from "react"
import withStyles from "@material-ui/core/styles/withStyles"
import {} from "@material-ui/icons"
import { FormControl, InputBase, FormLabel, OutlinedInput,Input, FilledInput} from "@material-ui/core"

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

class _AppInput extends React.Component {
    render() {
        let { classes, onChange, label, value, multiline, startAdornment , disabled, endAdornment ,noFull, type} = this.props
        value = value || "";
        return (
            <FormControl fullWidth={noFull == true ? false: true } className={classes.rootForm}>
                <FormLabel>{label}</FormLabel>
                <FilledInput
                    type={type? type: "text"}
                    endAdornment={endAdornment? endAdornment : false}
                    disabled={disabled}
                    classes={{inputAdornedStart: classes.startAd, adornedStart: classes.startAd}}
                    onChange={onChange} value={value} multiline={multiline? true : false} rows={2}
                    startAdornment={startAdornment ? startAdornment : false}/>
            </FormControl>
        )
    }
}

let component=  withStyles(styles)(_AppInput);

export default component;

export const AppFlatInput= component