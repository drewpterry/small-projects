var vocab = [];
vocab[0] = {
	english: "tree",
	kana: "き",
	kanji: "木",
}

vocab[1] = {
	english: "now",
	kana: "いま",
	kanji: "今",
}

vocab[2] = {
	english: "hot",
	kana: "あつい",
	kanji: "暑い",
}

vocab[3] = {
	english: "cat",
	kana: "ねこ",
	kanji: "猫",
}

vocab[4] = {
	english: "dog",
	kana: "いぬ",
	kanji: "犬",
}

vocab[5] = {
	english: "student",
	kana: "がくせい",
	kanji: "学生",
}

vocab[6] = {
	english: "evil",
	kana: "あく",
	kanji: "悪",
}

vocab[7] = {
	english: "east",
	kana: "ひがし",
	kanji: "東",
}

vocab[8] = {
	english: "north",
	kana: "きた",
	kanji: "北",
}

vocab[9] = {
	english: "south",
	kana: "みなみ",
	kanji: "南",
}

vocab[10] = {
	english: "west",
	kana: "にし",
	kanji: "西",
}

vocab[11] = {
	english: "weather",
	kana: "てんき",
	kanji: "天気",
}

vocab[12] = {
	english: "wind",
	kana: "かぜ",
	kanji: "風",
}

var troublewords = [];

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


var wordnumber = 0;
var remaining = vocab.length;


var randarray = []
//creates array of random uniques

var randomarray = function(){
 randarray = [];


	while(randarray.length < vocab.length){
  	  	var randomnumber=Math.floor(Math.random() * vocab.length)
   	 	var found=false;
   	 	for(var i=0;i<randarray.length;i++){
        	if(randarray[i]==randomnumber){
        		found=true;break
        }
  	  }
  	  if(!found)randarray[randarray.length]=randomnumber;
	
	};
	console.log(randarray);
}


var newword = function(){
	if(wordnumber<randarray.length){
		document.getElementById('front').innerHTML = vocab[randarray[wordnumber]].kanji;
		document.getElementById('back').innerHTML = vocab[randarray[wordnumber]].english;
		document.getElementById('answerinput').value = '';
	}else{
		document.getElementById('answerbox').innerHTML = "Finished ";
	}
}


//animates the word bank
var nextset = function(){
	
	wordnumber += 1;
	newword();
	
	$("#position" + wordnumber).fadeOut(200, function(){
		$(".preview").animate({
			"top":"50px"
		},300);
	});
	
	var nextword = parseFloat(wordnumber + 8);
	
	window.setTimeout(function(){
		if(nextword < randarray.length){
			$("#unanswered").prepend("<div id = 'position" + nextword + "' class = 'preview' style = 'opacity:0'>" + vocab[randarray[nextword]].kanji + "</div");
			$(".preview").css("top","0px");
		}else{
			$("#unanswered").prepend("<div class = 'preview' style = 'visibility:hidden'></div");
			$(".preview").css("top","0px");
		}
	},600);
	
	window.setTimeout(function(){
		$("#position" + nextword).animate({
			"opacity":"1"
		},200);
	},700);
	
	var textinput = document.getElementById('answerinput').style.color = "grey";
	
}




//on enter of text checks if correct answer
$('#answerinput').keyup(function(event){
	if(event.keyCode == 13){
		
		var textinput = document.getElementById('answerinput');
		
		if(textinput.value.indexOf(vocab[randarray[wordnumber]].english) == -1){
		console.log("wrong");
		$("#answerbox").toggleClass("answerbox2");
		randarray.push(randarray[wordnumber]);
		troublewords.push(vocab[wordnumber]);
		textinput.style.color = "red";
		window.setTimeout(function(){nextset()},2000);
		
		//vocab.push(vocab[wordnumber]);
		}else{
			console.log("this is correct");
			textinput.style.color = "rgba(66,235,89,1)";
			window.setTimeout(function(){nextset()},500);
			remaining -= 1
			document.getElementById('highscore').innerHTML = remaining;	
		}


	}
});


//var content = '';

var wordbank = function(){
	
	randomarray();
	content = '';
	for(i=8; i>0; i--){
		content = content + "<div id = 'position" + [i] + "' class = 'preview'>" + vocab[randarray[i]].kanji + "</div>"
	}
	
	document.getElementById('unanswered').innerHTML = content;
}



var reset = function(){
	remaining = vocab.length;
	document.getElementById('highscore').innerHTML = remaining;
	
	wordbank();
	newword();
}




wordbank();
newword();
document.getElementById('highscore').innerHTML = remaining;
document.getElementById('currentscore').onclick = function(){console.log(troublewords);};





