import React, { Component } from 'react'
import axios from 'axios'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class ManagingRequest extends Component {
    
    
    constructor(props)
    {
        super(props);
        this.state=
        {
            dropdownOpen:false,
            departments:[],
            currentDep:{name:'please select a department'},
            requests:""

        }
  
        this.handleClick=this.handleClick.bind(this)
        this.addNotes=this.addNotes.bind(this)
    }
    

    async  getdepFromserver() 
    {
        const response = await axios.get('http://localhost:5000/dep/')
        this.setState({'departments':response.data})
    }

 
    async  getreqFromserver()
    {
    
        const response = await axios.get('http://localhost:5000/dep/'+this.state.currentDep.ID)
        this.setState({'requests':response.data})
    }

    async sendUpdates(updateDetails)
    {
        const response = await axios.post('http://localhost:5000/dep/request',updateDetails)
        
    
    }

    handleClick(e)
    {
        this.state.departments.forEach((dep)=>{
            if (dep.name==e.target.innerHTML)
             this.setState({currentDep:dep},()=>{
                 this.getreqFromserver();
            })
        })
    }

    componentWillMount()
    {
       this.getdepFromserver();
    }

    toggle=()=>this.setState({dropdownOpen:!this.state.dropdownOpen});

    handleRequest=(e)=>
    {
         
        let  requestarr=this.state.requests;
         requestarr=requestarr.filter(req=>{
             if(req._id===e.target.id)
             {  
                  return false;
             }
             return true
         })
         this.setState({requests:requestarr})
         this.sendUpdates({event:e.target.name,id:e.target.id})
    
    }


   
    addNotes(e){
            this.props.history.push('/notes/id='+e.target.id);
      }

    render()
    {
        return(
            <div>
                <ButtonDropdown  isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle  caret>
                     {this.state.currentDep.name}
                </DropdownToggle>
              <div >
                <DropdownMenu style={{width:"230px"}}>
              {
                  this.state.departments.map(dep=>{

                return( <DropdownItem  onClick={this.handleClick} key={dep.ID} >{dep.name}</DropdownItem>)
                 
                 })
              }
               </DropdownMenu>
              </div>
              </ButtonDropdown>  

            <div> 
              <h1 style={{ marginTop: "5%" ,textAlign:"left",marginLeft: "2%" ,textAlign:"left"}}>{this.state.currentDep.name} Requests </h1>
                {
                    this.state.requests ? this.state.requests.map(element => {
                        console.log(element)
                    return (
                    <div key={element._id} style={{ marginTop: "5%" ,width:"50%" ,marginLeft: "2%",textAlign:"left"}} className="card">
                    <div className="card-header"> {element.employeeName }</div>
                    <div className="card-body">
                    <h5 className="card-title">Description</h5>
                    <p className="card-text">{element.description}</p>
                    {
                        element.status=="accepted"?<div>
                            
                        <button   type="button" name="addNotes" id={element._id} onClick={this.addNotes} className="btn btn-success">Notes</button>
                            
                            </div>:
                   <div>
                    <button id={element._id} type="button" name="delete" onClick={this.handleRequest} className="btn btn-danger">Decline</button>
                    <span>        </span>
                    <button  id={element._id} type="button" name="accept" onClick={this.handleRequest} className="btn btn-success">Accept</button>
                    </div>
                    }
                    
                   
                    </div>
                    </div>
                    )
                }):
                <p></p>
                
                } 
            </div>
        </div>)
    }

}

export default ManagingRequest;