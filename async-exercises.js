"use strict";
const NUMBERS_API_RANDOM_NUM_URL = "http://numbersapi.com";

const $factsDisplay = $("#facts-display");

/** Async function to return random fact about random num by calling numbers API */
async function getFact() {
  const resp = await axios({
    baseURL: NUMBERS_API_RANDOM_NUM_URL,
    url: "/random?json",
    method: "GET"
  });

  let result = resp.data;
  console.log(typeof result);

  return result.text;
}

/**Takes 2 integers for a start stop range
 * Displays random facts about the nums in that range
 * @param {int} start
 * @param {int} stop
 */
async function getMultipleNumFacts(start, stop) {
  const resp = await axios({
    baseURL: NUMBERS_API_RANDOM_NUM_URL,
    url: `/${start}..${stop}`,
    method: "GET"
  });

  let result = resp.data;
  displayFacts(result);
}

/**Takes a single number
 * Displays 4 random facts about the that number
 * @param {int} start
 * @param {int} stop
 */
async function getFavNumFacts(num) {
  const fact1 = axios({
    baseURL: NUMBERS_API_RANDOM_NUM_URL,
    url: `/${num}?json`,
    method: "GET"
  });
  const fact2 = axios({
    baseURL: NUMBERS_API_RANDOM_NUM_URL,
    url: `/${num}?json`,
    method: "GET"
  });
  const fact3 = axios({
    baseURL: NUMBERS_API_RANDOM_NUM_URL,
    url: `/${num}?json`,
    method: "GET"
  });
  const fact4 = axios({
    baseURL: NUMBERS_API_RANDOM_NUM_URL,
    url: `/${num}?json`,
    method: "GET"
  });

  const resultsPromise = await Promise.all([fact1, fact2, fact3, fact4]);
  //TODO: could use Promise.allSettled and filter for fulfilled
  const numFacts = []; //TODO: use map here
  for (let fact of resultsPromise) {
    numFacts.push(`${fact.data.text}`);
  }
  displayFacts(numFacts);

}

/**Traverses through an object or array and appends its values to the facts-display dom
 * @param {Object, Array} facts
 */
function displayFacts(facts) {
  $factsDisplay.empty();
  for (let key in facts) {
    const $fact = $(`<p>${facts[key]}</p>`);
    $factsDisplay.append($fact);
  }
};

