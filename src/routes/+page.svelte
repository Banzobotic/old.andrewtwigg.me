<script lang="ts">
    import Navbar from "./Navbar.svelte";
</script>

<head>
    <title>Home</title>
</head>

<body>
    <Navbar active={"home"}/>

    <h1>Welcome to SvelteKit</h1>
    <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
</body>

<style>
    body {
        background-color: #1f2125;
        margin: 0;
    }

    h1 {
        margin: 0;
    }
</style>
