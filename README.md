# Supermercado Now - Test
> Sistema de catalogo de produtos

#### Resumo

- Back-end
- Front-end
- Rodar Aplicação
## 1 - Back-end
  - Back-end feito em [NodeJs]().

##### 1.1 - Tecnologias Usadas
- Servidor feito em [Express](https://expressjs.com/pt-br/)
- Banco de dados gerenciado pelo Query Builder [KnexJs](http://knexjs.org/)
- Banco de dados SQLite
- Validações de parametros das rotas feito com [Joi(Celebrate)](https://github.com/arb/celebrate)
- Upload e Tratativa de arquivos feita por [Multer](https://www.npmjs.com/package/multer)
- Testes feitos com [Jest](https://jestjs.io/docs/en/api)
- Requisições dos Testes e Validações feitas com o [Supertest]## 2 - 

## 2 - Front-end
 - Front-end feito em [Reactjs]().
##### 1.1 - Tecnologias Usadas
- Requisições feitas pelo [Axios](https://github.com/axios/axios)
## 3 - Rodar Aplicação
- Para executar a aplicação é necessário instalar o [Node (Versão LTS)](https://nodejs.org/en/)
#### 3.1 - Faça o clone desta aplicação no seu computador

```sh
$ git clone https://github.com/dougcarvalho92/supermercado-now-test.git
```   
### 3.2 - Acesse as pastas backend e frontend e execute o comando abaixo no terminal:

```sh
$ npm install
```
`! Assim que terminar o download das dependência, execute os comandos abaixo:`
 
### 3.3 - Executar o banco de dados :   
`Na pasta backend`
```sh
$ npm run migrate
```
`Criar usuário admin (root@root.com.br, 12345)`
```sh
$ npx knex seed:run 
```
`Voltar uma versão de atualização do banco de dados:`   
```sh
$ npm run rollback
```
### 3.4 - Executar o backend e o frontend
`Basta entrar em cada uma das pastas e executar o comando abaixo`
```sh
$ npm start
```
### 3.5 - Executar testes
- Criação de usuário
- Login
- Insersão de produto com upload de imagem

 `Acesse a pasta backend e execute o comando abaixo`

```sh
$ npm run test
```

## Author

👤 **Douglas Carvalho**

* Github: [@dougcarvalho92](https://github.com/dougcarvalho92)
* LinkedIn: [@dscarvalho92](https://linkedin.com/in/dscarvalho92)

## 📝 License

Copyright © 2020 [Douglas Carvalho](https://github.com/dougcarvalho92).
