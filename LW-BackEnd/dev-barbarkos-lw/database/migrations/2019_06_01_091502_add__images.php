<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddImages extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Image-Posts', function (Blueprint $table){
            $table->uuid('id')->primary();
            $table->uuid('imageable_id');
            $table->string('imageable_type');
            $table->string('filename');
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
        Schema::table('Image-Posts', function ($table){
            $table->dropColumn('image_id');
        });
    }
}
