import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import logo from '../../assets/logo.png';
import { AuthContext } from '../../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase.config';
import Swal from 'sweetalert2';
import DarkModeToggler from '../shared/DarkModeToggler';
import { RiMenu2Fill } from 'react-icons/ri';

const Header = () => {
    const { user } = useContext(AuthContext);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleSignOut = () => {
        setProfileDropdownOpen(false);
        setMobileMenuOpen(false);

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2200,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            },
        });

        signOut(auth)
            .then(() => {
                navigate('/login');
                Toast.fire({
                    icon: 'success',
                    title: 'Logout successfully. See you again!',
                });
            })
            .catch((error) => {
                Toast.fire({
                    icon: 'error',
                    title: error.message,
                });
            });
    };

    return (
        <header className="shadow-sm">
            <div className="navbar bg-base-100 relative">
                {/* Navbar Start */}
                <div className="navbar-start">
                    {/* Mobile Dropdown */}
                    <div className="lg:hidden">
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="btn btn-ghost" >
                            <RiMenu2Fill className='h-5 w-5' />
                        </button>
                        {/* Mobile Menu */}
                        {mobileMenuOpen && (
                            <ul className="absolute menu left-1 top-full z-20 bg-base-100 w-52 p-2 gap-2 rounded-box shadow-lg">
                                <li className='text-base text-natural'><Link onClick={() => setMobileMenuOpen(false)} to="/">Home</Link></li>
                                <li className='text-base text-natural'><Link onClick={() => setMobileMenuOpen(false)} to="/gardeners">Gardeners</Link></li>
                                <li className='text-base text-natural'><Link onClick={() => setMobileMenuOpen(false)} to="/tips">Tips</Link></li>
                                {user ? (
                                    <>
                                        <li className='text-base text-natural'><Link onClick={() => setMobileMenuOpen(false)} to="/add-tip">Share a Tip</Link></li>
                                        <li className='text-base text-natural'><button onClick={handleSignOut} className="btn btn-primary text-white">Logout</button></li>
                                    </>
                                ) : (
                                    <>
                                        <li className='text-base text-natural'><Link onClick={() => setMobileMenuOpen(false)} to="/login" className="btn btn-ghost border-primary text-primary">Login</Link></li>
                                        <li className='text-base text-natural'><Link onClick={() => setMobileMenuOpen(false)} to="/register" className="btn btn-primary text-white">Register</Link></li>
                                    </>
                                )}
                            </ul>
                        )}
                    </div>

                    {/* Logo */}
                    <Link to="/" className="btn btn-ghost text-xl">
                        <img src={logo} alt="Gardener Connect Logo" className="w-8 h-8 mr-2" />
                        <div className='flex flex-col items-start md:flex-row md:gap-1'>
                            <span className="text-primary">Gardener</span>
                            <span className="text-secondary">Connect</span>
                        </div>
                    </Link>
                </div>

                {/* Navbar Center (Desktop Links) */}
                <ul className="navbar-center hidden lg:flex gap-5">
                    <li className='text-lg text-neutral hover:text-secondary'><Link to="/">Home</Link></li>
                    <li className='text-lg text-neutral hover:text-secondary'><Link to="/gardeners">Gardeners</Link></li>
                    <li className='text-lg text-neutral hover:text-secondary'><Link to="/tips">Tips</Link></li>
                    {user && <li className='text-lg text-neutral hover:text-secondary'><Link to="/add-tip">Share a Tip</Link></li>}
                </ul>

                {/* Navbar End */}
                <div className="navbar-end flex items-center gap-2">
                    <DarkModeToggler  />

                    {user ? (
                        <div>
                            <button onClick={() => setProfileDropdownOpen(!profileDropdownOpen)} className="cursor-pointer">
                                <img alt={user?.displayName} src={user?.photoURL} className="w-12 h-12 rounded-full object-cover border-2 border-primary" />
                            </button>

                            {profileDropdownOpen && (
                                <ul className="absolute menu right-1 top-full z-10 bg-base-100 w-52 p-2 gap-2 rounded-box shadow-lg">
                                    <h1 className="text-lg text-center font-semibold text-neutral">{user?.displayName}</h1>
                                    <li className='text-base text-natural'><Link to="/my-tips" onClick={() => setProfileDropdownOpen(false)}>My Tips</Link></li>
                                    <li className='text-base text-natural'><Link to="/my-profile" onClick={() => setProfileDropdownOpen(false)}>My Profile</Link></li>
                                    <li className='text-base text-natural'><button onClick={handleSignOut} className="btn btn-primary text-white hidden md:block">Logout</button></li>
                                </ul>
                            )}
                        </div>
                    ) : (
                        <div className="hidden md:flex items-center gap-2">
                            <Link to="/login" className="btn btn-ghost bg-base-100 border-primary text-primary">Login</Link>
                            <Link to="/register" className="btn btn-primary text-white">Register</Link>
                        </div>
                    )
                }
                </div>
            </div>
        </header>
    );
};

export default Header;