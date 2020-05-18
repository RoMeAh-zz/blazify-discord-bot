const { basename, join} = require("path");
const ascii = require("ascii-table");
const { read } = require("../utils/functions");

module.exports = (client, dir) => {
  return new Promise((res) => {
    const table = new ascii("Events").setHeading("Events", "Load status");

    read(join(dir, "events")).forEach((path) => {
      const event = require(path);
      table.addRow(basename(path), "✅ -> Done");
      return client.on(basename(path, ".js"), event.bind(null, client));
    });

    res(table.toString());
  })
};
