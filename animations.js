var ciphers = new Array(
//z408		
"9%P/Z/UB%kOR=pX=BWV+eGYF69HP@K!qYeMJY^UIk7qTtNQYD5)S(/9#BPORAU%fRlqEk^LMZJdr\\pFHVWe8Y@+qGD9KI)6qX85zS(RNtIYElO8qGBTQS#BLd/P#B@XqEHMU^RRkcZKqpI)Wq!85LMr9#BPDR+j=6\\N(eEUHkFZcpOVWI5+tL)l^R6HI9DR_TYr\\de/@XJQAP5M8RUt%L)NVEKH=GrI!Jk598LMlNA)Z(PzUpkA9#BVW\\+VTtOP^=SrlfUe67DzG%%IMNk)ScE/9%%ZfAP#BVpeXqWq_F#8c+@9A9B%OT5RUc+_dYq_^SqWVZeGYKE_TYA9%#Lt_H!FBX9zXADd\\7L!=q_ed##6e5PORXQF%GcZ@JTtq_8JI+rBPQW6VEXr9WI6qEHM)=UIk",
//z408 solution
"ILIKEKILLINGPEOPLEBECAUSEITISSOMUCHFUNITISMOREFUNTHANKILLINGWILDGAMEINTHEFORRESTBECAUSEMANISTHEMOATDANGERTUEANAMALOFALLTOKILLSOMETHINGGIVESMETHEMOATTHRILLINGEXPERENCEITISEVENBETTERTHANGETTINGYOURROCKSOFFWITHAGIRLTHEBESTPARTOFITIATHAEWHENIDIEIWILLBEREBORNINPARADICESNDALLTHEIHAVEKILLEDWILLBECOMEMYSLAVESIWILLNOTGIVEYOUMYNAMEBECAUSEYOUWILLTRYTOSLOIDOWNORSTOPMYCOLLECTINGOFSLAVESFORMYAFTERLIFEEBEORIETEMETHHPITI",
// fixed "dangerous", "animal" version
// "ILIKEKILLINGPEOPLEBECAUSEITISSOMUCHFUNITISMOREFUNTHANKILLINGWILDGAMEINTHEFORRESTBECAUSEMANISTHEMOATDANGEROUSANIMALOFALLTOKILLSOMETHINGGIVESMETHEMOATTHRILLINGEXPERENCEITISEVENBETTERTHANGETTINGYOURROCKSOFFWITHAGIRLTHEBESTPARTOFITIATHAEWHENIDIEIWILLBEREBORNINPARADICESNDALLTHEIHAVEKILLEDWILLBECOMEMYSLAVESIWILLNOTGIVEYOUMYNAMEBECAUSEYOUWILLTRYTOSLOIDOWNORSTOPMYCOLLECTINGOFSLAVESFORMYAFTERLIFEEBEORIETEMETHHPITI",
//z340
"HER>pl^VPk|1LTG2dNp+B(#O%DWY.<*Kf)By:cM+UZGW()L#zHJSpp7^l8*V3pO++RK2_9M+ztjd|5FP+&4k/p8R^FlO-*dCkF>2D(#5+Kq%;2UcXGV.zL|(G2Jfj#O+_NYz+@L9d<M+b+ZR2FBcyA64K-zlUV+^J+Op7<FBy-U+R/5tE|DYBpbTMKO2<clRJ|*5T4M.+&BFz69Sy#+N|5FBc(;8RlGFN^f524b.cV4t++yBX1*:49CE>VUZ5-+|c.3zBK(Op^.fMqG2RcT+L16C<+FlWB|)L++)WCzWcPOSHT/()p|FkdW<7tB_YOB*-Cc>MDHNpkSzZO8A|K;+",
//z408 solution with symbol A = K instead of W
"ILIKEKILLINGPEOPLEBECAUSEITISSOMUCHFUNITISMOREFUNTHANKILLINGKILDGAMEINTHEFORRESTBECAUSEMANISTHEMOATDANGEROUSANIMALOFALLTOKILLSOMETHINGGIVESMETHEMOATTHRILLINGEXPERENCEITISEVENBETTERTHANGETTINGYOURROCKSOFFKITHAGIRLTHEBESTPARTOFITIATHAEKHENIDIEIKILLBEREBORNINPARADICESNDALLTHEIHAVEKILLEDKILLBECOMEMYSLAVESIKILLNOTGIVEYOUMYNAMEBECAUSEYOUKILLTRYTOSLOIDOKNORSTOPMYCOLLECTINGOFSLAVESFORMYAFTERLIFEEBEORIETEMETHHPITI"
)

var wordMask = 
"011110000000111111000000011001100001110011000011100001111111000011110011100000001111111000110001111000000000111111001110011110000000001111100111000011111111100000000011001111000000111100000001111000001110000100001110000111100110011110000100010000110000001100000000111000111011110000001111000000110000001000011100001110011110000000111000011100111100001100001100000000001100000011100111111111000000000000000000";

var cipherblock;
var cipherblock2;
var startx;
var starty;
var sizex;
var sizey;
var orange = "rgb(255,144,0)";  

var do_headers = 1;
var MS = 250;


var pt_positions = [];
/** render a cipher block, starting at the given screen position.  each cipher unit is rendered with the given size.
    example:  drawCipher(ciphers[2], 17, 25, 25, 10, 10, 2, 2, 'cipher', 'black')
*/
function drawCipher(cipher, width, szx, szy, sx, sy, gapx, gapy, id, color, drawCounter, reps, avg, count) {
	startx = sx;
	starty = sy;
	sizex = szx;
	sizey = szy;
	var cols = width;
	var rows = cipher.length/width;
	var html = ""; var html2 = "";
	var rc = "";
	var z = 0;
	
	var display = do_headers ? "" : "display: none; ";
	html += "<span class=\"h\" style=\"" + display + "color: #900; position: absolute; left: 180px; top: 5px;\">TO TIMES-HERALD</span>";
	html += "<span class=\"h\" style=\"" + display + "color: #900; position: absolute; left: 215px; top: 232px;\">TO EXAMINER</span>";
	html += "<span class=\"h\" style=\"" + display + "color: #900; position: absolute; left: 210px; top: 455px;\">TO CHRONICLE</span>";
	
	for (var row=0; row<rows; row++) {
		pt_positions[row] = [];
		for (var col=0; col<cols; col++) {
			rc = row+"_"+col;
			//rc2 = "x"+row+"_"+col;
			z--;
			var y_offset = starty;
			if (row > 7) y_offset += 40;
			if (row > 15) y_offset += 40;
			
			var left = (col+1)*gapx + col*sizex + startx; // gaps + symbols + starting offset
			var top = (row+1)*gapy + row*sizey + y_offset; // gaps + symbols + starting offset
			pt_positions[row][col] = [left, top];
			html += "<span id=\"" + rc + "\" class=\"c\" style=\"position: absolute; left: " + left + "px; top: " + top + "px; font-size: " + (sizex+10) + "px; padding: 1px 3px 1px 2px; z-index: " + z + "\">" + cipher[row*width+col] + "</span>";
			//html2 += "<span id=\"x" + rc + "\" class=\"c\" style=\"color: " + color + "; position: absolute; left: " + (left+22*sizex) + "px; top: " + top + "px; font-size: " + (sizex+10) + "px; padding: 1px 3px 1px 2px; z-index: " + z + "\">&nbsp;</span>";
		}
	}
	
	// for frequency plot
	for (var row=0; row<16; row++) {
		for (var col=0; col<54; col++) {
			rc = row+"_"+col;
			var left = (col+1)*0.5 + col*sizex + 0; // gaps + symbols + starting offset
			var top = (row+1)*0.5 + row*sizey + 20; // gaps + symbols + starting offset
			html2 += "<span id=\"x" + rc + "\" class=\"c\" style=\"color: " + color + "; position: absolute; left: " + (left+22*sizex) + "px; top: " + top + "px; font-size: " + (sizex+10) + "px; padding: 1px 3px 1px 2px; z-index: " + z + "\">&nbsp;</span>";
		}
	}
	
	// a row along the bottom (row 16) to show counts of symbols
	for (var col=0; col<54; col++) {
		var row = 16;
		rc = "" + col;
		var left = (col+1)*0.5 + col*sizex + 0; // gaps + symbols + starting offset
		var top = (row+1)*0.5 + row*sizey + 25; // gaps + symbols + starting offset
		html2 += "<span id=\"c" + rc + "\" class=\"p\" style=\"color: #090; position: absolute; left: " + (left+22*sizex) + "px; top: " + top + "px; font-size: " + (sizex+10) + "px; padding: 1px 3px 1px 2px; z-index: " + z + "; font-family: arial; font-size: 10pt; text-align: middle;\">&nbsp;&nbsp;</span>";
	}
	
	
	document.getElementById(id).innerHTML = html;
	document.getElementById("cipher2").innerHTML = html2;
	// get all the HTML elements into a 2D array for easier manipulation
	cipherblock = [];
	for (var row=0; row<rows; row++) {
		cipherblock[row] = [];
		//cipherblock2[row] = [];
		for (var col=0; col<cols; col++) {
			rc = row+"_"+col;
			rc2 = "x"+row+"_"+col;
			cipherblock[row][col] = document.getElementById(rc);
			//cipherblock2[row][col] = document.getElementById(rc2);
		}
	}         
	
	// for frequency plot
	cipherblock2 = [];
	for (var row=0; row<16; row++) {
		cipherblock2[row] = [];
		for (var col=0; col<54; col++) {
			rc2 = "x"+row+"_"+col;
			cipherblock2[row][col] = document.getElementById(rc2);
		}
	}
	
}

function resetCell(row, col) {
	var y_offset = 40;
	if (row > 7) y_offset += 40;
	if (row > 15) y_offset += 40;	
	var top = (row+1)*2 + row*21 + y_offset; // gaps + symbols + starting offset
	var elem = document.getElementById(row+"_"+col);
	elem.className = "c";
	elem.style.top = top;
	elem.innerHTML = ciphers[0][row*17+col];	
}

/** render a cipher block by putting all symbols in a pile, then animating moving them into position 
    example: animatePile(ciphers[2], 17, 25, 25, 200, 200, 10, 10, 2, 2, 'cipher', 200,1)
*/
function animatePile(cipher, width, sizex, sizey, startx, starty, endx, endy, gapx, gapy, id, steps, ms) {
	var cols = width;
	var rows = cipher.length/width;
	var html = "";
	var rc = "";
	var z = 0;
	
	var pos = [];
	var delta = [];
	var stepsArr = [];
	var stepsMax = 0;
	
	for (var row=0; row<rows; row++) {
		pos[row] = [];
		delta[row] = [];
		stepsArr[row] = [];
		for (var col=0; col<cols; col++) {
			rc = row+"_"+col;
			z--;
			var left = startx;
			var top = starty;
			pos[row][col] = new Array(top, left);
			stepsArr[row][col] = steps + 25*(1-2*Math.random());
			stepsMax = Math.max(stepsMax, stepsArr[row][col]);
			
			var endyRelative = (row+1)*gapy + row*sizey + endy;
			var endxRelative = (col+1)*gapx + col*sizex + endx;
			
			var dx = (endxRelative-startx)/stepsArr[row][col];
//			console.log(endxRelative + "," + startx + "," + steps + ":" + dx);
			
			var dy = (endyRelative-starty)/stepsArr[row][col];
			delta[row][col] = new Array(dy, dx);
			html += "<span id=\"" + rc + "\" class=\"c\" style=\"position: absolute; left: " + left + "px; top: " + top + "px; font-size: " + (sizex+10) + "px; z-index: " + z + "; color: white;\">" + cipher[row*width+col] + "</span>";
		}
	}
	console.log(pos); 
	console.log(delta);
	console.log(stepsArr);
	document.getElementById(id).innerHTML = html;
	
  var id = setInterval(frame, ms);
  var count = 0;
  function frame() {
		var color = parseInt(255 - count/stepsMax * 255);
//		console.log("color " + color);
		for (var row=0; row<rows; row++) {
			for (var col=0; col<cols; col++) {
				rc = row+"_"+col;
				var e = document.getElementById(rc);
				var top = parseFloat(e.style.top);
				var left = parseFloat(e.style.left);
				e.style.top = top + delta[row][col][0];
				e.style.left = left + delta[row][col][1];
				var rgb = "rgb(" + color + ", " + color + ", " + color + ")";
				e.style.color = rgb;
//				console.log(row+"_"+col + ": " + rgb);
			}
		}
		count++;
		if (count == stepsMax) clearInterval(id);
//		console.log(count);
	}
}

// randomly fade in cipher
function fadeIn(ms) {
	// array of random steps
	steps = [];
	var rows = cipherblock.length;
	var cols = cipherblock[0].length;
	for (var row=0; row<rows; row++) {
		steps[row] = [];
		for (var col=0; col<cols; col++) {
			steps[row][col] = Math.max(Math.random()/20, 0.02);
			cipherblock[row][col].style.opacity = 0;
		}
	}
	
	var total = cipherblock.length * cipherblock[0].length;
	var completed = 0;
	
	var id = setInterval(frame, ms);
	var count = 0;
	var opacity;
	function frame() {
		for (var row=0; row<rows; row++) {
			for (var col=0; col<cols; col++) {
				opacity = parseFloat(cipherblock[row][col].style.opacity);
				if (opacity >= 1) continue; // already finished this one
				opacity += steps[row][col];
				if (opacity >= 1) {
					opacity = 1;
					completed++;
				}
				cipherblock[row][col].style.opacity = opacity;
			}
		}
		if (completed == total) {
			clearInterval(id);
		}
	}
}

// randomly fade in cipher, with blur too
function fadeInWithBlur(ms, startBlur) {
	// array of random steps
	steps = [];
	var rows = cipherblock.length;
	var cols = cipherblock[0].length;
	for (var row=0; row<rows; row++) {
		steps[row] = [];
		for (var col=0; col<cols; col++) {
			steps[row][col] = Math.max(Math.random()/30, 0.01);
			cipherblock[row][col].style.opacity = 0;
			if (row<50){
				cipherblock[row][col].style.color = "transparent";
				cipherblock[row][col].style.textShadow = "0 0 " + startBlur + "px black";
			}
		}
	}
	var total = cipherblock.length * cipherblock[0].length;
	var completed = 0;
	console.log("got here");
	var id = setInterval(frame, ms);
	var count = 0;
	var opacity; var blur;
	function frame() {
		for (var row=0; row<rows; row++) {
			for (var col=0; col<cols; col++) {
				console.log(row+","+col);
				opacity = parseFloat(cipherblock[row][col].style.opacity);
				if (opacity >= 1) continue; // already finished this one
				opacity += steps[row][col];
				if (opacity >= 1) {
					opacity = 1;
					completed++;
				}
				cipherblock[row][col].style.opacity = opacity;
				// blur radius is in range [0,startBlur]
				if (row<50){
					cipherblock[row][col].style.textShadow = "0 0 " + (startBlur-opacity*startBlur) + "px black";
//					console.log(row+","+col+","+cipherblock[row][col].style.textShadow);
				}
			}
		}
		if (completed == total) {
			clearInterval(id);
			document.getElementById("b2").innerHTML = "Done";
		}
	}
}

// randomly fade out cipher in random directions
// startx, starty: upper left corner of cipher block.
function fadeOutRandom(ms) {
	hideButtons();
	// array of random steps (delta y, delta x)
	steps = [];
	positions = [];
	blurs = [];
	sizes = [];
	var rows = cipherblock.length;
	var cols = cipherblock[0].length;
	var slope;
	var centerx = cols*sizex/2 + startx;
	var centery = rows*sizey/2 + starty;
	var d;
	var dx, dy;
	for (var row=0; row<rows; row++) {
		steps[row] = [];
		positions[row] = [];
		blurs[row] = [];
		sizes[row] = [];
		for (var col=0; col<cols; col++) {
			x = parseInt(cipherblock[row][col].style.left);
			y = parseInt(cipherblock[row][col].style.top);
			if (centerx-x == 0) slope = 1;
			else slope = (centery-y)/(centerx-x);
			dx = 0;
			dy = 0;
			while (Math.abs(dx+dy) < 1) {
				dx = parseInt(Math.random()*9)-4;
				dy = parseInt(Math.random()*9)-4;
			}
			steps[row][col] = [dy, dx];
			positions[row][col] = [y, x];
			blurs[row][col] = 0;
//			sizes[row][col] = 1+parseInt(Math.random()*7);
			
			cipherblock[row][col].style.color = "transparent";
			cipherblock[row][col].style.textShadow = "0 0 0px black";
		}
	}
	console.log("got here");
	var id = setInterval(frame, ms);
	var count = 0;
	var opacity; var blur;
	var factor1 = 0.25;
	var factor2 = 1.11;
	var color = 0;
	function frame() {
		for (var row=0; row<rows; row++) {
			for (var col=0; col<cols; col++) {
				var y = positions[row][col][0];
				var x = positions[row][col][1];
				dy = steps[row][col][0]*factor1;
				dx = steps[row][col][1]*factor1;
				y += dy;
				x += dx;
				
//				blurs[row][col] = Math.min(30, blurs[row][col]+Math.random()/2);
				blurs[row][col] = Math.min(50, blurs[row][col]+0.75);
				//sizes[row][col]+=Math.random()*4;
				
//				console.log(y+","+x+","+row+","+col+","+steps[row][col]+","+factor1+","+factor2);
				cipherblock[row][col].style.top = y + "px";
				cipherblock[row][col].style.left = x + "px";
				positions[row][col] = [y, x];
				cipherblock[row][col].style.textShadow = "0 0 "+blurs[row][col]+"px rgb("+color+","+color+","+color+")";
//				cipherblock[row][col].style.fontSize = (parseInt(cipherblock[row][col].style.fontSize) + sizes[row][col])+"px";
			}
		}
		if (factor1 >= 1.0) {
			factor1 = 1.0;
		} else {
			factor1 *= factor2;
		}
		color+=1.25;
	}
}
function hideButtons() {
	document.getElementById("buttons").style.display="none";
}
function showButtons() {
	document.getElementById("buttons").style.display="";
}

function fadeOutRandomButton(ms) {
	hideButtons();
	setTimeout(function() {fadeOutRandom(ms)}, 1000);
}

function decodeAnimationButton(ms) {
	hideButtons();
	setTimeout(function() {decodeAnimation(ms)}, 1000);
}

function decodeAnimation(ms) {
	var state = []; // state[row][col] = [isDecoded (0,1), fontSize, blurSize]
	var rows = cipherblock.length;
	var cols = cipherblock[0].length;
	for (var row=0; row<24; row++) {
		state[row] = [];
		for (var col=0; col<17; col++) {
			state[row][col] = [0, 40, 30];
		}
	}
	var id = setInterval(frame, ms);
	var total = 0;
	function frame() {
		var count = 0;
		var s;
		for (var row=0; row<rows; row++) {
			for (var col=0; col<cols; col++) {
				s = state[row][col];
				if (!s[0] && !count) {
					decodeCell(row, col, s);
					count++;
//					console.log(count+","+s);
				} else if (s[0]){
					decodeCell(row, col, s);
					if (s[1] > 31) s[1]--;
					if (s[2] > 0) s[2]--;
//					console.log(count+","+s);
				}
			}
		}
		total++;
		if (total == 100) clearInterval(id);
//		clearInterval(id);
//		if (ms > 10) ms = ms - 1;
//		id = setInterval(frame, ms)
	}

}
function decodeCellImmediate(row, col) {
		var pt = ciphers[1][row*17+col];
		var e = cipherblock[row][col];
		var cl = "pt";
		var top = parseInt(e.style.top);
		e.style.top = (top - 3) + "px";
		e.innerHTML = '<div class="'+cl+'">' + pt + "</div>";
}

function decodeCellRandomPt(rc) {
	var row = rc[0];
	var col = rc[1];           
	var alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var pt = alpha[parseInt(Math.random()*alpha.length)];
	
	var e = cipherblock[row][col];
	var cl = "pt";

	e.style.backgroundColor="";
	var color = "rgba(0,140,0,0.33)";
	e.className = cl;
	e.innerHTML = pt;
	e.style.color=color;
	e.style.position="absolute";
	e.style.left = pt_positions[row][col][0];
	e.style.top = pt_positions[row][col][1]-9;
}

function decodeCellAnimation(rc, ms) {
	var row = rc[0];
	var col = rc[1];
	// console.log(row+","+col);
	var pt = ciphers[1][row*17+col];
	var e = cipherblock[row][col];
	var cl = "pt";
	var top = parseInt(e.style.top);

	var step = 0;
	var id = setInterval(frame, ms);
	e.style.backgroundColor="";
	function frame() {
		var alpha = (255 - 20*(9-step))/255;
		var color = "rgba(0,140,0," + alpha+")";
		if (step == 0) {
			e.style.color="rgba(255,255,255,0)";
		}
		e.className = cl+step;
		e.innerHTML = pt;
		e.style.color=color;
		e.style.top = (top - 9) + "px";
		step++;
		if (step == 10) clearInterval(id);
	}
}

function decodeCellAnimationSmooth(rc) {
	var row = rc[0];
	var col = rc[1];
	var pt = ciphers[1][row*17+col];

	var e = cipherblock[row][col];
	e.innerHTML = pt;
	var top = parseInt(e.style.top);
	e.style.top = (top - 9) + "px";
	e.style.backgroundColor="";
	e.className = "pt-animated";
}


function decodeCell(row, col, s) {
	var pt = ciphers[1][row*17+col];
//	var html = "<span style=\"position: relative; top: -7px; color: white; background-color: black; font-size: 31px; font-weight: bold; font-family: 'courier new', monospace;\">" + pt + "</span>";
//	cipherblock[row][col].innerHTML = html;
	var e = cipherblock[row][col];
//	e.style.fontFamily="courier new";
//	e.style.fontFamily="work sans";
//	e.style.fontWeight="bold";      
	var cl = "pt";
	e.innerHTML = '<div class="'+cl+'">' + pt + "</div>";
//	e.style.fontSize = s[1] + "px";
//	e.style.color = "#090";
	if (!s[0]) {
		var top = parseInt(e.style.top);
		e.style.top = (top - 3) + "px";
		s[0] = 1;
	}
	cipherblock[row][col].style.color = "transparent";
	cipherblock[row][col].style.textShadow = "0 0 " + s[2] + "px #090";
	
//	e.style.position = "relative";
//	e.style.top = "-7px";
//	e.style.border = "thin solid black";
//	e.style.padding = "0 0 0 0px";
}

quote_block = [];
var quote = [
"ONE OF THE MOST SINGULAR CHARACTERISTICS",
"OF THE ART OF DECIPHERING IS THE STRONG",
"CONVICTION POSSESSED BY EVERY PERSON,",
"EVEN MODERATELY ACQUAINTED WITH IT, THAT",
"HE IS ABLE TO CONSTRUCT A CIPHER WHICH",
"NOBODY ELSE CAN DECIPHER. I HAVE ALSO",
"OBSERVED THAT THE CLEVERER THE PERSON,",
"THE MORE INTIMATE IS HIS CONVICTION."];
var quoteLine = "ONEOFTHEMOSTSINGULARCHARACTERISTICSOFTHEARTOFDECIPHERINGISTHESTRONGCONVICTIONPOSSESSEDBYEVERYPERSONEVENMODERATELYACQUAINTEDWITHITTHATHEISABLETOCONSTRUCTACIPHERWHICHNOBODYELSECANDECIPHERIHAVEALSOOBSERVEDTHATTHECLEVERERTHEPERSONTHEMOREINTIMATEISHISCONVICTION";
var quoteLine2 = "";
for (var i=0; i<quote.length; i++) quoteLine2 += quote[i];
var quoteShuffled = "O PIET SRO OIVHTEO CONSONRW TUROTISA C A INCET  NTNORLSTEWIHATE SO ES NIMHLS CLADUM SERNHBREAS .VE HEEMIQTHH LH  DCCSVTAACEMDEA E AHINBCEVRUEDCS CPIDO ENE RFTSOTTIOINSITO. NRV EYHAOPOIPTEIYEGTT  CDYLTHTTHIFIECNBTSC H PH IEEPO,IAORRAGI H RETRNHCHAALRT ESE ,ONRDG VC AO EETTI RH ISSEEBFN YESN IS VEERCETOE,O";
var quoteShuffledLine = "OPIETSROOIVHTEOCONSONRWTUROTISACAINCETNTNORLSTEWIHATESOESNIMHLSCLADUMSERNHBREASVEHEEMIQTHHLHDCCSVTAACEMDEAEAHINBCEVRUEDCSCPIDOENERFTSOTTIOINSITONRVEYHAOPOIPTEIYEGTTCDYLTHTTHIFIECNBTSCHPHIEEPOIAORRAGIHRETRNHCHAALRTESEONRDGVCAOEETTIRHISSEEBFNYESNISVEERCETOEO";

//"One of the most singular characteristics",
//"of the art of deciphering is the strong",
//"conviction possessed by every person,",
//"even moderately acquainted with it, that",
//"he is able to construct a cipher which",
//"nobody else can decipher. I have also",
//"observed that the cleverer the person,",
//"the more intimate is his conviction."];

function drawQuote(drawCounter, reps, avg, count) {
	var startX = 50;
	var startY = 40;
	var cellSizeX = 21;
	var cellSizeY = 31;
	var fontSize = 30;

	var html = "";
	for (var row=0; row<quote.length; row++) {
		for (var col=0; col<quote[row].length; col++) {
			var y = startY+row*cellSizeY;
			var x = startX+col*cellSizeX;
			var id = "q"+row+"_"+col;
			var q = quote[row][col];
			if (q == " ") q = "&nbsp;"
			html += "<span id=\"" + id + "\" style='position: absolute; left: " + x + "px; top: " + y + "px; font-family: courier; font-weight: bold; font-size: " + fontSize + "px; padding: 3px 2px 4px 2px; line-height: 0.8'>" + q + "</span>";
		}
	}
	document.getElementById("cipher").innerHTML = html;
	for (var row=0; row<quote.length; row++) {
		quote_block[row] = [];
		for (var col=0; col<quote[row].length; col++) {
			var id = "q"+row+"_"+col;
			quote_block[row][col] = document.getElementById(id);
		}
	}
	var counts = document.getElementById("counter");
	if (drawCounter) {
		counts.innerHTML = "REPEATS: <span style='color: red; font-family: \"Work Sans\"; font-size: 40px'>" + reps + "</span><br>";
		counts.innerHTML += "AVERAGE REPEATS: <span style='color: red; font-family: \"Work Sans\"; font-size: 40px'>" + avg.toFixed(2) + "</span><br>";
		counts.innerHTML += "TOTAL SHUFFLES: <span style='color: red; font-family: \"Work Sans\"; font-size: 40px'>" + numberWithCommas(count)  + "</span>"
		counts.style.fontFamily = "Work Sans";
		counts.style.position = "absolute";
		counts.style.top = "300px";
		counts.style.left = "50px";
		counts.style.fontSize = "40px";
		counts.style.color = "#6aa84f";
	}  else counts.innerHTML = "";
}

function drawGraph(x, y) {
//	var x = [];
//	for (var i = 0; i < 500; i ++) {
//		x[i] = Math.random();
//	}

	var trace = {
	    x: x,
		y: y,
	    type: 'bar',
	  };
	var data = [trace];
	Plotly.newPlot('myDiv', data);
}

function qHighlight(index, color) {
	var e = quote_block[index[0]][index[1]];
	e.style.backgroundColor=color;
}
function qClearAll() {
	for (var row=0; row<quote_block.length; row++) {
		for (var col=0; col<quote_block[row].length; col++) {
			qHighlight([row, col], "white");
		}
	}
}

function qCountBigrams(bigram, ms) {
	var id = setInterval(frame, ms);
	index = [0,0];
	var reps = 0;
	function frame() {
		var next = nextBigram(bigram, index);
//		console.log("next " + next);
		if (next == null) {
			clearInterval(id);
		} else {
			var color = reps == 0 ? "#f90" : "#0ff";
			qHighlight(next[0], color);
			qHighlight(next[1], color);
			var counts = document.getElementById("counter");
			counts.innerHTML = "REPEATS: <span style='color: red; font-family: \"Work Sans\"; font-size: 40px'>" + reps + "</span>";
			reps++;
		}
	}
}

function qCountBigramsAll(ms) {
	var allCounts = [];
	for (var i=0; i<quoteLine.length-1; i++) {
		var bigram = quoteLine.substring(i,i+2);
		if (allCounts[bigram]) allCounts[bigram]++;
		else allCounts[bigram] = 1;
	}
	var bigramQueue = [];
	for (var key in allCounts) {
		if (allCounts[key] > 1) {
			bigramQueue[bigramQueue.length] = key;
			console.log(key + " " + (allCounts[key]-1));
		}
	}
	console.log(bigramQueue);
	var index = 0;
	var id = setTimeout(frame, ms);
	var totalReps = 0;
	function frame() {
		if (index == bigramQueue.length) {
			qClearAll();
			//var counts = document.getElementById("bigram");
			//counts.innerHTML = "";
			clearInterval(id);
		} else {
			// clear all highlights
			qClearAll();
			// find and highlight all occurrences of the bigram 
			var bg = bigramQueue[index++];
			var bigrams = allBigrams(bg);
			if (bigrams != null) {
				totalReps += bigrams.length-1;
				for (var i=0; i<bigrams.length; i++) {
					var color = i == 0 ? "#f90" : "#0ff";
					qHighlight(bigrams[i][0], color);
					qHighlight(bigrams[i][1], color);
				}
			}
			
			var counts = document.getElementById("counter");
			counts.innerHTML = "TOTAL REPEATS: <span style='color: red; font-family: \"Work Sans\"; font-size: 40px'>" + totalReps + "</span>";
			counts.style.fontFamily = "Work Sans";
			counts.style.position = "absolute";
			counts.style.top = "370px";
			counts.style.left = "360px";
			counts.style.fontSize = "40px";
			counts.style.color = "#6aa84f";
			
			var counts = document.getElementById("bigram");
			counts.innerHTML = "BIGRAM: <span style='color: red; font-family: \"Work Sans\"; font-size: 40px'>" + bg + "</span>";
			counts.style.fontFamily = "Work Sans";
			counts.style.position = "absolute";
			counts.style.top = "370px";
			counts.style.left = "50px";
			counts.style.fontSize = "40px";
			counts.style.color = "#6aa84f";
			ms /= 1.2;
			if (ms < 75) ms = 75;
			setTimeout(frame, ms);
		}
	}
}


// return indices of next occurrence of the given bigram.
// null if it can't be found.
function nextBigram(bigram, index) {
	while (true) {
		var start1 = nextUnigram(bigram[0], index, true);
		if (start1 == null) return null;
		var inc = increment(index);
		if (!inc) return null;
		var start2 = nextUnigram(bigram[1], index, false)
		if (start2 != null) return [start1, start2];
	}
}

// return indices of all occurrences of the given bigram
function allBigrams(bigram) {
	var result = [];
	var index = [0,0];
	while (true) {
		var found = nextBigram(bigram, index);
		if (found == null) break;
		result[result.length] = found;
		if (!increment(index)) break;
	}
	return result;
}

// return index of start of next occurrence of the given unigram.
// null if it can't be found.
function nextUnigram(unigram, index, skip) {
	var inc = true;
	var row, col,q;
	while (inc) {
		row = index[0];
		col = index[1];
		q = quote[row][col];
		if (q == unigram) return [row, col];
		if (!skip) {
			var isAlpha = /[A-Z]/.test(q);
			if (isAlpha) return null;
		}
		inc = increment(index);
	}
	return null;
}

function increment(index) {
	index[1]++;
	if (index[1] >= quote[index[0]].length) {
		if (index[0] == quote.length-1) return false;
		index[0]++;
		index[1] = 0;
	}
	return true;
}

function qCountBigramsAllButton(ms) {
	hideButtons();
	var counts = document.getElementById("counter");
	counts.innerHTML = "TOTAL REPEATS: <span style='color: red; font-family: \"Work Sans\"; font-size: 40px'>0</span>";
	counts.style.fontFamily = "Work Sans";
	counts.style.position = "absolute";
	counts.style.top = "370px";
	counts.style.left = "360px";
	counts.style.fontSize = "40px";
	counts.style.color = "#6aa84f";
	
	setTimeout(function() {qCountBigramsAll(ms)}, 1000);
}

function qShuffle(ms) {
	var id = setTimeout(frame, ms);
	function frame() {
		// pick two random spots and swap them
		//var row1 = 0; 
		//var row2 = 0; 
		//var col1 = 0; 
		//var col2 = 0;
		//while (col1 == col2 && row1 == row2) {
		//	row1 = parseInt(Math.random()*quote.length);
		//	col1 = parseInt(Math.random()*quote[row1].length);
		//	row2 = parseInt(Math.random()*quote.length);
		//	col2 = parseInt(Math.random()*quote[row2].length);
		//}
		//var c1 = quote[row1][col1];
		//var c2 = quote[row2][col2];
		//console.log(row1+","+col1+","+row2+","+col2+","+c1+","+c2);
		//quote[row1] = quote[row1].replaceAt(col1, c2);
		//quote[row2] = quote[row2].replaceAt(col2, c1);
		//console.log(quote[row1]);
		//console.log(quote[row2]);
		ms = ms * 1.2;
		quoteLine2 = shuffle(quoteLine2);
		if (ms >= 1000) {
			quoteLine2 = quoteShuffled;
			quoteLine = quoteShuffledLine;
		}
		quoteConvert(quoteLine2);
		drawQuote(false);
		console.log(ms);
		if (ms < 1000) 
			setTimeout(frame, ms);
	}		
}

function qShuffleAverage(ms) {
	var id = setInterval(frame, ms);
	var counter = 0;
	var allCounts;
	var reps = 0;
	var total = 0;
	var min = 100000;
	var max = 0;
	var x = []; var y = [];
	for (var i=80; i<=115; i++) {
		x[i-80] = i;
		y[i-80] = 0;
	}
	function frame() {
		quoteLine2 = shuffle(quoteLine2);
		quoteConvert(quoteLine2);
		quoteLine3 = quoteLine2.replace(/[^A-Z]/g, "");
		
		allCounts = [];
		for (var i=0; i<quoteLine3.length-1; i++) {
			var bigram = quoteLine3.substring(i,i+2);
			if (allCounts[bigram]) allCounts[bigram]++;
			else allCounts[bigram] = 1;
		}
		reps = 0;
		for (var key in allCounts) {
			reps += allCounts[key] - 1;
//			console.log(key+" " + (allCounts[key]-1));
		}
		min = Math.min(min, reps);
		max = Math.max(max, reps);
		console.log(min + " " + max);
		total += reps;
		counter++;
		y[reps-80]++;
		console.log(x);
		if (counter % 100 == 0) {
			drawQuote(true, reps, parseInt(100*total/counter)/100, counter);
			drawGraph(x, y);
		}
		if (counter == 1000000)
			clearInterval(id);
	}		
}

function shuffle(str) {
	var a = Array.from(str);
	for (var i=str.length-1; i>= 1; i--) {
		var j = parseInt(Math.random()*(i+1));
		var tmp = a[j];
		a[j] = a[i];
		a[i] = tmp;
	}
	var result = "";
	for (var i=0; i<a.length; i++) result += a[i];
	return result;
}

function quoteConvert(str) {
	var index = 0;
	for (var i=0; i<quote.length; i++) {
		quote[i] = str.substring(index, index+quote[i].length);
		index += quote[i].length;
	}
}

String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function cipherHighlight(index, color) {
	var e = cipherblock[index[0]][index[1]];
	e.style.backgroundColor=color;
//	e.style.color="black";
//	e.style.transform="scale(1.25,1.25)";
}
function cipherHighlight2(index, color) {
	var e = cipherblock[index[0]][index[1]];
	e.style.backgroundColor=color;
	e.style.color="#777";
}
function cipherHighlightSmooth(index, color_number) {
	var e = cipherblock[index[0]][index[1]];
	e.className = "";
	e.backgroundColor = orange;
	e.className = "ct-animated-" + color_number;
}

function cipherClearAll() {
	for (var row=0; row<cipherblock.length; row++) {
		for (var col=0; col<cipherblock[row].length; col++) {
			cipherHighlight2([row, col], "white");
		}
	}
}

function cipherHighlightBigramsAll(bigram, which) {
	var index = 0;
	var found = false;
	var id = setInterval(frame, 1000);
	var reps = 0;
	function frame() {
		index = ciphers[which].indexOf(bigram, index);
		if (index == -1) {
			clearInterval(id);
			return;
		}
		var color = "#f90";
		if (found) color = "#0ff";
		else found = true;
		var row1 = parseInt(index / cipherblock[0].length);
		var col1 = index % cipherblock[0].length;
		var row2 = parseInt((index+1) / cipherblock[0].length);
		var col2 = (index+1) % cipherblock[0].length;
		cipherHighlight([row1, col1], color);
		cipherHighlight([row2, col2], color);
		index++;
		
		var counts = document.getElementById("counter");
		counts.innerHTML = "REPEATS: <span style='color: red; font-family: \"Work Sans\"; font-size: 40px'>" + reps + "</span><br>";
		counts.style.fontFamily = "Work Sans";
		counts.style.position = "absolute";
		counts.style.top = "300px";
		counts.style.left = "750px";
		counts.style.fontSize = "40px";
		counts.style.color = "#6aa84f";
		reps++;
	}
}

function cipherHighlightBigramsAllTotal(which) {
	
	var allCounts = [];
	for (var i=0; i<ciphers[which].length-1; i++) {
		var bigram = ciphers[which].substring(i,i+2);
		if (allCounts[bigram]) allCounts[bigram]++;
		else allCounts[bigram] = 1;
		console.log("bigram " + bigram + " " + allCounts[bigram]);
	}
	var bigramQueue = []; var seen = [];
	for (var pos=0; pos<ciphers[which].length-1; pos++) {
		var key = ciphers[which].substring(pos,pos+2);
		if (seen[key]) continue;
		if (allCounts[key] > 1) {
			bigramQueue[bigramQueue.length] = key;
			seen[key] = true;
			console.log(key + " " + (allCounts[key]-1));
		}
	}
	
	var index = 0;
	var ms = 1000;
	var id = setTimeout(frame, ms);
	var reps = 0;
	function frame() {
		cipherClearAll();
		if (index == bigramQueue.length) {
			return;
		}
		var bigram = bigramQueue[index];
		var pos = 0;
		var found = false;
		while (true) {
			pos = ciphers[which].indexOf(bigram, pos);
			if (pos == -1) break;
			var color = "#f90";
			if (found) color = "#0ff";
			else found = true;
			var row1 = parseInt(pos / cipherblock[0].length);
			var col1 = pos % cipherblock[0].length;
			var row2 = parseInt((pos+1) / cipherblock[0].length);
			var col2 = (pos+1) % cipherblock[0].length;
			cipherHighlight([row1, col1], color);
			cipherHighlight([row2, col2], color);
			pos++;
		}
		index++;
		reps += allCounts[bigram]-1;
		var counts = document.getElementById("counter");
		counts.innerHTML = "TOTAL REPEATS: <span style='color: red; font-family: \"Work Sans\"; font-size: 40px'>" + reps + "</span><br>";
		counts.style.fontFamily = "Work Sans";
		counts.style.position = "absolute";
		counts.style.top = "300px";
		counts.style.left = "750px";
		counts.style.fontSize = "40px";
		counts.style.color = "#6aa84f";
		
		var counts = document.getElementById("bigram");
		counts.innerHTML = "BIGRAM: <span style='color: red; font-family: \"Work Sans\"; font-size: 40px'><span id='bg'>" + bigram + "</span></span>";
		counts.style.fontFamily = "Work Sans";
		counts.style.position = "absolute";
		counts.style.top = "250px";
		counts.style.left = "750px";
		counts.style.fontSize = "40px";
		counts.style.color = "#6aa84f";

		
		ms = ms / 1.1;
		if (ms < 100) ms = 100;
		setTimeout(frame, ms);
	}
}
function cipherShuffleAverageButton(which, ms) {
	setTimeout(function() {
		cipherShuffleAverage(which, ms)	
	}, 2000);
}
function cipherShuffleAverage(which, ms) {
	drawCipher(ciphers[which], 17, 23, 23, 100, 30, 2, 2, 'cipher', '#777', true, 0, 0, 0);
	document.getElementById("myDiv").innerHTML = "";
	var id = setInterval(frame, ms);
	var counter = 0;
	var allCounts;
	var reps = 0;
	var total = 0;
	var min = 100000;
	var max = 0;
	var x = []; var y = [];
	for (var i=5; i<=(which==0 ? 50 : 40); i++) {
		x[i-5] = i;
		y[i-5] = 0;
	}
	function frame() {
		cipher = shuffle(ciphers[which]);
		
		allCounts = [];
		for (var i=0; i<cipher.length-1; i++) {
			var bigram = cipher.substring(i,i+2);
			if (allCounts[bigram]) allCounts[bigram]++;
			else allCounts[bigram] = 1;
		}
		reps = 0;
		for (var key in allCounts) {
			reps += allCounts[key] - 1;
//			console.log(key+" " + (allCounts[key]-1));
		}
		min = Math.min(min, reps);
		max = Math.max(max, reps);
		console.log(min + " " + max);
		total += reps;
		counter++;
		y[reps-5]++;
//		console.log(x);
		if (counter % 100 == 0) {
			//drawQuote(true, reps, parseInt(100*total/counter)/100, counter);
			ciphers[which] = cipher;
			drawCipher(ciphers[which], 17, 23, 23, 100, 30, 2, 2, 'cipher', '#777', true, reps, parseInt(100*total/counter)/100, counter)
			drawGraph(x, y);
		}
		if (counter >= 1000000) {
			clearInterval(id);
			if (which != 2) cipherShuffleAverageButton(2, 0);
			return;
		}
	}		
}

function testCiphersAverageButton(ms) {
	setTimeout(function() {
		testCiphersAverage(ms)	
	}, 2000);
}
function testCiphersAverage(ms) {
	which = 0;
	drawCipher(testCiphers[which], 17, 23, 23, 100, 30, 2, 2, 'cipher', '#777', true, 0, 0, 0);
	document.getElementById("myDiv").innerHTML = "";
	var id = setInterval(frame, ms);
	var counter = 0;
	var allCounts;
	var reps = 0;
	var total = 0;
	var min = 100000;
	var max = 0;
	var graphAdjust = 15;
	var x = []; var y = [];
	for (var i=graphAdjust; i<=65; i++) {
		x[i-graphAdjust] = i;
		y[i-graphAdjust] = 0;
	}
	function frame() {
		cipher = testCiphers[which];
		
		allCounts = [];
		for (var i=0; i<cipher.length-1; i++) {
			var bigram = cipher.substring(i,i+2);
			if (allCounts[bigram]) allCounts[bigram]++;
			else allCounts[bigram] = 1;
		}
		reps = 0;
		for (var key in allCounts) {
			reps += allCounts[key] - 1;
//			console.log(key+" " + (allCounts[key]-1));
		}
		min = Math.min(min, reps);
		max = Math.max(max, reps);
		console.log(min + " " + max);
		total += reps;
		counter++;
		y[reps-graphAdjust]++;
//		console.log(x);
		if (counter % 1 == 0) {
			drawCipher(testCiphers[which++], 17, 23, 23, 100, 30, 2, 2, 'cipher', '#777', true, reps, parseInt(100*total/counter)/100, counter)
			drawGraph(x, y);
		}
		if (which == testCiphers.length) {
			clearInterval(id);
			return;
		}
	}		
}

// symbol counts
var symbolCounts = [];
           
// histogram formed by the actual symbols
// x axis has 54 possible symbols
// y axis can reach a max height of 16 (since backwards q has max frequency of 16)
function reading(ms) {
	var alpha = []; // transparency values
	for (var r = 0; r<cipherblock.length; r++) {
		alpha[r] = [];
		for (var c = 0; c<cipherblock[0].length; c++) {
			alpha[r][c] = 0;
		}
	}                        

	var alpha2 = []; // background values
	for (var r = 0; r<cipherblock2.length; r++) {
		alpha2[r] = [];
		for (var c = 0; c<cipherblock2[0].length; c++) {
			alpha2[r][c] = [255,144,0];
		}
	}
	
	var row = 0; var col = 0;
	var fade = 0.35;
	var read = true;
	var id = setInterval(frame, ms);
	var pos = 0;
	function frame() {
		if (read) {
			alpha[row][col] = 1.0;                                             
			
			// current symbol
			var symbol = cipherblock[row][col].innerHTML;
			
			// find symbol in the frequency grid.  if can't find, add to first empty column.
			for (var col2=0; col2<54; col2++) {
				var symbol2 = cipherblock2[15][col2].innerHTML;
				if (symbol == symbol2) {
					// find first unused row
					for (var row2=14; row2>=0; row2--) {
						if (cipherblock2[row2][col2].innerHTML == '&nbsp;') {
							cipherblock2[row2][col2].innerHTML = symbol;
							cipherblock2[row2][col2].style.color="#000";
							alpha2[row2][col2] = [255,144,0];
							symbolCounts[col2]++;
							updateCount(col2);
							break;
						}
					}  
					break;
				} else if (symbol2 == '&nbsp;') {  // if we got to an empty cell, then we didn't find a match
					cipherblock2[15][col2].innerHTML = symbol;
					cipherblock2[15][col2].style.color="#000";
					alpha2[15][col2] = [255,144,0];
					symbolCounts[col2] = 1;
					updateCount(col2);
					break;
				}
			}
		}
		for (var r = 0; r<cipherblock.length; r++) {
			for (var c = 0; c<cipherblock[0].length; c++) {
				var a = alpha[r][c];
				if (a > 0.05) {
					//if (r == 0 && c == 0) console.log("a: " + a);
					cipherblock[r][c].style.color = "rgba(0, 0, 0, " + a + ")";
					// a: [1, 0.1)
					// font: [0, 119]
					var color = 119*(1-a)/0.9;
					color = parseInt(color);
					//cipherblock2[r][c].style.color = "rgb(" + color + ", " + color + ", " + color + ")";
				}
				cipherblock[r][c].style.backgroundColor = "rgba(255, 144, 0, " + a + ")";
				//cipherblock2[r][c].style.backgroundColor = "rgba(255, 144, 0, " + a + ")";
				//if (a > 0 && (r != row || c != col)) alpha[r][c]-=fade;
				if (a > 0) alpha[r][c]-=fade;
			}
		}
		var steps = 2;
		var fade1 = (255-144)/steps;
		var fade2 = 255/steps;
		// fade the frequencies grid backgrounds
		for (var r = 0; r<cipherblock2.length; r++) {
			for (var c = 0; c<cipherblock2[0].length; c++) {
				if (cipherblock2[r][c].innerHTML == '&nbsp;') continue;
				var rgb = alpha2[r][c];
				//if (a > 0.05) {
				//	cipherblock2[r][c].style.color = "rgba(0, 0, 0, " + a + ")";
				//}                                               
				cipherblock2[r][c].style.backgroundColor = "rgb("+rgb[0]+", "+rgb[1]+", "+rgb[2]+")";
				rgb[1] = Math.min(255, parseInt(rgb[1]+fade1));
				rgb[2] = Math.min(255, parseInt(rgb[2]+fade2));
			}
		}
		
		
		col++;
		if (col == cipherblock[0].length) {
			col = 0;
			row++;
		}
		if (row == cipherblock.length) read = false;
	}
}

function go() {
	reading(200);
}

function updateCount(col) {
	document.getElementById("c"+col).innerHTML = (symbolCounts[col] < 10 ? "&nbsp;&nbsp;" : "") + symbolCounts[col];
	
}

function goDecode() {                                   
	goDecodeCommon([
		[0,0], [0,1], [0,2], [0,3], [0,4], [0,5], [0,6], [0,7], [0,8], [0,9], [0,10], 
		[0,11], [0,12], [0,13], [0,14], [0,15], [0,16], [1,0], [1,1], [1,2], [1,3], 
		[1,4], [1,5], [1,6], [1,7], [1,8], [1,9], [1,10], [1,11], [1,12], [1,13], 
		[1,14], [1,15], [1,16], [2,0], [2,1], [2,2], [2,3], [2,4], [2,5], [2,6], [2,7], 
		[2,8], [2,9], [2,10], [2,11], [2,12], [2,13], [2,14], [2,15], [2,16], [3,0], 
		[3,1], [3,2], [3,3], [3,4], [3,5], [3,6], [3,7], [3,8], [3,9], [3,10], [3,11], 
		[3,12], [3,13], [3,14], [3,15], [3,16], [4,0], [4,1], [4,2], [4,3], [4,4], 
		[4,5], [4,6], [4,7], [4,8], [4,9], [4,10], [4,11], [4,12], [4,13], [4,14], 
		[4,15], [4,16], [5,0], [5,1], [5,2], [5,3], [5,4], [5,5], [5,6], [5,7], [5,8], 
		[5,9], [5,10], [5,11], [5,12], [5,13], [5,14], [5,15], [5,16], [6,0], [6,1], 
		[6,2], [6,3], [6,4], [6,5], [6,6], [6,7], [6,8], [6,9], [6,10], [6,11], [6,12], 
		[6,13], [6,14], [6,15], [6,16], [7,0], [7,1], [7,2], [7,3], [7,4], [7,5], 
		[7,6], [7,7], [7,8], [7,9], [7,10], [7,11], [7,12], [7,13], [7,14], [7,15], 
		[7,16], [8,0], [8,1], [8,2], [8,3], [8,4], [8,5], [8,6], [8,7], [8,8], [8,9], 
		[8,10], [8,11], [8,12], [8,13], [8,14], [8,15], [8,16], [9,0], [9,1], [9,2], 
		[9,3], [9,4], [9,5], [9,6], [9,7], [9,8], [9,9], [9,10], [9,11], [9,12], 
		[9,13], [9,14], [9,15], [9,16], [10,0], [10,1], [10,2], [10,3], [10,4], [10,5], 
		[10,6], [10,7], [10,8], [10,9], [10,10], [10,11], [10,12], [10,13], [10,14], 
		[10,15], [10,16], [11,0], [11,1], [11,2], [11,3], [11,4], [11,5], [11,6], 
		[11,7], [11,8], [11,9], [11,10], [11,11], [11,12], [11,13], [11,14], [11,15], 
		[11,16], [12,0], [12,1], [12,2], [12,3], [12,4], [12,5], [12,6], [12,7], 
		[12,8], [12,9], [12,10], [12,11], [12,12], [12,13], [12,14], [12,15], [12,16], 
		[13,0], [13,1], [13,2], [13,3], [13,4], [13,5], [13,6], [13,7], [13,8], [13,9], 
		[13,10], [13,11], [13,12], [13,13], [13,14], [13,15], [13,16], [14,0], [14,1], 
		[14,2], [14,3], [14,4], [14,5], [14,6], [14,7], [14,8], [14,9], [14,10], 
		[14,11], [14,12], [14,13], [14,14], [14,15], [14,16], [15,0], [15,1], [15,2], 
		[15,3], [15,4], [15,5], [15,6], [15,7], [15,8], [15,9], [15,10], [15,11], 
		[15,12], [15,13], [15,14], [15,15], [15,16], [16,0], [16,1], [16,2], [16,3], 
		[16,4], [16,5], [16,6], [16,7], [16,8], [16,9], [16,10], [16,11], [16,12], 
		[16,13], [16,14], [16,15], [16,16], [17,0], [17,1], [17,2], [17,3], [17,4], 
		[17,5], [17,6], [17,7], [17,8], [17,9], [17,10], [17,11], [17,12], [17,13], 
		[17,14], [17,15], [17,16], [18,0], [18,1], [18,2], [18,3], [18,4], [18,5], 
		[18,6], [18,7], [18,8], [18,9], [18,10], [18,11], [18,12], [18,13], [18,14], 
		[18,15], [18,16], [19,0], [19,1], [19,2], [19,3], [19,4], [19,5], [19,6], 
		[19,7], [19,8], [19,9], [19,10], [19,11], [19,12], [19,13], [19,14], [19,15], 
		[19,16], [20,0], [20,1], [20,2], [20,3], [20,4], [20,5], [20,6], [20,7], 
		[20,8], [20,9], [20,10], [20,11], [20,12], [20,13], [20,14], [20,15], [20,16], 
		[21,0], [21,1], [21,2], [21,3], [21,4], [21,5], [21,6], [21,7], [21,8], [21,9], 
		[21,10], [21,11], [21,12], [21,13], [21,14], [21,15], [21,16], [22,0], [22,1], 
		[22,2], [22,3], [22,4], [22,5], [22,6], [22,7], [22,8], [22,9], [22,10], 
		[22,11], [22,12], [22,13], [22,14], [22,15], [22,16], [23,0], [23,1], [23,2], 
		[23,3], [23,4], [23,5], [23,6], [23,7], [23,8], [23,9], [23,10], [23,11], 
		[23,12], [23,13], [23,14], [23,15], [23,16]]);
} 
function goDecodeCommon(cells) {
	var m = 50;
	var d = 75;
	var time = 500;
	for (var i=0; i<cells.length; i++) {
		var rc = cells[i];
		cipherHighlight(rc, orange);
		goDecodeCommon2(rc,m,time); time+=d;
	}
}
function goDecodeCommonNoHighlight(cells) {
	var m = 50;
	var d = 75;
	var time = 500;
	for (var i=0; i<cells.length; i++) {
		var rc = cells[i];
		goDecodeCommon2(rc,m,time); time+=d;
	}
}
function goDecodeCommonNoHighlightFast(cells) {
	var m = 1;
	var d = 1;
	var time = 1;
	for (var i=0; i<cells.length; i++) {
		var rc = cells[i];
		goDecodeCommon2(rc,m,time); time+=d;
	}
}
function goDecodeCommon2(rc,m,time) {
    setTimeout(function(){decodeCellAnimation(rc,m);}, time); 
}
function goHighlightCommon(cells) {
	for (var i=0; i<cells.length; i++) {
		var rc = cells[i];
		cipherHighlight(rc, orange);
	}
}
function goDecode2() {
	goDecodeCommon([[16,8],[16,9]]);
}
function goDecode3() {
	goDecodeCommon([[0,1],
		[0,8],
		[3,11]]);
}
function goDecode4() {
	goDecodeCommon([[12,7],
		[15,13],
		[15,14]]);
}
function goDecode5() {
	goDecodeCommon([[18,0],
		[19,12],
		[21,14]]);
}
function goDecode6() {
	goDecodeCommon([[21,3],
		[21,4]]);
}
function goDecode7() {
	goDecodeCommon([[3,4],
		[6,15],
		[7,4]]);
}
function goDecode8() {
	goDecodeCommon([[8,16],
		[14,6]]);
}
function goDecode9() {
	goDecodeCommon([[16,14],
		[17,8],
		[19,13]]);
}
function goDecode10() {
	goHighlightCommon([[0,5],[0,6],[0,7],[0,8]]);
	goHighlightCommon([[3,2],[3,3],[3,4],[3,5]]);
	goHighlightCommon([[7,2],[7,3],[7,4],[7,5]]);
	goHighlightCommon([[16,6],[16,7],[16,8],[16,9]]);
}
function goDecode11() {
//	goDecodeCommon([[0,5],[0,6],[0,7],[3,2],[3,3],[3,5],[7,2],[7,3],[7,5]]);
//	goDecodeCommon([[16,6],[16,7]]);
	goDecodeCommon([[0,0], [0,2], [0,3], [0,5], [0,6], [0,7], [0,16], [1,8], 
		[1,10], [2,4], [3,2], [3,3], [3,5], [3,6], [3,10], [5,5], [6,11], [6,16], 
		[7,2], [7,3], [7,5], [7,12], [8,15], [9,0], [9,1], [9,13], [11,1], [11,11], 
		[12,0], [12,5], [13,6], [13,16], [14,1], [14,5], [14,7], [14,16], [15,6], 
		[16,6], [16,7], [16,13], [16,15], [17,13], [17,15], [17,16], [18,5], [19,11], 
		[20,3], [20,5], [21,8], [22,12], [22,13], [23,4], [23,14]]);
}
function goDecode12() {
	goDecodeCommon([[0,4], [0,9], [0,10], [0,11], [2,6], [3,7], [3,8], [3,13], [4,0], [4,4], [6,0], [6,7], [7,14], [7,15], [7,16], [8,1], [9,3], [9,15], [10,0], [10,3], [10,14], [11,3], [12,4], [13,4], [13,14], [14,3], [14,15], [16,1], [16,10], [18,1], [18,4], [19,1], [21,9], [21,10], [22,0], [23,16]]);
}
function goDecode13() {

	var count = 0;
	var ms = 100;
	  var id = setInterval(frame, ms);
	  function frame() {
		var cells = [
			[0,12], [0,13], [0,14], [0,15], [1,0], [1,1], [1,2], [1,3], [1,4], [1,5], [1,6], [1,7], [1,9], [1,11], [1,12], [1,13], [1,14], [1,15], [1,16], [2,0], [2,1], [2,2], [2,3], [2,5], [2,7], [2,8], [2,9], [2,10], [2,11], [2,12], [2,13], [2,14], [2,15], [2,16], [3,0], [3,1], [3,9], [3,12], [3,14], [3,15], [3,16], [4,1], [4,2], [4,3], [4,5], [4,6], [4,7], [4,8], [4,9], [4,10], [4,11], [4,12], [4,13], [4,14], [4,15], [4,16], [5,0], [5,1], [5,2], [5,3], [5,4], [5,6], [5,7], [5,8], [5,9], [5,10], [5,11], [5,12], [5,13], [5,14], [5,15], [5,16], [6,1], [6,2], [6,3], [6,4], [6,5], [6,6], [6,8], [6,9], [6,10], [6,12], [6,13], [6,14], [7,0], [7,1], [7,6], [7,7], [7,8], [7,9], [7,10], [7,11], [7,13], [8,0], [8,2], [8,3], [8,4], [8,5], [8,6], [8,7], [8,8], [8,9], [8,10], [8,11], [8,12], [8,13], [8,14], [9,2], [9,4], [9,5], [9,6], [9,7], [9,8], [9,9], [9,10], [9,11], [9,12], [9,14], [9,16], [10,1], [10,2], [10,4], [10,5], [10,6], [10,7], [10,8], [10,9], [10,10], [10,11], [10,12], [10,13], [10,15], [10,16], [11,0], [11,2], [11,4], [11,5], [11,6], [11,7], [11,8], [11,9], [11,10], [11,12], [11,13], [11,14], [11,15], [11,16], [12,1], [12,2], [12,3], [12,6], [12,8], [12,9], [12,10], [12,11], [12,12], [12,13], [12,14], [12,15], [12,16], [13,0], [13,1], [13,2], [13,3], [13,5], [13,7], [13,8], [13,9], [13,10], [13,11], [13,12], [13,13], [13,15], [14,0], [14,2], [14,4], [14,8], [14,9], [14,10], [14,11], [14,12], [14,13], [14,14], [15,0], [15,1], [15,2], [15,3], [15,4], [15,5], [15,7], [15,8], [15,9], [15,10], [15,11], [15,12], [15,15], [15,16], [16,0], [16,2], [16,3], [16,4], [16,5], [16,11], [16,12], [16,16], [17,0], [17,1], [17,2], [17,3], [17,4], [17,5], [17,6], [17,7], [17,9], [17,10], [17,11], [17,12], [17,14], [18,2], [18,3], [18,6], [18,7], [18,8], [18,9], [18,10], [18,11], [18,12], [18,13], [18,14], [18,15], [18,16], [19,0], [19,2], [19,3], [19,4], [19,5], [19,6], [19,7], [19,8], [19,9], [19,10], [19,14], [19,15], [19,16], [20,0], [20,1], [20,2], [20,4], [20,6], [20,7], [20,8], [20,9], [20,10], [20,11], [20,12], [20,13], [20,14], [20,15], [20,16], [21,0], [21,1], [21,2], [21,5], [21,6], [21,7], [21,11], [21,12], [21,13], [21,15], [21,16], [22,1], [22,2], [22,3], [22,4], [22,5], [22,6], [22,7], [22,8], [22,9], [22,10], [22,11], [22,14], [22,15], [22,16], [23,0], [23,1], [23,2], [23,3], [23,5], [23,6], [23,7], [23,8], [23,9], [23,10], [23,11], [23,12], [23,13], [23,15]
		];
		for (var i=0; i<cells.length; i++) 
			decodeCellRandomPt(cells[i]);
		count++;
		if (count == stepsMax) clearInterval(id);
	}
}

function goDecode15() {
	goDecodeCommonNoHighlight([
		[0,12], [0,13], [0,14], [0,15], [1,0], [1,1], [1,2], [1,3], [1,4], [1,5], [1,6], [1,7], [1,9], [1,11], [1,12], [1,13], [1,14], [1,15], [1,16], [2,0], [2,1], [2,2], [2,3], [2,5], [2,7], [2,8], [2,9], [2,10], [2,11], [2,12], [2,13], [2,14], [2,15], [2,16], [3,0], [3,1], [3,9], [3,12], [3,14], [3,15], [3,16], [4,1], [4,2], [4,3], [4,5], [4,6], [4,7], [4,8], [4,9], [4,10], [4,11], [4,12], [4,13], [4,14], [4,15], [4,16], [5,0], [5,1], [5,2], [5,3], [5,4], [5,6], [5,7], [5,8], [5,9], [5,10], [5,11], [5,12], [5,13], [5,14], [5,15], [5,16], [6,1], [6,2], [6,3], [6,4], [6,5], [6,6], [6,8], [6,9], [6,10], [6,12], [6,13], [6,14], [7,0], [7,1], [7,6], [7,7], [7,8], [7,9], [7,10], [7,11], [7,13], [8,0], [8,2], [8,3], [8,4], [8,5], [8,6], [8,7], [8,8], [8,9], [8,10], [8,11], [8,12], [8,13], [8,14], [9,2], [9,4], [9,5], [9,6], [9,7], [9,8], [9,9], [9,10], [9,11], [9,12], [9,14], [9,16], [10,1], [10,2], [10,4], [10,5], [10,6], [10,7], [10,8], [10,9], [10,10], [10,11], [10,12], [10,13], [10,15], [10,16], [11,0], [11,2], [11,4], [11,5], [11,6], [11,7], [11,8], [11,9], [11,10], [11,12], [11,13], [11,14], [11,15], [11,16], [12,1], [12,2], [12,3], [12,6], [12,8], [12,9], [12,10], [12,11], [12,12], [12,13], [12,14], [12,15], [12,16], [13,0], [13,1], [13,2], [13,3], [13,5], [13,7], [13,8], [13,9], [13,10], [13,11], [13,12], [13,13], [13,15], [14,0], [14,2], [14,4], [14,8], [14,9], [14,10], [14,11], [14,12], [14,13], [14,14], [15,0], [15,1], [15,2], [15,3], [15,4], [15,5], [15,7], [15,8], [15,9], [15,10], [15,11], [15,12], [15,15], [15,16], [16,0], [16,2], [16,3], [16,4], [16,5], [16,11], [16,12], [16,16], [17,0], [17,1], [17,2], [17,3], [17,4], [17,5], [17,6], [17,7], [17,9], [17,10], [17,11], [17,12], [17,14], [18,2], [18,3], [18,6], [18,7], [18,8], [18,9], [18,10], [18,11], [18,12], [18,13], [18,14], [18,15], [18,16], [19,0], [19,2], [19,3], [19,4], [19,5], [19,6], [19,7], [19,8], [19,9], [19,10], [19,14], [19,15], [19,16], [20,0], [20,1], [20,2], [20,4], [20,6], [20,7], [20,8], [20,9], [20,10], [20,11], [20,12], [20,13], [20,14], [20,15], [20,16], [21,0], [21,1], [21,2], [21,5], [21,6], [21,7], [21,11], [21,12], [21,13], [21,15], [21,16], [22,1], [22,2], [22,3], [22,4], [22,5], [22,6], [22,7], [22,8], [22,9], [22,10], [22,11], [22,14], [22,15], [22,16], [23,0], [23,1], [23,2], [23,3], [23,5], [23,6], [23,7], [23,8], [23,9], [23,10], [23,11], [23,12], [23,13], [23,15]]);
}
function goDecode16() {
	goDecodeCommonNoHighlight([
		[7,9], [5,7], [2,1], [7,7], [4,3], [1,16], [3,14], [7,8], [7,0], [2,10], [1,3], [5,15], [4,12], [7,1], [1,6], [2,15], [0,13], [3,16], [4,2], [5,10], [2,14], [0,12], [2,9], [1,11], [5,14], [5,12], [1,9], [4,5], [3,0], [4,6], [4,11], [5,3], [3,9], [7,10], [3,12], [0,14], [4,14], [0,15], [4,16], [5,13], [5,11], [6,12], [1,15], [1,2], [5,9], [2,5], [1,13], [7,6], [2,2], [7,13], [6,9], [4,9], [6,2], [2,13], [5,0], [4,13], [3,15], [1,4], [6,14], [6,8], [6,13], [2,11], [1,12], [4,7], [1,14], [5,4], [4,10], [4,8], [4,15], [4,1], [7,11], [5,6], [2,0], [5,16], [5,8], [6,6], [5,1], [1,1], [1,5], [6,1], [2,8], [2,3], [2,16], [2,12], [1,7], [6,5], [1,0], [3,1], [2,7], [6,10], [6,3], [5,2], [6,4], [11,16], [9,9], [12,16], [13,3], [14,11], [14,9], [10,8], [13,12], [11,9], [15,16], [10,5], [10,11], [11,2], [8,8], [12,1], [11,14], [10,7], [13,11], [13,1], [10,10], [13,8], [12,13], [14,13], [10,12], [9,7], [12,3], [13,0], [9,4], [13,13], [10,15], [11,12], [8,3], [13,10], [11,0], [8,13], [9,2], [8,4], [15,4], [14,2], [10,2], [13,9], [12,2], [8,10], [8,11], [12,9], [11,4], [12,8], [15,15], [15,9], [8,7], [15,7], [14,0], [11,6], [9,12], [9,6], [13,2], [12,12], [15,0], [9,14], [11,8], [10,16], [8,12], [13,5], [14,12], [15,2], [8,0], [15,10], [14,8], [9,5], [9,11], [15,8], [8,9], [11,7], [15,12], [14,4], [9,16], [10,6], [12,11], [9,8], [13,15], [9,10], [14,10], [14,14], [11,15], [13,7], [15,5], [12,15], [8,2], [12,10], [11,13], [8,14], [11,5], [15,1], [12,6], [15,3], [10,9], [12,14], [15,11], [8,5], [10,4], [11,10], [10,13], [10,1], [8,6], [19,6], [16,2], [21,12], [19,16], [18,8], [19,2], [23,15], [20,16], [22,4], [19,15], [17,6], [20,10], [21,2], [17,0], [20,13], [17,2], [17,11], [23,0], [21,15], [23,5], [16,4], [19,0], [17,9], [22,9], [17,1], [22,3], [16,12], [21,6], [23,6], [23,7], [17,12], [21,0], [18,15], [20,1], [23,3], [17,7], [23,2], [22,16], [21,13], [22,11], [16,11], [23,13], [20,4], [20,7], [18,2], [20,15], [18,14], [23,8], [21,11], [22,15], [20,12], [17,3], [22,1], [19,10], [18,16], [16,0], [18,9], [20,0], [18,6], [22,2], [23,12], [19,5], [17,10], [20,8], [23,11], [18,11], [20,6], [23,1], [22,14], [21,16], [17,4], [18,3], [22,5], [18,7], [20,9], [22,10], [22,6], [16,5], [18,12], [17,5], [19,7], [20,11], [23,9], [19,9], [16,16], [21,7], [18,13], [19,3], [20,14], [17,14], [21,1], [23,10], [22,7], [19,14], [16,3], [18,10], [21,5], [20,2], [19,4], [19,8], [22,8]]);
}

function goDecode17() {
	for (var row=0; row<24; row++) {
		for (var col=0; col<17; col++) {
			var pos = row*17 + col;
			var which = wordMask[pos] == "1";
			var color = which ? "rgb(0,140,0)" : "rgba(0,0,140,0.33)";
			document.getElementById(row+"_"+col).style.color = color;
		}   
	}
}

function goDecodeImm() {
	var cells = [];
	for (var row=0; row<24; row++) 
		for (var col=0; col<17; col++) 
			cells[cells.length] = [row,col];

    goDecodeCommonNoHighlightFast(cells);
			
}

// function goHighlightQ(i) {
// 	if (i >= ciphers[0].length) return;
// 	if (ciphers[0][i] == 'q') {
// 		var rc = [parseInt(i/17), i%17];
// 		// cipherHighlight(rc, orange);
// 		cipherHighlightSmooth(rc, 0);
// 		setTimeout(function() {goHighlightQ(i+1)}, MS);
// 	} else goHighlightQ(i+1);
// }

// function goDecodeQ(i) {
// 	if (i >= ciphers[0].length) return;
// 	if (ciphers[0][i] == 'q') {
// 		var rc = [parseInt(i/17), i%17];
// 		decodeCellAnimationSmooth(rc);
// 		setTimeout(function() {goDecodeQ(i+1)}, MS);
// 	} else goDecodeQ(i+1);
// }

function decodeSymbol(i, symbol) {
	if (i >= ciphers[0].length) return;
	if (ciphers[0][i] == symbol) {
		var rc = [parseInt(i/17), i%17];
		decodeCellAnimationSmooth(rc);
		setTimeout(function() {decodeSymbol(i+1, symbol)}, MS);
	} else decodeSymbol(i+1, symbol);
}

function highlightSymbol(i, symbol) {
	if (i >= ciphers[0].length) return;
	if (ciphers[0][i] == symbol) {
		var rc = [parseInt(i/17), i%17];
		cipherHighlightSmooth(rc, 0);
		setTimeout(function() {highlightSymbol(i+1, symbol)}, MS);
	} else highlightSymbol(i+1, symbol);
}

function reset() {
	drawCipher(ciphers[0], 17, 21, 21, 100, 40, 2, 2, 'cipher', '#000', false, 0, 0, 0);	
}

function goHighlightRegular(i) {
	if (i >= ciphers[0].length) return;
	if ("ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(ciphers[0][i]) != -1) {
		var rc = [parseInt(i/17), i%17];
		cipherHighlight(rc, orange);
		// cipherHighlightSmooth(rc);
		setTimeout(function() {goHighlightRegular(i+1)}, 50);
	} else goHighlightRegular(i+1);
}

function goHighlightSymbols(i) {
	if (i >= ciphers[0].length) return;
	if ("!#%()+/56789@\\^_".indexOf(ciphers[0][i]) != -1) {
		var rc = [parseInt(i/17), i%17];
		cipherHighlight(rc, "#72aee6");
		// cipherHighlightSmooth(rc);
		setTimeout(function() {goHighlightSymbols(i+1)}, 50);
	} else goHighlightSymbols(i+1);
}

function goHighlightBackwards(i) {
	if (i >= ciphers[0].length) return;
	if ("cdefjklpqrtz=".indexOf(ciphers[0][i]) != -1) {
		var rc = [parseInt(i/17), i%17];
		cipherHighlight(rc, "yellow");
		// cipherHighlightSmooth(rc);
		setTimeout(function() {goHighlightBackwards(i+1)}, 50);
	} else goHighlightBackwards(i+1);
}

var harden_patterns = [
	[0,5], // 1, (0,5)  
	[0,6],
	[0,7],
	[0,8],
	[0,9],
	[0,10],
	[0,11],

	[3,2], // 2, (1,5)
	[3,3],
	[3,4],
	[3,5],
	[3,6],
	[3,7],
	[3,8],

	[6, 14], // 10, (9, 6)
	[6, 15],
	[6, 16],

	[7,2], // 3, (2, 5)
	[7,3],
	[7,4],
	[7,5],

	[8,12], // 4, (3, 3)
	[8,13],
	[8,14],
	[8,15],
	[8,16],
	[9,0],
	[9,1],
	[9,2],
	[9,3],

	[14,4], // 5, (4, 5)
	[14,5],
	[14,6],
	[14,7],

	[15, 12], // 11, (10, 6)
	[15, 13],
	[15, 14],

	[16,6], // 6, (5, 5)
	[16,7],
	[16,8],
	[16,9],
	[16,10],
	[16,11],

	[16,12], // 7, (6, 5)
	[16,13],
	[16,14],
	[16,15],

	[17, 14], // 8, (7, 5)
	[17, 15],
	[17, 16],
	[18, 0],

	[19, 10], // 9, (8, 5)
	[19, 11],
	[19, 12],
	[19, 13],
];

function goHighlightHardenPatterns(i) {
	if (i >= harden_patterns.length) return;
	cipherHighlightSmooth(harden_patterns[i], 0);
	setTimeout(function() {goHighlightHardenPatterns(i+1)}, 50);
}

function isInHardenPattern(row, col) {
	for (var i=0; i<harden_patterns.length; i++) {
		rc = harden_patterns[i];
		if (rc[0] == row && rc[1] == col) return 1;		
	}
	return 0;
}

function goIsolateHardenPatterns() {
	var headings = document.getElementsByClassName("h");
	for (var i=0; i<headings.length; i++) headings[i].style.display = "none";
	for (var row=0; row<24; row++) {
		for (var col=0; col<17; col++) {
			if (isInHardenPattern(row, col)) continue;
			cipherblock[row][col].style.display = "none";
		}
	}
}

function unhighlightHardenPatterns() {
	for (var row=0; row<24; row++) {
		for (var col=0; col<17; col++) {
			if (isInHardenPattern(row, col)) 
				// cipherblock[row][col].style.backgroundColor = "white";
			cipherblock[row][col].className = "c";
		}
	}
}

function goHighlightHardenSymbols(i, symbol, color_number) {
	if (i >= harden_patterns.length) return;
	var pos = harden_patterns[i][0]*17 + harden_patterns[i][1];
	if (ciphers[0][pos] == symbol) {
		cipherHighlightSmooth(harden_patterns[i], color_number);
		setTimeout(function() {goHighlightHardenSymbols(i+1, symbol, color_number)}, 50);		
	} else 
		goHighlightHardenSymbols(i+1, symbol, color_number);
}

function move(rc, delta_row, delta_col, delta_header) {
	var elem = document.getElementById(rc[0]+"_"+rc[1]);
	var left = parseInt(elem.style.left);	
	var top = parseInt(elem.style.top);
	left += (delta_col * 23);
	top += (delta_row * 23) + (delta_header * 40);
	elem.style.left = left;
	elem.style.top = top;
}

function goAlignPatterns() {
	for (var i=7; i<14; i++)
		move(harden_patterns[i], -2, 3, 0);
	for (var i=14; i<17; i++)
		move(harden_patterns[i], 3, -8, 0);
	for (var i=17; i<21; i++)
		move(harden_patterns[i], -5, 3, 0);
	for (var i=21; i<26; i++)
		move(harden_patterns[i], -5, -9, -1);
	for (var i=26; i<30; i++)
		move(harden_patterns[i], -6, 8, -1);
	for (var i=30; i<34; i++)
		move(harden_patterns[i], -10, 1, -1);
	for (var i=34; i<37; i++)
		move(harden_patterns[i], -5, -6, -1);
	for (var i=37; i<43; i++)
		move(harden_patterns[i], -11, -1, -2);
	for (var i=43; i<47; i++)
		move(harden_patterns[i], -10, -7, -2);
	for (var i=47; i<50; i++)
		move(harden_patterns[i], -10, -9, -2);
	move(harden_patterns[50], -11, 8, -2);
	for (var i=51; i<55; i++)
		move(harden_patterns[i], -11, -5, -2);
}

var targets_harden_1 = [
	[0,5], // 1, (0,5)  
	[3,2], // 2, (1,5)
	[7,2], // 3, (2, 5)
	[14,4], // 5, (4, 5)
	[16,6], // 6, (5, 5)
	[16,12], // 7, (6, 5)
	[17, 14], // 8, (7, 5)
	[19, 10] // 9, (8, 5)
];
var targets_harden_2 = [
	[3,3],
	[7,3],
	[8,15],
	[14,5],
	[16,7],
	[16,13],
	[17, 15],
	[19, 11]
];
var targets_harden_3 = [
	[0,7],
	[0,8],

	[3,4],
	[3,5],

	[7,4],
	[7,5],

	[8,16],
	[9,0],

	[14,6],
	[14,7],

	[16,8],
	[16,9],

	[16,14],
	[16,15],

	[17, 16],
	[18, 0],

	[19, 12],
	[19, 13],

	[6, 15],
	[6, 16],

	[15, 13],
	[15, 14]
];
function goHighlightHarden1() {
	for (var i=0; i<targets_harden_1.length; i++) cipherHighlight(targets_harden_1[i], orange);
}

function swapHardenPlaintexts() {
	var tmp = ciphers[1];
	ciphers[1] = ciphers[3];
	ciphers[3] = tmp;
}

function goDecodeHarden1(i) {
	if (i==0) { // for letting symbol A = K instead of W
		swapHardenPlaintexts();
	}
	if (i >= targets_harden_1.length) {
		swapHardenPlaintexts();
		return;
	}
	decodeCellAnimationSmooth(targets_harden_1[i]);
	setTimeout(function() {goDecodeHarden1(i+1)}, MS);
}
function goHighlightHarden2() {
	for (var i=0; i<targets_harden_2.length; i++) cipherHighlight(targets_harden_2[i], orange);
}
function goDecodeHarden2(i) {
	if (i >= targets_harden_2.length) {
		return;
	}
	decodeCellAnimationSmooth(targets_harden_2[i]);
	setTimeout(function() {goDecodeHarden2(i+1)}, MS);
}

function goHighlightHarden3() {
	for (var i=0; i<targets_harden_3.length; i++) cipherHighlight(targets_harden_3[i], orange);
}
function goDecodeHarden3(i) {
	if (i >= targets_harden_3.length) {
		return;
	}
	decodeCellAnimationSmooth(targets_harden_3[i]);
	setTimeout(function() {goDecodeHarden3(i+1)}, MS);
}

function resetWithHardenDecodes() {
	reset();
	swapHardenPlaintexts();
	for (var i=0; i<targets_harden_1.length; i++)
		decodeCellAnimationSmooth(targets_harden_1[i]);
	for (var i=0; i<targets_harden_2.length; i++)
		decodeCellAnimationSmooth(targets_harden_2[i]);
	for (var i=0; i<targets_harden_3.length; i++)
		decodeCellAnimationSmooth(targets_harden_3[i]);
	swapHardenPlaintexts();
}
function isHardenTargets(row, col) {
	var targets = [targets_harden_1, targets_harden_2, targets_harden_3];
	for (var i=0; i<targets.length; i++)
		for (var j=0; j<targets[i].length; j++) {
			if (targets[i][j][0] == row && targets[i][j][1] == col) return 1;
		}
	return 0;
}
function isHardenDecoded(ch) {
	return "%P/A9#B".indexOf(ch) != -1;
}

function isHardenDecoded2(ch) {
	return "ZUkOR".indexOf(ch) != -1;
}

function completeHardenDecodes(i) {
	if (i == 0) swapHardenPlaintexts();
	if (i >= ciphers[0].length) {
		swapHardenPlaintexts();
		return;
	}
	var ch = ciphers[0].charAt(i);
	var row = parseInt(i/17);
	var col = i%17;
	if (isHardenTargets(row, col)) {
		completeHardenDecodes(i+1); // we already decoded them
	} else if (isHardenDecoded(ch)) {
		decodeCellAnimationSmooth([row, col]);
		setTimeout(function() {completeHardenDecodes(i+1)}, MS);
	} else {
		completeHardenDecodes(i+1);
	}
}

function completeILikeKilling(i) {
	if (i == 0) swapHardenPlaintexts();
	if (i >= ciphers[0].length) {
		swapHardenPlaintexts();
		return;
	}
	var ch = ciphers[0].charAt(i);
	var row = parseInt(i/17);
	var col = i%17;

	if (isHardenDecoded2(ch)) {
		decodeCellAnimationSmooth([row, col]);
		setTimeout(function() {completeILikeKilling(i+1)}, MS);
	} else {
		completeILikeKilling(i+1);
	}
}

function toggleHeaders() {
	do_headers = !do_headers;
	var headings = document.getElementsByClassName("h");
	for (var i=0; i<headings.length; i++) {
		headings[i].style.display = do_headers ? "" : "none";
	}
}

function resetA() {
	resetSymbol('A');
	setTimeout(function() {highlightSymbol(0, 'A')}, 1000);
}

function resetSymbol(symbol) {
	for (var i=0; i<ciphers[0].length; i++) {
		if (ciphers[0][i] == symbol) {
			var row = parseInt(i/17);
			var col = i%17;
			resetCell(row, col);
		}
	}
}

function fixA(i) {
	if (i >= ciphers[0].length) return;
	if (ciphers[0][i] == 'A') {
		var rc = [parseInt(i/17), i%17];
		decodeCellAnimationSmooth(rc);
		setTimeout(function() {fixA(i+1)}, MS);
	} else fixA(i+1);
}

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

function killer1() {
	var row = 16; 
	var col = 11;
	var pos = row*17 + col;
	ciphers[1] = setCharAt(ciphers[1], pos, 'R');
	// decodeCellAnimationSmooth([row, col]);
	cipherHighlight([row, col], orange);
	setTimeout(function() {decodeCellAnimationSmooth([row, col]); ciphers[1] = setCharAt(ciphers[1], pos, 'D');}, 1000);	
}

function killer2() {
	var row = 3; 
	var col = 12;
	var pos = row*17 + col;
	ciphers[1] = setCharAt(ciphers[1], pos, 'R');
	// decodeCellAnimationSmooth([row, col]);
	cipherHighlight([row, col], orange);
	setTimeout(function() {decodeCellAnimationSmooth([row, col]); ciphers[1] = setCharAt(ciphers[1], pos, 'D');}, 1000);	
}

function killer3() {
	var row1 = 16; 
	var col1 = 11;
	var pos1 = row1*17 + col1;

	var row2 = 3; 
	var col2 = 12;
	var pos2 = row2*17 + col2;

	resetCell(row1, col1);
	resetCell(row2, col2);

	setTimeout(function() {highlightSymbol(0, 'f')}, 1000);	
	setTimeout(function() {decodeSymbol(0, 'f')}, 3000);	
}

function game1() {
	highlightSymbol(0, 'l');
	setTimeout(function() {decodeSymbol(0, 'l')}, 2500);
}

function game2() {
	highlightSymbol(0, 'q');
	setTimeout(function() {decodeSymbol(0, 'q')}, 3000);
}

function game3() {
	highlightSymbol(0, 'E');
	setTimeout(function() {decodeSymbol(0, 'E')}, 2500);
}

function ing() {
	highlightSymbol(0, '^');
	setTimeout(function() {decodeSymbol(0, '^')}, 2500);
}

function iii() {
	highlightSymbol(0, 'I');
	setTimeout(function() {decodeSymbol(0, 'I')}, 3000);
}

function lm_t() {
	highlightSymbol(0, 'L');
	setTimeout(function() {decodeSymbol(0, 'L')}, 3000);
}

function lm_h() {
	highlightSymbol(0, 'M');
	setTimeout(function() {decodeSymbol(0, 'M')}, 3000);
}

function thing() {
	highlightSymbol(0, 'H');
	setTimeout(function() {decodeSymbol(0, 'H')}, 3000);
}

function something1() {
	highlightSymbol(0, '@');
	setTimeout(function() {decodeSymbol(0, '@')}, 3000);
}

function something2() {
	highlightSymbol(0, 'X');
	setTimeout(function() {decodeSymbol(0, 'X')}, 3000);
}

function now() {
	MS = 250;
	for (var i=0; i<ciphers[1].length; i++)
		if (ciphers[0][i] == '5') 
			ciphers[1] = setCharAt(ciphers[1], i, 'W');
	highlightSymbol(0, 'T');
	setTimeout(function() {decodeSymbol(0, 'T')}, 2000);
	setTimeout(function() {highlightSymbol(0, '5')}, 4000);
	setTimeout(function() {decodeSymbol(0, '5')}, 6000);
	setTimeout(function() {
		for (var i=0; i<ciphers[1].length; i++)
			if (ciphers[0][i] == '5') 
				ciphers[1] = setCharAt(ciphers[1], i, 'T');
	}, 10000);
}

function not() {
	MS = 250;
	resetSymbol('5');
	setTimeout(function() {highlightSymbol(0, '5')}, 1000);
	setTimeout(function() {decodeSymbol(0, '5')}, 3000);
}

function people1() {
	MS = 250;
	highlightSymbol(0, '=');
	setTimeout(function() {decodeSymbol(0, '=')}, 2000);
}

function people2() {
	MS = 250;
	highlightSymbol(0, 'p');
	setTimeout(function() {decodeSymbol(0, 'p')}, 2000);
}

function people3() {
	MS = 250;
	highlightSymbol(0, 'W');
	setTimeout(function() {decodeSymbol(0, 'W')}, 2000);
}

function to() {
	MS = 250;
	highlightSymbol(0, 'd');
	setTimeout(function() {decodeSymbol(0, 'd')}, 2000);
}

function be() {
	MS = 250;
	highlightSymbol(0, 'V');
	setTimeout(function() {decodeSymbol(0, 'V')}, 2000);
}

function gift() {
	MS = 250;
	for (var i=0; i<ciphers[1].length; i++)
		if (ciphers[0][i] == 'c') 
			ciphers[1] = setCharAt(ciphers[1], i, 'F');
		else if (ciphers[0][i] == '+') 
			ciphers[1] = setCharAt(ciphers[1], i, 'T');
	highlightSymbol(0, 'c');
	setTimeout(function() {decodeSymbol(0, 'c')}, 2000);
	setTimeout(function() {highlightSymbol(0, '+')}, 4000);
	setTimeout(function() {decodeSymbol(0, '+')}, 6000);
	setTimeout(function() {
		for (var i=0; i<ciphers[1].length; i++)
			if (ciphers[0][i] == 'c') 
				ciphers[1] = setCharAt(ciphers[1], i, 'V');
			else if (ciphers[0][i] == '+') 
				ciphers[1] = setCharAt(ciphers[1], i, 'E');
	}, 10000);
}

function give() {
	MS = 250;
	resetSymbol('c');
	resetSymbol('+');
	
	setTimeout(function() {highlightSymbol(0, 'c')}, 1000);
	setTimeout(function() {decodeSymbol(0, 'c')}, 3000);
	setTimeout(function() {highlightSymbol(0, '+');}, 5000);
	setTimeout(function() {decodeSymbol(0, '+')}, 7000);
}

function better() {
	MS = 250;
	highlightSymbol(0, 't');
	setTimeout(function() {decodeSymbol(0, 't')}, 2000);
}

function than() {
	MS = 250;
	highlightSymbol(0, ')');
	setTimeout(function() {decodeSymbol(0, ')')}, 2000);
}

function a() {
	MS = 250;
	highlightSymbol(0, '8');
	setTimeout(function() {decodeSymbol(0, '8')}, 2000);
}

function reborn() {
	MS = 250;
	highlightSymbol(0, '\\');
	setTimeout(function() {decodeSymbol(0, '\\')}, 2000);
}

function have() {
	MS = 250;
	highlightSymbol(0, 'S');
	setTimeout(function() {decodeSymbol(0, 'S')}, 2000);
}

function you1() {
	MS = 250;
	highlightSymbol(0, '_');
	setTimeout(function() {decodeSymbol(0, '_')}, 2000);
}

function you2() {
	MS = 250;
	highlightSymbol(0, 'Y');
	setTimeout(function() {decodeSymbol(0, 'Y')}, 2000);
}

function because1() {
	MS = 250;
	highlightSymbol(0, 'e');
	setTimeout(function() {decodeSymbol(0, 'e')}, 2000);
}

function because2() {
	MS = 250;
	highlightSymbol(0, 'G');
	setTimeout(function() {decodeSymbol(0, 'G')}, 2000);
}

function because3() {
	MS = 250;
	highlightSymbol(0, 'K');
	setTimeout(function() {decodeSymbol(0, 'K')}, 2000);
}

function because4() {
	MS = 250;
	highlightSymbol(0, 'F');
	setTimeout(function() {decodeSymbol(0, 'F')}, 2000);
}

function because5() {
	MS = 250;
	highlightSymbol(0, '6');
	setTimeout(function() {decodeSymbol(0, '6')}, 2000);
}

function so() {
	MS = 250;
	highlightSymbol(0, '!');
	setTimeout(function() {decodeSymbol(0, '!')}, 2000);
}

function rocks1() {
	MS = 250;
	highlightSymbol(0, 'D');
	setTimeout(function() {decodeSymbol(0, 'D')}, 2000);
}

function rocks2() {
	MS = 250;
	highlightSymbol(0, 'r');
	setTimeout(function() {decodeSymbol(0, 'r')}, 2000);
}

function the_best() {
	MS = 250;
	highlightSymbol(0, 'N');
	setTimeout(function() {decodeSymbol(0, 'N')}, 2000);
}

function slaves1() {
	MS = 250;
	highlightSymbol(0, 'Q');
	setTimeout(function() {decodeSymbol(0, 'Q')}, 2000);
}

function slaves2() {
	MS = 250;
	highlightSymbol(0, 'J');
	setTimeout(function() {decodeSymbol(0, 'J')}, 2000);
}

function is() {
	MS = 250;
	highlightSymbol(0, '7');
	setTimeout(function() {decodeSymbol(0, '7')}, 2000);
}

function fun_than() {
	MS = 250;
	highlightSymbol(0, '(');
	setTimeout(function() {decodeSymbol(0, '(')}, 2000);
}

function die() {
	MS = 250;
	highlightSymbol(0, 'z');
	setTimeout(function() {decodeSymbol(0, 'z')}, 2000);
}

function experence() {
	MS = 250;
	highlightSymbol(0, 'j');
	setTimeout(function() {decodeSymbol(0, 'j')}, 2000);
}

function decode_tmp() {
	var symbols = "q9RBP%#UEkAZO^/lfILMH@XT5=pWdVc+t)8\\S_YeGKF6!DrNQJ";
	for (var i=0; i<symbols.length; i++) decodeSymbol(0, symbols[i]);
}