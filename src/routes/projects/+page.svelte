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
    <title>Projects</title>
</head>

<body>
    <Navbar active={"projects"}/>

    <div class="list">
        <a class="item" href="/projects/brainfuck">
            <img class="item_image" src="/images/brainfuck/logo.png" alt="Brainfuck">
            <div class="info">
                <div class="name">BF Interpreter</div>
                <div class="description">
                    An interpreter for the <a class="link" href="https://en.wikipedia.org/wiki/Brainfuck">Brainf**k</a> programming language
                    <br><br>
                    Written in Rust
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
