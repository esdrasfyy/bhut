# Desafio BHUT - Software Enginner

<div style="text-align: center;">
    <img src="https://lh3.googleusercontent.com/p/AF1QipPf_MO-dn_w9RqtoX1n2ET4hZ3iQn7ghrSD0n1z=s680-w680-h510" alt="Arte Arena Logo" style="max-width: 200px; height: auto;">
</div>

## Sobre o Desafio

Este repositório contém a implementação de uma **API REST** desenvolvida em **Nest.js** (TypeScript), que interage com uma API externa e utiliza um sistema de **mensageria** para comunicação assíncrona. O projeto segue boas práticas de desenvolvimento, garantindo escalabilidade, organização e testes de integração.

A **BHUT** é uma empresa focada em soluções tecnológicas para o setor automotivo, oferecendo ferramentas inovadoras para gerenciamento e automação de processos. O objetivo deste desafio foi aplicar as melhores práticas de desenvolvimento para criar um sistema robusto e eficiente, alinhado às necessidades da empresa.
<br/>

---

### Funcionalidades

- Integração com a API externa da BHUT para cadastro e listagem de carros
- Endpoint para listar todos os carros da API externa (GET /api/car)
- Endpoint para cadastrar um novo carro (POST /api/car)
- Publicação de mensagens em uma fila RabbitMQ ao criar um novo carro
- Consumidor de fila para processar mensagens e enviar webhook de notificação
- Registro de logs em um banco MongoDB, armazenando as chamadas da API
- Endpoint para consulta dos logs armazenados (GET /api/logs)
- Dockerização da aplicação para facilitar a execução em ambientes isolados
- Integração com Docker para escalabilidade
- Cacheamento de dados para otimizar desempenho (Redis)

---

### Tecnologias Utilizadas

- **Backend**: Node.js, Nest.js, MongoDB, Redis...
- **Outros**: Git, Docker

---

## Como Rodar o Projeto

### Pré-Requisitos

Antes de rodar o projeto, certifique-se de que você tem as seguintes ferramentas instaladas:

- **Docker** (com Docker Compose)
- **Node.js** (para o frontend)
- **npm** (gerenciador de pacotes do Node.js)
- **MongoDB** (banco de dados não relacional)

---

### 1. Clonar o Repositório

Primeiro, clone o repositório para o seu ambiente local:

> git clone https://github.com/esdrasfyy/bhut.git

---

### 2. Copiar o Arquivo `.env`

Antes de iniciar o projeto, copie o arquivo de ambiente adequado para o seu uso e renomeie-o para `.env`.

- Para Docker: Copie o arquivo `.env.docker` para `.env`.
- Para ambiente local: Copie o arquivo `.env.local` para `.env`.

Isso é essencial para garantir que todas as variáveis de ambiente estejam corretamente configuradas.

---

### 3. Rodar o Projeto

#### 3.1 Com Docker

Caso você queira rodar o projeto com Docker, siga os passos abaixo:

1. **Build** (criação do ambiente Docker):

   > docker-compose up --build

2. **Cuidado**:

   - Certifique-se de que o **Docker** e o **Docker Compose** estão corretamente instalados.
   - Verifique se as portas **27017** (MongoDB), **3000** (Server) e **5672 e 15672** (RabbitMQ) estão disponíveis em sua máquina e não estão sendo usadas por outros processos.

---

#### 3.2 Sem Docker

Se preferir rodar o projeto sem Docker, siga as instruções separadas para o **Frontend** e **Backend**.

**Frontend**

1. Instale as dependências do projeto:

   > npm install --legacy-peer-deps

2. Compile o projeto:

   > npm run build

3. Inicie o servidor de desenvolvimento:

   > npm start

O server estará disponível em `http://localhost:3000`.

---

#### 4 Documentação

> http://localhost:3000/docs

---

Caso precise de mais informações ou tenha dúvidas sobre o desenvolvimento deste projeto, sinta-se à vontade para entrar em contato!
