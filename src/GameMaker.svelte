<script>
	import Cell from './Cell.svelte';

    export let board = null;

    let active = { row: 0, col: 0 };

    function handleClick(row, col) {
        active = {row, col};
    }

    function handleKeyDown(e) {
        let rows = board.length;
        let cols = board[0].length;

        switch (e.key) {
            case '0':
            case '1':
            case '2':
            case '3':
            case ' ':
                let pos = (active.row * cols + active.col + 1) % (rows * cols);

                board[active.row][active.col] = e.key;

                active.row = Math.floor(pos / cols);
                active.col = pos % cols;

                break;
            case 'ArrowRight':
                active.col = (active.col + 1) % cols;
                break;
            case 'ArrowLeft':
                active.col = active.col === 0 ? cols - 1 : active.col - 1;
                break;
            case 'ArrowDown':
                active.row = (active.row + 1) % rows;
                break;
            case 'ArrowUp':
                active.row = active.row === 0 ? rows - 1 : active.row - 1;
                break;
        }
    }
</script>

<style>

</style>

<div class="board">
	{#each board as row, i}
		<div style="height: 36px;">
			{#each board[i] as cell, j}
				<Cell value={board[i][j]} on:click={() => handleClick(i, j)} active={i === active.row && j === active.col} />
			{/each}
		</div>
	{/each}
</div>

<svelte:window on:keydown={handleKeyDown} />
