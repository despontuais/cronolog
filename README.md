# Cronolog

## Instalação

### Pré-requisitos

- Node.js 20+
- MySQL

### Configuração do banco de dados

Consulte o arquivo .env.example para a lista de variáveis de ambiente e formatação

Prisma estabelece a conexão com o banco de dados através da variável `DATABASE_URL`. Certifique-se de que o endereço do banco de dados esteja correto antes de prosseguir

Exemplo: `DATABASE_URL=mysql://test:password@localhost:3306/db?schema=public`

### Compilar do código fonte

Clone o repositório

```console
git clone https://github.com/despontuais/cronolog.git
```

Instale as dependências

```console
cd cronolog \
npm install
```

Migre as tabelas para o banco de dados (MySQL deve estar devidamente configurado)

```console
npx prisma generate \
npx prisma migrate dev
```

Execute o projeto localmente

```console
npm run dev
```

Ou compile

```console
npm run build
```
