import { OpenAIApi, Configuration as OpenAIApiConfig } from "openai";
import currentOSCommands from "../utils/currentOSCommands";
import { createReadStream } from "fs";

import config from "../config.json";

import type { ChatCompletionResponseMessage } from "openai";

const role: ChatCompletionResponseMessage = {
  role: "system",
  content: `You are programming and system administration assistant.
  Take only key of command from this object: ${JSON.stringify(
    currentOSCommands
  )}.
  Provide only key of command that most of all satisfy request prompt.
  Provide only key of command that satisfy request prompt.
  Provide only plain text without Markdown formatting.
  Do not provide key of commands that are not in the object above.
  Do not provide any other information inspite key of commands from the object above.
  Do not provide explanation of command key, command, or your decision.
  Do not show any warnings or information regarding your capabilities.
  If you need to store any data, assume it will be stored in the chat.
  Your answear should be the key of command from the object above or an empty string`,
};

const user: ChatCompletionResponseMessage = { role: "user", content: "" };

const openAIConfig = new OpenAIApiConfig({ apiKey: config.user.openAIKey });
const openai = new OpenAIApi(openAIConfig);

function getUserContent(userMassage: string): string {
  return `### 
          Your role: ${role.content} 
          Prompt: ${userMassage}
          ###
          Command key from provided object: `;
}

export async function getChatCommandResponse(
  userMassage: string
): Promise<string> {
  user.content = getUserContent(userMassage);

  const response = await openai.createChatCompletion(
    {
      messages: [role, user],
      model: "gpt-3.5-turbo",
    },
    { timeout: 5000 }
  );

  if (response.data.choices[0].message) {
    return response.data.choices[0].message.content
      .toString()
      .toLocaleLowerCase()
      .trim();
  }

  return "No command";
}

export async function audioToText(audioFile: string): Promise<string> {
  // The reson of createReadStream usage
  // https://github.com/openai/openai-node/issues/77#issuecomment-1452801077
  const response = await openai.createTranscription(
    createReadStream(audioFile),
    "whisper-1"
  );
  return response.data.text;
}
