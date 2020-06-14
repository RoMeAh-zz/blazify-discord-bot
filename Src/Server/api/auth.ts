import Route from "../lib/Route";

export default class extends Route {
    constructor() {
        super("/api/auth");
    }

    run(client: { oauthURL: any; } , app : any , req : any , res: { json: (arg0: { success: boolean; redirect: any; }) => any; }) {
        return res.json({ success: true, redirect: client.oauthURL });
    }
};