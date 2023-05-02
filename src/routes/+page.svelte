<script>
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';

	let inputArea;
	let startContainer;
	let stopContainer;
	let continueContainer;

	let checked = "start";

	function handleRadioStartClick() {
		checked = "start";
	}

	function handleRadioStopClick() {
		checked = "stop";
	}

	function handleRadioContinueClick() {
		checked = "continue";
	}

	function addCard() {
		const childDiv = document.createElement('div');
		const child = document.createElement('span');
		child.textContent = inputArea.value // 'child';
		childDiv.appendChild(child);		
		startContainer.appendChild(childDiv);
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

	<img src="Start-Stop-Weitermachen.png" />
	<!--img src="https://t2informatik.de/wp-content/uploads/2021/03/start-stop-continue-retrospektive.jpg" /-->

	<!--Counter /-->

	<div class="container">
		<div class="column">Neue Karte<br/>
			<textarea name="HTML_Nobelpreis" rows=3 cols=30 bind:this={inputArea}></textarea>
			<fieldset>
				<!--legend>Select a maintenance drone:</legend-->
			
				<div>
				  <input type="radio" id="huey" name="drone" value="start"
						 checked on:click={handleRadioStartClick}>
				  <label for="huey">Start</label>
				</div>
			
				<div>
				  <input type="radio" id="dewey" name="drone" value="stop">
				  <label for="dewey">Stop</label>
				</div>
			
				<div>
				  <input type="radio" id="louie" name="drone" value="continue">
				  <label for="louie">Weitermachen</label>
				</div>
			</fieldset>
			<button type="button" id="button" on:click={addCard}>Karte hinzufügen</button>

		</div>
		<div class="column" id="1" bind:this={startContainer}>START</div>
		<div class="column" id="2" bind:this={stopContainer}>STOP</div>
		<div class="column" id="3" bind:this={continueContainer}>WEITERMACHEN</div>
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
	}
</style>
