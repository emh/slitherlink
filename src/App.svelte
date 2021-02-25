<script>
    import { onMount } from 'svelte';
    import GameMaker from './GameMaker.svelte';
    import { decode } from './encoder.js';

    let game = null;

    function parseHash() {
        if (!location.hash) {
            game = null;
            return;
        }

        game = decode(location.hash.substring(1));
    }

    onMount(parseHash);
</script>

<style>
    :global(*) {
        box-sizing: border-box;
        font-family: sans-serif;
    }
</style>

<h1>Slitherlink</h1>

{#if game}
    {JSON.stringify(game)}
{:else}
    <GameMaker />
{/if}

<svelte:window on:hashchange={parseHash} />
