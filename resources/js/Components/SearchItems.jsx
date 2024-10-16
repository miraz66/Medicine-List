import React from "react";
import { useForm } from "@inertiajs/react";

export default function SearchItems({ route, searchTerm }) {
    // useForm to manage the form data, including search input
    const { get, data, setData } = useForm({
        search: "", // Initialize with the search term from the backend
        category: "",
    });

    const handleSearch = (e) => {
        e.preventDefault();
        // Submit the search term to the server using Inertia's get method
        get(route, { search: data.search });
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent the default form submission behavior
            handleSearch(e); // Trigger the search function
        }
    };

    return (
        <form
            onSubmit={handleSearch}
            className="flex items-center w-3/4 sm:w-1/3"
        >
            {searchTerm === "search" && (
                <input
                    className="px-4 py-2 w-full bg-white dark:text-gray-300 dark:bg-gray-800 border border-gray-300 dark:border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    type="text"
                    placeholder="Search..."
                    value={data.search} // Controlled input bound to useForm state
                    onChange={(e) => setData("search", e.target.value)} // Update form data
                    onKeyDown={handleKeyPress} // Handle Enter key press
                />
            )}
            {searchTerm === "category" && (
                <input
                    className="px-4 py-2 w-full bg-white dark:text-gray-300 dark:bg-gray-800 border border-gray-300 dark:border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    type="text"
                    placeholder="Search..."
                    value={data.category} // Controlled input bound to useForm state
                    onChange={(e) => setData("category", e.target.value)} // Update form data
                    onKeyDown={handleKeyPress} // Handle Enter key press
                />
            )}
        </form>
    );
}
