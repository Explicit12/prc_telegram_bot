import { Bot } from "grammy";
import authMiddleware from "./utils/authMiddleware";
import defineCommands from "./utils/defineCommands";

import config from "./config.json";

async function main() {
  try {
    const bot = new Bot(config.user.telegramBotToken);

    // check weather user in white list.
    bot.use(authMiddleware);

    await defineCommands(bot);

    await bot.start();
  } catch (error) {
    console.log((error as Error).message);
    process.exit();
  }
}

main();
