<script lang="ts">
    import { CellType, CellStatus } from "./cell"  ;
    import { Grid } from "./grid";
    import { ID } from "./id";

    enum Click {
        left = 1,
        right = 2,
    }

    let grid_size = 10;

    let grid = new Grid(grid_size);

    console.log(grid)

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
            {#each Array(grid_size + 1) as _, y}
                <tr>
                    {#each Array(grid_size + 1) as _, x}
                        {#if y == 0}
                            {#if x == 0}
                                <td style="padding: 0; border: 1px solid #ccc; border-left: 0px; border-top:0px"></td>
                            {:else}
                                <td style="padding: 0; border: 1px solid #ccc; border-left: 0px; border-top:0px">
                                    <table style="margin: auto">
                                        {#each Array(5) as _, i}
                                            <tr><td style="color: white;">
                                                <pre style="margin: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">{grid.column_positions[x][4-i]}</pre>
                                            </td></tr>
                                        {/each}
                                    </table>
                                </td>
                            {/if}
                        {:else}
                            {#if x == 0}
                                <td style="padding: 0; border: 1px solid #ccc; border-left: 0px; border-top:0px">
                                    <table><tr>
                                        {#each Array(5) as _, i}
                                            <td style="color: white; padding: 5px; text-align: right;">
                                                <pre style="margin: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">{grid.row_positions[y][4-i]}</pre>
                                            </td>
                                        {/each}
                                    </tr></table>
                                </td>
                            {:else}
                                <td style="padding: 0; border: 1px solid #ccc;">
                                    <button on:mousedown={boxClicked} on:mouseover={boxClicked} on:focus type=button id="{x}_{y}" class="box {grid.at(x, y).getStyle()}">
                                        {grid.at(x, y).getStatusChar()}
                                    </button>
                                </td>
                            {/if}
                        {/if}
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
        border-spacing: 0;
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

    .box-goal {
        background-color: #188dd6;
    }

    .box-death {
        background-color: #bbb;
    }
</style>

<svelte:body on:contextmenu|preventDefault on:dragstart|preventDefault on:selectstart|preventDefault/>
