const blocks = document.querySelectorAll(".block");
const restart = document.querySelector(".restart");
const win = document.querySelector(".win");

let current = "X";  //false implies X, true implies O
let blocksFilled = 0;
let isClickAllowed = true;

blocks.forEach((ele) => {
    ele.addEventListener("click", () => {
        if (isClickAllowed) {
            if (ele.innerHTML == "") {
                ele.innerHTML = current;
                // console.log(current);
                if (current === "X") {
                    current = "O"
                }
                else current = "X"
                blocksFilled++;
            }
            check();
        }
    })
})


restart.addEventListener("click", () => {
    blocks.forEach((ele) => {
        ele.innerHTML = ""
    })
    blocksFilled = 0;
    win.innerHTML = ""
    isClickAllowed = true;
    current="X";
})


function check() {
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

function Winner(notDraw, winner) {
    if (notDraw) win.innerHTML = winner + " Won!";
    else win.innerHTML = "Draw!";
    isClickAllowed = false;
}


