<script lang="ts">
    import { onMount } from "svelte";
    import { calculate_units } from "$lib/units";

    import Navbar from "../../Navbar.svelte";

    import { Snake } from "./snake";
    import { browser } from "$app/environment";

    let adjusted_width: number;

    let snake = new Snake;

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
    }
</script>

<head>
    <title>Snake</title>
</head>

<body>
    <Navbar/>

    <button type="button" on:click={start_moving} style="height: 30px; width: 50px;"></button>
    <canvas id="game_board" width="595" height="525"></canvas>
</body>

<style>
    body {
        background-color: #1f2125;
        margin: 0;
    }

    canvas {
        margin: auto;
        display: block;
        margin-top: 5vmin;
    }
</style>
