// read lineSync quiz
const readlineSync = require('readline-sync');

const questions = [
    // questions that the user needs to answer
    // 15 in total

    { question: 'What is the capital of Japan?', options: ['A) Beijing', 'B) Seoul', 'C) Tokyo', 'D) Bangkok', 'E) Hanoi'], answer: 'C' },
    { question: 'What is the smallest country in the world by land area?', options: ['A) Monaco', 'B) Vatican City', 'C) San Marino', 'D) South Africa', 'E) Malta'], answer: 'B' },
    { question: 'Which planet is known as the Red Planet?', options: ['A) Venus', 'B) Earth', 'C) Mars', 'D) Jupiter', 'E) Saturn'], answer: 'C' },
    { question: 'What is the largest ocean on Earth?', options: ['A) Atlantic Ocean', 'B) Indian Ocean', 'C) Arctic Ocean', 'D) Pacific Ocean', 'E) Southern Ocean'], answer: 'D' },
    { question: 'Which element has the chemical symbol O ?', options: ['A) Gold', 'B) Oxygen', 'C) Osmium', 'D) Olivine', 'E) Oganesson'], answer: 'B' },

    
    { question: 'What does HTML stand for?', options: ['A) Hypertext Markup Language', 'B) Hyperlink and Text Markup Language', 'C) High-level Text Markup Language', 'D) Hypertext Multilayer Language', 'E) Hypertext Multiple Language'], answer: 'A' },
    { question: 'Which of the following is a JavaScript framework?', options: ['A) Django', 'B) Laravel', 'C) React', 'D) Ruby on Rails', 'E) AngularJS'], answer: 'C' },
    { question: 'In Python, what is used to indicate a block of code?', options: ['A) Curly braces {}', 'B) Parentheses ()', 'C) Indentation', 'D) Semicolons ;', 'E) Square brackets []'], answer: 'C' },
    { question: 'What is the output of `console.log(typeof null)` in JavaScript?', options: ['A) "object"', 'B) "null"', 'C) "undefined"', 'D) "number"', 'E) "string"'], answer: 'A' },
    { question: 'Which SQL command is used to retrieve data from a database?', options: ['A) INSERT', 'B) DELETE', 'C) SELECT', 'D) UPDATE', 'E) ALTER'], answer: 'C' },

    
    { question: 'What is the value of π (pi) to two decimal places?', options: ['A) 2.14', 'B) 3.14', 'C) 4.14', 'D) 5.14', 'E) 6.14'], answer: 'B' },
    { question: 'Solve: 8 × 7 - 5 + 3 = ?', options: ['A) 47', 'B) 48', 'C) 49', 'D) 50', 'E) 51'], answer: 'A' },
    { question: 'What is the square root of 81?', options: ['A) 7', 'B) 8', 'C) 9', 'D) 10', 'E) 11'], answer: 'C' },
    { question: 'What is the value of 5^3?', options: ['A) 15', 'B) 25', 'C) 50', 'D) 125', 'E) 150'], answer: 'D' },
    { question: 'If a triangle has angles of 90°, 45°, and 45°, what type of triangle is it?', options: ['A) Equilateral', 'B) Isosceles', 'C) Scalene', 'D) Right-angled', 'E) Acute'], answer: 'D' }
];

const quizDuration = 30; // Total time for the quiz in seconds
let currentQuestionIndex = 0;
let score = 0;
let quizStartTime = Date.now();

function askQuestion() {
    if (currentQuestionIndex >= questions.length) {
        endQuiz();
        return;
    }

    const question = questions[currentQuestionIndex];
    console.log(question.question);
    question.options.forEach(option => console.log(option));

    const startTime = Date.now();
    const interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const remaining = Math.max(0, 10 - elapsed);
        console.log(`Time left for this question: ${remaining} seconds`);
        if (remaining <= 0) {
            clearInterval(interval);
            console.log(`Time's up! The correct answer was: ${question.answer}`);
            currentQuestionIndex++;
            askQuestion();
        }
    }, 1000);

    const userAnswer = readlineSync.question('Your answer (A-E): ').trim().toUpperCase();
    clearInterval(interval);

    if (userAnswer === question.answer) {
        score++;
        console.log('Correct!');
    } else {
        console.log(`Incorrect! The correct answer was: ${question.answer}`);
    }

    currentQuestionIndex++;
    askQuestion();
}

function endQuiz() {
    const totalTime = Math.floor((Date.now() - quizStartTime) / 1000);
    console.log(`Quiz over! Your final score is ${score}/${questions.length}`);
    console.log(`Total time taken: ${totalTime} seconds`);
}

function startQuiz() {
    console.log('Quiz started!');
    askQuestion();

    setTimeout(() => {
        if (currentQuestionIndex < questions.length) {
            endQuiz();
        }
    }, quizDuration * 1000);
}

startQuiz();
