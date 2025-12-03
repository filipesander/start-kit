<?php

namespace App\Http\Controllers\Panel\Profile;

use App\Http\Controllers\Panel\Controller;
use App\Http\Requests\Panel\Profile\OneTimePasswordRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class OneTimePasswordController extends Controller
{
    /**
     * Exibe a tela de configuração do OTP ou redireciona se já configurado.
     *
     * @return Response|RedirectResponse
     */
    public function edit(): Response|RedirectResponse
    {
        if (Auth::user()->otp_secret !== null) {
            return redirect()->route('panel.profile.me.edit');
        }

        $name = implode(' - ', [
            config('app.name'),
            strtoupper(substr(config('app.env'), 0, 3)),
        ]);

        $secret = app('otp-service')->generateSecretKey();

        $qrCode = app('otp-service')
            ->getQrCodeInline($name, Auth::user()->email, $secret, 250);

        $signature = hash_hmac('sha256', $secret, config('app.key'));

        return Inertia::render('Profile/Otp', compact('name', 'secret', 'qrCode', 'signature'));
    }

    /**
     * Conclui a configuração do OTP e marca a sessão como verificada.
     *
     * @param OneTimePasswordRequest $request Requisição validada com o token OTP.
     * @return RedirectResponse
     */
    public function update(OneTimePasswordRequest $request): RedirectResponse
    {
        Auth::user()->update(['otp_secret' => $request->input('secret')]);

        $request->session()->put('otp', [
            'verified' => true,
            'at' => now()->timestamp,
        ]);

        return redirect()->intended(route('panel.login'));
    }
}
