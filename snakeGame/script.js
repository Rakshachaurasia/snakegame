let canvas = document.querySelector('canvas');
let pen = canvas.getContext('2d');

let gameOver = false; // variable to stop the game 
const boardW = 1500;  // board width
const boardH = 700;  // board height
let cellsize = 50;  // size of snake cell
let snakecell = [[0,0]]; 
let count = 0;
// direction variable
let direction = 'right';
//  creating food
let foodCell = generateFood();

document.addEventListener('keydown',(e)=>{
    if(e.key==='ArrowUp'){
        direction='up';
    }
    else if(e.key==='ArrowDown'){
        direction='down';
    }
    else if(e.key==='ArrowRight'){
        direction='right';
    }
    else{
        direction='left';
    }
})

//  draw snake 
function draw(){
    if(gameOver){
        pen.fillStyle='red';
        pen.font='100px san-sarif';
        pen.fillText('!!GAME OVER!!',600,320);
        clearInterval(id);
        return;
    }
    // console.log(newX,newY);
    pen.clearRect(0,0,1500,700);
    for( let cell of snakecell){
        pen.fillStyle='red';
        pen.fillRect(cell[0],cell[1],cellsize,cellsize);
    }
    pen.fillStyle='green';
    pen.fillRect(foodCell[0],foodCell[1],cellsize,cellsize);

    pen.fillText(`Score : ${count}`,70,50);
    pen.font='40px san-sarif';
}

// draw() : function to draw snake ;
function update(){
    let headX = snakecell[snakecell.length-1][0];    
    let headY = snakecell[snakecell.length-1][1];

    let newX;     
    let newY; 

    if(direction==='right'){
        newX = headX+cellsize;
        newY = headY;
        if(newX===boardW || checkMate(newX,newY)){
            gameOver=true;
        }
    }
    else if(direction==='left'){
        newX = headX-cellsize;
        newY = headY;
        if(newX<0 || checkMate(newX,newY)){
            gameOver=true;
        }
    }
    else if(direction==='up'){
        newX = headX;
        newY = headY-cellsize;
        if(newY<0 || checkMate(newX,newY)){
            gameOver=true;
        }
    }
    else {
        newX = headX;
        newY = headY+cellsize;
        if(newY===boardH || checkMate(newX,newY)){
            gameOver=true;
        }
    }
    snakecell.push([newX,newY]);
    if(newX===foodCell[0] && newY===foodCell[1]){
        foodCell = generateFood();
        count++;
    }else{
        snakecell.shift();
    }
}

let id = setInterval(()=>{
    draw();
    update();
},150)

function generateFood(){
    return([
        Math.round(Math.random()*(boardW-cellsize)/50)*50, //X-axis
        Math.round(Math.random()*(boardH-cellsize)/50)*50  // Y-axis
    ])
}

function checkMate(newx,newy){
    for(item of snakecell){
        if(item[0]===newx && item[1]===newy){
            clearInterval(id);
            pen.fillText('GAME OVER',700,350);
            return true;
        }
    }
    return false;
}