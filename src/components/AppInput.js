import React from "react"
import withStyles from "@material-ui/core/styles/withStyles"
import {} from "@material-ui/icons"
import { FormControl, InputBase, FormLabel } from "@material-ui/core"

let styles = theme => ({
    inputRoot: {
        padding: "12px 12px",
        background: "rgba(0,0,0,.1)",
        borderRadius: "5px",
        borderBottom: "1px solid blue"
    },
    rootForm: {
        margin: "12px 0px"
    }
})

class AppInput extends React.Component {
    render() {
        let { classes, onChange, label, value } = this.props
        value = value || ""
        return (
            <FormControl fullWidth className={classes.rootForm}>
                <FormLabel>{label}</FormLabel>
                <InputBase classes={{ input: classes.inputRoot }} onChange={onChange} value={value}/>
            </FormControl>
        )

    }
}

export default withStyles(styles)(AppInput);