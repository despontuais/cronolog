# Cronolog
Projeto em construção para o Curso de Tecnologia Em Análise e Desenvolvimento de Sistemas 

### Pré-requisitos globais:
`npm i -g nodemon typescript ts-node`


### Instalação
`npm install`

### Para rodar o projeto
`npm run start-dev`

## Para rodar o projeto – Prisma ORM

### Gerando Client e Aplicando Migrations

`npx prisma generate`

`npx prisma migrate dev`

### Conexão com o MySQL – Prisma ORM
Para conectar o Prisma ao MySQL, basta criar um `.env` contendo a linha a seguir:  
`DATABASE_URL=mysql://test:password@localhost:3306/db?schema=public`

é necessário substituir:

`test` pelo nome de usuário `password` pela senha;  
`localhost` pelo endereço que está sendo utilizado;  
`3306` pela porta que estiver sendo utilizada;  
`db` pelo nome do BD que estiver sendo utilizado  

### Execução de testes

É recomendado que seja utilizado um banco de dados de teste, sendo assim o `.env` seria:  
`DATABASE_URL=mysql://test:password@localhost:3306/test_db?schema=public`  

`npm test`