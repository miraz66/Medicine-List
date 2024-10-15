import { useForm } from "@inertiajs/react";
import Pagination from "./Pagination";

const MedicineList = ({ medicines }) => {
    const { delete: destroy } = useForm();

    // Delete a medicine
    const destroyMedicine = (id) => {
        destroy(`/medicines/${id}`);
    };

    return (
        <div className="container mx-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 text-gray-300">
                <thead>
                    <tr className="bg-gray-600">
                        <th className="py-2 px-4 text-start">Name</th>
                        <th className="py-2 px-4 text-start">Company</th>
                        <th className="py-2 px-4 text-start">Stock</th>
                        <th className="py-2 px-4 text-start">Price</th>
                        <th className="py-2 px-4">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                    {medicines.data.map((medicine) => (
                        <tr key={medicine.id}>
                            <td className="py-2 px-4">{medicine.name}</td>
                            <td className="py-2 px-4">
                                {medicine.company_name}
                            </td>
                            <td className="py-2 px-4">{medicine.stock}</td>
                            <td className="py-2 px-4">${medicine.price}</td>
                            <td className="py-2 px-4 space-x-6 float-end">
                                <Link
                                    href={`/medicines/${medicine.id}/edit`}
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => destroyMedicine(medicine.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <Pagination data={medicines} />
        </div>
    );
};

export default MedicineList;
