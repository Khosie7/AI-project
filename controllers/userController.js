const joi = require("@hapi/joi")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userRep = require("../model/users.js")


const nodemailer = require('nodemailer')



const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6)
})

const SignUp = async (req, res) =>{
    const {email, password} = req.body 
    const validate = schema.validate({email, password})
    try{
        if (validate.error) throw new Error (validate.error.message)
            try{ 
                console.log(userRep)
                
                const userExists = await userRep.findOne({email})
                console.log(userExists)
                if(userExists) throw new Error("user exist please login")
                    const salt = await bcrypt.genSalt(10)
                    const hashedPassword = await bcrypt.hash(password, salt);
        
                  const newUser = new userRep({email, password:hashedPassword})
                  const savedUser = await newUser.save()

                  console.log(savedUser)
               


                  
                  const userKey = process.env.USER_KEY
                  const token = jwt.sign({ email }, userKey, {expiresIn: "1h"})

                  const verifyLink = `https://ai-project-ttwk.onrender.com/verify?token=${token}`

                  const mailOptions = {
                    from: process.env.USER_EMAIL,
                    to: email,
                    subject: 'Verify your Email',
                    html: `<p>Click the link below to verify your email:</p>
                            <a href="${verifyLink}">${verifyLink}</a>`
                  }

                  const transporter = nodemailer.createTransport({
                      service: 'gmail',
                      auth: {
                          user: 'anekeanna1@gmail.com',
                          pass: process.env.APP_KEY
                      }
                  })
 
                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                console.log('Error sending mail:', error )
                                return res.status(500).send('Could not send verification mail')
                            }
                            res.send('Verification email sent successfully!')
                        })            
                  
                 
                //   res.status(201).json({message:"signup successfull", data: {User:savedUser.email}})
        } catch (err){
            res.status(409).json({err: err.message})
        }

    } catch (err){
        res.status(400).json({message:"bad request", error:err.message})
    }
}

const SignIn = async(req, res)=>{
    const {email, password} = req.body
    const validate = schema.validate({email, password})

    try{
       const userKey = process.env.USER_KEY
         
       console.log(userKey)
 
       if(validate.error) throw new Error(validate.error.message)
          try{
       const userExists = await userRep.findOne({email})
       if(!userExists) throw new Error("user does not exist")
          try{
       const isValidPassword = await bcrypt.compare(password, userExists.password)
 
       console.log(isValidPassword)
 
       if(isValidPassword === false) throw new Error("invalid Email or password")
 
          let token = jwt.sign({id:userExists._id}, userKey, {expiresIn: "1h"})
 
          console.log(token)


          res.redirect('chatbox.html')
        //   res.status(200).json({message:"login successfull", data: {token}})
       }catch(err){
          res.status(401).json({message: err.message})
       }
       }catch(err){
       console.log("user email does not exists")
          res.status(401).json({message:"invalid credentials: email or passwords is incorrect", error:err.message})
       }
    }catch(err){
 res.status(400).json({message:"bad request", error:err.message})
 
 }
 }

module.exports = {
    SignUp,
    SignIn
}