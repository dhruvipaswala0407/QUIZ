const quiz = document.getElementById('category-card');
// console.log(quiz)
function description(description) {
    if (description.length > 50) {
        description = description.substring(0, 80) + "...";
    }
    return description;
}
cardData.forEach(ele=>{
     ele.description = description(ele.description);
    quiz.innerHTML += `
   <div class="col-lg-3 rounded-3 mx-5 my-3">
                        <div class="card border-0 bg-dark" style="height: 380px;">
                            <div class="card-body bg-card hero-main-card rounded-4 p-4">
                                <h4 class="card-title fs-2 fw-bold py-3 d-flex justify-content-center">
                                   ${ele.title}
                                </h4>
                                <p class="card-title mb-2 fs-5 fw-semibold d-flex justify-content-center">
                                    ${ele.description}
                                </p>
                                <div class="mt-3 d-flex
                                 justify-content-center">
                                <a href="./quiz.html" class="btn btn-danger btn-lg px-4 rounded-3 fw-semibold my-2">
                                   🎟️ View Quiz
                                </a>
                                </div>
                            </div>
                        </div>
                    </div>
  `;
})
