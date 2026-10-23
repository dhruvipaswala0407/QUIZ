let params = new URLSearchParams(window.location.search);
let quizId = parseInt(params.get('id'));
let quiz = cardData.find(ele => ele.id === quizId && ele.active === true);
const $ = (id) => document.getElementById(id);
function loadDetail() {
    $('cardHeader').innerText = quiz.title;
    $('totalQuestions').innerText = 'Total Questions :- ' + quiz.questions.length;
    $('cardTime').innerText = 'Total Time :- ' + quiz.timing + 's';
    let termsHTML = '';
    quiz.term.forEach(item => {
        termsHTML += `<p class="my-2 mx-2">➤ ${item}</p>`;
    });
    $('cardterm').innerHTML = termsHTML;
    // $('cardButton').innerHTML =;
}

function showAns(i){
    useranswer[currentQuestionIndex] =  i; 
    loadQuation(); 
    console.log(useranswer)
}
loadDetail();
// qustion card
const currentQuestionIndex = 0;
const score = 0;
const useranswer = [];
function loadQuation() {
    //Questions 1 of 8
    $('questionCounter').textContent = `Questions ${currentQuestionIndex + 1} of ${quiz.questions.length}`;
    $('quizHeader').textContent = quiz.title;
    $('quizQuestions').textContent = quiz.questions[currentQuestionIndex].question;
    $('currentScore').textContent = `current Score: ${score}`;
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
            // console.log(index);
              
        });
        
    });
}
loadQuation();
// console.log(progressBar)
