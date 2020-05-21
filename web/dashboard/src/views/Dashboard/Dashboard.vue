<template>
    <v-container>
        <v-container grid-list-xl v-if="loading">
            <v-layout wrap>
                <v-flex
                        xs12
                        sm6
                        lg4>
                    <v-skeleton-loader
                            height="94"
                            type="list-item-two-line"
                            v-for="i in [1,2,3,4,5,6]"
                            :key="i"
                    >
                    </v-skeleton-loader>
                </v-flex>
            </v-layout>
        </v-container>
        <v-container grid-list-xl v-else>
            <v-layout wrap>
                <v-flex
                        xs12
                        sm6
                        lg4
                        v-for="guild in guilds"
                        :key="guild.id"
                >
                    <v-card hover :dark="dark" elevation="4" class="opacity-hover">
                        <v-list-item three-line>
                            <v-list-item-content>
                                <v-list-item-title class="headline mb-1">{{guild.name}}</v-list-item-title>
                            </v-list-item-content>

                            <v-list-item-avatar
                                    size="80"
                                    color="grey"
                            >
                                <v-img v-if="guild.icon"
                                       :src="`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`"></v-img>
                                <v-img v-else src=""></v-img>
                            </v-list-item-avatar>
                        </v-list-item>

                        <v-card-actions>
                            <v-btn :href="`/dashboard/guild/${guild.id}`" text elevation="2" v-if="guild.manageable"
                                   style="background-color: #00C853;">Manage
                            </v-btn>
                            <v-btn href="https://discordapp.com/oauth2/authorize?client_id=696756322825404416&scope=client&permissions=8"
                                   text elevation="3" v-else style="background-color: #31779d;">Add client
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-container>
</template>
<script>
    export default {
        name: "Dashboard",
        data: () => ({
            loading: true,
            guilds: []
        }),
        mounted() {
            const {access_token} = this.$route.query;
            if (access_token) localStorage.setItem("access_token", access_token);
            if (!localStorage.getItem("access_token")) location.href = "/";

            fetch(`https://blazify-dashboard.glitch.me/api/guilds?access_token=${localStorage.getItem("access_token")}`)
                .then(res => res.json())
                .then(body => {
                    if (!body.success) location.href = "/";
                    this.guilds = body.data;
                    this.loading = false;
                });
        }
    }
</script>