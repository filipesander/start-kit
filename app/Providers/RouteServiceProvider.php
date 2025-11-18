<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * The controller namespace for the application.
     *
     * When present, controller route declarations will automatically be prefixed with this namespace.
     *
     * @var string|null
     */
    protected $namespace = 'App\\Http\\Controllers';

    /**
     * Define your route model bindings, pattern filters, and other route configuration.
     *
     * @return void
     */
    public function boot()
    {
        if (env('APP_FORCE_SECURE_PROTOCOL', false)) {
            URL::forceScheme('https');
        }

        $this->configureRateLimiting();

        $this->routes(function () {
            Route::middleware('api')
                ->prefix('api')
                ->group(base_path('routes/api.php'));

            Route::middleware('web')
                ->group(base_path('routes/web.php'));

            $this->configPanelRoutes();
        });
    }

    /**
     * Configure the rate limiters for the application.
     *
     * @return void
     */
    protected function configureRateLimiting()
    {
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
        });
    }

    protected function configPanelRoutes()
    {
        $domain = app()->isLocal() ? null : env('APP_PANEL_URL');

        $router = Route::prefix($domain ? null : 'panel')
            ->domain($domain)
            ->name('panel.');

        $router->middleware('web', 'inertia:panel')
            ->group(base_path('routes/panel/auth.php'));

        $router->middleware('panel')
            ->group(base_path('routes/panel.php'));

        $basePath = base_path('routes/panel');

        $files = array_slice(scandir($basePath), 2);

        foreach ($files as $file) {
            if ($file === 'auth.php') {
                continue;
            }

            $environment = str_replace('.php', '', $file);

            $namespace = ucfirst(Str::camel($environment));

            $router->middleware('panel')
                ->prefix($domain ? $environment : "panel/{$environment}")
                ->name("panel.{$environment}.")
                ->namespace("{$this->namespace}\\Panel\\{$namespace}")
                ->group("{$basePath}/{$file}");
        }
    }
}
