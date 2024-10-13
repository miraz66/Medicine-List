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
        $medicines = MedicineResource::collection(Medicine::paginate(15));

        return inertia('Dashboard', ['medicines' => $medicines]);
    }

    public function create()
    {
        return inertia('Medicine/Create');
    }

    public function store(Request $request)
    {

        // Validate the request
        $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpg,png,jpeg,gif|max:2048', // 2MB Max
            'company_name' => 'required|string|max:255',
            'stock' => 'required|integer',
            'price' => 'required|numeric',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            // Store the image in the 'public/images' directory
            $imageName = $request->file('image')->store('images', 'public');
        }

        // Create the medicine record
        Medicine::create([
            'name' => $request->name,
            'image' => $imageName, // Save the image path to the database
            'company_name' => $request->company_name,
            'stock' => $request->stock,
            'price' => $request->price
        ]);

        // Redirect to the dashboard with a success message
        return redirect()->route('medicines.create')->with('success', 'Medicine created successfully!');
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
        return response()->json(null, 204); // Delete a medicine
    }
}
