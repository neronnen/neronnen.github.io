const character = document.getElementById("character");
var block = document.getElementById("block");
const game = document.getElementById("game");

let counter = 0;

game.addEventListener("click", jump);

character.setAttribute("src", "img/диноникита.png");

function jump() {
  if (character.classList != "animate") {
    character.classList.add("animate");
  }

  setTimeout(function () {
    character.classList.remove("animate");
  }, 500);
}

let checkDead = setInterval(() => {
  let characterDead = parseInt(
    window.getComputedStyle(character).getPropertyValue("top")
  );
  let blockB = parseInt(
    window.getComputedStyle(block).getPropertyValue("left")
  );
  if (blockB < 20 && blockB > -20 && characterDead >= 130) {
    block.style.animation = "none";
    alert("Game Over. score: " + Math.floor(counter / 100));
    counter = 0;
    block.style.animation = "block 1s infinite linear";
  } else {
    counter++;
    document.getElementById("scoreSpan").innerHTML = Math.floor(counter / 100);
  }
}, 10);
