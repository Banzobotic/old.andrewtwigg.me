<script lang="ts">
    import Navbar from "../Navbar.svelte";
</script>

<head>
    <title>Games</title>
</head>

<body>
    <Navbar active={"games"}/>
    
    <div class="game_list">
        <a class="game" href="/games/picross">
            <img src="/images/picross.png" alt="Picross Board">
            <div class="game_info">
                <div class="game_title">Picross</div>
                <div class="game_description">
                    Try to fill in all the cells correctly
                    <br><br>
                    The numbers show how many cells are next to each other and in what order
                    <br><br>
                    Left click to fill in cells and right click to mark as empty
                </div>
            </div>
        </a>
    </div>
</body>

<style>
    body {
        background-color: #1f2125;
        margin: 0;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    }

    .game_list {
        margin: 0 auto;
        margin-top: 6vh;
        max-width: 50vw;
    }

    .game {
        display: flex;
        margin: 4vh 0;
        margin-right: 10vw;
        text-decoration: none;
    }

    .game_info {
        margin-left: 1vw
    }
    
    .game_title {
        color: #2dbecf;
        font-size: 3.5vw;
    }

    .game_description {
        color: white;
        font-size: 0.9vw;
        margin-top: 1vh;
    }

    img {
        width: 12vw;
    }
</style>
