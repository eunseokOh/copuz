var CanvasPlayer = function(options) {
	


		

	this.cIntervalList = []; // clearInterval List

	this.makeVideoPuzzle = null; // makeVideoPuzzle Object 담을 변수
	this.videoPlayCurrentTime = null;

	this.options = {

			frame: 20,
			hideVideo: true,
			autoplay: false,
			audio : false,
			loop: false,
			videoSelector : null, //필수
			canvasSelector : null, //필수
			btnSelector : null, //필수
			puzzleBoardSelector : null // 필수
		};
		for (i in options) {
			this.options[i] = options[i];
		}
		this.video = document.querySelector(this.options.videoSelector);
		this.canvas = document.querySelector(this.options.canvasSelector);
		this.btn = document.querySelector(this.options.btnSelector);
		this.puzzleBoard = document.querySelector(this.options.puzzleBoardSelector);
		
		if (!this.options.videoSelector ) {
			console.error('"videoSelector"를 입력해주세요');
			return;
		}
		//puzzleBoardSelector
		
		if (!this.options.puzzleBoardSelector ) {
			console.error('"puzzleBoardSelector"를 입력해주세요');
			return;
		}
		
		if (!this.puzzleBoard){
			console.error('"puzzleBoardSelector"의 Element를 찾을 수 없습니다.');
			return;
		}
		
		if (!this.video) {
			console.error('"videoSelector"의 Element를 찾을 수 없습니다.');
			return;
		}
		
		if (!this.options.canvasSelector ) {
			console.error('"canvasSelector"를 입력해주세요');
			return;
		}
		
		if (!this.options.btnSelector) {
			console.error('"btnSelector"를 입력해주세요');
			return;
		}
		
		if (!this.btn) {
			console.error('"btnSelector"의 Element를 찾을 수 없습니다.');
			return;
		}
		
		this.ctx = this.canvas.getContext('2d');
		
		this.init();
		this.bind();


}

CanvasPlayer.prototype.init = function() {
	if (!this.options.hideVideo) {
		this.video.style.display = 'block';
	}

	//console.log(this.video.clientWidth, this.canvas.clientHeight)
	this.width = this.canvas.clientWidth;
	this.height = this.canvas.clientHeight;

	this.canvas.setAttribute('width', this.width);
	this.canvas.setAttribute('height', this.height);



	function setPosition(id, w, h, area) { // canvas 비디오 화면 중앙 정렬

		var tmpId = null;
		id = id.getAttribute("id")
		tmpId = $('#' + id);

		tmpId.css({
			"margin-left" : -(w / 2),
			"margin-top" : -(h / 2)
		});
		if (area) {
			tmpId.css({
				"width" : w,
				"height" : h
			})
		}
	}
	setPosition(this.canvas, this.width, this.height, false);
	setPosition(this.puzzleBoard, this.width, this.height, true);
	

}

CanvasPlayer.prototype.videoDraw = function() {

	
	this.ctx.drawImage(this.video, 0, 0, this.width, this.height);
	this.ctx.font = "bold 30px Righteous";
	this.ctx.fillText("MirimMediaLab", 50, 110);
	this.ctx.fillStyle = "white";
}

CanvasPlayer.prototype.cInterval = function() {
	for ( var i in this.cIntervalList) {
		clearInterval(this.cIntervalList[i])
	}
	this.video.pause();
	this.cIntervalList = [];
}

// 영상 및 퍼즐 다시 시작
CanvasPlayer.prototype.replayVideo = function() {
	this.video.play();
}

CanvasPlayer.prototype.bind = function() {
	this.iOS = !!navigator.platform
			&& /iPad|iPhone|iPod/.test(navigator.platform);
	var self = this;
	var i = null;

	this.fadeWrap = function() { // 불투명한 막 지우는 함수
		$('#' + self.btn.getAttribute('id')).fadeOut('fast')
		$('.body').css('visibility', 'visible')
		$('#touch-text').hide();
	}

	// 옵션 팝업 닫기
	this.hideOption = function() {
		$('.options-wrapper').hide();
		self.canvasDraw();
	}

	// 캔버스에 영상 삽입
	this.canvasDraw = function() {

		if (self.video.currentTime != null) {
			var time = self.video.currentTime;
		} else {
			var time = 0;
		}

		if (self.iOS) {

			var duration = self.video.duration;

			i = setInterval(function() {
				if (duration - (self.options.frame/1000) >= time) {
					time += (self.options.frame/1000);
					self.video.currentTime = time;
					self.videoDraw();
				} else {
					if (self.options.loop) {
						time = 0;
					} else {
						clearInterval(i)
					}
				}
			}, self.options.frame)

			self.cIntervalList.push(i)
		} else {

			var duration = null;

			duration = self.video.duration - 0.1
			self.video.play();

			i = setInterval(function() {
				time = self.video.currentTime

				if (time >= duration) {
					if (self.options.loop) {
						self.video.play();
					} else {
						clearInterval(i)
					}
				}
				self.videoDraw();
			}, self.options.frame)

			self.cIntervalList.push(i)
		}
	}

	

	function startPlay() { // Video를 Canvas에 그리는 함수.


		if (!self.btn.getAttribute('active')) { // 딱 한번만 실행

			self.btn.setAttribute('active', true)
			self.video.load()

			self.video.oncanplaythrough = function() {
				self.canvasDraw();
			}

			$('.puzzle-pieces').css({
				"visibility" : "visible"
			})

			self.makeVideoPuzzle = new MakeVideoPuzzle({ // video Puzzle 조각
				// 만드는 함수
				canvasVideoSelector : '#canvas-video', // 필수
				canvasPiecesSelector : 'canvas-pieces', // 필수
				piecesBoxSelector : '#puzzle-pieces', // 필수
				puzzleBoard : self.puzzleBoard,
				puzzleBoxSelector : '#puzzle-pieces',
				level : 8
			})

			var configBtn = document.querySelector('#btn');

			configBtn.addEventListener("click", function(e) { // 환경 설정 클릭 이벤트
				// 적용
				self.makeVideoPuzzle.cInterval();
				self.cInterval();
				var wrap = document.querySelector('#wrap');
				wrap.style.display = "block";

				$('.options-wrapper').show();
				e.preventDefault();
			})

		} // end of if active

	} // end of startPlay

	this.btn.addEventListener('click', function(e) {
		startPlay();
		self.fadeWrap();
		e.preventDefault();
	}) // end of click event (불투명막 클릭 시 사라지는 함수)

	document.querySelector('#touch-text').addEventListener('click', function(e) {
		startPlay();
		self.fadeWrap()
		e.preventDefault();
	}) // end of click event (불투명막 클릭 시 사라지는 함수)
}
