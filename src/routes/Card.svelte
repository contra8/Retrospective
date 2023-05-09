<script>
	import { onMount } from 'svelte';
	import { onDestroy } from 'svelte'
	import { cards, draggedCardId } from '../stores.js'

    export let id;
    export let text;

    // let id = 0;

    onMount(() => {
		console.log('onMount');
		console.log('onMount: draggedCardId =', draggedCardIdContent);
	})

	let draggedCardIdContent = null;
	const unsubscribe = draggedCardId.subscribe((value) => draggedCardIdContent = value)

	onDestroy(unsubscribe)

    function handleDragStart(event) {
        $draggedCardId = id;
        console.log('draggedCardIdContent =', draggedCardIdContent);
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