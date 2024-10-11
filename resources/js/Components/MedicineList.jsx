import Pagination from "./Pagination";

const MedicineList = ({ medicines }) => {
    return (
        <div className="container mx-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 text-gray-300">
                <thead>
                    <tr className="bg-gray-600">
                        <th className="py-2 px-4 text-start">Name</th>
                        <th className="py-2 px-4 text-start">Company</th>
                        <th className="py-2 px-4 text-start">Stock</th>
                        <th className="py-2 px-4 text-start">Price</th>
                        <th className="py-2 px-4 text-start">Action</th>
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
                            <td className="py-2 px-4">
                                <a
                                    href="#"
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Delete
                                </a>
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
