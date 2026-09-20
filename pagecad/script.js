const form = document.querySelector('form')
const divErro = document.getElementById('erro')
const inputUser = document.getElementById('user')
const inputEmail = document.getElementById('email')
const inputSenha = document.getElementById('passw')
const inputSenhaConf = document.getElementById('passwconf')
const btnCadastro = document.getElementById('btnCadastro')

form.addEventListener('submit', (evt)=> {
    evt.preventDefault();
})

let cadastroPerm = null

const endpoint = 'https://apiusers-l8hp.onrender.com/users'

//O Cadastro só vai funcionar se ligar a api, ent nn pode esquecer

btnCadastro.addEventListener('click', () => {
    const user = inputUser.value
    const email = inputEmail.value
    const passw = inputSenha.value
    const passwconf = inputSenhaConf.value

    fetch(endpoint)
        .then(response => JSON.parse(response))
        .then(data => {
            for (usuario of data) {
                if (usuario.user == user) {
                    divErro.innerHTML = 'Usuário já cadastrado.'
                    cadastroPerm = false
                    break;
                } else if (usuario.email == email) {
                    divErro.innerHTML = 'Email já cadastrado.'
                    cadastroPerm = false
                    break;
                } else {
                    cadastroPerm = true
                }
            }
        })
    
    if (cadastroPerm) {
        if (email.includes('@gmail.com') || email.includes('@yahoo.com.br') || email.includes('@hotmail.com')) {
            if (passw == passwconf) {
                const userObj = {
                    user: user,
                    email: email,
                    passw: passw
                }

                fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userObj)
                })
                    .then(response => response.json())
                    .then(data => console.log(data))
                    .catch(() => {
                        divErro.innerHTML = 'Fetch faiô'
                    })

                divErro.innerHTML = 'Sucesso!'
            } else {
                divErro.innerHTML = 'As senhas não coincidem. Tente novamente.'
            }
        } else {
            divErro.innerHTML = 'Formato de email inválido. Tente novamente.'
        }
    }
})
