<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Battle_history extends Model
{
    protected $fillable = [
	'player_x', 'player_o', 'winner', 'battle_time', 'ip'
	];
}
