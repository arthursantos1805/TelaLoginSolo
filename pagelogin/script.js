const form = document.querySelector('form')
const inputUserEmail = document.getElementById('useremail')
const inputSenha = document.getElementById('passw')
const divErro = document.getElementById('erro')

form.addEventListener('submit', (evt)=> {
    evt.preventDefault();
})

const endpoint = 'https://apiusers-l8hp.onrender.com/users'

const btnLogin = document.getElementById('btnLogin')

btnLogin.addEventListener('click', ()=> {
    const userEmail = inputUserEmail.value
    const passw = inputSenha.value
    let userPassw = null
    let userFound = null

    fetch(endpoint)
        .then(response => response.json())
        .then(dados => {
            for (user of dados) {       
                if (user.user == userEmail || user.email == userEmail) {
                    userPassw = user.passw
                    userFound = true
                    break;
                } else if (user.user != userEmail || user.email != userEmail) {
                    divErro.innerHTML = 'Usuário/Email não encontrado.'
                }
            }

            if (userFound) {
                if (userPassw == passw) {
                    divErro.innerHTML = 'Login efetuado com sucesso!'
                } else {
                    divErro.innerHTML = 'Senha incorreta. Tente novamente.'
                }
            }
                })
        .catch(divErro.innerHTML = 'Fetch faiô')
})