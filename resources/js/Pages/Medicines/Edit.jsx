import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import InputLabel from "@/Components/InputLabel";
import SuccessMessage from "@/Components/SuccessMessage";
import TextInput from "@/Components/TextInput";

export default function Create({ medicine }) {
    const { data, setData, post, processing, errors, reset, wasSuccessful } =
        useForm({
            name: medicine.name || "",
            company_name: medicine.company_name || "",
            stock: medicine.stock || "",
            price: medicine.price || "",
            image: medicine.image || null,
        });

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

    const submit = (e) => {
        e.preventDefault();

        post(route("medicines.store"), {
            onSuccess: () => reset(), // Reset the form upon successful submission
        });
    };

    return (
        <div className="bg-gray-600 min-h-screen pt-40">
            <Head title="Create" />

            {showSuccessMessage && (
                <SuccessMessage message="Medicine created successfully!" />
            )}

            <div className="max-w-3xl mx-auto p-10 shadow-xl shadow-gray-700">
                <h1 className="text-2xl font-bold mb-4 text-gray-100">
                    Create Medicine
                </h1>

                <form onSubmit={submit}>
                    {/* Name Field */}
                    <div className="mt-4">
                        <InputLabel htmlFor="name" value="Name" />
                        <TextInput
                            id="name"
                            name="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="mt-1 block w-full"
                            autoComplete="name"
                        />
                        {errors.name && (
                            <div className="text-sm text-red-600">
                                {errors.name}
                            </div>
                        )}
                    </div>

                    {/* Company Name Field */}
                    <div className="mt-4">
                        <InputLabel
                            htmlFor="companyName"
                            value="Company Name"
                        />
                        <TextInput
                            id="companyName"
                            name="companyName"
                            type="text"
                            value={data.company_name}
                            onChange={(e) =>
                                setData("company_name", e.target.value)
                            }
                            className="mt-1 block w-full"
                            autoComplete="companyName"
                        />
                        {errors.company_name && (
                            <div className="text-sm text-red-600">
                                {errors.company_name}
                            </div>
                        )}
                    </div>

                    {/* Stock Field */}
                    <div className="mt-4">
                        <InputLabel htmlFor="stock" value="Stock" />
                        <TextInput
                            id="stock"
                            name="stock"
                            type="number"
                            value={data.stock}
                            onChange={(e) => setData("stock", e.target.value)}
                            className="mt-1 block w-full"
                            autoComplete="stock"
                        />
                        {errors.stock && (
                            <div className="text-sm text-red-600">
                                {errors.stock}
                            </div>
                        )}
                    </div>

                    {/* Price Field */}
                    <div className="mt-4">
                        <InputLabel htmlFor="price" value="Price" />
                        <TextInput
                            id="price"
                            name="price"
                            type="number"
                            value={data.price}
                            onChange={(e) => setData("price", e.target.value)}
                            className="mt-1 block w-full"
                            autoComplete="price"
                        />
                        {errors.price && (
                            <div className="text-sm text-red-600">
                                {errors.price}
                            </div>
                        )}
                    </div>

                    {/* Image Upload */}
                    <div className="mt-4">
                        <InputLabel htmlFor="image" value="Image" />
                        <TextInput
                            id="image"
                            name="image"
                            type="file"
                            onChange={(e) =>
                                setData("image", e.target.files[0])
                            }
                            className="mt-1 block w-full cursor-pointer"
                            autoComplete="image"
                        />
                        {errors.image && (
                            <div className="text-sm text-red-600">
                                {errors.image}
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center justify-between mt-4">
                        <Link
                            href={route("medicines.index")}
                            className="text-sm text-gray-100 hover:text-gray-900 mr-2"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            disabled={processing}
                        >
                            {processing ? "Processing..." : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
