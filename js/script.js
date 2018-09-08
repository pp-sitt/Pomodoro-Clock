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
var loops = Number(loop.value);
var phaseState = "work";

var hint
hint = document.querySelector("#hint");

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
			phaseControl("break");
		}
		else if (phaseState == "break"){
			phaseControl("hide");
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
		theButton.innerHTML = "pause";
		resetButtonVisibilty();
		clock = setInterval(countdown, 1000);
		inputs.forEach((e)=>{e.readOnly = "true"});
		phaseControl("hide");
	}
	else {
		clockState = 0;
		theButton.innerHTML = "play_arrow";
		resetButtonVisibilty();
		clearInterval(clock);
		phaseControl("pause");
	}
}

function phaseControl(input) {
	
	switch (input){
		case "hide":
			minute.style.display = "inline";
			document.querySelector("#dot").style.display = "inline";
			second.style.display = "inline";
			phase.style.display = "none";
			break;
			
		case "break":
			minute.style.display = "none";
			document.querySelector("#dot").style.display = "none";
			second.style.display = "none";
			phase.style.display = "inline";
			phase.innerHTML = "Break";
			break;
		
		case "pause":
			minute.style.display = "none";
			document.querySelector("#dot").style.display = "none";
			second.style.display = "none";
			phase.style.display = "inline";
			phase.innerHTML = "Paused";
			break;
			
	}
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
	theButton.innerHTML = "play_arrow";
	resetButton.style.visibility = "hidden";
	inputs.forEach((e)=>{e.readOnly = ""})
	hint.style.visibility = "";
	hint.innerHTML = "click on the number to set the timer";
	phaseControl("hide");
}

function checkInput(e) {
	var value = e.target.value;
	e.target.value = value.replace(/\D/g,"");
}

function hideHint(e) {
	hint.style.visibility = "hidden";
	if (e.target.readOnly == true){
		hint.style.visibility = "";
		hint.innerHTML = "restart to set the timer";
		setTimeout(()=>{
			hint.style.visibility = "hidden";
		}, 1000);
	}
}

//event listeners
theButton.addEventListener("click", clockControl);
resetButton.addEventListener("click", reset);
inputs.forEach((e)=>{
	e.addEventListener("input", checkInput);
	e.addEventListener("focus", hideHint);
});

//actions
resetButton.style.visibility = "hidden";
phase.style.display = "none";

//testing zone
var testing;
function test(input) {
	testing = setInterval(()=>{
	console.log("work:", wTotal, wProgress);
	console.log("break:", bTotal, bProgress);
	console.log("loop:", loop.value);
	console.log("clockState:",clockState);
	console.log("phaseState", phaseState);
	}, 1000)
}