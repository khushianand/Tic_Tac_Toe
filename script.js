// Display a welcome message in the console
console.log("Welcome to Tic Tac Toe");

// Create instances of Audio objects for background music,
// turn sound, and game over sound
let music = new Audio("music.mp3");
let audioTurn = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");

// Set the initial player turn to "X"
let turn = "X";

// Initialize the game over state as false
let isgameover = false;

// Function to change the turn
const changeTurn = () => {
    if (turn === "X") {
        return "0";
    }
    else{
        return "X";
    }
}
//concised if-else ----- " return turn ==="X" ? "0" : " X";

// Function to check for a win
const checkWin = () => {
    // Get all elements with the class 'boxtext'
    let boxtext = document.getElementsByClassName('boxtext');
    
    // Define winning combinations with their corresponding
    // indices and line configurations
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ];

    // Iterate through each winning combination
    wins.forEach(e => {
        // Check if the values in the winning combination 
        //match and are not empty
        if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText !== "")) {
            // Display the winner and set game over state to true
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won";
            isgameover = true;

            // Update visual effects for winning line
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            document.querySelector(".line").style.width = "20vw";
        }
    });
}


//GAME LOGIC
// Get all elements with the class 'box'
let boxes = document.getElementsByClassName("box");

// Add click event listeners to each box element
Array.from(boxes).forEach(element => {
    //"element.querySelector" is to select the text from the boxtext
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        // Check if the box is empty
        if (boxtext.innerText === '') {
            // Update the box with the current player's symbol,
            //change turn, play turn sound, and check for a win
            boxtext.innerText = turn;
            turn = changeTurn();
            audioTurn.play();
            checkWin();
            
            // If the game is not over, update the turn
            // information
            if (!isgameover) {
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
            }
        }
    });
});

// Add onclick listener to reset button
reset.addEventListener('click', () => {
    // Clear the text content of all elements with 
    //the class 'boxtext'
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
    });

    // Reset the turn to "X", set game over state to false, 
    //and reset visual effects
    turn = "X";
    isgameover = false;
    document.querySelector(".line").style.width = "0vw";
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px";
});
