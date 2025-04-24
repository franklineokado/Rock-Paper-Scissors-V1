const scores = JSON.parse(localStorage.getItem('scores')) || {
  Wins: 0,
  Loses: 0,
  Ties: 0
}

function renderScore() {
  document.querySelector('#js-scores').innerText = `Wins: ${scores.Wins}, Ties: ${scores.Ties}, Loses: ${scores.Loses}.`
}

renderScore()

function playGame(myMove) {
  getComputerMove()

  getResult(myMove)
}

let computerMove;

function getComputerMove() {
  const randomNumber = Math.floor(Math.random() * 3) + 1
  if(randomNumber === 1) {
    computerMove = 'Rock'
  } else if(randomNumber === 2) {
    computerMove = 'Paper'
  } else if(randomNumber === 3) {
    computerMove = 'Scissors'
  }
}

let result;

function getResult(myMove) {
  if(myMove === 'Rock') {
    if(computerMove === 'Rock') {
      result = "It's a Tie"
    } else if(computerMove === 'Paper') {
      result = 'You Lose'
    } else if(computerMove === 'Scissors') {
      result = 'You Win'
    }
  } else if(myMove === 'Paper') {
    if(computerMove === 'Rock') {
      result = 'You Win'
    } else if(computerMove === 'Paper') {
      result = "It's a Tie"
    } else if(computerMove === 'Scissors') {
      result = 'You Lose'
    }
  } else if(myMove === 'Scissors') {
    if(computerMove === 'Rock') {
      result = 'You Lose'
    } else if(computerMove === 'Paper') {
      result = 'You Win'
    } else if(computerMove === 'Scissors') {
      result = "It's a Tie"
    }
  }

  document.querySelector('#js-results').innerHTML = `You picked <strong>${myMove}</strong>, Computer picked <strong>${computerMove}.</strong> The result is that <strong>${result}.</strong>`
  
  if(result === 'You Win') {
    scores.Wins++
  } else if(result === "It's a Tie") {
    scores.Ties++
  } else if(result === 'You Lose') {
    scores.Loses++
  }

  localStorage.setItem('scores', JSON.stringify(scores))

  renderScore()
}

function resetScore() {
  scores.Wins = 0
  scores.Ties = 0
  scores.Loses = 0

  localStorage.setItem('scores', JSON.stringify(scores))

  renderScore()

  document.querySelector('#js-results').innerText = 'The score has been reset.'
}

let autoMove;

function getAutoMove() {
  const randomNumber = Math.floor(Math.random() * 3) + 1
  if(randomNumber === 1) {
    autoMove = 'Rock'
  } else if(randomNumber === 2) {
    autoMove = 'Paper'
  } else if(randomNumber === 3) {
    autoMove = 'Scissors'
  }
}

let intervalId;

function autoPlay() {
  document.querySelector('#js-auto-play-btn').innerText = 'Loading...'

  if(intervalId) {
    document.querySelector('#js-auto-play-btn').innerText = 'Auto Play'
    clearInterval(intervalId)
    intervalId = 0
    return 
  } 

  intervalId = setInterval(() => {
  document.querySelector('#js-auto-play-btn').innerText = 'Stop Auto Play'

    getAutoMove()

    getComputerMove()

    getResult(autoMove)
  }, 1500)
}

document.addEventListener('keydown', event => {
  if(event.key.toLowerCase() === 'r') {
    playGame('Rock')
  } else if(event.key.toLowerCase() === 'p') {
    playGame('Paper')
  } else if(event.key.toLowerCase() === 's') {
    playGame('Scissors')
  } else if(event.key === 'Backspace') {
    resetScore()
  } else if(event.code === 'Space') {
    autoPlay()
  }
})