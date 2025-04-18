import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useParams } from 'react-router';

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

const UpdateTip = () => {
    const { id } = useParams();
    const [selectedTip, setSelectedTip] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/tips/${id}`)
            .then(res => res.json())
            .then(data => {
                setSelectedTip(data);
            })
            .catch(error => {
                Toast.fire({
                    icon: 'error',
                    text: error.message
                });
            });
    }, [])

    const { title, imageUrl, description, plantType, difficulty, category, availability, userEmail, userName } = selectedTip;
    // console.log(selectedTip)

    const handleUpdate = async (e) => {
        e.preventDefault();
        const form = e.target;
        const tipData = Object.fromEntries(new FormData(form).entries());

        // add Data to the Database:
        fetch(`${import.meta.env.VITE_API_URL}/my-tips/${id}/update`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tipData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    Toast.fire({
                        icon: 'success',
                        text: 'Your tip has been successfully updated.'
                    });
                }
            })
            .catch(error => {
                Toast.fire({
                    icon: 'error',
                    text: error.message
                });
            });
    };

    return (
        <section className="w-11/12 md:w-2/3 mx-auto my-10 bg-white p-6 shadow-lg rounded-xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-700 mb-4">
                ✏️ Update <span className="text-primary">Garden Tip</span>
            </h2>
            <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                    <label className="label font-semibold text-gray-600">Title</label>
                    <input type="text" name="title" defaultValue={title}
                        className="w-full text-xs md:text-lg text-gray-700 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary" />
                </div>
                <div>
                    <label className="label font-semibold text-gray-600">Type</label>
                    <input type="text" name="plantType" defaultValue={plantType}
                        className="w-full text-xs md:text-lg text-gray-700 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary" />
                </div>
                <div>
                    <label className="label font-semibold text-gray-600">Difficulty</label>
                    <select name="difficulty" defaultValue={difficulty}
                        className="w-full text-xs md:text-lg text-gray-700 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary" required>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>
                <div>
                    <label className="label font-semibold text-gray-600">Description</label>
                    <textarea name="description" rows="5" defaultValue={description}
                        className="w-full text-xs md:text-lg text-gray-700 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary" ></textarea>
                </div>
                <div>
                    <label className="label font-semibold text-gray-600">Image URL</label>
                    <input type="text" name="imageUrl" defaultValue={imageUrl}
                        className="w-full text-xs md:text-lg text-gray-700 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary" />
                </div>
                <div>
                    <label className="label font-semibold text-gray-600">Category</label>
                    <select name="category" defaultValue={category}
                        className="w-full text-xs md:text-lg text-gray-700 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary">
                        <option value="Plant Care">Plant Care</option>
                        <option value="Composting">Composting</option>
                        <option value="Vertical Gardening">Vertical Gardening</option>
                        <option value="Herb Gardening">Herb Gardening</option>
                        <option value="Organic Gardening">Organic Gardening</option>
                    </select>
                </div>
                <div>
                    <label className="label font-semibold text-gray-600">Availability</label>
                    <select name="availability" defaultValue={availability}
                        className="w-full text-xs md:text-lg text-gray-700 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary">
                        <option value="Public">Public</option>
                        <option value="Hidden">Hidden</option>
                    </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="label text-sm text-red-700 italic">*you can't change your name</label>
                        <input type="text" value={userName} readOnly className="w-full text-xs md:text-lg px-4 py-2 border border-gray-300 rounded-lg focus:outline-none bg-gray-100 cursor-not-allowed" />
                    </div>
                    <div>
                        <label className="label text-sm text-red-700 italic">*you can't change your email</label>
                        <input type="email" value={userEmail} readOnly className="w-full text-xs md:text-lg px-4 py-2 border border-gray-300 rounded-lg focus:outline-none bg-gray-100 cursor-not-allowed" />
                    </div>
                </div>
                <button type="submit" className="w-full btn btn-primary hover:btn-primary-focus text-white">
                    Update Tip
                </button>
            </form>
        </section >
    );
};

export default UpdateTip;