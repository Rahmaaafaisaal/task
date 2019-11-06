const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema(
    {
    name: {                                      //name of employee must be unique we are going to use it as identifier                                                
        type: String,
        require: true,                          //for simulation purpose 
        unique:true,
    },
    password: {
        type: String,
        required: true
    },
    department_id: {                           // where are going to add id that we have in dump data for simulation purpose
        type: String,
        require: true
    },
    managed_Dep:{
        type:String
    }


    }
);



const employeeModel = mongoose.model('employee', employeeSchema);
module.exports = employeeModel;