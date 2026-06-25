<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Card extends Model
{
    protected $fillable = ['list_id', 'title', 'description', 'position', 'due_date'];

    protected $casts = [
        'due_date' => 'date',
    ];

    public function list(): BelongsTo
{
    return $this->belongsTo(ListModel::class, 'list_id');
}

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class);
    }

    public function members(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'card_user');
    }

    public function isOverdue(): bool
    {
        return $this->due_date && $this->due_date->isPast();
    }

    public function scopeOverdue($query)
    {
        return $query->whereDate('due_date', '<', now()->toDateString());
    }
}
