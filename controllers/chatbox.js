const { GoogleGenerativeAI } = require('@google/generative-ai')
const Apikey = process.env.GEMINI_API_KEY
const genAi =  new GoogleGenerativeAI(Apikey)

// const initialSet = ''


const chatBox = async (req, res) => {
   
   // const { email }  = req.body.email
   
   const userInput = req.body.userInput
   console.log(userInput)

   // try{
   //    console.log( req.body.userInput )
   // } catch (err) {
   //    console.error('ERROR:', err)
   // }

   // console.log("Request body:", req.body);
   // const userInput = req.body;
   // console.log("User input:", userInput);
   
   try{
      const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash"})
      const chat = model.startChat({
         history: [
            {
               role: "user",
               parts: [{ text: 'hello'}]
            },
               {
                  role: "model", 
                  parts: [{ text: 'great to meet you here. what would you like to know?'}]
               }
            ]
         })
         
         
         
         
         
         // try{

         //    if (userInput) {
         //       res.json({ userInput})
               
         //    } 
         // } catch (error){
         //    console.log("Error:", error.message)

         // }

       
       const result = await chat.sendMessage(userInput) 
       const aiResponse = result.response.text()
       console.log(aiResponse)
       res.json({ response: aiResponse})
       
      //  const data = {
      //     aiDiv: aiDiv,
      //     userInput : userInput
      //    }


      //  const result2 = await chat.sendMessage(userInput) 
      //  const answer2 = result2.response.text()
      //  console.log(answer2)
      //  res.json({ answer2})
    } catch (error) {
       console.error("Error generating text:", error);
    }
  }
 
  
//   const emailInitials = async (req, res) => {
//      const email = req.body
//      try{
//          if (!email || typeof email !== 'string') return '';
//          const Initials = email.substring(0, 2).toUpperCase();
//          console.log(Initials)
//          res.json({Initials})
//      } catch (error) {
//       console.error("Error generating initials:", error)
//      }
//  }


module.exports = { 
   chatBox
}
