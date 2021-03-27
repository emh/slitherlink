<script>
    import { onMount } from 'svelte';
    import GameMaker from './GameMaker.svelte';
    import GamePlayer from './GamePlayer.svelte';
    import GameList from './GameList.svelte';
    import { decode } from './encoder.js';

    let board = null;

    function parseHash() {
        if (!location.hash) {
            board = null;
            return;
        }

        board = decode(location.hash.substring(1));
    }

    onMount(parseHash);
</script>

<style>
    :global(*) {
        box-sizing: border-box;
        font-family: sans-serif;
    }

    h1 {
        font-size: 48px;
        letter-spacing: 4px;
        font-weight: 100;
        margin: 0;
    }

    h3 {
        font-weight: 100;
    }

    .app {
        padding-top: 32px;
        padding-left: 64px;
    }
</style>

<div class="app">
    <h1>slitherlink</h1>

    {#if board}
        <GamePlayer board={board} />
    {:else}
        <h3>new game</h3>
        <GameMaker />
        <GameList />
    {/if}
</div>

<svelte:window on:hashchange={parseHash} />
