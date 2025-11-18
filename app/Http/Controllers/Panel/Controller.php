<?php

namespace App\Http\Controllers\Panel;

use App\Http\Controllers\Controller as BaseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class Controller extends BaseController
{
    public function __invoke()
    {
        if (!Auth::check()) {
            return redirect()
                ->route('panel.login');
        }

        $environment = Auth::user()->environments->first();

        $module = Auth::user()->modules->firstWhere('environment_id', $environment->id);

        if (!$module) {
            Auth::logout();

            return redirect()
                ->route('panel.login');
        }

        return redirect()->route($module->route);
    }

    /**
     * Execute an action on the controller.
     *
     * @param  string  $method
     * @param  array  $parameters
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function callAction($method, $parameters)
    {
        if (Auth::check() && isset($this->resourceAbilityMap()[$method])) {
            $this->authorize($this->resourceAbilityMap()[$method]);
        }

        return $this->{$method}(...array_values($parameters));
    }

    /**
     * Get the map of resource methods to ability names.
     *
     * @return array
     */
    protected function resourceAbilityMap()
    {
        return [
            'index' => 'read',
            'show' => 'read',
            'create' => 'create',
            'store' => 'create',
            'edit' => 'update',
            'update' => 'update',
            'destroy' => 'delete',
        ];
    }
}
