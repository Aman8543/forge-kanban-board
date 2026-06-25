<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Board extends Model
{
    protected $fillable = ['title', 'slug', 'color'];

    public function lists(): HasMany
    {
        return $this->hasMany(ListModel::class)->orderBy('position');
    }
}
