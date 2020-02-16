<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Battle_history;
use App\Battle_history_singleplayer;

class XOController extends Controller
{

    /*  
    taking last 5 results from Battle_history based on ip address for singleplayer and multiplayer(battle_history)
    */
    public function index(Request $request)
    {
        $ip = $request->ip();

        $battle_history = Battle_history::latest()->where('ip', $ip)->take(5)->get();
        $battle_history_singleplayer = Battle_history_singleplayer::latest()->where('ip', $ip)->take(5)->get();

        return view('game.index', compact('battle_history', 'battle_history_singleplayer'));
    }

    /*
    storing battle results for multiplayer 
    */
    public function store(Request $request){
        $data = $request->all();
        $data['ip'] = $request->ip();
        Battle_history::create($data);
    }
    
    /*
    storing battle result for singleplayer
    */
    public function store_singleplayer(Request $request){
        $data = $request->all();
        $data['ip'] = $request->ip();
        Battle_history_singleplayer::create($data);
    }


}
