<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="EUC-KR"%>
<!DOCTYPE html>
<html lang="ko">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width,initial-scale=1.0">
		<link href="./resources/css/bootstrap/bootstrap.min.css" rel="stylesheet">
		<link href="./resources/css/vjigsaw/vjigsaw.css" rel="stylesheet">
		<title>Mirim Video Jigsaw Game Test</title>
	</head>
	<body>
		<!-- FBApi �ҷ����� js  -->
		
	
		<div id="game_nav">		
			<video id="source-vid" loop="true" style="width:160px; height:120px;" >
			</video>
			
			<div id="button_box">
				<button class="btn btn-success" type="submit" onclick="start_game()">Play</button>
				<a class="btn btn-primary" href="../index.html" role="button">���ư���</a>
				<!-- FB Api ����κ� vjigsawFBapi ���� ������ ���� -->
				<!--
				<fb:login-button scope="public_profile,email,user_birthday,user_hometown,user_location,user_relationships,user_videos" auto_logout_link="true" onlogin="checkLoginState();">
				</fb:login-button>-->
				<span id="timer">  </span>
			</div>
			
		</div>
		
		<!-- ��������� ��������� canvas �κ�  -->
		<div id="box_container">
			<div id="box_left">
			</div>
			<div id="box" style="background: url('./resources/img/vjigsaw/bg_scooter.jpg')">
				
			</div>
			<div id="box_right">
			</div>
			<div id="box_bottom">
			</div>
			<canvas id="guide-line" width="978" height="490" ></canvas>
		</div>
		
		
		<!-- ���� ����� ���Ǵ� Modal page -->
		<div class="modal fade" id="successGame" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		  <div class="modal-dialog modal-lg" role="document">
			<div class="modal-content">
			  <div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="myModalLabel">���� �̹���</h4>
			  </div>
			  <div class="modal-body">
			  
			  
			  <!--  ��ŷ�� ���� �κ�, php�ҽ��� �������� �Է� ���� ���� �� ���� -->
				<!-- 
				<div class="row">
				  <div class="col-lg-4">
					<div class="input-group">
					  <input type="text" class="form-control" placeholder="�̸��� �Է��ϼ���." id="mirimRankNameInput">
					  <span class="input-group-btn">
						<button class="btn btn-default" type="button" onclick="insertRanking()" id="mirimRankSendButton">�� ���� ���</button>
					  </span>
					</div>
				  </div>
				</div>
				-->
				<hr>
				<!--
				<div id="rank_table">
				
				</div>
				-->
				<hr>

				<img class="img-responsive" id="successImage"></img>
			  </div>
			  <div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			  </div>
			</div>
		  </div>
		</div>
		
		
		
		
		
		<!--<script src="http://code.jquery.com/jquery-1.7.2.min.js"></script>-->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
		<!--<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.21/jquery-ui.min.js"></script>-->
		<!--<script src="http://code.jquery.com/ui/1.8.21/jquery-ui.min.js"></script>-->
		
		
		<!-- <script src="./resources/js/mobileTouch/jquery.ui.touch-punch.min.js"></script> -->
		<script src="./resources/js/bootstrap/bootstrap.min.js"></script>
		<script src="./resources/js/vjigsaw/vjigsaw.js" type="text/javascript"></script>
	
	</body>
</html>


