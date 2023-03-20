<script lang="ts">
    import { onMount } from "svelte";
    import { calculate_units } from "$lib/units";

    import Navbar from "../../Navbar.svelte";

    import { Snake } from "./snake";
    import { browser } from "$app/environment";

    let adjusted_width: number;

    let snake = new Snake;

    let score: number;
    let high_score: number;
    let end_screen_visibility: string;

    snake.score_store.subscribe(value => {
        score = value;
    });
    snake.high_score_store.subscribe(value => {
        high_score = value;
    });
    snake.end_screen_store.subscribe(value => {
        end_screen_visibility = value
    });

    if (browser) {
        adjusted_width = calculate_units(window);

        document.getElementsByTagName("html")[0].style.fontSize = `${adjusted_width}vw`

        window.addEventListener('resize', () => {
            adjusted_width = calculate_units(window);

            document.getElementsByTagName("html")[0].style.fontSize = `${adjusted_width}vw`
        })
    }

    onMount (() => {
        snake.set_document_and_window(document, window);
        snake.set_canvas();

        document.addEventListener("keydown", (event: KeyboardEvent) => {
            snake.on_key_down(event)
        })

        window.requestAnimationFrame(function(timestamp) {
            snake.game_loop(timestamp)
        })
    });

    function start_moving() {
        snake.moving = true;
        snake.score = 0;
    }

    function play_again() {
        snake.play_again();
    }
</script>

<head>
    <title>Snake</title>
</head>

<body>
    <Navbar/>

    <!-- <button type="button" on:click={start_moving} style="height: 30px; width: 50px;"></button> -->
    <div class="game">
        <div class="scores-container">
            <p class="score">{score}</p>
            <p class="high-score">{high_score}</p>
        </div>
        <div class="end-screen" style="visibility: {end_screen_visibility};">
            <div class="score-line">
                <p class="left">Score:</p>
                <p class="right">{score}</p>
            </div>
            <div class="score-line">
                <p class="left">High Score:</p>
                <p class="right">{high_score}</p>
            </div>
            <button type="button" class="play-again-button" on:click={play_again}>Play Again</button>
        </div>
        <canvas id="game_board" width="595" height="525"></canvas>
    </div>
</body>

<style>
    body {
        background-color: #1f2125;
        margin: 0;
    }

    canvas {
        display: block;
        margin: 0 auto;
        padding-bottom: 50px;
    }

    .game {
        background-color: green;
        margin: auto;
        margin-top: 5vmin;
        width: 695px;
        border-radius: 30px;
    }
    
    .scores-container {
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        font-size: 60px;
        color: white;
        display: flex;
        padding: 10px 50px;
    }

    .score {
        margin: auto auto auto 50px;
    }
    
    .high-score {
        margin: auto 50px auto auto;
    }

    .end-screen {
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        font-size: 40px;
        text-align: center;
        background-color: rgb(39, 126, 232);
        border-radius: 30px;
        width: 350px;
        height: 400px;
        position: absolute;
        margin: 55px 172.5px;
    }

    .score-line {
        display: flex;
    }

    .score-line .left {
        margin: 30px auto 0 30px;
    }

    .score-line .right {
        margin: 30px 30px 0 auto;
    }

    .play-again-button {
        background-color: blue;
        border: none;
        width: 200px;
        height: 150px;
        margin-top: 40px;
        font-size: 45px;
        border-radius: 20px;
    }
</style>
