<script>
    export let orientation = 'h';
</script>

<style>
    .hborder {
        border-top: dashed 2px gray;
        height: 2px;
        width: 28px;
        margin: 3px 0;
    }

    .vborder {
        border-left: dashed 2px gray;
        height: 28px;
        width: 2px;
        margin: 0 3px;
    }
</style>

<div class="border" class:hborder={orientation === 'h'} class:vborder={orientation === 'v'}></div>
