<?php

namespace App\Models\Panel\Main;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use OwenIt\Auditing\Auditable;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class Company extends Model implements AuditableContract
{
    use Auditable, HasFactory, SoftDeletes;

    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory()
    {
        return \Database\Factories\Panel\Main\CompanyFactory::new();
    }

    protected $fillable = [
        'name',
        'cnpj',
        'logo',
        'active',
    ];

    protected $casts = [
        'active' => 'boolean',
    ];

    protected $appends = [
        'logo_url',
    ];

    public function getLogoUrlAttribute()
    {
        if ($this->logo) {
            return asset('storage/' . $this->logo);
        }
        return null;
    }

    public function users()
    {
        return $this->belongsToMany(User::class)
            ->withPivot('is_owner')
            ->withTimestamps();
    }

    public function owners()
    {
        return $this->belongsToMany(User::class)
            ->wherePivot('is_owner', true)
            ->withTimestamps();
    }

    public function group()
    {
        return CompanyGroup::whereJsonContains('companies', $this->id)->first();
    }

    public function getGroupCompaniesAttribute()
    {
        $group = $this->group();

        if (!$group) {
            return collect([]);
        }

        return $group->getCompaniesModels();
    }
}
