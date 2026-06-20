const box = document.getElementById("box");
const result = document.getElementById("result");


let startTime = null;
let waiting = false;

let attempts = [];
let count = 0;



function startRound() {

    waiting = true;
    startTime = null;


    box.style.background = "#c0392b";
    box.innerHTML = "Wait...";


    let delay =
        Math.random() * 4000 + 1000;


    setTimeout(() => {

        box.style.background = "#2ecc71";
        box.innerHTML = "CLICK!";

        startTime = performance.now();


    }, delay);

}



box.onclick = () => {


    if (!waiting) {

        startRound();
        return;

    }


    if (startTime === null) {

        result.innerHTML =
        "Too early! Try again.";

        waiting = false;
        attempts = [];
        count = 0;

        box.style.background="#2b2b2b";
        box.innerHTML="Click to start";

        return;

    }



    let time =
        Math.round(
            performance.now()-startTime
        );


    attempts.push(time);
    count++;



    let avg =
        Math.round(
            attempts.reduce((a,b)=>a+b,0)
            / attempts.length
        );



    result.innerHTML =
    `
    Attempt ${count}/5<br>
    Time: ${time} ms<br>
    Average: ${avg} ms
    `;



    waiting=false;
    startTime=null;


    if(count >= 5){

        result.innerHTML +=
        `<br><br>Finished! Final average: ${avg} ms`;

        count=0;
        attempts=[];

    }


    box.style.background="#2b2b2b";
    box.innerHTML="Click for next";

};
