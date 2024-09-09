import React from 'react';
import Sidebar from '../../components/SidebarComponent/Sidebar';
import ProfileInfo from '../../components/ProfilePageComponent/ProfileInfo';
import ProfileForm from '../../components/ProfilePageComponent/ProfileForm';
import  './css/ProfilePage.css';

function ProfilePage() {
    return (
        <main className= "profilePage">

                <Sidebar />
                <section className="mainContent">
                    <ProfileInfo />
                    <ProfileForm />
                </section>

            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/7819f84c8f69d4f9c2632c3a2968ac04b759bcf4eaac11b8c2cf84ae32f97bea?placeholderIfAbsent=true&apiKey=109e5ef2921f4f19976eeca47438f346" alt="" className= "decorativeImage" />
        </main>
    );
}

export default ProfilePage;