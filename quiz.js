
const readlineSync = require("readline-sync");

const questions = [
  
  {
    question: "What is the capital of Japan?",
    options: ["A) Beijing", "B) Seoul", "C) Tokyo", "D) Bangkok", "E) Hanoi"],
    answer: "C",
  },
  {
    question: 'Who wrote "To Kill a Mockingbird"?',
    options: [
      "A) Mark Twain",
      "B) Harper Lee",
      "C) J.K. Rowling",
      "D) Ernest Hemingway",
      "E) F. Scott Fitzgerald",
    ],
    answer: "B",
  },
  
const quizDuration = 30;
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
  question.options.forEach((option) => console.log(option));

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

  const userAnswer = readlineSync
    .question("Your answer (A-E): ")
    .trim()
    .toUpperCase();
  clearInterval(interval);

  if (userAnswer === question.answer) {
    score++;
    console.log("Correct!");
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
  console.log("Quiz started!");
  askQuestion();

  setTimeout(() => {
    if (currentQuestionIndex < questions.length) {
      endQuiz();
    }
  }, quizDuration * 1000);
}

startQuiz();
