const express = require('express')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
app.use(bodyParser.json())

 const userKey = process.env.USER_KEY
 const token = jwt.sign({ email }, userKey, {expiresIn: "1h"})

 const verifyLink = `http://localhost:4000/verify?token=${token}`

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

