'use strict';

/* HTML elements are objects and
you can mutate (change) object properties (not entire objects) even when using const.
On the other hand, your constants store strings,
not objects (textContent is a property that holds a string)
and since you are using a const, you are unable to mutate its value... */
/* for id use #, for class use .
without #, use getElementById id -- getElementById is faster than querySelector */
const scoreP1 = document.querySelector('#score--0');
const scoreP2 = document.getElementById('score--1');
const diceImg = document.querySelector('.dice');
const currentScoreP1 = document.getElementById('current--0');
const currentScoreP2 = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

//selecting the buttons
const btnNewGame = document.querySelector('.btn--new');
const btnRollDice = document.querySelector('.btn--roll');
const btnHoldScore = document.querySelector('.btn--hold');

//just declare the variables outside this init func, because due to scope, w/o declaring
//it outside, will get error when accessing these elsewhere
let finalPlayerScores, activePlayerNow, playingNow, currentScore;

//initialization function, resetting the values...
const init = function () {
  scoreP1.textContent = 0;
  scoreP2.textContent = 0;
  currentScoreP1.textContent = 0;
  currentScoreP2.textContent = 0;
  currentScore = 0;
  playingNow = true;
  finalPlayerScores = [0, 0];
  activePlayerNow = 0;
  //we declared the above 4 variables outside b4 init, now if u use let currentScore again
  //js will treat it as a new variable, so remove let const whatever
  diceImg.classList.add('hidden');
  /*   player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.add('player--active'); */
  document
    .querySelector(`.player--${activePlayerNow}`)
    .classList.remove('player--winner');
  document
    .querySelector(`.player--${activePlayerNow}`)
    .classList.add('player--active');
};

//run this init function automatically at the be
init();

//function for switching the player
const switchPlayerFunc = function () {
  document.getElementById(`current--${activePlayerNow}`).textContent = 0;
  currentScore = 0;
  activePlayerNow = activePlayerNow === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

/* ----------------ROLL DICE BUTTON---------------------- */
//add eventListenter to buttons when we click them
//also we will be able to click the buttons only if playingNow is true
btnRollDice.addEventListener('click', function () {
  //what should happen when I click on Roll dice button??
  /* 
    1. Generate random number for the dice
    2. Display the dice image accordingly
    3. if dice/random no is 1 , then switch to player 2 */
  if (playingNow) {
    const diceRno = Math.trunc(Math.random() * 6) + 1;
    //why + 1 because w/o it no will include 0 also... but we dont have 0 dice, will throw 404 error not func dice 0 img
    console.log(`Dice number is now  ${diceRno}... `);
    console.log();
    //when we click on rolldice btn, the dice elem ie the image should not be hidden
    diceImg.classList.remove('hidden');
    //currently dice img is dice 5 at src atri
    //we can change the src img for dice here directly according to the random no generated
    diceImg.src = `dice-${diceRno}.png`;

    //if dice = 1 then switch to player 2
    if (diceRno !== 1) {
      //add dice no to the current score
      currentScore += diceRno;
      /*   currentScoreP1.textContent = currentScore; //need to change later
    instead of writing currentScoreP1 which is hardcoding , we can
    dynamically use this document.getElementById(`current--${activePlayerNow}`).textContent
    ***ie when dice is not 1, any player could be active, either p0 is active or p1 is active
    so dynamically set is using activePlayerNow which says who is active */
      document.getElementById(`current--${activePlayerNow}`).textContent =
        currentScore;
    } else {
      /*  switch to next player +  need to visually change also
    current score of the active player at the time dice = 1, his score should also be 0
    `current--${activePlayerNow} is same as current--0/1
    so now at this time whoever was active, his current score should be 0
    while switching the player , the next pl should NOT get the prev score from prev ply
    means the switched player should start with current score = 0
    now we need to switch the activePlayerNow 0 to 1 or 1 to 0
    change the background white to the current active player
    toggle class will add if not present, or remove if present
    so do toggle check for both  players */
      switchPlayerFunc();
    }
  } else {
    alert('Game over!!');
  }
});

/*  ----------------HOLD BUTTON-------------------- */
// when player clicks on HOLD button , now attach event handler

btnHoldScore.addEventListener('click', function () {
  /* 1. Add current score to total score  of the player active at that time
here you are showing only the total score at the top, when u add current to total score, current becomes ZERO
  2. check if this total score is >=100
  3. Finish the game by declaring the current player as the winner, else switch the player
  here currentScore is NOT specific to a player */
  if (playingNow) {
    finalPlayerScores[activePlayerNow] += currentScore;
    document.getElementById(`score--${activePlayerNow}`).textContent =
      finalPlayerScores[activePlayerNow];

    if (finalPlayerScores[activePlayerNow] >= 20) {
      diceImg.classList.add('hidden'); //if game over, hide the dice img
      playingNow = false;
      //adding diff css to the winner ply
      alert(`GAME OVER!!! player--${activePlayerNow} has WON! Congrats!! `);
      document
        .querySelector(`.player--${activePlayerNow}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayerNow}`)
        .classList.remove('player--active');
    } else {
      switchPlayerFunc();
    }
  } else {
    alert('Game over!!');
  }
});

/* ---------- NEW GAME BUTTON ---------------- */

//when we click on new game button

btnNewGame.addEventListener('click', init);
//here dont give as init() because js will call that first,
//only on new game button click, the js will automatically call the func init
