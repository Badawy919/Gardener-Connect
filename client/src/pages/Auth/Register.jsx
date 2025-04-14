import { data, Link, useLocation, useNavigate } from 'react-router';
import RegisterBanner from '../../assets/Register.svg';
import { use, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { auth } from '../../config/firebase.config';
import { sendEmailVerification, updateProfile } from 'firebase/auth';
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Swal from 'sweetalert2';

// Sweet Alert
const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2200,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    },
});

const Register = () => {
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { user, createUser, updateUser, signInWithGoogle } = use(AuthContext);
    const location = useLocation();

    const handleSubmit = (e) => {
        e.preventDefault();
        const from = e.target;
        const formData = new FormData(from);
        // console.log(formData)
        // const userData = Object.fromEntries(formData.entries());
        // console.log(userData)
        const { name, email, photo, password, checkbox, ...restFormData } = Object.fromEntries(formData.entries());
        // console.log(email, password, checkbox, restFormData)

        // Password Validate
        const passwordRex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
        if (!passwordRex.test(password)) {
            if (password.length < 8) {
                setPasswordErrorMessage("Password must be at least 8 characters long.");
            } else if (!/[a-z]/.test(password)) {
                setPasswordErrorMessage("Password must include at least one lowercase letter.");
            } else if (!/[A-Z]/.test(password)) {
                setPasswordErrorMessage("Password must include at least one uppercase letter.");
            } else if (!/\d/.test(password)) {
                setPasswordErrorMessage("Password must include at least one digit.");
            } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
                setPasswordErrorMessage("Password must include at least one special character.");
            } else {
                setPasswordErrorMessage("Password must meet all required conditions.");
            }
            return;
        }

        // Checkbox Check
        if (!checkbox) {
            Toast.fire({
                icon: "error",
                title: "You Have to Accept our Terms and Conditions!",
            });
            return;
        }

        // Create User
        createUser(email, password)
        .then((result) => {
            // console.log(result.user)
            navigate(location.state || "/");
            
            // Send Email Verification
            // sendEmailVerification(auth.currentUser)
            //     .then(() => {
            //         Toast.fire({
            //             icon: "info",
            //             title: "An email has been sent to you. Please Verify!",
            //         });
            //     })

            // Update profile info:
            const profile = {
                displayName: name,
                photoURL: photo,
            }
            updateUser(profile)
            .then(() => {

            })
            .catch((error) => {
                // Error
                Toast.fire({
                    icon: "error",
                    title: error.message,
                });
            });

            // Send Data to Database:
            // User Profile 
            const createUser = {
                name,
                email,
                photo,
                ...restFormData,
                creationTime: result.user?.metadata?.creationTime,
                lastSignInTime: result.user?.metadata?.lastSignInTime,
            }
            fetch(`${import.meta.env.VITE_API_URL}/users`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify(createUser)
            })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    // Success
                    Toast.fire({
                        icon: "success",
                        title: "Account Created Successfully!",
                    });
                }
            })
        })
        .catch((error) => {
            // Error
            Toast.fire({
                icon: "error",
                title: error.message,
            });
        });
    };

    const handleGoogleSignUp = () => {
        signInWithGoogle()
            .then(() => {
                navigate(location.state || "/");
                // Success
                Toast.fire({
                    icon: "success",
                    title: "Account Created Successfully!",
                });
            })
            .catch((error) => {
                // Error
                Toast.fire({
                    icon: "error",
                    title: error.message,
                });
            });
    };

    if (user) {
        return navigate(location.state || "/");
    } else {
        return (
            <div className="w-11/12 mx-auto flex flex-col lg:flex-row items-center justify-between my-5">
                {/* Left Side - Banner */}
                <div className='flex flex-col items-center justify-center gap-2 w-full'>
                    <h1 className='text-2xl md:text-4xl font-bold text-natural'>Join the <span className='text-primary'>Gardener</span> <span className='text-secondary'>Connect</span></h1>
                    <h1 className='text-base text-neutral'>Connect with nature-loving people like you! Create your free account to start sharing gardening tips, exploring local experts, and growing your green community.</h1>
                    <img src={RegisterBanner} alt="Banner" className='h-[30vh] md:h-[70vh] object-contain' />
                </div>
                {/* Right Side - Registration Form */}
                <div className='w-full'>
                    <div className="w-11/12 mx-auto bg-white p-8 rounded-2xl shadow-xl">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-700 mb-2 text-center">Sign Up for an Account</h1>
                        <form onSubmit={handleSubmit} className="space-y-1.5">
                            {/* Name */}
                            <div>
                                <label className="label text-sm md:text-lg text-gray-600">Your Name</label>
                                <input type="text" name="name" placeholder="Enter your name" required
                                    className="w-full text-xs md:text-lg text-gray-700 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary" />
                            </div>
                            {/* Photo URL */}
                            <div>
                                <label className="label text-sm md:text-lg text-gray-600">Your Photo</label>
                                <input type="url" name="photo" placeholder="Enter your photo URL" required
                                    className="w-full text-xs md:text-lg text-gray-700 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary" />
                            </div>
                            {/* Email */}
                            <div>
                                <label className="label text-sm md:text-lg text-gray-600">Email Address</label>
                                <input type="email" name="email" placeholder="example@email.com" required
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
                            {/* Password Error Message */}
                            <div className='text-sm md:text-lg text-center text-red-600'>
                                {passwordErrorMessage}
                            </div>
                            {/* Terms and Conditions */}
                            <div className='flex gap-1 text-sm md:text-lg text-gray-700'>
                                <p>Accept our terms and conditions</p>
                                <input type="checkbox" name="checkbox" className="accent-primary" />
                            </div>
                            {/* Register Button*/}
                            <div>
                                <button type="submit" className="w-full btn btn-primary hover:btn-primary-focus text-white text-sm md:text-lg">Register</button>
                            </div>
                            {/* OR */}
                            <div className="flex items-center">
                                <hr className="flex-grow border-t border-gray-300" />
                                <span className="mx-4 text-gray-500 font-semibold">OR</span>
                                <hr className="flex-grow border-t border-gray-300" />
                            </div>
                            {/* Sign in with Google */}
                            <div className='flex justify-center'>
                                <button onClick={handleGoogleSignUp} className="w-full bg-white btn text-primary border-secondary hover:shadow-xl text-sm md:text-lg"><FcGoogle size={24} /> Continue with Google</button>
                            </div>
                        </form>
                        {/* Check Link */}
                        <p className="mt-3 text-sm md:text-lg text-center text-gray-600">
                            Already Have an Account? <Link to="/login" className="text-primary hover:text-secondary">Login here</Link>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
};

export default Register;