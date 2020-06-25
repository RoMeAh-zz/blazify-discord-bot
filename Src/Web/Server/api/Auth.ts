import Route from "../lib/Route";

export default class extends Route {
    constructor() {
        super("/api/auth");
    }

    run(client: { oauthURL: string; } , res: { json: (arg0: { success: boolean; redirect: string; }) => Promise<void>; }) {
        return res.json({ success: true, redirect: client.oauthURL });
    }
};