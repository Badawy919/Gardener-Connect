import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";

const TopTrendingTips = () => {
    const [trendingTips, setTrendingTips] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/trending-tips`)
            .then(res => res.json())
            .then(data => setTrendingTips(data));
    }, []);
    // console.log(trendingTips);
    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.15,
                duration: 0.5,
            }
        }),
    };

    return (
        <section className="w-11/12 mx-auto my-12">
            <h2 className="text-2xl md:text-4xl font-bold text-center text-natural mb-4">
                Top <span className="text-primary">Trending Tips</span>
            </h2>
            <p className="text-center text-gray-500 mb-8 max-w-2xl mx-auto">
                Discover what gardeners are loving right now—these tips are currently trending in our community.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {trendingTips.map((tip, index) => (
                    <motion.div key={tip._id} custom={index} variants={cardVariants} initial="hidden" whileInView="visible"
                        className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition"
                        viewport={{ once: true, amount: 0.3 }}>
                        {/* Clickable card to navigate to tip details */}
                        <div onClick={() => navigate(`/tip-details/${tip._id}`)} className="cursor-pointer">
                            <img src={tip.imageUrl} alt={tip.title} className="w-full h-40 object-cover rounded-lg mb-3 text-gray-700" />
                            <h3 className="text-lg font-bold text-gray-800">{tip.title}</h3>
                            <p className="text-sm text-gray-500 mb-1">📌 {tip.category} • 🌿 {tip.plantType}</p>
                            <p className="text-sm text-gray-500">💪 Difficulty: {tip.difficulty}</p>
                            <p className="text-sm text-gray-600 mt-2">{tip.description.slice(0, 80)}...</p>
                            <div className="flex justify-between items-center mt-4">
                                <span className={`text-xs px-3 py-1 rounded-full font-medium ${tip.availability === 'Public' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                                    {tip.availability}
                                </span>
                                <span className="text-orange-500 text-sm font-semibold">👍 {tip.totalLiked || 0} Likes</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
            { /* Button to view all tips */}
            <div className="text-center mt-10">
                <button onClick={() => navigate("/tips")} className="btn btn-primary hover:btn-primary-focus text-white rounded-full">
                    View All Tips
                </button>
            </div>
        </section>
    );
};

export default TopTrendingTips;