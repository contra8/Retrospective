<script>
	import Card from './Card.svelte';
	import { cards, startCards, stopCards, continueCards, draggedCardId } from '../stores.js'

	let inputArea;
	let startContainer;
	let stopContainer;
	let continueContainer;

	// let startCards = [];
	// let stopCards = [];
	// let continueCards = [];

	let idForNextCreatedCard = 0;

	const START = 'start';
	const STOP = 'stop';
	const CONTINUE = 'continue';
	let chosenCardType = START;

	function addCardToStore() {
		if (inputArea.value) {
			switch (chosenCardType){
				case START:
					$startCards = [...$startCards, {text: inputArea.value, type: chosenCardType, id: idForNextCreatedCard}];
					break;
				case STOP:
					$stopCards = [...$stopCards, {text: inputArea.value, type: chosenCardType, id: idForNextCreatedCard}];
					break;
				case CONTINUE:
					$continueCards = [...$continueCards, {text: inputArea.value, type: chosenCardType, id: idForNextCreatedCard}];
					break;
			}

			// $cards = [...$cards, {text: inputArea.value, type: chosenCardType, id: idForNextCreatedCard}];
			idForNextCreatedCard++;
			// console.log('les cards =', $startCards);
			// filterCards();
		}
	}

	// function filterCards() {
	// 	startCards = filterArrayByCardType(START);
	// 	stopCards = filterArrayByCardType(STOP);
	// 	continueCards = filterArrayByCardType(CONTINUE);
	// }

	function filterArrayByCardType(cardType) {
		return $cards.filter((card) => { return card.type === cardType; });
	}

	function handleRadioClick(event) {
		chosenCardType = event.target.value;
	}

	function handleDrop(event) {
		event.preventDefault();
		console.log(event.target.id);
		switch (event.target.id) { // ID of drop zone aka DIV
			case '0':
				moveToStartCards();
				// $cards[$draggedCardId].type=START;
				break;
			case '1':
				moveToStopCards();
				// $cards[$draggedCardId].type=STOP;
				break;
			case '2':
				moveToContinueCards();
				// $cards[$draggedCardId].type=CONTINUE;
				break;
		}
		console.log('cards =', $cards);
		// filterCards();
	}

	const moveToStartCards = () => {

	}

	const moveToStopCards = () => {
		
	}

	const moveToContinueCards = () => {
		
	}

</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<!--DragDrop /-->

<div class="row">
  <div class="column menu">
	  <h2>New blank Card</h2><br/>
	  <textarea class="newCardText" name="HTML_Nobelpreis" rows=3 cols=30 bind:this={inputArea}></textarea>
	  <fieldset>
		  <!--legend>Select a maintenance drone:</legend-->
		  <div>
			  <input type="radio" id="start" name="drone" value="{START}" on:click={handleRadioClick} checked>
			  <label for="start">Start</label>
		  </div>		
		  <div>
			  <input type="radio" id="stop" name="drone" value="{STOP}" on:click={handleRadioClick}>
			  <label for="stop">Stop</label>
		  </div>		
		  <div>
			  <input type="radio" id="continue" name="drone" value="{CONTINUE}" on:click={handleRadioClick}>
			  <label for="continue">Continue</label>
		  </div>
	  </fieldset>
	  <button type="button" id="button" on:click={addCardToStore}>Add Card</button>
  </div>
  <div class="cards">
	  <div class="column" id="0" bind:this={startContainer} on:drop={handleDrop} ondragover="return false">
		  <h2>START</h2>
		  {#each $startCards as startCard}
			  <!--div>{startCard.text}</div-->
			  <Card text={startCard.text} id={startCard.id} />
		  {/each}
	  </div>
	  <div class="column" id="1" bind:this={stopContainer} on:drop={handleDrop} ondragover="return false">
		  <h2>STOP</h2>
		  {#each $stopCards as stopCard}
			  <Card text={stopCard.text} id={stopCard.id} />
		  {/each}
	  </div>
	  <div class="column" id="2" bind:this={continueContainer} on:drop={handleDrop} ondragover="return false">
		  <h2>CONTINUE</h2>
		  {#each $continueCards as continueCard}
			  <Card text={continueCard.text} id={continueCard.id} />
		  {/each}
	  </div>
  </div>
</div>
<section style="flex-grow: 0">
  <div class="container">
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
	  font-weight: 800;
  }

  .row {
	  width: 100%;
	  display: flex;
  }

  .column {
	  flex: 1 1 0;
  }

  .column.menu {
	  /* flex: 40%; */
	  flex: 0 0 20rem;
  }

  .cards {
		  /* flex: 60%; */
		  display: flex;
		  flex-grow: 1;
		  flex-direction: row;
  }

  @media screen and (min-width: 1368px) {
	  .cards {
		  flex: 0 0 60rem;
	  }
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
	  width: 100%;
	  max-width: 1000px;
	  display: grid;
	  grid-template-columns: repeat(4, 1fr);
  }

  .column {
	  /* border: 1px solid black; */
	  margin: 20px;
	  padding: 20px;
	  height: 100%;
	  border: solid 0.2em;
	  border-radius: 0.5em;
  }

  .column > div {
	  padding: 50px;
  }

  .dynamicCard {
	  background-color: coral;
	  border-radius: 4px;
  }

  .newCardText {
	  width: 95%;
	  height: 8rem;
  }
</style>
