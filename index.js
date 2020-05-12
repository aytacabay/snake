// README !!!
// 0 - setInterval her calistiginda snake icerisine unshift ile bir kuyruk elemani daha eklenir.
// 1 - Yilanin pozisyonunu degistirmek icin tusa bastigimizda direction belirlenir ve her setInterval olayinda o directiona gider ve arttirma veya azalatma islemini yapar.
// 2 - setInterval her 100s bir guncellendigin snake in direction degerine gore x veya y degerleri 50 daha arttirilir.
// 3 - setInterval her 100 milisaniye calistigi icin ve eat kosulu na gelindiginde yilanin yemi yemedigini anlayinca pop() yaparak snake degiskenin son elemanini siler ve sonra tekrar setInterval calistiginda unshift() ile dizi icerisine ilk siraya yeni pozisyon yazilir. Sonra tekrar yemedigini anlayinca pop() tekrar calisir.
// 4 - Snake eger yemi yerse yani snake in ve eat in posizyonlari esit ise kuyruk pop() edilmez de snake icerisinde 2 adet kuyruk olur. Yani bir snake degiskenine bir posizyon degeri daha atilir. Sonra ornegin yilan saga hareket ettiginde bir w:50 h:50 degirinde bir kutu cizilir ve sonra snake degiskeninin length i kadar dongu ile birlikte snake kutulari yazidirlir. 


// Document Variables
const score = document.getElementsByClassName('score')[0];
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// Loading Audio Files
let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let bottom = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
bottom.src = "audio/down.mp3";

// Snake Score
let snakePie = 0;
let box = 50;

// Canvas Setting
let canvasWidth = canvas.clientWidth
let canvasHeight = canvas.clientHeight

// Snake Position Variables
let snake = [{ x: 50, y: 50 }];

// EatSnake Variables
let eatSnake = { x: 0, y: 0 }

// EatSnake Position Array
// 14 == 700px * 50px 
// Default Values
eatSnake.x = 300;
eatSnake.y = 300;

let directionLet;
document.addEventListener('keydown', directoryFunc);
function directoryFunc(event) {
    switch (event.keyCode) {
        case 37:
            directionLet = 'left'
            break;
        case 38:
            directionLet = 'top'
            break;
        case 39:
            directionLet = 'right'
            break;
        case 40:
            directionLet = 'bottom'
            break;


        default:
            break;
    }
}

setInterval(() => {
    draw()
}, 100);

function draw() {
    // Clear canvas
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    // Direction Values
    switch (directionLet) {
        case 'left':
            snake[0].x += -50
            left.play();
            break;
        case 'top':
            snake[0].y += -50
            up.play();
            break;
        case 'right':
            snake[0].x += 50
            right.play();
            break;
        case 'bottom':
            snake[0].y += 50
            bottom.play();
            break;


        default:
            break;
    }

    // Snake Direction Frame Rules
    if (snake[0].x < 0) {
        snake[0].x = canvasWidth - 50
    }
    if (snake[0].x > canvasWidth - 50) {
        snake[0].x = 50
    }
    if (snake[0].y < 0) {
        snake[0].y = canvasHeight - 50
    }
    if (snake[0].y > canvasHeight - 50) {
        snake[0].y = 50
    }

    // Snake Added Tail !!!
    snake.unshift({
        x: snake[0].x,
        y: snake[0].y,
    });

    // Snake eatSnake eating Rules
    if (snake[0].x == eatSnake.x && snake[0].y == eatSnake.y) {
        eat.play()
        eatSnake.x = Math.floor(Math.random() * 14) * 50;
        eatSnake.y = Math.floor(Math.random() * 14) * 50;
        score.innerHTML = snakePie++;
    } else {
        snake.pop()
    }

    // Snake Drawing
    snake.forEach(item => {
        context.fillStyle = 'orange';
        context.fillRect(item.x, item.y, 50, 50);
    });

    // if Snake eats itself
    for (let i = 3; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            dead.play()
            snake = [{ x: 50, y: 50 }]
        }
    }

    // EatSnake Drawing
    context.beginPath();
    context.fillStyle = '#6b5b95';
    context.fillRect(eatSnake.x, eatSnake.y, 50, 50);
    context.closePath();

    // Score Table
    score.innerHTML = snakePie
}