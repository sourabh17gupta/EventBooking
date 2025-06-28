import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";
import { useUpcomingEvent } from "../../api/Services/HomePageapi/UpcomingEvent.js";
import Spinner from "../common/Spinner.js";

const EventSwiper2 = () => {
  const { data: events, isLoading, error } = useUpcomingEvent();
  const navigate = useNavigate();
  const nextRef = useRef(null);
  const prevRef = useRef(null);
  const [swiperReady, setSwiperReady] = useState(false);

  useEffect(() => {
    if (nextRef.current && prevRef.current && events && events.length > 0) {
      setSwiperReady(true);
    }
  }, [events]);

  return isLoading ? (
    <div className="flex justify-center items-center h-[60vh]">
      <Spinner />
    </div>
  ) : error ? (
    <div className="flex justify-center items-center h-[60vh]">
      <p className="text-lg text-red-500">
        Error loading events: {error.message}
      </p>
    </div>
  ) : (
    <div className="w-full px-4 md:px-6 lg:px-8 mt-16 relative">
      {swiperReady && (
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: nextRef.current,
            prevEl: prevRef.current,
          }}
          onInit={(swiper) => {
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          loop={true}
          spaceBetween={20}
          grabCursor={true}
          touchRatio={1.5}
          breakpoints={{
            320: { slidesPerView: 1 },
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
            1280: { slidesPerView: 6 },
          }}
          className="!pb-8"
        >
          {events.map((event) => (
            <SwiperSlide key={event.id}>
              <div
                onClick={() => navigate(`/event/${event._id}`)}
                className="relative w-full h-[300px] md:h-[300px] rounded-lg overflow-hidden shadow-lg group cursor-pointer transition-transform duration-300 hover:scale-[1.03]"
              >
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-full object-cover group-hover:brightness-90 duration-300"
                />
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-xs px-3 py-1 rounded-full shadow-md backdrop-blur-sm">
                  {event.name}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Navigation Buttons */}
      <div
        ref={prevRef}
        className="absolute left-1 top-1/2 transform -translate-y-1/2 z-20 bg-white text-black rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-200 transition duration-300 text-lg"
      >
        ❮
      </div>
      <div
        ref={nextRef}
        className="absolute right-1 top-1/2 transform -translate-y-1/2 z-20 bg-white text-black rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-200 transition duration-300 text-lg"
      >
        ❯
      </div>
    </div>
  );
};

export default EventSwiper2;
