//PARALLAX EFFECT
window.addEventListener("scroll", function checkDistance(){

	var topDistance = window.pageYOffset;
	var layers = document.querySelectorAll(".layer");
	
	for (i=0;i<layers.length;i++){
		var depth = layers[i].getAttribute("data-depth");
		var movement = -(topDistance*depth);
		var translate3d = "translate3d(0, " + movement + "px, 0)";
		layers[i].style.webkitTransform = translate3d;
		layers[i].style.mozTransform = translate3d;
		layers[i].style.msTransform = translate3d;
		layers[i].style.transform = translate3d;

	}
});

//JQUERY COLOR EFFECT 
/*$(document).ready(function(){
	var scroll_pos = 0;
	$(document).scroll(function(){
		scroll_pos = $(this).scrollTop();
		if (scroll_pos>210){
			$(".layer5").css('background-color', '#56759D');
			$("#weather").css('color', '#fff');
		}
		else{
			$(".layer5").css('background-color', '#ABCFFB');	
			$("#weather").css('color', '#000');
		}
	});
});*/


//JQUERY SNOWPATCH EFFECT: NOT IMPLEMENTED YET
$(window).on("load", function(){
	$(window).scroll(function(){
		$(".fade").each(function(){
			//TODO: IMPLEMENT A FUNCTION THAT MAKES CIRCLES SHOW BASED ON SCREEN POSITION 
		})
	})
});

















