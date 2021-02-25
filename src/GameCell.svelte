<script>
    export let value = 0;
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
</style>

<div class="cell">
    {#if value === 0}
        &nbsp;
    {:else}
        {value - 1}
    {/if}
</div>
