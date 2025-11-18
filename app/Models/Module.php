<?php

namespace App\Models;

use App\Models\Panel\Main\Group;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Auditable;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class Module extends Model implements AuditableContract
{
    use Auditable, HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'environment_id',
        'module_id',
        'label',
        'slug',
        'icon',
        'route',
        'order',
    ];

    public function environment()
    {
        return $this->belongsTo(Environment::class);
    }

    public function parent()
    {
        return $this->belongsTo(Module::class, 'module_id')
            ->with('parent');
    }

    public function children()
    {
        return $this->hasMany(Module::class)
            ->with([
                'children' => function ($query) {
                    $query->orderBy('order');
                },
            ]);
    }

    public function groups()
    {
        return $this->belongsToMany(Group::class)
            ->withPivot([
                'create',
                'read',
                'update',
                'delete',
            ]);
    }
}
