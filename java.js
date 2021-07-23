const startButton = document.getElementById('start_btn')
const nextButton = document.getElementById('next_btn')
const questionContainerElement = document.getElementById('question_container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer_buttons')
const timerElement = document.getElementById('timer')
const timeout = document.getElementById('timeout')
const form = document.getElementById('form')








let shuffledQuestions, currentQuestionIndex
let counter;

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
  
})

function startTimer(timerCount){
    timer = setInterval(function() {
        timerCount--;
        console.log(timerCount)
        timerElement.textContent = timerCount;
        if (timerCount == 0 ) {
            clearInterval (timer)
            timeOut()
            
        } 


    },1000)
} 
 
function timeOut() {
    timeout.classList.remove('hide')
}





function startGame() {
    console.log('Started')
    startButton.classList.add('hide')
    startTimer(20);
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()



}

function setNextQuestion() {
    resetState('')
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
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)

    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
        Array.from(answerButtonsElement.children).forEach(button => {
            setStatusClass(button, button.dataset.correct)
        })
    }
}

function selectAnswer(e) {

    const  selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'GameOver'
        startButton.classList.remove('hide')
    }
}


function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}



const questions = [
    {
        question: 'What does HTML stand for?',
        answers: [
            { text: 'Hyper Text Markup Language', correct: true },
            { text: 'Hyper Text Max Language', correct: false }

        ]
    },
    {
        question: 'What does CSS stand for?',
        answers: [
            { text: 'Cascading Style Sheet', correct: true },
            { text: 'Car Stop Show', correct: false },
        ]
    },
    {
        question: 'What tag doesnt have a closing tag?',
        answers:[
            { text: 'div', correct: false},
            { text: 'link', correct: true}
        ]
    }
]
