const questions = [
    {
        question: "Sa paggising ng tao sa umaga, ano ang una nitong binubuksan?",
        answers: [
            { text: "Bibig", correct: false},
            { text: "Ilaw", correct: false},
            { text: "Mata", correct: true},
            { text: "Cellphone", correct: false},
        ]
    },
    {
        question: "On a traffic light, what does it mean when a red light lights up?",
        answers: [
            { text: "Get ready with me", correct: false},
            { text: "Stop", correct: true},
            { text: "Be right back", correct: false},
            { text: "Stop, look, listen, and learn", correct: false},
        ]
    },
    {
        question: "Anong parte ng katawan ang ginagamit sa pagsipa?",
        answers: [
            { text: "Ulo", correct: false},
            { text: "Tuhod", correct: false},
            { text: "Kamay", correct: false},
            { text: "Paa", correct: true},
        ]
    },
    {
        question: "Bugtong: Hindi pari, hindi hari, nagdadamit ng sari-sari",
        answers: [
            { text: "Mannequin", correct: false},
            { text: "Paru-paro", correct: true},
            { text: "Hanger", correct: false},
            { text: "Mascot", correct: false},
        ]
    },
    {
        question: "If the tagalog of 'One' is 'Isa', what is the tagalog of 'Zero'?",
        answers: [
            { text: "Bokya", correct: false},
            { text: "Itlog", correct: false},
            { text: "Zero", correct: true},
            { text: "Wala", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("timer");

let currentQuestionIndex = 0;
let score = 0;
let timer;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = currentQuestion.question;

    resetTimer();
    startTimer(20);

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");

        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetTimer() {
    clearInterval(timer);
    timerElement.textContent = "";
}

function startTimer(duration) {
    let timeLeft = duration;
    timerElement.textContent = `Time Left: ${timeLeft}s`;

    timer = setInterval(() => {
      if (timeLeft <= 1) {
        clearInterval(timer);
        handleTimeout(); 
      }
      
      timeLeft--;
      timerElement.textContent = `Time Left: ${timeLeft}s`;
    }, 1000);
}

function handleTimeout() {
    const correctButton = Array.from(answerButtons.children).find(button => button.dataset.correct === "true");

    correctButton.classList.add("correct");
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    resetTimer();
    timerElement.textContent = ""; 

    questionElement.innerHTML = `Your score is ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Take Quiz Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();