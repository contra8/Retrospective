<script>
	export let text;

    function handleClick(event) {
        console.log(event.target);
    }

    function handleDragStart(event) {
        console.log(event.target);
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