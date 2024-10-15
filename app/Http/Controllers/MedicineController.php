<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMedicineRequest;
use App\Http\Resources\MedicineResource;
use App\Models\Medicine;
use Illuminate\Contracts\Cache\Store;
use Illuminate\Http\Request;

class MedicineController extends Controller
{
    public function index()
    {
        //lest to first for data
        $medicines = MedicineResource::collection(Medicine::latest()->paginate(15));

        return inertia('Dashboard', ['medicines' => $medicines]);
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

    public function update(Request $request, $id)
    {
        $medicine = Medicine::findOrFail($id);
        $medicine->update($request->all());
        return response()->json($medicine);
    }

    public function destroy($id)
    {
        Medicine::destroy($id);
        return redirect('/dashboard');
    }

    public function stockOut()
    {
        // Fetch medicines where stock is less than 15
        $medicines = Medicine::where('stock', '<=', 15)->latest()->paginate(30);

        // Optionally, wrap the medicines in a resource collection
        $medicines = MedicineResource::collection($medicines);

        // Return to the Inertia 'StockOut' page with filtered medicines
        return inertia('Medicines/StockOut', ['medicines' => $medicines]);
    }
}
