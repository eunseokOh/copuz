$(document).ready(function(){
	

	$('body').bind('touchmove', function (ev) { 
		  ev.preventDefault();
	}); // touch 
	
	chgDisplay = function(id){
		$.ajax({
			url:id,
			async: true,
			success:function(data){
				
					$('.inner-contents').empty();
					$('.inner-contents').append(data)
				
				
			}
		})
	}
	
	chgDisplay("/remake/splash");
	
	$(document).on('click','.btn',function(){
		chgDisplay("/remake/"+$(this).attr("id"))
	})
	
	
})