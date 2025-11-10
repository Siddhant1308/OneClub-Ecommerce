import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

const heroBanners = [
  '/images/hero1.webp',
  '/images/hero2.webp',
  '/images/hero3.jpg',
  '/images/hero4.webp',
];

const LandingPage = () => {
  const navigate = useNavigate();

  const categories = [
    { title: 'Men', image: '/images/men.webp' },
    { title: 'Women', image: '/images/women.jpeg' },
    { title: 'Kids', image: '/images/kid.jpeg' },
    { title: 'Footwear', image: '/images/shoes.webp' },
  ];

  const trending = [
    '/images/trend1.webp',
    '/images/trend2.webp',
    '/images/trend3.webp',
    '/images/trend4.webp',
    '/images/trend5.webp',
  ];

  const offers = [
    '/images/offer1.jpg',
    '/images/offer2.jpeg',
    '/images/offer3.webp',
  ];

  return (
    <div className="font-sans text-gray-900">
      {/* HERO BANNER */}
      <div className="w-full h-[550px] mb-10 overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 4000 }}
          pagination={{ clickable: true }}
          loop
          className="w-full h-full"
        >
          {heroBanners.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`Hero Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* SHOP BY CATEGORY */}
      <div className="px-6 md:px-12 lg:px-20 mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <div
              key={index}
              onClick={() => navigate(`/category/${cat.title.toLowerCase()}`)}
              className="rounded-lg overflow-hidden shadow-md hover:scale-105 transition-all cursor-pointer"
            >
              <img src={cat.image} alt={`${cat.title} category`} className="w-full h-60 object-contain" />
              <div className="text-center p-3 font-semibold">{cat.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* OFFERS CAROUSEL */}
      <div className="px-6 md:px-12 lg:px-20 mb-16 bg-gray-100 py-10">
        <h2 className="text-3xl font-bold mb-6 text-center">Exclusive Offers</h2>
        <Swiper
          modules={[Autoplay, Navigation]}
          autoplay={{ delay: 2000 }}
          navigation
          loop
          spaceBetween={20}
          slidesPerView={1}
        >
          {offers.map((img, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={img}
                alt={`Offer ${idx + 1}`}
                className="w-full h-[300px] object-cover rounded shadow-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* TRENDING PRODUCTS */}
      <div className="px-6 md:px-12 lg:px-20 mb-10">
        <h2 className="text-3xl font-bold mb-6 text-center">Trending Now</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {trending.map((img, i) => (
            <div
              key={i}
              className="w-full h-56 overflow-hidden rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
            >
              <img
                src={img}
                alt={`Trending ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* CTA BUTTON */}
      <div className="text-center mb-20">
        <button
          onClick={() => navigate('/products')}
          className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default LandingPage;