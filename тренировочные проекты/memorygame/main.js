document.addEventListener("DOMContentLoaded", () => {
  const gridDisplay = document.querySelector("#grid");

  const resultDisplay = document.querySelector("#result");

  const cardArray = [
    {
      name: "даниил",
      img: "img/даниил1.png",
    },
    {
      name: "даниил2",
      img: "img/даниил2.1.png",
    },
    {
      name: "илюха",
      img: "img/илюха1.1.png",
    },
    {
      name: "илюха2",
      img: "img/илюха2.1.png",
    },
    {
      name: "никита",
      img: "img/никита1.1.png",
    },
    {
      name: "никита2",
      img: "img/никита2.1.png",
    },

    {
      name: "даниил",
      img: "img/даниил1.png",
    },
    {
      name: "даниил2",
      img: "img/даниил2.1.png",
    },
    {
      name: "илюха",
      img: "img/илюха1.1.png",
    },
    {
      name: "илюха2",
      img: "img/илюха2.1.png",
    },
    {
      name: "никита",
      img: "img/никита1.1.png",
    },
    {
      name: "никита2",
      img: "img/никита2.1.png",
    },
  ];

  let cardChosen = [];

  let cardChosenId = [];

  const cardWon = [];

  cardArray.sort(() => 0.5 - Math.random());

  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      const card = document.createElement("img");

      card.setAttribute("src", "img/рубашка.png");

      card.setAttribute("data-id", i);

      card.addEventListener("click", flipCard);

      gridDisplay.appendChild(card);
    }
  }

  function checkMatch() {
    const cards = document.querySelectorAll("img");

    const optionOneId = cardChosenId[0];

    const optionTwoId = cardChosenId[1];

    if (optionOneId == optionTwoId) {
      cards[optionOneId].setAttribute("src", "img/рубашка.png");
      cards[optionTwoId].setAttribute("src", "img/рубашка.png");
      alert("You WON ");
    } else if (cardChosen[0] === cardChosen[1]) {
      cards[optionOneId].setAttribute("src", "img/белыйфон.png");
      cards[optionTwoId].setAttribute("src", "img/белыйфон.png");
      cards[optionOneId].removeEventListener("click", flipCard);
      cards[optionTwoId].removeEventListener("click", flipCard);
      cardWon.push(cardChosen);
    } else {
      cards[optionOneId].setAttribute("src", "img/рубашка.png");
      cards[optionTwoId].setAttribute("src", "img/рубашка.png");
    }

    resultDisplay.textContent = cardWon.length;

    cardChosen = [];
    cardChosenId = [];

    if (cardWon.length === cardArray.length / 2) {
      resultDisplay.textContent = "С победой!";
    }
  }

  createBoard();

  function flipCard() {
    let cardId = this.getAttribute("data-id");

    cardChosen.push(cardArray[cardId].name);

    cardChosenId.push(cardId);

    this.setAttribute("src", cardArray[cardId].img);

    if (cardChosen.length === 2) {
      setTimeout(checkMatch, 500);
    }
  }
});
