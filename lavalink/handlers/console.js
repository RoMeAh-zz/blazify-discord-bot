module.exports = (client) => {
    let prompt = process.openStdin()
    prompt.addListener("data", res => {
        let x = res.toString().trim().split(/ +/g)
            client.channels.get("696786895933538435").send(x.join(" "));
        });
    }