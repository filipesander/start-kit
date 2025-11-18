<?php

namespace App\Http\Middleware\Authenticated;

use App\Models\Panel\Main\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class GeneratePermissions
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
        $user = $this->user();

        $key = "panel.auth:user:{$user->id}";
        $ttl = app()->isProduction() ? now()->addWeek() : now();

        [$groups, $modules, $environments, $permissions] = Cache::remember($key, $ttl, function () use ($user) {
            $groups = $this->getGroups($user);

            $modules = $this->getModules($groups);

            $environments = $this->getEnvironments($modules);

            $permissions = $this->generatePermissions($environments, $modules);

            return [$groups, $modules, $environments, $permissions];
        });

        $user->setRelations(
            array_merge($user->getRelations(), compact('environments', 'modules', 'permissions'))
        );

        return $next($request);
    }

    /**
     * @return \App\Models\Panel\User
     */
    public function user()
    {
        return Auth::guard('panel')->user();
    }

    public function getGroups(User $user)
    {
        return $user->groups()
            ->with([
                'modules' => function ($query) {
                    $query->with('environment')
                        ->doesntHave('children');
                },
            ])
            ->get();
    }

    public function getModules(Collection $groups)
    {
        return $groups->flatMap(function ($group) {
            return $group->modules;
        })
            ->unique()
            ->sortBy('order')
            ->values();
    }

    public function getEnvironments(Collection $modules)
    {
        return $modules->map(function ($module) {
            return $module->environment;
        })
            ->unique()
            ->sortBy('order')
            ->values();
    }

    public function generatePermissions(Collection $environments, Collection $modules)
    {
        return $environments->mapWithKeys(function ($environment) use ($modules) {
            $permissions = $modules->filter(function ($module) use ($environment) {
                return $module->environment_id === $environment->id;
            })->mapWithKeys(function ($module) {
                unset($module->pivot->group_id, $module->pivot->module_id);

                return [
                    $module->slug => $module->pivot->toArray(),
                ];
            });

            return [$environment->slug => $permissions];
        });
    }
}
