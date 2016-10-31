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


