<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSalesRequest;
use App\Http\Resources\SalesResource;
use App\Models\Medicine;
use App\Models\Sales;
use Illuminate\Contracts\Cache\Store;
use Illuminate\Http\Request;

class SaleController extends Controller
{
    public function index()
    {
        $sales = SalesResource::collection(Sales::latest()->paginate(15));
        return inertia('Sales/Index', ['sales' => $sales]);
    }
    public function create()
    {
        $medicines = Medicine::all(); // Fetch all medicines

        return inertia('Sales/Create', ['medicines' => $medicines]);
    }

    public function store(StoreSalesRequest $request)
    {
        $medicine = Medicine::findOrFail($request->medicine_id);

        if ($medicine->stock >= $request->quantity) {
            // Deduct stock and create sale record
            $medicine->stock -= $request->quantity;
            $medicine->save();

            $total_price = $request->quantity * $medicine->price;
            Sales::create([
                'medicine_id' => $medicine->id,
                'medicine_name' => $medicine->name,
                'quantity' => $request->quantity,
                'total_price' => $total_price,
            ]);

            redirect(route('dashboard', absolute: false));
        } else {
            return redirect()->back()->with('error', 'Not enough stock');
        }
    }
}
