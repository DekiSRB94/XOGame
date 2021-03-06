<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBattleHistorySingleplayersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('battle_history_singleplayers', function (Blueprint $table) {
            $table->increments('id');
            $table->string('player_x');
            $table->string('player_o');
            $table->string('winner');
            $table->time('battle_time');
            $table->string('ip');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('battle_history_singleplayers');
    }
}
