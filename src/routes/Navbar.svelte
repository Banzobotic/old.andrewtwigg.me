<script lang="ts">
    export let active: string;

    function get_active(link: string) {
        if (link == active) {
            return "active"
        } else  {
            return ""
        }
    }
</script>

<div class="navbar">
    <div class="header">Banzobotic</div>
    <div class="nav_options">
        <a class="{get_active("home")}" href="/">Home</a>
        <a class="{get_active("projects")}" href="/projects">Projects</a>
        <a class="{get_active("games")}" href="/games">Games</a>
    </div>
</div>

<style>
    .navbar {
        background-color: rgb(17, 17, 20);
        display: flex;
    }

    .header {
        font-size: 4vw;
        margin: 1vw 0 1vw 8vw;
        color: white;
    }

    .nav_options {
        margin: auto 6vw auto auto;
    }

    .nav_options a {
        font-size: 2vw;
        margin-right: 2vw;
        text-decoration: none;
        color: white;
    }

    .nav_options a.active {
        color: #2dbecf;
    }
</style>