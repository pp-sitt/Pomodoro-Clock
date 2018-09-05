//DELETE THIS LATER
var document, setInterval, clearInterval, window;

//global variables
var minute, second;
minute = document.querySelector("#minute");
second = document.querySelector("#second");

var breakminute, breaksecond;
breakminute = document.querySelector("#breakminute");
breaksecond = document.querySelector("#breaksecond");

var loop, phase;
loop = document.querySelector("#loop");
phase = document.querySelector("#phase");

var theButton, resetButton, inputs;
theButton = document.querySelector("#thebutton");
resetButton = document.querySelector("#reset");
inputs = document.querySelectorAll(".digits");

var clock, clockState = 0;
var wTotal, wProgress;
var bTotal, bProgress;
var loops = Number(loop.value), phaseState = "work";

//functions
// stolen from stackoverflow
function countdown() {
	var minutes, seconds, outputM, outputS, progress;
	
	if(loop.value == 0){return}
	
	if (phaseState == "work") {
		outputM = minute, outputS = second;
		progress = wProgress;
	}
	else if (phaseState == "break") {
		outputM = breakminute, outputS = breaksecond;
		progress = bProgress;
	}
	
    if (--progress == 0) {
		if (phaseState == "work"){
			phaseState = "break";
		}
		else if (phaseState == "break"){
			if (--loop.value == 0) {
				clearInterval(clock);
			}
			else {
				wProgress = wTotal, bProgress = bTotal;
				phaseState = "work";
				progress = wProgress;
				minute.value = calculateMinute(progress);
				second.value = calculateSecond(progress);
				//if (loops == 0) {loop.value = ""}
				//else loop.value = loops;
			}
		}
    }

    minutes = calculateMinute(progress);
    seconds = calculateSecond(progress);

    outputM.value = minutes;
	outputS.value = seconds;
	
	if (progress != 0) {
		if (phaseState == "work") {wProgress = progress}
		else {bProgress = progress}
	}
	
	//test();
}
//
function calculateMinute(input){
	var minutes = parseInt(input / 60, 10);
	return minutes = minutes < 10 ? "0" + minutes : minutes
}
function calculateSecond(input){
	var seconds = parseInt(input % 60, 10);
	return seconds = seconds < 10 ? "0" + seconds : seconds
}

function clockControl() {
	wTotal = Number(minute.value) * 60 + Number(second.value);
	wProgress = wTotal;
	bTotal =  Number(breakminute.value * 60) + Number(breaksecond.value);
	bProgress = bTotal;
	
	if (clockState == 0){
		clockState = 1;
		theButton.style.backgroundImage = "url('https://cdn.icon-icons.com/icons2/1132/PNG/512/1486348534-music-pause-stop-control-play_80459.png')";
		resetButtonVisibilty();
		clock = setInterval(countdown, 1000);
		inputs.forEach((e)=>{e.readOnly = "true"});
	}
	else {
		clockState = 0;
		theButton.style.backgroundImage = "url('https://cdn.icon-icons.com/icons2/1132/PNG/512/1486348532-music-play-pause-control-go-arrow_80458.png')";
		resetButtonVisibilty();
		clearInterval(clock);
	}
}

function changePhase() {
	if (phase.innerHTML == "") {phase.innerHTML = "Break Time!"}
	else phase.innerHTML = "";
}

function resetButtonVisibilty() {
	if (clockState == 0 ){resetButton.style.visibility = "visible"}
	else {resetButton.style.visibility = "hidden"}
}

function reset() {
	clearInterval(clock);
	clockState = 0;
	phaseState = "work";
	minute.value = "00", second.value = "05";
	breakminute.value = "00", breaksecond.value = "05";
	loop.value = "2";
	theButton.style.backgroundImage = "url('https://cdn.icon-icons.com/icons2/1132/PNG/512/1486348532-music-play-pause-control-go-arrow_80458.png')";
	resetButton.style.visibility = "hidden";
	inputs.forEach((e)=>{e.readOnly = ""})
}

function checkInput(e) {
	var value = e.target.value;
	e.target.value = value.replace(/\D/g,"");
}

//event listeners
theButton.addEventListener("click", clockControl);
resetButton.addEventListener("click", reset);
inputs.forEach((e)=>{
	e.addEventListener("input", checkInput);
});

//actions
resetButton.style.visibility = "hidden";

//testing zone
function test(input) {
	console.log("work:", wTotal, wProgress);
	console.log("break:", bTotal, bProgress);
	console.log("loop:", loop.value);
	console.log("clockState:",clockState);
}