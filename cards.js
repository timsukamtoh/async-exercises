"use strict"

const $DISPLAY_AREA = $("#displayArea");

const BASE_URL = "https://deckofcardsapi.com/"
const NEW_DECK_URL = "api/deck/new/shuffle/?deck_count=1"

/** Call api to get random shuffled deck and return
 * deckID
 */
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

/** Call api to draw card from deckID.
 * Returns cardValue and cardSuit of card.
 */
async function drawCard(deckID) {
  const resp = await axios({
    baseURL: BASE_URL,
    url:  `api/deck/${deckID}/draw` ,
    method: "GET",
    parameters:
      {
        count: 1
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


/** Calls getShuffledDeck() and then calls drawCard on that
 * deck id twice, logging results to console.
 */
async function controlFunction(){
  const deckID = await getShuffledDeck();
  const card1 = await drawCard(deckID);
  const card2 = await drawCard(deckID);

  console.log(card1, card2);
}

/** Call drawCard() on deckId obtained at login and passed in.
 * Displays card in dom beneath previous cards. Checks if any
 * cards in deck remaining and provides message to user.
 */
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

/** Upon page load calls getShuffledDeck to get new deckID
 *  and sets up event listener on draw card button.
 */
async function loadPage(){
  const deckID =  await getShuffledDeck();
  $("button").on("click", () => {displayCard(deckID)});
}

loadPage();