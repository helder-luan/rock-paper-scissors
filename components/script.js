let jokenpo = ["rock", "scissor", "paper"];
let items = document.querySelectorAll('.borderItems');
let areaEvents = document.querySelector('.areaEvents');
let modal = document.querySelector('.modalRules');
let rules = document.querySelector('.rules');
let buttonPlayAgain = document.querySelector('.modalPlayAgain input');
let modalPlayAgain = document.querySelector('.modalPlayAgain');
let score = document.querySelector('.score h1');
let points = localStorage.getItem('score') == 0 ? 0 : localStorage.getItem('score');
let playerChoice;
let compChoice;
let status;

score.innerText = points;

if (localStorage.getItem('ruleView') == 0) {
  openModalRules();
}

function closeModalRules() {
  if (localStorage.getItem('ruleView') == 0) {
    localStorage.removeItem('ruleView');
    localStorage.getItem('ruleView', 1);
  }
  rules.style.opacity = '0';
  setTimeout(() => {
    modal.style.display = 'none';
  }, 200);
}

function openModalRules() {
  modal.style.display = 'flex';
  setTimeout(() => {
    rules.style.opacity = '1';
  }, 200);
}

document.querySelector('#closeModalRules').addEventListener('click', closeModalRules);
document.querySelector('#openModalRules').addEventListener('click', openModalRules);


function getItemChosen(element) {
  let itemClicked = element.cloneNode(true);
  itemClicked.classList.remove('hoverEffect');
  itemClicked.style.cursor = "default";
  playerChoice = itemClicked.getAttribute('id');

  let indexChoice = Math.floor(Math.random() * 4);
  compChoice = jokenpo[indexChoice];

  let computer = document.querySelector(`#${compChoice}`).cloneNode(true);
  computer.classList.remove('hoverEffect');
  computer.style.cursor = "default";

  areaEvents.innerHTML = " ";
  document.querySelector('section').style = `
    padding: 50px 10px 0 10px;
  `;
  areaEvents.style = `
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background: none;
    width: 100%;
    flex-flow: row nowrap;
  `;
  let cloneModal = modalPlayAgain.cloneNode(true);
  areaEvents.appendChild(itemClicked);
  areaEvents.appendChild(cloneModal);
  areaEvents.appendChild(computer);

  status = defineTheWinner(playerChoice, compChoice);

  switch (status) {
    case "You Win":
      buttonPlayAgain.style.color = "#3b4363";
      points++;
      score.innerText = points;
      localStorage.removeItem('score');
      localStorage.setItem('score', points);
      break;
    
    case "You Lose": 
      buttonPlayAgain.style.color = "#dc2e4e";
      if (points != 0) {
        points--;
        score.innerText = points;
        localStorage.removeItem('score');
        localStorage.setItem('score', points);
      }
      break;

    default:
      buttonPlayAgain.style.color = "#000";
      break;
  }

  document.querySelector('.modalPlayAgain').style.display = 'flex';
  document.querySelector('.modalPlayAgain h1').innerText = status;
  
}

function defineTheWinner(playerChoice, compChoice) {
  console.log(playerChoice, compChoice)
  if (playerChoice == compChoice) {
    return "Draw";
  } else {
    if ((playerChoice == "rock" & compChoice == "scissor") | (playerChoice == "paper" & compChoice == "rock") | (playerChoice == "scissor" & compChoice == "paper")) {
      return "You Win";
    } else {
      return "You Lose";
    }
  }
}

items.forEach(element => {
  element.addEventListener('click',() => {
    getItemChosen(element);
  })
});

if (localStorage.getItem('first') == null) {
  localStorage.setItem('first', 1);
  localStorage.setItem('score', 0);
  localStorage.setItem('ruleView', 0)
}