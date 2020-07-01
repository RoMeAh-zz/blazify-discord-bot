<template>
    <v-container fluid>
        <v-container
                grid-list-xl
                class="elevation-6"
                style="background: linear-gradient(to right, #19d7f8,#db1bf6);">
            <h1>Guild Settings</h1>
            <v-text-field id="prefix-input" label="Prefix" dark style="width: 50%"></v-text-field>
            <v-btn :loading="loader" :disabled="loader" color="primary" @click="toggle('prefix')">Change Prefix</v-btn>
            <v-layout wrap>
                <v-flex
                        xs12
                        sm6
                        lg4
                        v-for="(content) in contents" :key="content[0]" :id="content[0]"
                >
                    <v-card-title>{{content[0]}}</v-card-title>
                    <v-btn v-if="content[1]" color="error"
                           :loading="loader"
                           :disabled="loader"
                           @click="toggle(content[0], 'disable')">Disable
                    </v-btn>
                    <v-btn v-else color="primary"
                           :loading="loader"
                           :disabled="loader"
                           @click="toggle(content[0], 'enable')">Enable
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    </v-container>
</template>
<script>
    export default {
        name: "GuildDashboard",
        data: () => ({
            guild: {},
            contents: [],
            loader: false
        }),
        methods: {
            toggle(locale, type) {
                if (locale === "prefix") {
                    let {value} = document.getElementById("prefix-input");
                    if (value) value = value.trim();
                    if (!value || value.length >= 3 || / /g.test(value))
                        return alert("Please provide a valid prefix!(max 3 characters, no space)");
                    type = value;
                }
                this.loader = true;
                fetch(`http://localhost:8080/api/config/${this.$route.params.id}?locale=${locale}&type=${type}&access_token=${localStorage.getItem("access_token")}`,
                    {method: "PUT"})
                    .then(res => res.json())
                    .then(body => {
                        if (!body.success) return location.href = "/";
                        if (body.data.name !== "prefix")
                            this.contents.find(x => x[0] === body.data.name)[1] = body.data.type;
                        setTimeout(() => {
                            if (body.data.name !== "prefix")
                                alert(`${body.data.type ? "Enabled" : "Disabled"}: ${body.data.name}`);
                            else alert("Changed the prefix!")
                            this.loader = false;
                        }, 2000);
                    });
            }
        },
        mounted() {
            if (!this.$route.params.id || !localStorage.getItem("access_token")) return location.href = "/";
            fetch(`http://localhost:8080/api/guild/?id=${this.$route.params.id}&access_token=${localStorage.getItem("access_token")}`)
                .then(res => res.json())
                .then(body => {
                    if (!body.success) return location.href = "/";
                    this.guild = body.data.guild;
                    this.contents = body.data.config.map(x => [x[0].slice(6), x[1]]);
                    this.loaders = Array(this.contents.length).fill(false);
                })
        }
    }
</script>
<style>
    html {
        scroll-behavior: smooth;
    }
</style>