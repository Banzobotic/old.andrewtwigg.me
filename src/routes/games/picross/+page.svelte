<script lang="ts">
    import { onMount } from "svelte";
    import { calculate_units } from "$lib/units";

    import Navbar from "../../Navbar.svelte";

    import { CellType, CellStatus } from "./cell"  ;
    import { Grid } from "./grid";
    import { ID } from "./id";

    let adjusted_width: number;

    onMount(() => {
        adjusted_width = calculate_units(window);

        document.getElementsByTagName("html")[0].style.fontSize = `${adjusted_width}vw`

        window.addEventListener('resize', () => {
            adjusted_width = calculate_units(window);

            document.getElementsByTagName("html")[0].style.fontSize = `${adjusted_width}vw`
        })
    });

    enum Click {
        left = 1,
        right = 2,
    }

    let grid_size = 10;

    let grid = new Grid(grid_size);

    function forceUpdate() {
        grid = grid
    }

    async function boxClicked(e: MouseEvent) {
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
    <Navbar/>

    <table class="grid">
        {#each Array(grid_size + 1) as _, y}
            <tr>
                {#each Array(grid_size + 1) as _, x}
                    {#if y == 0}
                        {#if x == 0}
                            <td style="padding: 0; border: 1px solid #ccc; border-left: 0px; border-top:0px"></td>
                        {:else}
                            <td style="padding: 0; border: 1px solid #ccc; border-top:0px">
                                <table style="margin: auto">
                                    {#each Array(5) as _, i}
                                        <tr><td style="color: white;">
                                            <pre>{grid.column_positions[x][4-i]}</pre>
                                        </td></tr>
                                    {/each}
                                </table>
                            </td>
                        {/if}
                    {:else}
                        {#if x == 0}
                            <td style="padding: 0; border: 1px solid #ccc; border-left: 0px;">
                                <table><tr>
                                    {#each Array(5) as _, i}
                                        <td style="color: white; padding: 5px; text-align: right;">
                                            <pre>{grid.row_positions[y][4-i]}</pre>
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
</body>

<style>
    body {
        background-color: #1f2125;
        margin: 0;
    }

    .grid {
        margin: auto;
        border-spacing: 0;
        text-align: center;
        margin-top: 5vmin;
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

    pre {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin: 0;
    }
</style>

<svelte:body on:contextmenu|preventDefault on:dragstart|preventDefault on:selectstart|preventDefault/>
