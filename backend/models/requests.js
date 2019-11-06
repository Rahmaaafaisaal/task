const mongoose = require('mongoose');
const requests = mongoose.Schema(
    {
    employeeName: {
         type: String ,
         required: true,
    },
    description :{
        type: String,
        required: true,
    },
    status:{
        type:String,
        required: true,
        default: 'Not seen'
    },
    department_id: {
        type: String,
        required: true,
        
    },
    managed_Department:{type:String}
    

    }
);
const reqModel= mongoose.model('Req',requests);
module.exports = reqModel;