# Aplicativo de "Gerenciador de Tarefas"

## Introdução

Este projeto é um **gerenciador de tarefas simples** construído com **React** e utiliza o **JSON Server** como backend simulado. O aplicativo permite que os usuários visualizem, adicionem, editem e excluam tarefas em uma interface amigável e eficiente. A aplicação também implementa uma confirmação para garantir que o usuário não delete uma tarefa acidentalmente.

## Objetivo

O objetivo deste projeto é demonstrar a criação de uma aplicação frontend com funcionalidades completas de **CRUD** (Create, Read, Update, Delete) usando **React**. Além disso, a aplicação se conecta a um backend simulado usando o JSON Server, o que facilita o desenvolvimento e a prototipagem sem a necessidade de configurar um servidor backend real.

## Vantagens

- **Interface intuitiva**: Um design simples e fácil de usar para gerenciar tarefas.
- **CRUD completo**: O aplicativo permite criar, visualizar, editar e excluir tarefas.
- **Reutilização de componentes**: O componente de botão (`Button`) é reutilizável em toda a aplicação, aceitando diferentes classes e estilos conforme necessário.
- **Fácil configuração de backend**: Usando **JSON Server** para simular um servidor RESTful, facilitando o desenvolvimento e a prototipagem.

## Como rodar o projeto na sua máquina

Siga os passos abaixo para executar o projeto localmente.

### 1. Pré-requisitos

Certifique-se de que você tem o Node.js instalado em sua máquina. Caso não tenha, você pode baixá-lo [aqui](https://nodejs.org/).

### 2. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/task-manager-app.git
```

### 3. Instalar as dependências

Navegue até a pasta do projeto e instale as dependências necessárias com o seguinte comando:

cd projeto_4_react
npm install

### 4. Iniciar o JSON Server

O JSON Server simula uma API RESTful. Ele será usado para armazenar e recuperar as tarefas.

Inicie o servidor JSON rodando o comando abaixo:

npx json-server --watch db.json --port 3001

Isso iniciará o JSON Server na porta 3001, que é usada pela aplicação para fazer as requisições.

### 5. Iniciar a aplicação React

Em uma nova aba do terminal, inicie a aplicação React com o comando:

npm run dev

### 6. Interagindo com a aplicação

Agora você pode:

Adicionar novas tarefas no campo de texto e clicar em "Adicionar Tarefa".
Editar uma tarefa clicando no botão "Editar", fazer a alteração e clicar em "Salvar".
Excluir uma tarefa clicando no botão "Deletar" e confirmando a ação no modal de confirmação.
Tecnologias utilizadas
React: Biblioteca JavaScript para a construção de interfaces de usuário.
Axios: Cliente HTTP para realizar as requisições.
JSON Server: Ferramenta simples e rápida para simular uma API RESTful.
