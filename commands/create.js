import { DataModel } from "../database/schemas.js";

const createCommand = async (message, args) => {
  if (args.length < 2) {
    message.reply("Usage: !create <name> <value>");
    return;
  }

  const [name, ...valueParts] = args;
  const value = valueParts.join(" ");

  try {
    const newData = new DataModel({ name, value });
    await newData.save();
    message.reply(`Created: ${name} = ${value}`);
  } catch (error) {
    message.reply("Error creating data");
  }
};

export default createCommand;
