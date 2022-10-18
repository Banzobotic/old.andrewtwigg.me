<script lang="ts">
    import Navbar from "./Navbar.svelte";
</script>

<head>
    <title>Home</title>
</head>

<body>
    <Navbar/>

    <div class="list">
        <div class="name">Latest Game</div>
        <a class="item" href="/games/picross">
            <img src="/images/picross.png" alt="Picross Board">
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

        <div class="name">Latest Project</div>
        <a class="item" href="/projects/brainfuck">
            <img src="/images/brainfuck/logo.png" alt="Brainfuck">
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

    .list {
        margin-top: 4vh;
    }

    .item {
        margin-top: 2vh;
        margin-bottom: 6vh;
        border: purple;
        border-width: 5px;
        border-style: solid;
    }
</style>
