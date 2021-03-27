<script>
    import { onMount } from "svelte";

    const SEED_GAMES = [
        '10-4f3qd-e4ap-b4p-2gvrm-23dji-19tz-4vum6-3o4y-15xo7-39hdm',
        '10-8df9-4ozj2-50x7-qie2-p4m9-91j6-xkca-50wi-4o37v-p488'
    ];

    let games;

    function loadGames() {
        const n = localStorage.length;

        if (n === 0) {
            seedGames();
            return;
        }

        games = {};

        for (let i = 0; i < localStorage.length; i++) {
            const id = localStorage.key(i);

            games[id] = JSON.parse(localStorage.getItem(id));
        }
    }

    function seedGames() {
        SEED_GAMES.forEach((id) => {
            const gameStr = JSON.stringify({ id, createdAt: Date.now(), state: [] });

            localStorage.setItem(id, gameStr);
        });

        loadGames();
    }

    function sortGames(games) {
        if (!games) {
            return [];
        }

        return Object.values(games).sort((a, b) => (b.updatedAt || b.createdAt) - (a.updatedAt || a.createdAt));
    }

    function timeAgo(t) {
        if (!t) {
            return 'never';
        }

        const d = (Date.now() - t) / 1000;

        if (d < 60) return 'just now';
        if (d < 15 * 60) return 'moments ago';
        if (d < 30 * 60) return 'less than a half hour ago';
        if (d < 60 * 60) return 'less than an hour ago';
        if (d < 3 * 60 * 60) return 'a few hours ago';
        if (d < 24 * 60 * 60) return 'today';
        if (d < 2 * 24 * 60 * 60) return 'yesterday';
        if (d < 7 * 24 * 60 * 60) return 'this week';
        if (d < 14 * 24 * 60 * 60) return 'last week';
        if (d < 28 * 24 * 60 * 60) return 'a few weeks ago';

        return 'a long ass time ago';
    }

    function handleDeleteClick(id) {
        localStorage.removeItem(id);

        loadGames();
    }

    onMount(loadGames);
</script>

<style>
    h3 {
        font-weight: 100;
    }

    ul {
        list-style: none;
        padding: 0;
    }

    li {
        display: flex;
        align-items: center;
        height: 32px;
    }

    .stats {
        color: lightblue;
        margin-left: 4px;
    }

    .time {
        color: orange;
    }

    button {
        display: none;
        font-size: 12px;
        margin: 0;
        margin-left: 4px;
    }

    li:hover button {
        display: inline-block;
    }
</style>

<h3>saved games</h3>

<ul>
    {#each sortGames(games) as game}
        <li>
            <a href='#{game.id}'>{game.id}</a>
            <span class="stats">
                played
                <span class="time">{timeAgo(game.updatedAt)}</span>
                created
                <span class="time">{timeAgo(game.createdAt)}</span>
            </span>
            <button on:click={() => handleDeleteClick(game.id)}>delete</button>
        </li>
    {/each}
</ul>
