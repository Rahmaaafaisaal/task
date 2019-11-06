const mongoose = require('mongoose');

const departmentSchema = mongoose.Schema(
{
    name: {
        type: String,
        required: true,
        unique:true,
    },
    ID:{
        type:String,
        require: true,
        unique:true,
    }

});

const departmentModel = mongoose.model('department', departmentSchema);
module.exports = departmentModel;