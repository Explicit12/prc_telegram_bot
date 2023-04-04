import { exec } from "child_process";
import currentOSCommands from "./currentOSCommands";

import type { AppContext } from "../types/types";
import type { CurrentOSCommands } from "./currentOSCommands";

export default async function execCommand(
  ctx: AppContext,
  commandName: string
): Promise<void> {
  const typedCommandName = commandName as keyof CurrentOSCommands;
  const responseCommand = currentOSCommands[typedCommandName];

  if (responseCommand) {
    const cp = exec(responseCommand);
    cp.on("close", cp.kill);

    await ctx.reply(`Operation ${commandName} done!`);
    return;
  }

  await ctx.reply("There is no such command");
  return;
}
