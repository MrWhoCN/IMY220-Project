import React, { useState } from 'react';
import './ProfileForm.css';

function ProfileForm() {
    // State to track whether the form is in edit mode
    const [isEditable, setIsEditable] = useState(false);

    // State to hold form values
    const [formData, setFormData] = useState({
        fullName: "John Doe",
        nickName: "Mr.Who",
        gender: "Male",
        country: "South Africa",
    });

    // Handle input change
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    // Toggle edit mode
    const toggleEdit = () => {
        setIsEditable(!isEditable);
    };

    return (
        <form className="profileForm">
            <div className="formRow">
                <div className="formGroup">
                    <p>Full Name</p>
                    <input
                        type="text"
                        id="fullName"
                        className={`input ${!isEditable ? 'disabledInput' : ''}`}
                        value={formData.fullName}
                        onChange={handleInputChange}
                        disabled={!isEditable}
                    />
                </div>
                <div className="formGroup">
                    <p>Nick Name</p>
                    <input
                        type="text"
                        id="nickName"
                        className={`input ${!isEditable ? 'disabledInput' : ''}`}
                        value={formData.nickName}
                        onChange={handleInputChange}
                        disabled={!isEditable}
                    />
                </div>
            </div>
            <div className="formRow">
                <div className="formGroup">
                    <p>Gender</p>
                    <input
                        type="text"
                        id="gender"
                        className={`input ${!isEditable ? 'disabledInput' : ''}`}
                        value={formData.gender}
                        onChange={handleInputChange}
                        disabled={!isEditable}
                    />
                </div>
                <div className="formGroup">
                    <p>Country</p>
                    <input
                        type="text"
                        id="country"
                        className={`input ${!isEditable ? 'disabledInput' : ''}`}
                        value={formData.country}
                        onChange={handleInputChange}
                        disabled={!isEditable}
                    />
                </div>
            </div>
            <button type="button" className="editButton" onClick={toggleEdit}>
                {isEditable ? "Save" : "Edit"}
            </button>
        </form>
    );
}

export default ProfileForm;