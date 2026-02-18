import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Filter from '../components/Filter'
import AddForm from '../components/AddForm'
import ShowCompany from '../components/ShowCompany'
const Dashboard = () => {
    const [isAddFormOpen, setIsAddFormOpen] = useState(false);
    const [filterSettings, setFilterSettings] = useState({ search: '', sort: 'createdAt' });

    const handleFilterChange = (newSettings) => {
        setFilterSettings(prev => ({ ...prev, ...newSettings }));
    };

    return (
        <div className="flex flex-col h-screen">
            <div className="flex-shrink-0 bg-white z-10 relative">
                <Navbar />
                <Filter
                    onAddCompanyClick={() => setIsAddFormOpen(true)}
                    onFilterChange={handleFilterChange}
                    filterSettings={filterSettings}
                />
            </div>

            <div className="flex-grow overflow-y-auto bg-gray-50">
                <ShowCompany filterSettings={filterSettings} />
            </div>

            <AddForm isOpen={isAddFormOpen} onClose={() => setIsAddFormOpen(false)} />
        </div>
    )
}

export default Dashboard