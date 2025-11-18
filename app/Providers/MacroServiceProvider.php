<?php

namespace App\Providers;

use Illuminate\Auth\SessionGuard;
use Illuminate\Http\Client\Request as IlluminateClientRequest;
use Illuminate\Http\Client\Response as IlluminateClientResponse;
use Illuminate\Support\ServiceProvider;

class MacroServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        SessionGuard::macro('getSelfName', function () {
            return $this->name;
        });

        IlluminateClientRequest::macro('getOriginal', function () {
            return $this->request;
        });

        IlluminateClientResponse::macro('getOriginal', function () {
            return $this->response;
        });
    }
}
