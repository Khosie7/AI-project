const form = document.getElementById('form')

initialSet = false

form.addEventListener('submit', async (e) =>{
    e.preventDefault();

  
    const Input = document.getElementById('userPrompt')
     const userInput = Input.value.trim();
   
    const userChatBox = document.getElementById('user-box')
    userChatBox.innerText = userInput
    console.log(userChatBox)

    const userBox = document.getElementById('user')
    console.log(userBox)

   if (userChatBox) {
      Input.value = '';
   }

    // console.log(userInput)
    userBox.scrollTop = userBox.scrollHeight

    const response = await fetch('/prompt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userInput }),
    });
    
    const result = await response.json()
    const aiDiv = document.getElementById('ai-response')
    aiDiv.innerText = result.response
    console.log(aiDiv)




    const email = sessionStorage.getItem('email');
    console.log(email)
    
    if (!initialSet) {
      const initialsDiv = document.getElementById('userName')
      const userName =email.split('@')[0].slice(0,2).toUpperCase()
      initialsDiv.innerText =userName
      initialSet = true
    } else{
      console.log('Initials has been set')
    }



})

// const password = document.getElementById('password').value.trim()

// sessionStorage.setItem('email', email)
// sessionStorage.setItem('password', password)

// const trial = sessionStorage.getItem(email)
// console.log(trial)



