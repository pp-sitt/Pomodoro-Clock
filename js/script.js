//DELETE THIS LATER
var document,setInterval,clearInterval,window;

//global variables
var minute, second, loop;
minute = document.querySelector("#minute");
second = document.querySelector("#second");
loop = document.querySelector("#loop");

var total, progress;
total = (Number(minute.textContent) * 60) + Number(second.textContent);
progress = total;

var theButton, resetButton; 
theButton = document.querySelector("#thebutton");
resetButton = document.querySelector("#reset");

var clock, clockstatus = 0;

//functions
// stolen from stackoverflow
function countdown() {
	var minutes, seconds, loops = Number(loop.textContent);
    if (--progress == 0) {
		if (loops-- == 0) {
			clearInterval(clock);
		}
		else {
			progress = total;
			//if (loops == 0) {loop.textContent = ""}
			//else loop.textContent = loops;
			loop.textContent = loops;
		}
    }
    minutes = parseInt(progress / 60, 10);
    seconds = parseInt(progress % 60, 10);		

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    minute.textContent = minutes;
	second.textContent = seconds;
	
	test();
}
//
function clockControl() {
	if (clockstatus == 0){
		clockstatus = 1;
		theButton.style.backgroundImage = "url('https://cdn.icon-icons.com/icons2/1132/PNG/512/1486348534-music-pause-stop-control-play_80459.png')";
		clock = setInterval(countdown, 1000);
		resetButtonVisibilty();
	}
	else {
		clockstatus = 0;
		theButton.style.backgroundImage = "url('https://cdn.icon-icons.com/icons2/1132/PNG/512/1486348532-music-play-pause-control-go-arrow_80458.png')";
		clearInterval(clock);
		resetButtonVisibilty();
	}
}

function resetButtonVisibilty() {
	if (clockstatus == 0 ){resetButton.style.visibility = "visible"}
	else {resetButton.style.visibility = "hidden"}
}

function reset() {
	clearInterval(clock);
	clockstatus = 0;
	minute.textContent = "00";
	second.textContent = "05";
	loop.textContent = "2";
	total = (Number(minute.textContent) * 60) + Number(second.textContent);
	progress = total;
	theButton.style.backgroundImage = "url('https://cdn.icon-icons.com/icons2/1132/PNG/512/1486348532-music-play-pause-control-go-arrow_80458.png')";
	resetButton.style.visibility = "hidden";
}
//test
function test() {
	console.log("clock:",minute.textContent+":"+second.textContent,loop.textContent);
	console.log("total:", total);
	console.log("progress:", progress);
	console.log("clockstatus:",clockstatus);
}
//

//event listeners
theButton.addEventListener("click", ()=>{clockControl()});
resetButton.addEventListener("click", ()=>{reset()});

//actions
resetButton.style.visibility = "hidden";