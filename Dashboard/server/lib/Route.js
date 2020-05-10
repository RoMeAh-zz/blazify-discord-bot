module.exports = class Route {
    constructor(path = "/", method = "get") {
        this.path = path;
        this.method = method;
    }
}