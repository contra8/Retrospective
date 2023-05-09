<script>
	import { draggedCardId } from '../stores.js'

    export let id;
    export let text;

    function handleDragStart(event) {
        $draggedCardId = id;
    }

</script>

<div
    draggable="true"
    on:dragstart={handleDragStart}>
    <p>{text}</p>
</div>

<style>
    div {
        background-color: white;
        border-radius: .2rem;
        border: solid .1rem;
    }

    p {
        margin: 10px;
    }
</style>