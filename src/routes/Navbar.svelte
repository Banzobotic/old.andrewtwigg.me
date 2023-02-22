<script lang="ts">
    export let active: string = "";

    function get_active(link: string) {
        if (link == active) {
            return "active"
        } else  {
            return ""
        }
    }
</script>

<div class="navbar">
    <div class="header"><a href="/">Andrew Twigg</a></div>
    <div class="nav_options">
        <a class="{get_active("about")}" href="/about">About Me</a>
        <a class="{get_active("projects")}" href="/projects">Projects</a>
        <a class="{get_active("games")}" href="/games">Games</a>
    </div>
</div>
<div class="mobile_navbar_wrapper">
    <div class="mobile_nav_options">
        <a class="{get_active("about")}" href="/about">About Me</a>
        <a class="{get_active("projects")}" href="/projects">Projects</a>
        <a class="{get_active("games")}" href="/games">Games</a>
    </div>
</div>

<style>
    .navbar {
        background-color: rgb(17, 17, 20);
        display: flex;
        font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    }

    .header a {
        text-decoration: none;
        color: #2dbecf;
    }

    .nav_options {
        margin: auto 6vw auto auto;
    }

    .nav_options a {
        font-size: 2rem;
        margin-right: 2vw;
        text-decoration: none;
        color: white;
    }

    .nav_options a.active {
        color: #2dbecf;
    }

    .mobile_navbar_wrapper {
        background-color: black;
        font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    }

    .mobile_nav_options {
        width: 100%;
        display: table;
        table-layout: fixed;
        padding: 1rem 0;
    }

    .mobile_nav_options a {
        font-size: 2rem;
        text-decoration: none;
        color: white;
        display: table-cell;
        text-align: center;
    }

    .mobile_nav_options a.active {
        color: #2dbecf;
    }

    @media (min-aspect-ratio: 4/3) {
        .mobile_nav_options {
            display: none;
        }

        .header {
            font-size: 4rem;
            margin: 1rem 0 1rem 8vw;
        }
    }

    @media (max-aspect-ratio: 4/3) {
        .nav_options {
            display: none;
        }

        .header {
            font-size: 6rem;
            margin: 1.3rem auto
        }
    }
</style>
