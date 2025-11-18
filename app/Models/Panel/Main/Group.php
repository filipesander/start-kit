<?php

namespace App\Models\Panel\Main;

use App\Models\Module;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Auditable;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class Group extends Model implements AuditableContract
{
    use Auditable, HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
    ];

    public function modules()
    {
        return $this->belongsToMany(Module::class)
            ->withPivot([
                'create',
                'read',
                'update',
                'delete',
            ]);
    }

    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
