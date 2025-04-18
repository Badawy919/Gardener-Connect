import { use } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { DataContext } from '../../context/DataContext';
import { useNavigate } from 'react-router';

const Tips = () => {
    const { user } = use(AuthContext);
    const { tips } = use(DataContext);
    const navigate = useNavigate();

    return (
        <section className="w-11/12 mx-auto my-5 space-y-4">
            {/* Title and Description */}
            <div className="text-center mb-6">
                <h1 className="text-2xl md:text-4xl font-bold text-natural">
                    Explore <span className="text-primary">Garden Tips</span>
                </h1>
                <p className="text-gray-500 max-w-2xl mx-auto mt-2">
                    Dive into helpful gardening advice shared by our community. Whether you're a beginner or seasoned grower, you'll find tips to enrich your green journey.
                </p>
            </div>

            {/* Tips List */}
            {tips.map(tip => (
                <div key={tip._id} className="border border-gray-200 rounded-lg p-4 shadow bg-white flex flex-col md:flex-row items-start md:items-center gap-4">
                    {/* Image on the Left */}
                    <img src={tip.imageUrl} alt={tip.title} className="w-24 h-24 object-cover rounded-md" />

                    {/* Text Content */}
                    <div className="flex-1">
                        <h2 className="text-lg font-semibold text-gray-700">{tip.title}</h2>
                        <p className="text-sm text-gray-500"><strong>Plant Type:</strong> {tip.plantType}</p>
                        <p className="text-sm text-gray-500"><strong>Difficulty Level:</strong> {tip.difficulty}</p>
                        <p className="text-orange-500 text-sm font-semibold">👍 {tip.totalLiked || 0} Like{tip.totalLiked !== 1 && 's'}</p>
                    </div>

                    {/* Button */}
                    <button
                        onClick={() => navigate(user ? `/tip-details/${tip._id}` : '/login')}
                        className="btn btn-primary hover:btn-primary-focus text-white rounded-full px-4 py-2 text-sm md:text-base min-w-[140px]">
                            {user ? 'See More' : 'Login to See More'}
                    </button>
                </div>
            ))}
        </section>
    );
};

export default Tips;