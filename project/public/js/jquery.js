/*
multiplayer
*/

 /*
 display multiplayer mod and hide menu
 */
$(".multiplayer_button").on('click', function(){
   $('.multiplayer').css('display', 'block');
   $('.menu').css('display', 'none');
});


/*
ajax function for posing informations(winner,time)
*/
function postBattleHistory(){
  $('.form').each(function(){
    var formdata = $(this).serialize();
      $.ajax($(this).attr('action'),
        {
        method: $(this).attr('method'),
        data: formdata
        })
        });
}

/*
ajax function for refreshing battle history to see last battle
*/
function refreshBattleHistory(){
  $.get('/', function(data){ 
      $('.battle_history').empty().append( $(data).find('.battle_history').children() );
  });
}


/*
checking if input x is empty, after that checking if input o is empty, end if they not empty game table show
and whoStartFirst function choose who start first, changing name in play is restricted(readonly, true)
*/
	$('.x').blur(function(){
        if(!$(this).val()){
            $(this).addClass("alert-danger");
        } else{
        	$(".o").prop("readonly", false);
            $(this).removeClass("alert-danger");
            $(".x").prop( "readonly", true);
        }
    });
    $('.o').blur(function(){
        if(!$(this).val()){
            $(this).addClass("alert-danger");
        } else{
        	$(".game_table").css("display", "block");
            $(this).removeClass("alert-danger");
            $(".o").prop("readonly", true);
            $(".hidden_text").css("display", "block");
            whoStartFirst();
        }
    });

/*
function for checking if array numbers exist in other array
*/
function isTrue(arr, arr2){
  return arr.every(i => arr2.includes(i));
}

/*
count for number of turns
*/
var n = 0;
/*
function for checking if game is draw or we have a winner
*/
function winDraw(){
/*
checking if game is draw, stoping timer, than submit result, refresh battle history, and show button for revenge
*/
	if(n == 9){
	  if((!isTrue(win1, player_1_fields))&&(!isTrue(win2, player_1_fields))&&(!isTrue(win3, player_1_fields))&&(!isTrue(win4, player_1_fields))&&(!isTrue(win5, player_1_fields))&&(!isTrue(win6, player_1_fields))&&(!isTrue(win7, player_1_fields))&&(!isTrue(win8, player_1_fields))&&(!isTrue(win1, player_2_fields))&&(!isTrue(win2, player_2_fields))&&(!isTrue(win3, player_2_fields))&&(!isTrue(win4, player_2_fields))&&(!isTrue(win5, player_2_fields))&&(!isTrue(win6, player_2_fields))&&(!isTrue(win7, player_2_fields))&&(!isTrue(win8, player_2_fields))){
	      stopTimer();
	      $(".draw").css("display", "inline");
	      $(".winner_for_submit").val("Draw game");
	      $(".form").submit();
	      refreshBattleHistory();
	      $(".revenge_button").css("display", "inline");
	  }
	}

/*
checking if player x have winner combination, then submiting result, refresh battle history, showing button
for revenge and blocking all fields because game is over, and stoping timer 
*/
	else if((isTrue(win1, player_1_fields))||(isTrue(win2, player_1_fields))||(isTrue(win3, player_1_fields))||(isTrue(win4, player_1_fields))||(isTrue(win5, player_1_fields))||(isTrue(win6, player_1_fields))||(isTrue(win7, player_1_fields))||(isTrue(win8, player_1_fields))){
	     setTimeout(function(){
			$(".winner").css("display", "inline");
			var x = $(".x").val();
			$(".who").html(x);
			$(".winner_for_submit").val(x);
			$(".form").submit();
			refreshBattleHistory();
			$(".revenge_button").css("display", "inline");
		 }, 10);
		for(var i=0; i<=9; i++){
			$(".square_" + i).attr("onclick", "false");
		}
		stopTimer();
	}

/*
checking if player o have winner combination, then submiting result, refresh battle history, showing button
for revenge and blocking all fields because game is over, and stoping timer 
*/
	else if((isTrue(win1, player_2_fields))||(isTrue(win2, player_2_fields))||(isTrue(win3, player_2_fields))||(isTrue(win4, player_2_fields))||(isTrue(win5, player_2_fields))||(isTrue(win6, player_2_fields))||(isTrue(win7, player_2_fields))||(isTrue(win8, player_2_fields))){
	        setTimeout(function(){
			    $(".winner").css("display", "inline");
			    var o = $(".o").val();
			    $(".who").html(o);
			    $(".winner_for_submit").val(o);
				$(".form").submit();
				refreshBattleHistory();
				$(".revenge_button").css("display", "inline");
			}, 10);
			for(var i=0; i<=9; i++){
				$(".square_" + i).attr("onclick", "false");
			}
			stopTimer();
	     }
}

/*
function for playing again if game is finish, refresh game table, reset all values and arrays, calling function for checking
which player play next, start timer again on click on game table
*/
function revenge(){
	$.get('/', function(data){ 
      $('.game_table').empty().append( $(data).find('.game_table').children() );
  	});
  	turn = "";
	n = 0;
	player_1_fields = [];
	player_2_fields = [];
	$('.who_start_game').html("");
	whoPlayNext();
	$('.time').html("");
	$('.timer').html("");
		$('.game_table').one('click',function(){
		timer_for_new_game();
		});
	$(".revenge_button").css("display", "none");
}


/*
1 2 3
4 5 6
7 8 9
winner combinations in arrays
*/
var win1 = [1,2,3];
var win2 = [4,5,6];
var win3 = [7,8,9];
var win4 = [1,4,7];
var win5 = [2,5,8];
var win6 = [3,6,9];
var win7 = [1,5,9];
var win8 = [3,5,7];

/*
array for player1 and player2 (if player 1 click field 1, field 1 will be added in player 1 array)
*/
var player_1_fields = [];
var player_2_fields = [];

/*
x and o pictures for player x and player 0
*/
var player_1_pic = "img/x_pic.png";
var player_2_pic = "img/o_pic.png";

/*
with turn helper we know who play next, turn is changed in click function and we cant use it in 
whoPlayNext function
*/
var turn_helper;
var turn;
/*
function that random chosse which player play first
*/
function whoStartFirst(){
	var random_value = Math.floor((Math.random() * 2) + 1);
	if(random_value == 1){
		turn = player_1_pic;
		turn_helper = player_1_pic;
		$('.who_start_game').html("Player X");
	}
	else{
		turn = player_2_pic;
		turn_helper = player_2_pic;
		$('.who_start_game').html("Player O");
	}
}

/*
function for chossing who play next, every game other player play first
*/
function whoPlayNext(){
	if(turn_helper == player_1_pic){
		turn = player_2_pic;
		turn_helper = player_2_pic;
		$('.who_start_game').html("Player O");
	}
	else{
		turn = player_1_pic;
		turn_helper = player_1_pic;
		$('.who_start_game').html("Player X");
	}
}
/*
click function, putting image, blocking field that is played, adding field number to player array,
than checking if game is win or draw, changing turn to other player
*/
function clickFunction(number) {
if(turn == player_1_pic){
	n++;
	  $(".img"+number).attr("src", player_1_pic).fadeIn('fast');
	  turn = player_2_pic;
	  $(".square_"+number).attr("onclick", "false");
	  player_1_fields.push(+number);
		    winDraw();
} 
else{
	  n++;
	  $(".img"+number).attr("src", player_2_pic).fadeIn('fast');	
	  turn = player_1_pic;
	  $(".square_"+number).attr("onclick", "false");
	  player_2_fields.push(+number);
	  winDraw();
}
}

/*
timer
*/
var interval;
function timer_for_new_game(){
var timer3 = "0:00";
interval = setInterval(function() {
  var timer2 = timer3.split(':');
  /*
  by parsing integer, I avoid all extra string processing
  */
  var minutes = parseInt(timer2[0], 10);
  var seconds = parseInt(timer2[1], 10);
  ++seconds;
  minutes = (seconds > 59) ? ++minutes : minutes;
  seconds = (seconds > 59) ? 00 : seconds;
  $('.timer').html(minutes + ':' + seconds);
  $('.time').val(minutes + ':' + seconds);
  timer3 = minutes + ':' + seconds;
}, 1000) };

/*
function for stoping timer 
*/
function stopTimer() {
  clearInterval(interval);
}

/*
on click on table timer start
*/
$('.game_table').one('click',function(){
	timer_for_new_game();
});







//singleplayer

// display singleplayer mod
$(".singplayer_button").on('click', function(){
   $('.singleplayer').css('display', 'block');
   $('.menu').css('display', 'none');
});

//ajax function for posing informations(winner,time)
function postSingleplayerBattleHistory(){
  $('.singleplayer_form').each(function(){
    var formdata = $(this).serialize();
      $.ajax($(this).attr('action'),
        {
        method: $(this).attr('method'),
        data: formdata
        })
        });
}

//ajax function for refreshing battle history to see last battle
function refreshBattleHistorySingleplayer(){
  $.get('/', function(data){ 
      $('.battle_history_singleplayer').empty().append( $(data).find('.battle_history_singleplayer').children() );
  });
}

function winDrawSingleMode(){
//checking if game is draw
	if(n == 9){
	  if((!isTrue(win1, player_fields))&&(!isTrue(win2, player_fields))&&(!isTrue(win3, player_fields))&&(!isTrue(win4, player_fields))&&(!isTrue(win5, player_fields))&&(!isTrue(win6, player_fields))&&(!isTrue(win7, player_fields))&&(!isTrue(win8, player_fields))&&(!isTrue(win1, cpu_fields))&&(!isTrue(win2, cpu_fields))&&(!isTrue(win3, cpu_fields))&&(!isTrue(win4, cpu_fields))&&(!isTrue(win5, cpu_fields))&&(!isTrue(win6, cpu_fields))&&(!isTrue(win7, cpu_fields))&&(!isTrue(win8, cpu_fields))){
	      stopTimer();
	      $(".draw").css("display", "inline");
	      $(".winner_for_submit").val("Draw game");
	      $(".singleplayer_form").submit();
	      refreshBattleHistorySingleplayer();
	      $(".revenge_button_singleplayer").css("display", "inline");
	  }
	}

//checking win for player X 
	else if((isTrue(win1, player_fields))||(isTrue(win2, player_fields))||(isTrue(win3, player_fields))||(isTrue(win4, player_fields))||(isTrue(win5, player_fields))||(isTrue(win6, player_fields))||(isTrue(win7, player_fields))||(isTrue(win8, player_fields))){
	     setTimeout(function(){
			$(".winner").css("display", "inline");
			var x = $(".player").val();
			$(".who").html(x);
			$(".winner_for_submit").val(x);
			$(".singleplayer_form").submit();
			refreshBattleHistorySingleplayer();
			$(".revenge_button_singleplayer").css("display", "inline");
		 }, 10);
		for(var i=0; i<=9; i++){
			$(".square_" + i + "s").attr("onclick", "false");
		}
		stopTimer();
	}

//checking win for CPU
	if((isTrue(win1, cpu_fields))||(isTrue(win2, cpu_fields))||(isTrue(win3, cpu_fields))||(isTrue(win4, cpu_fields))||(isTrue(win5, cpu_fields))||(isTrue(win6, cpu_fields))||(isTrue(win7, cpu_fields))||(isTrue(win8, cpu_fields))){
	        setTimeout(function(){
			    $(".winner").css("display", "inline");
			    var o = $(".cpu").val();
			    $(".who").html(o);
			    $(".winner_for_submit").val(o);
				$(".singleplayer_form").submit();
				refreshBattleHistorySingleplayer();
				$(".revenge_button_singleplayer").css("display", "inline");
			}, 10);
			for(var i=0; i<=9; i++){
				$(".square_" + i + "s").attr("onclick", "false");
			}
			stopTimer();
	     }
}


//ajax function for refresh game table for single mode
function refreshGameTableSingle(){
	$.get('/', function(data){ 
      $('.game_table_single').empty().append( $(data).find('.game_table_single').children() );
  	});
}

function revengeSingleplayer(){
	refreshGameTableSingle();
	n = 0;
	player_fields = [];
	cpu_fields = [];
	$('.who_start_game').html("");
	$('.time').html("");
	$('.timer').html("");
		$('.game_table_single').one('click',function(){
		timer_for_new_game();
		});
	$(".revenge_button_singleplayer").css("display", "none");
	 setTimeout( function(){
        whoPlayNextSingleplayer();
    },1000);
}

//player start first against cpu
function playerStartFirst(){
		turn_helper = player_1_pic;
		turn = player_1_pic;
		$('.who_start_game').html("Player X");
}

//function for chossing who play next, every game other player play first
function whoPlayNextSingleplayer(){
	if(turn_helper == player_1_pic){
		turn_helper = player_2_pic;
		$('.who_start_game').html("Player O");
		cpuPlay();
	}
	else{
		turn = player_1_pic;
		turn_helper = player_1_pic;
		$('.who_start_game').html("Player X");
	}
}

//checking if input x is empty, after that checking if input o is empty, end if they not game table show
//and game choose who start first
    $('.player').blur(function(){
        if(!$(this).val()){
            $(this).addClass("alert-danger");
        } else{
        	$(".game_table_single").css("display", "block");
            $(this).removeClass("alert-danger");
            $(".player").prop("readonly", true);
            $(".hidden_text").css("display", "block");
            playerStartFirst();
        }
    });

//which player click which field(if player 1 click field 1, field 1 will be added in player 1 array)
var player_fields = [];
var cpu_fields = [];

//function for computer turn
function cpuPlay(){
	//first move if cpu play first
	if(n == 0){
		var click_field = 1;
	}
	//second move if cpu play first
	else if((n == 2) && (jQuery.inArray(1, cpu_fields) !== -1) && (jQuery.inArray(5, player_fields) == -1)){
		var click_field = 5;
	}
	else if((n == 2) && (jQuery.inArray(1, cpu_fields) !== -1) && (jQuery.inArray(9, player_fields) == -1)){
		var click_field = 9;
	}
	//winner combinations
	else if((n >= 4) && (jQuery.inArray(1, cpu_fields) !== -1) && (jQuery.inArray(2, cpu_fields) !== -1) && (jQuery.inArray(3, player_fields) == -1)){
		var click_field = 3;
	}
	else if((n >= 4) && (jQuery.inArray(1, cpu_fields) !== -1) && (jQuery.inArray(3, cpu_fields) !== -1) && (jQuery.inArray(2, player_fields) == -1)){
		var click_field = 2;
	}
	else if((n >= 4) && (jQuery.inArray(2, cpu_fields) !== -1) && (jQuery.inArray(3, cpu_fields) !== -1) && (jQuery.inArray(1, player_fields) == -1)){
		var click_field = 1;
	}
	else if((n >= 4) && (jQuery.inArray(4, cpu_fields) !== -1) && (jQuery.inArray(5, cpu_fields) !== -1) && (jQuery.inArray(6, player_fields) == -1)){
		var click_field = 6;
	}
	else if((n >= 4) && (jQuery.inArray(4, cpu_fields) !== -1) && (jQuery.inArray(6, cpu_fields) !== -1) && (jQuery.inArray(5, player_fields) == -1)){
		var click_field = 5;
	}
	else if((n >= 4) && (jQuery.inArray(5, cpu_fields) !== -1) && (jQuery.inArray(6, cpu_fields) !== -1) && (jQuery.inArray(4, player_fields) == -1)){
		var click_field = 4;
	}
	else if((n >= 4) && (jQuery.inArray(7, cpu_fields) !== -1) && (jQuery.inArray(8, cpu_fields) !== -1) && (jQuery.inArray(9, player_fields) == -1)){
		var click_field = 9;
	}
	else if((n >= 4) && (jQuery.inArray(7, cpu_fields) !== -1) && (jQuery.inArray(9, cpu_fields) !== -1) && (jQuery.inArray(8, player_fields) == -1)){
		var click_field = 8;
	}
	else if((n >= 4) && (jQuery.inArray(8, cpu_fields) !== -1) && (jQuery.inArray(9, cpu_fields) !== -1) && (jQuery.inArray(7, player_fields) == -1)){
		var click_field = 7;
	}
	else if((n >= 4) && (jQuery.inArray(1, cpu_fields) !== -1) && (jQuery.inArray(4, cpu_fields) !== -1) && (jQuery.inArray(7, player_fields) == -1)){
		var click_field = 7;
	}
	else if((n >= 4) && (jQuery.inArray(1, cpu_fields) !== -1) && (jQuery.inArray(7, cpu_fields) !== -1) && (jQuery.inArray(4, player_fields) == -1)){
		var click_field = 4;
	}
	else if((n >= 4) && (jQuery.inArray(4, cpu_fields) !== -1) && (jQuery.inArray(7, cpu_fields) !== -1) && (jQuery.inArray(1, player_fields) == -1)){
		var click_field = 1;
	}
	else if((n >= 4) && (jQuery.inArray(2, cpu_fields) !== -1) && (jQuery.inArray(5, cpu_fields) !== -1) && (jQuery.inArray(8, player_fields) == -1)){
		var click_field = 8;
	}
	else if((n >= 4) && (jQuery.inArray(2, cpu_fields) !== -1) && (jQuery.inArray(8, cpu_fields) !== -1) && (jQuery.inArray(5, player_fields) == -1)){
		var click_field = 5;
	}
	else if((n >= 4) && (jQuery.inArray(5, cpu_fields) !== -1) && (jQuery.inArray(8, cpu_fields) !== -1) && (jQuery.inArray(2, player_fields) == -1)){
		var click_field = 2;
	}
	else if((n >= 4) && (jQuery.inArray(3, cpu_fields) !== -1) && (jQuery.inArray(6, cpu_fields) !== -1) && (jQuery.inArray(9, player_fields) == -1)){
		var click_field = 9;
	}
	else if((n >= 4) && (jQuery.inArray(3, cpu_fields) !== -1) && (jQuery.inArray(9, cpu_fields) !== -1) && (jQuery.inArray(6, player_fields) == -1)){
		var click_field = 6;
	}
	else if((n >= 4) && (jQuery.inArray(6, cpu_fields) !== -1) && (jQuery.inArray(9, cpu_fields) !== -1) && (jQuery.inArray(3, player_fields) == -1)){
		var click_field = 3;
	}
	else if((n >= 4) && (jQuery.inArray(1, cpu_fields) !== -1) && (jQuery.inArray(9, cpu_fields) !== -1) && (jQuery.inArray(5, player_fields) == -1)){
		var click_field = 5;
	}
	else if((n >= 4) && (jQuery.inArray(1, cpu_fields) !== -1) && (jQuery.inArray(5, cpu_fields) !== -1) && (jQuery.inArray(9, player_fields) == -1)){
		var click_field = 9;
	}
	else if((n >= 4) && (jQuery.inArray(5, cpu_fields) !== -1) && (jQuery.inArray(9, cpu_fields) !== -1) && (jQuery.inArray(1, player_fields) == -1)){
		var click_field = 1;
	}
	else if((n >= 4) && (jQuery.inArray(3, cpu_fields) !== -1) && (jQuery.inArray(7, cpu_fields) !== -1) && (jQuery.inArray(5, player_fields) == -1)){
		var click_field = 5;
	}
	else if((n >= 4) && (jQuery.inArray(3, cpu_fields) !== -1) && (jQuery.inArray(5, cpu_fields) !== -1) && (jQuery.inArray(7, player_fields) == -1)){
		var click_field = 7;
	}
	else if((n >= 4) && (jQuery.inArray(5, cpu_fields) !== -1) && (jQuery.inArray(7, cpu_fields) !== -1) && (jQuery.inArray(3, player_fields) == -1)){
		var click_field = 3;
	}
	//first move if cpu play second
	else if((n == 1) && (jQuery.inArray(5, player_fields) == -1)){
		var click_field = 5;
	}
	else if((n == 1) && (jQuery.inArray(5, player_fields) !== -1)){
		var click_field = 1;
	}
	//some attacks if real player is noob
	else if((n == 4) && (jQuery.inArray(4, player_fields) !== -1) && (jQuery.inArray(9, player_fields) !== -1) && (jQuery.inArray(1, cpu_fields) !== -1) && (jQuery.inArray(7, cpu_fields) !== -1)){
		var click_field = 3;
	}
	else if((n == 4) && (jQuery.inArray(4, player_fields) !== -1) && (jQuery.inArray(9, player_fields) !== -1) && (jQuery.inArray(1, cpu_fields) !== -1) && (jQuery.inArray(5, cpu_fields) !== -1)){
		var click_field = 3;
	}
	else if((n == 4) && (jQuery.inArray(2, player_fields) !== -1) && (jQuery.inArray(9, player_fields) !== -1) && (jQuery.inArray(1, cpu_fields) !== -1) && (jQuery.inArray(5, cpu_fields) !== -1)){
		var click_field = 7;
	}
	//other moves
	else if((n >= 3) && (jQuery.inArray(3, player_fields) !== -1) && (jQuery.inArray(5, player_fields) !== -1) && (jQuery.inArray(7, player_fields) == -1) && (jQuery.inArray(7, cpu_fields) == -1)){
		var click_field = 7;
	}
	else if((n >= 3) && (jQuery.inArray(5, player_fields) !== -1) && (jQuery.inArray(7, player_fields) !== -1) && (jQuery.inArray(3, player_fields) == -1) && (jQuery.inArray(3, cpu_fields) == -1)){
		var click_field = 3;
	}
	else if((n >= 3) && (jQuery.inArray(4, player_fields) !== -1) && (jQuery.inArray(5, player_fields) !== -1) && (jQuery.inArray(6, player_fields) == -1) && (jQuery.inArray(6, cpu_fields) == -1)){
		var click_field = 6;
	}
	else if((n >= 3) && (jQuery.inArray(5, player_fields) !== -1) && (jQuery.inArray(6, player_fields) !== -1) && (jQuery.inArray(4, player_fields) == -1) && (jQuery.inArray(4, cpu_fields) == -1)){
		var click_field = 4;
	}
	else if((n >= 3) && (jQuery.inArray(2, player_fields) !== -1) && (jQuery.inArray(5, player_fields) !== -1) && (jQuery.inArray(8, player_fields) == -1) && (jQuery.inArray(8, cpu_fields) == -1)){
		var click_field = 8;
	}
	else if((n >= 3) && (jQuery.inArray(5, player_fields) !== -1) && (jQuery.inArray(8, player_fields) !== -1) && (jQuery.inArray(2, player_fields) == -1) && (jQuery.inArray(2, cpu_fields) == -1)){
		var click_field = 2;
	}
	else if((n >= 3) && (jQuery.inArray(1, player_fields) !== -1) && (jQuery.inArray(2, player_fields) !== -1) && (jQuery.inArray(3, player_fields) == -1) && (jQuery.inArray(3, cpu_fields) == -1)){
		var click_field = 3;
	}
	else if((n >= 3) && (jQuery.inArray(1, player_fields) !== -1) && (jQuery.inArray(3, player_fields) !== -1) && (jQuery.inArray(2, player_fields) == -1) && (jQuery.inArray(2, cpu_fields) == -1)){
		var click_field = 2;
	}
	else if((n >= 3) && (jQuery.inArray(2, player_fields) !== -1) && (jQuery.inArray(3, player_fields) !== -1) && (jQuery.inArray(1, player_fields) == -1) && (jQuery.inArray(1, cpu_fields) == -1)){
		var click_field = 1;
	}
	else if((n >= 3) && (jQuery.inArray(1, player_fields) !== -1) && (jQuery.inArray(4, player_fields) !== -1) && (jQuery.inArray(7, player_fields) == -1) && (jQuery.inArray(7, cpu_fields) == -1)){
		var click_field = 7;
	}
	else if((n >= 3) && (jQuery.inArray(1, player_fields) !== -1) && (jQuery.inArray(7, player_fields) !== -1) && (jQuery.inArray(4, player_fields) == -1) && (jQuery.inArray(4, cpu_fields) == -1)){
		var click_field = 4;
	}
	else if((n >= 3) && (jQuery.inArray(4, player_fields) !== -1) && (jQuery.inArray(7, player_fields) !== -1) && (jQuery.inArray(1, player_fields) == -1) && (jQuery.inArray(1, cpu_fields) == -1)){
		var click_field = 1;
	}
	else if((n >= 3) && (jQuery.inArray(3, player_fields) !== -1) && (jQuery.inArray(6, player_fields) !== -1) && (jQuery.inArray(9, player_fields) == -1) && (jQuery.inArray(9, cpu_fields) == -1)){
		var click_field = 9;
	}
	else if((n >= 3) && (jQuery.inArray(3, player_fields) !== -1) && (jQuery.inArray(9, player_fields) !== -1) && (jQuery.inArray(6, player_fields) == -1) && (jQuery.inArray(6, cpu_fields) == -1)){
		var click_field = 6;
	}
	else if((n >= 3) && (jQuery.inArray(6, player_fields) !== -1) && (jQuery.inArray(9, player_fields) !== -1) && (jQuery.inArray(3, player_fields) == -1) && (jQuery.inArray(3, cpu_fields) == -1)){
		var click_field = 3;
	}
	else if((n >= 3) && (jQuery.inArray(7, player_fields) !== -1) && (jQuery.inArray(8, player_fields) !== -1) && (jQuery.inArray(9, player_fields) == -1) && (jQuery.inArray(9, cpu_fields) == -1)){
		var click_field = 9;
	}
	else if((n >= 3) && (jQuery.inArray(7, player_fields) !== -1) && (jQuery.inArray(9, player_fields) !== -1) && (jQuery.inArray(8, player_fields) == -1) && (jQuery.inArray(8, cpu_fields) == -1)){
		var click_field = 8;
	}
	else if((n >= 3) && (jQuery.inArray(8, player_fields) !== -1) && (jQuery.inArray(9, player_fields) !== -1) && (jQuery.inArray(7, player_fields) == -1) && (jQuery.inArray(7, cpu_fields) == -1)){
		var click_field = 7;
	}
	else if((n >= 3) && (jQuery.inArray(1, player_fields) !== -1) && (jQuery.inArray(6, player_fields) !== -1) && (jQuery.inArray(3, player_fields) == -1) && (jQuery.inArray(3, cpu_fields) == -1)){
		var click_field = 3;
	}
	else if((n >= 3) && (jQuery.inArray(1, player_fields) !== -1) && (jQuery.inArray(8, player_fields) !== -1) && (jQuery.inArray(4, player_fields) == -1) && (jQuery.inArray(4, cpu_fields) == -1)){
		var click_field = 4;
	}
	else if((n >= 3) && (jQuery.inArray(2, player_fields) !== -1) && (jQuery.inArray(7, player_fields) !== -1) && (jQuery.inArray(1, player_fields) == -1) && (jQuery.inArray(1, cpu_fields) == -1)){
		var click_field = 1;
	}
	else if((n >= 3) && (jQuery.inArray(2, player_fields) !== -1) && (jQuery.inArray(9, player_fields) !== -1) && (jQuery.inArray(3, player_fields) == -1) && (jQuery.inArray(3, cpu_fields) == -1)){
		var click_field = 3;
	}
	else if((n >= 3) && (jQuery.inArray(3, player_fields) !== -1) && (jQuery.inArray(4, player_fields) !== -1) && (jQuery.inArray(1, player_fields) == -1) && (jQuery.inArray(1, cpu_fields) == -1)){
		var click_field = 1;
	}
	else if((n >= 3) && (jQuery.inArray(3, player_fields) !== -1) && (jQuery.inArray(8, player_fields) !== -1) && (jQuery.inArray(6, player_fields) == -1) && (jQuery.inArray(6, cpu_fields) == -1)){
		var click_field = 6;
	}
	else if((n >= 3) && (jQuery.inArray(4, player_fields) !== -1) && (jQuery.inArray(9, player_fields) !== -1) && (jQuery.inArray(7, player_fields) == -1) && (jQuery.inArray(7, cpu_fields) == -1)){
		var click_field = 7;
	}
	else if((n >= 3) && (jQuery.inArray(6, player_fields) !== -1) && (jQuery.inArray(7, player_fields) !== -1) && (jQuery.inArray(9, player_fields) == -1) && (jQuery.inArray(9, cpu_fields) == -1)){
		var click_field = 9;
	}
	else if((n >= 3) && (jQuery.inArray(6, player_fields) !== -1) && (jQuery.inArray(8, player_fields) !== -1) && (jQuery.inArray(9, player_fields) == -1) && (jQuery.inArray(9, cpu_fields) == -1)){
		var click_field = 9;
	}
	else if((n >= 3) && (jQuery.inArray(4, player_fields) !== -1) && (jQuery.inArray(8, player_fields) !== -1) && (jQuery.inArray(7, player_fields) == -1) && (jQuery.inArray(7, cpu_fields) == -1)){
		var click_field = 7;
	}
	else if((n >= 3) && (jQuery.inArray(2, player_fields) !== -1) && (jQuery.inArray(6, player_fields) !== -1) && (jQuery.inArray(3, player_fields) == -1) && (jQuery.inArray(3, cpu_fields) == -1)){
		var click_field = 3;
	}
	else if((n >= 3) && (jQuery.inArray(2, player_fields) !== -1) && (jQuery.inArray(4, player_fields) !== -1) && (jQuery.inArray(1, player_fields) == -1) && (jQuery.inArray(1, cpu_fields) == -1)){
		var click_field = 1;
	}
	else if((n >= 3) && (jQuery.inArray(5, player_fields) !== -1) && (jQuery.inArray(9, player_fields) !== -1) && (jQuery.inArray(3, player_fields) == -1) && (jQuery.inArray(3, cpu_fields) == -1)){
		var click_field = 3;
	}
	else if((n >= 3) && (jQuery.inArray(1, player_fields) !== -1) && (jQuery.inArray(5, player_fields) !== -1) && (jQuery.inArray(9, player_fields) == -1) && (jQuery.inArray(9, cpu_fields) == -1)){
		var click_field = 9;
	}
	else if((n >= 3) && (jQuery.inArray(1, player_fields) !== -1) && (jQuery.inArray(9, player_fields) !== -1) && (jQuery.inArray(6, player_fields) == -1) && (jQuery.inArray(6, cpu_fields) == -1)){
		var click_field = 6;
	}
	else if((n >= 3) && (jQuery.inArray(3, player_fields) !== -1) && (jQuery.inArray(7, player_fields) !== -1) && (jQuery.inArray(4, player_fields) == -1) && (jQuery.inArray(4, cpu_fields) == -1)){
		var click_field = 4;
	}
	else if((n >= 3) && (jQuery.inArray(2, player_fields) !== -1) && (jQuery.inArray(8, player_fields) !== -1) && (jQuery.inArray(4, player_fields) == -1) && (jQuery.inArray(4, cpu_fields) == -1)){
		var click_field = 4;
	}
	else if((n >= 3) && (jQuery.inArray(4, player_fields) !== -1) && (jQuery.inArray(6, player_fields) !== -1) && (jQuery.inArray(2, player_fields) == -1) && (jQuery.inArray(2, cpu_fields) == -1)){
		var click_field = 2;
	}
	/*
	lapse combination (if somewhere cpu dont know how to move)
	<9 because after every click function cpu play, and if we dont have this "if" we will have infinitive loop
	because all numbers are taken(if player start first) and this loop cant find free number
	*/
	else if(n < 9){
		var random_value = Math.floor((Math.random() * 9) + 1);
		while (($.inArray(random_value, player_fields) != -1) || ($.inArray(random_value, cpu_fields) != -1)){
	        random_value = Math.floor((Math.random() * 9) + 1);
	        if(($.inArray(random_value, player_fields) == -1) && ($.inArray(random_value, cpu_fields) == -1)){
	        var click_field = random_value;
	         break;
	        }
    	}
	}

	n++;
	$(".img" + click_field).attr("src", player_2_pic).fadeIn('fast');	
	turn = player_1_pic;
    $(".square_" + click_field + "s").attr("onclick", "false");
	cpu_fields.push(click_field);
	  	winDrawSingleMode();
}


//click functions
function clickFunctionSingleMode(number) {
if(turn == player_1_pic){
	n++;
	  $(".img"+number).attr("src", player_1_pic).fadeIn('fast');
	  turn = player_2_pic;
	  $(".square_"+number+"s").attr("onclick", "false");
	  player_fields.push(+number);
	  		winDrawSingleMode();
	        cpuPlay();
} 
}

/*
when click on table timer start
*/
$('.game_table_single').one('click',function(){
	timer_for_new_game();
});