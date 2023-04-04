import { exec } from "child_process";
import currentOSCommands from "./currentOSCommands";

import type { AppBot } from "../types/types";

export default async function defineCommandHandler(
  botInstance: AppBot
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
