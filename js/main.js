var can1;
var can2;

var ctx1;
var ctx2;

var canWidth;
var canHeight;

var lastTime;
var deltaTime;

var bgPic = new Image();

var ane;
var fruit;
var mom;
var baby;

var mx;
var my;		//鼠标变量

var babyTail = [];
var babyEye = [];
var babyFade = [];

var momTail = [];
var momEye = [];
var momSwimOra = [];
var momSwimBlue = [];

var data;

var wave;
var halo;

var dust;
var dustPic =[];
document.body.onload = game;
function game()
{
	init();
	lastTime = Date.now();
	deltaTime = 0;
	gameloop();
}

function init()
{
	//获得canvas context
	can1 = document.getElementById("canvas1");	//fishes,dust,UI,circle
	ctx1 =can1.getContext('2d');
	can2 = document.getElementById("canvas2");	//background,ane,fruits
	ctx2 =can2.getContext('2d');
	
	can1.addEventListener('mousemove',onMouseMove,false);

	bgPic.src = "./src/background.jpg";

	canWidth = can1.width;
	canHeight = can1.height; 
	
	ane = new aneObj();
	ane.init();
	
	fruit = new fruitObj();
	fruit.init();
	
	mom = new momObj();
	mom.init();
	
	baby = new babyObj();
	baby.init();
	
	mx = canWidth * 0.5;
	my = canHeight * 0.5;
	
	//小鱼身体动态变化
	for(var i = 0; i < 8; i++){
		babyTail[i] = new Image();
		babyTail[i].src = "./src/babyTail"+i+".png";
	}
	for(var i = 0; i < 2; i++){
		babyEye[i] = new Image();
		babyEye[i].src = "./src/babyEye"+i+".png";
	}
	for(var i = 0; i < 20; i++){
		babyFade[i] = new Image();
		babyFade[i].src = "./src/babyFade"+i+".png";
	}
	
	//大鱼身体动态变化
	for(var i = 0; i < 8; i++){
		momTail[i] = new Image();
		momTail[i].src = "./src/bigTail"+i+".png";
	}
	for(var i = 0; i < 2; i++){
		momEye[i] = new Image();
		momEye[i].src = "./src/bigEye"+i+".png";
	}
	
	data = new dataObj();
	
	for(var i = 0; i < 8; i++){
		momSwimOra[i] = new Image();
		momSwimBlue[i] = new Image();
		momSwimOra[i].src = "./src/bigSwim"+i+".png";
		momSwimBlue[i].src = "./src/bigSwimBlue"+i+".png";
	}
	
	
	ctx1.fillStyle = "white";
	ctx1.font = "30px Verdana";
	ctx1.textAlign = "center";
	
	wave = new waveObj();
	wave.init();
	
	halo = new haloObj();
	halo.init();
	
	for(var i = 0; i < 7; i++)
	{
		dustPic[i] = new Image();
		dustPic[i].src = "./src/dust"+i+".png"; 
	}
	dust = new dustObj();
	dust.init();
}

function gameloop()
{
	window.requestAnimFrame(gameloop);	//setIntrevl,setTimeout,frame per second
	var now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;

	if(deltaTime > 40 ) deltaTime = 40;//防止因浏览器帧间隔太大导致食物变大

	drawBackground();
	ane.draw();
	fruitMonitor();
	fruit.draw();
	
	ctx1.clearRect(0,0,canWidth,canHeight);
	mom.draw();
	baby.draw();
	momFruitsCollision();
	momBodyCollion();
	
	data.draw();
	wave.draw();
	halo.draw();
	dust.draw();
}
function onMouseMove(e)
{
	if(!data.gameOver)
	{
		if(e.offsetX || e.layerX){
			mx = e.offsetX == undefined ? e.layerX : e.offsetX;
			my = e.offsetY == undefined ? e.layerY : e.offsetY;
		}
	}
}

