import { useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SuccessMessage from "@/Components/SuccessMessage";

export default function SaleForm({ medicines }) {
    const { data, setData, post, processing, errors, reset, wasSuccessful } =
        useForm({
            medicine_id: "",
            quantity: "",
        });

    const [selectedMedicine, setSelectedMedicine] = useState(null);

    const handleMedicineChange = (e) => {
        const selectedId = e.target.value;
        setData("medicine_id", selectedId);
        const medicine = medicines.find((med) => med.id == selectedId);
        setSelectedMedicine(medicine);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("sales.store"), {
            onSuccess: () => reset(),
        });
    };

    useEffect(() => {
        if (wasSuccessful) {
            setTimeout(() => reset(), 5000); // Optional: Reset the form after 5 seconds
        }
    }, [wasSuccessful]);

    return (
        <div className="bg-gray-600 min-h-screen pt-20">
            {wasSuccessful && (
                <SuccessMessage message="Sale recorded successfully!" />
            )}

            <div className="max-w-3xl mx-auto p-10 shadow-xl shadow-gray-700">
                <h1 className="text-2xl font-bold mb-4 text-gray-100">
                    Create Sale
                </h1>

                <form onSubmit={submit}>
                    {/* Medicine Select */}
                    <div className="mt-4">
                        <InputLabel
                            htmlFor="medicine"
                            value="Select Medicine"
                        />
                        <select
                            id="medicine"
                            name="medicine_id"
                            value={data.medicine_id}
                            onChange={handleMedicineChange}
                            className="mt-1 block w-full text-gray-300 bg-gray-100 dark:bg-gray-600 p-2"
                        >
                            <option value="">-- Select Medicine --</option>
                            {medicines.map((medicine) => (
                                <option key={medicine.id} value={medicine.id}>
                                    {medicine.name} (Stock: {medicine.stock})
                                </option>
                            ))}
                        </select>
                        {errors.medicine_id && (
                            <div className="text-sm text-red-600">
                                {errors.medicine_id}
                            </div>
                        )}
                    </div>

                    {/* Quantity Field */}
                    <div className="mt-4">
                        <InputLabel htmlFor="quantity" value="Quantity" />
                        <TextInput
                            id="quantity"
                            name="quantity"
                            type="number"
                            value={data.quantity}
                            onChange={(e) =>
                                setData("quantity", e.target.value)
                            }
                            className="mt-1 block w-full bg-gray-100 dark:bg-gray-700 p-2"
                        />
                        {errors.quantity && (
                            <div className="text-sm text-red-600">
                                {errors.quantity}
                            </div>
                        )}
                    </div>

                    {/* Total Price */}
                    {selectedMedicine && data.quantity && (
                        <div className="mt-4">
                            <InputLabel value="Total Price" />
                            <p className="text-gray-100">
                                {data.quantity * selectedMedicine.price} $
                            </p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="flex items-center justify-end mt-4">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            disabled={processing}
                        >
                            {processing ? "Processing..." : "Record Sale"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
