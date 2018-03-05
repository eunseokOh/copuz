<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="utf-8"%>
<!DOCTYPE>
<html>
<head>
<meta charset="utf-8">
<link  rel="stylesheet" href="./resources/css/sweetAlert/sweetalert.css"></link>
<script src="./resources/js/cookie/cookie.js"></script>
<script src="./resources/js/sweetAlert/sweetalert.min.js"></script>
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script
	src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<link href="./resources/css/vjigsaw/vjigsaw.css" rel="stylesheet">
<script src="./resources/js/vjigsaw/vjigsaw.js"></script>

<title>Game</title>
 <style>
.tooltip > .tooltip-inner {
    background-color: gray; 
    color: #FFFFFF; 
    border: 1px solid black;
    
    padding:15px;
    font-size: 13px;
    width: 600px;
    text-align: left;
    height: auto;
}
.tooltip.bottom > .tooltip-arrow {
    border-top: 5px solid green;
}

</style> 
</head>
<body>
<script src="./resources/js/vjigsaw/facebookLogin.js"  charset="utf-8"></script>
<nav class="navbar navbar-inverse">
  <div class="container-fluid">
  
    <div class="navbar-header">
        <span ><img style="margin-top:5px; margin-right:10px;" id="userImg"  hidden="hidden" class="img-rounded" width="40" ></span>
    	<span id="userName" class="navbar-brand" >Please login</span>
    </div>
    <ul class="nav navbar-nav" style="margin-top:10px">
      <li>
		<button type="button" id="preLevel" class="btn btn-info ">
				<span class="glyphicon glyphicon-menu-left"></span>
			</button>
			<span class="badge" id="curLevel"></span>
			<button type="button" id="nextLevel" class="btn btn-info ">
				<span class="glyphicon glyphicon-menu-right"></span>
			</button>
	  </li>
      <li style="margin-left:10px">
	      <button type="button" id="videoOnOff" class="btn btn-info ">
					<span class="glyphicon glyphicon-film" > Off</span>
		  </button>
	  </li >
      <li  style="margin-left:10px">
      	<button type="button" class="btn btn-info" id="gamePause">
					<span class="glyphicon glyphicon-pause"> Pause</span>
		  </button>
      </li>
      <li style="margin-left: 10px">
      	
      	<button type="button" class="btn btn-info" id="FBfriends" data-toggle="modal" data-target="#FBfriendsList">
					<span class="glyphicon glyphicon-user" > Friends</span>
		</button>
		
      </li>
     
    </ul>
    <ul class="nav navbar-nav navbar-right" style="margin-top:10px; margin-right:5px">
    
    
      <li><button type="button" class="btn btn-default" style="background-color: #4267B2; color:white; border-style: none" id="FBlogin" >
				<img src="./resources/img/icon/fb.png" width="20" style="float: left" align="left">
				<span>Login</span>		
		  </button>
	 </li>
      
    </ul>
  </div>
</nav>

	<div style="width:70%; display: table; margin-left: 1%">
		<div style="width: 5%; display: table-cell; vertical-align: middle;" >
			<div style="position: relative; display: inline-block;">
			<span id="timer" class="glyphicon glyphicon-time" style="color:white; "></span>
		</div>
		<div style="width: 10%; display: table-cell; vertical-align: middle;">
			<video loop="loop" id="myvideo" hidden=""></video>
		</div>
	</div>
	</div>
	<hr style="clear: left;">

	<div class="row" id="puzzlePlace"
		style="  border: solid; padding-bottom: 10px; margin-left: 10px; margin-right: 10px; border-color: white;">
		<div class="col-sm-6">
			<div id="resultBox" style="margin-left: 10px; margin-top: 10px;">
				
			</div>
		</div>
		<div class="col-sm-6">
			<div id="box" style="margin-left: 10px; margin-top: 10px;"></div>
		</div>

	</div>
	
	
	<!-- Modal -->
<div id="finishPlace" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close closeModal" >&times;</button>
        <h4 class="modal-title" id="finishTimer"></h4>
      </div>
      <div class="modal-body">
        <video id="finishVideo" class="img-responsive"></video>
      </div>
      <div class="modal-footer" >
        <div id="ranking" ></div>
        <button type="button" class="btn btn-default closeModal">Close</button>
      </div>
    </div>

  </div>
</div>

<!-- modal friends list -->

<!-- Modal -->
  <div class="modal fade" id="FBfriendsList" role="dialog">
    <div class="modal-dialog modal-sm">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">MY FRIENDS</h4>
        </div>
        <div class="modal-body" id="divFBfrindsList">
        <!--  -->
		   
		
		<!--  -->
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
      
    </div>
  </div>
  
</div>


</body>
</html>