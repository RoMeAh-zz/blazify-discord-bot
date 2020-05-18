const { readdirSync, lstatSync } = require("fs");
const { join } = require("path");

module.exports = {
  getMember: function (message, toFind = "") {
    toFind = toFind.toLowerCase();

    let target = message.guild.members.cache.get(toFind);

    if (!target && message.mentions.members)
      target = message.mentions.members.first();

    if (!target && toFind) {
      target = message.guild.members.find((member) => {
        return (
          member.displayName.toLowerCase().includes(toFind) ||
          member.user.tag.toLowerCase().includes(toFind)
        );
      });
    }

    if (!target) target = message.member;

    return target;
  },
  formatTime(milliseconds, minimal = false) {
    if (!milliseconds || isNaN(milliseconds) || milliseconds <= 0) {
      throw new RangeError(
        "Utils#formatTime(milliseconds: number) Milliseconds must be a number greater than 0"
      );
    }
    if (typeof minimal !== "boolean") {
      throw new RangeError(
        "Utils#formatTime(milliseconds: number, minimal: boolean) Minimal must be a boolean"
      );
    }
    const times = {
      years: 0,
      months: 0,
      weeks: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
    while (milliseconds > 0) {
      if (milliseconds - 31557600000 >= 0) {
        milliseconds -= 31557600000;
        times.years++;
      } else if (milliseconds - 2628000000 >= 0) {
        milliseconds -= 2628000000;
        times.months++;
      } else if (milliseconds - 604800000 >= 0) {
        milliseconds -= 604800000;
        times.weeks += 7;
      } else if (milliseconds - 86400000 >= 0) {
        milliseconds -= 86400000;
        times.days++;
      } else if (milliseconds - 3600000 >= 0) {
        milliseconds -= 3600000;
        times.hours++;
      } else if (milliseconds - 60000 >= 0) {
        milliseconds -= 60000;
        times.minutes++;
      } else {
        times.seconds = Math.round(milliseconds / 1000);
        milliseconds = 0;
      }
    }
    const finalTime = [];
    let first = false;
    for (const [k, v] of Object.entries(times)) {
      if (minimal) {
        if (v === 0 && !first) {
          continue;
        }
        finalTime.push(v < 10 ? `0${v}` : `${v}`);
        first = true;
        continue;
      }
      if (v > 0) {
        finalTime.push(`${v} ${v > 1 ? k : k.slice(0, -1)}`);
      }
    }
    let time = finalTime.join(minimal ? ":" : ", ");
    if (time.includes(",")) {
      const pos = time.lastIndexOf(",");
      time = `${time.slice(0, pos)} and ${time.slice(pos + 1)}`;
    }
    return time;
  },

  formatDate: function (date) {
    return new Intl.DateTimeFormat("en-US").format(date);
  },

  promptMessage: async function (message, author, time, validReactions) {
    // We put in the time as seconds, with this it's being transfered to MS
    time *= 1000;

    // For every emoji in the function parameters, react in the good order.
    for (const reaction of validReactions) await message.react(reaction);

    // Only allow reactions from the author,
    // and the emoji must be in the array we provided.
    const filter = (reaction, user) =>
      validReactions.includes(reaction.emoji.name) && user.id === author.id;

    // And ofcourse, await the reactions
    return message
      .awaitReactions(filter, { max: 1, time: time })
      .then((collected) => collected.first() && collected.first().emoji.name);
  },
  read: (directory, files = []) => {
    for (const path of readdirSync(directory)) {
      const full = join(directory, path);
      if (lstatSync(full).isDirectory())
        files.concat(module.exports.read(full, files));
      else if (path.endsWith(".js")) files.push(full);
    }

    return files;
  },
};
