let next = document.querySelector('.next')
let prev = document.querySelector('.prev')
let tabs = document.querySelectorAll('.nav-link')






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
  
    let asideoCount = document.querySelector(".nav-pills");
    let pressQ = document.querySelectorAll('.nav-link')
    for (let i = 0; i < questionsId.length; i++) {
      removeLoader()
      asideoCount.innerHTML += `
            <li class="nav-item" role="presentation">
            <button class="nav-link" id="Q${i+1}" data-bs-toggle="pill" data-bs-target="#Q${i+1}" type="button" role="tab"></button>
            </li>
            
        `;  
    }
    prev.addEventListener('click', (e) => {
      for (let i = 0; i < tabs.length; i++) {
        if(tabs[i].classList.contains('active')) {
          tabs[i-1].click()
          break
        }
        
      }
    })
    next.addEventListener('click', (e) => {
      for (let i = 0; i < tabs.length; i++) {
        if(tabs[i].classList.contains('active')) {
          tabs[i+1].click()
          break
        }
        
      }
    })
    console.log(pressQ)
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
          
         
  
        
        }
        
        })
      
    }
  }
  getExamId();