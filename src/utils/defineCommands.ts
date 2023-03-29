import { exec } from "child_process";
import { type as getOSType } from "node:os";

import config from "../config.json";

import type { Bot } from "grammy";

export type OSType = "Windows" | "Linux";

export default async function defineCommands(botInstance: Bot): Promise<void> {
  const currentOS = getOSType() as OSType;
  const currentOSCommands = Object.entries(config.commands.OS[currentOS]);

  currentOSCommands.forEach(([name, command]) => {
    botInstance.command(name, () => exec(command));
  });

  const commandPreviews = currentOSCommands.map(([name]) => {
    return { command: name, description: name.split("_").join(" ") };
  });
  await botInstance.api.setMyCommands(commandPreviews);
}
