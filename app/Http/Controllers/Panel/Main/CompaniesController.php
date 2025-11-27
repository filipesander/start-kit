<?php

namespace App\Http\Controllers\Panel\Main;

use App\Http\Controllers\Panel\Controller;
use App\Http\Requests\Panel\Main\CompanyRequest;
use App\Models\Panel\Main\Company;
use App\Models\Panel\Main\User;
use App\Resources\Laratables\Company as LaratablesCompany;
use Freshbitsweb\Laratables\Laratables;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CompaniesController extends Controller
{
    public function __construct()
    {
        $this->middleware('superadmin')->except(['switchCompany', 'getAvailableCompanies']);
    }

    public function index()
    {
        if (request()->expectsJson()) {
            return Laratables::recordsOf(Company::class, LaratablesCompany::class);
        }

        return Inertia::render('Main/Companies/List');
    }

    public function getAvailableCompanies()
    {
        $user = auth()->user();

        if ($user->isSuperAdmin()) {
            $companies = Company::where('active', true)->get();
        } else {
            $companies = $user->companies()->where('active', true)->get();
        }

        return response()->json([
            'companies' => $companies,
            'current_company_id' => session('current_company_id'),
        ]);
    }

    public function create()
    {
        return Inertia::render('Main/Companies/Edit', [
            'company' => null,
            'isReadOnly' => false,
        ]);
    }

    public function store(CompanyRequest $request)
    {
        $company = DB::transaction(function () use ($request) {
            $data = $request->except('logo');

            if ($request->hasFile('logo')) {
                $data['logo'] = $request->file('logo')->store('companies/logos', 'public');
            }

            $company = Company::create($data);

            $company->users()->attach(auth()->id(), ['is_owner' => true]);

            return $company;
        });

        return redirect()
            ->route('panel.main.companies.index')
            ->with('success', 'Empresa registrada com sucesso!');
    }

    public function show(Company $company)
    {
        return redirect()
            ->route('panel.main.companies.edit', [$company->id]);
    }

    public function edit(Company $company)
    {
        $company->load('users:id,name,email');

        return Inertia::render('Main/Companies/Edit', [
            'company' => $company,
            'isReadOnly' => false,
        ]);
    }

    public function update(CompanyRequest $request, Company $company)
    {
        DB::transaction(function () use ($request, $company) {
            $data = $request->except('logo');

            if ($request->hasFile('logo')) {
                if ($company->logo) {
                    Storage::disk('public')->delete($company->logo);
                }

                $data['logo'] = $request->file('logo')->store('companies/logos', 'public');
            }

            $company->update($data);

            return $company;
        });

        return redirect()
            ->route('panel.main.companies.index')
            ->with('success', 'Empresa atualizada com sucesso!');
    }

    public function destroy(Company $company)
    {
        if ($company->logo) {
            Storage::disk('public')->delete($company->logo);
        }

        return response()
            ->json([
                'status' => $company->delete(),
            ]);
    }

    public function switchCompany(Request $request)
    {
        if (!$request->filled('company_id')) {
            return response()->json([
                'message' => 'O ID da empresa é obrigatório.',
            ], 400);
        }

        $user = auth()->user();
        $companyId = $request->company_id;
        $company = Company::find($companyId);

        if (!$company) {
            return response()->json([
                'message' => 'Empresa não encontrada.',
            ], 404);
        }

        if ($user->isSuperAdmin() && !$user->company_id) {
            $key = "user:{$user->id}:company";
            Cache::put($key, $company, now()->addHour());

            $user->setRelation('company', $company);

            return response()->json([
                'status' => true,
                'message' => 'Empresa alterada com sucesso.',
                'redirect' => route('panel.index'),
            ]);
        }

        if (!$user->company_id) {
            return response()->json([
                'message' => 'Usuário não possui empresa vinculada.',
            ], 400);
        }

        $currentCompanyGroup = $user->company?->group();

        if (!$currentCompanyGroup) {
            return response()->json([
                'message' => 'Sua empresa atual não pertence a um grupo.',
            ], 400);
        }

        if (!in_array($companyId, $currentCompanyGroup->companies ?? [])) {
            return response()->json([
                'message' => 'Você não tem acesso a esta empresa.',
            ], 403);
        }

        $user->update(['company_id' => $companyId]);
        $user->setRelation('company', $company);

        return response()->json([
            'status' => true,
            'message' => 'Empresa alterada com sucesso.',
            'redirect' => route('panel.index'),
        ]);
    }

    public function addUser(Request $request, Company $company)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'is_owner' => 'boolean',
        ]);

        $company->users()->syncWithoutDetaching([
            $request->user_id => [
                'is_owner' => $request->boolean('is_owner', false),
            ],
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Usuário adicionado à empresa com sucesso!',
        ]);
    }

    public function removeUser(Request $request, Company $company, User $user)
    {
        $company->users()->detach($user->id);

        return response()->json([
            'status' => true,
            'message' => 'Usuário removido da empresa com sucesso!',
        ]);
    }
}
