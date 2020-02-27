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

                    var state = [j, i];
                    var currentBut = document.createElement("button");
                    currentBut.isflagged = false;
                    currentBut.xval = j;
                    currentBut.yval = i;
                    currentBut.onclick = function() {cell_click(this);};
                    currentBut.oncontextmenu = function() {cell_right_click(this);};
                    currentBut.className = "cell";

                    for (var index = 0; index < mine_positions.length; index++) { 
                        if (i === mine_positions[index][0] && j === mine_positions[index][1]) {
                            currentBut.className = "bomb";
                        }
                    } 

                    currentBut.setAttribute("id", state);
                    container.appendChild(currentBut);
                }
            }
            mark_cells()
            
        })
        .catch(function (error) {
            //When unsuccessful, print the error.
            console.log(error);
        });
}

function mark_cells() {

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
            var right_up_diagonal = document.getElementById(String(i+1) + "," + String(j-1))

            if (current_button.classList.contains("cell")) {
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

function find_adjacent_cells(button) {
    var x = button.xval;
    var y = button.yval;

    var upper = document.getElementById(String(x) + "," + String(y-1));
    if (upper != null) {
        if (upper.disabled != true) {
            cell_click(upper); 
        }
    }

    var lower = document.getElementById(String(x) + "," + String(y+1));
    if (lower != null) {
        if (lower.disabled != true) {
            cell_click(lower); 
        }
    }

    var left = document.getElementById(String(x-1) + "," + String(y));
    if (left != null) {
        if (left.disabled != true) {
            cell_click(left); 
        }
    }

    var right = document.getElementById(String(x+1) + "," + String(y));
    if (right != null) {
        if (right.disabled != true) {
            cell_click(right); 
        }
    }
}

function cell_click(button) {

    console.log(button);

    if (button.className === "cell") {
        button.disabled = true;
        button.classList.add("threeD");
        find_adjacent_cells(button);
    }

    else if (button.className === "one_bomb") {
        button.textContent = "1";
        button.disabled = true;
        button.classList.add("threeD");
    }

    else if (button.className === "two_bombs") {
        button.textContent = "2";
        button.disabled = true;
        button.classList.add("threeD");
    }

    else if (button.className === "three_bombs") {
        button.textContent = "3";
        button.disabled = true;
        button.classList.add("threeD");
    }

    else if (button.className === "four_bombs") {
        button.textContent = "4";
        button.disabled = true;
        button.classList.add("threeD");
    }

    else if (button.className === "five_bombs") {
        button.textContent = "5";
        button.disabled = true;
        button.classList.add("threeD");
    }

    else if (button.className === "six_bombs") {
        button.textContent = "6";
        button.disabled = true;
        button.classList.add("threeD");
    }

    else if (button.className === "seven_bombs") {
        button.textContent = "7";
        button.disabled = true;
        button.classList.add("threeD");
    }

    else if (button.className === "eight_bombs") {
        button.textContent = "8";
        button.disabled = true;
        button.classList.add("threeD");
    } 

    else if (button.className === "bomb") {
        var bomb_img = document.createElement("img");
        bomb_img.src = "bomb.png";
        button.appendChild(bomb_img);
    }

    console.log(button);
}

function cell_right_click(button) {

    if (button.isflagged === true) {
        button.isflagged = false;
        button.removeChild(document.getElementById("flag"));
        console.log(button);
    }

    else {
        var flag_img = document.createElement("img");
        flag_img.src = "flag.png";
        flag_img.id = "flag";

        button.appendChild(flag_img);
        button.isflagged = true;
        button.disabled = true;

        if (button.className === "bomb") {
            button.correctflag = true;
        }

        }

    console.log(button);
    document.addEventListener('contextmenu', event => event.preventDefault());
}
