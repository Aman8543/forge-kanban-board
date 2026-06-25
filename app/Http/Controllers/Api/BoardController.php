<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Board;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BoardController extends Controller
{
    public function index()
    {
        return Board::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'color' => 'nullable|string|max:7',
        ]);
        $data['slug'] = Str::slug($data['title']) . '-' . Str::random(6);
        $board = Board::create($data);
        return response()->json($board, 201);
    }

    public function show(Board $board)
    {
        return $board->load(['lists.cards.tags', 'lists.cards.members']);
    }

    public function update(Request $request, Board $board)
    {
        $data = $request->validate([
            'title' => 'sometimes|string|max:255',
            'color' => 'sometimes|string|max:7',
        ]);
        $board->update($data);
        return response()->json($board);
    }

    public function destroy(Board $board)
    {
        $board->delete();
        return response()->noContent();
    }
}
