import { motion } from "motion/react";
import { TbUser } from "react-icons/tb";
import { FaLeaf } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const cardDetails = [
  {
    icon: <TbUser size={36} className="text-primary mx-auto mb-3" />,
    title: "Create Your Profile",
    descriptions:
      "Sign up and personalize your gardening profile to connect with like-minded enthusiasts.",
  },
  {
    icon: <FaLeaf size={36} className="text-primary mx-auto mb-3" />,
    title: "Share & Explore Tips",
    descriptions:
      "Post your garden tips or browse helpful advice from the community to grow better plants.",
  },
  {
    icon: <MdEventAvailable size={36} className="text-primary mx-auto mb-3" />,
    title: "Join Events & Connect",
    descriptions:
      "Participate in local gardening events and meet fellow gardeners to share knowledge and fun.",
  },
];

const HowItWorks = () => {
  return (
    <section className="w-11/12 mx-auto mt-8">
      {/* Title */}
      <h1 className="text-2xl md:text-4xl font-bold text-center text-natural">
        How <span className="text-primary">Gardener</span> <span className="text-secondary">Connect</span> Works
      </h1>

      {/* Cards */}
      <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {cardDetails.map((card, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-xl p-6 rounded-2xl hover:shadow-2xl transition duration-300"
            variants={cardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            {card.icon}
            <h3 className="text-lg md:text-xl text-center text-gray-700 font-bold mb-2">
              {card.title}
            </h3>
            <p className="text-gray-600">{card.descriptions}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;