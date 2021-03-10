window.addEventListener('load', function(){
  //константы
  let GAME_WIDTH = 640;
  let GAME_HEIGHT = 360;

  let gameLive = true;
  let gameOver = false;
  let finishGame = false;

  //враги
  let enemies = [
    {
      x: 100, 
      y: 100, 
      speedY: 1, 
      w: 30, 
      h: 30 
    },
    {
      x: 260,
      y: 100,
      speedY: 2,
      w: 30,
      h: 30
    },
    {
      x: 380,
      y: 100,
      speedY: 1,
      w: 30,
      h: 30
    },
    {
      x: 450,
      y: 100,
      speedY: 2,
      w: 30,
      h: 30
    }
  ];
//обьет игрока
  let player = {
    x: 10,
    y: 160,
    speedX: 4,
    w: 45,
    h: 45,
    isMoving: false
  };

  //finish
  let goal = {
    x: 580,
    y: 160,
    w: 50,
    h: 36
  }
  let sprites = {};

  //movePlayer
  let movePlayer = () => {
    player.isMoving = true;
  };

  //stopPlayer
  let stopPlayer = () => {
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

    let load = () => {
      sprites.player = new Image();
      sprites.player.src = 'img/colibri.png';

      sprites.background = new Image();
      sprites.background.src = 'img/jungle.png';

      sprites.enemy = new Image();
      sprites.enemy.src = 'img/bat.png';

      sprites.goal = new Image();
      sprites.goal.src = 'img/flower.png';
    };


    //логика обьектов
  let update = () => {

    //проверка на финиш
    if(chekCollision(player, goal)){
      //stop game
      gameLive = false;
      finishGame = true;
    }
      //игрок
    if(player.isMoving) {
      player.x = player.x + player.speedX;
    }

    //враги
    enemies.forEach(element => {

    if(chekCollision(player, element)){
      //stop
      gameLive = false;
      gameOver = true;
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
  let draw = () => {
    //чистим холст
    ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);

  //background
    ctx.drawImage(sprites.background, 0, 0);

  //обькт игрока
    ctx.drawImage(sprites.player, player.x, player.y);

  //обьекты врагов
    enemies.forEach(element => {
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

    if(gameOver) {
      rect(0, 0, canvas.width, canvas.height, 'black');
      text('white', '75px Exo', 'GAME OVER', 100, 200)
      setTimeout(restart, 2000)
    }

    if(finishGame) {
      rect(0, 0, canvas.width, canvas.height, 'green');
      text('white', '75px Exo', 'YOU WIN', 150, 200)
    }

  };

  let text = (color, fnt, txt, x, y) => {
    ctx.fillStyle = color;
    ctx.font = fnt;
    ctx.fillText(txt, x, y)
  }

  let rect = (x, y, w, h, c) => {
    ctx.fillStyle = c;
    ctx.fillRect(x, y, w, h);
  }

  let restart = () => {
    window.location = ""
  }

  let chekCollision = (rect1, rect2) => {
    let closeOnWidth= Math.abs(rect1.x - rect2.x) <= Math.abs(rect1.w, rect2.w);
    let closeOnHeight = Math.abs(rect1.y - rect2.y) <= Math.abs(rect1.h, rect2.h);
    return closeOnHeight && closeOnWidth;
  }

  load();
  step();
});