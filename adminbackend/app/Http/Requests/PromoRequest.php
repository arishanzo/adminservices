<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PromoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
         'judulpromo' => 'required|string|max:255',
         'keteranganpromo' => 'required|string|max:255',
         'tglpromo' => 'required|date',
        'tglberakhirpromo' => 'required|date',
         'stokpromo' => 'required|string|max:255',
        'jumlahdiskon' => 'required|numeric|min:0',
        ];
    }


     public function messages(): array
    {
        return [
      'judulpromo.required' => 'Judul Promo wajib diisi.',
      'judulpromo.string' => 'Judul Promo harus berupa string.',
      'judulpromo.max' => 'Judul Promo tidak boleh melebihi 255 karakter.',
      'keteranganpromo.required' => 'Keterangan Promo wajib diisi.',
      'keteranganpromo.string' => 'Keterangan Promo harus berupa string.',
      'keteranganpromo.max' => 'Keterangan Promo tidak boleh melebihi 255 karakter.',
      'tglpromo.required' => 'Tanggal Promo wajib diisi.',
      'tglpromo.date' => 'Tanggal Promo harus berupa tanggal yang valid.',
      'tglberakhirpromo.required' => 'Tanggal Berakhir Promo wajib diisi.',
      'tglberakhirpromo.date' => 'Tanggal Berakhir Promo harus berupa tanggal yang valid.',
      'stokpromo.required' => 'Stok Promo wajib diisi.',
      'stokpromo.string' => 'Stok Promo harus berupa string.',
      'stokpromo.max' => 'Stok Promo tidak boleh melebihi 255 karakter.',
      'jumlahdiskon.required' => 'Jumlah Diskon wajib diisi.',
      'jumlahdiskon.numeric' => 'Jumlah Diskon harus berupa angka.',
      'jumlahdiskon.min' => 'Jumlah Diskon tidak boleh kurang dari 0.',
      'jumlahdiskon.max' => 'Jumlah Diskon tidak boleh melebihi 255 karakter.',
        ];
    }
}
