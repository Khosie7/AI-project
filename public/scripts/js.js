const chatBox = document.getElementById('box')
const form = document.getElementById('form')

initialSet = false
aiInitialSet = false

form.addEventListener('submit', async (e) =>{
    e.preventDefault();

  
    const Input = document.getElementById('userPrompt')
     const userInput = Input.value.trim();
   
    // const userChatBox = document.getElementById('user-box')
    // userChatBox.innerText = userInput
    // console.log(userChatBox)

    // const userBox = document.getElementById('user')
    // console.log(userBox)

  //  if (userChatBox) {
  //     Input.value = '';
  //  }

    // console.log(userInput)
    // userBox.scrollTop = userBox.scrollHeight

    const response = await fetch('/prompt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userInput }),
    });
    
    const result = await response.json()
    console.log(result.response)
    
    
    if (userInput) {
      appendMsg(userInput)

      userInput.value = '';
    }
    
    
    
    
    
  })
  
  // const password = document.getElementById('password').value.trim()
  
  // sessionStorage.setItem('email', email)
  // sessionStorage.setItem('password', password)
  
  // const trial = sessionStorage.getItem(email)
  // console.log(trial)
  
  function appendMsg (userInput) {
    const userDiv = document.createElement('div')
    userDiv.classList.add('user')
    
    const email = sessionStorage.getItem('email');
    console.log(email)
    // Create the initials div
    const initialsDiv = document.createElement('div');
    
    
    if (!initialSet) {
      
      initialsDiv.classList.add('userName');
      const userName =email.split('@')[0].slice(0,2).toUpperCase()
      initialsDiv.textContent = userName;
      initialSet = true
      
      // initialsDiv.innerText =userName
      
    } else{
      console.log('Initials has been set')
    }
    
    // Create the text div
    const textDiv = document.createElement('div');
    textDiv.classList.add('userInput');
    textDiv.textContent = userInput;
    
    // Append initials and text to the message container
    userDiv.appendChild(initialsDiv);
    userDiv.appendChild(textDiv);
    
    // create the ai div
    const aiDiv = document.createElement('div')
    aiDiv.classList.add('ai')

     const aiName = document.createElement('div');
     aiName.classList.add('aiName')

     if (!aiInitialSet) {
      aiName.textContent = 'XAI' 
      aiInitials = true

     } else {
      console.log('AI initial is already occupied.')
     }

    const aiBox = document.createElement('div');
    aiBox.textContent = result.response
    console.log(aiBox)

    aiDiv.appendChild(aiName);
    aiDiv.appendChild(aiBox);


    // Append the message container to the chat container
    chatBox.appendChild(userDiv);
    chatBox.appendChild(aiDiv);

  
    // Scroll to the bottom of the chat container
    chatBox.scrollTop = chatBox.scrollHeight
}