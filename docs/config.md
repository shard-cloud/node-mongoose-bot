# Configuração

## 🔐 Variáveis de Ambiente

Todas as configurações sensíveis devem ser gerenciadas através de variáveis de ambiente **na ShardCloud**. Nunca inclua tokens ou senhas diretamente no código.

### Variáveis Obrigatórias

| Variável | Descrição | Exemplo | Como Obter |
|----------|-----------|---------|------------|
| `TOKEN` | Token de autenticação do bot Discord | `YOUR_BOT_TOKEN_HERE` | [Discord Developer Portal](https://discord.com/developers/applications) → Seu App → Bot → Token |
| `DATABASE` | Connection string do MongoDB | `mongodb+srv://user:pass@cluster.mongodb.net/dbname` | MongoDB Atlas → Cluster → Connect → Connection String |

### Variáveis Opcionais

| Variável | Descrição | Padrão | Exemplo |
|----------|-----------|--------|---------|
| `PREFIX` | Prefixo dos comandos de texto | `!` | `$`, `?`, `.`, `bot!` |

---

## ⚙️ Configuração no Discord Developer Portal

### Intents Necessários

Para que o bot funcione corretamente, você **DEVE** habilitar os seguintes intents no [Discord Developer Portal](https://discord.com/developers/applications):

1. Acesse seu application
2. Vá para **"Bot"** → **"Privileged Gateway Intents"**
3. Habilite:

| Intent | Obrigatório | Finalidade |
|--------|-------------|------------|
| **Message Content Intent** | ✅ Sim | Permite ler conteúdo de mensagens (necessário para comandos com prefixo) |
| **Server Members Intent** | ❌ Não | Necessário se for trabalhar com eventos de membros |
| **Presence Intent** | ❌ Não | Necessário se for monitorar status de usuários |

⚠️ **Sem o Message Content Intent, o bot não conseguirá ler os comandos!**

### Permissões do Bot

Ao gerar o link de convite do bot (OAuth2 → URL Generator), selecione no mínimo:

- ✅ `Send Messages` — Enviar mensagens
- ✅ `Read Messages/View Channels` — Ler mensagens e visualizar canais
- ✅ `Read Message History` — Ler histórico de mensagens
- ✅ `Embed Links` — Incorporar links (opcional, mas recomendado)
- ✅ `Attach Files` — Anexar arquivos (opcional)

---

## 🗄️ Configuração do MongoDB

### Connection String

A connection string deve seguir um dos formatos:

**MongoDB Atlas (Recomendado):**
```
mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
```

**MongoDB Standalone:**
```
mongodb://<username>:<password>@<host>:<port>/<database>
```

### Parâmetros Importantes

| Parâmetro | Descrição | Recomendado |
|-----------|-----------|-------------|
| `retryWrites=true` | Retry automático em falhas de escrita | Sim |
| `w=majority` | Confirmação de escrita em maioria dos nós | Sim |
| `authSource=admin` | Database de autenticação | Se necessário |

### Segurança MongoDB Atlas

- ✅ **Network Access**: Configure o IP `0.0.0.0/0` (permitir todos) ou adicione o IP da ShardCloud
- ✅ **Database User**: Crie um usuário específico com permissões `readWrite` no database do bot
- ✅ **Strong Password**: Use senhas fortes e complexas

---

## 🎨 Personalização do Bot

### Alterar o Prefixo

Você pode alterar o prefixo dos comandos de duas formas:

**Opção 1: Via Variável de Ambiente (Recomendado)**

Configure na ShardCloud:
```env
PREFIX=$
```

Agora os comandos serão: `$ping`, `$create`, `$view`

**Opção 2: Via Código**

Edite o arquivo `index.js`, linha 16:
```javascript
const prefix = process.env.PREFIX || "?";  // Altera padrão para "?"
```

### Customizar Comandos Existentes

#### Modificar Resposta do Comando Ping

Edite `index.js`, linhas 28-31:

```javascript
if (message.content === `${prefix}ping`) {
  message.reply(`✅ Bot online! Latência: ${client.ws.ping}ms`);
  return;
}
```

#### Adicionar Validações ao Comando Create

Edite `commands/create.js`:

```javascript
const createCommand = async (message, args) => {
  // Exemplo: Limitar tamanho do nome
  if (args[0] && args[0].length > 50) {
    message.reply("❌ Nome muito longo! Máximo 50 caracteres.");
    return;
  }
  
  // Resto do código...
};
```

---

## ➕ Adicionar Novos Comandos

O sistema carrega comandos automaticamente da pasta `commands/`. Para adicionar um novo:

### Exemplo: Comando Delete

Crie `commands/delete.js`:

```javascript
import { DataModel } from "../database/schemas.js";

const deleteCommand = async (message, args) => {
  if (args.length < 1) {
    message.reply("Usage: !delete <name>");
    return;
  }

  const name = args[0];

  try {
    const result = await DataModel.deleteOne({ name });
    
    if (result.deletedCount > 0) {
      message.reply(`✅ Deleted: ${name}`);
    } else {
      message.reply(`❌ Not found: ${name}`);
    }
  } catch (error) {
    message.reply("❌ Error deleting data");
  }
};

export default deleteCommand;
```

**O comando será carregado automaticamente no próximo restart!** Use: `!delete <name>`

---

## 📊 Adicionar Novos Schemas

Para armazenar diferentes tipos de dados, crie novos schemas no `database/schemas.js`:

### Exemplo: Schema de Usuários

```javascript
import mongoose from "mongoose";

// Schema existente
const dataSchema = new mongoose.Schema({
  name: String,
  value: String,
  createdAt: { type: Date, default: Date.now },
});

// Novo schema de usuários
const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  username: String,
  level: { type: Number, default: 1 },
  xp: { type: Number, default: 0 },
  coins: { type: Number, default: 100 },
  lastDaily: Date,
  createdAt: { type: Date, default: Date.now }
});

export const DataModel = mongoose.model("Data", dataSchema);
export const UserModel = mongoose.model("User", userSchema);
```

Use no comando:
```javascript
import { UserModel } from "../database/schemas.js";

const user = await UserModel.findOne({ userId: message.author.id });
```

---

## 🔒 Boas Práticas de Segurança

### ✅ Faça

- ✅ Use variáveis de ambiente para TODAS as credenciais
- ✅ Valide todas as entradas dos usuários
- ✅ Implemente rate limiting em comandos críticos
- ✅ Use try-catch em todas as operações de banco de dados
- ✅ Registre (log) erros, mas não informações sensíveis
- ✅ Mantenha dependências atualizadas

### ❌ Não Faça

- ❌ Nunca commite tokens ou senhas no código
- ❌ Não confie cegamente em input de usuários
- ❌ Não expõe informações do sistema em mensagens de erro
- ❌ Não dê permissões administrativas desnecessárias ao bot
- ❌ Não armazene senhas em texto plano no banco

---

## 🎯 Configuração Avançada

### Adicionar Múltiplas Intents

Edite `index.js`, linhas 8-14:

```javascript
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,      // Eventos de membros
    GatewayIntentBits.GuildPresences,    // Status de usuários
  ],
});
```

### Adicionar Event Handlers

Crie `handlers/eventHandler.js`:

```javascript
export const setupEvents = (client) => {
  client.on("guildMemberAdd", (member) => {
    console.log(`${member.user.tag} entrou no servidor`);
    // Enviar mensagem de boas-vindas, etc
  });
  
  client.on("messageDelete", (message) => {
    console.log(`Mensagem deletada: ${message.content}`);
    // Log de auditoria, etc
  });
};
```

Importe em `index.js`:
```javascript
import { setupEvents } from "./handlers/eventHandler.js";
setupEvents(client);
```

---

## 📚 Recursos Adicionais

- [Discord.js Documentation](https://discord.js.org/docs/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [Discord Developer Portal](https://discord.com/developers/docs)
- [MongoDB Atlas Docs](https://www.mongodb.com/docs/atlas/)

Para problemas específicos, consulte [Troubleshooting](troubleshooting.md).

