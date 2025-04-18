import { useContext } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/AuthContext';

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

const ShareTip = () => {
    const { user } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const fromData = new FormData(form);
        // const { title, plantType, difficulty, description, imageUrl, category, availability, userEmail, userName } = Object.fromEntries(fromData.entries());
        // console.log(title, plantType, difficulty, description, imageUrl, category, availability, userEmail, userName)
        const tipData = Object.fromEntries(fromData.entries());

        //Send Data to Database:
        fetch(`${import.meta.env.VITE_API_URL}/add-tip`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tipData)
        })
        .then(res => res.json())
        .then(data => {
            if(data.insertedId) {
                //Success
                Toast.fire({
                    icon: 'success',
                    text: 'Your garden tip has been successfully posted.'
                })
                e.target.reset();
            }
        })
        .catch(error => {
            //Error
            Toast.fire({
                icon: 'error',
                text: error.message
            })
        })
    };

    return (
        <section className="w-11/12 md:w-2/3 mx-auto my-10 bg-white p-6 shadow-lg rounded-xl">
            {/* Title and Description */}
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-700 mb-4">
                🌿 Share a <span className="text-primary">Garden Tip</span>
            </h2>
            <p className="text-center text-gray-500 mb-6 max-w-2xl mx-auto">
                Inspire other plant lovers by sharing your gardening wisdom. Whether it's composting tricks,
                indoor plant care, or how you manage pests naturally—every tip helps someone grow better!
            </p>
            {/*Form Data*/}
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div>
                    <label className="label text-sm md:text-lg font-semibold text-gray-600">Title</label>
                    <input type="text" name="title"
                        placeholder="e.g., How I Grow Tomatoes Indoors"
                        className="w-full text-xs md:text-lg text-gray-700 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary" required />
                </div>
                {/* Type */}
                <div>
                    <label className="label text-sm md:text-lg font-semibold text-gray-600">Type</label>
                    <input type="text" name="plantType"
                        placeholder="Plant Type or Topic"
                        className="w-full text-xs md:text-lg text-gray-700 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary" required />
                </div>
                {/* Difficulty */}
                <div>
                    <label className="label text-sm md:text-lg font-semibold text-gray-600">Difficulty</label>
                    <select name="difficulty"
                        className="w-full text-xs md:text-lg text-gray-700 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary" required>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>
                {/* Description */}
                <div>
                    <label className="label text-sm md:text-lg font-semibold text-gray-600">Description</label>
                    <textarea name="description"
                        rows="5" placeholder="Description of your tip"
                        className="w-full text-xs md:text-lg text-gray-700 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary" required></textarea>
                </div>
                {/* Image */}
                <div>
                    <label className="label text-sm md:text-lg font-semibold text-gray-600">Image</label>
                    <input type="text" name="imageUrl"
                        placeholder="Image URL"
                        className="w-full text-xs md:text-lg text-gray-700 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary" required />
                </div>
                {/* Category */}
                <div>
                    <label className="label text-sm md:text-lg font-semibold text-gray-600">Category</label>
                    <select name="category"
                        className="w-full text-xs md:text-lg text-gray-700 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary cursor-pointer" required>
                        <option value="Plant Care">Plant Care</option>
                        <option value="Composting">Composting</option>
                        <option value="Vertical Gardening">Vertical Gardening</option>
                        <option value="Herb Gardening">Herb Gardening</option>
                        <option value="Organic Gardening">Organic Gardening</option>
                    </select>
                </div>
                {/* Availability */}
                <div>
                    <label className="label text-sm md:text-lg font-semibold text-gray-600">Availability</label>
                    <select name="availability" className="w-full text-xs md:text-lg text-gray-700 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary cursor-pointer" required>
                        <option value="Public">Public</option>
                        <option value="Hidden">Hidden</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Email */}
                    <div>
                        <label className="label text-sm text-red-700 italic">*you can't change your email</label>
                        <input type="email" value={user.email} name='userEmail'
                            readOnly className="w-full text-xs md:text-lg text-gray-700 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none bg-gray-100 cursor-not-allowed" />
                    </div>
                    {/* Name */}
                    <div>
                        <label className="label text-sm text-red-700 italic">*you can't change your name</label>
                        <input type="text" value={user.displayName} name='userName'
                            readOnly className="w-full text-xs md:text-lg text-gray-700 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none bg-gray-100 cursor-not-allowed" />
                    </div>
                </div>
                {/* Submit */}
                <button type="submit"
                    className="w-full btn btn-primary hover:btn-primary-focus text-white text-sm md:text-lg">
                    Submit Tip
                </button>
            </form>
        </section>
    );
};

export default ShareTip;