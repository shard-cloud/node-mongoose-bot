# Instalação e Deploy na ShardCloud

## 📋 Pré-requisitos

Antes de clonar este template na ShardCloud, você precisará ter:

### 1. Bot do Discord Configurado

Crie um bot no [Discord Developer Portal](https://discord.com/developers/applications):

1. Acesse https://discord.com/developers/applications
2. Clique em **"New Application"**
3. Dê um nome ao seu bot e aceite os termos
4. Na aba **"Bot"**, clique em **"Add Bot"**
5. **Copie o Token** (você precisará dele na ShardCloud)
   - ⚠️ **NUNCA compartilhe este token publicamente**
6. Configure as **Privileged Gateway Intents**:
   - ✅ Presence Intent (opcional)
   - ✅ Server Members Intent (opcional)
   - ✅ **Message Content Intent** (obrigatório)
7. Na aba **"OAuth2" → "URL Generator"**:
   - Selecione scope: `bot`
   - Selecione permissões: `Send Messages`, `Read Messages/View Channels`, `Read Message History`
   - Copie a URL gerada e use-a para adicionar o bot ao seu servidor

### 2. Banco de Dados MongoDB

Você precisa de uma instância MongoDB. Opções recomendadas:

**Opção A: MongoDB Atlas (Grátis)** ⭐ Recomendado

1. Acesse https://www.mongodb.com/cloud/atlas/register
2. Crie uma conta gratuita
3. Crie um **Cluster Gratuito** (M0)
4. Em **"Database Access"**, crie um usuário:
   - Username: `bot-user` (ou qualquer nome)
   - Password: Gere uma senha forte
   - Database Privileges: `Read and write to any database`
5. Em **"Network Access"**, adicione IP:
   - Clique em **"Add IP Address"**
   - Selecione **"Allow Access from Anywhere"** (0.0.0.0/0)
   - Confirme
6. Em **"Database" → "Connect"**:
   - Escolha **"Connect your application"**
   - Copie a **Connection String** (formato: `mongodb+srv://...`)
   - Substitua `<password>` pela senha criada

**Opção B: Outras Alternativas**

- [Railway](https://railway.app/) — MongoDB gerenciado
- [DigitalOcean](https://www.digitalocean.com/products/managed-databases-mongodb) — Database gerenciado
- Instância própria MongoDB (se aplicável)

---

## 🚀 Deploy na ShardCloud

### Passo 1: Clonar o Template

Após clonar este template na **ShardCloud**, a plataforma instalará automaticamente as dependências.

### Passo 2: Configurar Variáveis de Ambiente

Na interface da ShardCloud, configure as seguintes variáveis de ambiente:

| Variável | Valor | Obrigatório |
|----------|-------|-------------|
| `TOKEN` | Token do seu bot Discord | ✅ Sim |
| `DATABASE` | Connection string do MongoDB | ✅ Sim |
| `PREFIX` | Prefixo dos comandos (padrão: `!`) | ❌ Não |

**Exemplo de configuração:**

```env
TOKEN=YOUR_DISCORD_BOT_TOKEN_HERE
DATABASE=mongodb+srv://bot-user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/discord-bot?retryWrites=true&w=majority
PREFIX=!
```

⚠️ **IMPORTANTE**: Substitua `YOUR_DISCORD_BOT_TOKEN_HERE` e `YOUR_PASSWORD` pelos valores reais obtidos nos pré-requisitos.

**Como configurar na ShardCloud:**

1. Acesse o painel do seu projeto
2. Vá para **"Environment Variables"** ou **"Configurações"**
3. Adicione cada variável individualmente:
   - Nome: `TOKEN`
   - Valor: Cole o token do Discord
   - Salve
4. Repita para `DATABASE` e `PREFIX` (se desejar customizar)

### Passo 3: Iniciar o Bot

1. Na ShardCloud, clique em **"Deploy"** ou **"Start"**
2. A plataforma executará automaticamente:
   ```bash
   npm install  # Instalação de dependências
   node index.js  # Inicialização do bot
   ```

### Passo 4: Verificação Final

✅ **Sinais de sucesso nos logs:**

```
MongoDB connected
Loaded command: create
Loaded command: view
Logged in as SeuBot#1234
```

Se você ver essas mensagens, parabéns! Seu bot está online. 🎉

✅ **Teste o bot no Discord:**

1. Vá para o servidor onde adicionou o bot
2. Digite: `!ping`
3. O bot deve responder: `🏓 Pong! WS Ping: XXms`

---

## 🔄 Atualizações e Redeploy

Quando você fizer alterações no código:

1. Faça commit das mudanças no repositório
2. Na ShardCloud, clique em **"Redeploy"** ou **"Restart"**
3. A plataforma baixará as alterações e reiniciará o bot

---

## 📚 Próximos Passos

- Leia a documentação de [Configuração](config.md) para personalizar o bot
- Adicione novos comandos na pasta `commands/`
- Crie novos schemas no `database/schemas.js`
- Confira [Troubleshooting](troubleshooting.md) se encontrar problemas

---

## 🆘 Problemas Comuns

| Problema | Solução |
|----------|---------|
| Bot não conecta | Verifique o `TOKEN` nas variáveis de ambiente |
| Erro de banco de dados | Confirme a `DATABASE` connection string e IP whitelist |
| Comandos não funcionam | Verifique se Message Content Intent está ativado |

Para mais detalhes, consulte o guia de [Troubleshooting](troubleshooting.md).

