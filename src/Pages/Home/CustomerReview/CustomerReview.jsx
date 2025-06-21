import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import customerImg from "../../../assets/authImage.png"; 
import sectionTopImg from "../../../assets/customer-top.png";

import images from "../../../assets/dot.png"

const reviews = [
  {
    id: 1,
    text: "Posture Pro completely changed the way I sit and move throughout the day. It’s a game changer!",
    name: "Sadia Islam",
    address: "Dhaka, Bangladesh",
    image: customerImg,
  },
  {
    id: 2,
    text: "I've tried many products but this one really made a difference in my back pain and flexibility.",
    name: "John Smith",
    address: "New York, USA",
    image: customerImg,
  },
  {
    id: 3,
    text: "My physiotherapist recommended it and I’m thankful. Amazing design and comfort!",
    name: "Nabila Noor",
    address: "Chittagong, Bangladesh",
    image: customerImg,
  },
  {
    id: 4,
    text: "The perfect companion for my daily work routine. Keeps me active and aligned.",
    name: "Mark Lee",
    address: "London, UK",
    image: customerImg,
  },
  {
    id: 5,
    text: "No more slouching! It’s super helpful and easy to wear. Highly recommended.",
    name: "Fatima Bibi",
    address: "Lahore, Pakistan",
    image: customerImg,
  },
  {
    id: 6,
    text: "Feels great, fits great, and it actually helps. My back is grateful!",
    name: "Ethan Chen",
    address: "Beijing, China",
    image: customerImg,
  },
];

const CustomerReviews = () => {
  const [current, setCurrent] = useState(0);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <section data-aos="fade-up" className="mt-24">
      {/* Top Decorative Image */}
      <div className="mb-8 text-center">
        <img
          src={sectionTopImg}
          alt="Top Illustration"
          className="mx-auto max-w-xs"
        />
      </div>

      {/* Title + Description */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h2 className="text-3xl md:text-4xl xl:text-[40px] font-extrabold text-secondary mb-6">
          What our customers are saying
        </h2>
        <p className="text-[#606060] text-sm lg:text-[16px] font-medium">
          Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper
          alignment, reduce pain, and strengthen your body with ease!
        </p>
      </div>

      {/* Review Card */}
      <div className="max-w-md mx-auto bg-white p-6 md:p-8 rounded-xl shadow-md">
        <div className="text-left space-y-4">
          {/* Quotation + Review Text */}
          <img src={images} className="w-8 lg:w-16 h-fit" alt="" />
          <p className="text-[#606060] text-[16px] font-medium h-20">{reviews[current].text}</p>

          {/* Dotted Divider */}
          <hr className="border-dashed border-t-2 border-secondary my-6" />

          {/* Customer Profile */}
          <div className="flex items-center gap-4">
            <img
              src={reviews[current].image}
              alt={reviews[current].name}
              className="w-14 h-14 rounded-full object-cover"
            />
            <div>
              <h4 className="font-extrabold text-xl text-secondary mb-2">{reviews[current].name}</h4>
              <p className="text-sm md:text-[16px] font-medium text-[#606060]">{reviews[current].address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination Section (Dots + Arrows) */}
      <div className="flex justify-center items-center gap-4 mt-6">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="text-secondary text-2xl bg-primary rounded-full p-3"
          aria-label="Previous Review"
        >
          <FaArrowLeft />
        </button>

        {/* Pagination Dots */}
        <div className="flex space-x-3">
          {reviews.map((_, index) => (
            <span
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full cursor-pointer transition ${
                index === current ? "bg-primary" : "bg-gray-300"
              }`}
            ></span>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="text-secondary text-2xl bg-primary p-3 rounded-full"
          aria-label="Next Review"
        >
          <FaArrowRight />
        </button>
      </div>
    </section>
  );
};

export default CustomerReviews;
