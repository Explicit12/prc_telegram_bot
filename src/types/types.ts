import type { FileFlavor } from "@grammyjs/files";
import type { Context, Bot } from "grammy";

export type AppContext = FileFlavor<Context>;
export type AppBot = Bot<AppContext>;
