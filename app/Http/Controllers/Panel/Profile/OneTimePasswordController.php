<?php

namespace App\Http\Controllers\Panel\Profile;

use App\Http\Controllers\Panel\Controller;
use App\Http\Requests\Panel\Profile\OneTimePasswordRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class OneTimePasswordController extends Controller
{
    public function edit()
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

    public function update(OneTimePasswordRequest $request)
    {
        Auth::user()->update(['otp_secret' => $request->input('secret')]);

        $request->session()->put('otp', [
            'verified' => true,
            'at' => now()->timestamp,
        ]);

        return redirect()->intended(route('panel.login'));
    }
}
