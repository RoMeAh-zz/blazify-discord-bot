import Route from "../lib/Route";

export default class extends Route {
    constructor() {
        super("/api/auth");
    }

    run(client: { oauthURL: any; } , res: { json: (arg0: { success: boolean; redirect: any; }) => any; }) {
        return res.json({ success: true, redirect: client.oauthURL });
    }
};