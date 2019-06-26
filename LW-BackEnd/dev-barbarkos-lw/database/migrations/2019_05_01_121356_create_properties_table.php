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
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('banner_picture')->nullable();
            $table->string('picture_360')->nullable();
            $table->string('video')->nullable();
            $table->string('description');
            $table->string('room_facilities')->nullable();
            $table->integer('room_area')->nullable();
            $table->string('public_facilities')->nullable();
            $table->string('parking_facilities')->nullable();
            $table->string('additional_information')->nullable();
            $table->integer('additional_fees')->nullable();
            $table->string('prices');
            $table->string('city');
            $table->string('address');
            $table->integer('total_rooms');
            $table->integer('room_left');
            $table->integer('total_views')->nullable();
            $table->decimal('longitude', 10, 7);
            $table->decimal('latitude', 10, 7);
            $table->string('kost_gender')->nullable();
            $table->string('kost_slug');
            $table->uuid('owner_id');
            $table->softDeletes();
            $table->timestamps();
        });
//            $table->morphs('property');
//            $table->uuid('owner_id');
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
