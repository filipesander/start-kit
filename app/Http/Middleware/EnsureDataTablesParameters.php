<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureDataTablesParameters
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
        if ($request->expectsJson() && !$request->has('search')) {
            $request->merge([
                'search' => ['value' => ''],
                'draw' => $request->input('draw', 1),
                'start' => $request->input('start', 0),
                'length' => $request->input('length', 10),
            ]);
        }

        return $next($request);
    }
}
