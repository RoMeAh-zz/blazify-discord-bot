<div align="center">
  <br />
  <p>
    <img src="https://cdn.discordapp.com/avatars/719482391223205918/045ef202ee95380e8e13acab5d3f9d91.webp?size=1024" alt="Zodiac Logo" />
  </p>
  <br />
  <p>
    <a href="https://discord.gg/PpaaCJK"><img src="https://discordapp.com/api/guilds/714874374070599720/widget.png?style=shield" alt="Discord" /></a>
    <a href="https://twitter.com/ABlazify"><img src="https://img.shields.io/twitter/follow/ABlazify?label=Follow&style=social" alt="Twitter" /></a>
  </p>
  <br />
  <p>
  </p>
</div>

# Cloning of Repository

**Using the Console**

```shell script
git clone git@github.com:Blazify/zodiac-discord-bot.git
```

**or**

```shell script
git clone https://github.com/Blazify/zodiac-discord-bot
```

**Using this github page**

* **Just click on the fork button above to get a repo in your account**


# Adding New Commands

* **Here is a example on how to add commands**
```ts
import { Command } from "discord-akairo";
import { Message } from "discord.js";

export default class Ping extends Command {
    public constructor() {
        super("name", {
            aliases: ["alias", "aliases"],
            category: "Example",
            description: {
                content: "Content of Description",
                usage: "<<name",
                examples: [
                    "name"
                ]
            },
            ratelimit: 3,
        });
    }

    public exec(message: Message): Promise<Message> {
        return message.util.send(`TEST`)
    }
}
```

# Adding New Events

* **Only Ready Event is present in the repository for now but you can add em**

```ts
import { Listener } from "discord-akairo";

export default class ReadyListener extends Listener {
    public constructor() {
        super("event_name", {
            emitter: "emitter of event",
            event: "event_name",
            category: "example"
        })
    }
    public exec(): void {
        console.log(`EVENT WORKS`)
    }
}
```

# Contributing to this project

* **Fork and submit a pull request I'll check it out**
* **Can't help out in the code no big deal just click on the star button it will motivate us**
* **Wanna donate some money well u can if u want [PayPal](https://paypal.me/roahgaming)**

# What is this project about?

* **A Typescript Discord Bot for beginners**
* **RoMeAh's First Typescript bot and he's pretty confident as he had good experience and he started liking typescript..**
* **This bot is on the `discord.js` library and `discord-akairo` is also used**
* **SQLite is used as database as we always used MongoDB so I thought of using something new**
* **Easy and Simple Command and Event Handler made using `discord-akairo`**
* **Simple but working dashboard**

# Important
* **It won't work on Deno as the runtime environment you need to modify and we don't know whether the modules are present in Deno or not**
**You need the following things before you can kick off with Zodiac:**

* [**NodeJS Installed**](https://nodejs.org/en/download/)
* **Typescript installed globally by the command** 
```shell script
npm i -g typescript
```
or in linux for administrator
```shell script
sudo npm i -g typescript
```

# Documentation and Support

* **Our official documentation is available [here](https://zodiac.glitch.me).**
* **For any further query and support join us at [Blazify Development](https://discord.gg/PpaaCJK) discord.**

# Basic Startup Guide

* **After cloning the repository install all of the node modules by the command `npm install`**
* **Compile the raw Typescript into JavaScript by the command `tsc` in the console.**
* **Now start it normally by the command `node dist/Bot`**


# Author

* **RoMeAh**
* **Links: [GitHub](https://github.com/Blazify) | [Twitter](https://twitter.com/ABlazify)**
