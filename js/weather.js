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


	/*********DISPLAY TIME************/
	var d = new Date();
	var hours = d.getHours();
	var mins = d.getMinutes();
	if (hours >= 12){
		if (mins < 10){
			$("#weather").append((hours-12)+":"+"0"+mins+"PM"+"<br>");
		}

		else $("#weather").append((hours-12)+":"+mins+"PM"+"<br>");

	}
	else{
		if (mins < 10){
			$("#weather").append(hours+":"+"0"+mins+"AM"+"<br>");
		}

		else $("#weather").append(hours+":"+mins+"AM"+"<br>");
	}
	
	
	/***********END DISPLAY TIME**********/
	
});




/*
// Add your code below this line!
xhr = new XMLHttpRequest();
xhr.open("GET", "https://www.codecademy.com/", false);
xhr.send();

// Add your code above this line!

console.log(xhr.status);
console.log(xhr.statusText);
^outputs :
200 
OK
*/
