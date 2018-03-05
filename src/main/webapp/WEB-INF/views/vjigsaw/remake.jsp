<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="minimal-ui, width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<script src="./resources/js/jquery/3.1.1.jquery.min.js"></script>
<script src="./resources/js/remake/remake.js"></script>
<link href="./resources/css/vjigsaw/remake.css" rel="stylesheet">

 <script>
	document.oncontextmenu = function() {return false;}
	document.ondragstart = function(){return false}; 
	document.onselectstart = function(){ return false;}
	
	function preventBehavior(e) {
	    e.preventDefault(); 
	};

	document.addEventListener("touchmove", preventBehavior, false);
	
	
	
	$(window).on("orientationchange", function(e){
		var widthModeImg = document.querySelector('#widthModeImg');
		var wrapperContetns = document.querySelector('.wrapper-contents');
		var wModeImg = document.querySelector('#wModeImg');
 	
		
		if(window.orientation != 0){ //가로
			widthModeImg.style.display = "table";
			wrapperContetns.style.visibility = "hidden";
			wModeImg.style.animation = "x-moveImg 3s infinite";
			
	
			
		
		} else{ //세로

			widthModeImg.style.display = "none";
			wrapperContetns.style.visibility = "visible";
			wModeImg.style.animation = "none";
		}
	})
	
</script> 


<title>CoPuzzle</title>
</head>
<body oncontextmenu="return false" ondragstart="return false" onselectstart="return false">

<div class="wrapper-contents" align="center" style="display: table; position: fixed; left: 0; top: 0;">
	<div class="inner-contents" style="display: table-cell; vertical-align: middle;">
		
	</div>		
</div>

<div align="center" id="widthModeImg">
<div style="display: table-cell; vertical-align: middle;" >
	<img alt="" src="./resources/img/1.png" width="80%" id="wModeImg">
</div>	
</div>

</body>
</html>