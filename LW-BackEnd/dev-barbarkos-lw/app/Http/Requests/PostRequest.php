<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class PostRequest extends FormRequest
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
            'title' => 'required|string|min:5',
            'post_content' => 'required|min:10',
            'tags' => 'required|string',
            'visibility' => 'required|string',
        ];
    }

    public function messages()
    {
        return [
            'title.min' => 'Title must be at least 5 characters',
            'title.required' => 'Title is required',
            'post_content.required' => 'Post Content is required',
            'post_content.min' => 'Post Content must be at least 10 characters',
            'tags.required' => 'Tag is required',
            'visibility.required' => 'Visibility is required to be filled in',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json($validator->errors(), 422));
    }
}
