import React from "react"
import {
    Avatar,
    Button,
    ButtonBase,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    Divider,
    Grid,
    InputBase,
    List,
    ListItem,
    Typography
} from "@material-ui/core"
import DataSource from "../../../DataSource";
import StoreContext from "../StoreContext"

export default class Component extends React.Component{

    static contextType = StoreContext;

    state= {
        newCategory: undefined,
        createCategory: false,
        selected: [],
        categories: []
    };

    onSelected= (id)=>{
        return ()=>{

            if(this.props.single){

                this.state.categories.forEach(v=>{
                    if(v._id==id){
                        this.props.closeCategorySelector(v.title)
                    }
                })
                return

            }

            let check = this.state.selected.some(v => v == id);
            if(check){
                let filtered = this.state.selected.filter(v => v != id);
                this.setState({selected: filtered})
            }else{
                this.setState(state=>
                {
                    state.selected.push(id);
                    return state
                })
            }
        }
    };
    onFinish= ()=>{
        this.props.closeCategorySelector(this.state.selected)
    };
    componentWillMount() {
        let open = this.props.open;
        let selectedCategories = this.props.categories;
        if(selectedCategories.push !== true){
            let temp= selectedCategories;
            selectedCategories= [temp]
        }
        this.setState({open: open, selected: selectedCategories})
    }

    componentDidMount() {
        this.dataSource = new DataSource(this.context.store.token, this.context.store.id);

        this.loadCategories(this.props.type);
    }

    createCategory= ()=>{
    this.setState({createCategory: !this.state.createCategory})
    };

    saveCategory= async  ()=>{
        let newCategory = await this.dataSource.postStoreCategory({title: this.state.newCategory, type: this.props.type });
        if(newCategory){
            this.setState({newCategory: "", createCategory: false});
            this.loadCategories(this.props.type)
        }
    };
    watch= (e)=>{
        e.persist();
        this.setState({newCategory: e.target.value})
    };

    loadCategories = (type) => {
        this.dataSource.getStoreCategories({type:type}).then(v=>{
            this.setState({categories: v, loading: false})
        }).catch(v => console.log(v));
        this.setState({loading: true})
    };

    render(){
        let newCategoryComponent= (
            <Grid container style={{padding:8}} alignItems={"center"} justify={"center"} hidden>
                <Grid item style={{margin:"0px 8px"}}>
                    <InputBase placeholder={"Category Name"}
                               style={{padding:"4px 8px", background:"rgba(1,1,1,.3)", borderRadius:2}}
                               onChange={this.watch}
                               value={this.state.newCategory}/>
                </Grid>
                <Grid item >
                    <Button size={"small"} color={"primary"} onClick={this.saveCategory}>Save</Button>
                </Grid>
            </Grid>
        );

        return (
            <Dialog open={this.state.open} maxWidth={"xs"} fullWidth style={{zIndex:10000}}>
                <DialogActions style={{padding:0,margin:0, flexDirection:"column"}} >
                    <Grid container alignItems={"center"} justify={"space-between"} style={{padding:8,background:"ghostwhite"}}>
                        <Grid item style={{margin:"0px 8px"}}>Categories</Grid>
                        <Grid item >
                            <Button size={"small"} onClick={this.createCategory}>New</Button>
                        </Grid>
                    </Grid>
                    {this.state.createCategory? newCategoryComponent: ""}
                </DialogActions>
                <Divider/>
                <DialogContent style={{padding: "12px 0px"}}>
                    <List>
                        {this.state.categories.map(v=>(
                            <ListItem item onClick={this.onSelected(v._id)}
                                      component={ButtonBase}
                                      style={{background: this.state.selected.some(id=> id== v._id)? "rgba(100,100,100,.5)": ""}}>
                                <Avatar/>
                                <Typography style={{padding: "0px 8px"}} variant={"button"}> {v.title} </Typography>
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
                <Divider/>
                <DialogActions>
                    <Chip label={this.state.selected.length}/>
                    <Button onClick={this.onFinish}>Close</Button>
                    <Button onClick={this.onFinish}>Finish</Button>
                </DialogActions>
            </Dialog>
        )

    }
}