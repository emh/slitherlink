<script>
    export let value = 0;
    export let active = false;

    let hovering = false;

    function handleMouseOver() {
        hovering = true;
    }

    function handleMouseOut() {
        hovering = false;
    }
</script>

<style>
    .cell {
        height: 28px;
        width: 28px;
        color: blue;
        text-align: center;
        font-size: 24px;
        line-height: 28px;
    }

    .hovering {
        background-color: lightyellow;
        z-index: 1;
    }

    .active {
        background-color: lightblue;
        z-index: 1;
    }
</style>

<div class="cell" class:hovering class:active on:mouseover={handleMouseOver} on:mouseout={handleMouseOut} on:click>
    {#if value === 0}
        &nbsp;
    {:else}
        {value - 1}
    {/if}
</div>
