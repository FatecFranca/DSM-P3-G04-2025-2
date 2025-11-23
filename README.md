# 📦 Sistema de Gestão de Fábrica de Cartonagem

## 📋 Sobre o Projeto

Repositório do **GRUPO 04** do Projeto Interdisciplinar do 3º semestre DSM 2025/2.

**Sistema de Gerenciamento de Fábrica de Cartonagem** - Aplicação full-stack para gerenciar processos de produção de embalagens de papelão, incluindo cadastro de clientes, controle de matérias-primas, produtos finais, fichas técnicas e ordens de produção.

### 👥 Equipe

- Daniel Victor Olimpio Souza Morais
- Gabriel Andrade Cintra
- Kaio Leandro Rissato

---

## 🚀 Como Executar o Projeto

### 📋 Pré-requisitos

Certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/) (geralmente vem com Node.js)
- [MongoDB](https://www.mongodb.com/try/download/community) ou acesso ao MongoDB Atlas
- Um navegador web moderno (Chrome, Firefox, Edge, etc.)

### 🔧 Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/FatecFranca/DSM-P3-G04-2025-2.git
   cd DSM-P3-G04-2025-2
   ```

2. **Instale as dependências do frontend:**
   ```bash
   npm install
   ```

3. **Instale as dependências do backend:**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Configure as variáveis de ambiente:**
   
   Crie ou edite o arquivo `backend/.env`:
   ```env
   MONGODB_URI=mongodb+srv://seu_usuario:sua_senha@cluster.mongodb.net/gestao_fabrica
   PORT=5000
   ```

### ▶️ Executando a Aplicação

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```
Servidor rodando em: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
npm start
```
Aplicação abrirá automaticamente em: http://localhost:3000

### 🌱 Populando o Banco de Dados (Seed)

Para popular o banco com dados iniciais:
```bash
cd backend
npm run seed
```

### 📦 Build para Produção

Para criar uma versão otimizada para produção:
```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `build/`.



☁️ Deploy no Render

O projeto foi publicado utilizando a plataforma Render, permitindo acesso online ao backend e ao frontend sem necessidade de instalação local.

🔗 URLs do Sistema

🛠️ Backend (API REST):
➤https://sistema-de-gestao-de-fabrica-de.onrender.com

🌐 Frontend (aplicação web):
➤https://sistema-de-gestao-de-fabrica.onrender.com/

📦 Arquitetura do Deploy

O deploy foi separado em dois serviços independentes:


1️⃣ Backend (Node + Express + MongoDB)


Publicado como Web Service
Porta obtida via variável de ambiente PORT
Integração com MongoDB Atlas
Credenciais protegidas via Render Environment
Exemplo de variáveis:
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/gestao_fabrica
PORT=10000


2️⃣ Frontend (React — Deploy Estático)


Publicado como Static Site
Build gerado com:
npm run build


Diretório de publicação: build


🔄 Regras SPA (React Router)


No painel do Render → Static Site → Redirect Rules:

Source: /*
Destination: /index.html
Status: 200


▶️ Passo a Passo do Deploy


🔧 Backend
Acessar https://render.com
New + → Web Service
Conectar repositório GitHub
Configuração:
Runtime: Node
Build Command: npm install
Start Command: npm start
Branch: main
Adicionar variáveis de ambiente:
MONGODB_URI
PORT
Deploy automático ativo

🔧 Frontend
New + → Static Site
Selecionar mesmo repositório
Configuração:
Build Command: npm run build
Publish Directory: build/
Adicionar regra de rewrite (SPA)

⚠️ Observações Importantes
Serviços gratuitos do Render hibernam após inatividade
→ O primeiro acesso pode demorar ~30s
Em erros de requisição CORS:
Alterar origin no backend para o domínio real do frontend   
---

## 🏗️ Estrutura do Projeto

```
DSM-P3-G04-2025-2/
├── backend/                    # Servidor Node.js + Express
│   ├── config/
│   │   └── db.js              # Configuração MongoDB
│   ├── controllers/           # Lógica de negócio
│   │   ├── clientesController.js
│   │   ├── materiasController.js
│   │   ├── produtosController.js
│   │   ├── ordemProducaoController.js
│   │   └── notificacoesController.js
│   ├── models/                # Schemas Mongoose
│   │   ├── Cliente.js
│   │   ├── MateriaPrima.js
│   │   ├── Produto.js
│   │   ├── OrdemProducao.js
│   │   ├── Pedido.js
│   │   └── Notificacao.js
│   ├── routes/                # Rotas da API
│   │   ├── clientes.js
│   │   ├── materias.js
│   │   ├── produtos.js
│   │   ├── ordemProducaoRoutes.js
│   │   └── notificacoes.js
│   ├── seed/
│   │   └── seed.js            # Dados iniciais
│   ├── .env                   # Variáveis de ambiente
│   ├── server.js              # Entry point do backend
│   └── package.json
├── src/                       # Frontend React
│   ├── components/
│   │   ├── Layout.js          # Layout com sidebar
│   │   └── FichaTecnica.js    # Gestão de composição
│   ├── pages/
│   │   ├── Dashboard.js       # Página inicial
│   │   ├── Clientes.js        # CRUD Clientes
│   │   ├── MateriasPrimas.js  # CRUD Matérias-primas
│   │   ├── Produtos.js        # CRUD Produtos + Fichas
│   │   └── Ordens.js          # Ordens de Produção
│   ├── App.css
│   ├── App.js                 # Rotas React Router
│   └── index.js
├── public/
│   └── index.html
├── package.json               # Dependências frontend
└── README.md
```

---

## 🎯 Funcionalidades

### ✅ Módulos Implementados

#### 1. **Dashboard**
   - Página inicial com boas-vindas ao sistema
   - Visão geral do sistema de gestão

#### 2. **Gerenciamento de Clientes**
   - ✅ Listar todos os clientes
   - ✅ Cadastrar novo cliente
   - ✅ Editar dados do cliente
   - ✅ Excluir cliente
   - Campos: nome, CPF/CNPJ, contato

#### 3. **Gerenciamento de Matérias-Primas**
   - ✅ Listar matérias-primas
   - ✅ Cadastrar matéria-prima
   - ✅ Editar matéria-prima
   - ✅ Excluir matéria-prima
   - Campos: nome, descrição, unidade de medida
   - **Matérias disponíveis:**
     - Papelão Ondulado Simples/Duplo
     - Papel Kraft
     - Cola Branca Industrial
     - Tinta Flexográfica
     - Fita Adesiva Kraft
     - Grampos Metálicos
     - Verniz Protetor

#### 4. **Gerenciamento de Produtos Finais**
   - ✅ Listar produtos de cartonagem
   - ✅ Cadastrar novo produto
   - ✅ Editar produto existente
   - ✅ Excluir produto
   - ✅ Visualizar ficha técnica completa
   - Campos: ID automático, nome, descrição, preço
   - **Produtos exemplo:**
     - Caixas de Papelão (Pequena, Média, Grande)
     - Embalagens Personalizadas
     - Displays de Papelão

#### 5. **Ficha Técnica de Produtos**
   - ✅ Visualizar composição detalhada
   - ✅ Adicionar matéria-prima à composição
   - ✅ Editar quantidade de matéria-prima
   - ✅ Remover item da composição
   - Interface em tabela organizada
   - Controle de quantidade por unidade de medida

#### 6. **Gerenciamento de Ordens de Produção**
   - Criação de ordens de produção
   - Associação com produtos e clientes
   - Controle de matérias-primas utilizadas
   - Rastreamento de status (pendente, em produção, finalizado)
   - Observações e notas de produção

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React** (v18.2.0) - Biblioteca para interfaces
- **React Router DOM** (v6.20.0) - Navegação SPA
- **CSS3** - Estilização responsiva
- **Fetch API** - Requisições HTTP

### Backend
- **Node.js** - Runtime JavaScript
- **Express** (v4.18.2) - Framework web
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** (v7.5.0) - ODM para MongoDB
- **CORS** - Controle de requisições cross-origin
- **dotenv** - Gerenciamento de variáveis de ambiente

### DevTools
- **Nodemon** - Hot reload no desenvolvimento
- **React Scripts** - Build e desenvolvimento

---

## 📡 API Endpoints

### Produtos
- `GET /api/produtos` - Listar todos
- `GET /api/produtos/:id` - Buscar por ID
- `POST /api/produtos` - Criar novo
- `PUT /api/produtos/:id` - Atualizar
- `DELETE /api/produtos/:id` - Excluir

### Clientes
- `GET /api/clientes` - Listar todos
- `GET /api/clientes/:id` - Buscar por ID
- `POST /api/clientes` - Criar novo
- `PUT /api/clientes/:id` - Atualizar
- `DELETE /api/clientes/:id` - Excluir

### Matérias-Primas
- `GET /api/materias` - Listar todas
- `GET /api/materias/:id` - Buscar por ID
- `POST /api/materias` - Criar nova
- `PUT /api/materias/:id` - Atualizar
- `DELETE /api/materias/:id` - Excluir

### Ordens de Produção
- `GET /api/ordens-producao` - Listar todas
- `GET /api/ordens-producao/:id` - Buscar por ID
- `POST /api/ordens-producao` - Criar nova
- `PUT /api/ordens-producao/:id` - Atualizar
- `DELETE /api/ordens-producao/:id` - Excluir

### Notificações
- `GET /api/notificacoes` - Listar notificações

---

## 📝 Observações Importantes

### Persistência de Dados

✅ **Sistema completo com persistência:** Todos os dados são armazenados no MongoDB Atlas/Local e persistem entre sessões.

### Regras de Negócio

- IDs de produtos são gerados automaticamente no formato `P-001`, `P-002`, etc.
- Fichas técnicas permitem múltiplas matérias-primas por produto
- Unidades de medida variam conforme o tipo de matéria-prima (m², kg, litro, metro, unidade)
- Ordens de produção rastreiam o uso de matérias-primas

---

## 🐛 Solução de Problemas

### Erro de conexão com MongoDB

Verifique se:
1. O MongoDB está rodando localmente OU
2. As credenciais do MongoDB Atlas estão corretas no `.env`
3. O IP da sua máquina está liberado no MongoDB Atlas (Network Access)

### Porta 3000 ou 5000 já está em uso

**Windows (PowerShell):**
```powershell
# Para porta 3000 (frontend)
netstat -ano | findstr :3000
taskkill /PID <número_do_processo> /F

# Para porta 5000 (backend)
netstat -ano | findstr :5000
taskkill /PID <número_do_processo> /F
```

**Linux/Mac:**
```bash
# Para porta 3000
lsof -i :3000
kill -9 <PID>

# Para porta 5000
lsof -i :5000
kill -9 <PID>
```

### Erro ao instalar dependências

Limpe o cache e reinstale:
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### CORS Error

Certifique-se de que:
- O backend está rodando em `http://localhost:5000`
- O frontend está configurado para apontar para a URL correta
- CORS está habilitado no `backend/server.js`

---

## 🔄 Próximas Melhorias

- [ ] Autenticação e autorização de usuários
- [ ] Relatórios de produção
- [ ] Dashboard com gráficos e métricas
- [ ] Controle de estoque de matérias-primas
- [ ] Notificações em tempo real
- [ ] Histórico de alterações
- [ ] Export de dados (PDF/Excel)
- [ ] Integração com sistemas de pagamento

---

## 📄 Licença

Este projeto é de propriedade acadêmica da FATEC Franca - Curso de Desenvolvimento de Software Multiplataforma.

**Uso exclusivo para fins educacionais.**

---

## 📞 Contato

Para dúvidas ou sugestões, entre em contato com a equipe do Grupo 04.

### Instituição
**FATEC Franca - 2025**
Faculdade de Tecnologia de Franca
Curso: Desenvolvimento de Software Multiplataforma

---

## 🙏 Agradecimentos

Agradecemos aos professores e orientadores do curso DSM pela orientação e suporte durante o desenvolvimento deste projeto interdisciplinar.
