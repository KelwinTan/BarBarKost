<?php

namespace App\Http\Middleware;

use Closure;

class AuthorizeMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next, $role)
    {
        if (auth()->user()->type != $role){
            return response()->json('Unauthorized User');
        }
        return $next($request);
    }
}
