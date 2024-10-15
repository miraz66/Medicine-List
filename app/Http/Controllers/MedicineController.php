<?php

namespace App\Http\Controllers;

use App\Filters\MedicineFilter;
use App\Http\Requests\StoreMedicineRequest;
use App\Http\Resources\MedicineResource;
use App\Models\Medicine;
use Illuminate\Contracts\Cache\Store;
use Illuminate\Http\Request;

class MedicineController extends Controller
{
    public function index(Request $request)
    {
        // Create a base query for medicines
        $query = Medicine::latest();

        // Apply the filters using the MedicineFilter class
        $filteredQuery = MedicineFilter::apply($query, $request);

        // Paginate the filtered results
        $medicines = MedicineResource::collection($filteredQuery->paginate(30));

        // Pass the filters back to the frontend
        return inertia('Dashboard', [
            'medicines' => $medicines,
            'search' => $request->input('search'),
            'category' => $request->input('category'),
            'min_price' => $request->input('min_price'),
            'max_price' => $request->input('max_price'),
        ]);
    }


    public function create()
    {
        return inertia('Medicines/Create');
    }

    public function store(StoreMedicineRequest $request)
    {
        $imageName = $request->hasFile('image') ? $request->file('image')
            ->store('images', 'public') : null;

        // Create the medicine record
        Medicine::create([
            'name' => $request->name,
            'image' => $imageName, // Save the image path to the database
            'company_name' => $request->company_name,
            'stock' => $request->stock,
            'price' => $request->price
        ]);

        // Redirect to the dashboard with a success message
        return redirect()->route('medicines.create');
    }

    public function edit($id)
    {
        $medicine = Medicine::findOrFail($id);
        return inertia('Medicines/Edit', ['medicine' => $medicine]);
    }

    public function update(Request $request, $id)
    {
        $medicine = Medicine::findOrFail($id);
        $medicine->update($request->all());
        return redirect('/stock-out');
    }

    public function destroy($id)
    {
        Medicine::destroy($id);
        return redirect('/dashboard');
    }

    public function stockOut(Request $request)
    {
        // Fetch medicines where stock is less than 15
        $query = Medicine::where('stock', '<=', 15)->latest();

        // Apply the filters using the MedicineFilter class
        $filteredQuery = MedicineFilter::apply($query, $request);

        // Paginate the filtered results
        $medicines = MedicineResource::collection($filteredQuery->paginate(30));

        // Return to the Inertia 'StockOut' page with filtered medicines
        return inertia('Medicines/StockOut', ['medicines' => $medicines]);
    }
}
