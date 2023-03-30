import { exec } from "child_process";
import currentOSCommands from "./currentOSCommands";
import getChatCommandResponse from "../api/getChatCommandResponse";

import type { Bot } from "grammy";
import type { CurrentOSCommands } from "./currentOSCommands";

export default async function defineMessageHandler(
  botInstance: Bot
): Promise<void> {
  botInstance.on("message:text", async (ctx) => {
    const commandName = await getChatCommandResponse(ctx.message.text);

    const typedCommandName = commandName as keyof CurrentOSCommands;
    const responseCommand = currentOSCommands[typedCommandName];

    if (responseCommand) {
      exec(responseCommand);
      await ctx.reply(`Operation ${responseCommand} done!`);
      return;
    }

    await ctx.reply("There is no such command");
    return;
  });
}
