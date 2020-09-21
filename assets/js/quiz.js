const startButton = document.getElementById('start-quiz');
const welcomeContainer = document.getElementById('welcome-container');
const quizContainer = document.getElementById('quiz-container');

const question = document.getElementById('question');
const answers = Array.from(document.getElementsByClassName('answer-button'));

const wellDone = document.getElementById('well-done');
const wellDoneMessage = document.getElementById('message');
const nextButton = document.getElementById('next-button');
const tryAgain = document.getElementById('try-again');
const finish = document.getElementById('finish-container');
const finishButton = document.getElementById('finish-button');

let availableQuestions = [];
let currentQuestion = {};
let questionCounter;
let maxQuestions = 15;

//When the start button is clicked the startQuiz function is executed
startButton.addEventListener('click', startQuiz);
finishButton.addEventListener('click', startQuiz);

//This function will hide the welcome card and display the quiz when the start button is clicked
//The getQuestion function will then be executed
function startQuiz() {
    finish.classList.add('hide-content');
    welcomeContainer.classList.add('hide-content');
    quizContainer.classList.remove('hide-content');
    availableQuestions = [...questions]; //Spread operator
    questionCounter = 0;
    getQuestions();
}

//This function will get the questions in a random order and display the question/answers in the quiz container
function getQuestions() {
    // questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length); //Random question index number
    currentQuestion = availableQuestions[questionIndex]; //Sets random question
    question.innerHTML = currentQuestion.question; //Sets innerHTML of the quiz question

    answers.forEach(answer => {
        const number = answer.dataset["number"];
        answer.innerText = currentQuestion["answer" + number]; //Sets innerText of answer buttons
    })

    availableQuestions.splice(questionIndex, 1); //Removes answered question from quiz
}

//Add an event listener to each answer button and lets user know if answer clicked is correct or incorrect
answers.forEach(answer => {
    answer.addEventListener('click', e => {
        const selectedButton = e.target;
        const selectedAnswer = selectedButton.dataset["number"];

        if (selectedAnswer === currentQuestion.correct) {
            //Well Done message is displayed
            correctSound();
            wellDone.classList.remove('hide-content');
            wellDoneMessage.innerHTML = currentQuestion.message;
            tryAgain.classList.add('hide-content');
            quizContainer.classList.add('hide-content');
            questionCounter++;
            nextQuestion();
        } else {
            //Try Again message is displayed
            incorrectSound();
            tryAgain.classList.remove('hide-content');
            quizContainer.classList.add('hide-content');
            const tryButton = document.getElementById('try-button');
            tryButton.addEventListener('click', () => {
                tryAgain.classList.add('hide-content');
                quizContainer.classList.remove('hide-content');
            })
        }
    })
})

function nextQuestion() {
    nextButton.addEventListener('click', () => {
        wellDone.classList.add('hide-content');
        quizContainer.classList.remove('hide-content');

        if (availableQuestions.length == 0 || questionCounter == maxQuestions) {
            finish.classList.remove('hide-content');
            wellDone.classList.add('hide-content');
            quizContainer.classList.add('hide-content');
        }

        getQuestions();
    })
}

function correctSound() {
    const correct = new Audio('assets/audio/correct.mp3');
    correct.play();
}

function incorrectSound() {
    const incorrect = new Audio('assets/audio/incorrect.mp3');
    incorrect.play();
}

const questions = [{
        //String Instruments
        //1
        question: `<h2>Can you guess the name of this instrument?</h2><img class="quiz-img-portrait" src="assets/images/violin.jpg" alt="Violin">`,
        answer1: 'Double Bass',
        answer2: 'Violin',
        answer3: 'Cello',
        answer4: 'Flute',
        correct: '2', //Violin
        message: `<img class="quiz-img" src="assets/images/violin-player.jpg" alt="Someone Playing the Violin"><p>It's the Violin!</p><p>The Violin is a member of The String Family.</p><p>It has four strings which can be plucked or bowed by the player to make a sound.<br>It is also the smallest and highest sounding instrument in The String Family.</p>`
    },
    {
        //2
        question: `<h2>Which of these instruments has more than four strings?</h2><img class="quiz-img-portrait" src="assets/images/icons/what.png" alt="Question Mark">`,
        answer1: 'Harp',
        answer2: 'Cello',
        answer3: 'Oboe',
        answer4: 'Piano',
        correct: '1', //Harp
        message: `<img class="quiz-img" src="assets/images/harp.jpg" alt="Harp"><p>It's the Harp!</p><p>The Harp is a member of The String Family.</p><p>It is one of the largest string instruments in an orchestra and has over 40 strings.<br>The player plucks or strums the strings to make a sound.</p>`
    },
    {
        //3
        question: `<h2>Which of these instruments sounds the lowest?</h2><img class="quiz-img-portrait" src="assets/images/icons/what.png" alt="Question Mark">`,
        answer1: 'Trombone',
        answer2: 'French Horn',
        answer3: 'Clarinet',
        answer4: 'Double Bass',
        correct: '4', //Double Bass
        message: `<img class="quiz-img" src="assets/images/double-bass-player.jpg" alt="Someone Playing Double Bass"><p>It's the Double Bass!</p><p>The Double Bass is a member of The String Family.</p><p> It is one of the largest string instruments in an orchestra and it has four strings which can be plucked or bowed by the player to make a sound.<br>The Double Bass is also often used in Jazz and Swing music.</p>`
    },
    {
        //4
        question: `<h2>Which family is this instrument a member of?</h2><img class="quiz-img-portrait" src="assets/images/cello.jpg" alt="Cello">`,
        answer1: 'The Percussion Family',
        answer2: 'The String Family',
        answer3: 'The Brass Family',
        answer4: 'The Woodwind Family',
        correct: '2', //The String Family - Cello
        message: `<img class="quiz-img" src="assets/images/cello-player.jpg" alt="Someone Playing the Cello"><p>The Cello is a member of The String Family!</p><p>Other members of The String Family include the Violin, the Viola, the Double Bass and the Harp.<br>The Cello has four strings which can be plucked or bowed by the player to make a sound.</p>`
    },
    {
        //Woodwind Instruments
        //5
        question: `<h2>Which of these instruments sounds the highest?</h2><img class="quiz-img-portrait" src="assets/images/icons/what.png" alt="Question Mark">`,
        answer1: 'Bassoon',
        answer2: 'French Horn',
        answer3: 'Flute',
        answer4: 'Tuba',
        correct: '3', //Flute
        message: `<img class="quiz-img" src="assets/images/flute.jpg" alt="Someone Playing the Flute"><p>It's the Flute!</p>`
    },
    {
        //6
        question: `<h2>Can you guess the name of this instrument?</h2><img class="quiz-img" src="assets/images/oboe.jpg" alt="Oboe">`,
        answer1: 'Oboe',
        answer2: 'Flute',
        answer3: 'French Horn',
        answer4: 'Clarinet',
        correct: '1', //Oboe
        message: `<img class="quiz-img" src="assets/images/oboe-player.jpg" alt="Someone Playing the Oboe"><p>It's the Oboe!</p>`
    },
    {
        //7
        question: `<h2>Which of these instruments is played with a double reed?</h2><img class="quiz-img-portrait" src="assets/images/icons/what.png" alt="Question Mark">`,
        answer1: 'Clarinet',
        answer2: 'Flute',
        answer3: 'Bassoon',
        answer4: 'Trumpet',
        correct: '3', //Bassoon
        message: `<img class="quiz-img" src="assets/images/bassoon.jpg" alt="Someone Playing the Bassoon"><p>It's the Bassoon!</p>`
    },
    {
        //8
        question: `<h2>Which family is this instrument a member of?</h2><img class="quiz-img-portrait" src="assets/images/clarinet.jpg" alt="Clarinet">`,
        answer1: 'The Brass Family',
        answer2: 'The Percussion Family',
        answer3: 'The String Family',
        answer4: 'The Woodwind Family',
        correct: '4', //Clarinet - The Woodwind Family
        message: `<img class="quiz-img" src="assets/images/clarinet-player.jpg" alt="Someone Playing the Clarinet"><p>The Clarinet is a member of The Woodwind Family!</p>`
    },
    {
        //Brass Instruments
        //9
        question: `<h2>Which of these instruments sounds the highest?</h2><img class="quiz-img-portrait" src="assets/images/icons/what.png" alt="Question Mark">`,
        answer1: 'Trumpet',
        answer2: 'Trombone',
        answer3: 'French Horn',
        answer4: 'Tuba',
        correct: '1', //Trumpet
        message: `<img class="quiz-img" src="assets/images/trumpet-player.jpg" alt="Someone Playing the Trumpet"><p>It's the Trumpet!</p>`
    },
    {
        //10
        question: `<h2>Can you guess the name of this instrument?</h2><img class="quiz-img" src="assets/images/french-horn.jpg" alt="French Horn">`,
        answer1: 'English Horn',
        answer2: 'Trumpet',
        answer3: 'French Horn',
        answer4: 'Tuba',
        correct: '3', //French Horn
        message: `<img class="quiz-img" src="assets/images/french-horn-players.jpg" alt="Someone Playing the French Horn"><p>It's the French Horn!</p>`
    },
    {
        //11
        question: `<h2>Which of these instruments is played with a slide?</h2><img class="quiz-img-portrait" src="assets/images/icons/what.png" alt="Question Mark">`,
        answer1: 'Tuba',
        answer2: 'Trombone',
        answer3: 'French Horn',
        answer4: 'Trumpet',
        correct: '2', //Trombone
        message: `<img class="quiz-img" src="assets/images/trombone-player.jpg" alt="Someone Playing the Trombone"><p>It's the Trombone!</p>`
    },
    {
        //12
        question: `<h2>Which of these instruments sounds the lowest?</h2><img class="quiz-img-portrait" src="assets/images/icons/what.png" alt="Question Mark">`,
        answer1: 'Trombone',
        answer2: 'Clarinet',
        answer3: 'Tuba',
        answer4: 'Trumpet',
        correct: '3', //Tuba
        message: `<img class="quiz-img" src="assets/images/tuba.jpg" alt="Tuba"><p>Its the Tuba!</p>`
    },
    {
        //Percussion Instruments
        //13
        question: `<h2>Which of these instruments is played using sticks?</h2><img class="quiz-img" src="assets/images/sticks.jpg" alt="Drum Sticks">`,
        answer1: 'Harp',
        answer2: 'Snare Drum',
        answer3: 'Piano',
        answer4: 'Flute',
        correct: '2', //Snare Drum
        message: `<img class="quiz-img" src="assets/images/snare-drum.jpg" alt="Snare Drum"><p>It's the Snare Drum!</p>`
    },
    {
        //14
        question: `<h2>Can you guess the name of this instrument?</h2><img class="quiz-img-portrait" src="assets/images/timpani.jpg" alt="Timpani">`,
        answer1: 'Timpani',
        answer2: 'Bass Drum',
        answer3: 'Cymbals',
        answer4: 'Snare Drum',
        correct: '1', //Timpani
        message: `<img class="quiz-img-portrait" src="assets/images/timpani.jpg" alt="Timpani"><p>It's the Timpani!</p>`
    },
    {
        //15
        question: `<h2>Which of these instruments is a tuned percussion instrument?</h2><img class="quiz-img-portrait" src="assets/images/icons/what.png" alt="Question Mark">`,
        answer1: 'Snare Drum',
        answer2: 'Xylophone',
        answer3: 'Cymbals',
        answer4: 'Bass Drum',
        correct: '2', //Xylophone
        message: `<img class="quiz-img" src="assets/images/xylophone.jpg" alt="Xylophone"><p>It's the Xylophone!</p>`
    },
    {
        //16
        question: `<h2>Which family is this instrument a member of?</h2><img class="quiz-img" src="assets/images/cymbals.jpg" alt="Cymbals">`,
        answer1: 'The Woodwind Family',
        answer2: 'The Brass Family',
        answer3: 'The Percussion Family',
        answer4: 'The String Family',
        correct: '3', //Cymbals - The Percussion Family
        message: `<img class="quiz-img" src="assets/images/cymbal-players.jpg" alt="Cymbal Players"><p>The Cymbals are a member of The Percussion Family!</p>`
    },
    {
        //Additional Questions
        //17
        question: `<h2>Which of these instruments has black and white keys?</h2><img class="quiz-img-portrait" src="assets/images/icons/what.png" alt="Question Mark">`,
        answer1: 'Harp',
        answer2: 'Piano',
        answer3: 'Clarinet',
        answer4: 'Oboe',
        correct: '2', //Piano
        message: `<img class="quiz-img" src="assets/images/piano-player.jpg" alt="Pianist"><p>It's the Piano!</p>`
    },
    {
        //18
        question: `<h2>Which of these instruments is not used in an orchestra?</h2><img class="quiz-img-portrait" src="assets/images/icons/what.png" alt="Question Mark">`,
        answer1: 'Viola',
        answer2: 'Cornet',
        answer3: 'Bass Clarinet',
        answer4: 'Guitar',
        correct: '4', //Guitar
        message: `<img class="quiz-img" src="assets/images/guitar-player.jpg" alt="Guitarist"><p>It's the Guitar!</p>`
    }
]