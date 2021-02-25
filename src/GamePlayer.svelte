<script>
	import Cell from './GameCell.svelte';
	import Dot from './Dot.svelte';
	import Edge from './Edge.svelte';

    export let board = null;

    let cols = board[0].length;
    let rows = board.length;

    let game = new Array(2 * rows + 1);

    for (let i = 0; i < game.length; i++) {
        game[i] = new Array(2 * cols + 1);

        for (let j = 0; j < game[i].length; j++) {
            if (i % 2 === 0) {
                game[i][j] = 0;
            } else {
                if (j % 2 === 0) {
                    game[i][j] = 0;
                } else {
                    game[i][j] = board[(i - 1) / 2][(j - 1) / 2];
                }
            }
        }
    }

    console.log(game);
</script>

<style>
    .board {
        display: flex;
        flex-direction: column;
    }

    .row {
        display: flex;
        flex-direction: row;
    }
</style>

<div class="board">
    {#each game as row, i}
        <div class="row">
            {#each row as cell, j}
                {#if i % 2 === 0 && j % 2 === 0}
                    <Dot />
                {:else if i % 2 === 0}
                    <Edge orientation="h" />
                {:else if j % 2 === 0}
                    <Edge orientation="v" />
                {:else}
                    <Cell value={cell} />
                {/if}
            {/each}
        </div>
    {/each}
</div>
