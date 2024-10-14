import MedicineList from "@/Components/MedicineList";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useRef } from "react";
import html2pdf from "html2pdf.js";
import { PrinterIcon } from "@heroicons/react/20/solid";

export default function StockOut({ medicines }) {
    const medicineListRef = useRef();

    const handleDownloadPDF = () => {
        const element = medicineListRef.current;
        html2pdf().from(element).save("medicine-list.pdf");
    };

    return (
        <div>
            <AuthenticatedLayout
                header={
                    <div className="flex items-center justify-between">
                        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200/50 leading-tight">
                            Dashboard
                        </h2>
                        <button
                            onClick={handleDownloadPDF}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md"
                        >
                            <PrinterIcon className="w-5 h-5" />
                        </button>
                    </div>
                }
            >
                <Head title="Stock-Out" />

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div ref={medicineListRef}>
                                <MedicineList medicines={medicines} />
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </div>
    );
}
