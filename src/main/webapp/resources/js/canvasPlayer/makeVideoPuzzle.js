var MakeVideoPuzzle = function(options) {
	this.cut_canvas_video_width = null; // 커팅할 퍼즐 조각 width
	this.cut_canvas_video_height = null; // 커팅할 퍼즐 조각 height
	this.ROWS = null; // 레벨에 따른 row 개수
	this.COLS = null; // 레벨에 따른 column 개수
	this.canvas_video_width = null; // canvas video width구하기 (반응형에 따라 달라짐)
	this.canvas_video_height = null; // canvcas video height 구하기 (반응형에 따라
	// 달라짐)
	this.cIntervalList = []; // clear Interval List (puzzle pieces)
	this.completeBoardList = []; // puzzle-board-pieces와 canvas-pieces의 아이디를
	// 맞추기 위한 리스트

	this.puzzleBoardPieces = "puzzle-board-pieces"; // puzzle-board-pieces아이디와
	// 클래스에 사용할 변수
	
	this.addCutWidthCount = 0; //cut_canvas_video_width가 canvas_video_width에 나누어 떨어지지 않을 때 width를 맞추기 위한 변수
	this.addCutHeightCount = 0; //cut_canvas_video_height가 canvas_video_height에 나누어 떨어지지 않을 때 height를 맞추기 위한 변수

	this.puzzleDataList = []; // 퍼즐 리스트
	this.tmpPuzzleViewCnt = 0; // 임시 View 수량
	this.puzzleGroupNo = 1; // 퍼즐조각 묶음 번호
	this.puzzleGroupViewQty = 1; // 화면에 출력할 퍼즐조각 수량
	this.viewPuzzlePieces = []; // 화면에 출력할 퍼즐 조각

	this.options = {
		level : 1,
		mood : "time",
		frame : 50,
		canvasVideoSelector : null, // 필수
		canvasPiecesSelector : null, // 필수
		piecesBoxSelector : null, // 필수
		puzzleBoard : null
	}

	for ( var i in options) {
		this.options[i] = options[i];
	}

	this.options.canvasPiecesSelector.replace("#", "").replace(".", "")
	this.canvasVideo = document.querySelector(this.options.canvasVideoSelector)

	if (!this.options.canvasVideoSelector) {
		console.error('"canvasVideoSelector"를 입력해주세요')
	}

	if (!this.canvasVideo) {
		console.error('"canvasVideoSelector"의 Element를 찾을 수 없습니다.')
	}

	this.init(); // 사이즈 설정 및 피스 조각 개수를 구함
	this.makePuzzlePieces();

	this.actionEvents = new ActionEvents({ // action event를 적용하는 함수
		canvasPieces : this.options.canvasPiecesSelector,
		puzzleBoardPieces : this.puzzleBoardPieces,
		makeVideoPuzzle : this
	})
}

// 퍼즐조각 영상 정지
MakeVideoPuzzle.prototype.cInterval = function() {
	for ( var i in this.cIntervalList) {
		clearInterval(this.cIntervalList[i])
	}
	this.cIntervalList = [];
}

// 퍼즐조각 영상 다시재생
MakeVideoPuzzle.prototype.rePlayPuzzle = function() {
	this.puzzlePiecesView();
}

MakeVideoPuzzle.prototype.init = function() {
	this.canvas_video_width = this.canvasVideo.clientWidth;
	this.canvas_video_height = this.canvasVideo.clientHeight;

	this.ROWS = 2 + Math.ceil(this.options.level / 2);
	this.COLS = 2 + Math.floor(this.options.level / 2);

	this.cut_canvas_video_width = Math.floor(this.canvas_video_width/ this.ROWS);
	this.cut_canvas_video_height = Math.floor(this.canvas_video_height/ this.COLS);
	this.puzzleGroupViewQty = Math.floor(this.canvas_video_width / this.cut_canvas_video_width);
	
	var self = this;
	
	function checkFitSize(){
		var canvasArea = self.canvas_video_width * self.canvas_video_height;
		var cutCanvasArea = self.cut_canvas_video_height * self.cut_canvas_video_width * self.ROWS * self.COLS;
		
		if( canvasArea === cutCanvasArea) return true
		else return false
	}
	
	if(!checkFitSize()){
		
		
		function checkWH(len, subNum){
			var tmpLen = len;
			
			while(true){
				if(tmpLen-subNum < 0){
					break;
				}else{
					tmpLen -= subNum
				}
			}
			
			return tmpLen;
		}
		
		this.addCutWidthCount = checkWH(this.canvas_video_width, this.cut_canvas_video_width);
		this.addCutHeightCount = checkWH(this.canvas_video_height, this.cut_canvas_video_height);
	}
}

MakeVideoPuzzle.prototype.makePuzzlePieces = function() {

	var self = this;
	var criterion = 0;
	var tmpAddNum = this.COLS;
	var tmpNum = 0;
	
	var tmpaddCutWidthCountNum = 0;
	var tmpaddCutHeightCountNum = this.ROWS * this.addCutHeightCount;
	var tmpHeightCountNum = 0;

	function makePuzzleBoard(idIdx, w, h) { // .puzzle-board에 canvas 태그를 append함
		var tmpCanvas = document.createElement('canvas');

		tmpCanvas.setAttribute("class", self.puzzleBoardPieces);
		tmpCanvas.setAttribute("id", self.puzzleBoardPieces + idIdx);
	
		if(self.addCutWidthCount != 0 && self.addCutWidthCount > tmpaddCutWidthCountNum){
			tmpCanvas.setAttribute("width", w+1);
		}else{
			tmpCanvas.setAttribute("width", w);
		}
		tmpaddCutWidthCountNum++;
		if( tmpaddCutWidthCountNum == self.ROWS){
			tmpaddCutWidthCountNum = 0;
			nextROWS = true; 
		}
		
		if(  tmpHeightCountNum < tmpaddCutHeightCountNum){
			tmpCanvas.setAttribute("height", h+1);
			tmpHeightCountNum++;
		}else{
			tmpCanvas.setAttribute("height", h);
		}
		
		self.completeBoardList.push(tmpNum);
		tmpNum += tmpAddNum;
		if ((self.COLS * self.ROWS) + criterion <= tmpNum) {
			criterion++;
			tmpNum = criterion;
		}
		self.options.puzzleBoard.appendChild(tmpCanvas);
	}

	// 퍼즐조각 데이터 삽입
	function puzzlePiecesInfoInsert() {
		var tmpCanvasNo = 0;
		for (var i = 0; i < self.ROWS; i++) {
			for (var j = 0; j < self.COLS; j++) {
				var tmpCanvasData = null; // 퍼즐 조각 데이터 임시 보관

				tmpCanvasData = {
					x : i * self.cut_canvas_video_width,
					y : j * self.cut_canvas_video_height,
					puzzleGroupNo : null,
					canvasNo : tmpCanvasNo
				}
				tmpCanvasNo++;
				self.puzzleDataList.push(tmpCanvasData);

				makePuzzleBoard(tmpCanvasData.canvasNo,
						self.cut_canvas_video_width,
						self.cut_canvas_video_height)
			}
		}
	}

	// 퍼즐 데이터 리스트 섞기
	function shuffle(sList) {
		for (var j, x, i = sList.length; i; j = Math.floor(Math.random() * i), x = sList[--i], sList[i] = sList[j], sList[j] = x)
			;
		return sList;
	}

	// 퍼즐 조각 그룹번호 삽입
	function puzzleGroupNoInsert() {
		for (var i = 0; i < self.puzzleDataList.length; i++) {

			// 퍼즐 그룹번호 설정을 위한 ViewQtyCount
			if (self.tmpPuzzleViewCnt == 0) {
				self.tmpPuzzleViewCnt = self.puzzleGroupViewQty;
			}

			// 퍼즐 그룹번호 세팅
			self.tmpPuzzleViewCnt--;
			// 퍼즐 그룹번호 삽입
			self.puzzleDataList[i].puzzleGroupNo = self.puzzleGroupNo;
			if (self.tmpPuzzleViewCnt == 0) {
				self.puzzleGroupNo++;
			}
		}
	}

	// 해당 영상 퍼즐조각 세팅
	this.canvasDrawInit = function(gNo)  {
		
		// var viewPuzzlePieces = [];
		var puzzleBox0 = document.querySelector(self.options.puzzleBoxSelector
				+ "0");

		// GroupNo 1번 추출
		for ( var key in self.puzzleDataList) {
			if (self.puzzleDataList[key].puzzleGroupNo == gNo) {
				
				self.viewPuzzlePieces.push(self.puzzleDataList[key]);
			}
		}

		// 캔버스 퍼즐 조각 영역 추가
		for ( var key in self.viewPuzzlePieces) {
			var CanvasPiece = document.createElement('canvas');
			CanvasPiece
					.setAttribute("class", self.options.canvasPiecesSelector)
			CanvasPiece.setAttribute("id", self.options.canvasPiecesSelector
					+ self.viewPuzzlePieces[key].canvasNo)
			CanvasPiece.setAttribute("width", self.cut_canvas_video_width)
			CanvasPiece.setAttribute("height", self.cut_canvas_video_height)

			puzzleBox0.appendChild(CanvasPiece);
		}

		self.puzzlePiecesView();

	}

	// 해당 퍼즐조각 영상 삽입
	self.puzzlePiecesView = function() {
		
		for ( var key in self.viewPuzzlePieces) {
			var tmpCanvasPiece = document.getElementById(self.options.canvasPiecesSelector + self.viewPuzzlePieces[key].canvasNo);
			
			makeIntervalPuzzlePieces(self.viewPuzzlePieces[key].x, self.viewPuzzlePieces[key].y, tmpCanvasPiece);
		}
	}

	// 퍼즐 조각 영상 삽입
	var makeIntervalPuzzlePieces = function(x, y, tmpCanvasPiece) {
		var ctx_tmpCanvasPiece = tmpCanvasPiece.getContext('2d');
		var i = setInterval(function() {
			ctx_tmpCanvasPiece.drawImage(self.canvasVideo, x, y,
					self.cut_canvas_video_width, self.cut_canvas_video_height,
					0, 0, self.cut_canvas_video_width,
					self.cut_canvas_video_height);
		}, self.options.frame);
		tmpCanvasPiece.setAttribute("cNo", i);
		self.cIntervalList.push(i)
	}

	puzzlePiecesInfoInsert();
	this.puzzleDataList = shuffle(this.puzzleDataList);
	puzzleGroupNoInsert();
	this.canvasDrawInit(1);

}
