# Products Catalog
Este é um projeto de catálogo de produtos, que permite gerenciar produtos através de uma interface web. A aplicação é dividida em duas partes principais: um frontend desenvolvido com React e TypeScript, e um backend em Java com Spring Boot.

---

## Funcionalidades Principais
- Frontend
  - Adicionar, editar e excluir produtos.
  - Listar produtos com detalhes como nome, descrição, preço e quantidade.
  - Navegação entre diferentes páginas utilizando React Router.
- Backend
  - API REST para gerenciar produtos.
  - Integração com banco de dados para persistência de dados.
  - Autenticação e autorização de usuários.

## Tecnologias Utilizadas
- Frontend:
  - React
  - TypeScript
  - React Router
  - React Bootstrap
  - React Toastify
- Backend:
  - Java
  - Spring Boot
  - Spring Data JPA
  - H2 Database (para desenvolvimento)

## Pré-requisitos
- Node.js (versão utilizada 22)
- Java (versão utilizada 17)
- Maven

## Passo a Passo para Rodar o Projeto
### Rodando o Frontend
Clone o repositório:

```bash
git clone https://github.com/eduardosdl/products-catalog.git
cd products-catalog/catalog
```

Instale as dependências:

```bash
npm install
```
Inicie o servidor de desenvolvimento:

```bash
npm run dev
```
O frontend estará disponível em http://localhost:3000.

### Rodando o Backend
Navegue até a pasta do backend:

```bash
cd products-catalog/productsapi
```
Construa o projeto com Maven:

```bash
./mvnw clean install
```
Inicie o servidor:

```bash
./mvnw spring-boot:run
```
O backend estará disponível em http://localhost:8080.
