import React, { useState } from 'react'
import { FiX, FiMapPin, FiCalendar } from 'react-icons/fi'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const AddForm = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        city: '',
        description: ''
    });
    const [foundedDate, setFoundedDate] = useState(null);
    const [logo, setLogo] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

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

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setLogo(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        const { name, location, city, description } = formData;

        if (!name || !location || !foundedDate || !city || !description || !logo) {
            setError('All fields are required');
            setLoading(false);
            return;
        }

        const data = new FormData(e.target);

        try {
            const response = await fetch('https://graffersid-assesment-1.onrender.com/api/companies/add', {
                method: 'POST',
                body: data,
            });

            const result = await response.json();

            if (response.ok) {
                setSuccess(true);
                setTimeout(() => {
                    onClose();
                    // Reset form
                    setFormData({
                        name: '',
                        location: '',
                        city: '',
                        description: ''
                    });
                    setFoundedDate(null);
                    setLogo(null);
                    setSuccess(false);
                }, 1000);
            } else {
                setError(result.message || 'Something went wrong');
            }
        } catch (err) {
            setError('Failed to connect to server');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
            <div className="bg-white rounded-3xl w-full max-w-md relative shadow-2xl mx-4">

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
                    className="absolute top-6 right-6 text-gray-600 hover:text-gray-800 transition-colors z-20"
                >
                    <FiX size={24} />
                </button>

                <div className="p-6 pt-16 relative z-10">
                    <h2 className="text-2xl font-bold text-center mb-6 text-black">Add Company</h2>

                    {error && <p className="text-red-500 text-center text-sm mb-4">{error}</p>}
                    {success && <p className="text-green-500 text-center text-sm mb-4">Company added successfully!</p>}

                    <form className="space-y-2" onSubmit={handleSubmit}>
                        {/* Company Name */}
                        <div className="space-y-1">
                            <label className="text-gray-500 font-medium text-sm block">Company name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 outline-none focus:border-[#D100F3] placeholder-gray-400"
                            />
                        </div>

                        {/* Location */}
                        <div className="space-y-1">
                            <label className="text-gray-500 font-medium text-sm block">Location</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="Select Location"
                                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg text-gray-700 outline-none focus:border-[#D100F3] placeholder-gray-400"
                                />
                                <FiMapPin className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                            </div>
                        </div>

                        {/* Founded On */}
                        <div className="space-y-1">
                            <label className="text-gray-500 font-medium text-sm block">Founded on</label>
                            <div className="relative">
                                <input
                                    type="hidden"
                                    name="foundedOn"
                                    value={foundedDate ? foundedDate.toISOString() : ''}
                                />
                                <input
                                    type="text"
                                    value={foundedDate ? foundedDate.toLocaleDateString('en-GB') : ''}
                                    readOnly
                                    onClick={() => setShowCalendar(!showCalendar)}
                                    placeholder="DD/MM/YYYY"
                                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg text-gray-700 outline-none focus:border-[#D100F3] placeholder-gray-400 cursor-pointer"
                                />
                                <FiCalendar
                                    onClick={() => setShowCalendar(!showCalendar)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg cursor-pointer"
                                />
                                {showCalendar && (
                                    <div className="absolute top-full left-0 mt-1 z-50 bg-white shadow-xl rounded-lg overflow-hidden border border-gray-100 transform scale-75 origin-top-left">
                                        <Calendar
                                            onChange={(date) => { setFoundedDate(date); setShowCalendar(false); }}
                                            value={foundedDate}
                                            className="border-none shadow-none"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* City */}
                        <div className="space-y-1">
                            <label className="text-gray-500 font-medium text-sm block">City</label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="Enter City"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 outline-none focus:border-[#D100F3] placeholder-gray-400"
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-1">
                            <label className="text-gray-500 font-medium text-sm block">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Enter Description"
                                rows="3"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 outline-none focus:border-[#D100F3] placeholder-gray-400 resize-none font-sans"
                            ></textarea>
                        </div>

                        {/* Logo Upload */}
                        <div className="space-y-1">
                            <label className="text-gray-500 font-medium text-sm block">Logo</label>
                            <div className="relative">
                                <input
                                    type="file"
                                    name="logo"
                                    onChange={handleFileChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 outline-none focus:border-[#D100F3] file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                                />
                            </div>
                        </div>

                        {/* Save Button */}
                        <div className="pt-4 flex justify-center">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`px-12 py-2.5 text-white font-semibold rounded-lg shadow-md transition-opacity ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
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

export default AddForm