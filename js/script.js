//DELETE THIS LATER
var document, setInterval, clearInterval, window;

//global variables
var minute, dot, second, workDigits;
minute = document.querySelector("#minute");
dot = document.querySelector("#dot");
second = document.querySelector("#second");
workDigits = [minute, dot, second];

var breakminute, breakdot, breaksecond, breakDigits;
breakminute = document.querySelector("#breakminute");
breakdot = document.querySelector("#breakdot");
breaksecond = document.querySelector("#breaksecond");
breakDigits = [breakminute, breakdot, breaksecond];

var loop, phase;
loop = document.querySelector("#loop");
phase = document.querySelector("#phase");

var theButton, resetButton, settingsButton;
theButton = document.querySelector("#thebutton");
resetButton = document.querySelector("#reset");
settingsButton = document.querySelector("#settings");

var clock, clockState = 0;
var wTotal, wProgress;
var bTotal, bProgress;
var phaseState = "work";

var hint, phaseImage, inputs, tooltips;
hint = document.querySelector("#hint");
phaseImage = document.querySelector("#phase-image");
inputs = document.querySelectorAll(".digits");
tooltip = document.querySelectorAll(".tooltip");

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
			phaseState == "work";
			phaseControl("work");
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
function calculateMinute(input) {
	var minutes = parseInt(input / 60, 10);
	return minutes = minutes < 10 ? "0" + minutes : minutes
}
function calculateSecond(input) {
	var seconds = parseInt(input % 60, 10);
	return seconds = seconds < 10 ? "0" + seconds : seconds
}

function calculateTotal() {
	wTotal = Number(minute.value) * 60 + Number(second.value);
	wProgress = wTotal;
	bTotal =  Number(breakminute.value * 60) + Number(breaksecond.value);
	bProgress = bTotal;
}

function clockControl() {
	if (clockState == 0){
		clockState = 1;
		theButton.innerHTML = "pause";
		clock = setInterval(countdown, 1000);
		inputs.forEach((e)=>{e.readOnly = "true"});
		if(phaseState == "work") {phaseControl("work")}
		else {phaseControl("break")}
		hideTooltip("hide");
	}
	else {
		clockState = 0;
		theButton.innerHTML = "play_arrow";
		clearInterval(clock);
		phaseControl("pause");
	}
}

function phaseControl(input) {
	switch (input){
		case "work":
			workDigits.forEach((e)=>{e.style.display = "inline"});
			breakDigits.forEach((e)=>{e.style.display = "inline"});
			loop.style.display = "inline";
			phase.style.display = "none";
			phaseImage.src = "image/clock.png";
			break;
			
		case "break":
			workDigits.forEach((e)=>{e.style.display = "none"});
			breakDigits.forEach((e)=>{e.style.display = "inline"});
			loop.style.display = "inline";
			phase.style.display = "inline";
			phase.innerHTML = "BREAK";
			phase.style.color = "white";
			phaseImage.src = "image/break.png"
			break;
		
		case "pause":
			workDigits.forEach((e)=>{e.style.display = "none"});
			breakDigits.forEach((e)=>{e.style.display = "none"});
			loop.style.display = "none";
			phase.style.display = "inline";
			phase.innerHTML = "PAUSED";
			if (phaseState == "work") {
				phase.style.color = "white";
				phaseImage.src = "image/clock.png";
			}
			else {
				phase.style.color = "red";
				phaseImage.src = "image/break-red.png";
			}
			break;
	}
}

function reset() {
	clearInterval(clock);
	minute.value = "25", second.value = "00";
	breakminute.value = "05", breaksecond.value = "00";
	clockState = 0,	loop.value = "4", phaseState = "work";
	theButton.innerHTML = "play_arrow";
	inputs.forEach((e)=>{e.readOnly = ""})
	calculateTotal();
	phaseControl("work");
	hideTooltip();
}

function checkInput(e) {
	var value = e.target.value;
	e.target.value = value.replace(/\D/g,"");
}

function setTheClock() {
	reset();
	minute.value = "00", second.value = "00";
	breakminute.value = "00", breaksecond.value = "00";
	loop.value = "1";
	calculateTotal();
}
function hideTooltip(input) {
	if (input == "hide") {tooltip.forEach((e)=>{e.style.display = "none"})}
	else tooltip.forEach((e)=>{e.style.display = ""})
}
//event listeners
theButton.addEventListener("click", clockControl);
resetButton.addEventListener("click", reset);
inputs.forEach((e)=>{
	e.addEventListener("input", checkInput);
	e.addEventListener("focusout", calculateTotal);
});
settingsButton.addEventListener("click", setTheClock);

//actions
phase.style.display = "none";
calculateTotal();

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