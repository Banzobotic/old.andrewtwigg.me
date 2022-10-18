<script lang="ts">
    import Navbar from "../Navbar.svelte";
</script>

<head>
    <title>Projects</title>
</head>

<body>
    <Navbar active={"projects"}/>

    <div class="list">
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
</style>
