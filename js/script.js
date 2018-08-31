var minute, second, loop;
minute = document.querySelector("#minute").textContent;
second = document.querySelector("#second").textContent;
loop = document.querySelector("#loop").textContent;
 
// stolen from stackoverflow
function startTimer(duration) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        document.querySelector("#minute").textContent = minutes;
		document.querySelector("#second").textContent = seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

window.onload = function () {
    var totalseconds = (Number(minute) * 60) + Number(second);
    startTimer(totalseconds);
};
