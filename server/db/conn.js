const mongoose = require('mongoose');
require('dotenv').config()

const dbURL = process.env.DATABASEURL



mongoose.connect(
    dbURL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    },(err)=>{
        if(!err){
            console.log("DB Connected...!")
        }else{
            console.log("Connection Failed...!")
        }
    }
)



