<script lang="ts">
    import Navbar from "../../Navbar.svelte";

    import { Snake } from "./snake";

    let grid_size = 15;

    let snake = new Snake;

    snake.create_draw_list();
</script>

<head>
    <title>Picross</title>
</head>

<body>
    <Navbar/>

    <div style="display: flex;">
        <table class="grid">
            {#each Array(grid_size) as _, y}
                <tr>
                    {#each Array(grid_size) as _, x}
                        <td class="box-border">
                            <div class="box"></div>
                            <!-- <div style="visibility: {snake.is_segment(x, y)}" class="segment"></div>
                            <div style="visibility: {snake.is_head(x, y)}" class="head">
                                <div class="snout"></div>
                                <div class="tri"></div>
                                <div class="left-eye"></div>
                                <div class="right-eye"></div>
                            </div> -->
                        </td>
                    {/each}
                </tr>
            {/each}
        </table>
    </div>
    
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
        height: 30px;
        width: 30px;
        float: left;
        background-color: rgb(24, 151, 49);
        border: 1px solid rgb(13, 79, 26);
        box-sizing: border-box;
        z-index: 1;
    }

    .box-border {
        padding: 0; 
        
    }

    .snake .body {
        background-color: blue;
    }

    .snake {
        display: flex;
        z-index: 2;
    }

    .snake .body .line {
        position: absolute;
        top: 0;
        left: 0;
        background-color: blue;
    }

    .segment {
        height: 35px;
        width: 35px;
        position: absolute;
        background-color: blue;
        z-index: 2;
    }

    .head {
        height: 35px;
        width: 35px;
        position: absolute;
        z-index: 2;
    }

    .head .snout {
        height: 25px;
        width: 35px;
        border-radius: 0 12px 12px 0;
        transform: translate(0%, 20%);
        background-color: blue;
        position: absolute;
    }

    .head .tri {
        width: 0;
        height: 0;
        border-top: 17.5px solid transparent;
        border-left: 20px solid blue;
        border-bottom: 17.5px solid transparent;
        position: absolute;
    }

    .head .left-eye {
        height: 10px;
        width: 10px;
        border-radius: 5px;
        position: absolute;
        background-color: red;
        transform: translate(50%, 15%);
    }

    .head .right-eye {
        height: 10px;
        width: 10px;
        border-radius: 5px;
        position: absolute;
        background-color: red;
        transform: translate(50%, 235%);
    }

    .food {

    }
</style>

<svelte:body on:selectstart|preventDefault/>