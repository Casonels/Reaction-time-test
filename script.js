const box = document.getElementById("box");
const result = document.getElementById("result");

let startTime;
let waiting = false;

let tries = 0;
let times = [];
let best = null;


function startTest() {

    box.innerHTML = "Wait...";
    box.style.background = "red";

    waiting = true;
    startTime = null;


    let delay = Math.random() * 4000 + 1000;


    setTimeout(() => {

        box.innerHTML = "CLICK!";
        box.style.background = "green";

        startTime = performance.now();

    }, delay);
}



box.onclick = () => {


    // Start first round
    if (!waiting && tries === 0) {

        startTest();
        return;

    }


    // Too early
    if (waiting && startTime === null) {

        result.innerHTML =
            "Too early! Wait for green.";

        box.innerHTML = "Click to try again";
        box.style.background = "gray";

        waiting = false;
        tries = 0;
        times = [];

        return;
    }



    // Got reaction time
    if (startTime) {


        let reaction =
            performance.now() - startTime;


        reaction = Math.round(reaction);


        times.push(reaction);
        tries++;


        if (best === null || reaction < best) {
            best = reaction;
        }


        let average =
            Math.round(
                times.reduce((a,b)=>a+b,0)
                / times.length
            );


        result.innerHTML =
        `
        Try: ${tries}/5<br>
        Time: ${reaction} ms<br>
        Average: ${average} ms<br>
        Best: ${best} ms
        `;



        startTime = null;
        waiting = false;


        if (tries < 5) {

            box.innerHTML =
                "Click for next";

            box.style.background =
                "gray";


        } else {


            result.innerHTML +=
            `<br><br>🏆 Finished! Average: ${average} ms`;


            box.innerHTML =
                "Restart";


            tries = 0;
            times = [];

        }


    }

};
