import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const commands = new Map();

export const loadCommands = async () => {
  const commandsPath = path.join(__dirname, "../commands");
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const commandName = file.replace(".js", "");

    try {
      const commandModule = await import(filePath);
      const command =
        commandModule.default || commandModule[`${commandName}Command`];

      if (command) {
        commands.set(commandName, command);
        console.log(`Loaded command: ${commandName}`);
      }
    } catch (error) {
      console.error(`Error loading command ${commandName}:`, error);
    }
  }
};

export const handleCommand = async (message, commandName, args) => {
  const command = commands.get(commandName);

  if (command) {
    try {
      await command(message, args);
    } catch (error) {
      console.error(`Error executing command ${commandName}:`, error);
      message.reply("An error occurred while executing the command.");
    }
  } else {
    message.reply(`Unknown command: ${commandName}`);
  }
};

export const getCommands = () => commands;
