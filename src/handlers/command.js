const { basename, join } = require("path");
const ascii = require("ascii-table");
const { read } = require("../utils/functions");

module.exports = (client, dir) => {
  return new Promise((res) => {
    const table = new ascii("Commands").setHeading("Command", "Load status");

    read(join(dir, "commands")).forEach((path) => {
      const command = require(path);
      if (command.name) {
        table.addRow(basename(path), "✅ -> Done");
        return client.commands.set(command.name, command);
      }
      table.addRow(basename(path), "❌ -> No name set.");
    });

    res(table.toString());
  });
};
