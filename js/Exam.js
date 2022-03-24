let next = document.querySelectorAll(".next");
let prev = document.querySelector(".prev");
let pressQ = document.getElementsByClassName("number");

let url = window.location.href

let theContent = url.split("?")[1]
let splitContent = theContent.split("-")
let subject = splitContent[1]
let examTypo = splitContent[0]

let correctAnswerCheck = []

let grabOption = {}
let opt

let incrr = 0
function removeLoader() {
  $("#loading").remove();
  $("#load").remove();
}
let counterr;

async function getExamId() {
  const response = await fetch(
    `https://steamledge.com/blueberry/php2/?getExamTheoryId&mode=${subject}&content=${examTypo}`, {
    method: "GET",
  }
  );

  if (!response.ok) {
    alert("An Error Occured");
  }

  const questionsId = await response.json();
  removeLoader();

  let asideoCount = document.querySelector(".nav-pills");
  let parentDiv = document.querySelector('.tab-content');
  for (let i = 0; i < questionsId.length; i++) {
    removeLoader();
    asideoCount.innerHTML += `
            <li class="nav-item" role="presentation">
            <button class="nav-link number" id="Q${i + 1}" data-bs-toggle="pill" data-qid="${questionsId[i]}" data-bs-target="#Q${i + 1}" type="button" role="tab"></button>
            </li> 
        `;
    parentDiv.innerHTML += `
        <div class="tab-pane fade" data-tabcont="Q${i + 1}" id="Q${i + 1}" role="tabpanel">
        <div class="accordion" id="theAcord" data-dd="Q${i + 1}">
        </div >
        </div >
        `
  }
  let tabs = document.querySelectorAll(".nav-link");
  let tabContent = document.querySelectorAll(".tab-pane");
  tabContent[0].classList.add('active')
  tabContent[0].classList.add('show')

  for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('click', function () {
      for (let j = 0; j < tabs.length; j++)
        tabs[j].classList.remove('active');
      this.classList.add('active');
    });
  }

  prev.addEventListener("click", (e) => {
    for (let i = 0; i < tabs.length; i++) {
      if (tabs[i].classList.contains("active")) {
        tabs[i - 1].click();
        tabs[i - 1].scrollIntoView();
        break;
      }
    }
  });
  next.forEach((ee) => {
    ee.addEventListener("click", (e) => {
      for (let i = 0; i < tabs.length; i++) {
        if (tabs[i].classList.contains("active")) {
          tabs[i + 1].click();
          tabs[i + 1].scrollIntoView();
          break;
        }
      }
    });
  })

  document.querySelector('.stopWatch').innerHTML += `
    <div class="timer">
            <div class="d-flex justify-content-center align-items-center">
                <span class="timerIcon">
                    <span class="iconify" data-icon="ant-design:field-time-outlined"></span>
                </span>
                <span class="theCount">
                    <h4 class="d-flex justify-content-center" ><span class="timoe" id="hours"></span><span>:</span> <span class="timoe" id="minutes"></span> <span>:</span> <span class=" timoe" id="seconds"></span></h4>
                </span>
            </div>
        </div>
    `

  for (let i = 0; i < pressQ.length; i++) {
    pressQ[i].addEventListener("click", function () {
      if (pressQ[i].classList.contains('opened')) {
        let tabContent = document.querySelectorAll(".tab-pane");
        for (let j = 0; j < tabContent.length; j++) {
          tabContent[j].classList.remove('active');
          tabContent[j].classList.remove('show');
          let theClickfol = document.querySelector(`[data-tabcont="${pressQ[i].id}"]`)
          theClickfol.classList.add('active');
          theClickfol.classList.add('show');
        };
        grabOption = {}
        selection()
      }
      else {
        pressQ[i].classList.add('opened')
        $("body").append(`<div id="loading" class="loading">
        <img src="img/load/log.gif" alt="" class="loading-image">
        </div>`);
        let tabContent = document.querySelectorAll(".tab-pane");
        for (let j = 0; j < tabContent.length; j++) {
          tabContent[j].classList.remove('active');
          tabContent[j].classList.remove('show');
          let theClickfol = document.querySelector(`[data-tabcont="${pressQ[i].id}"]`)
          theClickfol.classList.add('active');
          theClickfol.classList.add('show');
        };
        let thisIId = pressQ[i].dataset.qid;
        async function getExamNumber() {
          const response = await fetch(`https://steamledge.com/blueberry/php2/?getExam&q_id=${thisIId}`, {
            method: "GET",
          });

          if (!response.ok) {
            alert("An Error Occured");
          }

          let questionsNumber = await response.json();
          removeLoader();
          grabOption = {}
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
                // console.log(ordered)


                let getNestId = 0
                for (const key in ordered) {
                  incrr++
                  let getNestId1 = getNestId++
                  getNestedElement += `
                        
                <div class="accordion-item">
                  <a href="#acc${incrr}" class="heading" data-bs-toggle="collapse">
                      <div class="icon"></div>
                      <div class="title">${key}</div>
                  </a>
          
                  <div class="content collapse" id="acc${incrr}">
                    <div class="container">
                    <div class="row mb-3">
                      <div class="col-lg-8 col-12">
                        <div class="Thequestion">${ordered[key]}</div>
                      </div>
                      <div class="col-lg-4 col-12">
                        <div class="question-imag" >
                          <img src="img/courseimg/2d.gif" width="100%" alt="" style="border-radius: 10px;" class="imag">
                        </div>
                      </div>
                    </div>
                    <div class="row mt-4 pb-4">
                      <div class="col-lg-8 col-12">

                      `


                  // console.log(questionsNumber[0][key])
                  for (const key2 in questionsNumber[0][key]) {
                    if (Object.hasOwnProperty.call(questionsNumber[0][key], key2)) {
                      const element = questionsNumber[0][key][key2];
                      // console.log(element.actual)
                      let alll = element.actual
                      for (let i = 0; i < alll.length; i++) {
                        correctAnswerCheck.push(alll[i])
                      }


                      function shuffle(alll) {
                        let currentIndex = alll.length,
                          randomIndex;

                        // While there remain elements to shuffle...
                        while (currentIndex != 0) {

                          // Pick a remaining element...
                          randomIndex = Math.floor(Math.random() * currentIndex);
                          currentIndex--;

                          // And swap it with the current element.
                          [alll[currentIndex], alll[randomIndex]] = [
                            alll[randomIndex], alll[currentIndex]
                          ];
                        }

                        return alll;
                      }
                      shuffle(alll);
                      element.actual.forEach((acc, ii) => {
                        incrr++
                        getNestedElement += `
                          <span id="${getNestId1}_${incrr}">
                          <p class="opt iselect">
                            <span class="opt-let"></span>
                              <span>${acc}</span>
                              </p >
                              </span>
                            `
                        // console.log(acc)
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
              }
            }
          }

          document.querySelector(`[data-dd="${pressQ[i].id}"]`).innerHTML = getNestedElement
          accordion()
          selection()
        }

        getExamNumber()

      }

    });
  }

  document.querySelectorAll(".nav-link")[0].click()

}
getExamId();
timerAll();


function accordion() {

  // $(".accordion-item .heading").on("click", function (e) {
  //   e.preventDefault();

  //   // Add the correct active class
  //   let activeAcc = document.querySelector(".accordion-item.active")

  //   if (activeAcc) {
  //     activeAcc.classList.remove("active")
  //   } 
  //   $(this).parent().addClass('active')
  //   // if ($(this).closest(".accordion-item").hasClass("active")) {
  //   //   // Remove active classes
  //   //   $(".accordion-item").removeClass("active");
  //   // } else {
  //   //   // Remove active classes
  //   //   $(".accordion-item").removeClass("active");

  //   //   // Add the active class
  //   //   $(this).closest(".accordion-item").addClass("active");
  //   // }

  //   // Show the content
  //   var $content = $(this).next();
  //   $content.slideToggle(100);
  //   $(".accordion-item .content").not($content).slideUp("fast");
  // });
}

function swap(json) {

  let ret = {};
  let inn = ""
  let innn = ""
  let nn = 0
  for (let key in json) {
    let ni = nn++
    if (ni == 0) {
      inn = key
    }
    if (ni == 1) {
      innn = key
    }
  }
  ret[inn] = json[innn]
  ret[innn] = json[inn]
  return ret

}

function selection() {
  opt = document.querySelectorAll('.iselect')
  opt.forEach((mm) => {
    mm.addEventListener('click', () => {
      addMorove(mm)
    })
  })
}


function addMorove(mm) {
  let presentClicked2 = mm.parentElement.id
  let presentClicked = mm.parentElement
  mm.classList.remove('opt')
  mm.classList.add('selecte')
  if (mm.classList.contains('selecte')) {
    // alert('clicked')

    if (Object.keys(grabOption).length <= 1) {
      grabOption[presentClicked2] = presentClicked.innerHTML
      if (Object.keys(grabOption).length == 2) {
        let ll = swap(grabOption)
        // console.log(swap(grabOption))
        // for (let x in ll) {
        //     document.getElementById(x).innerHTML = ""
        // }
        for (let o in ll) {
          // document.getElementById(o).innerHTML = ll[o]
          document.getElementById(o).innerHTML = ll[o].replace('selecte', 'opt')

        }
        grabOption = {}
        selection()
        opt = document.querySelectorAll('.iselect')
      }
    }
  }

}

function timerAll(params) {
  let timer;

  let compareDate = new Date();
  compareDate.setDate(compareDate.getDate() + 7);

  timer = setInterval(function () {
    timeBetweenDates(compareDate);
  }, 1000);

  function timeBetweenDates(toDate) {
    let dateEntered = toDate;
    let now = new Date();
    let difference = dateEntered.getTime() - now.getTime();

    if (difference <= 0) {

      // Timer done
      clearInterval(timer);

    } else {

      let seconds = Math.floor(difference / 1000);
      let minutes = Math.floor(seconds / 60);
      let hours = Math.floor(minutes / 60);
      let days = Math.floor(hours / 24);

      hours %= 2;
      minutes %= 60;
      seconds %= 60;

      $("#days").text(days);
      $("#hours").text(hours);
      $("#minutes").text(minutes);
      $("#seconds").text(seconds);
    }
  }
}

let submitBtn = document.querySelector('.submit');
submitBtn.addEventListener("click", (e) => {

  Swal.fire({
    title: 'Are you sure you want to submit?',
    showDenyButton: true,
    confirmButtonText: 'Yes',
    denyButtonText: `No`,
  }).then((result) => {
    if (result.isConfirmed) {
      let optImgArray = []
      let correctCheckArray = []

      let totalQues = document.querySelectorAll('.allquestion .nav-link').length
      let attempetemQues = document.querySelectorAll('.allquestion .nav-link.opened').length
      // converting HTMLELEMENT to string 
      var optImg = $(".iselect .img-fluid")
        .map(function () {
          optImgArray.push(this.outerHTML)
          return this.outerHTML;
        }).get().join("");

      for (let i = 0; i < optImgArray.length; i++) {
        if (correctAnswerCheck[i] === optImgArray[i]) {
          correctCheckArray.push("1")
        }
      }

      //   console.log(correctCheckArray)
      let total = optImgArray.length
      let correct = correctCheckArray.length

      let totalPercentage = (correct / total) * 100
      //   console.log(totalPercentage)

      let scoreconto = `
      <div class="scoreCont d-flex">
      <div class=" d-flex justify-content-center align-items-center w-100" style="height: 100%">
        <div class="card">
      `
      if (Math.round(totalPercentage) >= 80) {
        scoreconto += `
          <img src="img/perfect.gif">
        `
      } else {
        scoreconto += `
          <img src="img/good.gif">
        `
      }
      scoreconto += `
      <h1 class="font-Itim">Score</h1>
        <h2 class="text-primary font-Itim">${Math.round(totalPercentage)} %</h2>
        <p style="color: #000; font-weight: bold">You attempted ${attempetemQues} questions out of ${totalQues}</p>
        <a class="finish btn" href="../dashboard.html" style="margin-top: 50px;">go to dashboard</a>
        </div>  
      </div>
      </div>
      `
      $('#pills-tabContent').html(scoreconto)
    }
  })

})