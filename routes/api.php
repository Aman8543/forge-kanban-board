<?php

use App\Http\Controllers\Api\BoardController;
use App\Http\Controllers\Api\CardController;
use App\Http\Controllers\Api\ListController;
use App\Http\Controllers\Api\MemberController;
use App\Http\Controllers\Api\TagController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

Route::apiResource('boards', BoardController::class);
Route::get('users', [UserController::class, 'index']);
Route::post('boards/{board}/lists', [ListController::class, 'store']);
Route::patch('lists/{list}', [ListController::class, 'update']);
Route::delete('lists/{list}', [ListController::class, 'destroy']);
Route::post('lists/{list}/cards', [CardController::class, 'store']);
Route::patch('cards/{card}', [CardController::class, 'update']);
Route::delete('cards/{card}', [CardController::class, 'destroy']);
Route::post('cards/{card}/move', [CardController::class, 'move']);
Route::post('cards/{card}/sync-tags', [CardController::class, 'syncTags']);
Route::post('cards/{card}/sync-members', [CardController::class, 'syncMembers']);
Route::apiResource('tags', TagController::class);
Route::get('cards/{card}/members', [MemberController::class, 'index']);
Route::post('cards/{card}/members', [MemberController::class, 'attach']);
Route::delete('cards/{card}/members/{user}', [MemberController::class, 'detach']);
