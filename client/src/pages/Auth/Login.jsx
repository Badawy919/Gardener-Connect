import { Link, useLocation, useNavigate } from 'react-router';
import LoginBanner from '../../assets/Login.svg';
import { use, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../config/firebase.config';
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Swal from 'sweetalert2';

// Sweet Alert
const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    },
});

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { user, signInUser, signInWithGoogle } = use(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    // console.log(location)}

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const { email, password } = Object.fromEntries(formData.entries());
        // console.log(email, password)

        // Type Login
        signInUser(email, password)
            .then((result) => {
                // console.log(result.user)
                navigate(location.state || "/")

                //Send Data to Database:
                //signInInfo:
                const signInInfo = {
                    email,
                    lastSignInTime: result.user?.metadata?.lastSignInTime,
                }
                fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
                    method: 'PATCH',
                    headers: {
                        "Content-Type": 'application/json',
                    },
                    body: JSON.stringify(signInInfo)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.modifiedCount) {
                            // Success
                            Toast.fire({
                                icon: "success",
                                title: "Login Successfully!",
                            });
                        }
                    })
            })
            .catch((error) => {
                //Error
                Toast.fire({
                    icon: "error",
                    title: error.message,
                });
            })
    };

    //Sign In with Google
    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(() => {
                navigate(location.state || "/")
                //Success
                Toast.fire({
                    icon: "success",
                    title: "Login Successfully!",
                });
            })
            .catch((error) => {
                //Error
                Toast.fire({
                    icon: "error",
                    title: error.message,
                });
            })
    }

    if (user) {
        navigate(location.state || "/")
        return;
    } else {
        return (
            <div className="w-11/12 mx-auto flex flex-col lg:flex-row items-center justify-between my-5">
                {/* Left Side - Banner */}
                <div className='flex flex-col items-center justify-center gap-2 w-full'>
                    <h1 className='text-2xl md:text-4xl font-bold text-natural'>Welcome Back to <span className='text-primary'>Gardener</span> <span className='text-secondary'>Connect</span></h1>
                    <h1 className='text-base text-neutral'>Log in to reconnect with your gardening community. <br /> Share your latest tips, discover new techniques, and stay rooted in the green life.</h1>
                    <img src={LoginBanner} alt="Login Banner" className='h-[30vh] md:h-[70vh] object-contain' />
                </div>
                {/* Right Side - Login Form */}
                <div className='w-full'>
                    <div className="w-11/12 mx-auto bg-white p-8 rounded-2xl shadow-xl">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-700 mb-2 text-center">Sign In to Your Account</h1>
                        <form onSubmit={handleSubmit} className="space-y-1.5">
                            {/* Email */}
                            <div>
                                <label className="label text-sm md:text-lg text-gray-600">Email Address</label>
                                <input type="email" name="email" placeholder="example@email.com"
                                    required
                                    className="w-full text-xs md:text-lg text-gray-700 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary" />
                            </div>
                            {/* Password */}
                            <div className="relative">
                                <label className="label text-sm md:text-lg text-gray-600">Password</label>
                                <input type={showPassword ? "text" : "password"} name="password" placeholder="Enter your password" required
                                    className="w-full text-xs md:text-lg text-gray-700 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary" />
                                <div onClick={() => setShowPassword(!showPassword)}
                                    className="absolute top-8 md:top-10 right-4 cursor-pointer text-gray-500">
                                    {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                                </div>
                            </div>
                            {/*Forget Password*/}
                            <p onClick={() => navigate("/forget-password")} className="text-sm md:text-lg text-primary text-right hover:text-secondary cursor-pointer">Forget Password?</p>
                            {/*Login Button*/}
                            <div>
                                <button type="submit" className="w-full btn btn-primary hover:btn-primary-focus text-white text-sm md:text-lg">Login</button>
                            </div>
                            {/*OR*/}
                            <div className="flex items-center">
                                <hr className="flex-grow border-t border-gray-300" />
                                <span className="mx-4 text-gray-500 font-semibold">OR</span>
                                <hr className="flex-grow border-t border-gray-300" />
                            </div>
                            {/*Sign in with google*/}
                            <div>
                                <button onClick={handleGoogleSignIn} className="w-full bg-white btn text-primary border-secondary hover:shadow-xl text-sm md:text-lg"><FcGoogle size={24} /> Continue with Google</button>
                            </div>
                        </form>
                        <p className="mt-3 text-sm md:text-lg text-center text-gray-500">
                            Don't have an account? <Link to="/register" className="text-primary hover:text-secondary">Create one here</Link>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
};

export default Login;