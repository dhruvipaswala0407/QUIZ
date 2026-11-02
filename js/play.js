let params = new URLSearchParams(window.location.search);
let quizId = parseInt(params.get('id'));
let quiz = cardData.find(ele => ele.id === quizId && ele.active === true);
const $ = (id) => document.getElementById(id);
let currentIndex = 0;
let useranswer = [];
for (let i = 0; i < quiz.questions.length; i++) {
    useranswer.push(null);
}
let timeleft = quiz.timing;
let timer;
const startTime = () => {
    timer=setInterval(() => {
        if(timeleft == 0 ){
            finishQuiz();
        }
        $('timer').textContent=`Time Left : ${timeleft --}` ;
    }, 1000);
    return timer;
}
//  console.log(startTime(quiz.timer))
const playQuiz =() => {
    currentIndex = 0;
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
    useranswer[currentIndex] =  i; 
    loadQuestion(); 
}
const ansCheck = () => {
    let right = 0;
    let wrong = 0;
    let unattempted = 0;

    for (let i = 0; i < useranswer.length; i++) {
        if (useranswer[i] === null) {
            unattempted++;
        } else if (useranswer[i] === quiz.questions[i]['answer']) {
            // FIXED: Using [i] instead of [currentIndex]
            right++;
        } else {
            wrong++;
        }
    }
    return { right, wrong, unattempted };
};
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
    $('questionCounter').textContent = `Questions ${currentIndex + 1} of ${quiz.questions.length}`;
    $('quizHeader').textContent = quiz.title;
    $('quizQuestions').textContent = quiz.questions[currentIndex].question;
    $('attemptScore').textContent = `Attempt Score: ${attemptScore()}`;
    const progressPercent = ((currentIndex + 1) / quiz.questions.length) * 100;
    $('progressBar').style.width = `${progressPercent}%`;
    $('totalbar').textContent = `${currentIndex + 1} / ${quiz.questions.length}`;
    const optionsymbol = ["A", "B", "C", "D"]
    const optionsContainer = $('quizOptionContainer');
    optionsContainer.className = 'row gx-3';
    $('quizOptionContainer').innerHTML=''
    quiz.questions[currentIndex].options.forEach((option, index) => {
        const col = document.createElement('div');
        col.className = 'col-md-5';
        const button = document.createElement('button');
        button.className = (useranswer[currentIndex] === quiz.questions[currentIndex].options[index]) ? `btn bg-card btn-outline-success btn text-white w-100 p-3` : `btn bg-card text-white w-100 p-3`;
        button.textContent = `${optionsymbol[index]}. ${option}`;
        col.append(button);
        optionsContainer.append(col);
        console.log();
        button.addEventListener('click', () => {
            showAns(option);
        });
    });

    $('nextOption').textContent = (currentIndex < quiz.questions.length - 1) ? `Next` : `Finish` ;
}
loadQuestion();
const getQuizScore = () => {
    let result = ansCheck();
    $('scoreNumber').textContent = `${attemptScore()} / ${quiz.questions.length}`;
    $('ansRight').textContent = `${result.right}`;
    $('ansWrong').textContent = `${result.wrong}`;
    
}

const finishQuiz = () => {
    $('quizdetails').classList.add('d-none');
    $('quizQuestioncard').classList.add('d-none');
    $('quizScore').classList.remove('d-none');
    loadQuestion();
    getQuizScore();
    clearInterval(timer);
    ansCheck();
}
const handleNext = () => {
    if (currentIndex < quiz.questions.length - 1) {
        currentIndex++;
        loadQuestion();
    } else {
        finishQuiz();
    }
}
const playAgain =( ) => {
    currentIndex = 0;
    attemptScore();
    score = 0
    loadQuestion();
    timeleft = quiz.timing;
}
   $('nextOption').addEventListener('click', handleNext);
   $('playAgain').addEventListener('click', playQuiz);