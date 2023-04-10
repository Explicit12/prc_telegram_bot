import { rm } from "node:fs/promises";
import { dirname } from "node:path";
import convertToMp3 from "./convertToMp3";
import { audioToText, getChatCommandResponse } from "../api/openaiAPI";
import execCommand from "./execCommand";

import type { AppBot } from "../types/types";

export default async function defineVoiceHandler(
  botInstance: AppBot
): Promise<void> {
  botInstance.on("message:voice", async (ctx) => {
    const voice = await ctx.getFile();
    const pathToVoiceOgg = await voice.download();
    const pathToVoiceMp3 = await convertToMp3(pathToVoiceOgg);

    const text = await audioToText(pathToVoiceMp3);
    await rm(dirname(pathToVoiceMp3), { recursive: true, force: true });

    const commandName = await getChatCommandResponse(text);
    await execCommand(ctx, commandName);
  });
}
