<?php

namespace App\Http\Controllers\Panel\Profile;

use App\Http\Controllers\Panel\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class MeController extends Controller
{
    public function edit()
    {
        return Inertia::render('Profile/Me');
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'password' => 'nullable|string|max:255|confirmed',
        ]);

        $user = Auth::user();

        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        $user->update($data);

        return redirect()
            ->route('panel.profile.me.edit')
            ->with('success', 'Dados atualizados com sucesso!');
    }
}
