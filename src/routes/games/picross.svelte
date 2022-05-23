<script lang="ts">
    import { CellType, CellStatus } from "./picross_scripts/cell"  ;
    import { Grid } from "./picross_scripts/grid";
    import { ID } from "./picross_scripts/id";

    enum Click {
        left = 1,
        right = 2,
    }

    let grid = new Grid;

    async function logEvent(e: Event) {
        console.log(e);
    }

    function forceUpdate() {
        grid = grid
    }

    async function boxClicked(e: MouseEvent) {
        // logEvent(e);
        let id = new ID(e);

        let cell = grid.at_id(id);

        if (cell.status == CellStatus.unClicked) {
            if (e.buttons == Click.left) {
                grid.setStatus(
                    id,
                    cell.type == CellType.goal ? CellStatus.correct : CellStatus.incorrect
                )
            } else if (e.buttons == Click.right) {
                grid.setStatus(
                    id,
                    cell.type == CellType.death ? CellStatus.correct : CellStatus.incorrect
                )
            }
        }

        forceUpdate();
    }
</script>



<head>
    <title>Picross</title>
</head>

<body>
    <p><a href="/">Home</a></p>

    <main>
        <table class="grid">
            {#each grid.grid as row, y}
                <tr>
                {#each row as _, x}
                    <td>
                        <button on:mousedown={boxClicked} on:mouseover={boxClicked} on:focus type=button id="{x}_{y}" class="box {grid.at(x, y).getStyle()}">
                            {grid.at(x, y).getStatusChar()}
                        </button>
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

<svelte:body on:contextmenu|preventDefault on:dragstart|preventDefault on:selectstart|preventDefault/>
