var kana = [];

kana[0] = "き";
kana[1] = "いま";
kana[2] = "あつい";
kana[3] = "てんき";
kana[4] = "あく";
kana[5] = "ひと";
kana[6] = "あう";
kana[7] = "こんど";
kana[8] = "あに";
kana[9] = "かぜ";
kana[10] = "なまえ";
kana[11] = "ねる";
kana[12] = "かえる";
kana[13] = "ゆき";
kana[14] = "あめ";
kana[15] = "おきる";
kana[16] = "つくる";
kana[17] = "やま";
kana[18] = "かわ";


var kanji = []; 

kanji[0] = "木";
kanji[1] = "今";
kanji[2] = "暑い";
kanji[3] = "天気";
kanji[4] = "悪";
kanji[5] = "人";
kanji[6] = "会う";
kanji[7] = "今度";
kanji[8] = "兄";
kanji[9] = "風";
kanji[10] = "名前";
kanji[11] = "寝る";
kanji[12] = "帰る";
kanji[13] = "雪";
kanji[14] = "雨";
kanji[15] = "起きる";
kanji[16] = "作る";
kanji[17] = "山";
kanji[18] = "川";


var english = []; 

english[0] = "tree";
english[1] = "now";
english[2] = "hot";
english[3] = "weather";
english[4] = "evil";
english[5] = "person";
english[6] = "to meet";
english[7] = "this time";
english[8] = "older brother";
english[9] = "wind";
english[10] = "name";
english[11] = "to sleep";
english[12] = "to go back";
english[13] = "snow";
english[14] = "rain";
english[15] = "to get up";
english[16] = "to make";
english[17] = "mountain";
english[18] = "river";

//Major Routine

//array to match with selected option
var wordforms = [english,kana,kanji]



var totalscore = 0;
var highscore = 0;
var totalseconds = 600;

$("#question").hide();
$("#scoreholder").hide();

//starts the clock
var clock = function(){

 $("#gameoptions").fadeOut(100);
 $("#question").fadeIn();
 $("#scoreholder").fadeIn();

 seconds = function() {

    var fullseconds = Math.floor((totalseconds/10));
	
	var tenths = Math.floor((fullseconds/10));

    document.getElementById('timer').innerHTML = fullseconds;

    if (totalseconds >= 0) {
        totalseconds = totalseconds - 1;
		
		//if time runs out ends the game and makes everything unclickable
    } else if(totalseconds <=0){
    	document.getElementById('timer').innerHTML = "Game Over";
		$(".answerbox").css("pointer-events", "none");
    }
	
	if (totalseconds <= 100){
		$("#timer").addClass("timerend");
	} else {
		$("#timer").removeClass("timerend");
	}
	
}

countdown = setInterval('seconds()', 100);
}

	
//Checks if answer is correct or incorrect
var answered = function (number){
	
	$("#answercontainer"+number).toggleClass("answerbox2");
	$("#answercontainer"+number).css("pointer-events", "none");
		
	//if answer is correct
		if(number == answerposition ){
			answerstatus = "correct";
			totalseconds = totalseconds + 30;
			totalscore = totalscore + 10;
			document.getElementById('currentscore').innerHTML = totalscore;
			
			//animates cards away
			window.setTimeout(function(){
				$("#answerarea").animate({
				"left":"-300px",
				"opacity":"0"
				},300);
			},800);
			
		window.setTimeout(function(){firstq()},1400);
		
		if(totalscore > highscore){
			localStorage.setItem("highscore",totalscore);
			highscore = totalscore;
			document.getElementById('highscore').innerHTML = highscore;
		}
		//if answer is wrong	
		} else{
			answerstatus = "wrong";
			totalseconds = totalseconds - 50;
			window.setTimeout(function(){$("#answercontainer"+number).fadeTo("medium",0.0)},1000);
		};
	};
	
	
	//Function to get new question and answer
var firstq = function(){
	
	var randNum = Math.floor(Math.random()*kana.length);

	console.log("random number is " + randNum);

	//creates array of random uniques
	var randarray = [];
	while(randarray.length < options){
	    var randomnumber=Math.floor(Math.random() * kana.length)
	    var found=false;
	    for(var i=0;i<randarray.length;i++){
	        if(randarray[i]==randomnumber){
	        found=true;break
	        }
	    }
	    if(!found)randarray[randarray.length]=randomnumber;
		
	};
	
	//checks that answer is part of random array, if not it adds it the array in a random spot
	if(randarray.indexOf(randNum)==-1){
		var newrand = Math.floor(Math.random()*options);
		randarray[newrand] = randNum;
	}
	
	//used when checking if the answer is correct
	answerposition = randarray.indexOf(randNum);
	
	//writes the random questions, setings and settings2 is coming from the local storage
	document.getElementById("question").innerHTML = wordforms[settings][randNum];
	
	
	//writes th answer options
	var content = '';
	
	for (var i=0; i <options; i++){
		content = content + "<div id = 'answercontainer" + i + "' class = 'answerbox' onclick = 'answered(" + i + ")'>";
		content = content + "<div class = 'flipper'><div class = front>" + wordforms[settings2][randarray[i]] + "</div>";
		content = content + "<div class = 'back'>" + wordforms[settings][randarray[i]] + "</div></div></div>";
	};


	document.getElementById("outerarea").innerHTML = "<div id = 'answerarea'>" + content + "</div>";
	$("#answerarea").hide();
	$("#answerarea").fadeIn(500);
	
	//sets the color and text of cards
	$(".front, .back").css({
		"background-color":cardcolor,
		"color":textcolor					
	});
	
};

//End function to get new question and end of Major routine
	
//Saving options in options container
//this is also where most of the code for one of my minor routines is

//checks to make sure somethign is in localstorage, otherwise sets default value
if (localStorage.getItem("options") == null){
	document.getElementById('cardnumber').value = '3';
	options = 3;
	
}else{

options = localStorage.getItem("options");
document.getElementById('cardnumber').value = options;

}


if (localStorage.getItem("cardcolor") == null){
	document.getElementById('cardcolor').value = 'grey'
	cardcolor = 'grey';
	
}else{
	
	cardcolor = localStorage.getItem("cardcolor")
	document.getElementById('cardcolor').value = cardcolor;
}

if (localStorage.getItem("textcolor") == null){
	document.getElementById('textcolor').value = 'white'
	textcolor = 'white';
	
}else{
	
	textcolor = localStorage.getItem("textcolor")
	document.getElementById('textcolor').value = textcolor;
}

var e = document.getElementById("qtype");
if (localStorage.getItem("settings") == null){
	settings = 0;
	e.selectedIndex = settings;
}else{
	settings = localStorage.getItem("settings");
	e.selectedIndex = settings;
}

var e2 = document.getElementById("atype");
if (localStorage.getItem("settings2") == null){
	settings2 = 1;
	e2.selectedIndex = settings2;
}else{
	settings2 = localStorage.getItem("settings2");
	e2.selectedIndex = settings2;
}

if (localStorage.getItem("highscore") == null){
	document.getElementById("highscore").innerHTML = 0;
}else{
	highscore = localStorage.getItem("highscore");
	document.getElementById("highscore").innerHTML = highscore;
	
}

//saves values and inserts them in game on click of the start button

var cardnumber = function(){
	
	options = document.getElementById('cardnumber').value;
	cardcolor = document.getElementById('cardcolor').value;
	settings = e.selectedIndex;
	settings2 = e2.selectedIndex;
	textcolor = document.getElementById('textcolor').value;
	
	localStorage.setItem("cardcolor",cardcolor);
	cardcolor = localStorage.getItem("cardcolor");
	
	localStorage.setItem("options", options);
	options = localStorage.getItem("options");
	
	localStorage.setItem("settings",settings);
	localStorage.setItem("settings2",settings2);
	
	localStorage.setItem("textcolor", textcolor);
	textcolor = localStorage.getItem("textcolor");
	
	};
	
	
var validate = function(){
	if(document.getElementById('cardnumber').value >19){
		alert("please enter a number 1 - 19");
		document.getElementById('cardnumber').value = 3;
	}
}	
	
// $("#custom").spectrum({
//     color: "#f00"
// });
	