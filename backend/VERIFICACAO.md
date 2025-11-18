# Backend Gestão de Fábrica - Status de Verificação

## ✅ Estrutura do Projeto

### Pastas e Arquivos
- ✅ `backend/config/db.js` - Conexão MongoDB
- ✅ `backend/models/` - Cliente, MateriaPrima, Notificacao, Produto, Pedido, OrdemProducao
- ✅ `backend/controllers/` - Lógica de cada recurso
- ✅ `backend/routes/` - Rotas REST
- ✅ `backend/seed/seed.js` - Script de população inicial
- ✅ `backend/server.js` - Servidor Express

### Modelos MongoDB
- ✅ Cliente - com id_cliente, nome, cpf_cnpj, contato
- ✅ MateriaPrima - com id_materia, nome, estoque (com limite de 350 placas)
- ✅ Notificacao - tipo, mensagem, referencia, lida
- ✅ Produto - id_produto, nome, descricao, preco
- ✅ Pedido - id_pedido, cliente, status
- ✅ OrdemProducao - produto, quantidade, status, materiais usados

## 📋 Endpoints Disponíveis

### Clientes
- `GET /api/clientes` - Listar todos
- `POST /api/clientes` - Criar novo
- `GET /api/clientes/:id` - Buscar por id_cliente
- `PUT /api/clientes/:id` - Atualizar
- `DELETE /api/clientes/:id` - Remover

### Matérias-Primas
- `GET /api/materias` - Listar todas
- `POST /api/materias` - Criar nova
- `GET /api/materias/:id` - Buscar por id_materia
- `PUT /api/materias/:id` - Atualizar (gera notificação se estoque ≤ 350 placas)
- `DELETE /api/materias/:id` - Remover

### Notificações
- `GET /api/notificacoes` - Listar todas
- `PUT /api/notificacoes/:id/ler` - Marcar como lida

### Ordens de Produção
- `GET /api/ordens-producao` - Listar todas
- `POST /api/ordens-producao` - Criar nova
- `GET /api/ordens-producao/:id` - Buscar por ID
- `PUT /api/ordens-producao/:id` - Atualizar
- `DELETE /api/ordens-producao/:id` - Remover

## 🔧 Verificações de Funcionamento

### Backend Rodando?
```powershell
# Verificar se servidor está na porta 5000
curl http://localhost:5000/

# Resultado esperado:
# {"ok":true,"message":"API Gestão de Fábrica (backend)"}
```

### Clientes no MongoDB?
```powershell
# Listar clientes
curl http://localhost:5000/api/clientes

# Resultado esperado (2 clientes de seed):
# [
#   {"id_cliente":"C-001","nome":"João Silva Ltda","cpf_cnpj":"12.345.678/0001-90",...},
#   {"id_cliente":"C-002","nome":"Maria Comércio S.A.","cpf_cnpj":"98.765.432/0001-10",...}
# ]
```

### Matérias-Primas com Estoque?
```powershell
# Listar matérias-primas
curl http://localhost:5000/api/materias

# Resultado esperado (3 itens com estoque):
# [
#   {"id_materia":"M-001","nome":"Placa circuito XYZ","estoque":360,"unidade_medida":"placa",...},
#   {"id_materia":"M-002","nome":"Plástico ABS","estoque":120,"unidade_medida":"kg",...},
#   {"id_materia":"M-003","nome":"Placa sinalização","estoque":350,"unidade_medida":"placa",...}
# ]
```

### Notificações de Estoque Baixo?
```powershell
# Listar notificações
curl http://localhost:5000/api/notificacoes

# Resultado esperado (matérias com estoque ≤ 350 placas):
# [
#   {"tipo":"estoque_baixo","mensagem":"Matéria-prima \"Placa sinalização\" (ID M-003) está com 350 placas — estoque baixo.","referencia":"M-003",...}
# ]
```

### Criar Matéria-Prima?
```powershell
# Criar nova matéria-prima
curl -X POST http://localhost:5000/api/materias `
  -H "Content-Type: application/json" `
  -d '{"nome":"Nova Placa","descricao":"Teste","unidade_medida":"placa","estoque":340}'

# Resultado esperado: nova matéria criada com ID M-004 e notificação disparada
```

### Atualizar Estoque e Disparar Alerta?
```powershell
# Reduzir estoque para 340 (< 350)
curl -X PUT http://localhost:5000/api/materias/M-001 `
  -H "Content-Type: application/json" `
  -d '{"estoque":340}'

# Verificar notificações
curl http://localhost:5000/api/notificacoes

# Resultado: nova notificação de estoque baixo criada
```

## 🖥️ Comandos para Rodar Localmente

### 1. Instalar Dependências (já feito)
```powershell
cd C:\Users\Gabriel\Desktop\DSM-P3-front-3sem\backend
npm install
```

### 2. Configurar .env (se usar MongoDB Atlas)
```powershell
# Copiar .env.example para .env
copy .env.example .env

# Editar .env com suas credenciais
# MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/gestao_fabrica
```

### 3. Popular Banco (Seed)
```powershell
npm run seed
```

### 4. Rodar Servidor
```powershell
# Modo desenvolvimento (com nodemon)
npm run dev

# Ou modo produção
npm start
```

### 5. Testar no Frontend
- Abrir `http://localhost:3000`
- Ir em "Matérias-Primas"
- Ver lista (GET /api/materias)
- Adicionar nova matéria (POST /api/materias)
- Atualizar estoque (PUT /api/materias/:id)
- Ver notificações quando estoque ≤ 350

## ⚠️ Checklist de Status

- [x] Backend rodando na porta 5000
- [x] MongoDB conectado
- [x] Seed executado com sucesso
- [x] Rotas de Clientes funcionando
- [x] Rotas de Matérias-Primas funcionando
- [x] Sistema de notificações de estoque baixo ativo
- [x] Rotas de Ordens de Produção importadas
- [x] CORS habilitado para frontend
- [x] Modelos com relacionamentos prontos
- [x] Frontend apontando para backend (http://localhost:5000)

## 🚀 Próximos Passos

1. Testar endpoints com Postman/Insomnia
2. Implementar CRUD de Produtos se necessário
3. Implementar CRUD de Pedidos se necessário
4. Atualizar página Ordens.js para consumir `/api/ordens-producao`
5. Atualizar página Produtos.js se existir
6. Adicionar testes unitários para rotas críticas
