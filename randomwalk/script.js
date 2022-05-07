var table = document.getElementById("tb");
var WIDTH=7;
var HEIGHT=9;
var board=new Array(HEIGHT);

function createGrid(){
for(var k=0;k<board.length;k+=1){
	board[k]=new Array(WIDTH);
}
for(var i=0;i<HEIGHT;i+=1){
	var rows = document.createElement('tr');
	for(var j=1;j<=WIDTH;j+=1){
		var cols = document.createElement('td');
		cols.id = i*HEIGHT+j;
		rows.appendChild(cols);
	}
	table.appendChild(rows);
}
}


function randomWalk(x,y){
	if(typeof board[x][y]=="undefined"){
	var id=HEIGHT*y+x;
	board[x][y]=1;
	document.getElementById(id).style.backgroundColor="red";
	var randomNum = Math.round(Math.random()*3);
	//console.log(board);
	switch(randomNum){
		case 0://UP
		y-=1;
		break;
		case 1://DOWN
		y+=1;
		break;
		case 2://LEFT
		x-=1;
		break;
		case 3://RIGHT
		x+=1;
		break;
	}
	}
	randomWalk(x,y);
}

function initialize(){
	createGrid();
	var cells = document.querySelectorAll('td');
	var x,y;
	x = Math.sqrt(cells.length)/2;
	y = Math.sqrt(cells.length)/2;
	var x1 = Math.round(x),y1=Math.round(y);
	randomWalk(x1,y1);
}


initialize();
