import { motion } from "framer-motion";
import { DataContext } from "../context/DataContext";
import { use } from "react";

const Genders = () => {
    const { gardeners } = use(DataContext)
    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.15,
                duration: 0.5
            }
        })
    };

    return (
        <section className="w-11/12 mx-auto my-10">
            <h1 className="text-2xl md:text-4xl font-bold text-center text-natural mb-4">
                Explore Our <span className="text-primary">Gardeners</span>
            </h1>
            <p className="text-center text-gray-500 mb-8 max-w-2xl mx-auto">
                Discover talented gardeners from various backgrounds and expertise. 
                Connect with them to learn tips, exchange ideas, and grow your green community.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {gardeners.map((gardener, index) => (
                    <motion.div key={gardener._id} custom={index} initial="hidden" whileInView="visible" variants={cardVariants}
                        className="bg-white shadow-md rounded-2xl p-5 hover:shadow-xl transition duration-300"
                        viewport={{ once: true, amount: 0.3 }}>
                        <img src={gardener.image} alt={gardener.name}
                            className="w-24 h-24 object-top rounded-full mx-auto mb-4 border-4 border-primary"/>
                        <h3 className="text-lg font-bold text-gray-800 text-center">{gardener.name}</h3>
                        <p className="text-sm text-gray-500 text-center mb-1">
                            {gardener.age} yrs • {gardener.gender}
                        </p>
                        <p className="text-sm text-gray-600 text-center font-medium">
                            🌿 Experience: <span className="font-normal">{gardener.experience}</span>
                        </p>
                        <p className="text-sm text-gray-600 text-center mt-1">
                            🌱 Shared Tips: <span className="font-semibold text-orange-500">{gardener.totalSharedTips}</span>
                        </p>
                        <p className="text-sm text-gray-600 text-center mt-1">
                            📧 {gardener.email}
                        </p>
                        <div className="mt-3 text-center">
                            <span className="inline-block px-3 py-1 text-xs font-semibold text-green-600 bg-green-100 rounded-full">
                                {gardener.status}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Genders;