<!DOCTYPE html>
<html>
<head>
  <title>X O game</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
  <link rel="stylesheet" type="text/css" href="/css/style.css">
</head>


<body>
	<!-- menu for chossing singleplayer or multiplayer mod  -->
	<div class="menu">
	<button class="singplayer_button" type="button">Single player</button>
	<br>
	<button class="multiplayer_button">Multiplayer</button>
	</div>

<!-- multiplayer mod -->
<div class="multiplayer">
<h2>X O</h2>
<p>game</p>
<p><button class="menu_button" type="button" onclick="window.location.href='/'">Menu</button></p>
<br><br>


<div class="post_battle">
<form class="form" method="POST" action="/battle" onsubmit="postBattleHistory(); return false;">

@csrf

<br>
<p>X:</p><input type="text" class="x" name="player_x" placeholder="enter name">
<br><br>
<p>O:</p><input type="text" class="o" name="player_o"  placeholder="enter name and click" readonly="true">
<br><br>
<input class="time" type="hidden" name="battle_time">
<input class="winner_for_submit" type="hidden" name="winner">
</form>
</div>

<br>
<div class="row">
<div class="col-lg-12">
<p class="who_start_game"></p>
<p class="hidden_text">start first !</p>
</div>
</div>

<br>
<button class="revenge_button" onclick="revenge();" type="submit">Revenge</button>

<div class="row">
<div class="col-lg-6">
<div class="game_table">
<div class="row">
<div class="col col-lg-12">
<div id="square" class="square_1" onclick="clickFunction('1')"><p class="center_image"><img class="img1" src=""></p></div>
<div id="square" class="square_2" onclick="clickFunction('2')"><p class="center_image"><img class="img2" src=""></p></div>
<div id="square" class="square_3" onclick="clickFunction('3')"><p class="center_image"><img class="img3" src=""></p></div>
</div>

<div id="second_row_of_table" class="col-lg-12">
<div id="square" class="square_4" onclick="clickFunction('4')"><p class="center_image"><img class="img4" src=""></p></div>
<div id="square" class="square_5" onclick="clickFunction('5')"><p class="center_image"><img class="img5" src=""></p></div>
<div id="square" class="square_6" onclick="clickFunction('6')"><p class="center_image"><img class="img6" src=""></p></div>
</div>

<div id="third_row_of_table" class="col-lg-12">
<div id="square" class="square_7" onclick="clickFunction('7')"><p class="center_image"><img class="img7" src=""></p></div>
<div id="square" class="square_8" onclick="clickFunction('8')"><p class="center_image"><img class="img8" src=""></p></div>
<div id="square" class="square_9" onclick="clickFunction('9')"><p class="center_image"><img class="img9" src=""></p></div>
</div>
</div>
		<br>
		<h3 class="winner">Winner</h3>
		<p class="who"></p>
		<p class="draw">Game is draw !</p>
		<p class="timer" name="timer"></p>
</div>
</div>

<div class="col-lg-6">
<div id="battle_history" class="battle_history">
<table id="table_battle_history">
  <tr>
    <th>Player X</th>
    <th>Player O</th>
  </tr>
  	@foreach($battle_history as $b_h)
  	<tr>
  		@if($b_h->winner == $b_h->player_x)
	    	<td class="td_winner">{{ $b_h->player_x }}</td>
	    @endif
	    @if($b_h->winner != $b_h->player_x && $b_h->winner == $b_h->player_o)
	    	<td class="td_looser">{{ $b_h->player_x }}</td>
	    @endif
	    @if($b_h->winner == $b_h->player_o)
	    	<td class="td_winner">{{ $b_h->player_o }}</td>
	    @endif
	    @if($b_h->winner != $b_h->player_o && $b_h->winner == $b_h->player_x)
	    	<td class="td_looser">{{ $b_h->player_o }}</td>
	    @endif
	    @if($b_h->winner == "Draw game")
	    	<td class="td_draw">{{ $b_h->player_x }}</td>
	    	<td class="td_draw">{{ $b_h->player_o }}</td>
	    @endif
	</tr>
	@endforeach
</table>
</div>
</div>
</div>
</div>





<!-- singleplayer mod -->
<div class="singleplayer">
<h2>X O</h2>
<p>game</p>
<p><button type="button" onclick="window.location.href='/'">Menu</button></p>
<br><br>


<div class="post_battle">
<form class="singleplayer_form" method="POST" action="/singleplayer_battle" onsubmit="postSingleplayerBattleHistory(); return false;">

@csrf

<br>
<p>X:</p><input type="text" class="player" name="player_x" placeholder="enter name">
<br><br>
<p>O:</p><input type="text" class="cpu" name="player_o"  
value="CPU" readonly="true">
<br><br>
<input class="time" type="hidden" name="battle_time">
<input class="winner_for_submit" type="hidden" name="winner">
</form>
</div>

<br>
<div class="row">
<div class="col-lg-12">
<p class="who_start_game"></p>
<p class="hidden_text">start first !</p>
</div>
</div>

<br>
<button class="revenge_button_singleplayer" onclick="revengeSingleplayer();" type="submit">Revenge</button>

<div class="row">
<div class="col-lg-6">
<div class="game_table_single">
<div class="row">
<div class="col col-lg-12">
<div id="square" class="square_1s" onclick="clickFunctionSingleMode('1')"><p class="center_image"><img class="img1" src=""></p></div>
<div id="square" class="square_2s" onclick="clickFunctionSingleMode('2')"><p class="center_image"><img class="img2" src=""></p></div>
<div id="square" class="square_3s" onclick="clickFunctionSingleMode('3')"><p class="center_image"><img class="img3" src=""></p></div>
</div>

<div id="second_row_of_table" class="col-lg-12">
<div id="square" class="square_4s" onclick="clickFunctionSingleMode('4')"><p class="center_image"><img class="img4" src=""></p></div>
<div id="square" class="square_5s" onclick="clickFunctionSingleMode('5')"><p class="center_image"><img class="img5" src=""></p></div>
<div id="square" class="square_6s" onclick="clickFunctionSingleMode('6')"><p class="center_image"><img class="img6" src=""></p></div>
</div>

<div id="third_row_of_table" class="col-lg-12">
<div id="square" class="square_7s" onclick="clickFunctionSingleMode('7')"><p class="center_image"><img class="img7" src=""></p></div>
<div id="square" class="square_8s" onclick="clickFunctionSingleMode('8')"><p class="center_image"><img class="img8" src=""></p></div>
<div id="square" class="square_9s" onclick="clickFunctionSingleMode('9')"><p class="center_image"><img class="img9" src=""></p></div>
</div>
</div>
		<br>
		<h3 class="winner">Winner</h3>
		<p class="who"></p>
		<p class="draw">Game is draw !</p>
		<p class="timer" name="timer"></p>
		<p class="n"></p>
</div>
</div>

<div class="col-lg-6">
<div id="battle_history" class="battle_history_singleplayer">
<table id="table_battle_history">
  <tr>
    <th>Player X</th>
    <th>Player O</th>
  </tr>
  	@foreach($battle_history_singleplayer as $b_h_s)
  	<tr>
  		@if($b_h_s->winner == $b_h_s->player_x)
	    	<td class="td_winner">{{ $b_h_s->player_x }}</td>
	    @endif
	    @if($b_h_s->winner != $b_h_s->player_x && $b_h_s->winner == $b_h_s->player_o)
	    	<td class="td_looser">{{ $b_h_s->player_x }}</td>
	    @endif
	    @if($b_h_s->winner == $b_h_s->player_o)
	    	<td class="td_winner">{{ $b_h_s->player_o }}</td>
	    @endif
	    @if($b_h_s->winner != $b_h_s->player_o && $b_h_s->winner == $b_h_s->player_x)
	    	<td class="td_looser">{{ $b_h_s->player_o }}</td>
	    @endif
	    @if($b_h_s->winner == "Draw game")
	    	<td class="td_draw">{{ $b_h_s->player_x }}</td>
	    	<td class="td_draw">{{ $b_h_s->player_o }}</td>
	    @endif
	</tr>
	@endforeach
</table>
</div>
</div>

</div>
</div>



<footer>
  <p>Design by:</p> <p id="author">Dekster</p>
</footer>


<script src="/js/jquery.js" type="text/javascript"></script>


</body>
</html>
