<script lang="ts">
    import { onMount } from "svelte";
    import { Cell, CellType, CellStatus } from "./cell"
    

    function getRandomCell() {
        let random = Math.random();

        if (random < 0.5) {
            return new Cell(CellType.mine)
        } else {
            return new Cell(CellType.empty)
        }
    }

    let grid: Array<Array<Cell>> = [];

    onMount(() => {
        console.log("Starting js");
        for (let i = 0; i < 10; i++) {
            grid[i] = [];
            for (let j = 0; j < 10; j++) {
                grid[i].push(getRandomCell());
            }
        }
        console.log(grid);
    })
    
    async function onRightClick(e) {
        if (Array.from(e.target.classList).includes("box")) {
            boxClicked(e);
        }
        return false;
    }

    async function logEvent(e) {
        console.log(e);
    }

    async function boxClicked(e) {
        logEvent(e);
        let id = e.target.id.split("_");

        let x = parseInt(id[0]);
        let y = parseInt(id[1]);

        let cell = grid[y][x];

        if (cell.status == CellStatus.unClicked) {
            if (e.type == "click") {
                if (cell.type == CellType.empty) {
                    grid[y][x].status = CellStatus.correct;
                } else {
                    grid[y][x].status = CellStatus.incorrect;
                }
            } else {
                if (cell.type == CellType.mine) {
                    grid[y][x].status = CellStatus.correct;
                } else {
                    grid[y][x].status = CellStatus.incorrect;
                }
            }
        }
    }
</script>



<head>
    <title>Picross</title>
</head>

<body>
    <p><a href="/">Home</a></p>

    <main>
        <table class="grid">
            {#each grid as row, y}
                <tr>
                {#each row as _, x}
                    <td>
                    <button on:click={boxClicked} type=button id="{x}_{y}" class="box {grid[y][x].getStyle()}">{grid[y][x].getStatusChar()}</button>
                    </td>
                {/each}
                </tr>
            {/each}
        </table>
    </main>
</body>

<style>
    body {
        background-color: #222;
        height: 100vh;
        margin: 0;
    }

    main {
        text-align: center;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        height: 100%;
    }

    /* h1 {
        color: rgb(255, 83, 15);
        font-size: 5vw;
    } */

    p {
        font-size: 1.2vw;
        margin: 0;
    }

    .grid {
        margin: auto;
        display: table;
    }

    .box {
        height: 50px;
        width: 50px;
        float: left;
        border: none;
        font-size: 20px;
        font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
        color: red;
    }

    .box-unClicked {
        background-color: white;
    }

    .box-mine {
        background-color: aqua;
    }

    .box-empty {
        background-color: grey;
    }
</style>

<svelte:body on:contextmenu|preventDefault={onRightClick}/>
