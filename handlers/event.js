const { readdirSync } = require("fs");
const ascii = require("ascii-table");
let table = new ascii("Events");

table.setHeading("Event", "Load Status");

module.exports = (client) => {
  
  const events = readdirSync(`./events/`).filter(file => file.endsWith(".js"));
  
  for (let file of events) {
    
    const event = require(`../events/${file}`);
    let eventName = file.split('.')[0];
    
    client.on(eventName, event.bind(null, client));
    
    if (event.bind) {
      table.addRow(file, '✅ -> Done')
    } else {
      table.addRow(file, '❌ -> Error')
      continue;
    };
  }
  
  console.log(table.toString());
}