let params = new URLSearchParams(window.location.search);
let quizId = parseInt(params.get('id'));
let quiz = cardData.find(ele => ele.id === quizId && ele.active === true);
const $ = (id) => document.getElementById(id);
function loadDetail() {
    $('cardHeader').innerText =quiz.title;
    $('totalQuestions').innerText ='Total Questions :- ' + quiz.questions.length;
    $('cardTime').innerText ='Total Time :- ' + quiz.timing + 's';
    let termsHTML = '';
    quiz.term.forEach(item => {
        termsHTML += `<p class="my-2 mx-2">➤ ${item}</p>`;
    });
    $('cardterm').innerHTML = termsHTML;
    // $('cardButton').innerHTML =;
}
loadDetail();
// qustion card
let currentQuestionIndex = 2;
let score = 0;
function loadQuation() {
    //Questions 1 of 8
    $('questionCounter').textContent = `Questions ${currentQuestionIndex + 1} of ${quiz.questions.length}`;
    $('quizHeader').textContent = quiz.title;
    $('quizQuestions').textContent = quiz.questions[0].question;
    $('currentScore').textContent = `current Score: ${score}`;
    const progressPercent = ((currentQuestionIndex + 1) /  quiz.questions.length) * 100;
    $('progressBar').style.width = `${progressPercent}%`;
    
}
loadQuation();
console.log(progressBar)
