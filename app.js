let userScore = 0;
let compScore = 0;

const choice = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const restartBtn = document.querySelector("#restart-btn");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const COLORS = {
  WIN: "green",
  LOSE: "red",
  DRAW: "#001b31",
};

// Debugging Logs
if (!msg) console.error("Element with ID 'msg' not found.");
if (!userScorePara || !compScorePara)
  console.error("Score elements not found.");
if (choice.length === 0)
  console.error("No elements with the class 'choice' found.");

const getCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  return options[Math.floor(Math.random() * options.length)];
};

const drawGame = () => {
  msg.innerText = "Game was a draw. Play again.";
  msg.style.backgroundColor = COLORS.DRAW;
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You win! Your ${userChoice} beats ${compChoice}.`;
    msg.style.backgroundColor = COLORS.WIN;
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You lost. ${compChoice} beats your ${userChoice}.`;
    msg.style.backgroundColor = COLORS.LOSE;
  }
};

const playGame = (userChoice) => {
  const validChoices = ["rock", "paper", "scissors"];
  if (!validChoices.includes(userChoice)) {
    msg.innerText = "Invalid choice. Please select rock, paper, or scissors.";
    msg.style.backgroundColor = COLORS.DRAW;
    return;
  }

  // Overlay elements
  const overlay = document.querySelector("#overlay");
  const userOverlay = document.querySelector(".user-overlay");
  const compOverlay = document.querySelector(".computer-overlay");
  const resultOverlay = document.querySelector(".result-overlay");

  // Display the overlay and show user's choice on the left
  overlay.classList.remove("hidden");
  userOverlay.innerHTML = `<img src="./images/${userChoice}.png" alt="${userChoice}" />`;

  // Show a spinner on the computer's side (right)
  compOverlay.innerHTML = `<div class="spinner"></div>`;

  // Clear the result overlay initially
  resultOverlay.innerHTML = "";

  // After a delay, reveal the computer's choice and the result
  setTimeout(() => {
    const compChoice = getCompChoice();
    compOverlay.innerHTML = `<img src="./images/${compChoice}.png" alt="${compChoice}" />`;

    if (userChoice === compChoice) {
      resultOverlay.innerText = "It's a draw!";
      drawGame();
    } else {
      const winConditions = {
        rock: "scissors",
        paper: "rock",
        scissors: "paper",
      };
      if (winConditions[userChoice] === compChoice) {
        // Player wins
        resultOverlay.innerHTML = `<img src="./images/giphy.gif" alt="You Win!" />`;
        showWinner(true, userChoice, compChoice);
      } else {
        // Computer wins
        resultOverlay.innerHTML = `<img src="./images/loose-24-15590.gif" alt="You Lose!" />`;
        showWinner(false, userChoice, compChoice);
      }
    }
  }, 2000);

  // Hide the overlay after 4 seconds and clear its content
  setTimeout(() => {
    overlay.classList.add("hidden");
    userOverlay.innerHTML = "";
    compOverlay.innerHTML = "";
    resultOverlay.innerHTML = "";
  }, 4000);
};

// Event Listeners for Choices
choice.forEach((choiceElement) => {
  choiceElement.addEventListener("click", () => {
    const userChoice = choiceElement.getAttribute("id");
    playGame(userChoice);
  });
});

// Restart button functionality
restartBtn.addEventListener("click", () => {
  userScore = 0;
  compScore = 0;
  userScorePara.innerText = userScore;
  compScorePara.innerText = compScore;
  msg.innerText = "Play your move";
  msg.style.backgroundColor = COLORS.DRAW;
});
