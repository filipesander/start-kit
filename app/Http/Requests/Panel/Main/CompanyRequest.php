<?php

namespace App\Http\Requests\Panel\Main;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CompanyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $rules = [
            'name' => 'required|string|max:255',
            'cnpj' => [
                'required',
                'string',
                'max:18',
                'regex:/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/',
                Rule::unique('companies')->ignore($this->route('company')),
            ],
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:2048',
            'active' => 'nullable|boolean',
        ];

        return $rules;
    }

    public function messages(): array
    {
        return [
            'name.required' => 'O nome da empresa é obrigatório.',
            'cnpj.required' => 'O CNPJ é obrigatório.',
            'cnpj.regex' => 'O CNPJ deve estar no formato: 00.000.000/0000-00',
            'cnpj.unique' => 'Este CNPJ já está cadastrado.',
            'logo.image' => 'O arquivo deve ser uma imagem.',
            'logo.mimes' => 'A logo deve ser um arquivo do tipo: jpeg, png, jpg ou svg.',
            'logo.max' => 'A logo não pode ser maior que 2MB.',
        ];
    }
}
