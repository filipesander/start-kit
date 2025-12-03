<?php

namespace App\Http\Controllers\Panel\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Panel\Auth\OtpRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class OneTimePasswordController extends Controller
{
    /**
     * Exibe o formulário para validação do código OTP.
     *
     * @return Response
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Otp');
    }

    /**
     * Verifica o OTP e libera o acesso ao painel.
     *
     * @param OtpRequest $request Requisição com o token OTP validado.
     * @return RedirectResponse
     */
    public function store(OtpRequest $request): RedirectResponse
    {
        $request->session()->put('otp', [
            'verified' => true,
            'at' => now()->timestamp,
        ]);

        return redirect()->route('panel.index');
    }
}
