import MedicineList from "@/Components/MedicineList";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PrinterIcon } from "@heroicons/react/20/solid";

export default function StockOut({ medicines }) {
    const handlePrint = () => {
        const content = document.getElementById("divcontents").innerHTML;
        const pri = document.getElementById("ifmcontentstoprint").contentWindow;

        pri.document.open();
        pri.document.write(`
            <html>
                <head>
                    <title>Print</title>
                    <style>
                        /* Add your print styles here */
                        @media print {
                            body {
                                font-family: Arial, sans-serif;
                                color: black;

                            }
                            .no-print {
                                display: none; /* Hide elements with this class when printing */
                            }
                        }
                    </style>
                </head>
                <body>
                    ${content}
                </body>
            </html>
        `);
        pri.document.close();
        pri.focus();
        pri.print();
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
                            onClick={handlePrint}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md no-print"
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
                            <div id="divcontents">
                                <MedicineList medicines={medicines} />
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
            {/* Hidden iframe for printing */}
            <iframe
                id="ifmcontentstoprint"
                style={{ display: "none" }}
            ></iframe>
        </div>
    );
}
