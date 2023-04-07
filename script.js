"use strict";

//dom elements
const gameStarter = document.querySelector(".game__options");
const gameInterface = document.querySelector(".game");
const xMark = document.querySelector(".x__div");
const oMark = document.querySelector(".o__div");
const xIcon = document.getElementById("x");
const oIcon = document.getElementById("o");
const cells = document.querySelectorAll(".cell");
const labelP1 = document.querySelector(".player1 p");
const labelP2 = document.querySelector(".player2 p");
const playerMark = document.querySelector(".player__mark");
const scoreP1 = document.getElementById("p1__score");
const scoreP2 = document.getElementById("p2__score");
const scoreTie = document.getElementById("tie__score");

const newGameCPU = document.getElementById("ng__cpu");
const newGamePlayer = document.getElementById("ng__pl");
const btnRestart = document.querySelector(".restart");
const btnQuit = document.querySelector(".quit");
const btnNextRound = document.querySelector(".next__round");
const btnNoCancel = document.querySelector("#no__restart");
const btnYesRestart = document.querySelector("#yes__restart");
const tiedQuit = document.querySelector("#tieQuit");
const tiednextRound = document.querySelector("#tieNext");

const backdrop = document.querySelector(".backdrop");
const modalRestart = document.querySelector(".restart__pop");
const modal = document.querySelector(".modal");
const modalTied = document.querySelector(".tied");
const modalMulti = document.querySelector(".modal__multi");
const modalIcon = document.querySelector(".winner__icon");
const modalTitle = document.querySelector(".winner__title");
const modalheading = document.querySelector(".modal__para");

//globals
let player1;
let gameMode = "cpu";
let turn = "X";
let freeCells = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let xArray = [];
let oArray = [];
let xScore = 0;
let tieScore = 0;
let oScore = 0;
let winnerCombo = [
  [0, 1, 2],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [6, 7, 8],
  [2, 4, 6],
  [0, 4, 8],
  [3, 4, 5],
];

//functions

const activeChoise = function (icon) {
  if (icon === "x") {
    xMark.classList.add("mark__active");
    oMark.classList.remove("mark__active");
    xIcon.style.fill = "var(--dark-navy)";
    oIcon.style.fill = "var(--silver)";
    player1 = "x";
  } else {
    oMark.classList.add("mark__active");
    xMark.classList.remove("mark__active");
    oIcon.style.fill = "var(--dark-navy)";
    xIcon.style.fill = "var(--silver)";
    player1 = "o";
  }
};

const checkXWin = function () {
  return winnerCombo.find((combo) =>
    combo.every((element) => xArray.includes(element))
  );
};

const winnerX = function () {
  backdrop.style.visibility = "visible";
  modal.style.display = "block";
  modalTitle.style.color = "var(--light-blue)";
  modalIcon.src = "./assets/icon-x.svg";
  xScore++;
  scoreP1.textContent = xScore;

  if (gameMode === "cpu") {
    if (player1 === "x") {
      modalheading.textContent = "YOU WON!";
    } else {
      modalheading.textContent = "OH NO, YOU LOST…";
    }
  } else {
    if (player1 === "x") {
      modalheading.textContent = "PLAYER 1 WINS!";
    } else {
      modalheading.textContent = "PLAYER 2 WINS!";
    }
  }

  //   if (player1 === "x") {
  //     modalheading.textContent = "player1";
  //   } else {
  //     modalheading.textContent = "OH NO, YOU LOST…";
  //   }
};

const checkOWin = function () {
  return winnerCombo.find((combo) =>
    combo.every((element) => oArray.includes(element))
  );
};

const winnerO = function () {
  backdrop.style.visibility = "visible";
  modal.style.display = "block";
  modalTitle.style.color = "var(--light-yellow)";
  modalIcon.src = "./assets/icon-o.svg";
  oScore++;
  scoreP2.textContent = oScore;

  if (player1 !== "x") {
    modalheading.textContent = "YOU WON!";
  } else {
    modalheading.textContent = "OH NO, YOU LOST…";
  }
};

const winningStyle = function (arr) {
  if (turn === "x") {
    cells[arr[0]].style.background = "#31C3BD";
    cells[arr[0]].firstElementChild.src = "./assets/icon-x-win.svg";
    cells[arr[1]].style.background = "#31C3BD";
    cells[arr[1]].firstElementChild.src = "./assets/icon-x-win.svg";
    cells[arr[2]].style.background = "#31C3BD";
    cells[arr[2]].firstElementChild.src = "./assets/icon-x-win.svg";
  } else {
    cells[arr[0]].style.background = "#F2B137";
    cells[arr[0]].firstElementChild.src = "./assets/icon-o-win.svg";
    cells[arr[1]].style.background = "#F2B137";
    cells[arr[1]].firstElementChild.src = "./assets/icon-o-win.svg";
    cells[arr[2]].style.background = "#F2B137";
    cells[arr[2]].firstElementChild.src = "./assets/icon-o-win.svg";
  }
};

const cellHoverEffect = function () {
  for (let i = 0; i < freeCells.length; i++) {
    const playCellIndex = freeCells[i];
    if (turn === "x") {
      cells[playCellIndex].classList.add("xHover");
      cells[playCellIndex].classList.remove("oHover");
    } else {
      cells[playCellIndex].classList.add("oHover");
      cells[playCellIndex].classList.remove("XHover");
    }
  }
};

const cpuPlays = function () {
  console.log("cpy player");
};

const drawMarks = function () {
  for (let i = 0; i < freeCells.length; i++) {
    cells[i].style.background = "var(--light-dark-navy)";
    cells[i].innerHTML = "";
    cells[i].onclick = (e) => {
      e.target.classList.remove("xHover");
      e.target.classList.remove("oHover");

      const cutedCellIndex = freeCells.indexOf(i);
      freeCells.splice(cutedCellIndex, 1);

      const icon = document.createElement("img");

      if (turn === "x") {
        icon.src = "./assets/icon-x.svg";
        e.target.append(icon);

        xArray.push(i);
        const winX = checkXWin();
        if (winX) {
          winnerX();
          winningStyle(winX);
          return;
        }

        if (xArray.length === 5) {
          modalTied.style.display = "block";
          backdrop.style.visibility = "visible";
          tieScore++;
          scoreTie.textContent = tieScore;
        }

        turn = "o";
        playerMark.textContent = "O";
      } else {
        icon.src = "./assets/icon-o.svg";
        e.target.append(icon);

        oArray.push(i);
        const win = checkOWin();
        if (win) {
          winnerO();
          winningStyle(win);
          return;
        }

        turn = "x";
        playerMark.textContent = "X";
      }

      cellHoverEffect();

      e.target.onclick = null;
    };
  }
};

const startGame = function (mode) {
  gameStarter.style.display = "none";
  gameInterface.style.display = "block";
  gameMode = mode;
  turn = "x";

  if (gameMode === "cpu") {
    if (player1 === "x") {
      labelP1.textContent = "X (YOU)";
      labelP2.textContent = "O (CPU)";
    } else {
      labelP1.textContent = "O (YOU)";
      labelP2.textContent = "X (CPU)";
    }
  } else {
    if (player1 === "x") {
      labelP1.textContent = "X (P1)";
      labelP2.textContent = "O (P2)";
    } else {
      labelP1.textContent = "O (P1)";
      labelP2.textContent = "X (P2)";
    }
  }

  cellHoverEffect();
  drawMarks();
};

const reset = function () {
  player1 = "x";
  gameMode = "cpu";
  turn = "X";
  freeCells = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  xArray = [];
  oArray = [];
  backdrop.style.visibility = "hidden";
  modal.style.display = "none";
  modalRestart.style.display = "none";
  modalTied.style.display = "none";
};

const quit = function () {
  reset();
  gameStarter.style.display = "block";
  gameInterface.style.display = "none";
  xScore = 0;
  tieScore = 0;
  oScore = 0;
  scoreP1.textContent = 0;
  scoreP2.textContent = 0;
  modal.style.display = "none";
  backdrop.style.visibility = "hidden";
  modalRestart.style.display = "none";
  modalTied.style.display = "none";
};

const nextRound = function () {
  reset();
  startGame(gameMode);
};

//event listeners
btnRestart.addEventListener("click", function () {
  backdrop.style.visibility = "visible";
  modalRestart.style.display = "block";
});

btnNoCancel.addEventListener("click", function () {
  backdrop.style.visibility = "hidden";
  modalRestart.style.display = "none";
});

btnQuit.addEventListener("click", quit);
btnNextRound.addEventListener("click", nextRound);
btnYesRestart.addEventListener("click", nextRound);
tiedQuit.addEventListener("click", quit);
tiednextRound.addEventListener("click", nextRound);
