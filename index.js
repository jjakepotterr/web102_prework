import GAMES_DATA from './games.js';

/**********************************************************
 * Parse game data
 **********************************************************/
const GAMES_JSON = JSON.parse(GAMES_DATA);

/**********************************************************
 * Utility function
 **********************************************************/
function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/**********************************************************
 * Challenge 3: Render game cards
 **********************************************************/
const gamesContainer = document.getElementById("games-container");

function addGamesToPage(games) {
  for (let i = 0; i < games.length; i++) {
    const game = games[i];

    const gameCard = document.createElement("div");
    gameCard.classList.add("game-card");

    gameCard.innerHTML = `
      <img class="game-img" src="${game.img}" alt="${game.name}">
      <h3>${game.name}</h3>
      <p>${game.description}</p>
      <p><strong>Pledged:</strong> $${game.pledged.toLocaleString()}</p>
      <p><strong>Goal:</strong> $${game.goal.toLocaleString()}</p>
    `;

    gamesContainer.appendChild(gameCard);
  }
}

// Initial render
addGamesToPage(GAMES_JSON);

/**********************************************************
 * Challenge 4: Summary statistics
 **********************************************************/
const contributionsCard = document.getElementById("num-contributions");
const raisedCard = document.getElementById("total-raised");
const gamesCard = document.getElementById("num-games");

// Total contributions (backers)
const totalContributions = GAMES_JSON.reduce((acc, game) => acc + game.backers, 0);
contributionsCard.innerHTML = totalContributions.toLocaleString();

// Total amount raised
const totalRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

// Total number of games
gamesCard.innerHTML = GAMES_JSON.length;

/**********************************************************
 * Challenge 5: Filters
 **********************************************************/
function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);
  const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
  addGamesToPage(unfundedGames);
}

function filterFundedOnly() {
  deleteChildElements(gamesContainer);
  const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
  addGamesToPage(fundedGames);
}

function showAllGames() {
  deleteChildElements(gamesContainer);
  addGamesToPage(GAMES_JSON);
}

// Buttons
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// Event listeners
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/**********************************************************
 * Challenge 6: Company description
 **********************************************************/
const descriptionContainer = document.getElementById("description-container");

const unfundedCount = GAMES_JSON.filter(game => game.pledged < game.goal).length;

const descriptionParagraph = document.createElement("p");
descriptionParagraph.innerHTML = `
  We have raised $${totalRaised.toLocaleString()} for ${GAMES_JSON.length} games.
  ${
    unfundedCount === 1
      ? "1 game remains unfunded."
      : `${unfundedCount} games remain unfunded.`
  }
`;

descriptionContainer.appendChild(descriptionParagraph);

/**********************************************************
 * Challenge 7: Top 2 funded games
 **********************************************************/
const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = [...GAMES_JSON].sort((a, b) => b.pledged - a.pledged);
const [topGame, secondGame] = sortedGames;

const topGameElement = document.createElement("p");
topGameElement.innerHTML = topGame.name;
firstGameContainer.appendChild(topGameElement);

const secondGameElement = document.createElement("p");
secondGameElement.innerHTML = secondGame.name;
secondGameContainer.appendChild(secondGameElement);
