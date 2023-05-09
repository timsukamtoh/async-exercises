"use strict"

const $DISPLAY_AREA = $("#displayArea");

const BASE_URL = "https://deckofcardsapi.com/"
const NEW_DECK_URL = "api/deck/new/shuffle/?deck_count=1"

async function getShuffledDeck() {
  const resp = await axios({
    baseURL: BASE_URL,
    url: NEW_DECK_URL,
    method: "GET"
  });

  let result = resp.data;
  let deckID = result.deck_id

  // console.log(deckID);

  return deckID;
}


async function drawCard(deckID, num = 1) {
  const resp = await axios({
    baseURL: BASE_URL,
    url:  `api/deck/${deckID}/draw` ,
    method: "GET",
    parameters:
      {
        count: num
      }
  });

  let result = resp.data;
  let remaining = result.remaining;
  if (remaining === 0){
    return
  }
  let cardValue = result.cards[0].value;
  let cardSuit = result.cards[0].suit;

  console.log("card value:", cardValue, "card suit:", cardSuit);

  return {cardValue, cardSuit};
}

async function controlFunction(){
  const deckID = await getShuffledDeck();
  const card1 = await drawCard(deckID);
  const card2 = await drawCard(deckID);

  console.log(card1, card2);
}

async function displayCard(deckID){
  const card = await drawCard(deckID);
  if (card === undefined){
    $("#message").text("No cards remaining.");
  }
  else{
    const $newCard = $("<p>").text(`${card.cardValue}, ${card.cardSuit}`)
    $DISPLAY_AREA.append($newCard);
  }
}

async function loadPage(){
  const deckID =  await getShuffledDeck();
  $("button").on("click", () => {displayCard(deckID)});
}

loadPage();