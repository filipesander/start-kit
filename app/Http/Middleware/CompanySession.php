<?php

namespace App\Http\Middleware;

use App\Models\Panel\Main\CompanyGroup;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CompanySession
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = auth()->user();

        if (!$user || !$user->company_id) {
            return $next($request);
        }

        // Load the current company relationship
        $user->load('company');

        $companyGroup = CompanyGroup::whereJsonContains('companies', $user->company_id)->first();

        if (!$companyGroup && $user->original_company_id) {
            $companyGroup = CompanyGroup::whereJsonContains('companies', $user->original_company_id)->first();
        }

        if ($companyGroup) {
            $companies = $companyGroup->getCompaniesModels();
            $groupsByCompany = [];

            foreach ($companies as $company) {
                $userGroups = $user->groups()
                    ->where(function ($query) use ($company) {
                        $query->whereNull('groups.company_id')
                              ->orWhere('groups.company_id', $company->id);
                    })
                    ->get();

                if ($userGroups->isEmpty()) {
                    continue;
                }

                $groupsByCompany[] = [
                    'company_id' => $company->id,
                    'company_name' => $company->name,
                    'groups' => $userGroups,
                ];
            }

            $user->setRelation('companies', $companies);
            $user->setRelation('groups_by_company', collect($groupsByCompany));
        }

        return $next($request);
    }
}
