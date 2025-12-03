<?php

namespace App\Http\Controllers\Panel\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EmailVerificationPromptController extends Controller
{
    /**
     * Exibe o aviso para verificação de e-mail.
     *
     * @param Request $request Requisição do usuário autenticado.
     * @return RedirectResponse|Response
     */
    public function __invoke(Request $request): RedirectResponse|Response
    {
        return $request->user()->hasVerifiedEmail()
                    ? redirect()->intended(route('panel.index'))
                    : Inertia::render('Auth/VerifyEmail', ['status' => session('status')]);
    }
}
