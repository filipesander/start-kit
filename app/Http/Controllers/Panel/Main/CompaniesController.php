<?php

namespace App\Http\Controllers\Panel\Main;

use App\Http\Controllers\Panel\Controller;
use App\Http\Requests\Panel\Main\CompanyRequest;
use App\Models\Panel\Main\Company;
use App\Models\Panel\Main\User;
use App\Resources\Laratables\Company as LaratablesCompany;
use Freshbitsweb\Laratables\Laratables;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class CompaniesController extends Controller
{
    /**
     * Configura o middleware necessário para proteger as rotas do controlador.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('superadmin')->except(['switchCompany', 'getAvailableCompanies']);
    }

    /**
     * Lista as empresas, retornando JSON ou a página Inertia correspondente.
     *
     * @return Response|JsonResponse
     */
    public function index(): Response|JsonResponse
    {
        if (request()->expectsJson()) {
            return Laratables::recordsOf(Company::class, LaratablesCompany::class);
        }

        return Inertia::render('Main/Companies/List');
    }

    /**
     * Retorna as empresas disponíveis para o usuário atual em formato JSON.
     *
     * @return JsonResponse
     */
    public function getAvailableCompanies(): JsonResponse
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

    /**
     * Renderiza a tela de criação de empresa.
     *
     * @return Response
     */
    public function create(): Response
    {
        return Inertia::render('Main/Companies/Edit', [
            'company' => null,
            'isReadOnly' => false,
        ]);
    }

    /**
     * Persiste uma nova empresa e associa o usuário autenticado como proprietário.
     *
     * @param CompanyRequest $request Dados validados da empresa.
     * @return RedirectResponse
     */
    public function store(CompanyRequest $request): RedirectResponse
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

    /**
     * Redireciona para a tela de edição da empresa selecionada.
     *
     * @param Company $company Empresa selecionada.
     * @return RedirectResponse
     */
    public function show(Company $company): RedirectResponse
    {
        return redirect()
            ->route('panel.main.companies.edit', [$company->id]);
    }

    /**
     * Exibe o formulário de edição de uma empresa.
     *
     * @param Company $company Empresa a ser editada.
     * @return Response
     */
    public function edit(Company $company): Response
    {
        $company->load('users:id,name,email');

        return Inertia::render('Main/Companies/Edit', [
            'company' => $company,
            'isReadOnly' => false,
        ]);
    }

    /**
     * Atualiza os dados da empresa, incluindo upload do logotipo.
     *
     * @param CompanyRequest $request Dados validados da empresa.
     * @param Company $company Empresa que será atualizada.
     * @return RedirectResponse
     */
    public function update(CompanyRequest $request, Company $company): RedirectResponse
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

    /**
     * Remove uma empresa e seu logotipo, retornando o status da operação.
     *
     * @param Company $company Empresa que será removida.
     * @return JsonResponse
     */
    public function destroy(Company $company): JsonResponse
    {
        if ($company->logo) {
            Storage::disk('public')->delete($company->logo);
        }

        return response()
            ->json([
                'status' => $company->delete(),
            ]);
    }

    /**
     * Troca a empresa corrente do usuário caso haja permissão.
     *
     * @param Request $request Requisição contendo o identificador da empresa.
     * @return JsonResponse
     */
    public function switchCompany(Request $request): JsonResponse
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

    /**
     * Vincula um usuário à empresa, indicando também o vínculo de proprietários.
     *
     * @param Request $request Dados do vínculo entre usuário e empresa.
     * @param Company $company Empresa que receberá o usuário.
     * @return JsonResponse
     */
    public function addUser(Request $request, Company $company): JsonResponse
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

    /**
     * Remove o vínculo de um usuário com a empresa informada.
     *
     * @param Request $request Dados da requisição (mantido para consistência).
     * @param Company $company Empresa da qual o usuário será removido.
     * @param User $user Usuário a ser desvinculado.
     * @return JsonResponse
     */
    public function removeUser(Request $request, Company $company, User $user): JsonResponse
    {
        $company->users()->detach($user->id);

        return response()->json([
            'status' => true,
            'message' => 'Usuário removido da empresa com sucesso!',
        ]);
    }
}
