<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SalesResource extends JsonResource
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
            'type' => 'sales',
            'id' => $this->id,
            'medicine_name' => $this->medicine_name,
            'company_name' => $this->company_name,
            'medicine_id' => $this->medicine_id,
            'quantity' => $this->quantity,
            'total_price' => $this->total_price,
            'created_at' => date('M,d-Y', strtotime($this->created_at)),
            'sales_at' => date('H:i a', strtotime($this->created_at))
        ];
    }
}
