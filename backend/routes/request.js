const express = require('express');
const router = express.Router();
const requsetModel=require('../models/requests');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: 'public/upload/',
  filename: function (req, file, cb) {

    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

router.post('/img/:id', upload.single('photo'), (req, res) => {
  requsetModel.update({_id:req.params.id.substring(3)},{imgName:req.file.originalname}).then(data=>{
  console.log(data)
}
) 
  if (req.file) {
      console.log("image came");
      res.send("done");
    }
    else res.send("failed");
  
  })

  
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



router.post('/newNote',(req,res)=>{
   
    requsetModel.update({_id:req.body._id.substring(3)},{notes:req.body.note}).then(data=>{
        console.log(data)
        res.send(data)
    }
    )



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

router.get('/',(req,res)=>{
    requsetModel.find({_id:"5dc3362a0b9ebc3c36b5999c"}).then(
        data=>{
            console.log(data)
            res.send(data)
        }
    )
})

module.exports=router;
