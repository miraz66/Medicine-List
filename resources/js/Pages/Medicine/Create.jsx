import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";

export default function Create({ success }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        company_name: "",
        stock: "",
        price: "",
        image: "",
    });

    console.log(success);

    const submit = (e) => {
        e.preventDefault();

        post(route("medicines.store"));
    };

    return (
        <div className="bg-gray-600 min-h-screen pt-40">
            <div className="max-w-3xl mx-auto p-10 shadow-xl shadow-gray-700">
                <h1 className="text-2xl font-bold mb-4 text-gray-100">
                    Create Medicine
                </h1>

                <form onSubmit={submit}>
                    <div className="mt-4">
                        <InputLabel htmlFor="name" value="Name" />
                        <TextInput
                            id="name"
                            name="name"
                            type="text"
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

                    <div className="mt-4">
                        <InputLabel
                            htmlFor="companyName"
                            value="Company Name"
                        />
                        <TextInput
                            id="companyName"
                            name="companyName"
                            type="text"
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

                    <div className="mt-4">
                        <InputLabel htmlFor="stock" value="Stock" />
                        <TextInput
                            id="stock"
                            name="stock"
                            type="number"
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

                    <div className="mt-4">
                        <InputLabel htmlFor="price" value="Price" />
                        <TextInput
                            id="price"
                            name="price"
                            type="number"
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

                    <div className="mt-4">
                        <InputLabel htmlFor="images" value="Images" />
                        <TextInput
                            id="images"
                            name="images"
                            type="file"
                            onChange={(e) =>
                                setData("image", e.target.files[0])
                            }
                            className="mt-1 block w-full cursor-pointer"
                            autoComplete="images"
                        />

                        {errors.image && (
                            <div className="text-sm text-red-600">
                                {errors.image}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
