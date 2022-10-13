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
                <div class="title">BF Interpreter</div>
                <div class="description">
                    An interpreter for the <a href="https://en.wikipedia.org/wiki/Brainfuck">Brainf**k</a> programming language
                    <br><br>
                    Written in Rust
                </div>
            </div>
        </a>
    </div>
</body>

<style>
    ::-webkit-scrollbar {
        width: 0.6vw;
    }

    ::-webkit-scrollbar-thumb {
        background: #888;
        border: 4px solid transparent;
        border-radius: 0.3vw;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }

    body {
        background-color: #1f2125;
        margin: 0;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        overflow: overlay;
    }

    .list {
        margin: 0 auto;
        margin-top: 6vh;
        max-width: 50vw;
    }

    .item {
        display: flex;
        margin: 4vh 0;
        margin-right: 10vw;
        text-decoration: none;
    }

    .info {
        margin-left: 1vw
    }
    
    .title {
        color: #2dbecf;
        font-size: 3.5vw;
    }

    .description {
        color: white;
        font-size: 0.9vw;
        margin-top: 1vh;
    }

    img {
        width: 12vw;
        height: 12vw;
    }
</style>
