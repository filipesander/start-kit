<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;

use App\Models\Module;
use App\Models\Panel\Main\User;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        $this->registerBasicGates();
    }

    protected function registerBasicGates()
    {
        foreach (['read', 'create', 'update', 'delete'] as $permission) {
            Gate::define($permission, function (User $user, $module = null) use ($permission) {
                if (is_null($module)) {
                    if (!$user->currentEnvironment || !$user->currentModule) {
                        return $user->isSuperAdmin();
                    }
                    return (bool) ($user->permissions[$user->currentEnvironment->slug][$user->currentModule->slug][$permission] ?? false);
                }

                if (is_string($module)) {
                    if (!$user->currentEnvironment) {
                        return $user->isSuperAdmin();
                    }
                    if ($module = $user->modules->firstWhere('slug', $module)) {
                        return (bool) ($user->permissions[$user->currentEnvironment->slug][$module->slug][$permission] ?? false);
                    }

                    return false;
                }

                if ($module instanceof Module) {
                    if (!$user->currentEnvironment) {
                        return $user->isSuperAdmin();
                    }
                    return (bool) ($user->permissions[$user->currentEnvironment->slug][$module->slug][$permission] ?? false);
                }

                return false;
            });
        }
    }
}
