window.addEventListener('load', function(){
  //константы
  let GAME_WIDTH = 640;
  let GAME_HEIGHT = 360;

  let gameLive = true;

  //враги
  let enemies = [
    {
      x: 100, 
      y: 100, 
      speedY: 1, 
      w: 40, 
      h: 40 
    },
    {
      x: 260,
      y: 100,
      speedY: 2,
      w: 40,
      h: 40
    },
    {
      x: 380,
      y: 100,
      speedY: 1,
      w: 40,
      h: 40
    },
    {
      x: 450,
      y: 100,
      speedY: 2,
      w: 40,
      h: 40
    }
  ];
//обьет игрока
  let player = {
    x:10,
    y:160,
    speedX:2,
    w:40,
    h:40,
    isMoving:false
  };

  //finish
  let goal = {
    x:580,
    y:160,
    w:50,
    h:36
  }
  let sprites = {};

  //movePlayer
  let movePlayer = function(){
    player.isMoving = true;
  };

  //stopPlayer
  let stopPlayer = function(){
    player.isMoving = false;
  };
    //получить контекст
    let canvas = document.getElementById("mycanvas");
    let ctx = canvas.getContext("2d");


    //addEventListener на обьект игрока
    canvas.addEventListener("mousedown", movePlayer);
    canvas.addEventListener("mouseup", stopPlayer);
    canvas.addEventListener('touchstart', movePlayer);
    canvas.addEventListener('touchend', stopPlayer);

    let load = function() {
      sprites.player = new Image();
      sprites.player.src = 'img/hero.png';

      sprites.background = new Image();
      sprites.background.src = 'img/floor.png';

      sprites.enemy = new Image();
      sprites.enemy.src = 'img/enemy.png';

      sprites.goal = new Image();
      sprites.goal.src = 'img/chest.png';
    };


    //логика обьектов
  let update = function() {

    //проверка на финиш
    if(chekCollision(player, goal)){
      //stop game
      gameLive = false;

      alert ('You WIN');
    }
      //игрок
    if(player.isMoving) {
      player.x = player.x + player.speedX;
    }

    //враги
    enemies.forEach(function(element, index){

    if(chekCollision(player, element)){
      //stop
      gameLive = false;

      alert("Game OVER");
    window.location = "";
    }
    element.y += element.speedY;

  //соприкосновения обьектов
    if(element.y <= 10) {
      element.y = 10;
      element.speedY *= -1;
    } else if(element.y >= GAME_HEIGHT - 50) {
        element.y = GAME_HEIGHT - 50;
        element.speedY *= -1;
      }
    });
  };

  //показать обьекты на экране.
  let draw = function(){
    //чистим холст
    ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);

  //background
    ctx.drawImage(sprites.background, 0, 0);

  //обькт игрока
    ctx.drawImage(sprites.player, player.x, player.y);

  //обьекты врагов
    enemies.forEach(function(element){
      ctx.drawImage(sprites.enemy, element.x, element.y);
    });

  //обьект финиш
    ctx.drawImage (sprites.goal, goal.x, goal.y);
  };
  //инициализируем несколько раз в секунду)
  let step = function() {

    update();
    draw();
    if(gameLive){
      window.requestAnimationFrame(step);
    }
  };
  let chekCollision = function(rect1, rect2){
    let closeOnWidth= Math.abs(rect1.x - rect2.x) <= Math.abs(rect1.w, rect2.w);
    let closeOnHeight = Math.abs(rect1.y - rect2.y) <= Math.abs(rect1.h, rect2.h);
    return closeOnHeight && closeOnWidth;
  }
  load();
  step();
});