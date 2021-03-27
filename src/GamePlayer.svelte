<script>
	import Cell from './GameCell.svelte';
	import Dot from './Dot.svelte';
	import Edge from './Edge.svelte';
    import { onMount } from 'svelte';
    import { encode } from './encoder.js';

    export let board = null;

    const id = encode(board);

    let game = {
        state: []
    };

    let active = { row: 1, col: 1 };

    function initializeGameState() {
        let cols = board[0].length;
        let rows = board.length;

        const state = new Array(2 * rows + 1);

        for (let i = 0; i < state.length; i++) {
            state[i] = new Array(2 * cols + 1);

            for (let j = 0; j < state[i].length; j++) {
                if (i % 2 === 0) {
                    state[i][j] = 0;
                } else {
                    if (j % 2 === 0) {
                        state[i][j] = 0;
                    } else {
                        state[i][j] = board[(i - 1) / 2][(j - 1) / 2];
                    }
                }
            }
        }

        game.state = state;

        saveGameState();
    }

    function saveGameState() {
        game.updatedAt = Date.now();

        localStorage.setItem(id, JSON.stringify(game));
    }

    function loadGameState() {
        const gameStr = localStorage.getItem(id);

        game = JSON.parse(gameStr);

        if (game.state.length === 0) {
            initializeGameState();
        }
    }

    function handleEdgeClick(i, j) {
        let edgeState = game.state[i][j];

        game.state[i][j] = (edgeState + 1) % 3;

        saveGameState();
    }

    function handleBackClick() {
        location.hash = '';
    }

    function handleRestartClick() {
        initializeGameState();
    }

    function handleCellClick(row, col) {
        active = {row, col};
    }

    function handleKeyDown(e) {
        let rows = board.length;
        let cols = board[0].length;

        switch (e.key) {
            case 'ArrowRight':
                active.col = (active.col + 2) % (cols * 2);
                break;
            case 'ArrowLeft':
                active.col = active.col === 1 ? (2 * cols - 1) : active.col - 2;
                break;
            case 'ArrowDown':
                active.row = (active.row + 2) % (rows * 2);
                break;
            case 'ArrowUp':
                active.row = active.row === 1 ? (2 * rows - 1) : active.row - 2;
                break;
            case 'w':
                handleEdgeClick(active.row - 1, active.col);
                break;
            case 'a':
                handleEdgeClick(active.row, active.col - 1);
                break;
            case 's':
                handleEdgeClick(active.row, active.col + 1);
                break;
            case 'd':
                handleEdgeClick(active.row + 1, active.col);
                break;
        }
    }

    onMount(() => {
        loadGameState();
    });
</script>

<style>
    .board {
        display: flex;
        flex-direction: column;
        margin-bottom: 24px;
        margin-top: 56px;
        user-select: none;
    }

    .row {
        display: flex;
        flex-direction: row;
    }
</style>

<div class="board">
    {#each game.state as row, i}
        <div class="row">
            {#each row as cell, j}
                {#if i % 2 === 0 && j % 2 === 0}
                    <Dot />
                {:else if i % 2 === 0}
                    <Edge orientation="h" state={cell} on:click={() => handleEdgeClick(i, j)} />
                {:else if j % 2 === 0}
                    <Edge orientation="v" state={cell} on:click={() => handleEdgeClick(i, j)} />
                {:else}
                    <Cell value={cell} on:click={() => handleCellClick(i, j)} active={i === active.row && j === active.col} />
                {/if}
            {/each}
        </div>
    {/each}
</div>

<button on:click={handleBackClick}>back</button>
<button on:click={handleRestartClick}>restart</button>

<svelte:window on:keydown={handleKeyDown} />
