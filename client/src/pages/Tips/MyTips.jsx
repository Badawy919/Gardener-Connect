import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router';
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

const MyTips = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [myTips, setMyTips] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/my-tips?email=${user.email}`)
            .then(res => res.json())
            .then(data => setMyTips(data));
    }, []);

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: "This tip will be permanently deleted.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (confirm.isConfirmed) {
            fetch(`${import.meta.env.VITE_API_URL}/my-tips/${id}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount) {
                        // Success
                        Toast.fire({
                            icon: "success",
                            title: "Your tip has been deleted.",
                        });
                        const remainingTips = myTips.filter(myTip => myTip._id !== id)
                        setMyTips(remainingTips);
                    }
                })
                .catch(error => {
                    Toast.fire({
                        icon: "error",
                        title: error.message
                    })
                })
        }
    }


    return (
        <section className="w-11/12 mx-auto my-10">
            <h1 className="text-2xl md:text-4xl font-bold text-center text-natural mb-6">
                My <span className="text-primary">Garden Tips</span>
            </h1>

            {myTips.length == 0 ? (
                <p className="text-center text-gray-500">You haven’t shared any tips yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {myTips.map(tip => (
                        <div key={tip._id}
                            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100">
                            {/* Showcase */}
                            <div onClick={() => navigate(`/tip-details/${tip._id}`)} className="cursor-pointer">
                                <div className="flex justify-between items-center mb-2">
                                    {/* Availability Badge */}
                                    <span className={`text-xs px-3 py-1 rounded-full font-semibold tracking-wide ${tip.availability === 'Public'
                                                ? 'text-primary border border-primary bg-primary/10'
                                                : 'text-secondary border border-secondary bg-secondary/10'
                                            }`}>
                                        {tip.availability}
                                    </span>
                                </div>
                                {/* Title and Details */}
                                <h2 className="text-xl font-bold text-gray-800 mb-1 line-clamp-1">{tip.title}</h2>

                                <p className="text-sm text-gray-500 mb-1">📌 {tip.category} • 🌱 {tip.plantType}</p>

                                <p className="text-sm text-gray-600 mb-1">
                                    <span className="font-medium text-gray-500">Difficulty:</span>{' '}
                                    {tip.difficulty}
                                </p>

                                <p className="text-sm text-gray-700 mb-3 line-clamp-3">
                                    {tip.description.slice(0, 100)}...
                                </p>
                                    
                                <img src={tip.imageUrl} alt={tip.title} className="rounded-xl w-full h-44 object-cover mb-3 border border-gray-200" />
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end gap-3 mt-4">
                                <button onClick={() => handleDelete(tip._id)}
                                    className="text-red-500 hover:bg-red-50 border border-red-500 px-4 py-1.5 rounded-full text-sm font-medium transition cursor-pointer">
                                    Delete
                                </button>
                                <Link to={`/my-tips/${tip._id}/update`}
                                    className="text-blue-500 hover:bg-blue-50 border border-blue-500 px-4 py-1.5 rounded-full text-sm font-medium transition cursor-pointer">
                                    Update
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default MyTips;