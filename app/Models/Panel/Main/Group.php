<?php

namespace App\Models\Panel\Main;

use App\Models\Module;
use App\Models\Traits\BelongsToCompany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Auditable;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class Group extends Model implements AuditableContract
{
    use Auditable, HasFactory, BelongsToCompany;

    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory()
    {
        return \Database\Factories\Panel\Main\GroupFactory::new();
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'company_id',
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
