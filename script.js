
const dino = document.querySelector(".dino");
const background = document.querySelector('.background'); 

let position = 0;
let isJumping = false;
let isGameOver = false;
let counterJump = 0;
let fase = 0;

//leitura da key space para pulo do dino
let keyPressed = document
  .querySelector("body")
  .addEventListener("keyup", (event) => {
    if (event.keyCode === 32) {
      if (!isJumping) {
          dinoJump();
      }
    }
   });

// lógica para o pulo do dino
function dinoJump() {
    isJumping = true;
  let upInterval = setInterval(() => {
    if (position >=200) { // se passar de 150px, limpa o up
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) { // abaixo de 0px, limpa o down
          clearInterval(downInterval);
          isJumping = false;

        } else {
          position -= 30;
          dino.style.bottom = position + "px";
        }
      }, 30);
    } else { // nenhuma das condições acima, sobe
      position += 30;
      dino.style.bottom = position + "px";
    }
  }, 20);
  countJump();
}

// lógica para a criação de cactus de forma aleatória
function createCactus() {
  let cactusPosition = 1000;
  const cactus = document.createElement('div')//cria a div cactus
  cactus.classList.add('cactus');

  background.appendChild(cactus);//adiciona a div cactus dentro do background
  cactus.style.left = cactusPosition + 'px';

  if (isGameOver) return;

  // movimentação cactus
  let leftPositionTimer = setInterval(() => {
      if (cactusPosition < -60) {      // se o cactus sair da tela zera posição e remove a div
        clearInterval(leftPositionTimer);
          background.removeChild(cactus);
          
        } else if (cactusPosition > 0 && cactusPosition < 50 && position < 50) { // se o cactus está entre 0 e 60 e o dino tbm está a menos de 60, colidiram!
          clearInterval(leftPositionTimer); // Game over
          document.body.innerHTML = '<h1 class="game-over">Você perdeu!</h1>';
          isGameOver = true;

        } else {
          cactusPosition -= 10; // em nenhum dos casos acima, cactus continua se movendo para esquerda
          cactus.style.left = cactusPosition + 'px';
        }
      }, 50);
    
    
    fases();
    setTimeout(createCactus, fase);
  }



createCactus();
document.addEventListener('keyup', keyPressed); 

function countJump() {
  let point = document.querySelector(".points");
  if (isJumping == true) {
    counterJump++;
    point.innerHTML = counterJump; //conta a pontuação com base nos pulos do dino
  } return
}

// 4 fases definidas para o jogo do dino, aumentando a velocidade de aparecimento dos cactus
function fases()  {  
  if( counterJump < 5){
    fase = 6000;
  } else if ( counterJump > 5 && counterJump < 8) {
    fase = 4000;    
    } else if (counterJump > 8 && counterJump < 14) {
    fase = 2000;
      } else if (counterJump > 14 && counterJump < 20){
        fase = 1000;
      }
  console.log(fase);
}


