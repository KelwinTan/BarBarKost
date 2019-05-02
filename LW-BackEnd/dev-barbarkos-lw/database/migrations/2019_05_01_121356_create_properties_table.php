<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePropertiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('description');
            $table->integer('banner_id');
            $table->string('video_id');
            $table->integer('picture360_id');
            $table->integer('price');
            $table->string('facilities');
            $table->string('public_facilities');
            $table->integer('fee');
            $table->string('information');
            $table->integer('city_id');
            $table->integer('area');
            $table->integer('total_views');
            $table->double('longitude');
            $table->double('latitude');
            $table->morphs('property');
            $table->string('status');
            $table->uuid('owner_id');
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
        Schema::dropIfExists('properties');
    }
}
