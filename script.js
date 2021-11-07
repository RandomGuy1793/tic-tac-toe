const blocks = document.querySelectorAll(".block");
const restart = document.querySelector(".restart");
const win = document.querySelector(".win");
const turn = document.querySelector(".turn");

let current = "X";
let blocksFilled = 0;
let isClickAllowed = true;

let check = () => {
    for (let i = 0; i < 9; i += 3) {    //for horizontal check
        if (blocks[i].innerHTML !== "" && blocks[i].innerHTML === blocks[i + 1].innerHTML && blocks[i + 1].innerHTML === blocks[i + 2].innerHTML) {
            Winner(true, blocks[i].innerHTML);
            return;
        }
    }
    for (let i = 0; i < 3; i++) {   //for vertical check
        if (blocks[i].innerHTML !== "" && blocks[i].innerHTML === blocks[i + 3].innerHTML && blocks[i + 3].innerHTML === blocks[i + 6].innerHTML) {
            Winner(true, blocks[i].innerHTML);
            return;
        }
    }
    let i = 2;
    // other diagonal check
    if (blocks[i].innerHTML !== "" && blocks[i].innerHTML === blocks[i + 2].innerHTML && blocks[i + 2].innerHTML === blocks[i + 4].innerHTML) {
        Winner(true, blocks[i].innerHTML);
        return;
    }
    i = 0;
    //diagonal check
    if (blocks[i].innerHTML !== "" && blocks[i].innerHTML === blocks[i + 4].innerHTML && blocks[i + 4].innerHTML === blocks[i + 8].innerHTML) {
        Winner(true, blocks[i].innerHTML);
        return;
    }

    //all filled but no winner
    if (blocksFilled === blocks.length) Winner(false)
}

let Winner = (notDraw, winner) => {
    if (notDraw) win.innerHTML = winner + " Won!";
    else win.innerHTML = "Draw!";
    isClickAllowed = false;
}

let reset = () => {
    blocks.forEach((ele) => {
        ele.innerHTML = ""
    })
    blocksFilled = 0;
    win.innerHTML = ""
    isClickAllowed = true;
    current = "X";
    turn.innerHTML=`${current}'s turn`
}

let ValidMove = (ele) => {
    if (isClickAllowed) {
        if (ele.innerHTML == "") {
            ele.innerHTML = current;
            if (current === "X") {
                current = "O"
            }
            else {
                current = "X"
            }
            turn.innerHTML = `${current}'s turn`
            blocksFilled++;
        }
        check();
    }
}

blocks.forEach((ele) => {
    ele.addEventListener("click", ()=>ValidMove(ele))   //passing parameter to callback using anonymous fn
})

restart.addEventListener("click", reset);


