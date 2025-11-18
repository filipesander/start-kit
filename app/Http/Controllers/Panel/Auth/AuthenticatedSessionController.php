<?php

namespace App\Http\Controllers\Panel\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Panel\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * @var string
     */
    protected $guard = 'panel';

    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('panel.password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate($this->guard);

        $request->session()->regenerate();

        if ($intendedUrl = $request->session()->get('url.intended')) {
            if (Str::startsWith($intendedUrl, 'http://')) {
                if (env('APP_FORCE_SECURE_PROTOCOL', false)) {
                    $intendedUrl = Str::replace('http://', 'https://', $intendedUrl);
                }
            }

            return redirect($intendedUrl);
        }

        return redirect()->route('panel.index');
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard($this->guard)->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect(route('panel.index'));
    }
}
