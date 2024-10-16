import { Head, Link, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SuccessMessage from "@/Components/SuccessMessage";

export default function SaleForm({ medicines }) {
    const { data, setData, post, processing, errors, reset, wasSuccessful } =
        useForm({
            saleItems: [], // Array to hold multiple sale items
        });

    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const [quantity, setQuantity] = useState("");
    const [saleItems, setSaleItems] = useState([]);

    // Update the selected medicine when the user selects one
    const handleMedicineChange = (e) => {
        const selectedId = e.target.value;
        const medicine = medicines.find((med) => med.id == selectedId);
        setSelectedMedicine(medicine);
    };

    // Add the selected medicine and quantity to the to-do list
    const addMedicineToList = () => {
        if (!selectedMedicine || !quantity) return;

        const totalPrice = selectedMedicine.price * quantity;

        const newItem = {
            medicine_id: selectedMedicine.id,
            name: selectedMedicine.name,
            quantity,
            total_price: totalPrice,
        };

        setSaleItems((prevItems) => [...prevItems, newItem]);
        setQuantity(""); // Reset quantity after adding
        setSelectedMedicine(null); // Reset selected medicine
    };

    // Remove an item from the sale list
    const removeItem = (index) => {
        setSaleItems((prevItems) => prevItems.filter((_, i) => i !== index));
    };

    // Update form data when sale items change
    useEffect(() => {
        setData("saleItems", saleItems); // Update form data with the sale items list
    }, [saleItems]);

    const submit = (e) => {
        e.preventDefault();
        post(route("sales.store"), {
            onSuccess: () => reset(),
        });
        setSaleItems([]);
    };

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    useEffect(() => {
        if (wasSuccessful) {
            setShowSuccessMessage(true);
            const timeout = setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [wasSuccessful]);

    // console.log(data);

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
                            value={selectedMedicine?.id || ""}
                            onChange={handleMedicineChange}
                            className="mt-1 block w-full text-gray-300 bg-gray-100 dark:bg-gray-600 p-2"
                        >
                            <option value="">-- Select Medicine --</option>
                            {medicines.map((medicine) => (
                                <option key={medicine.id} value={medicine.id}>
                                    {medicine.name} (Stock: {medicine.stock})
                                    (Price: {medicine.price})
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* Quantity Field */}
                    <div className="mt-4">
                        <InputLabel htmlFor="quantity" value="Quantity" />
                        <TextInput
                            id="quantity"
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="mt-1 block w-full bg-gray-100 dark:bg-gray-700 p-2"
                        />
                    </div>
                    {/* total price: */}
                    {selectedMedicine && (
                        <div className="mt-4">
                            <span className="text-gray-300">
                                Total: ${selectedMedicine?.price * quantity}
                            </span>
                        </div>
                    )}
                    {/* Add to Sale List Button */}
                    <div className="mt-4">
                        <button
                            type="button"
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            onClick={addMedicineToList}
                        >
                            Add to Sale List
                        </button>
                    </div>
                    {/* Display Sale Items (To-Do List) */}
                    <div className="mt-4">
                        {saleItems.length > 0 && (
                            <div>
                                <h2 className="text-lg text-gray-100">
                                    Sale Items:
                                </h2>
                                <ul>
                                    {saleItems.map((item, index) => (
                                        <li
                                            key={index}
                                            className="flex justify-between items-center mt-2"
                                        >
                                            <span className="text-gray-300">
                                                {item.name} - {item.quantity}{" "}
                                                units - $ {item.total_price}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeItem(index)
                                                }
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                Remove
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
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
