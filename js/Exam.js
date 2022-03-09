
let pressQ = document.getElementsByClassName("question");

function removeLoader(){
    $( "#loading" ).hide();
    $( "#load" ).hide();
  } 
  let counterr;

  async function getExamId() {
    const response = await fetch(
      `https://steamledge.com/blueberry/php2/?getExamTheoryId&mode=math&content=waec`,
      {
        
        method: "GET",
      }
      
    );
  
    if (!response.ok) {
      alert("An Error Occured");
    }
    
  
    const questionsId = await response.json();
    removeLoader()
  
    let asideoCount = document.querySelector(".question");
    for (let i = 0; i < questionsId.length; i++) {
      removeLoader()
      asideoCount.innerHTML += `
        <a class="btn btn-primary number" data-bs-toggle="collapse" href="#Q${
          i + 1
        }" role="a" data-quescount="${i + 1}" data-lessonid="${
        questionsId[i]
      }" data-counto="${i}>
          <p class="mb-0 mt-3"> Q ${i + 1}</p>
        </a>
        <div class="collapse" id="Q${
          i + 1
        }" data-quescount="Q" data-lessonid="Q" data-counto="Q">
                <ul class="list-group" data-ul="${i + 1}">
                
                </ul>
        </div>
        `;
    }
    // console.log(pressQ)
    for (let i = 0; i < pressQ.length; i++) {
      pressQ[i].addEventListener("click", function () {
        $('body').append(`<div id="loading" class="loading">
        <img class="loading-image" src="../../images/load/loader.gif" alt="">
      </div>`)
     
         
       
        // progressbarIncrement()
        // console.log(pressQ[i])
        let getdiv = document.getElementById(`Q${i + 1}`).children[0].children
          .length;
          
        if (getdiv == 0) {
          let thisIId = pressQ[i].dataset.lessonid;
          
         
  
        
  
        
        })
      
    }
  }
  getExamId();