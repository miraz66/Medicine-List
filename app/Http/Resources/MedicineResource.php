<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MedicineResource extends JsonResource
{
    public static $wrap = false;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'type' => 'medicine',
            'id' => $this->id,
            'name' => $this->name,
            'image' => $this->image,
            'company_name' => $this->company_name,
            'stock' => $this->stock,
            'price' => $this->price
        ];
    }
}
