let next = document.querySelector(".next");
let prev = document.querySelector(".prev");
let tabs = document.querySelectorAll(".nav-link");
let pressQ = document.getElementsByClassName("number");

function removeLoader() {
    $("#loading").remove();
    $("#load").remove();
}
let counterr;

async function getExamId() {
    const response = await fetch(
        `https://steamledge.com/blueberry/php2/?getExamTheoryId&mode=math&content=waec`, {
            method: "GET",
        }
    );

    if (!response.ok) {
        alert("An Error Occured");
    }

    const questionsId = await response.json();
    removeLoader();

    let asideoCount = document.querySelector(".nav-pills");
    for (let i = 0; i < questionsId.length; i++) {
        removeLoader();
        asideoCount.innerHTML += `
            <li class="nav-item" role="presentation">
            <button class="nav-link number" id="Q${i + 1
      }" data-bs-toggle="pill" data-qid="${questionsId[i]
      }" data-bs-target="#Q${i + 1}" type="button" role="tab"></button>
            </li> 
        `;
    }
    prev.addEventListener("click", (e) => {
        for (let i = 0; i < tabs.length; i++) {
            if (tabs[i].classList.contains("active")) {
                tabs[i - 1].click();
                break;
            }
        }
    });
    next.addEventListener("click", (e) => {
        for (let i = 0; i < tabs.length; i++) {
            if (tabs[i].classList.contains("active")) {
                tabs[i + 1].click();
                break;
            }
        }
    });
    for (let i = 0; i < pressQ.length; i++) {
        pressQ[i].addEventListener("click", function() {
            $("body").append(`<div id="loading" class="loading">
        <img src="img/load/loader.gif" alt="" class="loading-image">
      </div>`);

            // progressbarIncrement()
            // console.log(pressQ[i])
            let thisIId = pressQ[i].dataset.qid;
            async function getExamNumber() {
                const response = await fetch(
                    `https://steamledge.com/blueberry/php2/?getExam&q_id=${thisIId}`, {
                        method: "GET",
                    }
                );

                if (!response.ok) {
                    alert("An Error Occured");
                }

                let questionsNumber = await response.json();
                console.log(questionsNumber[1]);
                removeLoader();

                // console.log(questionsNumber);
                let getNestedElement = "";
                for (let keyQuestion in questionsNumber) {
                    if (keyQuestion == 1) {
                        if (Object.hasOwnProperty.call(questionsNumber, keyQuestion)) {
                            const element = questionsNumber[keyQuestion];
                            // console.log(element);

                            const ordered = Object.keys(element).sort().reduce(
                                (obj, key) => {
                                    obj[key] = element[key];
                                    return obj;
                                }, {}
                            );
                            let getNestId = 0
                            for (const key in ordered) {
                                let getNestId1 = getNestId++
                                    getNestedElement += `
                <div class="accordion-item">
                  <a href="#" class="heading">
                      <div class="icon"></div>
                      <div class="title">${key}</div>
                  </a>
          
                  <div class="content">
                    <div class="container">
                    <div class="row mb-3">
                      <div class="col-lg-8 col-9">
                        <div class="Thequestion">${ordered[key]}</div>
                      </div>
                      <div class="col-lg-4 col-3">
                        <div class="question-imag" >
                          <img src="img/courseimg/2d.gif" width="100%" alt="" style="border-radius: 10px;" class="imag">
                        </div>
                      </div>
                    </div>
                    <div class="row mt-4 pb-4">
                      <div class="col-lg-8 col-12">

                      
                      `
                                console.log(questionsNumber[0][key])
                                for (const key2 in questionsNumber[0][key]) {
                                    if (Object.hasOwnProperty.call(questionsNumber[0][key], key2)) {
                                        const element = questionsNumber[0][key][key2];
                                        console.log(element.actual)

                                        element.actual.forEach((acc, ii) => {
                                            getNestedElement += `
                                            <span id="${getNestId1}_${ii + 1}">
                                            <p class="opt iselect">
                                                  <span class="opt-let">${ii + 1}</span>
                                                    <span>${acc}</span>
                                                    </p >
                                                    </span>
                                                  `
                                        })
                                    }
                                }

                                getNestedElement += `     
                           
                           </div >
                           </div >
                       </div >
                       </div >
                     </div >

                  `
                            }



                            $("#theAcord").html(getNestedElement);
                            accordion()
                            switchOption()
                        }
                    }
                }
            }

            getExamNumber();
        });
    }
}
getExamId();

function accordion() {
    $(".accordion-item .heading").on("click", function(e) {
        e.preventDefault();

        // Add the correct active class
        if ($(this).closest(".accordion-item").hasClass("active")) {
            // Remove active classes
            $(".accordion-item").removeClass("active");
        } else {
            // Remove active classes
            $(".accordion-item").removeClass("active");

            // Add the active class
            $(this).closest(".accordion-item").addClass("active");
        }

        // Show the content
        var $content = $(this).next();
        $content.slideToggle(100);
        $(".accordion-item .content").not($content).slideUp("fast");
    });
}

function switchOption() {
    let opt = document.querySelectorAll(".opt")
    opt.forEach((mm) => {
        mm.addEventListener("click", function() {
            let presentClicked = mm.parentElement.id
            mm.classList.remove('opt')
            mm.classList.add('selecte')
            if (mm.classList.contains('selecte')) {
                alert('clicked')
                presentClicked
            }

        })
    })
}