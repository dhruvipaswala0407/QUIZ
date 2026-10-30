let params = new URLSearchParams(window.location.search);
let quizId = parseInt(params.get('id'));
let quiz = cardData.find(ele => ele.id === quizId && ele.active === true);
const $ = (id) => document.getElementById(id);
let currentQuestionIndex = 0;
let useranswer = [];
for (let i = 0; i < quiz.questions.length; i++) {
    useranswer.push(null);
}
console.log(useranswer)
const playQuiz =() => {
    currentQuestionIndex = 0;
    $('quizdetails').classList.add('d-none');
    $('quizQuestioncard').classList.remove('d-none');
    $('quizScore').classList.add('d-none');
    playAgain();
}
const showQue = () => {
    $('quizdetails').classList.add('d-none');
    $('quizQuestioncard').classList.remove('d-none');
    $('quizScore').classList.add('d-none');
    loadQuation()
};
const loadDetail = () => {
    $('cardHeader').innerText = quiz.title;
    $('totalQuestions').innerText = 'Total Questions :- ' + quiz.questions.length;
    $('cardTime').innerText = 'Total Time :- ' + quiz.timing + 's';
    let termsHTML = '';
    quiz.term.forEach(item => {
        termsHTML += `<p class="my-2 mx-2">➤ ${item}</p>`;
    });
    $('cardterm').innerHTML = termsHTML;
    $('cardButton').addEventListener('click', showQue);
}
const showAns =(i) => {
    useranswer[currentQuestionIndex] =  i; 
    console.log(useranswer);
    loadQuation(); 
}
const currentScore = () => {
    let score = 0;
    for(let i = 0; i < useranswer.length ; i++){
         if(useranswer[i] !== null){
            score++;
         }
    }
     return score;
}
console.log (currentScore())
loadDetail();
// qustion card
const loadQuation = () => {
    //Questions 1 of 8
    $('questionCounter').textContent = `Questions ${currentQuestionIndex + 1} of ${quiz.questions.length}`;
    $('quizHeader').textContent = quiz.title;
    $('quizQuestions').textContent = quiz.questions[currentQuestionIndex].question;
    // $('currentScore').textContent = `current Score: ${score}`;
    const progressPercent = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;
    $('progressBar').style.width = `${progressPercent}%`;
    $('totalbar').textContent = `${currentQuestionIndex + 1} / ${quiz.questions.length}`;
    const optionsymbol = ["A", "B", "C", "D"]
    const optionsContainer = $('quizOptionContainer');
    optionsContainer.innerHTML = '';
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
loadQuation();
const finishQuiz = () => {
    $('quizdetails').classList.add('d-none');
    $('quizQuestioncard').classList.add('d-none');
    $('quizScore').classList.remove('d-none');
    loadQuation();
}

const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
        currentQuestionIndex++;
        loadQuation();
    } else {
        finishQuiz();
    }
}
// function handleBack() {
//     if (currentQuestionIndex ) {
//         currentQuestionIndex--;
//         loadQuation();
//     }else{
//         loadDetail();
//     } 
// }

const playAgain =( ) => {
    currentQuestionIndex = 0;
    loadQuation();
}
// console.log(handleBack());
   $('nextOption').addEventListener('click', handleNext);
//    $('backOption').addEventListener('click', handleBack);
   $('playAgain').addEventListener('click', playQuiz);