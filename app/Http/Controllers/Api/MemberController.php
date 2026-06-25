<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Card;
use App\Models\User;
use Illuminate\Http\Request;

class MemberController extends Controller
{
    public function index(Card $card)
    {
        return $card->members;
    }

    public function attach(Request $request, Card $card)
    {
        $data = $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);
        $card->members()->syncWithoutDetaching([$data['user_id']]);
        return response()->json($card->members);
    }

    public function detach(Card $card, User $user)
    {
        $card->members()->detach($user->id);
        return response()->json($card->members);
    }
}
