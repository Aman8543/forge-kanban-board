<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function index()
    {
        return Tag::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:50',
            'color' => 'nullable|string|max:7',
        ]);
        $tag = Tag::create($data);
        return response()->json($tag, 201);
    }

    public function update(Request $request, Tag $tag)
    {
        $data = $request->validate([
            'name' => 'sometimes|string|max:50',
            'color' => 'sometimes|string|max:7',
        ]);
        $tag->update($data);
        return response()->json($tag);
    }

    public function destroy(Tag $tag)
    {
        $tag->delete();
        return response()->noContent();
    }
}
