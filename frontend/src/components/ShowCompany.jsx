import React, { useState, useEffect } from 'react';
import { FiMapPin } from 'react-icons/fi';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import Details from './Details';

const ShowCompany = ({ filterSettings }) => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCompany, setSelectedCompany] = useState(null);

    const fetchCompanies = async () => {
        setLoading(true);
        try {
            const query = new URLSearchParams(filterSettings).toString();
            const response = await fetch(`https://graffersid-assesment-1.onrender.com/api/companies?${query}`);
            const data = await response.json();
            if (response.ok) {
                setCompanies(data);
            } else {
                setError(data.message || 'Failed to fetch companies');
            }
        } catch (err) {
            setError('Error connecting to server');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCompanies();
    }, [filterSettings]);

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<FaStar key={i} className="text-yellow-400" />);
            } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
                stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
            } else {
                stars.push(<FaStar key={i} className="text-gray-300" />);
            }
        }
        return stars;
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
            <p className="text-gray-500 text-sm mb-4">Result Found: {companies.length}</p>

            {companies.map((company) => (
                <div key={company._id} className="bg-white rounded-xl shadow-sm p-4 md:p-6 flex flex-col md:flex-row items-center md:items-start gap-6 border border-gray-100 hover:shadow-md transition-shadow">
                    {/* Logo Section */}
                    <div className="w-full md:w-auto flex-shrink-0 flex justify-center md:justify-start">
                        <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center border border-gray-100 shadow-sm">
                            {company.logo ? (
                                <img
                                    src={`https://graffersid-assesment-1.onrender.com/${company.logo}`}
                                    alt={company.name}
                                    className="w-full h-full object-contain"
                                />
                            ) : (
                                <span className="text-gray-300 text-sm">No Logo</span>
                            )}
                        </div>
                    </div>

                    <div className="flex-grow w-full">
                        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4 text-center md:text-left">

                            <div className="space-y-2 w-full md:w-auto">
                                <h3 className="text-xl font-bold text-gray-900">{company.name}</h3>

                                <div className="flex items-center justify-center md:justify-start text-gray-500 text-sm">
                                    <FiMapPin className="mr-1 flex-shrink-0" />
                                    <span className="truncate max-w-[200px] md:max-w-none">{company.location}, {company.city}</span>
                                </div>

                                <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                                    <span className="font-bold text-gray-900">{company.averageRating ? company.averageRating.toFixed(1) : '0'}</span>
                                    <div className="flex text-sm">
                                        {renderStars(company.averageRating || 0)}
                                    </div>
                                    <span className="text-black-500 font-semibold text-sm whitespace-nowrap">{company.reviewCount || 0} Reviews</span>
                                </div>
                            </div>

                            <div className="flex flex-col items-center md:items-end gap-3 w-full md:w-auto mt-2 md:mt-0">
                                <span className="text-gray-400 text-xs text-center md:text-right w-full">
                                    Founded on {new Date(company.foundedOn).toLocaleDateString('en-GB')}
                                </span>
                                <button
                                    onClick={() => setSelectedCompany(company)}
                                    className="bg-[#2C2C2C] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-black transition-colors w-full md:w-auto shadow-sm active:scale-95 transform transition-transform"
                                >
                                    Detail Review
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            ))}

            <Details
                isOpen={!!selectedCompany}
                company={selectedCompany}
                onClose={() => setSelectedCompany(null)}
                refreshCompanies={fetchCompanies}
            />
        </div>
    );
};

export default ShowCompany;
