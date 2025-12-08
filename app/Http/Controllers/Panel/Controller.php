<?php

namespace App\Http\Controllers\Panel;

use App\Http\Controllers\Controller as BaseController;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class Controller extends BaseController
{
    /**
     * Redireciona o usuário autenticado para o primeiro módulo disponível.
     *
     * @return RedirectResponse
     */
    public function __invoke(): RedirectResponse
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
     * Executa a ação solicitada garantindo que o usuário tenha permissão.
     *
     * @param string $method
     * @param array $parameters
     * @return mixed
     */
    public function callAction($method, $parameters): mixed
    {
        if (Auth::check() && isset($this->resourceAbilityMap()[$method])) {
            $this->authorize($this->resourceAbilityMap()[$method]);
        }

        return $this->{$method}(...array_values($parameters));
    }

    /**
     * Retorna o mapa entre métodos REST e as habilidades autorizáveis.
     *
     * @return array<string, string>
     */
    protected function resourceAbilityMap(): array
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
