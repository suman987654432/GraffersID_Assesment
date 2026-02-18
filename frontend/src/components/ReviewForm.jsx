import React, { useState } from 'react'
import { FiX } from 'react-icons/fi'
import { FaStar } from 'react-icons/fa'

const ReviewForm = ({ isOpen, onClose, companyId, onReviewAdded }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    subject: '',
    review: ''
  });
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const gradientStyle = {
    background: 'linear-gradient(136.93deg, #D100F3 9.08%, #002BC5 108.36%)'
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getRatingText = (r) => {
    switch (r) {
      case 1: return "Unsatisfied";
      case 2: return "Somewhat Dissatisfied";
      case 3: return "Neutral";
      case 4: return "Satisfied";
      case 5: return "Very Satisfied";
      default: return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (rating === 0) {
      setError("Please provide a rating");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://graffersid-assesment-1.onrender.com/api/reviews/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          companyId,
          fullName: formData.fullName,
          subject: formData.subject,
          review: formData.review,
          rating
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Reset form
        setFormData({ fullName: '', subject: '', review: '' });
        setRating(0);
        if (onReviewAdded) onReviewAdded();
        onClose();
      } else {
        setError(data.message || 'Failed to add review');
      }
    } catch (err) {
      console.error(err);
      setError('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-3xl w-full max-w-md relative shadow-2xl mx-4 my-8 md:my-0 flex flex-col max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible no-scrollbar">

        <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none z-0">
          <div
            className="absolute rounded-full bg-purple-500 opacity-25"
            style={{ width: '116px', height: '116px', top: '-40px', left: '28px' }}
          ></div>
          <div
            className="absolute rounded-full opacity-100"
            style={{ ...gradientStyle, width: '116px', height: '116px', top: '-9px', left: '-34px' }}
          ></div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-600 hover:text-gray-800 transition-colors z-20 bg-white rounded-full p-1 shadow-sm md:shadow-none"
        >
          <FiX size={24} />
        </button>

        <div className="p-6 pt-16 relative z-10 flex flex-col h-full">
          <h2 className="text-2xl font-bold text-center mb-6 text-black">Add Review</h2>

          {error && <p className="text-red-500 text-center text-sm mb-4">{error}</p>}

          <form className="space-y-4 flex-grow flex flex-col justify-between" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-gray-500 font-medium text-sm block">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 outline-none focus:border-[#D100F3] placeholder-gray-400 transition-all focus:ring-1 focus:ring-purple-500"
                />
              </div>

              {/* Subject */}
              <div className="space-y-1">
                <label className="text-gray-500 font-medium text-sm block">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Enter"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 outline-none focus:border-[#D100F3] placeholder-gray-400 transition-all focus:ring-1 focus:ring-purple-500"
                />
              </div>

              {/* Enter your Review */}
              <div className="space-y-1">
                <label className="text-gray-500 font-medium text-sm block">Enter your Review</label>
                <textarea
                  name="review"
                  value={formData.review}
                  onChange={handleChange}
                  placeholder="Description"
                  rows="4"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 outline-none focus:border-[#D100F3] placeholder-gray-400 resize-none font-sans transition-all focus:ring-1 focus:ring-purple-500"
                ></textarea>
              </div>

              {/* Rating */}
              <div className="space-y-1">
                <label className="text-black font-bold text-lg block mb-2">Rating</label>
                <div className="flex flex-wrap items-center justify-between gap-y-2">
                  <div className="flex items-center gap-1 sm:gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="focus:outline-none transition-transform hover:scale-110 p-1"
                      >
                        <FaStar
                          size={28}
                          className={`transition-colors ${star <= (hoverRating || rating)
                            ? 'text-yellow-400'
                            : 'text-gray-200'
                            }`}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-gray-500 text-sm font-medium w-full sm:w-auto text-right sm:text-left">
                    {getRatingText(hoverRating || rating)}
                  </span>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-6 flex justify-center pb-2">
              <button
                type="submit"
                disabled={loading}
                className={`w-full sm:w-auto px-12 py-3 text-white font-semibold rounded-lg shadow-md transition-all active:scale-95 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90 hover:shadow-lg'}`}
                style={!loading ? gradientStyle : { background: '#ccc' }}
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ReviewForm