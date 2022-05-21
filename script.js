const actions = document.querySelectorAll("[data-action]");
const actionIcons = [...actions].map(action => action.textContent);
const acceptedMoves = [...actions].map(e => e.dataset.action);

const modal = document.querySelector(".modal");
const postGameText = modal.querySelector("#post-game-text");

const gameMenu = document.querySelector(".game-menu");
const actionMenu = document.querySelector(".action-menu");

const playerMoveIcon = gameMenu.querySelector("#player");
const computerMoveIcon = gameMenu.querySelector("#computer");
const result = gameMenu.querySelector("#result");

const playerScore = gameMenu.querySelector("#player-score");
const computerScore = gameMenu.querySelector("#computer-score");

function startGame() {
  modal.classList.add("hidden");
  gameMenu.classList.remove("hidden");
  actionMenu.classList.remove("hidden");

  playerScore.innerText = 0;
  computerScore.innerText = 0;

  playerMoveIcon.classList.remove("win", "lose");
  computerMoveIcon.classList.remove("win", "lose");

  actions.forEach(action => action.disabled = false);
}

function playRound(e) {
  const computerMoveIndex = Math.round(Math.random() * 100) % acceptedMoves.length;
  const playerMoveIndex = acceptedMoves.indexOf(e.target.dataset.action);
  if (playerMoveIndex === undefined) return;

  updateScores(playerMoveIndex, computerMoveIndex);
}

function updateScores(player, computer) {
  const sameMove = computer == player;
  const playerWins = (player + 1) % 3 != computer && !sameMove;

  playerMoveIcon.innerHTML = actionIcons[player];
  computerMoveIcon.innerHTML = actionIcons[computer];
  result.innerHTML = (sameMove && "DRAW") || (playerWins && "WIN") || "LOSE";

  playerMoveIcon.classList.remove("win", "lose");
  computerMoveIcon.classList.remove("win", "lose");

  if (playerWins) {
    playerScore.innerText = parseInt(playerScore.innerText) + 1;
    playerMoveIcon.classList.add("win");
    computerMoveIcon.classList.add("lose");
  }
  else if (!sameMove) {
    computerScore.innerText = parseInt(computerScore.innerText) + 1;
    computerMoveIcon.classList.add("win");
    playerMoveIcon.classList.add("lose");
  }

  checkEnding();
}

function checkEnding() {
  if (computerScore.innerText != 5 && playerScore.innerText != 5)
    return;

  actions.forEach(action => action.disabled = true);

  let endText;
  if (playerScore.innerText == 5)
    endText = "YOU WIN! &#129395";
  else if (playerScore.innerText == 0)
    endText = "You have been DESTROYED! &#128565"
  else
    endText = `You lose.`;

  postGameText.innerHTML = endText;
  postGameText.classList.remove("hidden");
  modal.classList.remove("hidden");
}

modal.querySelector("button").addEventListener("click", startGame);
actions.forEach(action => action.addEventListener("click", playRound));

