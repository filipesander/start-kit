<?php

namespace App\Http\Controllers\Panel\Main;

use App\Http\Controllers\Panel\Controller;
use App\Http\Requests\Panel\Main\UserRequest;
use App\Models\Panel\Main\Group;
use App\Models\Panel\Main\User;
use App\Resources\Laratables\User as LaratablesUser;
use Freshbitsweb\Laratables\Laratables;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UsersController extends Controller
{
    public function index()
    {
        if (request()->expectsJson()) {
            return Laratables::recordsOf(User::class, LaratablesUser::class);
        }

        return Inertia::render('Main/Users/List');
    }

    public function create()
    {
        return Inertia::render('Main/Users/Edit', [
            'user' => null,
            'roles' => (object) $this->getRoles(),
            'groups' => Group::select('id', 'name')->orderBy('name')->get(),
            'isReadOnly' => false,
        ]);
    }

    public function store(UserRequest $request)
    {
        DB::transaction(function () use ($request) {
            $user = new User($request->except('groups', 'password'));
            $user->password = Hash::make($request->input('password'));
            $user->save();

            $user->groups()->attach($request->input('groups'));

            return $user;
        });

        return redirect()
            ->route('panel.main.users.index')
            ->with('success', 'Usuário registrado com sucesso!');
    }

    public function show(User $user)
    {
        return redirect()
            ->route('panel.main.users.edit', [$user->id]);
    }

    public function edit(User $user)
    {
        $user->load('groups:id,name');

        return Inertia::render('Main/Users/Edit', [
            'user' => $user,
            'roles' => (object) $this->getRoles(),
            'groups' => Group::select('id', 'name')->orderBy('name')->get(),
            'isReadOnly' => false,
        ]);
    }

    public function update(UserRequest $request, User $user)
    {
        DB::transaction(function () use ($request, $user) {
            $data = $request->except('password', 'groups');

            if ($password = $request->input('password')) {
                $data['password'] = Hash::make($password);
            }

            $user->update($data);
            $user->groups()->sync($request->input('groups'));

            return $user;
        });

        return redirect()
            ->route('panel.main.users.index')
            ->with('success', 'Usuário atualizado com sucesso!');
    }

    public function destroy(User $user)
    {
        return response()
            ->json([
                'status' => $user->delete(),
            ]);
    }

    public function reset2Fa(User $user)
    {
        return response()->json([
            'status' => $user->update(['otp_secret' => null]),
        ]);
    }

    public function getRoles()
    {
        return [
            User::ROLE_NORMAL => trans('users.roles.' . User::ROLE_NORMAL),
            User::ROLE_DIRECTOR => trans('users.roles.' . User::ROLE_DIRECTOR),
            User::ROLE_ADMINISTRATOR => trans('users.roles.' . User::ROLE_ADMINISTRATOR),
            User::ROLE_MANAGER => trans('users.roles.' . User::ROLE_MANAGER),
        ];
    }
}
