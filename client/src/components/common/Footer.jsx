import { Link, NavLink } from 'react-router';
import logo from '../../assets/logo.png';
import { FaFacebook, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-base-200">
            <div className='w-11/12 mx-auto flex flex-col md:flex-row justify-around p-4'>

                {/* Brand Info */}
                <div className='flex flex-col justify-center items-start gap-2'>
                    {/* Logo */}
                    <Link to="/" className="text-lg md:text-2xl font-bold flex items-center gap-1.5 whitespace-nowrap">
                        <img src={logo} alt="Job Hunt Sync Logo" className="w-8 h-8" />
                        <span className='text-primary'>Gardener</span> 
                        <span className='text-secondary'>Connect</span>
                    </Link>
                    <div>
                        <p className='text-neutral font-medium'>Where Gardeners Meet, Share, and Grow.</p>
                        <p className='text-neutral font-medium'>Email Us</p>
                        <a className="font-medium text-primary hover:text-secondary" href="mailto:gardener-connect@web.app">gardener-connect@web.app</a>
                    </div>
                </div>

                {/* Navigation Links */}
                <div>
                    <h3 className="text-xl text-natural font-semibold mb-2">Explore</h3>
                    <ul className="space-y-1">
                        <li><NavLink to="/" className="text-neutral hover:text-primary">Home</NavLink></li>
                        <li><NavLink to="/terms" className="text-neutral hover:text-primary">Terms of Service</NavLink></li>
                        <li><NavLink to="/privacy" className="text-neutral hover:text-primary">Privacy Policy</NavLink></li>
                    </ul>
                </div>

                {/* Contact / Social */}
                <div className="flex flex-col items-start gap-3">
                    <h3 className="text-xl text-gray-800 font-bold">Connect with Us</h3>
                    <div className="flex gap-3">
                        <NavLink to="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <div className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full text-white shadow-md transition">
                                <FaFacebook size={20} />
                            </div>
                        </NavLink>
                        <NavLink to="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                            <div className="bg-blue-800 hover:bg-blue-900 p-2 rounded-full text-white shadow-md transition">
                                <FaLinkedin size={20} />
                            </div>
                        </NavLink>
                        <NavLink to="https://www.github.com" target="_blank" rel="noopener noreferrer">
                            <div className="bg-gray-800 hover:bg-black p-2 rounded-full text-white shadow-md transition">
                                <FaGithub size={20} />
                            </div>
                        </NavLink>
                        <NavLink to="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                            <div className="bg-blue-400 hover:bg-blue-500 p-2 rounded-full text-white shadow-md transition">
                                <FaTwitter size={20} />
                            </div>
                        </NavLink>
                    </div>
                </div>
            </div>
            {/* Footer Bottom */}
            <div className="text-center text-sm text-natural">
                &copy; {new Date().getFullYear()} Gardener Connect. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
