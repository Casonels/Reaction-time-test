const box = document.getElementById("box");
const result = document.getElementById("result");

let startTime = 0;
let waiting = false;
let ready = false;

let attempts = [];
let count = 0;


function resetBox() {
    box.style.background = "#2b2b2b";
    box.innerHTML = "Click to start";
    waiting = false;
    ready = false;
    startTime = 0;
}


function startRound() {

    waiting = true;
    ready = false;

    box.style.background = "#c0392b";
    box.innerHTML = "Wait...";


    let delay = Math.random() * 4000 + 1000;


    setTimeout(() => {

        if (!waiting) return;


        box.style.background = "#2ecc71";
        box.innerHTML = "CLICK!";

        startTime = performance.now();
        ready = true;


    }, delay);
}



box.onclick = function() {


    // Start game
    if (!waiting && !ready) {

        startRound();
        return;

    }



    // Clicked too early
    if (waiting && !ready) {

        result.innerHTML =
        "Too early! Wait for green.";

        attempts = [];
        count = 0;

        resetBox();

        return;

    }



    // Successful click
    if (ready) {


        let reaction =
            Math.round(
                performance.now() - startTime
            );


        attempts.push(reaction);
        count++;


        let average =
            Math.round(
                attempts.reduce((a,b)=>a+b,0)
                / attempts.length
            );


        result.innerHTML =
        `
        Attempt ${count}/5<br>
        Time: ${reaction} ms<br>
        Average: ${average} ms
        `;



        waiting = false;
        ready = false;



        if (count === 5) {

            result.innerHTML +=
            `<br><br>Finished! Average: ${average} ms`;

            attempts = [];
            count = 0;

            box.innerHTML =
            "Click to restart";

        } else {

            box.innerHTML =
            "Click for next";

        }


        box.style.background="#2b2b2b";

    }

};
