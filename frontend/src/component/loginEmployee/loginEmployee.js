import React, { Component } from 'react'
import './loginEmployee.css'
import axios from 'axios'

class LoginEmployee extends Component {
 
    state=
    {
        name:null,
        password:null
    }
    
    
    async  sendDataToserver()
    {
        const response = await axios.post('http://localhost:5000/emp/login',this.state)
    
        if(response.data==="password is not correct"||response.data==="no such user")
        {
           alert(response.data)
           
        }
        else
        {
            sessionStorage.setItem('name',response.data.name.toString())
            sessionStorage.setItem('department_id',response.data.department_id.toString())
            this.props.history.push('/request');
            
        }
    }

    handlesubmit=(e)=>
    {
     e.preventDefault();
     this.sendDataToserver();
     this.refs.name.value="";
     this.refs.password.value="";  
    
    }

    addvalue=(e)=>
    {

        this.setState({[e.target.id]:e.target.value})
    }



       
    componentWillMount() 
    {
        let name= sessionStorage.getItem('name')
        if(name){this.props.history.push('/request');}
    }
       


    render() {

        return (
            <div>
                <div className="login">
                <h1>Login</h1>
                <form  onSubmit={this.handlesubmit}>
                    <input type="text" name="u" ref="name"  className="input" id="name"  placeholder="Name" required="required" onChange={this.addvalue} />
                    <input type="password"ref="password" name="p"  className="input" id="password" placeholder="Password" onChange={this.addvalue} required="required" />
                    <button style={{marginLeft:"3%"}} type="submit"  className="btn btn-primary btn-block btn-large">Login</button>
                </form>
                </div>
            </div>
        )
    }
}


export default LoginEmployee ;