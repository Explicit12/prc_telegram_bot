import { Bot } from "grammy";
import { hydrateFiles } from "@grammyjs/files";
import authMiddleware from "./utils/authMiddleware";
import defineCommandHandler from "./utils/defineCommandHandler";
import defineMessageHandler from "./utils/defineMessageHandler";
import defineVoiceHandler from "./utils/defineVoiceHandler";

import config from "./config.json";

import { AppContext } from "./types/types";

async function main() {
  try {
    const bot = new Bot<AppContext>(config.user.telegramBotToken);

    bot.api.config.use(hydrateFiles(bot.token));
    // check weather user in white list.
    bot.use(authMiddleware);

    await defineCommandHandler(bot);
    await defineMessageHandler(bot);
    await defineVoiceHandler(bot);

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
