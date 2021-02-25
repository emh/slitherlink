<script>
    export let value = ' ';
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
        height: 36px;
        width: 36px;
        display: inline-block;
        color: blue;
        text-align: center;
        font-size: 24px;
        line-height: 36px;
        position: relative;
        z-index: 0;
    }

    .hovering {
        background-color: lightyellow;
        z-index: 1;
    }

    .active {
        background-color: lightblue;
        z-index: 1;
    }

    .corner {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: lightgray;
        position: absolute;
    }

    .hovering .corner {
        background-color: gray;
    }

    .active .corner {
        background-color: orange;
    }

    .top-left {
        left: -4px;
        top: -4px;
    }

    .top-right {
        right: -4px;
        top: -4px;
    }

    .bottom-left {
        left: -4px;
        bottom: -4px;
    }

    .bottom-right {
        right: -4px;
        bottom: -4px;
    }
</style>

<div class="cell" class:hovering class:active on:mouseover={handleMouseOver} on:mouseout={handleMouseOut} on:click>
    {#if value === ' '}
        &nbsp;
    {:else}
        {value}
    {/if}
    <div class='corner top-left'></div>
    <div class='corner top-right'></div>
    <div class='corner bottom-left'></div>
    <div class='corner bottom-right'></div>
</div>
