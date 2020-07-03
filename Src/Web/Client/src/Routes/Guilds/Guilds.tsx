import React, { useState } from "react";

export default function Guilds() {
    let guilds: any[] = [];
    let [rendered, setRender] = useState(false)
    if(!rendered) {
    try {
        const params = new URLSearchParams(window.location.search)
        let access_token = params.get("access_token")
        if(localStorage.getItem("access_token") == access_token) {
            localStorage.removeItem("access_token")
            if(typeof access_token === "string") {
            localStorage.setItem("access_token", access_token)
            window.location.href = "/dashboard/guilds"
            }
        } else if(!localStorage.getItem("access_token")) {
            if(typeof access_token === "string")
            localStorage.setItem("access_token", access_token)
            window.location.href = "/dashboard/guilds"
        }
       fetch(`http://localhost:8080/api/guilds?access_token=${localStorage.getItem("access_token")}`)
            .then(res => res.json())
            .then(body => {
                if (!body.success) window.location.href = "/";
                guilds = body.data;
                setRender(true);
            });
        } catch(err) {
        console.log(err)
    }
    }
    return(
        <div className="ok">
            <h1>You have been redirected</h1>
        </div>
    )
}