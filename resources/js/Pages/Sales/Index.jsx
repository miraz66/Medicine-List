import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Index({ sales }) {
    const { delete: destroy } = useForm();

    // Delete a medicine
    const destroyMedicine = (id) => {
        destroy(`/sales/${id}`);
    };
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200/50 leading-tight">
                        Medicines Sales
                    </h2>
                    <Link href="/sales/create">
                        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md">
                            Sales
                        </button>
                    </Link>
                </div>
            }
        >
            <Head title="Sales" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="container mx-auto">
                            <table className="min-w-full bg-white dark:bg-gray-800 text-gray-300">
                                <thead>
                                    <tr className="bg-gray-600 uppercase">
                                        <th className="py-2 px-4 text-start">
                                            Id
                                        </th>
                                        <th className="py-2 px-4 text-start">
                                            Medicine Name
                                        </th>
                                        <th className="py-2 px-4 text-start">
                                            Medicine id
                                        </th>
                                        <th className="py-2 px-4 text-start">
                                            Company Name
                                        </th>
                                        <th className="py-2 px-4 text-start">
                                            Quantity
                                        </th>
                                        <th className="py-2 px-4 text-start">
                                            Total Price
                                        </th>
                                        <th className="py-2 px-4">Sale Date</th>
                                        <th className="py-2 px-4">
                                            Sale Times
                                        </th>
                                        <th className="py-2 px-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                                    {sales.data.map((sale) => (
                                        <tr key={sale.id}>
                                            <td className="py-2 px-4">
                                                {sale.id}
                                            </td>
                                            <td className="py-2 px-4">
                                                {sale.medicine_name}
                                            </td>
                                            <td className="py-2 px-4 text-center">
                                                {sale.medicine_id}
                                            </td>

                                            <td className="py-2 px-4">
                                                {sale.company_name}
                                            </td>
                                            <td className="py-2 px-4">
                                                {sale.quantity}p
                                            </td>
                                            <td className="py-2 px-4">
                                                ${sale.total_price}
                                            </td>
                                            <td className="py-2 px-4">
                                                {sale.created_at}
                                            </td>
                                            <td className="py-2 px-4">
                                                {sale.sales_at}
                                            </td>

                                            {/* Delete button */}
                                            <td className="py-2 px-4 float-end">
                                                <button
                                                    className="px-4 py-2 text-red-500 rounded-md"
                                                    onClick={() =>
                                                        destroyMedicine(sale.id)
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Pagination */}
                            <Pagination data={sales} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
