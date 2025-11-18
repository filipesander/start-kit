<?php

namespace App\Http\Middleware\Authenticated;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

class OneTimePassword
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if ($this->isConfiguringOtp()) {
            return $next($request);
        }

//        if ($this->shouldConfig()) {
//            return redirect()->route('panel.profile.otp.edit');
//        }

//        if ($this->shouldVerify($request)) {
//            return redirect()->route('panel.otp.show');
//        }

        return $next($request);
    }

    public function shouldConfig()
    {
        return config('otp.enabled', false)
            && !auth()->user()->otp_secret;
    }

    public function shouldVerify(Request $request)
    {
        return config('otp.enabled', false)
            && !$request->session()->get('otp.verified', false);
    }

    public function isConfiguringOtp()
    {
        return in_array(Route::currentRouteName(), [
            'panel.profile.otp.edit',
            'panel.profile.otp.update',
        ]);
    }
}
