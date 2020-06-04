// Things to be fixed:
// all fixed

const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");    
const canvasNext = document.getElementById("next")
const ctxNext = canvasNext.getContext("2d")

document.addEventListener("keydown",controlKeys);

let newBoard = new Board(ctx,ctxNext);

const scoreElement = document.getElementById("score");
const levelElement = document.getElementById("level");

//document.getElementById("score") = 10;
//scoreElement.innerHTML = newBoard.removedRows;
let requstAnimationId;

//Necessary functions-----------------------------------------------------

let score = 0;
let lvl = 0;
let dropTime = 1000;

function getPoints(){
    // there are 9 levels to the game
    //1st level the dropping of the piece is slowest and 9th level fastest
    if(lvl>=0 && lvl<10){
        //getting the removedRows to update the score
        let lines = newBoard.removedRows;
        //console.log("lines:",lines,"lvl:",lvl,"scores[lvl]:",SCORES[lvl]);
        //console.log("score:",score)
        if(score >= SCORES[lvl] && score < SCORES[lvl+1]){

            score =+ lines;
            
            lvl = lvl + 1;
            //when dropTime > 100ms decrease it by 100ms every level
            if(dropTime > 100){
                dropTime = dropTime - 100;
            }
        }else{
            score =+ lines;
        }
        scoreElement.innerHTML = score;
        levelElement.innerHTML = lvl;
        
    }

}

let now;
let start = Date.now();

function animate(){
    
    // console.log(dropTime);
    if(( now - start) > dropTime){
        newBoard.movePieceDown();
        //getPoints();
        start = Date.now();
        //console.log("this is the auto move down")
    }

    if(newBoard.gameOver == false){
        now = Date.now();    
        
        requstAnimationId = requestAnimationFrame(animate);
        //console.log("this is the loop conditional")
    }else{
        alert("gameOver");
    }

    getPoints();
    
    //console.log("start:",start,"now:",now);
    //console.log("this is the difference",start - now);
    
 }

function controlKeys(event){
    if(event.keyCode == KEY.LEFT){
        newBoard.movePieceLeft();
        // console.log("left key pressed");
        dropStart = Date.now();
    }else if(event.keyCode == KEY.UP){
        newBoard.rotatePiece();
        dropStart = Date.now();
    }else if(event.keyCode == KEY.RIGHT){
        newBoard.movePieceRight();
        dropStart = Date.now();
    }else if(event.keyCode == KEY.DOWN){
        newBoard.movePieceDown();
        // getPoints();
    }else if(event.keyCode == KEY.ENTER){
        console.log("enter pressed")
        play();
    }else if(event.keyCode == KEY.P){
        console.log("paused");
        pause();
    }else if(event.keyCode == KEY.SPACE){
        newBoard.hardDropPiece();
    }
}


function play(){
    resetGame();

    //if old game running cancel it

    if(requstAnimationId){
         cancelAnimationFrame(requstAnimationId);
     }

    //start new animation
    
    animate();

}

function pause(){
    if(requstAnimationId != null){
        cancelAnimationFrame(requstAnimationId);
        requstAnimationId = null;
    }else{
        animate();
    }
    // console.log(requstAnimationId);
}

function resetGame(){
    newBoard = new Board(ctx,ctxNext);
    level = 0;
    score = 0;
}
