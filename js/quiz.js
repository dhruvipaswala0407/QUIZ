const loadCard = document.getElementById("category-card");
// console.log(quiz)
function description(description) {
    if (description && description.length > 70) {
        description = description.substring(0, 70) + "...";
    }
    return description;
}
console.log(description())
cardData.forEach(ele => {
    const shortDesc = description(ele.description)
    const actionBtn = ele.active 
        ? `<a href="./quiz.html?id=${ele.id}" class="btn btn-danger btn-lg px-4 rounded-3 fw-semibold my-2">🎟️ View Quiz</a>`
        : `<button class="btn btn-secondary btn-lg px-4 rounded-3 fw-semibold my-2" disabled>⏳ Coming Soon</button>`;
    loadCard.innerHTML += `
   <div class="col-lg-3 rounded-3 mx-5 my-3">
                        <div class="card border-0 bg-dark" style="height: 380px;">
                            <div class="card-body bg-card hero-main-card rounded-4 p-4">
                                <h4 class="card-title fs-2 fw-bold py-3 d-flex justify-content-center">
                                   ${ele.title}
                                </h4>
                                <p class="card-title mb-2 fs-5 fw-semibold d-flex justify-content-center">
                                    ${shortDesc}
                                </p>
                                <div class="mt-3 d-flex
                                 justify-content-center">
                                    ${actionBtn}
                                </div>
                            </div>
                        </div>
                    </div>
  `;
})
console.log(loadCard);