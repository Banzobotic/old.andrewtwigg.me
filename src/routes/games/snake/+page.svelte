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

    snake.score_store.subscribe(value => {
        score = value;
    });
    snake.high_score_store.subscribe(value => {
        high_score = value;
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
        <div class="end-screen">
            <p>Score: {score}</p>
            <p>High Score: {high_score}</p>
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
        border-radius: 5px;
        width: 300px;
        height: 300px;
        /* position: absolute; */
        margin: 0 auto;
    }
</style>
