<?php

namespace Database\Seeders;

use App\Models\Board;
use App\Models\ListModel;
use App\Models\Card;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $users = [
            User::create(['name' => 'Alice Johnson', 'email' => 'alice@example.com', 'password' => bcrypt('password')]),
            User::create(['name' => 'Bob Smith', 'email' => 'bob@example.com', 'password' => bcrypt('password')]),
            User::create(['name' => 'Carol White', 'email' => 'carol@example.com', 'password' => bcrypt('password')]),
            User::create(['name' => 'Dave Brown', 'email' => 'dave@example.com', 'password' => bcrypt('password')]),
        ];

        $tags = [
            Tag::create(['name' => 'Bug', 'color' => '#EF4444']),
            Tag::create(['name' => 'Feature', 'color' => '#3B82F6']),
            Tag::create(['name' => 'Enhancement', 'color' => '#10B981']),
            Tag::create(['name' => 'Urgent', 'color' => '#F59E0B']),
            Tag::create(['name' => 'Design', 'color' => '#8B5CF6']),
        ];

        $board = Board::create(['title' => 'Project Alpha', 'slug' => 'project-alpha', 'color' => '#3B82F6']);

        $list1 = ListModel::create(['board_id' => $board->id, 'title' => 'To Do', 'position' => 0]);
        $list2 = ListModel::create(['board_id' => $board->id, 'title' => 'In Progress', 'position' => 1]);
        $list3 = ListModel::create(['board_id' => $board->id, 'title' => 'Done', 'position' => 2]);

        $card1 = Card::create([
            'list_id' => $list1->id,
            'title' => 'Set up project structure',
            'description' => 'Initialize the project with all required dependencies',
            'position' => 0,
            'due_date' => now()->addDays(3)->toDateString(),
        ]);
        $card1->tags()->attach([$tags[1]->id, $tags[4]->id]);
        $card1->members()->attach([$users[0]->id, $users[1]->id]);

        $card2 = Card::create([
            'list_id' => $list1->id,
            'title' => 'Design database schema',
            'description' => 'Create ERD and define relationships',
            'position' => 1,
            'due_date' => now()->subDays(2)->toDateString(),
        ]);
        $card2->tags()->attach([$tags[0]->id]);
        $card2->members()->attach([$users[2]->id]);

        $card3 = Card::create([
            'list_id' => $list2->id,
            'title' => 'Implement API endpoints',
            'description' => 'Build RESTful API for boards, lists, and cards',
            'position' => 0,
            'due_date' => now()->addDays(7)->toDateString(),
        ]);
        $card3->tags()->attach([$tags[1]->id]);
        $card3->members()->attach([$users[0]->id]);

        $card4 = Card::create([
            'list_id' => $list3->id,
            'title' => 'Write documentation',
            'description' => 'Document all API endpoints with examples',
            'position' => 0,
            'due_date' => now()->addDays(14)->toDateString(),
        ]);
        $card4->tags()->attach([$tags[2]->id]);
        $card4->members()->attach([$users[3]->id]);
    }
}
