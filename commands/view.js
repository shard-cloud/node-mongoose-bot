import { DataModel } from "../database/schemas.js";

const viewCommand = async (message) => {
  try {
    const allData = await DataModel.find();
    if (allData.length === 0) {
      message.reply("No data found");
      return;
    }

    const dataList = allData
      .map((item) => `${item.name}: ${item.value}`)
      .join("\n");
    message.reply(`Data:\n${dataList}`);
  } catch (error) {
    message.reply("Error viewing data");
  }
};

export default viewCommand;
