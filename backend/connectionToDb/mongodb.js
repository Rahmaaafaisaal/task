const mongoose = require("mongoose");


mongoose.connect('mongodb://localhost:27017/cityStarsTask',  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    });