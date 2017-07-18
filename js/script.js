$(document).ready(function(){
	//click listener for slideout plugin
   $(".slideoutbtn").click(function() {
   	slideout.toggle();
   });
   slideout.disableTouch();
   //translate map against slideout's padding
   var fixMapCanvas = document.querySelector('#mapCanvas');
   var fixSlideoutbtn = document.querySelector('.slideoutbtn');

	slideout.on('beforeopen', function () {
	  fixMapCanvas.style.transition = 'transform 400ms ease';
	  fixMapCanvas.style.transform = 'translateX(-1px)';
	  fixSlideoutbtn.style.transition = 'transform 400ms ease';
	  fixSlideoutbtn.style.transform = 'translateX(300px)';
	});

	slideout.on('beforeclose', function () {
	  fixMapCanvas.style.transition = 'transform 400ms ease';
	  fixMapCanvas.style.transform = 'translateX(0px)';
	  
	});

	slideout.on('close', function () {
		fixSlideoutbtn.style.transition = 'transform 400ms ease';
	 	fixSlideoutbtn.style.transform = 'translateX(0px)';
	});
})
