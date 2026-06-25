<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\User::create(['name' => 'Alice Johnson', 'email' => 'alice@example.com', 'password' => bcrypt('password')]);
        \App\Models\User::create(['name' => 'Bob Smith', 'email' => 'bob@example.com', 'password' => bcrypt('password')]);
        \App\Models\User::create(['name' => 'Carol White', 'email' => 'carol@example.com', 'password' => bcrypt('password')]);
        \App\Models\User::create(['name' => 'Dave Brown', 'email' => 'dave@example.com', 'password' => bcrypt('password')]);
    }
}
