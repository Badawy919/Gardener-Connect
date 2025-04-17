import { use, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { DataContext } from '../../context/DataContext';

const Events = () => {
    const swiperRef = useRef(null);
    const { events } = use(DataContext)

    return (
        <section className="w-11/12 mx-auto my-8">
            {/* Title */}
            <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-natural mb-2">Our Events</h2>
                <p className="text-base md:text-lg text-neutral">
                    Join us for exciting events that bring gardening lovers together. Whether you're new or experienced, there's something for you!
                </p>
            </div>

            {/* Slider Controls */}
            <div className="flex justify-center items-center gap-3 mt-5">
                <button onClick={() => swiperRef.current?.slidePrev()}>
                    <IoIosArrowDropleft className="text-primary bg-white shadow-lg rounded-full w-10 h-10 hover:scale-110 transition cursor-pointer" />
                </button>

                <Swiper modules={[Navigation]} spaceBetween={20} slidesPerView={1} onSwiper={(swiper) => (swiperRef.current = swiper)}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 4 }
                    }}>

                    {events.map((event, index) => (
                        <SwiperSlide key={index} className='flex justify-center'>
                            <div className="p-2 w-full max-w-[280px]">
                                <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-[400px]">
                                    <img src={event.imgUrl} alt={event.title} className="h-[180px] w-full object-cover" />
                                    <div className="p-4 flex flex-col justify-between flex-grow">
                                        <div>
                                            <h3 className="text-lg font-semibold text-primary mb-2">{event.title}</h3>
                                            <p className="text-sm text-gray-700 line-clamp-3">{event.description}</p>
                                        </div>
                                        <button className="btn btn-primary mt-4 text-white hover:btn-primary-focus">
                                            {event.buttonText}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <button onClick={() => swiperRef.current?.slideNext()}>
                    <IoIosArrowDropright className="text-primary bg-white shadow-lg rounded-full w-10 h-10 hover:scale-110 transition cursor-pointer" />
                </button>
            </div>
        </section>
    );
};

export default Events;
