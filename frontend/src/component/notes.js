import React, { Component } from 'react'
import axios from 'axios'

class AddNotes extends Component{

    constructor(props)
    {
        super(props)
        this.state = 
        {
            requestid:sessionStorage.getItem('requestid'),
            newNote:""
        }
        this.sendNoteToServer=this.sendNoteToServer.bind(this)
        this.handleNewNote=this.handleNewNote.bind(this)
        this.sendimg=this.sendimg.bind(this)
    }
 
    handleNewNote(e){
        e.preventDefault()
        this.refs.des.value = "";
                 this.sendNoteToServer()
                 alert("done")
    }


async  sendNoteToServer(){
    const response = await axios.post('http://localhost:5000/request/newNote', {_id:this.props.match.params.id,note:this.state.newNote})
    }
    addvalue = (e) => 
    {
      this.setState({ [e.target.id]: e.target.value })
    }


    sendimg(e){
        e.preventDefault()
        console.log(this.refs.imageToUpload.files[0].name)
        let img = new FormData();
        img.append('photo', this.refs.imageToUpload.files[0])
        axios.post('http://localhost:5000/request/img/'+this.props.match.params.id,img)
            .then(res => { console.log(res) })
    }


    render(){
        return(
            <div>
            <form onSubmit={this.handlesubmit}>
                <div className="form-group">
                    <label htmlFor="requestDescription" style={{ fontWeight: "bold" }}>Add Note for Request</label>
                    <textarea style={{ width: "50%", marginLeft: "25%" }} ref="des" onChange={this.addvalue} className="form-control" id="newNote" rows="3"></textarea>
                </div>
                <button style={{ width: "8%" }} type="submit" onClick={this.handleNewNote} className="btn btn-danger">add</button>
               <br></br>
                <input style={{marginBottom :"4%",width:"250px"}} type="file" name="userImg" className="chooseFileStyle" ref="imageToUpload" />
           <button onClick={this.sendimg}>upload</button>
            </form>
            </div>
        )
    }


}

export default AddNotes;