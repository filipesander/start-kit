<?php

namespace App\Models\Traits;

use App\Models\Panel\Main\Company;
use App\Models\Scopes\CompanyScope;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

trait BelongsToCompany
{
    /**
     * Boot the trait and add the global scope.
     */
    protected static function bootBelongsToCompany(): void
    {
        static::addGlobalScope(new CompanyScope());

        static::creating(function ($model) {
            if (!$model->company_id && auth()->check()) {
                $user = auth()->user();
                if ($user && ($user->company || $user->company_id)) {
                    $model->company_id = $user->company ? $user->company->id : $user->company_id;
                }
            }
        });
    }

    /**
     * Get the company that owns the model.
     */
    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }
}
