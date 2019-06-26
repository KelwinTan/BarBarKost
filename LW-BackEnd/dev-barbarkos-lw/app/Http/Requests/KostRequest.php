<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class KostRequest extends FormRequest
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
            'name' => 'required|string|max:100',
            'description' => 'required',
            'prices' => 'required',
            'city' => 'required',
            'address' => 'required|min:8',
            'total_rooms' => 'required',
            'room_left' => 'required',
            'longitude' => 'required',
            'latitude' => 'required',
            'pictures' => 'nullable',
            'banner_picture' => '',
            'picture_360' => '',
            'video' => '',
            'room_facilities' => '',
            'room_area' => '',
            'public_facilities' => '',
            'additional_information' => '',
            'additional_fees' => '',
            'total_views' => '',
            'kost_gender' => '',
        ];
    }
    /**
     * Custom message for validation
     *
     * @return array
     */
    public function messages()
    {
        return [
            'name.max' => 'name is too long',
            'description.required' => 'Description is required',
            'prices.required' => 'Price is required',
            'city.required' => 'City is required',
            'address.required' => 'Address is required',
            'total_rooms.required' => 'Total Rooms is required to be filled in',
            'room_left.required' => 'Room left is required',
            'longitude' => 'Longitude is required',
            'latitude' => 'Latitude is required',
        ];
    }


    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json($validator->errors(), 422));
    }

}
