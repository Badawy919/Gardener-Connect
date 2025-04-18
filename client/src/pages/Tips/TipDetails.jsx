import { use, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { DataContext } from '../../context/DataContext';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { FaArrowDown } from "react-icons/fa";
import Swal from 'sweetalert2';

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


const TipDetails = () => {
    const { id } = useParams();
    const { tips } = use(DataContext);
    const navigate = useNavigate();

    const singleTip = tips.find(tip => tip._id.toString() === id);
    const { title, imageUrl, description, plantType, difficulty, category, availability, userEmail, userName } = singleTip;

    const [likes, setLikes] = useState(singleTip.totalLiked || 0);
    const [liked, setLiked] = useState(false);

    const handleLike = () => {
        if (!liked) {
            setLiked(true);
            setLikes(prev => {
                const newLikes = prev + 1;
                // add the like to the db:
                fetch(`${import.meta.env.VITE_API_URL}/tip-details/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({newLikes})
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.modifiedCount) {
                            Toast.fire({
                                icon: 'success',
                                text: 'You liked this tip!'
                            });
                        }
                    })
                    .catch(error => {
                        Toast.fire({
                            icon: 'error',
                            text: error.message
                        });
                    });
                return newLikes;
            });
        }
    };

    return (
        <section className="w-11/12 mx-auto my-10 space-y-6">
            <h1 className="text-3xl font-bold text-natural text-center">{title}</h1>

            {/* Image */}
            <div className="flex justify-center">
                <img
                    src={imageUrl}
                    alt={title}
                    className="rounded-lg shadow-lg max-h-80 object-cover"
                />
            </div>

            {/* Tip Details */}
            <div className="bg-white border border-gray-200 p-6 rounded-lg shadow space-y-4">
                <p className='text-gray-700'><strong className="text-gray-600">Category:</strong> {category}</p>
                <p className='text-gray-700'><strong className="text-gray-600">Plant Type:</strong> {plantType}</p>
                <p className='text-gray-700'><strong className="text-gray-600">Difficulty:</strong> {difficulty}</p>
                <p className='text-gray-700'><strong className="text-gray-600">Availability:</strong> {availability}</p>
                <div>
                    <h2 className="text-lg font-semibold text-gray-600 mb-1">Tip Description:</h2>
                    <p className="text-gray-700">{description}</p>
                </div>

                {/* Like Info and Button */}
                <div className="space-y-1">
                    <p className="text-sm text-gray-600">Enjoyed this tip? You can like it below <FaArrowDown className="inline text-primary" /></p>
                    <div className="flex items-center gap-2 text-gray-700">
                        <button onClick={handleLike} title="Like this tip"
                            className={`text-xl ${liked ? 'text-primary cursor-not-allowed' : 'hover:text-secondary cursor-pointer'}`}   >
                            {liked ? <AiFillLike /> : <AiOutlineLike />}
                        </button>
                        <span>{likes} like{likes !== 1 && 's'}</span>
                    </div>
                </div>
            </div>

            {/* Author Info */}
            <div className="text-center text-sm text-gray-500">
                Submitted by <span className="font-semibold">{userName}</span> ({userEmail})
            </div>

            {/* Back Button */}
            <div className="text-center">
                <button onClick={() => navigate('/tips')} className="btn btn-primary hover:btn-primary-focus text-white rounded-full">
                    Back to Tips
                </button>
            </div>
        </section>
    );
};

export default TipDetails;
