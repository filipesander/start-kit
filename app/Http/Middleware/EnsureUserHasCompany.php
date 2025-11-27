<?php

namespace App\Http\Middleware;

use App\Models\Panel\Main\Company;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserHasCompany
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = auth()->user();

        if (!$user) {
            return $next($request);
        }

        $currentCompanyId = session('current_company_id');

        if (!$currentCompanyId) {
            $firstCompany = $user->companies()->first();

            if ($firstCompany) {
                session(['current_company_id' => $firstCompany->id]);
                $currentCompanyId = $firstCompany->id;
            }
        }

        if ($currentCompanyId) {
            $company = Company::find($currentCompanyId);

            if ($company && $user->companies->contains($company->id)) {
                $request->merge(['current_company' => $company]);
                view()->share('currentCompany', $company);
            } else {
                session()->forget('current_company_id');
            }
        }

        return $next($request);
    }
}
