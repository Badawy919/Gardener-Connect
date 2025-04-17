import { use } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import Banner from "../../assets/Hero.svg";

import { Fade, Slide } from "react-awesome-reveal";
import { Typewriter } from "react-simple-typewriter";

const Hero = () => {
    const { user } = use(AuthContext);

    return (
        <section className="w-11/12 md:relative md:min-h-[90vh] mx-auto flex flex-col md:flex-row items-center justify-between gap-5 md:gap-0 mt-5">
            {/* Left - Banner */}
            <div className="w-full md:w-1/2 md:absolute md:top-0 md:left-0">
                <img src={Banner} alt="Hero Banner" className="w-full h-[30vh] md:h-[85vh] object-top" />
            </div>

            {/* Right - Title and Description */}
            <div className="w-full md:w-1/2 md:absolute md:top-1/3 md:right-0">
                <div className="w-10/12 mx-auto text-left">
                    <Fade direction="down" cascade triggerOnce>
                        <h1 className="text-2xl md:text-4xl font-bold text-natural mb-2">
                            Welcome to <span className="text-primary">Gardener</span> <span className="text-secondary">Connect</span>
                        </h1>

                        <p className="text-base md:text-xl text-neutral mb-2">
                            <Typewriter
                                words={[
                                    "Share gardening tips.",
                                    "Explore local events.",
                                    "Discover plant care techniques.",
                                    "Grow together with the community."
                                ]}
                                loop={0}
                                cursor
                                cursorStyle="|"
                                typeSpeed={50}
                                deleteSpeed={30}
                                delaySpeed={1500}
                            />
                        </p>
                    </Fade>

                    <Slide direction="up" triggerOnce>
                        {user ? (
                            <Link to="/add-tip">
                                <button className="btn btn-primary hover:btn-primary-focus text-white mt-4">
                                    Share a Garden Tip
                                </button>
                            </Link>
                        ) : (
                            <Link to="/register">
                                <button className="btn btn-primary hover:btn-primary-focus text-white mt-4">
                                    Join the Community
                                </button>
                            </Link>
                        )}
                    </Slide>
                </div>
            </div>
        </section>
    );
};

export default Hero;