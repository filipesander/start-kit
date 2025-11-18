<?php

namespace App\Http\Controllers\Panel\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Panel\Auth\OtpRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OneTimePasswordController extends Controller
{
    public function create()
    {
        return Inertia::render('Auth/Otp');
    }

    public function store(OtpRequest $request)
    {
        $request->session()->put('otp', [
            'verified' => true,
            'at' => now()->timestamp,
        ]);

        return redirect()->route('panel.index');
    }
}
