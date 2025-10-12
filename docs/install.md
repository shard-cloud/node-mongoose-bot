# Instalação e Deploy

## 📋 Pré-requisitos

Antes de clonar este template, você precisará ter:

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

✅ **Nada a fazer!** Um banco de dados MongoDB é criado e configurado automaticamente para você quando clona este template.

A variável de ambiente `DATABASE` será configurada automaticamente.

---

## 🚀 Deploy

### Passo 1: Clonar o Template

Ao clonar este template, a plataforma automaticamente:
- ✅ Instala todas as dependências
- ✅ Cria um banco de dados MongoDB
- ✅ Configura a variável `DATABASE` com a URL do banco

### Passo 2: Configurar Variável de Ambiente

Você só precisa configurar **UMA** variável de ambiente:

| Variável | Valor | Configuração |
|----------|-------|--------------|
| `TOKEN` | Token do seu bot Discord | ✅ **Você precisa configurar** |
| `DATABASE` | Connection string do MongoDB | ✅ **Configurado automaticamente** |
| `PREFIX` | Prefixo dos comandos (padrão: `!`) | ❌ Opcional |

**Como configurar:**

```env
TOKEN=YOUR_DISCORD_BOT_TOKEN_HERE
PREFIX=!
```

⚠️ **IMPORTANTE**: Substitua `YOUR_DISCORD_BOT_TOKEN_HERE` pelo token real obtido no Discord Developer Portal.

**Como configurar:**

1. Acesse o painel do seu projeto
2. Vá para **"Environment Variables"** ou **"Configurações"**
3. Adicione a variável `TOKEN`:
   - Nome: `TOKEN`
   - Valor: Cole o token do Discord
   - Salve
4. (Opcional) Adicione `PREFIX` se quiser usar outro prefixo além de `!`
5. A variável `DATABASE` já estará configurada automaticamente ✅

### Passo 3: Iniciar o Bot

1. Clique em **"Deploy"** ou **"Start"**
2. O sistema executará automaticamente:
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
2. Clique em **"Redeploy"** ou **"Restart"**
3. O sistema baixará as alterações e reiniciará o bot

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
| Erro de banco de dados | A variável `DATABASE` deve estar configurada automaticamente |
| Comandos não funcionam | Verifique se Message Content Intent está ativado no Discord |

Para mais detalhes, consulte o guia de [Troubleshooting](troubleshooting.md).

