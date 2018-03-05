
	<script src="./resources/js/canvasPlayer/actionEvents.js"></script>
	<script src="./resources/js/canvasPlayer/canvasPlayer.js"></script>
	<script src="./resources/js/canvasPlayer/makeVideoPuzzle.js"></script>
	
	
	<link rel="stylesheet" href="./resources/css/fontIcon/fontello-embedded.css"/>


<div id="wrap" align="center"></div>
<div id="touch-text">Start with Touch</div>

<div class="options-wrapper">
	<div class="options-box">
		<div class="options-header" >
			<p class="options-contents options-text">OPTIONS</p>
			<span class="icon-cancel" ></span>
		</div>
		
		<div class="options-body">
			<div class="options-contents">
			
				<div style="width: 95%; height: 40%; background-color: #d9d9d9; border-radius: 20px 20px 20px 20px; display: table; " >
					<div style="font-size: 2em; width: 80%; float: left; ">Video Sound</div>
					<div style="width: 20%; float:left;">
						<span class="icon-toggle icon-toggle-on" style="font-size: 2em; " ></span>
					</div>
				</div>
				
				<div style="width: 95%; height: 40%; background-color: #d9d9d9; margin-top: 10px; border-radius: 20px 20px 20px 20px; display: table;" >
					<div style="font-size: 2em; width: 80%; float: left;">Hello</div>
					<div style="width: 20%; float:left;">
						<span class="icon-toggle icon-toggle-on" style="font-size: 2em; " ></span>
					</div>
				</div>
			
			</div>
		</div>
	</div>
	
</div>


<div class="header-bar" style="clear:both; position: relative;">
	
	<span id="btn" class="icon icon-cog" ></span>

</div>

<div class="body" style="visibility: hidden;">
	<div class="puzzle-pieces-box">
	
		<div class="puzzle-pieces" id="puzzle-pieces0"></div>
	</div>
	
	<div  class="msgBlock" align="center">
	
	
	</div>
	<div class="puzzle-board-wrapper">
		<div class="puzzle-board-inner" >
		<video class="video js-video" id="video" muted preload="yes" style="display: none;">
		<!-- http://www.quirksmode.org/html5/videos/big_buck_bunny.mp4 --> 
		<!-- http://221.139.32.62:7979/resources/video/vjigsaw/chicken.1.mp4 -->
			<source src="http://naver-smr.smartmediarep.com/smc/naver/single/eng/0/smr/contents/video/2017/04/14/eac1ce7aeee0a0ee82753ef7e195ee8e_t34.mp4" type="video/mp4">
			Your browser does not support HTML5 video.
		</video>
		
		<div class="puzzle-board" id="puzzle-board">
			
		</div>

		<canvas class="canvas js-canvas" id="canvas-video" ></canvas>
		
		</div>
	</div>
	<div class="bottom-bar"></div>
</div>

<script>
	
		$(document).ready(function() {
			var canvasPlayer = new CanvasPlayer({
				videoSelector: '#video',
				canvasSelector: '#canvas-video',
				btnSelector : '#wrap',
				puzzleBoardSelector : '.puzzle-board',
				audio : false,
				autoplay : true,
				loop : true,
				hideVideo : true,
				puzzleBoardSelector : '#puzzle-board'
			});

			var config_cancel = document.querySelector('.icon-cancel');
			config_cancel.addEventListener("click", function() {
				canvasPlayer.fadeWrap();
				canvasPlayer.hideOption();
				canvasPlayer.replayVideo();
				canvasPlayer.makeVideoPuzzle.rePlayPuzzle();
			});

		});
		
	</script>
