var minute, second, loop;
minute = document.querySelector("#minute").textContent;
second = document.querySelector("#second").textContent;
loop = document.querySelector("#loop").textContent;
var totalseconds = (Number(minute) * 60) + Number(second);

// stolen from stackoverflow
function startTimer(duration) {
    var timer = duration, minutes, seconds, loops = Number(loop);
    var countdown = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);		

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        document.querySelector("#minute").textContent = minutes;
		document.querySelector("#second").textContent = seconds;

        if (timer-- == 0) {
			if (loops-- == 0) {
            	clearInterval(countdown);
			}
			else {
				timer = duration;
				document.querySelector("#loop").textContent = loops;
			}
        }
    }, 1000);
}

window.onload = function () {   
    startTimer(totalseconds);
};
