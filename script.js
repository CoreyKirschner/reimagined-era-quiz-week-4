const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const timerEl = document.getElementById('timer')
const scoreEl = document.getElementById('score')

let shuffledQuestions, currentQuestionIndex

let questionCounter = 1;
let scoreCounter = 5;
let score = 5;
let selectedAnswer;

var timeInMinutes = 5;
var currentTime = Date.parse(new Date());
var deadline = new Date(currentTime + timeInMinutes*60*1000);
var count = 0;

// increase score for correct answer
function increment() {
    var counter_dom = document.getElementById("counter");
    counter_dom.innerText = ++count;
}

// decrease score for incorrect answer
function decrement() {
    var counter_dom = document.getElementById("counter");
    counter_dom.innerText = --count;
}

function userScore() {
    if (answers === 'correct') {
        scoreCounter = scoreCounter + 1;
        scoreCounterElement.innerText = scoreCounter;
        increment()
    }
    console.log('Increase Score')
}

scoreEl.userScore

// timer
function getTimeRemaining(endtime){
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor( (t/1000) % 60 );
  var minutes = Math.floor( (t/1000/60) % 60 );
  var hours = Math.floor( (t/(1000*60*60)) % 24 );
  var days = Math.floor( t/(1000*60*60*24) );
  return {
    'total': t,
    'minutes': minutes,
    'seconds': seconds
  };
}

// when the clock starts and ends
function initializeClock(id, endtime){
  var clock = document.getElementById(id);
  function updateClock(){
    var t = getTimeRemaining(endtime);
    clock.innerHTML = t.minutes + ':' + t.seconds;
    if(t.total<=0){
      clearInterval(timeinterval);
      startButton.innerText = 'Restart'
      startButton.classList.remove('hide')
    }
  }
  
  updateClock();
  var timeinterval = setInterval(updateClock,1000);
}

// eventListeners to make clickable for the start and next buttons
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => 
{
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    currentTime = Date.parse(new Date());
    deadline = new Date (currentTime + timeInMinutes*60*1000);
    initializeClock('timer-sec', deadline) 
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    questionCounter = 0;
    scoreCounter = 0;
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        } else if (answer.wrong)
            button.dataset.wrong = answer.wrong
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild (answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
        increment()
        increment()
    } else {
        element.classList.add('wrong')
        decrement()
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'Which is NOT a way to declare a variable in JavaScript?',
        answers: [
            { text: 'var', correct: false },
            { text: 'let', correct: false},
            { text: 'function', correct: true},
            { text: 'const', correct: false}
        ]
    },
    {
        question: 'What operator symbol is used to divide?',
        answers: [
            { text: '/', correct: true},
            { text: ':', correct: false},
            { text: "%", correct: false},
            { text: "+", correct: false}
        ]
    },
    {
        question: 'What comes after Content in the CSS box model?',
        answers: [ 
            { text: 'Border', correct: false},
            { text: 'Margin', correct: false},
            { text: "Padding", correct: true,},
            { text: "Background", correct: false}
        ]
    },
    {
        question: 'Which program is used to mainly style your page?',
        answers: [
            { text: 'HTML', correct: false},
            { text: 'Javascript', correct: false},
            { text: "JQuery", correct: false},
            { text: "CSS", correct: true}
        ]
    },
    {
        question: 'What is a string in Javascript?',
        answers: [
            { text: 'Sequence of characters consisted of letters, numbers, or symbols.', correct: true},
            { text: 'Stores the data value that can be changed later on.', correct: false},
            { text: "A set of statements that performs a task or calculates a value.", correct: false},
            { text: "Used to assign to an element.", correct: false}
        ]
    },
    {
        question: 'Which semantic HTML term is used at the bottom of the page?',
        answers: [
            { text: 'footer', correct: true},
            { text: 'nav', correct: false,},
            { text: "article", correct: false},
            { text: "header", correct: false}
        ]
    },
]