const express = require('express');
const router = express.Router();
const requsetModel=require('../models/requests');


  
// finding emp requests
router.get('/:name',(req,res)=>{
  
  // must here find by the user id to view his requests and the status
  requsetModel.find({employeeName:req.params.name})
  .then((data)=>
  {
      res.json(data);
  })
  .catch((err)=>
  {
   res.send("no requests found")
  })

})




// adding new request 
router.post('/',(req,res)=>{

    const Request = new requsetModel(req.body);
    Request.save()
    .then(request => 
    {
        res.status(200).send("request add please wait for manager to acceptance")
    })
    .catch((err) => 
    {
        res.send("please enter a valid Request");
    })


})


module.exports=router;
