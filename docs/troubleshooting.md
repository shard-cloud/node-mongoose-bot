# Troubleshooting

Guia de solução de problemas comuns ao usar este template na **ShardCloud**.

---

## 🚨 Problemas de Conexão do Bot

### ❌ Erro: "Invalid Token" ou "Improper token has been passed"

**Causa**: Token do Discord inválido ou incorreto.

**Soluções**:

1. **Verifique o token na ShardCloud**:
   - Acesse as variáveis de ambiente do projeto
   - Confirme que `TOKEN` está configurado corretamente
   - O token NÃO deve conter espaços ou caracteres extras

2. **Regenere o token**:
   - Acesse [Discord Developer Portal](https://discord.com/developers/applications)
   - Vá para seu application → **Bot** → **Reset Token**
   - Copie o novo token e atualize na ShardCloud
   - Faça **redeploy** do bot

3. **Verifique o formato**:
   ```
   ✅ Correto: YOUR_BOT_TOKEN_HERE (sem aspas, espaços ou prefixos)
   ❌ Errado: "YOUR_BOT_TOKEN_HERE" (com aspas)
   ❌ Errado: Bearer YOUR_BOT_TOKEN_HERE (com prefixo)
   ```

---

### ❌ Bot está offline no Discord

**Causa**: Bot não está conseguindo iniciar ou conectar.

**Soluções**:

1. **Verifique os logs na ShardCloud**:
   - Acesse o painel de logs do seu projeto
   - Procure por erros específicos

2. **Mensagens de log esperadas** (sucesso):
   ```
   MongoDB connected
   Loaded command: create
   Loaded command: view
   Logged in as SeuBot#1234
   ```

3. **Se não aparecer "Logged in..."**:
   - Verifique a variável `TOKEN`
   - Confirme que o bot está habilitado no Discord Developer Portal
   - Faça redeploy na ShardCloud

4. **Se o processo crashar imediatamente**:
   - Verifique se todas as dependências foram instaladas
   - Confirme que você está usando Node.js 18+ na ShardCloud

---

## 🗄️ Problemas de Banco de Dados

### ❌ Erro: "MongoNetworkError" ou "Connection timeout"

**Causa**: Não consegue conectar ao MongoDB.

**Soluções**:

1. **Verifique se a variável DATABASE existe**:
   - Acesse variáveis de ambiente na ShardCloud
   - Confirme que `DATABASE` está presente (deve ser configurada automaticamente)
   - Se não existir, entre em contato com o suporte da ShardCloud

2. **Faça redeploy do projeto**:
   - Na ShardCloud, clique em **"Redeploy"** ou **"Restart"**
   - Aguarde alguns minutos para a conexão ser estabelecida
   - Verifique os logs para confirmar "MongoDB connected"

3. **Verifique status da plataforma**:
   - Problemas de conectividade podem ser temporários
   - Aguarde alguns minutos e tente novamente
   - Se persistir, contate o suporte da ShardCloud

---

### ❌ Erro: "Authentication failed"

**Causa**: Problema na autenticação com o MongoDB gerenciado.

**Soluções**:

1. **Verifique a variável DATABASE**:
   - Acesse variáveis de ambiente na ShardCloud
   - **NÃO modifique** a variável `DATABASE` manualmente
   - Ela deve ser gerenciada automaticamente pela plataforma

2. **Faça redeploy**:
   - Clique em **"Redeploy"** na ShardCloud
   - A plataforma regerará as credenciais se necessário

3. **Contate o suporte**:
   - Se o erro persistir, o problema pode ser na configuração do banco pela plataforma
   - Entre em contato com o suporte da ShardCloud

---

### ❌ Comandos não salvam dados / "Error creating data"

**Causa**: Problema na operação do banco de dados.

**Soluções**:

1. **Verifique logs para detalhes**:
   - Logs na ShardCloud podem mostrar o erro exato do MongoDB
   - Procure por stack traces que indiquem o problema específico

2. **Confirme conexão estabelecida**:
   - Nos logs, deve aparecer: `MongoDB connected`
   - Se não aparecer, volte para problemas de conexão acima

3. **Valide o schema**:
   - Se você modificou `database/schemas.js`, verifique a sintaxe
   - Faça rollback para o schema original e teste

4. **Teste comando simples**:
   - Execute `!create teste valor` no Discord
   - Execute `!view` para ver se o registro foi criado
   - Se `!view` mostrar dados, o problema é específico de um comando

---

## 💬 Problemas com Comandos

### ❌ Bot não responde a comandos (mas está online)

**Causa**: Falta de intents ou configuração incorreta.

**Soluções**:

1. **Verifique Message Content Intent**:
   - [Discord Developer Portal](https://discord.com/developers/applications)
   - Seu application → **Bot** → **Privileged Gateway Intents**
   - ✅ Habilite **Message Content Intent**
   - ⚠️ Salve e aguarde alguns minutos
   - Faça redeploy do bot na ShardCloud

2. **Verifique o prefixo**:
   - Se configurou `PREFIX` nas variáveis de ambiente, use esse prefixo
   - Padrão: `!` (ex: `!ping`, `!create`, `!view`)
   - Teste com o prefixo correto

3. **Verifique permissões no servidor Discord**:
   - O bot precisa das permissões:
     - Read Messages / View Channels
     - Send Messages
     - Read Message History
   - Verifique permissões do canal e do servidor

4. **Teste comando simples**:
   - Digite: `!ping`
   - Se funcionar, problema é com comandos específicos
   - Se não funcionar, problema é com Message Content Intent

---

### ❌ Comando específico não funciona

**Causa**: Erro no código do comando ou carregamento falhou.

**Soluções**:

1. **Verifique logs de carregamento**:
   - Nos logs, deve aparecer:
     ```
     Loaded command: create
     Loaded command: view
     ```
   - Se um comando não aparecer, há erro no arquivo

2. **Valide sintaxe do arquivo**:
   - Confirme que o arquivo exporta corretamente:
     ```javascript
     export default commandFunction;
     ```
   - Arquivo deve estar em `commands/` e terminar com `.js`

3. **Teste comandos individualmente**:
   - `!create teste valor` → Deve criar um registro
   - `!view` → Deve listar registros
   - Se aparecer "Unknown command", o comando não foi carregado

4. **Faça redeploy**:
   - Após corrigir código, sempre faça redeploy na ShardCloud

---

## 🔧 Problemas com Deploy na ShardCloud

### ❌ Build/Deploy falha

**Causa**: Erro durante instalação ou inicialização.

**Soluções**:

1. **Verifique logs de deploy**:
   - ShardCloud mostra logs durante o deploy
   - Procure por erros específicos

2. **Verifique `package.json`**:
   - Confirme que `"type": "module"` está presente
   - Confirme que dependências estão corretas

3. **Dependências faltando**:
   - Se logs mostram "Cannot find module", a dependência não foi instalada
   - Verifique se `package.json` contém todas as dependências necessárias
   - Force reinstalação na ShardCloud (delete `node_modules` ou redeploy)

4. **Versão do Node.js**:
   - Este projeto requer Node.js 18+
   - Configure na ShardCloud se necessário

---

### ❌ Bot reinicia constantemente (crash loop)

**Causa**: Erro crítico que faz o bot crashar.

**Soluções**:

1. **Analise os logs na ShardCloud**:
   - Identifique a mensagem de erro específica
   - Procure stack trace completo

2. **Erros comuns**:
   - Token inválido → Corrija variável `TOKEN`
   - Database timeout → Corrija variável `DATABASE` ou Network Access
   - Syntax error → Corrija código e faça redeploy

3. **Rollback de mudanças**:
   - Se o problema começou após alterações, faça rollback do código
   - Commit anterior funcionando e redeploy

---

## 📝 Como Verificar Configurações na ShardCloud

### Verificar Variáveis de Ambiente

1. Acesse painel do projeto na ShardCloud
2. Vá para **"Environment Variables"** ou **"Configurações"**
3. Confirme que as seguintes variáveis existem:
   - `TOKEN` → Token do Discord bot
   - `DATABASE` → Connection string MongoDB
   - `PREFIX` → (Opcional) Prefixo customizado

### Verificar Logs

1. Acesse painel do projeto
2. Vá para **"Logs"** ou **"Console"**
3. Logs em tempo real mostrarão:
   - Conexões bem-sucedidas
   - Comandos carregados
   - Erros detalhados

### Como Fazer Redeploy

1. Após corrigir variáveis ou fazer commit de código:
2. Clique em **"Redeploy"** ou **"Restart"**
3. Aguarde o processo completar
4. Verifique logs para confirmar sucesso

---

## 🧪 Testes e Validação

### Checklist de Funcionamento

Execute esta sequência para validar que tudo está funcionando:

1. ✅ Bot aparece online no Discord
2. ✅ `!ping` retorna latência
3. ✅ `!create teste valor` cria um registro
4. ✅ `!view` lista o registro criado
5. ✅ Logs mostram "MongoDB connected"
6. ✅ Logs mostram "Logged in as..."

Se todos os itens funcionam, o bot está 100% operacional!

---

## 🆘 Ainda com Problemas?

### Diagnóstico Geral

1. **Logs Completos**: Sempre consulte os logs na ShardCloud primeiro
2. **Variáveis**: Revise a variável `TOKEN` (DATABASE é automático)
3. **Intents**: Confirme Message Content Intent ativo no Discord
4. **Permissões**: Confirme permissões do bot no servidor Discord
5. **Redeploy**: Tente fazer redeploy quando houver problemas persistentes

### Recursos Adicionais

- **Discord.js Guide**: https://discordjs.guide/
- **Discord.js Docs**: https://discord.js.org/docs/
- **MongoDB Atlas Docs**: https://www.mongodb.com/docs/atlas/
- **Mongoose Docs**: https://mongoosejs.com/docs/
- **Discord Developer Portal**: https://discord.com/developers/docs

### Suporte ShardCloud

Para problemas específicos da plataforma ShardCloud:
- Consulte a documentação oficial da ShardCloud
- Entre em contato com o suporte da plataforma
- Verifique status da plataforma em caso de instabilidade

---

## 💡 Dicas de Prevenção

- ✅ Sempre teste localmente antes de fazer deploy (se possível)
- ✅ Use controle de versão (Git) para rollback rápido
- ✅ Documente customizações que você fizer
- ✅ Monitore logs regularmente para identificar problemas cedo
- ✅ Mantenha backups da configuração de variáveis de ambiente
- ✅ Atualize dependências com cautela (teste antes)

---

Se você seguiu todos os passos e ainda enfrenta problemas, revise a [Configuração](config.md) e [Instalação](install.md) para garantir que não pulou nenhuma etapa crítica.

