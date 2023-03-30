import { Bot } from "grammy";
import authMiddleware from "./utils/authMiddleware";
import defineCommandHandler from "./utils/defineCommandHandler";
import defineMessageHandler from "./utils/defineMessageHandler";

import config from "./config.json";

async function main() {
  try {
    const bot = new Bot(config.user.telegramBotToken);

    // check weather user in white list.
    bot.use(authMiddleware);

    await defineCommandHandler(bot);
    await defineMessageHandler(bot);

    bot.catch((err) => {
      err.ctx.reply(`Error: ${err.message}`);
    });

    await bot.start();
  } catch (error) {
    console.log((error as Error).message);
    process.exit();
  }
}

main();
