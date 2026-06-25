<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Card;
use App\Models\ListModel;
use Illuminate\Http\Request;

class CardController extends Controller
{
    public function store(Request $request, ListModel $list)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date',
        ]);
        $data['position'] = $list->cards()->max('position') + 1;
        $card = $list->cards()->create($data);
        return response()->json($card->load(['tags', 'members']), 201);
    }

    public function update(Request $request, Card $card)
    {
        $data = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date',
            'position' => 'sometimes|integer|min:0',
            'list_id' => 'sometimes|exists:lists,id',
        ]);
        $card->update($data);
        return response()->json($card->load(['tags', 'members']));
    }

    public function destroy(Card $card)
    {
        $card->delete();
        return response()->noContent();
    }

    public function move(Request $request, Card $card)
    {
        $data = $request->validate([
            'list_id' => 'required|exists:lists,id',
            'position' => 'required|integer|min:0',
        ]);

        $card->update([
            'list_id' => $data['list_id'],
            'position' => $data['position'],
        ]);

        return response()->json($card->load(['tags', 'members']));
    }

    public function syncTags(Request $request, Card $card)
    {
        $data = $request->validate([
            'tag_ids' => 'required|array',
            'tag_ids.*' => 'exists:tags,id',
        ]);
        $card->tags()->sync($data['tag_ids']);
        return response()->json($card->load(['tags', 'members']));
    }

    public function syncMembers(Request $request, Card $card)
    {
        $data = $request->validate([
            'user_ids' => 'required|array',
            'user_ids.*' => 'exists:users,id',
        ]);
        $card->members()->sync($data['user_ids']);
        return response()->json($card->load(['tags', 'members']));
    }
}
