 const express = require('express')
 const path = require('path')
 const jwt = require('jsonwebtoken')
 const app = express()
 const DbConnect = require('./db/index.js')
 const userRouter = require("./routes/router.js")
 const bodyParser = require('body-parser')
 const fs = require('fs')

 const Read = fs.createReadStream('./public/chatbox.html')

 const dotenv = require('dotenv')

 dotenv.config() 

 app.use(bodyParser.json())
 app.use(express.static(path.join(__dirname, "public")))


 const port = process.env.PORT 
 

//  app.use(express.json())
 app.use(express.urlencoded({extended: true}))
 app.use(userRouter)
 
 app.get('/api/v1/home', (req, res) => {
   res.sendFile(path.join(__dirname, "public/index.html"))
   
})

app.get('/verify', (req, res) => {
   const { token } = req.query;
   if (!token) {
      return res.status(400).send('Token is required')
   }
   try {
      jwt.verify(token, process.env.USER_KEY)
      Read.pipe(res)
   } catch (error) {
      console.log('Verification error:', error)
      res.status(400).send('Invalid or expired token')
   }
})



 app.listen(port, () => {
    console.log('listening to port 4000')
    DbConnect()
 })


 