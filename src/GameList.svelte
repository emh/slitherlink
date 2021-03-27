<script>
import { onMount } from "svelte";
    let games;

    function loadGames() {
        games = JSON.parse(localStorage.getItem('games'));

        if (!games || games.length === 0) {
            seedGames();
        }
    }

    function seedGames() {
        localStorage.setItem('games', JSON.stringify({
            '10-4f3qd-e4ap-b4p-2gvrm-23dji-19tz-4vum6-3o4y-15xo7-39hdm': {},
            '10-8df9-4ozj2-50x7-qie2-p4m9-91j6-xkca-50wi-4o37v-p488': {}
        }));

        loadGames();
    }

    onMount(loadGames);
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
    }

    h3 {
        font-weight: 100;
    }

    ul {
        list-style: none;
        padding: 0;
    }

    .app {
        padding-top: 100px;
        padding-left: 100px;
    }
</style>

<h3>saved games</h3>

<ul>
    {#each Object.keys(games || {}) as id}
        <li><a href='#{id}'>{id}</a></li>
    {/each}
</ul>
