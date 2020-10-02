
/*   This is the base file for the Sokoban assignment - include this one in your HTML page, before you add the main script file*/

/*   Enum of CSS Classes for the static elements   */
var Tiles = {
    Wall: "tile-wall",
    Space: "tile-space",
    Goal: "tile-goal"
};

/*   Enum of CSS Classes for the moving elements   */
var Entities = {
    Character: "entity-player",
    Block: "entity-block",
    BlockDone: "entity-block-goal"
};

/*  Legend
    W = Wall
    B = Movable block
    P = Player starting position
    G = Goal area for the blocks
*/
var tileMap01 = {
    width: 19,
    height: 16,
    mapGrid: [
        [[' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
        [[' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
        [[' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
        [[' '], [' '], [' '], [' '], ['W'], ['W'], ['W'], ['W'], ['W'], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
        [[' '], [' '], [' '], [' '], ['W'], [' '], [' '], [' '], ['W'], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
        [[' '], [' '], [' '], [' '], ['W'], ['B'], [' '], [' '], ['W'], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
        [[' '], [' '], ['W'], ['W'], ['W'], [' '], [' '], ['B'], ['W'], ['W'], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
        [[' '], [' '], ['W'], [' '], [' '], ['B'], [' '], ['B'], [' '], ['W'], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
        [['W'], ['W'], ['W'], [' '], ['W'], [' '], ['W'], ['W'], [' '], ['W'], [' '], [' '], [' '], ['W'], ['W'], ['W'], ['W'], ['W'], ['W']],
        [['W'], [' '], [' '], [' '], ['W'], [' '], ['W'], ['W'], [' '], ['W'], ['W'], ['W'], ['W'], ['W'], [' '], [' '], ['G'], ['G'], ['W']],
        [['W'], [' '], ['B'], [' '], [' '], ['B'], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], ['G'], ['G'], ['W']],
        [['W'], ['W'], ['W'], ['W'], ['W'], [' '], ['W'], ['W'], ['W'], [' '], ['W'], ['P'], ['W'], ['W'], [' '], [' '], ['G'], ['G'], ['W']],
        [[' '], [' '], [' '], [' '], ['W'], [' '], [' '], [' '], [' '], [' '], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W']],
        [[' '], [' '], [' '], [' '], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
        [[' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
        [[' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']]
    ]
};
//--------------------------------------------------------
var goals = 0;
var map = tileMap01.mapGrid;
setMap();
function setMap(){
    for (var i = 0; i <tileMap01.height; i++){
        for (var j = 0; j < tileMap01.width; j++){
            switch (map[i][j].toString()){
                case "W": setClass("wall");
                            break;
                case "B": setClass("movableBlock");
                            break;
                case "P": setClass("player");
                            break;
                case "G": setClass("goalArea");
                            goals++;
                            break;
                case " ": setClass("emptyArea");
                            break;
                case "BG": setClass("movableBlock");
                            break;
                case "PG": setClass("player");
            }
        }
    }
}
function updateMap(){
    document.getElementById("board").innerHTML = "";
    for (var i = 0; i <tileMap01.height; i++){
        for (var j = 0; j < tileMap01.width; j++){
            switch (map[i][j].toString()){
                case "W": setClass("wall");
                    break;
                case "B": setClass("movableBlock");
                    break;
                case "P": setClass("player");
                    break;
                case "G": setClass("goalArea");
                    break;
                case " ": setClass("emptyArea");
                    break;
                case "BG": setClass("movableBlock");
                    break;
                case "PG": setClass("player");
            }
        }
    }
}

function setClass(className){
    var node, attribute;
    node = document.createElement("span");
    attribute = document.createAttribute("class");
    attribute.value = className;
    node.setAttributeNode(attribute);
    document.getElementById("board").appendChild(node);
}

var playerCurrentRow = 11;
var playerCurrentCol = 11;
var playerNextRow, playerNextCol;
// var player = document.getElementsByClassName("player").item(0);
// player.addEventListener('keyup', moveUp);
// player.addEventListener('keydown', moveDown);
// player.addEventListener('keyleft', moveToLeft);
// player.addEventListener('keyright', moveToRight);
document.getElementById("up").addEventListener('click', moveUp);
document.getElementById("down").addEventListener('click', moveDown);
document.getElementById("left").addEventListener('click', moveToLeft);
document.getElementById("right").addEventListener('click', moveToRight);

function playerMoveOutGoal(){
    //moving out goal area
    if (map[playerCurrentRow][playerCurrentCol].toString() === "PG")
        map[playerCurrentRow][playerCurrentCol] = new Array('G');
    else
        map[playerCurrentRow][playerCurrentCol] = new Array(' ');
}

function pushBlock(boxNextRow, boxNextCol){
    //check if the box is pushable
    if(map[boxNextRow][boxNextCol].toString() === " " || map[boxNextRow][boxNextCol].toString() === "G"){
        var nextBox = map[boxNextRow][boxNextCol].toString();
        if (map[boxNextRow][boxNextCol].toString() === "G"){
            map[boxNextRow][boxNextCol] = new Array("BG");
            goals--;
            if (goals === 0){
                document.getElementsByClassName("hidden").item(0).style.display = 'block';
            }
        }else{
            map[boxNextRow][boxNextCol] = new Array('B');
        }

        //push the box and move the player
        if (nextBox === " " && map[playerNextRow][playerNextCol].toString() === "BG"){
            map[playerNextRow][playerNextCol] = new Array("PG");
            map[playerCurrentRow][playerCurrentCol] = new Array('G');
            goals ++;
        } else if (nextBox === " " && map[playerNextRow][playerNextCol].toString() !== "BG" && map[playerCurrentRow][playerCurrentCol].toString() === "PG"){
            map[playerNextRow][playerNextCol] = new Array("P");
            map[playerCurrentRow][playerCurrentCol] = new Array('G');
            //map[boxNextRow][boxNextCol] = new Array('B');
        } else if (nextBox === "G" && map[playerNextRow][playerNextCol].toString() === "BG") {
            map[playerNextRow][playerNextCol] = new Array("PG");
            map[boxNextRow][boxNextCol] = new Array("BG");
            if (map[playerCurrentRow][playerCurrentCol].toString() === "P")
                map[playerCurrentRow][playerCurrentCol] = new Array(' ');
            else if(map[playerCurrentRow][playerCurrentCol].toString() === "PG")
                map[playerCurrentRow][playerCurrentCol] = new Array('G');
        } else{
            map[playerNextRow][playerNextCol] = new Array('P');
            map[playerCurrentRow][playerCurrentCol] = new Array(' ');
        }

        playerCurrentRow = playerNextRow;
        playerCurrentCol = playerNextCol;
    }
}

function moveDown(){
    playerNextRow = playerCurrentRow +1;
    playerNextCol = playerCurrentCol;

    //if the player is moving inside the goal area himself
    if (map[playerNextRow][playerNextCol].toString() === "G" || map[playerNextRow][playerNextCol].toString() === "BG"){
        //moving into the  goal area
        map[playerNextRow][playerNextCol] = new Array("PG");
        playerMoveOutGoal();
        //update player position
        playerCurrentRow = playerNextRow;
        playerCurrentCol = playerNextCol;
        updateMap();
    }

    //only move the player
    if (map[playerNextRow][playerNextCol].toString() === " "){//nothing
        map[playerNextRow][playerNextCol] = new Array('P');
        playerMoveOutGoal();
        //move the player
        playerCurrentRow = playerNextRow;
        playerCurrentCol = playerNextCol;
        updateMap();

    //move the player and block
    }else if(map[playerNextRow][playerNextCol].toString() === "B" || map[playerNextRow][playerNextCol].toString() === "BG"){//block
        var boxNextRow, boxNextCol;
        boxNextRow = playerNextRow +1;
        boxNextCol = playerNextCol;
        pushBlock(boxNextRow, boxNextCol);
        updateMap();
    }
}

function moveUp(){
    console.log(11);
    playerNextRow = playerCurrentRow - 1;
    playerNextCol = playerCurrentCol;

    if (map[playerNextRow][playerNextCol].toString() === "G"){
        map[playerNextRow][playerNextCol] = new Array("PG");
        playerMoveOutGoal();
        playerCurrentRow = playerNextRow;
        playerCurrentCol = playerNextCol;
        updateMap();
    }

    if (map[playerNextRow][playerNextCol].toString() === " "){//nothing
        map[playerNextRow][playerNextCol] = new Array('P');
        if (map[playerCurrentRow][playerCurrentCol].toString() === "PG")
            map[playerCurrentRow][playerCurrentCol] = new Array('G');
        else
            map[playerCurrentRow][playerCurrentCol] = new Array(' ');
        //move the player
        playerCurrentRow = playerNextRow;
        playerCurrentCol = playerNextCol;
        updateMap();

    }else if(map[playerNextRow][playerNextCol].toString() === "B" || map[playerNextRow][playerNextCol].toString() === "BG"){//block

        var boxNextRow, boxNextCol;
        boxNextRow = playerNextRow -1;
        boxNextCol = playerNextCol;

        pushBlock(boxNextRow,boxNextCol);
        updateMap();
    }
}

function moveToLeft(){
    playerNextRow = playerCurrentRow ;
    playerNextCol = playerCurrentCol - 1;

    if (map[playerNextRow][playerNextCol].toString() === "G"){
        map[playerNextRow][playerNextCol] = new Array("PG");
        playerMoveOutGoal();
        playerCurrentRow = playerNextRow;
        playerCurrentCol = playerNextCol;
        updateMap();
    }

    if (map[playerNextRow][playerNextCol].toString() === " "){//nothing
        map[playerNextRow][playerNextCol] = new Array('P');
        if (map[playerCurrentRow][playerCurrentCol].toString() === "PG")
            map[playerCurrentRow][playerCurrentCol] = new Array('G');
        else
            map[playerCurrentRow][playerCurrentCol] = new Array(' ');
        //move the player
        playerCurrentRow = playerNextRow;
        playerCurrentCol = playerNextCol;

        updateMap();

    }else if(map[playerNextRow][playerNextCol].toString() === "B" || map[playerNextRow][playerNextCol].toString() === "BG"){//block

        var boxNextRow, boxNextCol;
        boxNextRow = playerNextRow;
        boxNextCol = playerNextCol - 1;
        //check if the box is pushable
        pushBlock(boxNextRow,boxNextCol);
        updateMap();
    }
}

function moveToRight(){
    playerNextRow = playerCurrentRow;
    playerNextCol = playerCurrentCol + 1;

    if (map[playerNextRow][playerNextCol].toString() === "G"){
        map[playerNextRow][playerNextCol] = new Array("PG");
        playerMoveOutGoal();
        playerCurrentRow = playerNextRow;
        playerCurrentCol = playerNextCol;
        updateMap();
    }
    if (map[playerNextRow][playerNextCol].toString() === " "){//nothing

        map[playerNextRow][playerNextCol] = new Array('P');
        if (map[playerCurrentRow][playerCurrentCol].toString() === "PG")
            map[playerCurrentRow][playerCurrentCol] = new Array('G');
        else
            map[playerCurrentRow][playerCurrentCol] = new Array(' ');
        //move the player
        playerCurrentRow = playerNextRow;
        playerCurrentCol = playerNextCol;

        updateMap();

    }else if(map[playerNextRow][playerNextCol].toString() === "B" || map[playerNextRow][playerNextCol].toString() === "BG"){//block

        var boxNextRow, boxNextCol;
        boxNextRow = playerNextRow;
        boxNextCol = playerNextCol + 1;
        //check if the box is pushable
        pushBlock(boxNextRow,boxNextCol);
        updateMap();
    }
}

var restart = document.getElementById("btn-restart");
restart.addEventListener('click', setMap);
