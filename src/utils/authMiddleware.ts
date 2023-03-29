import { Context, NextFunction } from "grammy";
import config from "../config.json";

export default async function authMiddleware(
  ctx: Context,
  next: NextFunction
): Promise<void> {
  const { user } = await ctx.getAuthor();
  const whiteList = config.user.whiteList;
  if (whiteList.includes(String(user.id))) await next();
}
