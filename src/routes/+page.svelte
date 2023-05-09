<script>
	import { onMount } from 'svelte';
	import { onDestroy } from 'svelte'
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
  	import Card from './Card.svelte';
  	import DragDrop from './DragDrop.svelte';
	import { cards, draggedCardId } from '../stores.js'
	
	let inputArea;
	let startContainer;
	let stopContainer;
	let continueContainer;

	let checkedValue = "start";

	// let cards = [];
	let startCards = [];
	let stopCards = [];
	let continueCards = [];

	let idForNextCreatedCard = 0;

	let draggedCardIdContent = ''
	// const unsubscribe = draggedCardId.subscribe((value) => draggedCardIdContent = value)
	draggedCardId.subscribe((value) => {
		draggedCardIdContent = value;
	});

	// onDestroy(unsubscribe)

	function handleRadioClick(event) {
		checkedValue = event.target.value;
	}

	function addCardToStore() {
		if (inputArea.value) {
			// addCard({text: inputArea.value, type: checkedValue, id: idForNextCreatedCard});
			// cards = [...cards, {text: inputArea.value, type: checkedValue, id: idForNextCreatedCard}];
			$cards = [...$cards, {text: inputArea.value, type: checkedValue, id: idForNextCreatedCard}];
			idForNextCreatedCard++;
			filterCards();
		}
	}

	function filterCards() {
		startCards = filterArrayByCardType('start');
		stopCards = filterArrayByCardType('stop');
		continueCards = filterArrayByCardType('continue');
	}

	function filterArrayByCardType(cardType) {
		return $cards.filter((card) => { return card.type === cardType; });
	}

	function handleDragEnter(event) {
		console.log('handleDragEnter startet für:', event.target.id);
	}

	function handleDrop(event) {
		event.preventDefault();
		console.log('drop in', event.target.id);
		console.log($cards);
		switch (event.target.id) { // ID of drop zone aka DIV
			case '0':
				$cards[$draggedCardId].type='start';
				break;
			case '1':
				$cards[$draggedCardId].type='stop';
				break;
			case '2':
				$cards[$draggedCardId].type='continue';
				break;
		}
		filterCards();
		console.log($cards);
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<!--DragDrop /-->
<section style="flex-grow: 0">
	<!--h1>
		<span class="welcome">
			<picture>
				<source srcset={welcome} type="image/webp" />
				<img src={welcome_fallback} alt="Welcome" />
			</picture>
		</span>

		to your new<br />SvelteKit app
	</h1>

	<h2>
		try editing <strong>src/routes/+page.svelte</strong>
	</h2-->

	<!--img src="Start-Stop-Weitermachen.png" style="width: 100%" /-->
	<!--img src="https://t2informatik.de/wp-content/uploads/2021/03/start-stop-continue-retrospektive.jpg" /-->

	<!--Counter /-->

	<div class="container">
		<div class="column"><h2>New Card</h2><br/>
			<textarea name="HTML_Nobelpreis" rows=3 cols=30 bind:this={inputArea}></textarea>
			<fieldset>
				<!--legend>Select a maintenance drone:</legend-->
			
				<div>
				  <input type="radio" id="start" name="drone" value="start" on:click={handleRadioClick} checked>
				  <label for="start">Start</label>
				</div>
			
				<div>
				  <input type="radio" id="stop" name="drone" value="stop" on:click={handleRadioClick}>
				  <label for="stop">Stop</label>
				</div>
			
				<div>
				  <input type="radio" id="continue" name="drone" value="continue" on:click={handleRadioClick}>
				  <label for="continue">Continue</label>
				</div>
			</fieldset>
			<button type="button" id="button" on:click={addCardToStore}>Add Card</button>

		</div>
		<div class="column" id="0" bind:this={startContainer} on:dragenter={handleDragEnter}
			on:drop={handleDrop} ondragover="return false">
			<h2>START</h2>
			{#each startCards as startCard}
				<!--div>{startCard.text}</div-->
				<Card text={startCard.text} id={startCard.id} />
			{/each}
		</div>
		<div class="column" id="1" bind:this={stopContainer} on:dragenter={handleDragEnter}
			on:drop={handleDrop} ondragover="return false">
			<h2>STOP</h2>
			{#each stopCards as stopCard}
				<Card text={stopCard.text} id={stopCard.id} />
			{/each}
		</div>
		<div class="column" id="2" bind:this={continueContainer} on:dragenter={handleDragEnter}
			on:drop={handleDrop} ondragover="return false">
			<h2>CONTINUE</h2>
			{#each continueCards as continueCard}
				<Card text={continueCard.text} id={continueCard.id} />
			{/each}
		</div>
	</div>

</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}

	.container {
		width: 940px;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
	}

	.column {
		/* border: 1px solid black; */
		margin: 20px;
		margin-bottom: 200px;
		padding: 20px;
	}

	.column > div {
		padding: 50px;
	}

	.dynamicCard {
		background-color: coral;
		border-radius: 4px;
	}
</style>
