var second = 0;
var mSecond = 0;

onmessage = function(event) {
    if(typeof(event.data) != 'undefined'){
    	second = event.data[0]
    	mSecond = event.data[1]
    }
    setTimeout(function(){
    	i = setInterval(TimeWatch, 100)
    },100)
    
};


var TimeWatch = function(){
			mSecond++;
			if(mSecond == 10){
				mSecond = 0;
				second++;
			}
			postMessage(" "+second+"."+mSecond)
}


