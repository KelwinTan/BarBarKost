<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateApartmentModelsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('apartment_models', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('pictures')->nullable();
            $table->string('banner_picture')->nullable();
            $table->string('picture_360')->nullable();
            $table->string('video')->nullable();
            $table->string('description');
            $table->string('unit_type');
            $table->integer('unit_area');
            $table->string('unit_condition');
            $table->integer('unit_floor');
            $table->string('unit_facilities');
            $table->string('unit_public_facilities')->nullable();
            $table->string('parking_facilities')->nullable();
            $table->string('additional_information')->nullable();
            $table->integer('additional_fees')->nullable();
            $table->string('prices');
            $table->string('city');
            $table->string('address');
            $table->decimal('longitude', 10, 7);
            $table->decimal('latitude', 10, 7);
            $table->softDeletes();
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
        Schema::dropIfExists('apartment_models');
    }
}
