<?php

namespace App\Http\Controllers;

use App\Models\Medicine;
use App\Models\Sales;
use Illuminate\Http\Request;

class SaleController extends Controller
{
    public function store(Request $request)
    {
        $medicine = Medicine::findOrFail($request->medicine_id);

        if ($medicine->stock >= $request->quantity) {
            // Deduct stock and create sale record
            $medicine->stock -= $request->quantity;
            $medicine->save();

            $total_price = $request->quantity * $medicine->price;
            $sale = Sales::create([
                'medicine_id' => $medicine->id,
                'quantity' => $request->quantity,
                'total_price' => $total_price,
            ]);

            redirect(route('dashboard', absolute: false));
        } else {
            return response()->json(['error' => 'Insufficient stock'], 400);
        }
    }
}
