const { Router } = require('express')
const router = Router()
const { SignUp, SignIn } = require("../controllers/userController.js")
const { chatBox } = require("../controllers/chatbox.js")


router.post('/signup', SignUp)

router.post('/login', SignIn)

router.post('/prompt', chatBox)

module.exports = router


