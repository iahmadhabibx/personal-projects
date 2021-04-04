const request = new XMLHttpRequest();

let questions_length = document.getElementById("questions_length");
let difficulty = document.getElementById("difficulty");
let category = document.getElementById("category");
let questions_type = document.getElementById("qustions_type");
let optional_value = '';
// let api_URL = "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple";
let api_URL = "";

function generate_API() {
    if (questions_length.value === '') {
        optional_value = 10;
    }
    else {
        optional_value = questions_length.value;
    }

    api_URL = `https://opentdb.com/api.php?amount=${optional_value}&category=${category.value}&difficulty=${difficulty.value}&type=${questions_type.value}`;
    request.open("GET", api_URL);
    request.send();

    request.onload = () => {
        if (request.status == 200) {
            document.getElementById("question_section").style.display = "none";
            let mcqs = create_questionare(JSON.parse(request.response));
            let results_title = `<div class="text-center">Showing ${JSON.parse(request.response).results.length} results</div>`;
            document.getElementById("mcq_section").innerHTML = results_title + mcqs;
        }
        else {
            console.log(`error ${request.status} -  ${request.statusText}`)
        }
    }
}

function create_questionare(questionare) {
    let result = ``;
    if (!questionare)
        return;
    questionare.results.forEach((question) => {
        result += `
        <h3 class="text-center">${question.category}</h3>
            <div class="mcq_container">
                <h3 class="text-center">${question.question}</h3>
                <div class="card mt-1">
                    <div class="answer">
                        <div class="radio">
                            <label><input type="radio" class="mr-2" id="opt3">${question.correct_answer}</label>
                        </div>
                    </div>`;
        
            question.incorrect_answers.forEach(wrong_answers => {
                result += `<div class="answer">
                          <div class="radio">
                              <label><input type="radio" class="mr-2" id="opt3">${wrong_answers}</label>
                          </div>
                      </div>`
            });
        result +=
            `</div>
            </div>
        `;
    });

    return result;

}