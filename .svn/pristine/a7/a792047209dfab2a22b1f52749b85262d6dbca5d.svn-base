$(document).ready(function(){
	var canvas_video = document.getElementById('canvas-video');

	var level = 1;
	var ROWS = -1;
	var COLS = -1;
	var canvas_video_width = -1;
	var canvas_video_height = -1;
	var cut_canvas_video_width = -1;
	var cut_canvas_video_height = -1;
	var cIntervalList = [];
	
	
	function makePuzzlePieces(){ //canvas 퍼즐 조각에 이미지를 입히는 함수
		var tmpIdNum = 0;

		
		function makeIntervalPuzzlePieces(x, y, ctx_tmpCanvasPiece){
			var i = setInterval(function(){
			
				ctx_tmpCanvasPiece.drawImage(canvas_video, x, y, cut_canvas_video_width, cut_canvas_video_height, 0, 0, cut_canvas_video_width, cut_canvas_video_height);
			},100)
			
			//cIntervalList.push(i)
		}
		for(var i=0; i<ROWS; i++){
			for(var j=0; j<COLS; j++){
				
				var tmpCanvasPiece = document.getElementById('canvas-piece'+tmpIdNum);
				var ctx_tmpCanvasPiece = tmpCanvasPiece.getContext('2d');
		
				makeIntervalPuzzlePieces(i*cut_canvas_video_width, j*cut_canvas_video_height, ctx_tmpCanvasPiece);
				tmpIdNum++;
			}
		}
	}
	
	function makeCanvasPuzzlePieces(R,  C, cut_width, cut_height){ //퍼즐 조각의 canvas를 만듦
		var tmpIdNum = 0;
		var middleNum = (R*C)/2;
		for(var i=0; i<R; i++){
			for(var j=0; j<C; j++){
				var CanvasPiece = $("<canvas />",{
					class:"canvas-pieces",
					id:"canvas-piece"+tmpIdNum,
				}) 
				CanvasPiece.attr("width", cut_width)
				CanvasPiece.attr("height", cut_height)
				if(tmpIdNum >= middleNum){
					$('#puzzle-pieces1').append(CanvasPiece)
				}else{
					$('#puzzle-pieces0').append(CanvasPiece)
				}
				tmpIdNum++;
			}
		}
		//$('.canvas-pieces').draggable();
		makePuzzlePieces()
	}
	
	function setLevel(lvl){ //레벨에 따라 잘라야할 퍼즐 개수를 구하는 함수.
		canvas_video_width = canvas_video.width;
		canvas_video_height = canvas_video.height;
		
		ROWS = 2 + Math.ceil(lvl/2);
		COLS = 2 + Math.floor(lvl/2);
		
		cut_canvas_video_width = Math.round(canvas_video_width/ROWS);
		cut_canvas_video_height = Math.round(canvas_video_height/COLS);
		
		makeCanvasPuzzlePieces(ROWS,  COLS, cut_canvas_video_width, cut_canvas_video_height);
	}
	
	setLevel(level)
	
	
	/*setInterval(function(){
		ctx_test.drawImage(canvas_video, 0, 0, 100, 100, 0, 0, 100, 100);
		//ciTileW, riTileH, tileW, tileH, 0, 0, tileW, tileH
		//console.log("hello")
	},100)*/
	
	
})