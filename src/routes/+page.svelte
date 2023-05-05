<script>
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
  import Card from './Card.svelte';

	let inputArea;
	let startContainer;
	let stopContainer;
	let continueContainer;

	let checkedValue = "start";

	let startCards = [];
	let stopCards = [];
	let continueCards = [];

	function handleRadioClick(event) {
		checkedValue = event.target.value;
	}

	function addCard() {
		let currentArray = [];
		switch (checkedValue) {
			case "start":
				startCards = [...startCards, {text: inputArea.value}];
				return;
			case "stop":
				stopCards = [...stopCards, {text: inputArea.value}];
				return;
			case "continue":
				continueCards = [...continueCards, {text: inputArea.value}];
				return;
		}
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

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

	<img src="Start-Stop-Weitermachen.png" style="width: 100%" />
	<!--img src="https://t2informatik.de/wp-content/uploads/2021/03/start-stop-continue-retrospektive.jpg" /-->

	<!--Counter /-->

	<div class="container">
		<div class="column"><h2>Neue Karte</h2><br/>
			<textarea name="HTML_Nobelpreis" rows=3 cols=30 bind:this={inputArea}></textarea>
			<fieldset>
				<!--legend>Select a maintenance drone:</legend-->
			
				<div>
				  <input type="radio" id="huey" name="drone" value="start" on:click={handleRadioClick} checked>
				  <label for="huey">Start</label>
				</div>
			
				<div>
				  <input type="radio" id="dewey" name="drone" value="stop" on:click={handleRadioClick}>
				  <label for="dewey">Stop</label>
				</div>
			
				<div>
				  <input type="radio" id="louie" name="drone" value="continue" on:click={handleRadioClick}>
				  <label for="louie">Weitermachen</label>
				</div>
			</fieldset>
			<button type="button" id="button" on:click={addCard}>Karte hinzufügen</button>

		</div>
		<div class="column" id="1" bind:this={startContainer}>
			<h2>START</h2>
			{#each startCards as startCard}
				<!--div>{startCard.text}</div-->
				<Card text={startCard.text} />
			{/each}
		</div>
		<div class="column" id="2" bind:this={stopContainer}>
			<h2>STOP</h2>
			{#each stopCards as stopCard}
				<Card text={stopCard.text} />
			{/each}
		</div>
		<div class="column" id="3" bind:this={continueContainer}>
			<h2>WEITERMACHEN</h2>
			{#each continueCards as continueCard}
				<Card text={continueCard.text} />
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
	}

	.column > div {
		padding: 50px;
	}

	.dynamicCard {
		background-color: coral;
		border-radius: 4px;
	}
</style>
