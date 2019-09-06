import React from "react";
import {AppBar, Drawer, Toolbar} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";

const width= 225;

let styles = theme => ({
    rootDrawer:{
        width: `${width}px`,
        [theme.breakpoints.up("sm")]:{
        },
        [theme.breakpoints.down("sm")]:{
            width: 0
         }
    },
    drawerOpen: {
        width: `${width}px`,
        [theme.breakpoints.up("sm")]:{

        },
        [theme.breakpoints.down("sm")]:{
            width: "225px"
         }
    },
    drawerClose:{
        [theme.breakpoints.up("sm")]:{
            width: `${width}px`
        },
        [theme.breakpoints.down("sm")]:{
            width: "0px"
         }
    },
    toggler:{
        position:"absolute",
        right:"100%",
        zIndex:"5000"
    }
});

class AppDrawer extends React.Component {

    state= {
        open: false
    };

    closeDrawer=()=> {
        this.setState({close:false});
    };

    openDrawer=()=>{
        this.setState({close:true});
    };

    componentDidMount(){
        let props= this.props;
        var ch= props.triggerOpen ? props.triggerOpen(this.openDrawer) : "";
        var chc= props.triggerClose ? props.triggerClose(this.closeDrawer) : "";
    }
    
    render() {

        let {classes, open}=this.props;

        return (
            <Drawer classes={{paper: open ? classes.drawerOpen : classes.drawerClose}} variant={"permanent"} 
            open= {this.open}
            onClose={this.closeDrawer}
            >
                <AppBar position={"fixed"}  elevation={0} style={{background:"darkblue"}}>
                    <Toolbar>
                        <div style={{height: "100%", background: 'rgba(0,0,0,.6)'}}>

                        </div>
                    </Toolbar>
                </AppBar>
                <div style={{width:"100%", paddingTop:64, left:0, background:"ghostwhite", overflowY:"auto"}}>
                        {this.props.children}
                </div>
            </Drawer>
        )

    }
}

export default withStyles(styles)(AppDrawer);