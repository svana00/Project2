'use strict';
var my_rows;
var my_cols;
var mine_positions;
var container = document.getElementById("mineField");

function clearField(mineField) {
    document.getElementById("mineField").innerHTML = "";
    document.getElementById("alert_div").innerHTML = "";
    create_board();
}

function create_board() {

    //The URL to which we will send the request
    var url = 'https://veff213-minesweeper.herokuapp.com/api/v1/minesweeper';
    var rows_input = document.getElementById("rows").value;
    var cols_input = document.getElementById("cols").value;
    var mines_input = document.getElementById("mines").value;
    var fields_amount = (rows_input * cols_input);

    if (rows_input === null || rows_input < 1 || rows_input > 40 || cols_input === null || cols_input < 1 || cols_input > 40 || mines_input > fields_amount || mines_input < 1) {
        rows_input = 10;
        cols_input = 10;
        mines_input = 10;
    }

    //Perform an AJAX POST request to the url, and set the param 'myParam' in the request body to paramValue
    axios.post(url, { rows: rows_input, cols: cols_input, mines: mines_input})
        .then(function (response) {
            //When successful, print 'Success: ' and the received data
            console.log("Success: ", response.data);

            var board = response.data.board;
            my_rows = board.rows;
            my_cols = board.cols;
            mine_positions = response.data.board.minePositions;
            create_cells();
 
        })
        .catch(function (error) {
            var mine_positions = [[1,3],[3,0],[4,2],[4,5],[4,7],[6,9],[7,7],[8,9],[9,9],[9,3]];
            row_num = 10;
            cols_num = 10;
            mine_num = 10;
            console.log(error);
            my_rows = 10;
            my_cols = 10;
            mine_positions = [[3,0], [4,2], [1,3], [9,3], [4,5], [4,7], [7,7], [6,9], [8,9], [9,9]];
            create_cells();
        });
}

function create_cells() {
    for (var i = 0; i < my_rows; i++) {
        for (var j = 0; j < my_cols; j++) {

            if (j % my_cols == 0) {
                var br = document.createElement("br");
                container.appendChild(br);
            }

            var state = [i, j];
            var currentBut = document.createElement("button");
            currentBut.xval = i;
            currentBut.yval = j;
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
                if (upper !== null) {
                    if (upper.classList.contains("bomb")) {
                        counter += 1
                    }
                }
                if (lower !== null) {
                    if (lower.classList.contains("bomb")) {
                        counter += 1
                    }
                }
                if (right !== null) {
                    if (right.classList.contains("bomb")) {
                        counter += 1
                    }
                }
                if (left !== null) {
                    if (left.classList.contains("bomb")) {
                        counter += 1
                    }
                }
                if (left_down_diagonal !== null) {
                    if (left_down_diagonal.classList.contains("bomb")) {
                        counter += 1
                    }
                }

                if (right_down_diagonal !== null) {
                    if (right_down_diagonal.classList.contains("bomb")) {
                        counter += 1
                    }
                }

                if (left_up_diagonal !== null) {
                    if (left_up_diagonal.classList.contains("bomb")) {
                        counter += 1
                    }
                }

                if (right_up_diagonal !== null) {
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
    if (upper !== null) {
        if (upper.disabled != true) {
            cell_click(upper);
        }
    }

    var lower = document.getElementById(String(x) + "," + String(y+1));
    if (lower !== null) {
        if (lower.disabled != true) {
            cell_click(lower); 
        }
    }

    var left = document.getElementById(String(x-1) + "," + String(y));
    if (left !== null) {
        if (left.disabled != true) {
            cell_click(left); 
        }
    }

    var right = document.getElementById(String(x+1) + "," + String(y));
    if (right !== null) {
        if (right.disabled != true) {
            cell_click(right); 
        }
    }

    var left_down_diagonal = document.getElementById(String(x-1) + "," + String(y+1));
    if (left_down_diagonal != null) {
        if (left_down_diagonal.disabled !== true) {
            cell_click(left_down_diagonal); 
        }
    }

    var right_down_diagonal = document.getElementById(String(x+1) + "," + String(y+1));
    if (right_down_diagonal !== null) {
        if (right_down_diagonal.disabled != true) {
            cell_click(right_down_diagonal); 
        }
    }

    var left_up_diagonal = document.getElementById(String(x-1) + "," + String(y-1));
    if (left_up_diagonal !== null) {
        if (left_up_diagonal.disabled != true) {
            cell_click(left_up_diagonal); 
        }
    }

    var right_up_diagonal = document.getElementById(String(x+1) + "," + String(y-1));
    if (right_up_diagonal !== null) {
        if (right_up_diagonal.disabled != true) {
            cell_click(right_up_diagonal); 
        }
    }
}

function cell_click(button) {
    if (button.classList.contains("flagged") === true) {
        return ;
    }

    if (button.className === "cell") {
        button.disabled = true;
        button.classList.add("revealed");
        find_adjacent_cells(button);
    }

    else if (button.className === "one_bomb") {
        button.textContent = "1";
        button.disabled = true;
        button.classList.add("revealed");
    }

    else if (button.className === "two_bombs") {
        button.textContent = "2";
        button.disabled = true;
        button.classList.add("revealed");
    }

    else if (button.className === "three_bombs") {
        button.textContent = "3";
        button.disabled = true;
        button.classList.add("revealed");
    }

    else if (button.className === "four_bombs") {
        button.textContent = "4";
        button.disabled = true;
        button.classList.add("revealed");
    }

    else if (button.className === "five_bombs") {
        button.textContent = "5";
        button.disabled = true;
        button.classList.add("revealed");
    }

    else if (button.className === "six_bombs") {
        button.textContent = "6";
        button.disabled = true;
        button.classList.add("revealed");
    }

    else if (button.className === "seven_bombs") {
        button.textContent = "7";
        button.disabled = true;
        button.classList.add("revealed");
    }

    else if (button.className === "eight_bombs") {
        button.textContent = "8";
        button.disabled = true;
        button.classList.add("revealed");
    }

    else if (button.className === "bomb") {

        defeat()
    }

    is_victory();
}

function cell_right_click(button) {

    if (button.classList.contains("flagged")) {
        button.classList.remove("flagged");
        button.removeChild(document.getElementById("flag"+ button.xval + button.yval));
    }

    else {
        var flag_img = document.createElement("img");
        flag_img.src = "flag.png";
        flag_img.id = "flag" + button.xval + button.yval; // creating a unique id for each flag img
        button.appendChild(flag_img);
        button.classList.add("flagged");
        }

    document.addEventListener('contextmenu', event => event.preventDefault());
    is_victory();
}

function defeat() {

    for (var i = 0; i < my_rows; i++) {
        for (var j = 0; j < my_cols; j++) {

            var id = String(i) + "," + String(j);
            var button = document.getElementById(id);
            button.disabled = true;
            button.classList.add("disable_hover");

            if (button.classList.contains("bomb") === true) {
                var bomb_img = document.createElement("img");
                bomb_img.src = "bomb.png";
                button.appendChild(bomb_img);
                button.classList.add("red_background");
                if (button.classList.contains("flagged") === false) {
                }
                else if (button.classList.contains("flagged") === true) {
                    button.removeChild(document.getElementById("flag"+ button.xval + button.yval));                }
                }
        }
    }
    var alert_div = document.getElementById("alert_div");
    var defeat_alert = document.createElement("div");
    defeat_alert.classList.add("alert");
    defeat_alert.classList.add("alert-danger");
    defeat_alert.textContent = "Game over. You can try again by pressing the 'Generate' button"
    alert_div.appendChild(defeat_alert);
}

function disable_board() {
    for (var i = 0; i < my_rows; i++) {
        for (var j = 0; j < my_cols; j++) {
            var id = String(i) + "," + String(j);
            var button = document.getElementById(id);
            button.disabled = true;
            button.classList.add("disable_hover");
        }
    }
}

function is_victory() {
    var bool;
    for (var i = 0; i < my_rows; i++) {
        for (var j = 0; j < my_cols; j++) {
            var id = String(i) + "," + String(j);
            var button = document.getElementById(id); // næ í hvert button
            if (button.classList.contains("bomb")) {
                //verður að vera flagged
                if (button.classList.contains("flagged") === false) {
                    bool = false;
                    return bool;
                }
            }

            else {
                if (button.disabled === false) {
                    bool = false;
                    return bool;
                }
            }
        }
    }
    disable_board()
    for (var x = 0; x < my_rows; x++) {
        for (var y = 0; y < my_cols; y++) {

            var id = String(x) + "," + String(y);
            var button = document.getElementById(id);

            if (button.classList.contains("flagged") === false) {
                button.classList.add("green_background");
            }
        }
    }

    var alert_div = document.getElementById("alert_div");
    var win_alert = document.createElement("div");
    win_alert.classList.add("alert");
    win_alert.classList.add("alert-success");
    win_alert.textContent = "Congratulations! You won the game. Press 'Generate' to play again"
    alert_div.appendChild(win_alert);
}