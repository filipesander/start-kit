<?php

namespace App\Http\Requests\Panel\Main;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'groups' => 'nullable|array|exists:groups,id',
            'password' => 'required|string|min:8|max:255|confirmed',
            'auth_password' => [
                'required',
                'string',
                'max:255',
                function ($attribute, $value, $fail) {
                    if (! Hash::check($value, Auth::user()->password)) {
                        $fail('Sua senha está incorreta!');
                    }
                },
            ],
        ];

        if ($this->isMethod('put')) {
            $rules['email'] = 'required|email|max:255|unique:users,email,' . $this->route('user')->id . ',id';
            $rules['password'] = 'nullable|string|min:8|max:255|confirmed';
            $rules['auth_password'] = [
                'nullable',
                'required_with:password',
                'string',
                'max:255',
                function ($attribute, $value, $fail) {
                    if (! Hash::check($value, Auth::user()->password)) {
                        $fail('Sua senha está incorreta!');
                    }
                },
            ];
        }

        return $rules;
    }
}
