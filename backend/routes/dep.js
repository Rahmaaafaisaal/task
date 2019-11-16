const express = require('express');
const router = express.Router();
const departmentModel=require('../models/department')
const requestModel=require('../models/requests');

// this route for only adding new department 
router.post('/',(req,res)=>{

    if(req.body)
    {    
        let newdep=new departmentModel(req.body);
        newdep.save()
        .then((data)=>
        {
            res.status(200).send("done !");
        })
        .catch((err)=>
        {
            res.send("err type : "+err.message)
        })
    }
 
   
})


router.post('/request',(req,res)=>{

    if(req.body.event=="delete")
    {
        requestModel.findByIdAndUpdate({_id:req.body.id},{"status":"Rejected"})
        .then(data=>{
            res.send("done")
        })
    }
    else if(req.body.event=="accept")
    {
        requestModel.findByIdAndUpdate({_id:req.body.id},{"status":"accepted"})
        .then(data=>{
            res.send("done")
        })

    }

 

})

// sending all department to be seen in the dropdown
router.get('/',(req,res)=>{
    
    departmentModel.find()
    .then((data)=>
    {
        res.json(data)
    })
    .catch((err)=>
    {
        res.send("no dep found")
    })
})



//finding requests for specific department
router.get('/:ID',(req,res)=>{ 
    // must here find by the user id to view his requests and the status
    requestModel.find({department_id:req.params.ID,status:{$in:["Not seen","accepted"]}})
    .then((data)=>
    {
        
     res.json(data);
    })
    .catch((err)=>
    {
       res.send("no requests found")
    })
})

module.exports=router;