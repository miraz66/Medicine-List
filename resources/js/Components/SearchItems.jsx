import React from "react";
import { useForm } from "@inertiajs/react";

export default function SearchItems({ search, route }) {
    // useForm to manage the form data, including search input
    const { get, data, setData } = useForm({
        search: search || "", // Initialize with the search term from the backend
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
        <form onSubmit={handleSearch} className="flex items-center space-x-2">
            <input
                className="px-4 py-2 w-full bg-white dark:text-gray-300 dark:bg-gray-800 border border-gray-300 dark:border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                type="text"
                placeholder="Search..."
                value={data.search} // Controlled input bound to useForm state
                onChange={(e) => setData("search", e.target.value)} // Update form data
                onKeyDown={handleKeyPress} // Handle Enter key press
            />
            <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md"
            >
                Search
            </button>
        </form>
    );
}
