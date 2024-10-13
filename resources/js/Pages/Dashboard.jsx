import MedicineList from "@/Components/MedicineList";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Dashboard({ medicines }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200/50 leading-tight">
                        Dashboard
                    </h2>
                    <Link href="/medicines/create">
                        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md">
                            Add new
                        </button>
                    </Link>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <MedicineList medicines={medicines} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
