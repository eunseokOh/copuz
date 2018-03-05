function setCookie(cName, cValue, cDays){
	var expires = -1; //쿠키 만료일
	
	if(cDays){
		var date = new Date()
		date.setTime(date.getTime() + (cDays*24*60*60*1000))
		expires = ";expires=" + date.toGMTString();
	}
	
	document.cookie = cName + "=" + cValue + expires + ";path=/";
}

function getCookie(cName){
	var name = cName + "=";

	var ca = document.cookie.split(';');

	for(var i=0; i<ca.length;i++){

	var c = ca[i];

	while(c.charAt(0)==' ') c = c.substring(1);

	if(c.indexOf(name) == 0) return c.substring(name.length,c.length);

	}

	return "";

}

function removeCookie(cName){
	setCookie(cName,"",-1)
}