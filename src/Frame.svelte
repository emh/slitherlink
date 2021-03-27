<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    const CELL_SIZE = 36;

    export let w = 144;
    export let h = 144;

    $: cols = Math.floor(w / CELL_SIZE);
    $: rows = Math.floor(h / CELL_SIZE);

    let resizing = false;
    let startX;
    let startY;

    function handleMouseDown(e) {
        resizing = true;
        startX = e.clientX;
        startY = e.clientY;
    }

    function handleMouseMove(e) {
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        w = Math.max(144, w + dx);
        h = Math.max(144, h + dy);

        startX = e.clientX;
        startY = e.clientY;

        dispatch('resize', { w, h });
    }

    function handleMouseUp(e) {
        resizing = false;
    }
</script>

<style>
    .frame {
        position: relative;
        border: solid 1px transparent;
        margin-right: 24px;
        margin-bottom: 24px;
    }

    .handle {
        position: absolute;
        bottom: -24px;
        right: -64px;
        cursor: pointer;
        user-select: none;
    }

    .resizing {
        border: dashed 1px gray;
    }
</style>

<div
    class="frame"
    class:resizing
    style="height: {h+4}px; width: {w+6}px">
    <slot></slot>
    <div
        class="handle"
        on:mousedown={handleMouseDown}
    >&#10529; {rows} x {cols}</div>
</div>

<svelte:window on:mousemove={resizing && handleMouseMove} on:mouseup={resizing && handleMouseUp} />
