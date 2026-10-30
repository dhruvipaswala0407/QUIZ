let params = new URLSearchParams(window.location.search);
let quizId = parseInt(params.get('id'));
let quiz = cardData.find(ele => ele.id === quizId && ele.active === true);
const $ = (id) => document.getElementById(id);
let currentQuestionIndex = 0;
let useranswer = [];
for (let i = 0; i < quiz.questions.length; i++) {
    useranswer.push(null);
}
let timeleft = 10;
let timer;
const startTime = () => {
    timer=setInterval(() => {
        if(timeleft == 0 ){
            finishQuiz();
        }
        $('timer').textContent=`Time Left : ${timeleft --}` ;
    }, 1000);
}
//  console.log(startTime(quiz.timer))
const playQuiz =() => {
    currentQuestionIndex = 0;
    $('quizdetails').classList.add('d-none');
    $('quizQuestioncard').classList.remove('d-none');
    $('quizScore').classList.add('d-none');
    playAgain();
    loadQuestion();
   startTime();
    
}
const loadDetail = () => {
    $('cardHeader').innerText = quiz.title;
    $('totalQuestions').innerText = 'Total Questions :- ' + quiz.questions.length;
    $('cardTime').innerText = 'Total Time :- ' + quiz.timing + 's';
    let termsHTML = '';
    quiz.term.forEach(item => {
        termsHTML += `<p class="my-2 mx-2">➤ ${item}</p>`;
    });
    $('cardterm').innerHTML = termsHTML;
}
$('cardButton').addEventListener('click', playQuiz);
const showAns =(i) => {
    useranswer[currentQuestionIndex] =  i; 
    loadQuestion(); 
}
const attemptScore = () => {
    let score = 0;
    for(let i = 0; i < useranswer.length ; i++){
         if(useranswer[i] !== null){
            score++;
         }
    }
    return score;
}
loadDetail();
// qustion card
const loadQuestion = () => {
    //Questions 1 of 8
    $('questionCounter').textContent = `Questions ${currentQuestionIndex + 1} of ${quiz.questions.length}`;
    $('quizHeader').textContent = quiz.title;
    $('quizQuestions').textContent = quiz.questions[currentQuestionIndex].question;
    $('attemptScore').textContent = `Attempt Score: ${attemptScore()}`;
    const progressPercent = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;
    $('progressBar').style.width = `${progressPercent}%`;
    $('totalbar').textContent = `${currentQuestionIndex + 1} / ${quiz.questions.length}`;
    const optionsymbol = ["A", "B", "C", "D"]
    const optionsContainer = $('quizOptionContainer');
    optionsContainer.className = 'row gx-3';
    $('quizOptionContainer').innerHTML=''
    quiz.questions[currentQuestionIndex].options.forEach((option, index) => {
        const col = document.createElement('div');
        col.className = 'col-md-5';
        const button = document.createElement('button');
        button.className = (useranswer[currentQuestionIndex] === quiz.questions[currentQuestionIndex].options[index]) ? `btn bg-card btn-outline-success btn text-white w-100 p-3` : `btn bg-card text-white w-100 p-3`;
        button.textContent = `${optionsymbol[index]}. ${option}`;
        col.append(button);
        optionsContainer.append(col);
        console.log();
        button.addEventListener('click', () => {
            showAns(option);
        });
    });

    $('nextOption').textContent = (currentQuestionIndex < quiz.questions.length - 1) ? `Next` : `Finish` ;
}
loadQuestion();
const getQuizScore = () => {
    $('scoreNumber').textContent = `${attemptScore()} / ${quiz.questions.length}`;

}

const finishQuiz = () => {
    $('quizdetails').classList.add('d-none');
    $('quizQuestioncard').classList.add('d-none');
    $('quizScore').classList.remove('d-none');
    loadQuestion();
    getQuizScore();
    clearInterval(timer);
}
const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        finishQuiz();
    }
}
const playAgain =( ) => {
    currentQuestionIndex = 0;
    loadQuestion();
}
   $('nextOption').addEventListener('click', handleNext);
   $('playAgain').addEventListener('click', playQuiz);