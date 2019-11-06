import React from 'react';
import axios from 'axios'

class RequestManagement extends React.Component {
  
    constructor(props)
    {
        super(props)
        this.state = 
        {
            requestDescription: "",
            olderRequests:false,
        }
    }
    
    async sendDataToserver() 
    {
        let body=
        {
            employeeName: sessionStorage.getItem('name'),
            description: this.state.requestDescription,
            department_id:sessionStorage.getItem('department_id')
        }
        
        const response = await axios.post('http://localhost:5000/request', body)
        
        alert(response.data)
        
        this.getDataFromserver()
    }

    async  getDataFromserver() 
    {
        let name=sessionStorage.getItem('name')
        const response = await axios.get('http://localhost:5000/request/'+name)
        this.setState({'olderRequests':response.data})
    }

    componentWillMount() 
    {
        let loggedin = sessionStorage.getItem('name')
           if (!loggedin) 
           {
              this.props.history.push('/');
           }
       this.getDataFromserver()
           
    }


 

    

    handlesubmit = (e) => 
    {
        e.preventDefault();
        this.sendDataToserver();
        this.refs.des.value = "";
    }
    
    addvalue = (e) => 
    {
      this.setState({ [e.target.id]: e.target.value })
    }


    render() {
        return (
           <div style={{ marginTop: "5%" }} >
            <form onSubmit={this.handlesubmit}>
                <div className="form-group">
                    <label htmlFor="requestDescription" style={{ fontWeight: "bold" }}>Request Description</label>
                    <textarea style={{ width: "50%", marginLeft: "25%" }} ref="des" onChange={this.addvalue} className="form-control" id="requestDescription" rows="3"></textarea>
                </div>
                <button style={{ width: "8%" }} type="submit" className="btn btn-danger">Submit</button>
            </form>
            <h1 style={{ marginTop: "5%" ,textAlign:"left",marginLeft: "2%" ,textAlign:"left"}}>Older Requests</h1>
            {
                this.state.olderRequests ? 
                
                this.state.olderRequests.map(element => {
                
                 return(
                    <div key={element._id}style={{ marginTop: "5%" ,width:"50%" ,marginLeft: "2%",textAlign:"left"}} className="card">
                    <div className="card-header"> {element.status }</div>
                    <div className="card-body">
                    <h5 className="card-title">Description</h5>
                    <p className="card-text">{element.description}</p>
                    </div>
                    </div>
                    )
                 })
                 :
                 <p></p>
                 }               
           </div>
        )

    }

}
export default RequestManagement;