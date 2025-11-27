<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $guard = Auth::guard()->getSelfName();
        $user = Auth::user();

        // Prepara dados do usuário com relações dinâmicas
        $userData = $user ? $user->toArray() : null;

        // Adiciona relações dinâmicas se existirem
        if ($user) {
            if ($user->relationLoaded('company')) {
                $userData['company'] = $user->company;
            }
            if ($user->relationLoaded('companies')) {
                $userData['companies'] = $user->companies;
            }
            if ($user->relationLoaded('groups_by_company')) {
                $userData['groups_by_company'] = $user->groups_by_company;
            }
        }

        return array_merge(parent::share($request), [
            'app' => [
                'environment' => app()->environment(),
                'version' => config('app.version'),
                'agent' => Str::title(config('app.name')) . '/' . config('app.version'),
            ],
            'auth' => [
                'guard' => $guard,
                'user' => $userData,
            ],
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
            'ziggy' => function () use ($request, $guard) {
                return array_merge((new Ziggy($guard))->toArray(), [
                    'location' => $request->url(),
                ]);
            },
        ]);
    }

    /**
     * Handle the incoming request.
     *
     * @return Response
     */
    public function handle(Request $request, Closure $next)
    {
        if ($rootView = (func_get_args()[2] ?? null)) {
            $this->rootView = $rootView;
        }

        return parent::handle($request, $next);
    }
}
