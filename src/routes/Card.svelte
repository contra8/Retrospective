<script>
	import { onMount } from 'svelte';
	import { onDestroy } from 'svelte'
	import { draggedCardId } from '../stores.js'

    export let id;
    export let text;

    // let id = 0;

    onMount(() => {
		console.log('onMount');
		console.log('onMount: draggedCardId =', draggedCardIdContent);
	})

	let draggedCardIdContent = ''
	const unsubscribe = draggedCardId.subscribe((value) => draggedCardIdContent = value)

	onDestroy(unsubscribe)

    function handleClick(event) {
        console.log(event.target);
    }

    function handleDragStart(event) {
        console.log(event.target);
        console.log(id);
        $draggedCardId = id;
        console.log('draggedCardIdContent =', draggedCardIdContent);
    }

</script>

<div
    on:click={handleClick}
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