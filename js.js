const selectBox = document.querySelector(".select-box"),
    selectxBtn = selectBox.querySelector(".playerx"),
    selectoBtn = selectBox.querySelector(".playero"),
    playBoard = document.querySelector(".play-board"),
    allBox = document.querySelectorAll("section span"),
    players = document.querySelector(".players"),
    resultBox = document.querySelector(".result-box"),
    wonText = resultBox.querySelector(".won-text"),
    replayBtn = resultBox.querySelector("button");




window.onload = () => {
    for (let i = 0; i < allBox.length; i++) {
        allBox[i].setAttribute("onclick", "clickedBox(this)");
    }

    selectxBtn.onclick = () => {
        selectBox.classList.add("hide");
        playBoard.classList.add("show");

    }
    selectoBtn.onclick = () => {
        selectBox.classList.add("hide");
        playBoard.classList.add("show");
        players.setAttribute("class", "players active player");
    }
};
let playerxIcon = "fas fa-times";
let playeroIcon = "far fa-circle";
let playerSign = "x";
let runBot = true;
//user click
function clickedBox(element) {
    if (players.classList.contains("player")) {
        element.innerHTML = `<i class="${playeroIcon}"></i>`; // 'o'
        players.classList.add("active");
        playerSign = "o";
        element.setAttribute("id", playerSign);

    } else {
        element.innerHTML = `<i class="${playerxIcon}"></i>`; //'<i class="${playerxIcon}"></i>'
        players.classList.add("active");
        element.setAttribute("id", playerSign);
    }
    selectWinner();
    playBoard.style.pointerEvents = "none";
    element.style.pointerEvents = "none";
    let randomDelayTime = ((Math.random() * 1000) + 200).toFixed();
    setTimeout(() => {
        bot(runBot);
    }, randomDelayTime);
}
//boot click
function bot(runBot) {
    if (runBot) {
        playerSign = "o";
        let array = [];
        for (let i = 0; i < allBox.length; i++) {
            if (allBox[i].childElementCount == 0) {
                array.push(i);
            }
        }
        let randomBox = array[Math.floor(Math.random() * array.length)];

        if (array.length > 0) {
            if (players.classList.contains("player")) {
                allBox[randomBox].innerHTML = `<i class="${playerxIcon}"></i>`;
                players.classList.remove("active");
                playerSign = "x";
                allBox[randomBox].setAttribute("id", playerSign)

            } else {
                allBox[randomBox].innerHTML = `<i class="${playeroIcon}"></i>`;
                players.classList.remove("active");
                allBox[randomBox].setAttribute("id", playerSign)

            }
            selectWinner();
        }
        allBox[randomBox].style.pointerEvents = "none";
        playBoard.style.pointerEvents = "auto";

        playerSign = "x";
    }

}

function getClass(idName) {
    return document.querySelector(".box" + idName).id;
}

function chechClass(val1, val2, val3, sign) {
    if (getClass(val1) == sign && getClass(val2) == sign && getClass(val3) == sign) {
        return true;
    }
}

function selectWinner() {
    if (chechClass(1, 2, 3, playerSign) || chechClass(4, 5, 6, playerSign) || chechClass(7, 8, 9, playerSign) || chechClass(1, 4, 7, playerSign) || chechClass(2, 5, 8, playerSign) || chechClass(3, 6, 9, playerSign) || chechClass(1, 5, 9, playerSign) || chechClass(3, 5, 7, playerSign)) {
        runBot = false;
        bot(runBot);
        setTimeout(() => {
            playBoard.classList.remove("show");
            resultBox.classList.add("show")
        }, 700)
        wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`;
    } else {
        if (getClass(1) != "" && getClass(2) != "" && getClass(3) != "" && getClass(4) != "" && getClass(5) != "" && getClass(6) != "" && getClass(7) != "" && getClass(8) != "" && getClass(9) != "") {
            runBot = false;
            bot(runBot);
            setTimeout(() => {
                playBoard.classList.remove("show");
                resultBox.classList.add("show")
            }, 700)
            wonText.textContent = `Match has been drawn!`;
        }
    }
}

replayBtn.onclick = () => {
    window.location.reload();
}