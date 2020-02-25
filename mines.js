"use strict";

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
            var my_rows = board.rows;
            var my_cols =board.cols;
            var container = document.getElementById("mineField");
            var mine_positions = response.data.board.minePositions;
            console.log(mine_positions);

            for (var i = 0; i < my_rows; i++) {
                for (var j = 0; j < my_cols; j++) {

                    if (j % my_cols == 0) {
                        var br = document.createElement("br");
                        container.appendChild(br); 
                    }
                    var currentBut = document.createElement("button");
                    var state = [i, j];
                    console.log(mine_positions);
                    if (mine_positions.includes(state)) {
                        currentBut.className = "bomb";
                        console.log("test")
                    }
                    currentBut.setAttribute("id", state);
                    container.appendChild(currentBut);
                }
            }
            
        })
        .catch(function (error) {
            //When unsuccessful, print the error.
            console.log(error);
        });
}