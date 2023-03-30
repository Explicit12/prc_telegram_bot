import { exec } from "child_process";
import currentOSCommands from "./currentOSCommands";

import type { Bot } from "grammy";

export default async function defineCommandHandler(
  botInstance: Bot
): Promise<void> {
  const currentOSCOmmandsEntries = Object.entries(currentOSCommands);

  currentOSCOmmandsEntries.forEach(([name, command]) => {
    botInstance.command(name, () => exec(command));
  });

  const commandPreviews = currentOSCOmmandsEntries.map(([name]) => {
    return { command: name, description: name.split("_").join(" ") };
  });
  await botInstance.api.setMyCommands(commandPreviews);
}
