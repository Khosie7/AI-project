const mongoose = require('mongoose')

const User = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type:String,
        required: true
    }, 
    disabled:{
        type: Boolean,
        default: false
    }
})

module.exports= mongoose.model("users", User)

// async function deleteUserByEmail(email) {
//     try {
//       const result = await User.deleteOne({ email: email });
//       if (result.deletedCount === 0) {
//         console.log('No user found with the given email.');
//       } else {
//         console.log('User deleted successfully.');
//       }
//     } catch (err) {
//       console.error('Error deleting user:', err);
//     }
//   }
  

//   deleteUserByEmail('anekekosi1@gmail.com');
