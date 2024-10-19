import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import { Link } from "@inertiajs/react";
import React from "react";

export default function Welcome() {
    return (
        <div className="h-screen bg-cover bg-no-repeat bg-[url('https://images.unsplash.com/photo-1515350540008-a3f566782a3e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
            <div className="bg-black/20 w-full h-full flex justify-center items-center ">
                <div className="bg-black/40 p-20 rounded-md">
                    <h1 className="text-5xl font-bold text-white">
                        Sale Medicine !
                    </h1>
                    <p className="group text-gray-200 pt-10 space-x-1 flex items-center">
                        <Link href="/dashboard" className="text-xl">
                            Go to Dashboard
                        </Link>
                        <ArrowRightIcon className="w-6 h-6 inline-block group-hover:duration-300 group-hover:ease-in group-hover:transform group-hover:translate-x-1" />
                    </p>
                </div>
            </div>
        </div>
    );
}
