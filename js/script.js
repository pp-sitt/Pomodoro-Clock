//DELETE THIS LATER
var document, setInterval, clearInterval, window;

//global variables
var minute, second, loop;
minute = document.querySelector("#minute");
second = document.querySelector("#second");
loop = document.querySelector("#loop");

var theButton, resetButton, inputs;
theButton = document.querySelector("#thebutton");
resetButton = document.querySelector("#reset");
inputs = document.querySelectorAll(".digits");

var clock, clockstatus = 0;
var total, progress;

//functions
// stolen from stackoverflow
function countdown() {
	var minutes, seconds, loops = Number(loop.value);
    if (--progress == 0) {
		if (loops-- == 0) {
			clearInterval(clock);
		}
		else {
			progress = total;
			//if (loops == 0) {loop.value = ""}
			//else loop.value = loops;
			loop.value = loops;
		}
    }
    minutes = parseInt(progress / 60, 10);
    seconds = parseInt(progress % 60, 10);		

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    minute.value = minutes;
	second.value = seconds;
	
	test();
}
//
function clockControl() {
	total = Number(minute.value) * 60 + Number(second.value);
	progress = total;
	
	if (clockstatus == 0){
		clockstatus = 1;
		theButton.style.backgroundImage = "url('https://cdn.icon-icons.com/icons2/1132/PNG/512/1486348534-music-pause-stop-control-play_80459.png')";
		clock = setInterval(countdown, 1000);
		resetButtonVisibilty();
		inputs.forEach((e)=>{e.readOnly = "true"});
	}
	else {
		clockstatus = 0;
		theButton.style.backgroundImage = "url('https://cdn.icon-icons.com/icons2/1132/PNG/512/1486348532-music-play-pause-control-go-arrow_80458.png')";
		clearInterval(clock);
		resetButtonVisibilty();
		inputs.forEach((e)=>{e.readOnly = ""})
	}
}

function resetButtonVisibilty() {
	if (clockstatus == 0 ){resetButton.style.visibility = "visible"}
	else {resetButton.style.visibility = "hidden"}
}

function reset() {
	clearInterval(clock);
	clockstatus = 0;
	minute.value = "25";
	second.value = "00";
	loop.value = "4";
	theButton.style.backgroundImage = "url('https://cdn.icon-icons.com/icons2/1132/PNG/512/1486348532-music-play-pause-control-go-arrow_80458.png')";
	resetButton.style.visibility = "hidden";
}

function checkinput(e) {
	var value = e.target.value;
	e.target.value = value.replace(/\D/g,"");
}

//event listeners
theButton.addEventListener("click", clockControl);
resetButton.addEventListener("click", reset);
inputs.forEach((e)=>{
	e.addEventListener("input", checkinput);
});

//actions
resetButton.style.visibility = "hidden";

//testing zone
function test() {
	console.log("clock:",minute.value+":"+second.value,loop.value);
	console.log("total:", total);
	console.log("progress:", progress);
	console.log("clockstatus:",clockstatus);
}