import React, { useContext, useState } from 'react';
import { AppContext } from './Context/AppContext';
import './Styles/Navbar.css';

export default function Navbar() {
    const { username, mode, toggleMode, authenticated, setAuthenticated } = useContext(AppContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    
    const toggleDropdown = (e) => {
        setDropdownOpen(!dropdownOpen);
    };

    const updateProfile = (e) => {
        setDropdownOpen(false);
    };
    const deleteUser = async ()=>{
        alert("Are you sure you want to delete your account?");
        try {
            await fetch('http://localhost:56000/api/user/deleteUser', {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ username }),
            });
          } catch (error) {
            console.error("Error deleting user:", error);
          }
          setDropdownOpen(false);
          setAuthenticated(false);
    }
    const handleLogout = () => {
        setAuthenticated(false);
        setDropdownOpen(false);
    };

    const profile = username.charAt(0).toUpperCase();


    return (
        <div style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
            <nav className={`navbar navbar-${mode}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
                <div className={`title-${mode}`} style={{ fontSize: '30px', fontWeight: 'bold' }}>
                    BlueChat
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label onClick={toggleMode} htmlFor="Toggle_Theme" className={`toggle-mode-${mode}`} style={{ marginRight: '20px', cursor: 'pointer' }}>
                        {mode === 'light-mode'
                            ? <i className="bi bi-moon-stars-fill fs-3"></i>
                            : <i className="bi bi-brightness-high-fill fs-3"></i>}
                    </label>

                    {authenticated && (
                        <div style={{ position: 'relative' }}>
                            <div className="dropdown-container" onClick={toggleDropdown}>
                                {profile}
                            </div>
                            {dropdownOpen && (
                                <div style={{
                                    position: 'absolute', top: '50px', right: 0, backgroundColor: mode === 'light-mode' ? 'white' : 'grey', border: '1px solid #ddd', borderRadius: '5px', width: '150px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)',  
                                    zIndex: 1100
                                }}>
                                    <ul style={{ listStyle: 'none', padding: '10px', margin: 0 }}>
                                        <li style={{ cursor: 'pointer' }} onClick={updateProfile}>Profile</li>
                                        <li style={{ cursor: 'pointer' }} onClick={handleLogout}>Logout</li>
                                        <li style={{ cursor: 'pointer' }} onClick={deleteUser}>Delete Account</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
}
