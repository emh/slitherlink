<script>
	import GameMaker from './GameMaker.svelte';
	import Frame from './Frame.svelte';

	const CELL_SIZE = 36;

	let board = [
		[' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ']
	];

	let cols = board[0].length;
	let rows = board.length;

	function handleResize({ detail: { w, h } }) {
		cols = Math.floor(w / CELL_SIZE);
		rows = Math.floor(h / CELL_SIZE);

		board = new Array(rows);

		for (let i = 0; i < rows; i++) {
        	board[i] = new Array(cols);

	        for (let j = 0; j < cols; j++) {
    	        board[i][j] = ' ';
        	}
    	}
	}
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

<p>{rows} x {cols}</p>

<Frame on:resize={handleResize}>
	{#if board !== null}
		<GameMaker board={board} />
	{/if}
</Frame>
