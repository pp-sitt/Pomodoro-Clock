//DELETE THIS LATER
var document,setInterval,clearInterval,window;
//global variables
var minute, second, loop;
minute = document.querySelector("#minute");
second = document.querySelector("#second");
loop = document.querySelector("#loop");

var totalseconds, progress;
totalseconds = (Number(minute.textContent) * 60) + Number(second.textContent);
progress = totalseconds;

var thebutton, restartbutton; 
thebutton = document.querySelector("#thebutton");
restartbutton = document.querySelector("#restart");

var clock, clockstatus = 0;

//functions
// stolen from stackoverflow
function countdown() {
	var timer = progress, minutes, seconds, loops = Number(loop.textContent);
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);		

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    minute.textContent = minutes;
	second.textContent = seconds;
	
    if (timer-- == 0) {
		if (loops-- == 0) {
			clearInterval(clock);
		}
		else {
			timer = totalseconds;
			//if (loops == 0) {loop.textContent = ""}
			//else loop.textContent = loops;
			loop.textContent = loops;
		}
    }
	progress = timer;
}

function clockcontrol() {
	if (clockstatus == 0){
		clockstatus = 1;
		thebutton.textContent = "pause";
		clock = setInterval(countdown, 1000);
	}
	else {
		clockstatus = 0;
		thebutton.textContent = "start";
		clearInterval(clock);
	}
}

function restart() {
	minute.textContent = "25";
	second.textContent = "00";
	loop.textContent = "2";
}

function check() {
	console.log("html:",minute.textContent,second.textContent,loop.textContent);
	console.log("total:", totalseconds);
	console.log("progress:", progress);
	console.log("clockstatus:",clockstatus);
}

//event listeners
thebutton.addEventListener("click", ()=>{clockcontrol()});
restartbutton.addEventListener("click", ()=>{restart()});