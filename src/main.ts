import { Bot } from "grammy";
import authMiddleware from "./utils/authMiddleware";

import config from "./config.json";

async function main() {
  try {
    const bot = new Bot(config.user.telegramBotToken);

    // check weather user in white list.
    bot.use(authMiddleware);
  } catch (error) {
    process.exit();
  }
}

main();
