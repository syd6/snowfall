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
		//FROM 12AM-6AM dark 
		//total mins elapsed: 360 mins
		//20%-35% (increase in 15% over 360 mins)
		//brighten at a rate of 0.04% per minute
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
			//total minutes elapsed: 180 
			//85% - 40% for brightness
			//decrease in 45% over 180 minutes
			//darken at a rate of 0.25% per minute
			//saturation goes from 70-50
			//decrease in 20% over 180 minutes
			//desaturate at a rate of 0.11% perminute
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

