const body = document.querySelector("body");
const display = document.querySelector("#display");
const btns = document.querySelectorAll(".btn");

let gameSeq = [];
let userSeq = [];
let isStarted = false;
let level = 0;

document.addEventListener("keypress", function (e) {
  if (!isStarted) {
    isStarted = true;
    levelUp();
  }
});

function randomIndex() {
  return Math.floor(Math.random() * 4);
}

function levelUp() {
  userSeq = [];

  display.innerText = `Level ${++level}`;

  let randIdx = randomIndex();
  gameSeq.push(btns[randIdx].getAttribute("id"));
  btnFlash(btns[randIdx]);
}

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 250);
}

function checkAns(idx) {
  if (gameSeq[idx] === userSeq[idx]) {
    if (gameSeq.length == userSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    display.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start.`;
    body.classList.add("game-over-flash");
    setTimeout(() => {
      body.classList.remove("game-over-flash");
    }, 150);
    reset();
  }
}

function btnPress() {
  if (isStarted) {
    userSeq.push(this.getAttribute("id"));
    btnFlash(this);
    checkAns(userSeq.length - 1);
  }
}

for (const btn of btns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  isStarted = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
