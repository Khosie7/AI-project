const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()

const dbUri = process.env.CONN_URI

const DbConnect = () =>{
    mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true }).then(res=>{
        console.log("connected successfully")
        return;
    
}).catch(err=>{
    console.log(err.message)
})
}

module.exports= DbConnect