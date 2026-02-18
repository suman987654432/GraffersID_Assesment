import React, { useState, useEffect } from 'react';
import { FiX, FiMapPin } from 'react-icons/fi';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import ReviewForm from './ReviewForm';

const Details = ({ isOpen, onClose, company, refreshCompanies }) => {
    const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
    const [reviews, setReviews] = useState([]);

    const fetchReviews = async () => {
        if (!company) return;
        try {
            const response = await fetch(`https://graffersid-assesment-1.onrender.com/api/reviews/${company._id}`);
            const data = await response.json();
            if (response.ok) {
                setReviews(data);
            }
        } catch (error) {
            console.error("Failed to fetch reviews", error);
        }
    };

    useEffect(() => {
        if (isOpen && company) {
            fetchReviews();
        }
    }, [isOpen, company]);

    if (!isOpen || !company) return null;

    const gradientStyle = {
        background: 'linear-gradient(136.93deg, #D100F3 9.08%, #002BC5 108.36%)'
    }

    const totalReviews = reviews.length;
    const avgRating = totalReviews > 0
        ? reviews.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews
        : 0;

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
        <div className="fixed inset-0 z-40 flex items-center justify-center">
            <div className="bg-white rounded-xl w-full max-w-6xl h-[90vh] relative shadow-2xl mx-4 flex flex-col overflow-hidden">

                {/* Close Button */}
                <div className="absolute top-4 right-4 z-10">
                    <button
                        onClick={onClose}
                        className="bg-white rounded-full p-2 text-gray-600 hover:text-gray-800 transition-colors shadow-sm"
                    >
                        <FiX size={24} />
                    </button>
                </div>

           
                <div className="p-4 md:p-8 pb-0 flex-shrink-0">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-6 border-b border-gray-100 pb-6 md:pb-8">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 w-full md:w-auto">
                            {/* Logo */}
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center border border-gray-100 flex-shrink-0 shadow-sm">
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

                            <div className="space-y-2 text-center md:text-left w-full md:w-auto">
                                <h2 className="text-2xl font-bold text-gray-900">{company.name}</h2>
                                <div className="flex items-center justify-center md:justify-start text-gray-500 text-sm">
                                    <FiMapPin className="mr-1" />
                                    <span>{company.location}, {company.city}</span>
                                </div>
                                <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                                    <span className="font-bold text-gray-900">{avgRating.toFixed(1)}</span>
                                    <div className="flex text-sm">
                                        {renderStars(avgRating)}
                                    </div>
                                    <span className="text-gray-500 text-sm">{totalReviews} Reviews</span>
                                </div>
                                <p className="text-gray-600 text-sm mt-2 max-w-2xl">{company.description}</p>
                            </div>
                        </div>


                        <div className="flex flex-col items-center md:items-end gap-3 w-full md:w-auto mt-2 md:mt-0 md:mr-10">
                            <span className="text-gray-400 text-xs">
                                Founded on {new Date(company.foundedOn).toLocaleDateString('en-GB')}
                            </span>
                            <button
                                onClick={() => setIsReviewFormOpen(true)}
                                className="text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity w-full md:w-auto shadow-md active:scale-95 transform transition-transform"
                                style={gradientStyle}
                            >
                                + Add Review
                            </button>
                        </div>
                    </div>
                </div>

           
                <div className="p-4 md:p-8 pt-6 overflow-y-auto no-scrollbar flex-grow">

                    {/* Filter  */}
                    <div className="mb-6">
                        <p className="text-gray-500 text-sm">Result Found: {reviews.length}</p>
                    </div>

                    {/* Reviews List */}
                    <div className="space-y-6">
                        {reviews.length > 0 ? (
                            reviews.map((review) => (
                                <div key={review._id} className="flex flex-col sm:flex-row gap-4 items-start border-b border-gray-50 pb-6 last:border-0">
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-lg md:text-xl uppercase border border-gray-200">
                                        {review.fullName.charAt(0)}
                                    </div>
                                    <div className="space-y-2 w-full">
                                        <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-0">
                                            <div>
                                                <h4 className="font-semibold text-gray-900">{review.fullName}</h4>
                                                <span className="text-gray-400 text-xs">
                                                    {new Date(review.createdAt).toLocaleString('en-GB')}
                                                </span>
                                            </div>
                                            <div className="flex text-yellow-400 text-sm">
                                                {[...Array(5)].map((_, i) => (
                                                    i < review.rating ? <FaStar key={i} /> : <span key={i} className="text-gray-200"><FaStar /></span>
                                                ))}
                                            </div>
                                        </div>
                                        <p className="font-medium text-gray-800 text-sm">{review.subject}</p>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            {review.review}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-400 text-center">No reviews yet. Be the first to add one!</p>
                        )}
                    </div>

                </div>
            </div>

            {/* Nested Review Form Modal */}
            <ReviewForm
                isOpen={isReviewFormOpen}
                onClose={() => setIsReviewFormOpen(false)}
                companyId={company._id}
                onReviewAdded={() => {
                    fetchReviews();
                    if (refreshCompanies) refreshCompanies();
                }}
            />
        </div>
    )
}

export default Details