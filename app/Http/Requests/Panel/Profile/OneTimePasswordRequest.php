<?php

namespace App\Http\Requests\Panel\Profile;

use Illuminate\Foundation\Http\FormRequest;

class OneTimePasswordRequest extends FormRequest
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
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'secret' => 'bail|required|string',
            'signature' => [
                'bail',
                'required',
                'string',
                'max:255',
                function ($attribute, $value, $fail) {
                    if (hash_hmac('sha256', $this->input('secret'), config('app.key')) !== $value) {
                        return $fail('Não foi possível realizar a configuraçao, atualize a página e tente novamente');
                    }
                }
            ],
            'code' => [
                'required',
                'string',
                'size:6',
                function ($attribute, $value, $fail) {
                    if (!app('otp-service')->verifyKey($this->input('secret'), $value)) {
                        return $fail('Código inválido!');
                    }
                },
            ],
        ];
    }
}
