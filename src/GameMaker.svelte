<script>
    import Frame from './Frame.svelte';
	import Cell from './MakerCell.svelte';
    import { encode } from './encoder.js';

    const CELL_SIZE = 36;

    let board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

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
        const id = encode(board);
        const gameStr = JSON.stringify({ id, createdAt: Date.now(), state: [] });

        localStorage.setItem(id, gameStr);

        location.hash = id;
    }

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

                board[active.row][active.col] = e.key === ' ' ? 0 : Number(e.key) + 1;

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
    .board {
        user-select: none;
        margin-left: 4px;
    }
</style>

<Frame on:resize={handleFrameResize}>
    <div class="board">
        {#each board as row, i}
            <div style="height: 36px;">
                {#each board[i] as cell, j}
                    <Cell value={board[i][j]} on:click={() => handleClick(i, j)} active={i === active.row && j === active.col} />
                {/each}
            </div>
        {/each}
    </div>
</Frame>

<button on:click={handlePlayClick}>play</button>

<svelte:window on:keydown={handleKeyDown} />
