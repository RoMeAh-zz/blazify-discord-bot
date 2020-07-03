import React from "react"

export default function Config() {
    let contents: any[] = []
    let guild: any[] = []
    const params = new URLSearchParams(window.location.search)
        
    const toggle = (locale: string, type: string) => {
        if (locale === "prefix") {
            let { value } = (document.getElementById("prefix-input") as HTMLInputElement);
            if (value) value = value.trim();
            if (!value || value.length >= 3 || / /g.test(value))
                return alert("Please provide a valid prefix!(max 3 characters, no space)");
            type = value;
        }
        fetch(`http://localhost:8080/api/config/${params.get("id")}?locale=${locale}&type=${type}&access_token=${localStorage.getItem("access_token")}`,
            {method: "PUT"})
            .then(res => res.json())
            .then(body => {
                if (!body.success) return window.location.href = "/";
                if (body.data.name !== "prefix")
                    contents.find(x => x[0] === body.data.name)[1] = body.data.type;
                setTimeout(() => {
                    if (body.data.name !== "prefix")
                        alert(`${body.data.type ? "Enabled" : "Disabled"}: ${body.data.name}`);
                    else alert("Changed the prefix!")
                }, 2000);
            });
    }
    const mounted = () => {
    if (!params.get("id") || !localStorage.getItem("access_token")) return window.location.href = "/";
    fetch(`http://localhost:8080/api/guild/?id=${params.get("id")}&access_token=${localStorage.getItem("access_token")}`)
        .then(res => res.json())
        .then(body => {
            if (!body.success) return window.location.href = "/";
            guild = body.data.guild;
            contents = body.data.config.map((x: any[]) => [x[0].slice(6), x[1]]);
        })
}
return(
    <div id="prefix-input">
        okay
    </div>
)
}