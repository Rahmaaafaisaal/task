import React from 'react';
import Navbar from './component/navbar/navbar'
import './App.css';
import LoginEmployee from './component/loginEmployee/loginEmployee'
import RequestManagement from './component/sendingRequest/sendingRequest'
import ManagingRequest from './component/requestMnanagement/managers'
import { BrowserRouter, Route } from 'react-router-dom'
import AddNotes from './component/notes' 
function App() {
  return (
     
    <BrowserRouter>
    <Navbar></Navbar>
    <div className="App">
    <Route exact path='/' component={LoginEmployee}/>
    <Route  path='/request' component={RequestManagement}/>
    <Route  path='/manage' component={ManagingRequest}/>
    <Route  path='/notes/:id' component={AddNotes}/>
    </div>
   
    </BrowserRouter>
    
  );
}

export default App;
