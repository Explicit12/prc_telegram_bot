import execCommand from "./execCommand";
import { getChatCommandResponse } from "../api/openaiAPI";

import type { AppBot } from "../types/types";

export default async function defineMessageHandler(
  botInstance: AppBot
): Promise<void> {
  botInstance.on("message:text", async (ctx) => {
    const commandName = await getChatCommandResponse(ctx.message.text);
    await execCommand(ctx, commandName);
  });
}
