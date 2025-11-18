<?php

namespace App\Http\Controllers\Panel\Main;

use App\Http\Controllers\Panel\Controller;
use App\Http\Requests\Panel\Main\GroupRequest;
use App\Models\Environment;
use App\Models\Panel\Main\Group;
use App\Resources\Laratables\Group as LaratablesGroup;
use Freshbitsweb\Laratables\Laratables;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class GroupsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (request()->expectsJson()) {
            return Laratables::recordsOf(Group::class, LaratablesGroup::class);
        }

        return Inertia::render('Main/Groups/List');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
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
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\Panel\Main\GroupRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(GroupRequest $request)
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
     * Display the specified resource.
     *
     * @param  \App\Models\Panel\Main\Group  $group
     * @return \Illuminate\Http\Response
     */
    public function show(Group $group)
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
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Panel\Main\Group  $group
     * @return \Illuminate\Http\Response
     */
    public function edit(Group $group)
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
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\Panel\Main\GroupRequest  $request
     * @param  \App\Models\Panel\Main\Group  $group
     * @return \Illuminate\Http\Response
     */
    public function update(GroupRequest $request, Group $group)
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
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Panel\Main\Group  $group
     * @return \Illuminate\Http\Response
     */
    public function destroy(Group $group)
    {
        return response()->json([
            'status' => $group->delete(),
        ]);
    }

    protected function getEnvironmentsWithModules()
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

    protected function getPermissionsFromGroup(Group $group)
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

    protected function getProfilePermissions()
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
