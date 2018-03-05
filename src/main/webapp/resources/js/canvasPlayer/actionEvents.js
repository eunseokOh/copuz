var ActionEvents = function(options){
	
	this.preClicked = null; //이전 클릭한 canvasPieces Id
	this.outlineColor = "silver"; //out line color 설정
	this.movedList = []; //canvas-pieces를 puzzle-board-pieces에 옮길 시 추가됨
	                     //resize 이벤트 발생 시 puzzle-board-pieces 위치에 맞게 canvas-pieces가 움직임
	this.options = {
			canvasPieces : null,
			puzzleBoardPieces : null,
			makeVideoPuzzle : null
	};
	
	for(var i in options){
		this.options[i] = options[i]
	};
	this.canvasPieces = this.options.canvasPieces;
	this.puzzleBoardPieces = this.options.puzzleBoardPieces;
	this.makeVideoPuzzle = this.options.makeVideoPuzzle;
	this.bind();
	
	
}

ActionEvents.prototype.bind = function(){
	var self = this;
	
	function canvasPiecesNoneOutline(){
		$('.'+self.canvasPieces).css({
			"outline-color" : self.outlineColor,
			"z-index" : "20",
			"opacity" : "1",
			"animation" : "none"
		})
	}
	

	
	function checkAllMovedPieces(){
		var tmpCanvasPieces = document.querySelectorAll('.canvas-pieces');
		var tmpCnt = 0;
		for(var i=0; i<tmpCanvasPieces.length; i++){
			if(tmpCanvasPieces[i].getAttribute('isMoved')){
				tmpCnt++;
			}
		}
		
		if(tmpCnt == tmpCanvasPieces.length){
			return true
		}else{
			return false;
		}
	}
	
	window.onresize = function(event){ //resize 이벤트
		for(var i in self.movedList){
			var tmpPBPoffset = $('#'+self.movedList[i]["puzzle-board-pieces"]).offset()
			var tmpLeft = tmpPBPoffset.left
			var tmpTop = tmpPBPoffset.top
			
			$('#'+self.movedList[i]["canvas-pieces"]).offset({
				left : tmpLeft,
				top : tmpTop
			})
		}
	};
	var testNum = 1;
	
	function showMsg(text, msgColor){
		var msg = document.createElement("h1");
		msg.setAttribute("class", "msgFont");
		msg.innerHTML = text;
		
		if(msgColor){
			msg.style.color = msgColor;
		}
		
		$('.msgBlock').append(msg);
		
		setTimeout(function(){
			msg.remove();
		},2200)
	}
	
	$('.'+this.puzzleBoardPieces).on("click", function(e){
		var tmpBoardPiecesThis = $(this);
		if(!($(this).css('outline').indexOf("none") > -1)){ //outline이 있을때만 이벤트 적용
			canvasPiecesNoneOutline()
			
			var BoardPiecesIdNum = $(this).attr("id").replace(self.puzzleBoardPieces,"");
			var CanvasPiecesIdNum = self.preClicked.attr("id").replace(self.canvasPieces,"");
		
			self.preClicked.attr("isMoved", true);
			self.movedList.push({
				"puzzle-board-pieces":$(this).attr("id"),
				"canvas-pieces":self.preClicked.attr("id")
			})
			// start of animate
			self.preClicked.css({
				position:"absolute"
			})
			
			self.preClicked.animate({
				left: $(this).offset().left,
				top: $(this).offset().top
			}, 500, function(){
				
				
				$('.'+self.puzzleBoardPieces).css({
					"outline": "none"
				})
				
				if(checkAllMovedPieces()){
					testNum++;
					self.makeVideoPuzzle.viewPuzzlePieces = [];
					self.makeVideoPuzzle.canvasDrawInit(testNum)
				}
				
				if( self.makeVideoPuzzle.completeBoardList[BoardPiecesIdNum] == CanvasPiecesIdNum){
					
					
					clearInterval($(this).attr("cno"));
					self.preClicked.remove();
					tmpBoardPiecesThis.css({
						opacity : 0
					});
					
					showMsg("GOOD!")
				}else{
					showMsg("BAD","RED")
				}; //퍼즐 조각이 맞았을 때 이벤트
				
				self.preClicked = null;
				
				e.preventDefault();
			})
			// end of animate --> 0.5초안에 지정된 곳으로 움직임
		}
	}) // end of puzzleBoardPieces clicked
	
	$(document).on("click", '.'+this.canvasPieces,function(e){
		
		if( self.preClicked && self.preClicked.attr('id') == $(this).attr('id')){
			
			canvasPiecesNoneOutline()
			$('.'+self.puzzleBoardPieces).css({
				"outline": "none"
			})
			self.preClicked = null;
		}else{
			canvasPiecesNoneOutline()
			
			$(this).css({
				"outline-color" : "#FF8598",
				"z-index" : "99",
				"opacity" : "0.5",
				"animation" : "piecesScale 1s infinite"
			})
			
			$('.'+self.puzzleBoardPieces).css({
				"outline": "solid",
				"outline-width": "thin",
				"outline-color": self.outlineColor
			})
			self.preClicked = $(this)
			e.preventDefault();
		}
	}) // end of canvasPieces clicked
	
}
