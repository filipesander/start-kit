<?php

namespace App\Providers;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\ServiceProvider;
use PragmaRX\Google2FAQRCode\Google2FA;
use PragmaRX\Google2FAQRCode\QRCode\Chillerlan;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind('otp-service', Google2FA::class);

        $this->app->singleton(Google2FA::class, function () {
            $google2fa = new Google2FA(new Chillerlan);

            $google2fa->setWindow(config('otp.window'));

            return $google2fa;
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->setCodeVersion();
    }

    protected function setCodeVersion()
    {
        $hash = trim(shell_exec('git rev-parse --short HEAD'));

        $tag = Cache::remember("app-version-{$hash}", now()->addDay(), function () {
            return trim(shell_exec('git fetch origin --tags && git describe --abbrev=0'));
        });

        config(['app.version' => $tag]);
    }
}
