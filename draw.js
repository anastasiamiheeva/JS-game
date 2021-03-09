window.addEventListener('load', function() {
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
     w: 40, 
     h: 40, 
     color: "#BA55D3"
   },
   {
     x: 260,
     y: 100,
     speedY: 2,
     w: 40,
     h: 40,
     color: "#0048BA"
   },
   {
     x: 380,
     y: 100,
     speedY: 3,
     w: 40,
     h: 40,
     color: "#0FC0FC"
   },
   {
     x: 550,
     y: 100,
     speedY: 1,
     w: 40,
     h: 40,
     color: "#40E0D0"
   }
 ];

 //объект игрока
  let player = { 
    x1: 10, 
    y1: 160, 
    x2: 40, 
    y2: 180,
    x3: 10, 
    y3: 200, 
    speedX: 2,
    isMoving: false,
    color: "#00FF00"
  }

  let movePlayer = () => {
    player.isMoving = true;
  };

  let stopPlayer = () => {
    player.isMoving = false;
  }

  //получаем холст и контекст
  let canvas = document.getElementById("mycanvas");
  let ctx = canvas.getContext("2d");

  //addEventListener на объект игрока
  canvas.addEventListener("mousedown", movePlayer);
  canvas.addEventListener("mouseup", stopPlayer);
  canvas.addEventListener("touchstart", movePlayer);
  canvas.addEventListener("touchend", stopPlayer);

  //логика объектов
  let update = () => {
    //игрок
    if(player.isMoving) {
      player.x1 += player.speedX
      player.x2 += player.speedX
      player.x3 += player.speedX
    }

    if(player.x2 > GAME_WIDTH) {
      finishGame = true;
    }

    //враги
    let i = 0;
    let n = enemies.length;

    enemies.forEach(element => { 
      if(chekCollision(player, element)) {
        //остановка игры
        gameLive = false;
        gameOver = true;
      }
      element.y += element.speedY;
      //соприкосновение объектов
      if(element.y <= 10) {
        element.y = 10;
        element.speedY = element.speedY * -1; //element.speedY *= -1
      } 
      else if (element.y >= GAME_HEIGHT - 50) {
        element.y = GAME_HEIGHT - 50;
        element.speedY = element.speedY * -1;
      }
    })
  };
  
  //показать объекты на экране
  let draw = () => {
    //чистим холст
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    //объект игрока
    ctx.fillStyle = player.color;
    ctx.beginPath();
    ctx.moveTo(player.x1,player.y1);
    ctx.lineTo(player.x2,player.y2);
    ctx.lineTo(player.x3,player.y3);
    ctx.fill();

    //объекты врагов
    enemies.forEach(element => {
      ctx.fillStyle = element.color
      ctx.fillRect(element.x, element.y, element.w, element.h)
    });
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

  //инициализируем несколько раз в секунду
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
      text('white', '75px Exo', 'FINISH', 200, 200)
    }
  };

  let restart = () => {
    window.location = ""
  }

  let chekCollision = (point, rect) => {
    let closeOnWidth = Math.abs(point.x1 - rect.x) <= Math.abs((point.x2 - point.x1), rect.w);
    let closeOnHeight = Math.abs((point.y1-rect.y)) <= Math.abs((point.y3-point.y1), rect.h);
    return closeOnHeight && closeOnWidth;
  } 
  
  step();
})