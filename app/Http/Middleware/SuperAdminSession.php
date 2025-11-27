<?php

namespace App\Http\Middleware;

use App\Models\Panel\Main\Company;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\Response;

class SuperAdminSession
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = auth()->user();

        if (!$user) {
            return $next($request);
        }

        if ($user->isSuperAdmin() && !$user->company_id) {
            $companies = Cache::remember('companies:all', now()->addMinutes(5), function () {
                return Company::where('active', true)->get();
            });

            $key = "user:{$user->id}:company";
            $currentCompanyId = Cache::get($key);

            if (!$currentCompanyId && $companies->isNotEmpty()) {
                $currentCompanyId = $companies->first()->id;
                Cache::put($key, $currentCompanyId, now()->addHour());
            }

            if ($currentCompanyId) {
                $company = $companies->firstWhere('id', $currentCompanyId);
                if ($company) {
                    $user->setRelation('company', $company);
                    $user->setRelation('companies', $companies);
                }
            }
        }

        return $next($request);
    }
}
