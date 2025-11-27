<?php

namespace App\Models\Panel\Main;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Auditable;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class CompanyGroup extends Model implements AuditableContract
{
    use Auditable, HasFactory;

    protected $fillable = [
        'name',
        'companies',
    ];

    protected $casts = [
        'companies' => 'array',
    ];

    public function getCompaniesModels()
    {
        if (empty($this->companies)) {
            return collect([]);
        }

        return Company::whereIn('id', $this->companies)->get();
    }
}
