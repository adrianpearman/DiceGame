/*
GAME RULES:

Challenges

1. Player loses entire score if they roll two 6's in a row
2. add an input for where the players can manually set the score
3. add a second dice

*/

// SETTING INITAL VALUES


var scores, roundScore, activePlayer, gamePlaying /*, endScore*/;
init();

var lastDice;

document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying) {
    // 1. We need a random number
    var dice1 = Math.floor(Math.random()*6) + 1;
    var dice2 = Math.floor(Math.random()*6) + 1;
    console.log(dice1);
    console.log(dice2);

    // 2. display the result
    // var diceDOM = document.querySelector('.dice');
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
    // diceDOM.style.display='block';
    // diceDOM.src = 'dice-'+dice+'.png'
    document.getElementById('dice-1').src = 'dice-'+dice1+'.png'
    document.getElementById('dice-2').src = 'dice-'+dice2+'.png'

    // 3. Update the round score IF the rolled number was not a 1
    if (dice1 !== 1 && dice2 !== 1) {
      // Add score
      roundScore += dice1 + dice2;
      document.querySelector('#current-'+activePlayer).textContent=roundScore;
    }else {
      // Next Player
      nextPlayer()
    }

    // if (dice === 6 && lastDice === 6) {
    //   // Players loses score
    //   scores[activePlayer] = 0;
    //   document.querySelector('#score-' + activePlayer).textContent= 0;
    //   nextPlayer();
    // } else if (dice !== 1) {
    //   // add score
    //   roundScore += dice
    //   document.querySelector('#current-'+activePlayer).textContent = roundScore
    // }else {
    //   nextPlayer();
    // }
    // // retains thhe value of the previous role.
    // lastDice = dice;
  }


})

document.querySelector('.btn-hold').addEventListener('click', function(){
  if (gamePlaying) {
    // Add current score to GLOBAL score
    scores[activePlayer] += roundScore;

    // update the UI
    document.querySelector('#score-' + activePlayer).textContent= scores[activePlayer]

    // creates a winning score value by taking the input value from the html input tag
    var input = document.querySelector('.finalScore').value;
    var winningScore;
    // Undefined, 0, null or "" are coercised to false
    // any thing else is coercised to true
    if (input) {
      winningScore = input
    }else {
      winningScore = 20;
    }

    // check if player won the game
    if (scores[activePlayer] >= winningScore) {
      document.querySelector('#name-'+activePlayer).textContent = 'Winner!';
      document.getElementById('dice-1').style.display = 'none';
      document.getElementById('dice-2').style.display = 'none';
      document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
      document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
      gamePlaying = false;
    }else {
      // Next Player
      nextPlayer()
    }
  }


})

function nextPlayer(){
  // go to next player
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
  roundScore = 0
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  // This changes the class by removing on and adding it to another
  // document.querySelector('.player-0-panel').classList.remove('active');
  // document.querySelector('.player-1-panel').classList.add('active');

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';

}

document.querySelector('.btn-new').addEventListener('click', init)


function init(){
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;

  gamePlaying = true;
  // endScore = prompt('How many points are needed to Win?')

  document.getElementById('dice-1').style.display='none';
  document.getElementById('dice-2').style.display='none';
  
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}


// cc
