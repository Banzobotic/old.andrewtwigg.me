<script lang="ts">
    import Navbar from "../Navbar.svelte";
</script>

<head>
    <title>Games</title>
</head>

<body>
    <Navbar active={"games"}/>
    
    <div class="list">
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
    </div>
</body>

<style>
    @import "$lib/scrollbar.css";
    @import "$lib/body.css";
    @import "$lib/list.css";
</style>
