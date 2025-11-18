<?php

namespace App\Http\Middleware\Authenticated;

use App\Models\Environment;
use App\Models\Module;
use App\Models\Panel\Main\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GenerateMenu
{
    protected $maxLevel = 3;

    /**
     * @var User
     */
    protected $user;

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $this->user = $this->auth()->user();

        if (!$this->user->currentEnvironment) {
            return $next($request);
        }

        $menu = $this->generateMenu($this->user);

        $this->user->setRelations(
            array_merge($this->user->getRelations(), compact('menu'))
        );

        return $next($request);
    }

    public function generateMenu(User $user)
    {
        $modulesIds = $this->getModulesIds($user);
        $environmentsIds = $this->getEnvironments($user);

        return Environment::query()
            ->whereIn('id', $environmentsIds)
            ->get()
            ->map(
                fn (Environment $environment) => $environment->setAttribute('modules',
                Module::with([
                    'children' => function ($query) use ($modulesIds) {
                        $query = $this->withChildren($query, $modulesIds);
                    },
                ])
                    ->doesntHave('parent')
                    ->where(function ($query) use ($modulesIds, $environment) {
                        $query->whereIn('id', $modulesIds)
                            ->whereEnvironmentId($environment->id)
                            ->orWhereHas('children', function ($query) use ($modulesIds) {
                                $query->whereIn('id', $modulesIds);
                            });
                    })
                    ->orderBy('order')
                    ->get()
            ));
    }

    protected function withChildren($query, $modulesIds, $level = 1)
    {
        if ($level < $this->maxLevel) {
            $query = $query->with([
                'children' => function ($query) use ($modulesIds, $level) {
                    $query = $this->withChildren($query, $modulesIds, $level + 1);
                }
            ]);
        }

        return $query->where(function ($query) use ($modulesIds) {
            $query->whereIn('id', $modulesIds)
                ->orWhereHas('children', function ($query) use ($modulesIds) {
                    $query->whereIn('id', $modulesIds);
                });
        })
            ->orderBy('order');
    }

    public function getModulesIds(User $user)
    {
        return $user->groups()
            ->with([
                'modules' => function ($query) use ($user) {
                    $query->select('id')
                        ->wherePivot('read', true);
                },
            ])
            ->get()
            ->flatMap(function ($group) {
                return $group->modules;
            })
            ->unique()
            ->pluck('id');
    }

    public function getEnvironments(User $user)
    {
        return $user->groups()
            ->with([
                'modules' => function ($query) use ($user) {
                    $query->select('environment_id')
                        ->wherePivot('read', true);
                },
            ])
            ->get()
            ->flatMap(function ($group) {
                return $group->modules;
            })
            ->unique()
            ->pluck('environment_id');
    }

    public function auth()
    {
        return Auth::guard('panel');
    }
}
