# PRC-TELEGRAM-BOT

Stands for Personal Remote Control telegram bot. The bot allow you to execuate any provided command by human-like language. It uses OpenAI api to parse your text and voice commands, so _api key is needed_. _Work only on linux for now_.

## Usage

1. Download built version or donwload source and build by `pnpm build` command, but don't forget to install dependecies.
2. Install [ffmpeg](https://ffmpeg.org/ "ffmpeg").
3. Provide User info in `dist/config-*.json` file.
4. Specify commands in `dist/config-*.json` file.
5. Run main.js file in _dist_ directory.

## Note

Provide more descriptive command names like `"turn_up_sound_level"` instead of `"make louder"` to make bot's command choice more accurate.
