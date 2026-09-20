from fastapi import FastAPI
import json
from fastapi.middleware.cors import CORSMiddleware

#caminho fastapi dev Exercicios/TelaLoginSolo/api/users.py

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
dados = 0
users = 0

with open('./user.json', 'r') as file:
    users = json.load(file)

@app.get('/')
def home():
    return 'Banco de Dados'
@app.post('/users')
def usersPost(user: dict):
    user['id'] = len(users)
    users.append(user)

    with open('./user.json', 'w', encoding='utf-8') as file:
        json.dump(users, file, indent=4, ensure_ascii=False)

    return {'Usuário': 'Cadastrado com Sucesso'}
    


@app.get('/users')
def usersGet():
    return users

print(users)





