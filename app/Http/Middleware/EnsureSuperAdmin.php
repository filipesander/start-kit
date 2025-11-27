<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureSuperAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!auth()->check()) {
            return $request->expectsJson()
                ? response()->json(['message' => 'Não autenticado.'], 401)
                : redirect()->route('panel.login');
        }

        if (!auth()->user()->isSuperAdmin()) {
            return $request->expectsJson()
                ? response()->json(['message' => 'Acesso negado. Apenas superadmins podem acessar esta funcionalidade.'], 403)
                : abort(403, 'Acesso negado. Apenas superadmins podem acessar esta funcionalidade.');
        }

        return $next($request);
    }
}
