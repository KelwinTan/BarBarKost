<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class FacilityRequest1 extends FormRequest
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
            'name' => 'required|string|min:5',
            'icon' => 'required|string',
            'group' => 'required|string'
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Facility name is required',
            'icon.required' => 'Icon is required',
            'group.required' => 'Group is required',
            'name.min' => 'Minimal 5 characters for Facility Name'
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json($validator->errors(), 422));
    }
}
