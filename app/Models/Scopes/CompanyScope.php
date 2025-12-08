<?php

namespace App\Models\Scopes;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;

class CompanyScope implements Scope
{
    /**
     * Apply the scope to a given Eloquent query builder.
     */
    public function apply(Builder $builder, Model $model): void
    {
        // Only apply scope if user is authenticated and has a company loaded
        if (auth()->check()) {
            $user = auth()->user();

            // For User model, check company relationship or company_id attribute
            if ($user && ($user->company || $user->company_id)) {
                $companyId = $user->company ? $user->company->id : $user->company_id;
                $builder->where($model->getTable() . '.company_id', $companyId);
            }
        }
    }
}
