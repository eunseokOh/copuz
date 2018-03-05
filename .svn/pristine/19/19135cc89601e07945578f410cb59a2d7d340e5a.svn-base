window.onload = function(){

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '124820708031017',
      xfbml      : true,
      version    : 'v2.8'
    });
    FB.AppEvents.logPageView();
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/ko_KR/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
     
   }(document, 'script', 'facebook-jssdk'));


function loginSet(){
	$('#FBlogin > span').text("Logout")
	
}

function logoutSet(){
	$('#FBlogin > span').text("Login")
	 $('#userImg').hide()
}


$('#FBfriends').tooltip({
	title: "<img src='https://scontent-hkg3-1.xx.fbcdn.net/v/t1.0-1/c71.0.240.240/p240x240/10354686_10150004552801856_220367501106153455_n.jpg?oh=d04ae53bb73f5aa86b5f19d79f6a753b&oe=58FDB358' width='50'></img><strong> 바보야 잘좀해보렴^^</strong>", 
	html: true, 
	placement: "bottom",
	
})


setTimeout(function(){
	
	FB.getLoginStatus(function(response) {
		  if (response.status === 'connected') {
			  FBlogin()
		  }
		  else {
			  
		  }
		},true);
 
},600);

//$('#FBfriends').hide()

/*console.log(getCookie("accessToken"))
console.log(getCookie("user_id"))*/

function makeFBfrindsList(val){
	
	
	var divMedia = $('<div />', {
		class:"media"
		
	});
	var divMediaLeft1 = $('<div />',{
		class:"media-left media-middle",
	});
	var img = $('<img />',{
		class:"img-rounded",
		src:"http://graph.facebook.com/"+val.user_id+"/picture?type=square"
	});
	divMediaLeft1.append(img)
	
	var divMediaLeft2 = $('<div />',{
		text:val.user_name,
		class:"media-left media-middle"
	});
	
	var divMediaLeft3 = $('<div />',{
		
		class:"media-left media-middle",
		align:"center"
	});
	
	
	var table = $('<table />',{
		class:'table table-none'
	});
	
	divMediaLeft3.append(table)
	var thead = $('<thead />',{
		
	})
	table.append(thead)
	var theadTr = $('<tr />', {
		
	})
	thead.append(theadTr)
	
	var thLevel = $('<th />', {
		text:"Level"
	})
	theadTr.append(thLevel)
	
	var thScore = $('<th />',{
		text:"Time"
	})
	theadTr.append(thScore)
	
	var tbody = $('<tbody />', {
		align:"center"
	})
	table.append(tbody)
	
	var tbodyTr = $('<tr />',{
		
	})
	tbody.append(tbodyTr)
	
	var tdLevel = $('<td />', {
		text : val.level
	})
	tbodyTr.append(tdLevel)
	
	var tdScore = $('<td />', {
		text : val.score
	})
	tbodyTr.append(tdScore)
	
	divMedia.append(divMediaLeft1).append(divMediaLeft2).append(divMediaLeft3)
	$('#divFBfrindsList').append(divMedia)
}

function FBlogin(){

if($('#FBlogin'+" > span").text() == "Login"){
		
		FB.login(function(response) {
			 if (response.status === 'connected') {
				 var user_id = -1;
				 var user_name = -1;
				 
				  FB.api('/me/picture', function(response) {
					  	//$('#userName').text(response.name)
					    $('#userImg').show()
					    $('#userImg').attr("src",response.data.url)
				  });
				  
				  FB.api('/me/permissions', function(response) {
					  var declined = [];
					  //console.log(response)
					  /*for (i = 0; i < response.data.length; i++) { 
					    if (response.data[i].status == 'declined') {
					      declined.push(response.data[i].permission)
					    }
					  }
					  alert(declined.toString())
					  */
					});
				  
				  FB.api("/me/invitable_friends", function(response){
					  //console.log(response)
				  });
				  
				  FB.api('/me', function(response) {
					  user_name = response.name
					  user_id = response.id
					  var user_data = {"user_id":user_id,"user_name":user_name}
					  if(typeof(getCookie("user_id")) != user_id){
						  setCookie("user_id",user_id,365)
					  }
						 $.ajax({
								type:"post",
								url:"/user/login",
								data : user_data,
								success:function(data){
									//console.log("!")
								},
								error:function(jqXHR, textStatus, errorThrown){
						            //alert("에러 발생~~ \n" + textStatus + " : " + errorThrown);
						            self.close();
						        }
						 }) // end of ajax
					  	$('#userName').text(response.name)
				  });
				  
				  FB.api('/me/friends', function(response) {
					  	//console.log(response.data)
					  	$('#divFBfrindsList').empty();
					  	var userListVO = [];
					  	$.each(response.data, function(key, val){
					  		userListVO.push({"user_id":val.id,"user_name":val.name})
					  		//data_list.push(val.id)
					  	});
					  	//console.log(data_list)
					  	//$.ajaxSettings.traditional = true;
					  	//console.log(userListVO[0].user_id,"화긴")
					  	
					  	
					  	$.ajax({
					  		url:"/score/select_fbfriends",
					  		type:"post",
					  		contentType : "application/json; charset=UTF-8",
					  		data: JSON.stringify(userListVO),
					  		success:function(data){
					  			if(data){
					  				
								  	
								  	
								  	$.each(data, function(key, val){
								  		makeFBfrindsList(val)
								  	});
					  			}
					  			
					  		}
					  	});
					  	
					  	
					  	
					  	$('#FBfriends').show()
				  });
				  loginSet() 
				  var accessToken = response.authResponse.accessToken;
				  setCookie("accessToken",accessToken,365)
				  //console.log(getCookie("accessToken"))

			  }
			  else {
				  logoutSet()
			  }
		},{scope: 'public_profile,email,user_friends,user_birthday,user_location'});
		
	} else{
		
		 FB.logout(function(response){
			 $('#FBfriends').hide()
			 removeCookie("user_id")
			 removeCookie("accessToken")
			 logoutSet()
			 $('#userName').text("Please login")	 
			 swal({
				 type:"success",
				 timer:2000,
				 title:"Logout!"
			 })
				
			},true);	   
	}

}

$('#FBlogin').on("click", function(){
	FBlogin()
})


}
