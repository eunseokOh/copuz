

$(document).ready(function(){
	
	// setTile -> defaultTile -> tiles -> update
	var ROWS = -1; // 퍼즐 열 갯수
	var COLS = -1; // 퍼즐 행 갯수
	var curLevel =1;
	var isFirst = true;
	var oriLocationList = [];
	var oriIdList = [];
	var mClosestId = -1; // most closest id
	var width = 0; // 원본 영상의 넓이를 입력하기 위해 선언
	var height = 0; // 원본 영상의 높이를 입력하기 위해 선언
	var tileZIndex = 1;
	var tileW = -1;
	var tileH = -1;
	var inputMaxCount = 0; 
	var count = 0;
	
	var videoList = ['autorecord.mp4', 'chicken.mp4', 'cider.mp4', 'groupcall.mp4', 'kloud.mp4', 'narae.mp4', 'penguin640.mp4']; // 영상
																												// List
	var dVPath = "./resources/video/vjigsaw/" // default Video Path
	var video = document.getElementById("myvideo")
	var videoRandomIndex = Math.floor(Math.random() * (videoList.length));
	
	var resultBoxInputCheckDic = {};
	
	video.src = dVPath+videoList[videoRandomIndex];
	
	
	var saveInputTilesList = []; // drag drop으로 타일을 놓으면 리스트 형태로 저장
	
	
	function moveLevel(level){
		curLevel = level
		ROWS = 2 + Math.floor(level/2)
		COLS = 2 + Math.ceil(level/2)
	}
	moveLevel(5)
	function randomArrayList(oriList){
		var chaList = []
		var oriListlength = oriList.length
		var overlapCheckList = new Array(oriListlength)
		
		$.each(oriList, function(index, value){
			
				var randIdx = Math.floor(Math.random() * oriListlength)
				while(overlapCheckList[randIdx] == "insert"){
					randIdx = Math.floor( Math.random() * oriListlength )
				}
				chaList.push(oriList[randIdx]);
				overlapCheckList[randIdx] = "insert"
		});
		return chaList
	}
	
	function shuffleTiles(){
		// oriLocationList.0 = id ,oriLocationList.1 = left, oriLocationList.2 =
		// top
		
		// console.log(oriIdList)
	 	$.each(randomArrayList(oriLocationList), function(index, value){
			
			$(oriIdList[index]).css({
				"position": "absolute",
				"top" : value[1],
				"left" : value[0]
			})
		}); 
		// console.log(oriLocationList)
	}
	
	function mostClosestCanvas(id, targetId){
		
		var jid = $('#'+id)// jQuery id
		
		selectPositionLeft = jid.offset().left; // 선택한 canvas left position
		selectPositionTop = jid.offset().top; // 선택한 canvas top position
		
		mClosestId = -1
		var mTop = -1; // most closest Top value
		$('#'+targetId).find('canvas').each(function(index, value){
			
				// console.log(value.id, id)
			var left = $('#'+value.id).offset().left
    		var top = $('#'+value.id).offset().top
    		
    		if( Math.abs(left - selectPositionLeft) <= (tileW*0.4)){
    			if (Math.abs(selectPositionTop - top) <= (tileH*0.4) ){
    				mClosestId = value.id
    			} 
    		}
		})
		
		if(mClosestId != -1){
			
			$('.inputPuzzle').css({
				"border-style" : "none"
				
			})
			if(resultBoxInputCheckDic[mClosestId] == false){
				$('#'+mClosestId).css({
					"border-style" : "solid",
					"border-color" : "blue",
					"border-width" : "0.7px"
				})
			}
			
			
		} else{
			$('.inputPuzzle').css({
				"border-style" : "none"
				
			})
			
			jid.css({
				"border-style":"solid",
				"border-color":"white",
				"border-width":"thin"
			})
		}
		
	}
	
	$('.closeModal').on("click", function(){
		$('#finishPlace').modal('hide')
		
		nextLevel()
	})
	
	function makeRankTable(key, value){
		
	
		var tr = $('<tr />',{
			
		})
		
		var tdNo = $('<td />', {
			text: key+1
		})
		
		var tdLevel = $('<td />', {
			text:value.level
		})
		
			//href : "https://www.facebook.com/"+value.user_id
		
		
		var tdName = $('<td />', {
			text:value.user_name,
			onclick:"window.open('https://www.facebook.com/"+value.user_id+"');"
		}).css("cursor","pointer")
		
		var tdTime = $('<td />', {
			text:value.score
		})
		
		var tdDate = $('<td />', {
			text:value.score_date
		})
		
		tr.append(tdNo).append(tdLevel).append(tdName).append(tdTime).append(tdDate)
		
		return tr;
	}
	
	function ranking(){
			$.ajax({
				type:"post",
				url:"/score/select_all/"+curLevel,
				success:function(data){
					
					var table = $('<table />',{
						class:"table table-hover",
					})
					
					var thead = $('<thead />',{
						align:"center"
					}).css("font-weight","bold")
					
					var tr = $('<tr />',{
						
					})
					var thLevel = $('<td />',{
						text:"Level"
					})
					
					var thName = $('<td />',{
						text:"Name"
					})
					
					var thTime = $('<td />',{
						text:"Time"
					})
					
					var thNo = $('<td />',{
						text:"No"
					})
					
					var thDate = $('<td />',{
						text:"Date"
					})
					
					var tbody = $('<tbody />', {
						align:"center"
					})
					
					thead.append(tr)
					tr.append(thNo).append(thLevel).append(thName).append(thTime).append(thDate)
					table.append(thead)
					table.append(tbody)
					$.each(data, function(key, val){
						tbody.append(makeRankTable(key, val))
					})
					
					$('#ranking').append(table)
				},
				error:function(data){
					console.log(data)
				}
		})
	}
	
	function finishPuzzle(){
		stopWorker();
		video.pause();
		var time = $('#timer').text()
		
		
		var finishVideoId = document.getElementById('finishVideo')
		finishVideoId.src = dVPath+videoList[videoRandomIndex]
		finishVideoId.play();
		$('#finishTimer').text(time+" Second!")
		$('#finishPlace').modal('show')
		
		var scoreData = {"user_id":getCookie("user_id"), "score":time, "level":curLevel}
		
		$.ajax({
			type:"post",
			data:scoreData,
			url:"/score/insert",
			success:function(data){
				console.log(data)
			}
		}).done(function(){
			ranking()
		})
		
		
		
	}
	
	function defaultTile(){
		  count = 0
		  $('#curLevel').text(curLevel)	
		  
		  update(video)
		  startWorker();	
		  
		    
		  function defaultCss(){
			  
			  $('.tile' ).css({
				  	"border-style":"solid",
					"border-color":"white",
					"border-width":"thin"
			  })
			  
		  }
		  
		  defaultCss()
		  
		    $( ".tile" ).draggable({		    		    		    
		    	start : function(event, ui){
		    		var idStr = $("#"+this.id)
					// ***** 타일선택시 선택한 타일이 가장 위에 보이게
					tileZIndex++;
		    		idStr.css({
						'z-index':tileZIndex,
						"border-style":"solid",
						"border-color":"green"
					});
		    		
		    		for(var key in resultBoxInputCheckDic){
		    			if( resultBoxInputCheckDic[key] == this.id){
		    				resultBoxInputCheckDic[key] = false
		    				
		    			}
		    		}
		    	}, 
		    	drag : function(event, ui){
		    		mostClosestCanvas(this.id, "resultBox")
		    	},
		    	stop : function(event, ui){
		    		
		    		var idStr = $("#"+this.id);
		    		
		    		var inputPuzzleIdN = -1
		    		
		    		
		    		
		    		if ( mClosestId != -1 && resultBoxInputCheckDic[mClosestId] == false ){
		    			
		    				
		    				resultBoxInputCheckDic[mClosestId] = this.id
		    				
		    				
		    				var mClosest = $('#'+mClosestId)
				    		// selectCanvasOffestTop = idStr.offset().top
				    		// selectCanvasOffestLeft = idStr.offset().left
				    		mClosestTop = mClosest.offset().top
				    		mClosestLeft = mClosest.offset().left
				    		idStr.offset({
				    			"top":mClosestTop,
				    			"left":mClosestLeft
				    		})
				    		$('.inputPuzzle, #'+this.id).css({
			    			"border-style" : "none"
			     		 })
		    			
			     		var tileIdN = idStr[0].id.replace("tile","")
			    		if(mClosestId != -1){
			    			inputPuzzleIdN = mClosestId.replace("inputPuzzle","")
			    		}
		    				
			     		if( tileIdN == inputPuzzleIdN && count < inputMaxCount){
			     			count++;
			     			idStr.draggable("disable")
			     			if(count == inputMaxCount){
			     				console.log("finish")
				    			finishPuzzle()
				    		}
			     		}
			    		
		    		}
		    		
		    		
		    		
		    	}		    	
		    }); 
		    		  
		    $('.tile').on('click',function(){		    	
		    	var idStr = "#"+this.id;
				// ***** 타일선택시 선택한 타일이 가장 위에 보이게
				tileZIndex++;
				$(idStr).css('z-index', tileZIndex);

			})					   	
	}
	
	
	
	function setTile(levupdown){ // 불러온 영상 사이즈 확인 함수
		
		// levupdown true == up, levupdown false == down
		oriLocationList = []
		oriIdList =[]
	
		if(levupdown == true){
			if ( curLevel % 2 == 0){
				ROWS++
			}else{
				COLS++
			}
		}else{
			if ( curLevel % 2 == 0){
				COLS--
				
			}else{
				ROWS--
			}
		}
		
		if(isFirst === true){
			video.addEventListener("loadedmetadata", function(e) { // Load된 영상의
																	// 사이즈를 구하기
																	// 위한 함수
			    width = this.videoWidth;
			    height = this.videoHeight;
			    
			    $('#box, #resultBox').css({"width":width+10, "height":height+10}) 
			    defaultTile();
			});
			
			isFirst = false
		}else {
			defaultTile();
		}
	} // end of setTile
	video.play();
	setTile(true)
	

	function update(video) { // 영상 이미지를 0.05초마다 캡쳐 후 tiles함수 사용
		
		tileW = Math.round(width / COLS); // 퍼즐당 넓이 구하기
		tileH = Math.round(height / ROWS); // 퍼즐당 높이 구하기
		
		var idCount = -1;
		
		for (var ri = 0; ri < ROWS; ri += 1) {
			for (var ci = 0; ci < COLS; ci += 1) {
				
					idCount++;
					id = "tile"+idCount
	
					resultBoxInputCheckDic['inputPuzzle'+idCount] = false
					var tile = $('<canvas class="tile" id="' + id + '" height="' + tileH + '" width="' + tileW + '"></canvas>').get(0);
					var resultBox = $('<canvas id=inputPuzzle'+idCount+' class="inputPuzzle" height="' + tileH + '" width="' + tileW + '"></canvas>').get(0);
					$("#box").append(tile);
					$("#resultBox").append(resultBox);
					
					oriLocationList.push([$('#'+id).position().left, $('#'+id).position().top])
					oriIdList.push('#'+id)
					
					if (ri == ROWS-1 && ci == COLS-1){
						inputMaxCount = ROWS*COLS;
						// console.log(resultBoxInputCheckDic['inputPuzzle0'])
						shuffleTiles(); // 순서 섞기
					}
				}
		}
		
		tiles()
		
		//setInterval(function() {tiles(2, 2, 6, 6)}, 50);
	} // end of update
	var intervalDrawImageList = []
	var i = -1;
	function intervalDrawImage(context,ciTileW, riTileH){
		
		i = setInterval(function() {			
				context.drawImage(video, ciTileW, riTileH, tileW, tileH, 0, 0, tileW, tileH);
		}, 100);	
		
		intervalDrawImageList.push(i)
	}
	
	function tiles() { // 영상 이미지를 잘라주는 함수
		
		var idCount = -1;
		for (var ri = 0; ri < ROWS; ri += 1) {
			for (var ci = 0; ci < COLS; ci += 1) {
					
				idCount++;
				ciTileW = ci*tileW
				riTileH = ri*tileH
				id = "tile"+idCount					
				var getit = $('#'+id)[0];
				context = getit.getContext('2d');
				
				intervalDrawImage(context,ciTileW, riTileH);
					
				}
			}
		
	} // end of tiles
	
	var w;
	 
	function startWorker(saveTime) {
		
		if(window.Worker){
			
		        w = new Worker("./resources/js/timer/timer.js");
		        w.postMessage(saveTime)
		        w.onmessage = function(event) {
		            $('#timer').text(event.data)
		        };
		        
		        
		}
		else{
			
		}
	}
	
	function stopWorker() {
	    w.terminate();
	    w = undefined;
	}
	
	
	
	function empty(){
		$('#curLevel').empty();
		$('#box').empty();
		$('#resultBox').find("canvas").remove();
		$('#ranking').empty();
		if(typeof(w) != 'undefined'){
			stopWorker();
		}
		
		if(video.paused){
			video.play()
		}
		
		for(var i in intervalDrawImageList){
			
			clearInterval(intervalDrawImageList[i])
		}
		
		intervalDrawImageList = []
	}
	// level 처리
	
	$('#preLevel').on("click", function(){
		
		if ( curLevel > 1 ){
			curLevel--;
			empty()
			$('#curLevel').text(curLevel);
		
			setTile(false)
		}
	})
	 
	function nextLevel(){
		empty()
		curLevel++;
		
		$('#curLevel').text(curLevel);
	
		setTile(true)
	}
	 $('#nextLevel').on("click", function(){
		 nextLevel()
	})
	
	// level 처리 end
	// movie on off 처리 start
	$('#videoOnOff').on("click", function(){
		if( $('#'+this.id+" > span").text() == " Off"){
			$('#'+this.id+" > span").text(" On")	
			$('#myvideo').hide()
		}else {
			$('#'+this.id+" > span").text(" Off")
			$('#myvideo').show()
		}
	});
	
	// movie on off 처리 end
	
	// pause Restart 
	var saveTimeList = -1;
	$('#gamePause').on("click", function(){
		var thisIdSpan = $('#'+this.id+" > span")
		if(thisIdSpan.text() == " Pause"){
			thisIdSpan.attr("class", "glyphicon glyphicon-play")
			thisIdSpan.text(" Restart")
			$('#puzzlePlace').hide()
			video.pause()
			stopWorker()
			saveTimeList = $('#timer').text().split('.')
			
		}else {
			thisIdSpan.attr("class", "glyphicon glyphicon-pause")
			thisIdSpan.text(" Pause")
			$('#puzzlePlace').show()
			video.play()
			startWorker(saveTimeList)
		}
		
	})
	// end of pause Restart
	
});