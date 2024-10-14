import { Head, Link, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SuccessMessage from "@/Components/SuccessMessage";

export default function SaleForm({ medicines }) {
    const { data, setData, post, processing, errors, reset, wasSuccessful } =
        useForm({
            medicine_id: "",
            quantity: "",
            total_price: "",
        });

    const [selectedMedicine, setSelectedMedicine] = useState(null);

    // Update the selected medicine when the user selects one
    const handleMedicineChange = (e) => {
        const selectedId = e.target.value;
        setData("medicine_id", selectedId);
        const medicine = medicines.find((med) => med.id == selectedId);
        setSelectedMedicine(medicine);
    };

    // Update total price whenever the medicine or quantity changes
    useEffect(() => {
        if (selectedMedicine && data.quantity) {
            const total = data.quantity * selectedMedicine.price;
            setData("total_price", total); // Set total price in form data
        }
    }, [selectedMedicine, data.quantity]); // Recalculate total price when either changes

    const submit = (e) => {
        e.preventDefault();

        post(route("sales.store"), {
            onSuccess: () => reset(),
        });
    };

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    useEffect(() => {
        if (wasSuccessful) {
            setShowSuccessMessage(true);

            // Hide success message after 5 seconds
            const timeout = setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000);

            // Cleanup the timeout when the component unmounts or when wasSuccessful changes
            return () => clearTimeout(timeout);
        }
    }, [wasSuccessful]);

    return (
        <div className="bg-gray-600 min-h-screen pt-40">
            <Head title="Create Sale" />

            {/* Success Message */}
            {showSuccessMessage && (
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
                                $ {data.total_price}
                            </p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="flex items-center justify-between mt-4">
                        <Link
                            href="/sales"
                            className="text-sm text-gray-200 hover:text-gray-300"
                        >
                            Cancel
                        </Link>
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
