<?php

namespace App\Http\Controllers\Panel\Main;

use App\Http\Controllers\Panel\Controller;
use App\Http\Requests\Panel\Main\UserRequest;
use App\Models\Panel\Main\Group;
use App\Models\Panel\Main\User;
use App\Resources\Laratables\User as LaratablesUser;
use Freshbitsweb\Laratables\Laratables;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class UsersController extends Controller
{
    /**
     * Exibe a listagem de usuários ou retorna os registros em JSON.
     *
     * @return Response|JsonResponse
     */
    public function index(): Response|JsonResponse
    {
        if (request()->expectsJson()) {
            return Laratables::recordsOf(User::class, LaratablesUser::class);
        }

        return Inertia::render('Main/Users/List');
    }

    /**
     * Renderiza o formulário de criação de usuário.
     *
     * @return Response
     */
    public function create(): Response
    {
        return Inertia::render('Main/Users/Edit', [
            'user' => null,
            'roles' => (object) $this->getRoles(),
            'groups' => Group::select('id', 'name')->orderBy('name')->get(),
            'isReadOnly' => false,
        ]);
    }

    /**
     * Registra um novo usuário com seus grupos e senha.
     *
     * @param UserRequest $request Requisição validada com dados do usuário.
     * @return RedirectResponse
     */
    public function store(UserRequest $request): RedirectResponse
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

    /**
     * Redireciona para a edição do usuário selecionado.
     *
     * @param User $user Usuário que será exibido.
     * @return RedirectResponse
     */
    public function show(User $user): RedirectResponse
    {
        return redirect()
            ->route('panel.main.users.edit', [$user->id]);
    }

    /**
     * Exibe o formulário de edição de usuário carregando seus relacionamentos.
     *
     * @param User $user Usuário que será editado.
     * @return Response
     */
    public function edit(User $user): Response
    {
        $user->load('groups:id,name');

        return Inertia::render('Main/Users/Edit', [
            'user' => $user,
            'roles' => (object) $this->getRoles(),
            'groups' => Group::select('id', 'name')->orderBy('name')->get(),
            'isReadOnly' => false,
        ]);
    }

    /**
     * Atualiza os dados do usuário e sincroniza os grupos vinculados.
     *
     * @param UserRequest $request Requisição validada com dados do usuário.
     * @param User $user Usuário que será atualizado.
     * @return RedirectResponse
     */
    public function update(UserRequest $request, User $user): RedirectResponse
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

    /**
     * Remove um usuário retornando o status da exclusão.
     *
     * @param User $user Usuário que será removido.
     * @return JsonResponse
     */
    public function destroy(User $user): JsonResponse
    {
        return response()
            ->json([
                'status' => $user->delete(),
            ]);
    }

    /**
     * Reseta a configuração de autenticação em duas etapas do usuário.
     *
     * @param User $user Usuário que terá o 2FA redefinido.
     * @return JsonResponse
     */
    public function reset2Fa(User $user): JsonResponse
    {
        return response()->json([
            'status' => $user->update(['otp_secret' => null]),
        ]);
    }

    /**
     * Obtém a lista de papéis disponíveis para atribuição.
     *
     * @return array<string, string>
     */
    public function getRoles(): array
    {
        return [
            User::ROLE_NORMAL => trans('users.roles.' . User::ROLE_NORMAL),
            User::ROLE_DIRECTOR => trans('users.roles.' . User::ROLE_DIRECTOR),
            User::ROLE_ADMINISTRATOR => trans('users.roles.' . User::ROLE_ADMINISTRATOR),
            User::ROLE_MANAGER => trans('users.roles.' . User::ROLE_MANAGER),
        ];
    }
}
