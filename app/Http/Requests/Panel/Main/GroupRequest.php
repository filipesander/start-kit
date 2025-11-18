<?php

namespace App\Http\Requests\Panel\Main;

use App\Models\Module;
use Illuminate\Foundation\Http\FormRequest;

class GroupRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'permissions' => [
                'nullable',
                'array',
                function ($attribute, $value, $fail) {
                    if (Module::whereIn('id', array_keys($value))->doesntExist()) {
                        return $fail(trans('validation.exists', ['attribute' => $attribute]));
                    }
                },
            ],
        ];
    }
}
