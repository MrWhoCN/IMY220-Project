import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function ProfileForm() {
    // Retrieve userId from cookies
    const userId = Cookies.get('userId');

    // State to track whether the form is in edit mode
    const [isEditable, setIsEditable] = useState(false);

    // State to hold form values
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    // State to track loading and error
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch user data on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            if (!userId) {
                setError('User ID not found in cookies.');
                setIsLoading(false);
                return;
            }
            try {
                const response = await axios.get(`/users/${userId}`);
                const userData = response.data;
                setFormData({
                    username: userData.username || '',
                    email: userData.email || '',
                    password: '', // Password should not be fetched
                });
                setIsLoading(false);
            } catch (error) {
                setError('Error fetching user profile.');
                setIsLoading(false);
            }
        };
        fetchUserData();
    }, [userId]);

    // Handle input change
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    // Toggle edit mode and handle save
    const toggleEdit = async () => {
        if (isEditable) {
            // Save changes
            try {
                const { username, email, password } = formData;
                await axios.put(
                    `/users/${userId}`,
                    {
                        username,
                        email,
                        ...(password && { password }), // Include password only if it's not empty
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                setIsEditable(false);
            } catch (error) {
                setError('Error updating user profile.');
            }
        } else {
            // Enter edit mode
            setIsEditable(true);
        }
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <form className="space-y-6 bg-white p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="formGroup">
                    <p className="text-gray-700 font-medium mb-2">Username</p>
                    <input
                        type="text"
                        id="username"
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditable ? 'bg-gray-200 cursor-not-allowed' : 'border-gray-300'}`}
                        value={formData.username}
                        onChange={handleInputChange}
                        disabled={!isEditable}
                    />
                </div>
                <div className="formGroup">
                    <p className="text-gray-700 font-medium mb-2">Email</p>
                    <input
                        type="email"
                        id="email"
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditable ? 'bg-gray-200 cursor-not-allowed' : 'border-gray-300'}`}
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={!isEditable}
                    />
                </div>
            </div>
            {isEditable && (
                <div className="formGroup">
                    <p className="text-gray-700 font-medium mb-2">Password</p>
                    <input
                        type="password"
                        id="password"
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditable ? 'bg-gray-200 cursor-not-allowed' : 'border-gray-300'}`}
                        value={formData.password}
                        onChange={handleInputChange}
                        disabled={!isEditable}
                    />
                </div>
            )}
            <button
                type="button"
                className="px-4 py-2 bg-orange-400 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors duration-200"
                onClick={toggleEdit}
            >
                {isEditable ? 'Save' : 'Edit'}
            </button>
        </form>
    );
}

    export default ProfileForm;
