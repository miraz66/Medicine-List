<?php

namespace App\Http\Controllers;

use App\Filters\MedicineFilter;
use App\Http\Requests\StoreSalesRequest;
use App\Http\Resources\SalesResource;
use App\Models\Medicine;
use App\Models\Sales;

class SaleController extends Controller
{
    public function index()
    {
        $query = Sales::latest();

        $filteredQuery = MedicineFilter::apply($query, request());

        $sales = SalesResource::collection($filteredQuery->paginate(30));
        return inertia('Sales/Index', ['sales' => $sales]);
    }
    public function create()
    {
        $medicines = Medicine::all(); // Fetch all medicines

        return inertia('Sales/Create', ['medicines' => $medicines]);
    }

    public function store(StoreSalesRequest $request)
    {
        // Loop through each sale item
        foreach ($request->saleItems as $item) {
            $medicine = Medicine::findOrFail($item['medicine_id']);

            if ($medicine->stock >= $item['quantity']) {
                // Deduct stock and create sale record for each item
                // $medicine->stock -= $item['quantity'];
                // $medicine->save();
                $medicine->decrement('stock', $item['quantity']);

                $total_price = $item['quantity'] * $medicine->price;

                Sales::create([
                    'medicine_name' => $medicine->name,
                    'company_name' => $medicine->company_name,
                    'medicine_id' => $item['medicine_id'],
                    'quantity' => $item['quantity'],
                    'total_price' => $total_price,
                ]);
            } else {
                // If one item has insufficient stock, return an error
                return redirect("/sales/create")->with('error', 'One or more items have insufficient stock.');
            }
        }

        // Redirect after all sale items have been processed
        return redirect('/sales/create')->with('success', 'Sales recorded successfully');
    }

    public function destroy($id)
    {
        Sales::destroy($id);
        return redirect('/sales');
    }
}
