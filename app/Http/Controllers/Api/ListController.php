<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Board;
use App\Models\ListModel;
use Illuminate\Http\Request;

class ListController extends Controller
{
    public function store(Request $request, Board $board)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
        ]);
        $data['position'] = $board->lists()->max('position') + 1;
        $list = $board->lists()->create($data);
        return response()->json($list, 201);
    }

    public function update(Request $request, ListModel $list)
    {
        $data = $request->validate([
            'title' => 'sometimes|string|max:255',
            'position' => 'sometimes|integer|min:0',
        ]);
        $list->update($data);
        return response()->json($list);
    }

    public function destroy(ListModel $list)
    {
        $list->delete();
        return response()->noContent();
    }
}
