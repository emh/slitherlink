<script>
    import { onMount } from 'svelte';
    import GameMaker from './GameMaker.svelte';
    import GamePlayer from './GamePlayer.svelte';
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
</style>

<h1>slitherlink</h1>

{#if board}
    <GamePlayer board={board} />
{:else}
    <GameMaker />
{/if}

<svelte:window on:hashchange={parseHash} />
