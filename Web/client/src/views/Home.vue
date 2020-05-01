<template>
    <div class="wrap">
        <button class="button" @click="login()">Login</button>
    </div>
</template>
<script>
    export default {
        name: "Home",
        methods: {
            login() {
                fetch("http://localhost:8080/api/auth")
                    .then(res => res.json())
                    .then(body => {
                        if (!body.success) return alert("An error occured!");
                        location.href = body.redirect;
                    });
            }
        }
    }
</script>
<style scoped>
    body {
        height: 100vh;
    }

    .wrap {
        height: 100%;
        display: flex;
        background: black;
        align-items: center;
        justify-content: center;
    }

    .button {
        min-width: 300px;
        min-height: 60px;
        font-family: "Nunito", sans-serif;
        font-size: 22px;
        text-transform: uppercase;
        letter-spacing: 1.3px;
        font-weight: 700;
        color: #313133;
        background: #4f5cd1;
        background: linear-gradient(90deg, rgb(129, 169, 230) 0%, rgb(79, 85, 209) 100%);
        border: none;
        border-radius: 1000px;
        box-shadow: 5px 5px 15px rgba(79, 209, 190, 0.64);
        transition: all 0.3s ease-in-out 0s;
        cursor: pointer;
        outline: none;
        position: relative;
        padding: 10px;
    }

    .button::before {
        content: '';
        border-radius: 1000px;
        min-width: calc(300px + 12px);
        min-height: calc(60px + 12px);
        border: 6px solid #00FFCB;
        box-shadow: 0 0 60px rgba(0, 255, 203, .64);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
        transition: all .3s ease-in-out 0s;
    }

    .button:hover, .button:focus {
        color: #313133;
        transform: translateY(-6px);
    }

    button:hover::before, button:focus::before {
        opacity: 1;
    }

    button::after {
        animation: ring 1.5s infinite;
        content: "";
        width: 30px; height: 30px;
        border-radius: 100%;
        border: 6px solid #002ccb;
        position: absolute;
        z-index: -1;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    @keyframes ring {
        0% {
            width: 30px;
            height: 30px;
            opacity: 1;
        }
        100% {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
</style>