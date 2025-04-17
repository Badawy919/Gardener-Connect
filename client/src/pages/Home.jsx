import Events from '../components/Home/Events';
import FeaturedGardeners from '../components/Home/FeaturedGardeners';
import Hero from '../components/Home/Hero';
import HowItWorks from '../components/Home/HowItWorks';
import Testimonials from '../components/Home/Testimonials';
import TopTrendingTips from '../components/Home/TopTrendingTips';

const Home = () => {
    return (
        <div>
            {/* Hero Section */}
            <Hero></Hero>
            {/* How It Works Section */}
            <HowItWorks></HowItWorks>
            {/* Events Section */}
            <Events></Events>
            {/* Featured Gardeners */}
            <FeaturedGardeners></FeaturedGardeners>
            {/* Top Trending Tips */}
            <TopTrendingTips></TopTrendingTips>
            {/* Testimonial Section */}
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;