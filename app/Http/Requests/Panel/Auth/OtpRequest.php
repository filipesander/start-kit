<?php

namespace App\Http\Requests\Panel\Auth;

use Illuminate\Foundation\Http\FormRequest;

class OtpRequest extends FormRequest
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
        return [
            'code' => [
                'bail',
                'required',
                'string',
                'max:6',
                function ($attribute, $value, $fail) {
                    $secret = auth()->user()->otp_secret;

                    if (! app('otp-service')->verifyKey($secret, $value)) {
                        return $fail('Código inválido!');
                    }
                },
            ],
        ];
    }
}
