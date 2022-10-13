<script lang="ts">
    import Navbar from "../../Navbar.svelte";
</script>

<head>
    <title>Home</title>
</head>

<body>
    <Navbar/>

    <div class="content">
        <div class="inner">
            <div class="title">Brainf**k Interpreter</div>

            <div class="header">What is Brainf**k?</div>
            <div class="text">
                Brainf**k (BF) is an esolang centred around a single array of bytes
                <br><br>
                There are only 8 operators in BF:
                <ul class="no_dot">
                    <li>> Increment the pointer position</li>
                    <li>&lt Deincrement the pointer position</li>
                    <li>+ Increment the byte at the pointer</li>
                    <li>- Deincrement the byte at the pointer</li>
                    <li>. Output the byte at the data pointer</li>
                    <li>, Accept one byte of input, storing it in the byte at the pointer</li>
                    <li>[ If the byte at the pointer is zero, goto the corresponding ] operator</li>
                    <li>] If the byte at the pointer is nonzero, goto the corresponding [ operator</li>
                </ul>
                Despite only having these 8 operators BF is (with an infinitely large array) turing complete
            </div>
            
            <div class="header">Implementing Brainf**k</div>
            <div class="text">
                Around the time that I found out about BF I was also learning the programming language Rust
                <br><br>
                I decided to write my BF interpreter in Rust as it provided a great opportunity to start
                getting to grips with Rust's match statements and iterators
                <br><br>
                My brainf**k interpreter has 3 main parts:
                <ol>
                    <li>Read and parse the program</li>
                    <li>Read input</li>
                    <li>Interpret the program</li>
                </ol>
                Lets break down how I solved each of these presentations
            </div>

            <div class="sub_header">Reading and parsing the program</div>
            <div class="text">
                The program functions as an interactive session interpreter,
                so it will keep taking lines of user input from the terminal until the user enters "run"
                <br><br>
                For every line of user input the program will iterate through all the characters 
                and filter out any that aren't one of the 8 operators
                <br><br>
                <img style="width: 25vw" src="/images/brainfuck/iterator.png" alt="Rust code showing iterator I used">
            </div>

            <div class="sub_header">Reading user input</div>
            <div class="text">
                I made the design decision of having all user input entered before the program is interpreted. 
                <br><br>
                This meant that all input could be entered quickly on a single line
            </div>

            <div class="sub_header">Interpreting the program</div>
            <div class="text">
                The program uses a while loop to keep running through the characters in the program 
                until the end has been reached
                <br><br>
                Inside the while loop a match statement is used to match the current 
                operator to the current code to run for that operator
            </div>
        </div>
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
        overflow: overlay;
    }

    li {
        margin: 1.2vh 0;
    }

    ul.no_dot {
        list-style-type: none;
    }

    .content {
        max-width: 50vw;
        margin: 0 auto;
        margin-top: 5vh;
        margin-bottom: 10vh;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    }

    .inner {
        margin-right: 10vw;
    }

    .title {
        color: #2dbecf;
        font-size: 3.5vw;
        margin-bottom: 4vh;
    }


    .header {
        color: #2dbecf;
        font-size: 2.4vw;
        margin-bottom: 2vh;
        margin-left: 2vw
    }

    .sub_header {
        color: #2dbecf;
        font-size: 1.5vw;
        margin-bottom: 2vh;
        margin-left: 2vw
    }

    .text {
        color: white;
        font-size: 1vw;
        margin-bottom: 4vh;
        margin-left: 2vw
    }
</style>
