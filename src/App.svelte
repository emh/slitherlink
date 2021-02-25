<script>
    import GameMaker from './GameMaker.svelte';
    import Frame from './Frame.svelte';
import { onMount } from 'svelte';

    const CELL_SIZE = 36;

    let board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    let game = null;

    let cols = board[0].length;
    let rows = board.length;

    function handleFrameResize({ detail: { w, h } }) {
        cols = Math.floor(w / CELL_SIZE);
        rows = Math.floor(h / CELL_SIZE);

        board = new Array(rows);

        for (let i = 0; i < rows; i++) {
            board[i] = new Array(cols);

            for (let j = 0; j < cols; j++) {
                board[i][j] = 0;
            }
        }
    }

    function handlePlayClick() {
        let rowStrings = [];

        for (let row of board) {
            let rowString = row.join('');

            rowStrings.push(parseInt(rowString, 5).toString(36));
        }

        const gameString = rowStrings.join('-');

        location.hash = `${width}-${gameString}`;
    }

    function parseHash() {
        if (!location.hash) {
            game = null;
            return;
        }

        let rowStrings = location.hash.substring(1).split('-');

        let width = rowStrings.shift();

        game = rowStrings.map((s) =>
            parseInt(s, 36)
            .toString(5)
            .padStart(width)
            .split('')
            .map((c) => Number(c)))

        console.log(game);
    }

    onMount(parseHash);
</script>

<style>
    h1, p {
        margin-left: 20px;
    }

    :global(*) {
        box-sizing: border-box;
        font-family: sans-serif;
    }
</style>

<h1>Slitherlink</h1>

{#if game}
    play your game
{:else}
    <p>{rows} x {cols}</p>

    <Frame on:resize={handleFrameResize}>
        {#if board !== null}
            <GameMaker board={board} />
        {/if}
    </Frame>

    <button on:click={handlePlayClick}>Play</button>
{/if}

<svelte:window on:hashchange={parseHash} />