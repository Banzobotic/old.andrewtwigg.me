<script lang="ts">
    import Navbar from "../Navbar.svelte";
    import { onMount } from 'svelte';
    import { calculate_units } from '$lib/units';

    let adjusted_width: number;

    onMount(() => {
        adjusted_width = calculate_units(window);

        document.getElementsByTagName("html")[0].style.fontSize = `${adjusted_width}vw`

        window.addEventListener('resize', () => {
            adjusted_width = calculate_units(window);

            document.getElementsByTagName("html")[0].style.fontSize = `${adjusted_width}vw`
        })
    });

    
</script>

<head>
    <title>Games</title>
</head>

<body>
    <Navbar active={"games"}/>
    
    <div class="list">
        <a class="item" href="/games/picross">
            <img class="item_image" src="/images/picross.png" alt="Picross Board">
            <div class="info">
                <div class="name">Picross</div>
                <div class="description">
                    Try to fill in all the cells correctly
                    <br><br>
                    The numbers show how many cells are next to each other and in what order
                    <br><br>
                    Left click to fill in cells and right click to mark as empty
                </div>
            </div>
        </a>
        <a class="item" href="/games/snake">
            <img class="item_image" src="/images/snake.png" alt="Picross Board">
            <div class="info">
                <div class="name">Snake</div>
                <div class="description">
                    Eat food to grow bigger
                    <br><br>
                    Try to get the highest score possible
                    <br><br>
                    Use wasd or the arrow keys to move around
                </div>
            </div>
        </a>
    </div>
</body>

<style>
    @import "$lib/scrollbar.css";
    @import "$lib/body.css";
    @import "$lib/list.css";
</style>
