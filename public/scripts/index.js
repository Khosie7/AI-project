const form = document.getElementById('form')

form.addEventListener("submit", async (e) =>{
    e.preventDefault()
    
    try{
        const email = document.getElementById('email').value.trim()
        const password = document.getElementById('password').value.trim()
    
        if (!email && password) {
            alert('Input your email or password')
        } else{
            sessionStorage.setItem('email', email)
            sessionStorage.setItem('password', password)
    
            window.location.href= 'chatbox.html'
    
             
            console.log(sessionStorage.getItem('email'))
            // alert('Email and password has been saved to session storage.')
        }
    } catch(error) {
        console.error('Error due to storage access denied because of:', error.message)
    }


})


