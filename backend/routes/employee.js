const express = require('express');
const router = express.Router();
const employeeModel = require('../models/employee');

// this route for only adding new employee 
router.post('/new', (req, res) => {

    let newEmp = new employeeModel(req.body);
        newEmp.save()
        .then((data) => 
        {
            res.status(200).send("employee add !");
        })
        .catch((err) => 
        {
            res.send("err is " + err.message)
        })
   

})


// this route for checking existance of employee in db 
router.post("/login",(req, res) => {
        
    employeeModel.find({ name: req.body.name })
    .then((data) =>
     {
            if(data.length==0)
            {
                return res.send("no such user")
            } // if the user name is not exist it will return an empty array so we have to check 
            
            if(data[0].password==req.body.password)
            {
                return res.status(200).send(data[0])
            }
            res.send("password is not correct")
    })
            
})

module.exports = router;