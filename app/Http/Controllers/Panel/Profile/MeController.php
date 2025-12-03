<?php

namespace App\Http\Controllers\Panel\Profile;

use App\Http\Controllers\Panel\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class MeController extends Controller
{
    /**
     * Renderiza a página de edição dos dados do usuário autenticado.
     *
     * @return Response
     */
    public function edit(): Response
    {
        return Inertia::render('Profile/Me');
    }

    /**
     * Atualiza o perfil do usuário validando senha e campos sensíveis.
     *
     * @param Request $request Requisição com os dados atualizados do perfil.
     * @return RedirectResponse
     *
     * @throws ValidationException
     */
    public function update(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'current_password' => 'nullable|string|required_with:password',
            'password' => 'nullable|string|min:8|max:255|confirmed',
        ]);

        $user = Auth::user();

        if (isset($data['password']) && !empty($data['password'])) {
            if (!isset($data['current_password']) || !Hash::check($data['current_password'], $user->password)) {
                throw ValidationException::withMessages([
                    'current_password' => ['A senha atual está incorreta.'],
                ]);
            }
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        unset($data['current_password']);

        $user->update($data);

        return redirect()
            ->route('panel.profile.me.edit')
            ->with('success', 'Dados atualizados com sucesso!');
    }
}
