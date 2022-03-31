const express = require('express')
const router = require('./router/routes')
require('./db/conn') 
require('./model/postSchema') 
const app = express()

const cors = require('cors')
const port = 2000

// Body Parcer Middleware
app.use(express.urlencoded({extended : true}))

//JSON Middleware
app.use(express.json());

//Router Level Middleware
app.use(router)

//CORS Middleware
app.use(cors())

app.listen(port, (err)=>{
    console.log(`server is listening on port ${port}`);
  })