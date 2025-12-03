<?php

namespace App\Http\Controllers\Panel\Main;

use App\Http\Controllers\Panel\Controller;
use App\Http\Requests\Panel\Main\GroupRequest;
use App\Models\Environment;
use App\Models\Panel\Main\Group;
use App\Resources\Laratables\Group as LaratablesGroup;
use Freshbitsweb\Laratables\Laratables;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades.DB;
use Inertia\Inertia;
use Inertia\Response;

class GroupsController extends Controller
{
    /**
     * Lista os grupos, retornando JSON quando solicitado via Ajax.
     *
     * @return Response|JsonResponse
     */
    public function index(): Response|JsonResponse
    {
        if (request()->expectsJson()) {
            return Laratables::recordsOf(Group::class, LaratablesGroup::class);
        }

        return Inertia::render('Main/Groups/List');
    }

    /**
     * Renderiza o formulário de criação de grupos.
     *
     * @return Response
     */
    public function create(): Response
    {
        $environments = $this->getEnvironmentsWithModules();

        return Inertia::render('Main/Groups/Edit', [
            'group' => null,
            'isReadOnly' => false,
            'environments' => $environments,
            'permissions' => [],
        ]);
    }

    /**
     * Persiste um novo grupo e seus módulos e permissões.
     *
     * @param GroupRequest $request Dados validados do grupo.
     * @return RedirectResponse
     */
    public function store(GroupRequest $request): RedirectResponse
    {
        DB::transaction(function () use ($request) {
            $group = Group::create($request->only('name'));

            $permissions = $request->input('permissions') + $this->getProfilePermissions();

            $group->modules()->attach($permissions);

            return $group;
        });

        return redirect()
            ->route('panel.main.groups.index')
            ->with('success', 'Grupo registrado com sucesso!');
    }

    /**
     * Exibe os detalhes de um grupo em modo somente leitura.
     *
     * @param Group $group Grupo que será exibido.
     * @return Response
     */
    public function show(Group $group): Response
    {
        $environments = $this->getEnvironmentsWithModules();

        $groupPermissions = $this->getPermissionsFromGroup($group);

        return Inertia::render('Main/Groups/Edit', [
            'group' => $group,
            'isReadOnly' => true,
            'environments' => $environments,
            'permissions' => $groupPermissions,
        ]);
    }

    /**
     * Exibe o formulário de edição para o grupo informado.
     *
     * @param Group $group Grupo que será editado.
     * @return Response
     */
    public function edit(Group $group): Response
    {
        $environments = $this->getEnvironmentsWithModules();

        $groupPermissions = $this->getPermissionsFromGroup($group);

        return Inertia::render('Main/Groups/Edit', [
            'group' => $group,
            'isReadOnly' => false,
            'environments' => $environments,
            'permissions' => $groupPermissions,
        ]);
    }

    /**
     * Atualiza os dados do grupo sincronizando as permissões selecionadas.
     *
     * @param GroupRequest $request Dados validados do grupo.
     * @param Group $group Grupo que será atualizado.
     * @return RedirectResponse
     */
    public function update(GroupRequest $request, Group $group): RedirectResponse
    {
        DB::transaction(function () use ($request, $group) {
            $group->update($request->except('permissions'));

            $permissions = $request->input('permissions') + $this->getProfilePermissions();

            $group->modules()->sync($permissions);

            return $group;
        });

        return redirect()
            ->route('panel.main.groups.index')
            ->with('success', 'Grupo atualizado com sucesso!');
    }

    /**
     * Exclui um grupo retornando o status da operação.
     *
     * @param Group $group Grupo que será removido.
     * @return JsonResponse
     */
    public function destroy(Group $group): JsonResponse
    {
        return response()->json([
            'status' => $group->delete(),
        ]);
    }

    /**
     * Busca os ambientes com seus módulos e relacionamentos necessários.
     *
     * @return EloquentCollection
     */
    protected function getEnvironmentsWithModules(): EloquentCollection
    {
        return Environment::with([
            'modules' => function ($query) {
                $query->with('parent')
                    ->doesntHave('children')
                    ->orderBy('order');
            },
        ])
            ->whereNotIn('slug', ['profile'])
            ->orderBy('order')
            ->get();
    }

    /**
     * Monta as permissões configuradas para um grupo.
     *
     * @param Group $group Grupo alvo das permissões.
     * @return Collection
     */
    protected function getPermissionsFromGroup(Group $group): Collection
    {
        return $group->modules()
            ->get()
            ->mapWithKeys(function ($module) {
                return [
                    $module->id => [
                        'create' =>  (bool) $module->pivot->create,
                        'read' =>  (bool) $module->pivot->read,
                        'update' =>  (bool) $module->pivot->update,
                        'delete' =>  (bool) $module->pivot->delete,
                    ],
                ];
            });
    }

    /**
     * Garante permissões totais para o ambiente de perfil.
     *
     * @return array<int, array<string, bool>>
     */
    protected function getProfilePermissions(): array
    {
        $profileEnvironment = Environment::whereSlug('profile')->first();

        return $profileEnvironment->modules->mapWithKeys(function ($module) {
            return [
                $module->id => [
                    'create' => true,
                    'read' => true,
                    'update' => true,
                    'delete' => true,
                ],
            ];
        })->toArray();
    }
}
