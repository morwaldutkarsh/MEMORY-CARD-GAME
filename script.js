const emojis = ["🚀", "🐱", "🍕", "🎮", "🌈", "🧠", "🎵", "🍩"];
const cardsContainer = document.querySelector(".cards_container");
let count=0;

let cardsArray = [...emojis, ...emojis]; // 8 pairs = 16 cards
cardsArray.sort(() => 0.5 - Math.random()); // shuffle

// Assign emojis to cards
const cards = document.querySelectorAll(".card");
cards.forEach((card, index) => {
  card.dataset.emoji = cardsArray[index];
  card.innerText = "❓"; // Hidden emoji face
});

let flippedCards = [];
let lockBoard = false;

function flipCard(card) {
  if (lockBoard || card.classList.contains("matched") || flippedCards.includes(card)) return;

  card.innerText = card.dataset.emoji;
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    lockBoard = true;

    const [first, second] = flippedCards;
    if (first.dataset.emoji === second.dataset.emoji) {
      first.classList.add("matched");
      second.classList.add("matched");
      flippedCards = [];
      lockBoard = false;
    } else {
      setTimeout(() => {
        first.innerText = "❓";
        second.innerText = "❓";
        flippedCards = [];
        lockBoard = false;
      }, 1000);
    }
  }
  count++;
  document.getElementById("count").innerText=count;
  const matchedCards = document.querySelectorAll(".matched");
  if (matchedCards.length === 16) {
     document.getElementById("win").innerText = `you win after ${count} clicks` ;// 👈 call the win function when all cards are matched
  }

}

