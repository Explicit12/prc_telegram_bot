import { type as getOSType } from "node:os";

import config from "../config.json";

export type OSType = "Windows" | "Linux";
export type CurrentOSCommands = typeof currentOSCommands;

const currentOS = getOSType() as OSType;
const currentOSCommands = config.commands.OS[currentOS];
export default currentOSCommands;
