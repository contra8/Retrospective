<script>
	import { draggedCardId, draggedCardType } from '../stores.js'

    export let id;
    export let type;
    export let text;

    function handleDragStart(event) {
        $draggedCardId = id;
        $draggedCardType = type;
    }

    function handleCloseBtnClick(event) {
        console.log('close');
    }

</script>

<div
    class="card"
    draggable="true"
    on:dragstart={handleDragStart}>
    <div class="closeBtn" on:click={handleCloseBtnClick}>X</div>
    <p>{text}</p>
</div>

<style>
    .card {
        background-color: white;
        border-radius: .2rem;
        border: solid .1rem;
        margin-bottom: 1rem;
    }

    .closeBtn {
        width: 100%;
        text-align: right;
        padding-right: 1rem;
        cursor: pointer;
    }

    /*
    div:after{
        display: inline-block;
        content: "\00d7";
    }
    */

    p {
        margin: 10px;
    }
</style>