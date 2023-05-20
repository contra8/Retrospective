<script>
	import Card from './Card.svelte';
	import { startCards, stopCards, continueCards, draggedCardId, draggedCardType } from '../stores.js'

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
	let targetCardType;

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
			console.log('$startCards =', $startCards);
			console.log('$stopCards =', $stopCards);
			// filterCards();
		}
	}

	// function filterCards() {
	// 	startCards = filterArrayByCardType(START);
	// 	stopCards = filterArrayByCardType(STOP);
	// 	continueCards = filterArrayByCardType(CONTINUE);
	// }

	// function filterArrayByCardType(cardType) {
	// 	return $cards.filter((card) => { return card.type === cardType; });
	// }

	function filterArrayByCardId(array) {
		console.log('filterArrayByCardId startet');
		console.log('filterArrayByCardId: array = ', array);
		const tmpArray = array.filter((card) => { return card.id === $draggedCardId; });
		return tmpArray[0];
	}

	function handleRadioClick(event) {
		chosenCardType = event.target.value;
	}

	function handleDrop(event) {
		event.preventDefault();
		switch (event.target.id) { // ID of drop zone aka DIV
			case '0':
				targetCardType = START;
				moveToStartCards();
				break;
			case '1':
				targetCardType = STOP;
				moveToStopCards();
				break;
			case '2':
				targetCardType = CONTINUE;
				moveToContinueCards();
				break;
		}
		// filterCards();
	}

	const moveToStartCards = () => {
		console.log('moveToStartCard startet')
		const sourceArray = getSourceArray();
		console.log(sourceArray);
		addCardToTargetArray(sourceArray, $startCards);
		cleanSourceArray($startCards);
		console.log('$startCards =', $startCards);
		console.log('$stopCards =', $stopCards);
	}

	const moveToStopCards = () => {
		const sourceArray = getSourceArray();
		addCardToTargetArray(sourceArray, $stopCards);
		cleanSourceArray($stopCards);
		console.log('$stopCards =', $stopCards);
	}

	const moveToContinueCards = () => {
		const sourceArray = getSourceArray();
		addCardToTargetArray(sourceArray, $continueCards);
		cleanSourceArray($continueCards);
	}

	const getSourceArray = () => {
		switch ($draggedCardType) {
			case START:
				return $startCards;
			case STOP:
				return $stopCards;
			case CONTINUE:
				return $continueCards;
		}
	}

	const addCardToTargetArray = (sourceArray, targetArray) => {
		const currentCard = filterArrayByCardId(sourceArray);
		currentCard.type = targetCardType;
		// currentCard.type = START;
		console.log('currentCard =', currentCard);
		console.log('targetArray vorher =', targetArray);
		console.log('$startCards vorher =', $startCards);
		console.log('$stopCards vorher =', $stopCards);
		targetArray.push(currentCard);
		console.log('targetArray nachher =', targetArray);
		console.log('$startCards nachher =', $startCards);
		console.log('$stopCards nachher =', $stopCards);
		// $startCards = [{text: 'hase', type: START, id: 215}];


	}

	const cleanSourceArray = (array) => {
		let tmpArray = [];
		switch ($draggedCardType) {
			case START:
				// tmpArray = $startCards;
				for (let i = 0; i < $startCards.length; i++) {
					if ($startCards[i].id !== $draggedCardId) {
						console.log('push:', $startCards[i].id);
						tmpArray.push($startCards[i]);
					}
				}
				$startCards = tmpArray;
				return;
			case STOP:
				// tmpArray = $stopCards;
				for (let i = 0; i < $stopCards.length; i++) {
					if ($stopCards[i].id !== $draggedCardId) {
						console.log('push:', $stopCards[i].id);
						tmpArray.push($stopCards[i]);
					}
				}
				$stopCards = tmpArray;
				return;
			case CONTINUE:
				// tmpArray = $continueCards;
				for (let i = 0; i < $continueCards.length; i++) {
					if ($continueCards[i].id !== $draggedCardId) {
						console.log('push:', $continueCards[i].id);
						tmpArray.push($continueCards[i]);
					}
				}
				$continueCards = tmpArray;
				console.log('$continueCards =', $continueCards);
				return;
		}
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
			  <Card text={startCard.text} id={startCard.id} type={startCard.type} />
		  {/each}
	  </div>
	  <div class="column" id="1" bind:this={stopContainer} on:drop={handleDrop} ondragover="return false">
		  <h2>STOP</h2>
		  {#each $stopCards as stopCard}
			  <Card text={stopCard.text} id={stopCard.id} type={stopCard.type} />
		  {/each}
	  </div>
	  <div class="column" id="2" bind:this={continueContainer} on:drop={handleDrop} ondragover="return false">
		  <h2>CONTINUE</h2>
		  {#each $continueCards as continueCard}
			  <Card text={continueCard.text} id={continueCard.id} type={continueCard.type} />
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
