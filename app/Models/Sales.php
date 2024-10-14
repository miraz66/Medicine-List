<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sales extends Model
{
    use HasFactory;

    protected $fillable = ['medicine_id', 'quantity', 'total_price', 'medicine_name', 'company_name'];

    public function medicine()
    {
        return $this->belongsTo(Medicine::class);
    }
}
