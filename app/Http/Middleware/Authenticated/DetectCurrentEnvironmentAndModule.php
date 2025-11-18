<?php

namespace App\Http\Middleware\Authenticated;

use App\Models\Environment;
use App\Models\Module;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

class DetectCurrentEnvironmentAndModule
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
        if (Route::currentRouteName() === 'panel.index') {
            return $next($request);
        }

        $parts = explode('.', Route::currentRouteName());

        if (count($parts) <= 4) {
            [$root, $environmentSlug, $moduleSlug, $action] = array_pad($parts, 4, null);
        } else {
            [$root, $environmentSlug, $parentSlug, $moduleSlug, $action] = $parts;
        }

        if ($root !== 'panel') {
            return redirect()->route('panel.index');
        }

        if (!$environmentSlug || !$moduleSlug) {
            return redirect()->route('panel.index');
        }

        $currentEnvironment = Environment::whereSlug($environmentSlug)->first();

        if (!$currentEnvironment) {
            return redirect()->route('panel.index');
        }

        $currentModule = Module::whereSlug($moduleSlug)
            ->whereEnvironmentId($currentEnvironment->id)
            ->first();

        if (!$currentModule) {
            $currentModule = Module::whereSlug($parentSlug)
                ->whereEnvironmentId($currentEnvironment->id)
                ->where('route', '!=', '#')
                ->first();
        }

        if (!$currentModule) {
            return redirect()->route('panel.index');
        }

        $currentModule->load('parent');

        $user = $this->auth()->user();

        $user->setRelations(
            array_merge($user->getRelations(), compact('currentEnvironment', 'currentModule'))
        );

        return $next($request);
    }

    public function auth()
    {
        return Auth::guard('panel');
    }
}
