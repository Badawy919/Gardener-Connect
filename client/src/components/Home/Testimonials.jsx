import { motion } from "motion/react";

const Testimonials = () => {
  const CardDetails = [
    {
      name: "Sara Leaf",
      username: "@saraleaf",
      image: "https://i.ibb.co/Znj61nm/Sara-Leaf.jpg",
      review:
        "Gardener Connect helped me turn my small balcony into a flourishing herb garden. The community tips are priceless!",
    },
    {
      name: "Ethan Root",
      username: "@ethanroot",
      image: "https://i.ibb.co/hx4C5nKP/Ethan-Root.jpg",
      review:
        "This platform makes gardening so accessible and fun. I love joining local events and meeting fellow plant lovers.",
    },
    {
      name: "Faiza Alam",
      username: "@faizaalam",
      image: "https://i.ibb.co/WNLJqpKC/Faiza-Alam.jpg",
      review:
        "The detailed plant care tips have saved many of my plants. The site is easy to navigate and full of helpful info.",
    },
    {
      name: "Oliver Grove",
      username: "@olivergrove",
      image: "https://i.ibb.co/wrBxHS9h/Oliver-Grove.jpg",
      review:
        "A wonderful community that keeps me motivated to experiment with composting and hydroponics. Highly recommend!",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
      },
    }),
  };

  return (
    <section className="w-11/12 mx-auto my-10">
      <h1 className="text-2xl md:text-4xl font-bold text-center text-natural mb-8">
        What Our <span className="text-primary">Gardeners</span> Say
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {CardDetails.map((card, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-md rounded-xl p-6 text-start"
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
          >
            <p className="text-gray-700 mb-6 text-sm md:text-base">“{card.review}”</p>

            <div className="flex items-center gap-4">
              <img src={card.image} alt={card.name} className="w-14 h-14 rounded-full object-cover" />
              <div className="flex flex-col">
                <span className="text-gray-700 font-semibold text-md">{card.name}</span>
                <span className="text-gray-500 text-sm">{card.username}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;