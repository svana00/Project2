"use strict";
var my_rows;
var my_cols;
var mine_positions;

function clearField(mineField)
{
    document.getElementById("mineField").innerHTML = "";
    doAjax();
}

function doAjax() {

    //The URL to which we will send the request
    var url = 'https://veff213-minesweeper.herokuapp.com/api/v1/minesweeper';
    var rows_input = document.getElementById("rows").value;
    var cols_input = document.getElementById("cols").value;
    var mines_input = document.getElementById("mines").value;

    //Perform an AJAX POST request to the url, and set the param 'myParam' in the request body to paramValue
    axios.post(url, { rows: rows_input, cols: cols_input, mines: mines_input})
        .then(function (response) {
            //When successful, print 'Success: ' and the received data
            console.log("Success: ", response.data);

            var board = response.data.board;
            my_rows = board.rows;
            my_cols = board.cols;
            var container = document.getElementById("mineField");
            mine_positions = response.data.board.minePositions;

            for (var i = 0; i < my_rows; i++) {
                for (var j = 0; j < my_cols; j++) {

                    if (j % my_cols == 0) {
                        var br = document.createElement("br");
                        container.appendChild(br);
                    }

                    var state = [i, j];
                    var parameter = String(state)
                    var currentBut = document.createElement("button");
                    currentBut.onclick = function() {mine_click(this);};
                    // currentBut.setAttribute("onclick","mine_click()");
                    console.log(currentBut);
                    currentBut.className = "mine";

                    for (var index = 0; index < mine_positions.length; index++) { 
                        if (i === mine_positions[index][0] && j === mine_positions[index][1]) {
                            currentBut.className = "bomb";
                        }
                    } 

                    currentBut.setAttribute("id", state);
                    container.appendChild(currentBut);
                }
            }
            mark_mines()
            
        })
        .catch(function (error) {
            //When unsuccessful, print the error.
            console.log(error);
        });
}

function mark_mines() {

    for (var i = 0; i < my_rows; i++) {
        for (var j = 0; j < my_cols; j++) {
            var id = String(i) + "," + String(j)
            var counter = 0
            var current_button = document.getElementById(id)

            var upper = document.getElementById(String(i) + "," + String(j-1))
            var lower = document.getElementById(String(i) + "," + String(j+1))
            var right = document.getElementById(String(i+1) + "," + String(j))
            var left = document.getElementById(String(i-1) + "," + String(j))
            var left_down_diagonal = document.getElementById(String(i-1) + "," + String(j+1))
            var right_down_diagonal = document.getElementById(String(i+1) + "," + String(j+1))
            var left_up_diagonal = document.getElementById(String(i-1) + "," + String(j-1))
            var right_up_diagonal = document.getElementById(String(i-1) + "," + String(j-1))

            if (current_button.classList.contains("mine")) {
                if (upper != null) {
                    if (upper.classList.contains("bomb")) {
                        counter += 1
                    }
                }
                if (lower != null) {
                    if (lower.classList.contains("bomb")) {
                        counter += 1
                    }
                }
                if (right != null) {
                    if (right.classList.contains("bomb")) {
                        counter += 1
                    }
                }
                if (left != null) {
                    if (left.classList.contains("bomb")) {
                        counter += 1
                    }
                }
                if (left_down_diagonal != null) {
                    if (left_down_diagonal.classList.contains("bomb")) {
                        counter += 1
                    }
                }

                if (right_down_diagonal != null) {
                    if (right_down_diagonal.classList.contains("bomb")) {
                        counter += 1
                    }
                }

                if (left_up_diagonal != null) {
                    if (left_up_diagonal.classList.contains("bomb")) {
                        counter += 1
                    }
                }

                if (right_up_diagonal != null) {
                    if (right_up_diagonal.classList.contains("bomb")) {
                        counter += 1
                    }
                }
            }
            
            if (counter === 1) {
                current_button.className = "one_bomb";
            }

            else if (counter === 2) {
                current_button.className = "two_bombs";
            }

            else if (counter === 3) {
                current_button.className = "three_bombs";
            }

            else if (counter === 4) {
                current_button.className = "four_bombs";
            }

            else if (counter === 5) {
                current_button.className = "five_bombs";
            }

            else if (counter === 6) {
                current_button.className = "six_bombs";
            }

            else if (counter === 7) {
                current_button.className = "seven_bombs";
            }

            else if (counter === 8) {
                current_button.className = "eight_bombs";
            }

        }
    }
}

function mine_click(button) {

    console.log(button);

    if (button.className === "mine") {
        //return;
        console.log("mine(safe)");
    }

    else if (button.className === "one_bomb") {
        button.textContent = "1";
    }

    else if (button.className === "two_bombs") {
        button.textContent = "2";
    }

    else if (button.className === "three_bombs") {
        button.textContent = "3";
    }

    else if (button.className === "four_bombs") {
        button.textContent = "4";
    }

    else if (button.className === "five_bombs") {
        button.textContent = "5";
    }

    else if (button.className === "six_bombs") {
        button.textContent = "6";
    }

    else if (button.className === "seven_bombs") {
        button.textContent = "7";
    }

    else if (button.className === "eight_bombs") {
        button.textContent = "8";
    }

    else if (button.className === "bomb") {
        //return;
        console.log("bomb");
    }

    console.log(button);
}