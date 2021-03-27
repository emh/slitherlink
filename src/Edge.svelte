<script>
    export let orientation = 'h';
    export let state = 0;
</script>

<style>
    .border {
        cursor: pointer;
        border: 0;
    }

    .hborder {
        border-top: dashed 2px lightgray;
        height: 2px;
        width: 28px;
        margin: 3px 0;
    }

    .vborder {
        border-left: dashed 2px lightgray;
        height: 28px;
        width: 2px;
        margin: 0 3px;
    }

    .off {
        border-color: transparent;
    }

    .on {
        border-style: solid;
        border-color: orange;
    }
</style>

<div class="border"
    class:on={state === 1}
    class:off={state === 2}
    class:hborder={orientation === 'h'}
    class:vborder={orientation === 'v'} on:click>
</div>
