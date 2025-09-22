import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import connectDB from "./database/connection.js";
import { loadCommands, handleCommand } from "./handlers/commandHandler.js";

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const prefix = process.env.PREFIX || "!";

connectDB();
await loadCommands();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content === `${prefix}ping`) {
    message.reply(`🏓 Pong! WS Ping: ${client.ws.ping}ms`);
    return;
  }

  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    await handleCommand(message, commandName, args);
  }
});

client.login(process.env.TOKEN);
