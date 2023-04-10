import { spawn } from "child_process";

export default async function convertToMp3(
  pathToFile: string
): Promise<string> {
  const pathToMp3 = pathToFile + ".mp3";
  const ffmpeg = spawn("ffmpeg", ["-i", pathToFile, pathToMp3]);
  await new Promise((res, rej) => {
    ffmpeg.on("close", (code) => {
      if (code === 0) res(code);
      rej(code);
    });
  });

  ffmpeg.kill();
  return pathToMp3;
}
