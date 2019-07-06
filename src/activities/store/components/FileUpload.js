import React from "react"
import axios from "axios"
import { APIURL } from './../../../DataSource';
import StoreContext from "../StoreContext"

export default class Component extends React.Component{

    static contextType= StoreContext
    state= {
        file: undefined,
        selectFile: false,
        link: undefined
    }
    onSelectFile=async  (e)=>{
        let formdata= new FormData()
        formdata.append("file",e.target.files[0])
        try{
            //this.onUpload()
            let result =await axios.post(`${APIURL}/store/${this.context.store.id}/upload`, formdata,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                  }
            })
            if(result){
                alert("file uploaded")
                this.onFinish(result.data)
                this.setState({file: undefined, selectFile: false, link: undefined})
            }
        }catch (e) {
            this.onError()
        }
    }

    onUpload = ()=> {
        this.props.onUpload()
    }
    onFinish = (link)=>{
        this.props.onFinish(link)
    }
    onError= ()=>{
        this.props.onError()
    }       
    render(){
        return <input  type="file" name=""  onChange={this.onSelectFile}  id={"fileSelectorElement"} hidden/>
    }
}