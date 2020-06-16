export default class Route {
    private method : string;
    private path : string;
    constructor(path = "/", method = "get") {
        this.path = path;
        this.method = method;
    }
};