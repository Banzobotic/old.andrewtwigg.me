<script lang="ts">
    import Navbar from "../Navbar.svelte";
</script>

<head>
    <title>Home</title>
</head>

<body>
    <Navbar active={"about"}/>
    
    <div class="content">
        <div class="inner">
            <div class="header">Robotics</div>
            <div class="text">
                In robotics competitions that I have taken part in there are 3 key parts:
                <ol>
                    <li>Building and programming a lego robot to complete challenges on a mat</li>
                    <li>Creating a presentation on an innovative solution to problem posed each year</li>
                    <li>Another presentation explaining our robot design choices to a panel of judges</li>
                </ol>
                <br>
                Throughout my years of robotics I have taken a role as the main programmer of the robot 
                and also led the writing and research on both presentations.
                <br><br>
                My work in the team allowed us to win a number of awards over the years:
                <ul>
                    <li>2018:</li>
                    <ul>
                        <li><a href="https://roboticschallenge.org.uk/">Tomorrow's Engineers Robotics Challenge</a> UK Champions</li>
                    </ul>
                    <li>2019:</li>
                    <ul>
                        <li><a href="https://www.firstlegoleague.org/">First Lego League</a> (FLL) UK Finalists</li>
                        <li>Network Rail Innovation Award Winners</li>
                    </ul>
                    <li>2020:</li>
                    <ul>
                        <li>FLL Scottish Final Robot Performance and Robot Knockout Winners</li>
                        <li>FLL Scottish Final Second Overall</li>
                        <li>FLL International Final Qualifiers (cancelled due to covid :( )</li>
                    </ul>
                    <li>2021:</li>
                    <ul>
                        <li>FLL UK Final Robot Performance, Robot Knockout and Overall Winners</li>
                        <li>FLL World Final Breakthrough Award Winners</li>
                    </ul>
                    <li>2022:</li>
                    <ul>
                        <li>FLL Scottish Final Robot Performance, Robot Knockout and Overall Winners</li>
                        <li>FLL World Final Third Place Robot Design</li>
                    </ul>
                </ul>
                <br>
                I also wrote, produced and edited a video showing our robotics journey:
                <br><br>
                <iframe class="video" src="https://www.youtube.com/embed/SUL1-qgswok" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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

    .content {
        max-width: 50vw;
        margin: 0 auto;
        margin-top: 5vh;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    }

    .inner {
        margin-right: 10vw;
    }

    .header {
        color: #2dbecf;
        font-size: 2.4vw;
        margin-bottom: 2vh;
    }

    .text {
        color: white;
        font-size: 1vw;
        margin-bottom: 7vh;
    }

    .video {
        width: 35vw;
        height: 19.6875vw;
    }
</style>
