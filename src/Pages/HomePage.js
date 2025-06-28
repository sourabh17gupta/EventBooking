import React from 'react';
import SearchBarHome from '../components/HomeComponent/SearchBarHome';
import EventSwiper1 from '../components/HomeComponent/EventSwiper1';
import EventSwiper2 from '../components/HomeComponent/EventSwiper2';
import { EventSwiper3 } from '../components/HomeComponent/EventSwiper3';

function HomePage() {
  return (
    <div className="bg-[#000000] py-10">
      <div className="pt-6 px-4 md:px-8">
        <SearchBarHome />
      </div>

      <div className="mt-12 px-4 md:px-8">
        <EventSwiper1 />
      </div>

      <div className="mt-12 px-4 md:px-8">
        <p className="text-white text-2xl font-bold border-b border-gray-500 pb-2">
          Upcoming Event
        </p>
      </div>

      <div className="mt-12 px-4 md:px-8">
        <EventSwiper2 />
      </div>
      <div className="mt-12 px-4 md:px-8 ">
        <EventSwiper3 />
      </div>
    </div>
  );
}

export default HomePage;
