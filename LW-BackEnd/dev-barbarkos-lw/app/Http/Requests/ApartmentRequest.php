<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class ApartmentRequest extends FormRequest
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
            'room_left' => 'required',
            'longitude' => 'required',
            'latitude' => 'required',
            'pictures' => 'nullable',
            'banner_picture' => 'nullable',
            'picture_360' => 'nullable',
            'video' => 'nullable',
            'unit_type' => 'required',
            'unit_area' => 'required',
            'unit_facilities' => 'required',
            'unit_floor' => 'required|integer',
            'unit_public_facilities' => 'nullable',
            'parking_facilities' => 'nullable',
            'additional_information' => 'nullable',
            'additional_fees' => 'nullable',
            'total_views' => '',
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
            'name.required' => 'Apartment Name is required',
            'description.required' => 'Description is required',
            'prices.required' => 'Price is required',
            'city.required' => 'City is required',
            'address.required' => 'Address is required',
            'room_left.required' => 'Room left is required',
            'longitude' => 'Longitude is required',
            'latitude' => 'Latitude is required',
            'unit_type' => 'Please fill in the unit type',
            'unit_area' => 'Please fill in the unit area',
            'unit_facilities' => 'Please fill in the unit facilities',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json($validator->errors(), 422));
    }
}
