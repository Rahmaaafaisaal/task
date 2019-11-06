const express = require("express");
const cors=require('cors')
const db=require('./connectionToDb/mongodb')
const requestRouter=require('./routes/request')
const depRouter=require('./routes/dep')
const empRouter=require('./routes/employee')


const app = express();
const port=5000;
app.use(cors());
app.use(express.json({
    type: ['application/json', 'text/plain']
}));

app.use('/request',requestRouter)
app.use('/dep',depRouter)
app.use('/emp',empRouter)
app.listen(port,function(){
    console.log('server started')
});