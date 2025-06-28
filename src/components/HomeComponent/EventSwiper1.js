import { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useNavigate } from 'react-router-dom';
import { useEvents } from '../../api/Services/HomePageapi/Trending.js';
import Spinner from '../common/Spinner.js';

const EventSwiper1 = () => {
  const { data: events, isLoading, error } = useEvents();
  const navigate = useNavigate();
  const nextRef = useRef(null);
  const [navigation, setNavigation] = useState({});

  // Wait until ref is mounted
  useEffect(() => {
    if (nextRef.current) {
      setNavigation({
        nextEl: nextRef.current,
      });
    }
  }, []);

  return (
    <div className="w-full pt-10 px-4 lg:px-8 mt-20 relative">
      {isLoading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <Spinner />
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-[60vh]">
          <p className="text-lg text-red-500">Error loading events: {error.message}</p>
        </div>
      ) : events.length === 0 ? (
        <div className="flex justify-center items-center h-[60vh]">
          <p className="text-lg text-gray-400">No events found.</p>
        </div>
      ) : (
        <>
          <Swiper
            modules={[Navigation, Autoplay]}
            onSwiper={(swiper) => {
              // re-init navigation after swiper mounts
              setTimeout(() => {
                if (swiper.params.navigation) {
                  swiper.params.navigation.nextEl = nextRef.current;
                  swiper.navigation.destroy(); // clean up
                  swiper.navigation.init();     // re-init
                  swiper.navigation.update();   // refresh
                }
              });
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop
            spaceBetween={20}
            slidesPerView={1}
            className="!pb-8"
          >
            {events.map((event) => (
              <SwiperSlide key={event.id}>
                <div className="relative w-full h-80 md:h-[400px] rounded-2xl overflow-hidden shadow-lg object-cover">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex flex-col justify-center items-start px-6 py-4">
                    <h2 className="text-white text-3xl md:text-5xl font-extrabold mb-4 drop-shadow-md">
                      {event.name}
                    </h2>
                    <button
                      onClick={() => navigate(`/event/${event._id}`)}
                      className="bg-white text-black text-xs md:text-sm font-semibold px-3 py-1 md:px-5 md:py-2 rounded-full transition duration-300 ease-in-out hover:bg-gray-100"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Right Arrow Button */}
          <div
            ref={nextRef}
            className="custom-swiper-button-next absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white text-black rounded-full p-2 shadow-md cursor-pointer hover:bg-gray-200 transition duration-300 text-lg"
          >
            ❯
          </div>
        </>
      )}
    </div>
  );
};

export default EventSwiper1;
