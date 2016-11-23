$(document).ready(function(){
	//CAN BUILD URL : 
		//send different paramaters to api to change location/city
		//http://api.openweathermap.org/data/2.5/weather?id= <<base url
		//use key value pair : location = format you want to send it in 
	
	//DEFUALT API KEY
	$api = '02bb8dc56bfad68ed287e80153469169';
	//ITHACA CITY INDEX
	$cityindex = '4997346';
	//LOS ANGELES CITY INDEX 
	$cityindexcali = '5368361';



	//FUNCTION #1: EXTRACT JSON FROM URL given $cityindex and default api key

	$.getJSON('http://api.openweathermap.org/data/2.5/weather?id='+$cityindex+'&appid='+$api, function(data){
		
		//param data contains json information 
		console.log(data);
		//append some single elements within json
		$("#weather").append("City:"+ " " + data.name);
	
		//loop through the weather object stored in json and print each element
		var weatherelement;
		for (weatherelement in data.weather[0]){
			//don't display id and main from JSON 
			if (weatherelement != "id" && weatherelement != "main" && weatherelement){
				if (weatherelement == "icon"){
					//insert the icon image for weather condition
					$("#weather").append("<br><img id='weathericon' src='http://openweathermap.org/img/w/" + data.weather[0][weatherelement]+".png'>");
				}
				else $("#weather").append("<br><span class='weatherheading'>"+weatherelement+ "</span>: " + data.weather[0][weatherelement]);
			}
		}
		//loop through and output all of the elements in main. Main is NOT an array, call elements differently
		var temper;
		for (temper in data.main){
			//don't display temp_min and temp_max from JSON
			if (temper != "temp_min" && temper != "temp_max"){
				if (temper == "temp"){
					//convert Kelvin to Fahrenheit 
					var intvalueoftemperature = parseInt(data.main[temper]);
					var kelvintofahren = intvalueoftemperature*(9/5)-459.67;
					//display the temperature in Fahrenheit
					$("#weather").append("<br><span class='weatherheading'>"+temper+ "erature</span>: " + kelvintofahren.toFixed(2) + " F&deg;");
				}
				else $("#weather").append("<br>"+temper+ ": " + data.main[temper]);
			}
		}
		
	});


	//counter. if odd, show california weather data. if even, wipe that and show ithaca weather
	//currently does nothing. need to implement
	var counter = 0;

	//TODO FUNCTION #2
	$("#california").click(function(){
		//this does nothing yet 
		counter += 1;
	});



	/*FUNCTION #4: change background and textcolor based on time **
	************************************************/
	function dynamicColorChange(){
		//grab time variables
		var d = new Date();
		var hours = d.getHours();
		var mins = d.getMinutes();
		var secs = d.getSeconds();
		//FROM 12AM-6AM dark. total mins elapsed: 360 
		//20%-35% (increase in 15% over 360 mins). Brighten at rate of 0.04% per min
		//min1 = 20% + 0.04%, min2 = 20+(0.04%)2, min3 = 20+(0.04%)3, etc
		if (hours >= 0 && hours <6){
			//brightness = 20% + 0.04 (total time elapsed so far)
			var brightness = 20+0.04*((hours*60)+mins);
			$(".layer5").css('background-color', 'hsl(206, 70%, '+brightness+'%)');
		}

		//6AM quickly transition to light
		//FROM 6AM-3PM 
		if (hours >= 6 && hours < 15){
			//stays bright from 6 - 3pm
			$(".layer5").css('background-color', 'hsl(206, 70%, 85%)');
		}
		
		if (hours >= 15 && hours <18){
			//total minutes elapsed: 180.
			//85% - 40% for brightness. decrease in 45% over 180 minutes. darken at a rate of 0.25% per minute
			//saturation goes from 70-50. decrease in 20% over 180 minutes. desaturate at a rate of 0.11% perminute
			var brightness = 85-0.25*(((hours-15)*60)+mins);
			//have to subtract by 15 bc ur starting at 0 hr elapsed for this color cycle 
			var desaturation = 70-0.11*(((hours-15)*60)+mins);
			$(".layer5").css('background-color', 'hsl(206, '+desaturation+'%, '+brightness+'%)');
		}
		//else between hours 18 to 24 
		if (hours >=18 && hours < 24) {
			//ORIGINAL
			$(".layer5").css('background-color', 'hsl(206, 50%, 30%)');
			//FOR TESTING
			/*var brightness = 85-0.30*(((hours-18)*60)+mins);
			//have to subtract by 15 bc ur starting at 0 hr elapsed for this color cycle 
			$(".layer5").css('background-color', 'hsl(206, 50%, '+brightness+'%)');
			*/
		}
		//$(".layer5").css('background-color', shades2[Math.floor(hours/4)-1]);
		if (hours >= 15 && hours <= 6) $("#weather").css('color', '#fff');
		if (hours < 15 && hours > 6) $("#weather").css('color', '#000');
	}
	//function call, update every second <<<<does not work, find out why
	setInterval(dynamicColorChange, 1000);
	/****END CHANGE BACKGROUND BASED ON TIME*
	*****************************************/
});
//end jQUERY block


/*********FUNCTION: AUTOMATICALLY UPDATING CLOCK*******
***************************************/
function displayTime(){
	var d = new Date();
	var hours = d.getHours();
	var mins = d.getMinutes();
	var secs = d.getSeconds();
	if (hours >= 12){
		if (mins < 10){
			document.getElementById("time").innerHTML = (hours-12)+":"+"0"+mins+":"+secs+" PM"+"<br>";
			//$("#weather").append("<br>"+(hours-12)+":"+"0"+mins+":"+secs+" PM"+"<br>");
		}
		else{
			//$("#weather").append("<br>"+(hours-12)+":"+mins+":"+secs+" PM"+"<br>");
			document.getElementById("time").innerHTML = (hours-12)+":"+mins+":"+secs+" PM"+"<br>";
		}
	}
	else{
		if (mins < 10){
			document.getElementById("time").innerHTML = hours+":"+"0"+mins+":"+secs+" AM"+"<br>";
			//$("#weather").append("<br>"+hours+":"+"0"+mins+":"+secs+" AM"+"<br>");
		}
		else{
			//$("#weather").append("<br>"+hours+":"+mins+":"+secs+" AM"+"<br>");
			document.getElementById("time").innerHTML = hours+":"+mins+":"+secs+" AM"+"<br>";
		}
	}
}
//call function, update every second 
setInterval(displayTime, 1000);


	
/***********END DISPLAY TIME**********
*************************************/




/*idea: force directed diagram somewhere?? (Snowflakes: maybe don't need to use aftereffects)
http://christophermanning.org/projects/voronoi-diagram-with-force-directed-nodes-and-delaunay-links
*/



//code: http://thecodeplayer.com/walkthrough/html5-canvas-snow-effect?s=rlt
/******************UPDATE THIS TO REFLECT OPEN WEATHER MAP CONDITIONS ************/


window.onload = function(){
	var canvas = document.getElementById("canvas1");
	//returns an object that provides methods and properties for drawing on the canvas
	var drawcontxt = canvas.getContext("2d");


	//specify canvas dimensions
	var W = window.innerWidth/1.3;

	var H = window.innerHeight;
	canvas.width = W;
	canvas.height = H;

	//snowflake particles
	var maxparts = 20; //max number of particles on the screen at any time
	var particles = []; //array for holding particles
	for (var i=0;i<maxparts;i++){
		//TODO: search push function up!!! and see what it does specifically
		particles.push({
			//fields of a particle: calling particle.x will select x property 
			x: Math.random()*W, //width of the snow particle
			y: Math.random()*H, //height of the snow particle
			r: Math.random()*4+1, //radius of the snow particle
			d: Math.random()*maxparts //density of snow particles: used to calculate how they fall
		})
	}

	//DRAWING FUNCTION 
	function draw(){
		//Clears the specified pixels within a given rectangle
		drawcontxt.clearRect(0, 0, W, H);
		//specifies the color used to draw 
		drawcontxt.fillStyle = "rgba(255,255,255,0.9)";
		//begins path or resets current path
		drawcontxt.beginPath();
		//for loop draws the actual circles
		for (var i=0;i<maxparts;i++){
			//select individual particle
			var p = particles[i];
			/*moves path to specified point (random x y coordinates 
			generated using particles.push) without creating a line*/
			drawcontxt.moveTo(p.x, p.y);
			//draw the circle that represents each individual flake
			//true means draw counterclockwise. this argument is optional
			drawcontxt.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
		}
		//fills current drawing
		drawcontxt.fill();
		//call the function that makes the particles move 
		update();
	}
	var angle = 0;
	function update(){
		angle += 0.01;
		for (var i=0;i<maxparts;i++){
			//select individual particle
			var p = particles[i];
			/*have to add one to cosine to prevent negative values, 
			which cause flakes to move upwards*/
			//density comes into play: makes downward movement for every flake different
			//add in radius: makes it more random
			p.y += Math.cos(angle+p.d) + 1+ p.r/2;
			p.x += Math.sin(angle)*2;
			//sends flake back to top when it exits screen
			//lets flakes come in from l and r

			//if the location of the flake is off the screen on bottom or sides
			if (p.x> W+5 || p.x < -5 || p.y >H){
				if (i%3>0){//2/3 of flakes
					particles[i] = {x: Math.random()*W, y: -10, r: p.r, d: p.d};
				} 
				else{
					//if flake exits from right, enter from left
					if (Math.sin(angle)>0) particles[i] = {x: -5, y: Math.random()*H, r: p.r, d: p.d};
					//else if flake exist from left, enter from right
					else particles[i] ={x: W+5, y: Math.random()*H, r: p.r, d: p.d};
				}
			}
		}
	}
	//loop
	setInterval(draw, 30);
}


