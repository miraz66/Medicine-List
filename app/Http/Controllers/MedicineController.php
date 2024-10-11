<?php

namespace App\Http\Controllers;

use App\Http\Resources\MedicineResource;
use App\Models\Medicine;
use Illuminate\Http\Request;

class MedicineController extends Controller
{
    public function index()
    {
        $medicines = MedicineResource::collection(Medicine::paginate(15));

        return inertia('Dashboard', ['medicines' => $medicines]);
    }

    public function store(Request $request)
    {
        $medicine = Medicine::create($request->all());
        return response()->json($medicine, 201); // Save new medicine
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
