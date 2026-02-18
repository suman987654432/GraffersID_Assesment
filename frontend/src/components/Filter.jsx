import React, { useState } from 'react'
import { FiMapPin, FiChevronDown } from 'react-icons/fi'

const Filter = ({ onAddCompanyClick, onFilterChange, filterSettings }) => {
    const [search, setSearch] = useState('');

    const gradientStyle = {
        background: 'linear-gradient(136.93deg, #D100F3 9.08%, #002BC5 108.36%)'
    }

    const handleSearch = () => {
        onFilterChange({ search });
    };

    const handleSortChange = (e) => {
        onFilterChange({ sort: e.target.value });
    };

    return (
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between px-4 md:px-8 lg:px-32 py-6 gap-6 md:gap-4 border-b border-gray-300">

    
            <div className="flex flex-col md:flex-row items-stretch md:items-end gap-4 w-full md:w-auto">
                <div className="flex flex-col gap-2 w-full md:w-auto">
                    <label className="text-sm text-gray-500 font-medium">Select City</label>
                    <div className="relative w-full">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                if (e.target.value === '') {
                                    onFilterChange({ search: '' });
                                }
                            }}
                            placeholder="Find companies in your city..."
                            className="w-full md:w-80 px-4 py-2.5 pr-10 border border-gray-300 rounded-md text-gray-700 outline-none focus:border-[#D100F3] placeholder-gray-800 transition-all focus:ring-1 focus:ring-purple-500"
                        />
                        <FiMapPin className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-600 text-lg" />
                    </div>
                </div>
                <button
                    onClick={handleSearch}
                    className="px-6 py-2.5 text-white font-medium rounded-md whitespace-nowrap transition-transform active:scale-95 w-full md:w-auto"
                    style={gradientStyle}
                >
                    Find Company
                </button>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-end gap-4 w-full md:w-auto">
                <button
                    onClick={onAddCompanyClick}
                    className="px-6 py-2.5 text-white font-medium rounded-md whitespace-nowrap transition-transform active:scale-95 w-full md:w-auto order-2 md:order-1"
                    style={gradientStyle}
                >
                    + Add Company
                </button>

                <div className="flex flex-col gap-2 w-full md:w-auto order-1 md:order-2">
                    <label className="text-sm text-gray-500 font-medium">Sort:</label>
                    <div className="relative w-full">
                        <select
                            value={filterSettings?.sort || 'createdAt'}
                            onChange={handleSortChange}
                            className="w-full md:w-48 px-4 py-2.5 pr-10 border border-gray-300 rounded-md text-gray-800 font-medium appearance-none bg-white outline-none focus:border-[#D100F3] cursor-pointer transition-all focus:ring-1 focus:ring-purple-500"
                        >
                            <option value="createdAt">Newest</option>
                            <option value="name">Name</option>
                            <option value="rating">Rating</option>
                            <option value="location">Location</option>
                        </select>
                        <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Filter