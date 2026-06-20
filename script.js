const box = document.getElementById("box");
const result = document.getElementById("result");

let startTime;
let waiting = false;

box.onclick = () => {
    if (!waiting) {
        box.innerHTML = "Wait...";
        box.style.background = "red";
        waiting = true;

        let delay = Math.random() * 4000 + 1000;

        setTimeout(() => {
            box.innerHTML = "CLICK!";
            box.style.background = "green";
            startTime = performance.now();
        }, delay);

    } else {
        if (startTime) {
            let reaction = performance.now() - startTime;

            result.innerHTML =
                `Your reaction time: ${Math.round(reaction)} ms`;

            box.innerHTML = "Click to retry";
            box.style.background = "gray";

            startTime = null;
            waiting = false;
        } else {
            result.innerHTML = "Too early! Wait for green.";
            box.innerHTML = "Try again";
            box.style.background = "gray";
            waiting = false;
        }
    }
};
