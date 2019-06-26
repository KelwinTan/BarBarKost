<?php

use Faker\Factory;
use Illuminate\Database\Seeder;

class ChannelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create();
        $users = DB::table('users')->pluck('id');

        DB::table('channels')->insert([
            'id' => $faker->uuid,
            'user_1' => $users[0],
            'user_2' => $users[1],
            'created_at' => $faker->dateTime
        ]);
    }
}
